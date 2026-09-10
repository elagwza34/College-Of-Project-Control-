from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import serializers, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from apps.cms.permissions import IsDashboardUser
from .models import Article


class ArticleSummarySerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = ("id", "title", "slug", "excerpt", "category", "author", "image_url", "image_alt", "read_minutes", "published_at")

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return obj.image_url


class ArticleDetailSerializer(ArticleSummarySerializer):
    class Meta(ArticleSummarySerializer.Meta):
        fields = ArticleSummarySerializer.Meta.fields + ("content", "updated_at")


class DashboardArticleSerializer(serializers.ModelSerializer):
    remove_image = serializers.BooleanField(write_only=True, required=False, default=False)

    class Meta:
        model = Article
        fields = "__all__"
        read_only_fields = ("id", "created_at", "updated_at")

    def validate_image_url(self, value):
        if value and not (value.startswith("/images/") or value.startswith("/media/")):
            if not value.startswith(("https://", "http://")):
                raise serializers.ValidationError("Use an HTTP or HTTPS image URL.")
            serializers.URLField().run_validation(value)
        return value

    def validate_read_minutes(self, value):
        if value < 1:
            raise serializers.ValidationError("Reading time must be at least one minute.")
        return value

    def validate(self, attrs):
        published = attrs.get("is_published", getattr(self.instance, "is_published", False))
        if published and not attrs.get("published_at", getattr(self.instance, "published_at", None)):
            attrs["published_at"] = timezone.now()
        return attrs

    def create(self, validated_data):
        validated_data.pop("remove_image", None)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if validated_data.pop("remove_image", False):
            instance.image = None
        return super().update(instance, validated_data)


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = DashboardArticleSerializer
    permission_classes = [IsDashboardUser]


def published_articles():
    return Article.objects.filter(is_published=True, published_at__lte=timezone.now())


class ArticlePagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = "page_size"
    max_page_size = 24


@api_view(["GET"])
@permission_classes([AllowAny])
def articles_list(request):
    queryset = published_articles()
    search = request.query_params.get("search", "").strip()[:200]
    if search:
        queryset = queryset.filter(Q(title__icontains=search) | Q(excerpt__icontains=search) | Q(category__icontains=search) | Q(content__icontains=search))
    exclude = request.query_params.get("exclude", "")
    if exclude:
        queryset = queryset.exclude(slug=exclude)
    paginator = ArticlePagination()
    page = paginator.paginate_queryset(queryset, request)
    return paginator.get_paginated_response(ArticleSummarySerializer(page, many=True, context={"request": request}).data)


@api_view(["GET"])
@permission_classes([AllowAny])
def article_detail(request, slug):
    article = get_object_or_404(published_articles(), slug=slug)
    return Response(ArticleDetailSerializer(article, context={"request": request}).data)
