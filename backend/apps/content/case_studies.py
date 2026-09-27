import json

from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import serializers, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from apps.cms.permissions import IsDashboardUser
from .models import CaseStudy


class CaseStudySummarySerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = CaseStudy
        fields = (
            "id",
            "title",
            "slug",
            "sector",
            "client_name",
            "headline",
            "summary",
            "metrics",
            "image_url",
            "image_alt",
            "is_featured",
            "published_at",
        )

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return obj.image_url


class CaseStudyDetailSerializer(CaseStudySummarySerializer):
    class Meta(CaseStudySummarySerializer.Meta):
        fields = CaseStudySummarySerializer.Meta.fields + ("challenge", "approach", "outcome", "updated_at")


class DashboardCaseStudySerializer(serializers.ModelSerializer):
    remove_image = serializers.BooleanField(write_only=True, required=False, default=False)

    class Meta:
        model = CaseStudy
        fields = "__all__"
        read_only_fields = ("id", "created_at", "updated_at")

    def validate_image_url(self, value):
        if value and not (value.startswith("/images/") or value.startswith("/media/")):
            if not value.startswith(("https://", "http://")):
                raise serializers.ValidationError("Use an HTTP or HTTPS image URL.")
            serializers.URLField().run_validation(value)
        return value

    def validate_metrics(self, value):
        if isinstance(value, str):
            try:
                value = json.loads(value)
            except json.JSONDecodeError:
                raise serializers.ValidationError("Metrics must be valid JSON.") from None
        if not isinstance(value, list):
            raise serializers.ValidationError("Metrics must be a list.")
        for metric in value:
            if not isinstance(metric, dict):
                raise serializers.ValidationError("Each metric must be an object.")
            label = metric.get("label")
            metric_value = metric.get("value")
            if not isinstance(label, str) or not isinstance(metric_value, str):
                raise serializers.ValidationError("Each metric needs text label and value fields.")
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


class CaseStudyViewSet(viewsets.ModelViewSet):
    queryset = CaseStudy.objects.all()
    serializer_class = DashboardCaseStudySerializer
    permission_classes = [IsDashboardUser]


def published_case_studies():
    return CaseStudy.objects.filter(is_published=True, published_at__lte=timezone.now())


class CaseStudyPagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = "page_size"
    max_page_size = 24


@api_view(["GET"])
@permission_classes([AllowAny])
def case_studies_list(request):
    queryset = published_case_studies()
    search = request.query_params.get("search", "").strip()[:200]
    if search:
        queryset = queryset.filter(
            Q(title__icontains=search)
            | Q(headline__icontains=search)
            | Q(summary__icontains=search)
            | Q(sector__icontains=search)
            | Q(client_name__icontains=search)
            | Q(challenge__icontains=search)
            | Q(approach__icontains=search)
            | Q(outcome__icontains=search)
        )
    sector = request.query_params.get("sector", "").strip()[:120]
    if sector:
        queryset = queryset.filter(sector__iexact=sector)
    paginator = CaseStudyPagination()
    page = paginator.paginate_queryset(queryset, request)
    return paginator.get_paginated_response(CaseStudySummarySerializer(page, many=True, context={"request": request}).data)


@api_view(["GET"])
@permission_classes([AllowAny])
def case_study_detail(request, slug):
    case_study = get_object_or_404(published_case_studies(), slug=slug)
    return Response(CaseStudyDetailSerializer(case_study, context={"request": request}).data)
