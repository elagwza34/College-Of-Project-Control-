"""IPC portrait collection: one source for public display and dashboard editing."""
from django.core.validators import URLValidator
from rest_framework import serializers, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from apps.cms.permissions import IsDashboardUser
from .models import IpcImage


class IpcImageSerializer(serializers.ModelSerializer):
    image_url = serializers.URLField(max_length=2000, validators=[URLValidator(schemes=["http", "https"])])

    class Meta:
        model = IpcImage
        fields = ("id", "image_url", "alt_text", "order", "is_active")
        read_only_fields = ("id",)


class IpcImageViewSet(viewsets.ModelViewSet):
    queryset = IpcImage.objects.all()
    serializer_class = IpcImageSerializer
    permission_classes = [IsDashboardUser]
    http_method_names = ["get", "post", "patch", "delete", "head", "options"]


@api_view(["GET"])
@permission_classes([AllowAny])
def ipc_images_list(request):
    images = IpcImage.objects.filter(is_active=True)
    return Response(IpcImageSerializer(images, many=True).data)
