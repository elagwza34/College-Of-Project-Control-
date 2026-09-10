from io import BytesIO
import warnings

from PIL import Image, ImageOps, UnidentifiedImageError
from django.core.files.base import ContentFile
from django.http import FileResponse, Http404
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import serializers, viewsets, mixins
from rest_framework.decorators import api_view, permission_classes, throttle_classes, authentication_classes
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.throttling import SimpleRateThrottle
from apps.cms.permissions import IsDashboardUser
from .models import Testimonial
from .review_catalogue import PROGRAMMES


class SubmissionThrottle(SimpleRateThrottle):
    scope = 'testimonial-submission'
    rate = '5/hour'

    def get_cache_key(self, request, view):
        return self.cache_format % {'scope': self.scope, 'ident': self.get_ident(request)}


class SubmissionSerializer(serializers.ModelSerializer):
    consent = serializers.BooleanField(required=True)

    class Meta:
        model = Testimonial
        fields = ('name', 'programme', 'reviewer_type', 'photo', 'review', 'consent')

    def validate_consent(self, value):
        if not value:
            raise serializers.ValidationError('Please agree to publication of your name, photo, programme and review.')
        return value

    def validate_name(self, value):
        if len(value.strip()) < 2:
            raise serializers.ValidationError('Please enter your name.')
        return value.strip()

    def validate_review(self, value):
        if len(value.strip()) < 20:
            raise serializers.ValidationError('Please write at least 20 characters about your experience.')
        return value.strip()

    def validate_photo(self, value):
        if value.size > 5 * 1024 * 1024:
            raise serializers.ValidationError('Choose an image smaller than 5 MB.')
        try:
            value.seek(0)
            with warnings.catch_warnings():
                warnings.simplefilter('error', Image.DecompressionBombWarning)
                with Image.open(value) as original:
                    if original.format not in ('JPEG', 'PNG', 'WEBP') or original.width * original.height > 20_000_000:
                        raise serializers.ValidationError('Choose a JPG, PNG or WebP image up to 20 megapixels.')
                    picture = ImageOps.exif_transpose(original).convert('RGB')
                    picture.thumbnail((1000, 1000))
                    output = BytesIO()
                    picture.save(output, format='JPEG', quality=88)
            return ContentFile(output.getvalue(), name='portrait.jpg')
        except (UnidentifiedImageError, OSError, ValueError, Image.DecompressionBombError, Image.DecompressionBombWarning):
            raise serializers.ValidationError('This image could not be read. Choose a JPG, PNG or WebP photo.') from None


class PublicSerializer(serializers.ModelSerializer):
    programme_label = serializers.CharField(source='get_programme_display', read_only=True)
    photo_url = serializers.SerializerMethodField()

    class Meta:
        model = Testimonial
        fields = ('id', 'name', 'programme', 'programme_label', 'reviewer_type', 'review', 'photo_url')

    def get_photo_url(self, obj):
        if obj.photo:
            return self.context['request'].build_absolute_uri(f'/api/v1/testimonials/{obj.pk}/photo/')
        return obj.image_url or ''


@api_view(['GET'])
@permission_classes([AllowAny])
def catalogue(request):
    return Response([{'slug': slug, 'name': name} for slug, name in PROGRAMMES])


@api_view(['GET'])
@permission_classes([AllowAny])
def public_reviews(request):
    queryset = Testimonial.objects.filter(status=Testimonial.Status.APPROVED, consent=True)
    if request.query_params.get('programme'):
        queryset = queryset.filter(programme=request.query_params['programme'])
    if request.query_params.get('reviewer_type'):
        queryset = queryset.filter(reviewer_type=request.query_params['reviewer_type'])
    response = Response(PublicSerializer(queryset, many=True, context={'request': request}).data)
    response['Cache-Control'] = 'no-store'
    return response


@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
@throttle_classes([SubmissionThrottle])
def submit_review(request):
    serializer = SubmissionSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save(status=Testimonial.Status.PENDING)
    return Response({'detail': 'Thank you. Your review has been submitted for approval and is not public yet.'}, status=201)


@api_view(['GET'])
@permission_classes([AllowAny])
def photo(request, pk):
    review = get_object_or_404(Testimonial, pk=pk)
    is_staff = request.user.is_authenticated and request.user.is_staff
    if not is_staff and (review.status != Testimonial.Status.APPROVED or not review.consent):
        raise Http404
    try:
        response = FileResponse(review.photo.open('rb'), content_type='image/jpeg')
    except (FileNotFoundError, ValueError):
        raise Http404 from None
    response['Cache-Control'] = 'private, no-store'
    response['X-Content-Type-Options'] = 'nosniff'
    return response


class DashboardSerializer(PublicSerializer):
    class Meta(PublicSerializer.Meta):
        fields = PublicSerializer.Meta.fields + ('status', 'consent', 'is_featured', 'order', 'moderation_notes', 'reviewed_at', 'reviewed_by', 'created_at')
        read_only_fields = PublicSerializer.Meta.fields + ('consent', 'reviewed_at', 'reviewed_by', 'created_at')

    def validate(self, attrs):
        if attrs.get('status') == 'approved' and not self.instance.consent:
            raise serializers.ValidationError('This submission has no publication consent.')
        return attrs


class DashboardCreateSerializer(SubmissionSerializer):
    consent = serializers.BooleanField(required=True)
    photo = serializers.ImageField(required=False)
    image_url = serializers.CharField(required=False, allow_blank=True, max_length=500)
    status = serializers.ChoiceField(choices=Testimonial.Status.choices, required=False, default=Testimonial.Status.APPROVED)
    is_featured = serializers.BooleanField(required=False, default=False)
    order = serializers.IntegerField(required=False, default=0)

    class Meta(SubmissionSerializer.Meta):
        fields = SubmissionSerializer.Meta.fields + ('image_url', 'status', 'is_featured', 'order')

    def validate(self, attrs):
        if not attrs.get('photo') and not attrs.get('image_url', '').strip():
            raise serializers.ValidationError('Add a photo or a direct image link.')
        if attrs.get('status') == Testimonial.Status.APPROVED and not attrs.get('consent'):
            raise serializers.ValidationError('Confirm publication consent before approving a testimonial.')
        return attrs


class ReviewPagination(PageNumberPagination):
    page_size = 20


class TestimonialViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):
    queryset = Testimonial.objects.all()
    permission_classes = [IsDashboardUser]
    serializer_class = DashboardSerializer
    pagination_class = ReviewPagination
    http_method_names = ['get', 'post', 'patch', 'delete', 'head', 'options']

    def get_serializer_class(self):
        if self.action == 'create':
            return DashboardCreateSerializer
        return DashboardSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.request.query_params.get('status') in Testimonial.Status.values:
            queryset = queryset.filter(status=self.request.query_params['status'])
        return queryset

    def perform_create(self, serializer):
        serializer.save(reviewed_by=self.request.user, reviewed_at=timezone.now())

    def perform_update(self, serializer):
        if 'status' in serializer.validated_data:
            serializer.save(reviewed_by=self.request.user, reviewed_at=timezone.now())
        else:
            serializer.save()
