import hashlib
import hmac
import os
import re
from datetime import timedelta
from django.conf import settings
from django.db.models import F
from django.utils import timezone
from rest_framework import serializers, viewsets
from rest_framework.decorators import api_view, permission_classes, authentication_classes, action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from apps.cms.permissions import IsDashboardUser
from .documents import extract_document
from .models import ChatQuota, KnowledgeSource
from . import service


class SourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = KnowledgeSource
        fields = ('id', 'title', 'kind', 'reference_path', 'content', 'is_active', 'updated_at')
        read_only_fields = ('id', 'updated_at')

    def validate_reference_path(self, value):
        if value and not re.fullmatch(r'/[a-zA-Z0-9/_#-]*', value):
            raise serializers.ValidationError('Use a local website path, e.g. /programmes. External URLs are not allowed.')
        if value.startswith('//') or value.startswith(('/dashboard', '/admin', '/api')):
            raise serializers.ValidationError('Use a public website page.')
        return value

    def validate_content(self, value):
        if len(value.strip()) < 20:
            raise serializers.ValidationError('Add at least 20 characters of useful source text.')
        return value.strip()


class KnowledgeSourceViewSet(viewsets.ModelViewSet):
    permission_classes = [IsDashboardUser]
    serializer_class = SourceSerializer
    queryset = KnowledgeSource.objects.all()
    pagination_class = None

    @action(detail=False, methods=['post'])
    def upload(self, request):
        upload = request.FILES.get('file')
        if not upload:
            return Response({'detail': 'Choose a file to upload.'}, status=400)
        serializer = self.get_serializer(data={'title': request.data.get('title') or upload.name[:200],
                                              'kind': 'document', 'content': extract_document(upload), 'is_active': False})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=201)


class TurnSerializer(serializers.Serializer):
    role = serializers.ChoiceField(choices=['user', 'assistant'])
    content = serializers.CharField(max_length=2500)


class ChatSerializer(serializers.Serializer):
    message = serializers.CharField(max_length=1200)
    history = TurnSerializer(many=True, required=False, default=list, max_length=8)


def quota_allowed(request):
    now = timezone.now()
    address = request.META.get('REMOTE_ADDR', 'unknown')
    # Do not trust arbitrary X-Forwarded-For headers. Set REMOTE_ADDR at the trusted proxy.
    digest = hmac.new(settings.SECRET_KEY.encode(), address.encode(), hashlib.sha256).hexdigest()[:32]
    limits = [(f'ip:{digest}:{now:%Y%m%d%H}', int(os.environ.get('CHATBOT_HOURLY_LIMIT', '20')), now + timedelta(hours=2)),
              (f'global:{now:%Y%m%d}', int(os.environ.get('CHATBOT_DAILY_LIMIT', '500')), now + timedelta(days=2))]
    ChatQuota.objects.filter(expires_at__lt=now).delete()
    for key, limit, expires in limits:
        ChatQuota.objects.get_or_create(key=key, defaults={'expires_at': expires})
        if not ChatQuota.objects.filter(key=key, used__lt=limit).update(used=F('used') + 1):
            return False
    return True


@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny])
def status(request):
    return Response({'available': service.configured() and KnowledgeSource.objects.filter(is_active=True).exists(),
                     'consultation_path': service.CONSULTATION})


@api_view(['GET'])
@permission_classes([IsDashboardUser])
def dashboard_status(request):
    return Response({'configured': service.configured(), 'model': service.provider_config()[2],
                     'active_sources': KnowledgeSource.objects.filter(is_active=True).count(),
                     'daily_limit': int(os.environ.get('CHATBOT_DAILY_LIMIT', '500'))})


@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def chat(request):
    serializer = ChatSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    if not service.configured():
        return Response({'detail': 'The programme assistant is currently unavailable. Please request a consultation.',
                         'consultation_path': service.CONSULTATION}, status=503)
    if not quota_allowed(request):
        return Response({'detail': 'The assistant has reached its message limit. Please try later or request a consultation.'}, status=429,
                        headers={'Retry-After': '3600'})
    try:
        result = service.answer(**serializer.validated_data)
    except service.ProviderUnavailable:
        return Response({'detail': 'The assistant could not respond just now. Please try again or request a consultation.'}, status=503)
    return Response({**result, 'consultation_path': service.CONSULTATION})
