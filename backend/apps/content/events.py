import hashlib
import hmac
import re
import secrets
import time
from datetime import timedelta
from urllib.parse import urlparse
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError

from django.db.models import Q, F
from django.db import transaction
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import serializers, viewsets
from rest_framework.decorators import api_view, permission_classes, authentication_classes, throttle_classes, action
from rest_framework.exceptions import ValidationError
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.throttling import SimpleRateThrottle

from apps.cms.permissions import IsDashboardUser
from .models import Event, EventCategory, EventSyncControl, EventSyncJob
from .eventbrite import control, encrypt_token, credentials, EventbriteClient, SyncError, enqueue


def visible_events():
    queryset = Event.objects.filter(is_active=True, source_is_public=True).exclude(remote_status__in=["draft", "deleted", "private", "unpublished", "missing"])
    queryset = queryset.exclude(source_category__is_visible=False).exclude(classifications__is_visible=False)
    if not control().show_uncategorized:
        queryset = queryset.filter(Q(source_category__isnull=False) | Q(classifications__isnull=False))
    return queryset.select_related("source_category").prefetch_related("classifications").distinct()


def ended_query(now=None):
    now = now or timezone.now()
    return Q(ends_at__lte=now) | Q(ends_at__isnull=True, starts_at__lte=now)


def event_state(event):
    if event.remote_status in ("canceled", "cancelled"):
        return "cancelled"
    if (event.ends_at or event.starts_at) and (event.ends_at or event.starts_at) <= timezone.now():
        return "ended"
    return "upcoming"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = EventCategory
        fields = ("id", "name", "slug", "kind", "remote_id", "is_visible", "order")

    def validate(self, attrs):
        if self.instance and self.instance.kind == "eventbrite":
            if any(key in attrs and attrs[key] != getattr(self.instance, key) for key in ("kind", "remote_id", "slug")):
                raise ValidationError("Eventbrite category identifiers are managed by the sync.")
        elif attrs.get("kind") == "eventbrite" or attrs.get("remote_id"):
            raise ValidationError("Eventbrite categories are created automatically during import.")
        return attrs


class PublicEventSerializer(serializers.ModelSerializer):
    source_category = CategorySerializer(read_only=True)
    classifications = CategorySerializer(many=True, read_only=True)
    state = serializers.SerializerMethodField()
    booking_url = serializers.SerializerMethodField()
    booking_label = serializers.SerializerMethodField()
    display_summary = serializers.SerializerMethodField()
    availability_stale = serializers.SerializerMethodField()
    # Retain the legacy fields for existing consumers.
    ctaHref = serializers.SerializerMethodField()
    ctaLabel = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = ("id", "slug", "title", "category", "source", "source_category", "classifications", "format", "cadence", "display_summary", "image_url", "image_alt", "starts_at", "ends_at", "timezone", "location", "organizer", "state", "sales_status", "price_label", "is_featured", "highlights_url", "booking_url", "booking_label", "last_synced_at", "availability_stale", "ctaHref", "ctaLabel")

    def get_state(self, obj):
        return event_state(obj)

    def get_display_summary(self, obj):
        return obj.summary or obj.description[:350]

    def get_availability_stale(self, obj):
        return obj.source == "eventbrite" and (not obj.last_synced_at or obj.last_synced_at < timezone.now() - timedelta(minutes=30))

    def get_booking_url(self, obj):
        if event_state(obj) != "upcoming":
            return ""
        if obj.sales_status in ("sold_out", "unavailable") and not self.get_availability_stale(obj):
            return ""
        url = obj.source_url if obj.source == "eventbrite" else obj.cta_href
        return url if url.startswith(("https://", "http://", "/")) and not url.startswith("//") else ""

    def get_booking_label(self, obj):
        state = event_state(obj)
        if state == "cancelled":
            return "Event cancelled"
        if state == "ended":
            return "Event ended"
        if self.get_availability_stale(obj):
            return "Check availability on Eventbrite"
        if obj.sales_status == "sold_out":
            return "Sold out"
        if obj.sales_status == "unavailable":
            return "Registration unavailable"
        return "Register on Eventbrite" if obj.source == "eventbrite" else obj.cta_label

    def get_ctaHref(self, obj):
        return self.get_booking_url(obj)

    def get_ctaLabel(self, obj):
        return self.get_booking_label(obj)


class PublicEventDetailSerializer(PublicEventSerializer):
    class Meta(PublicEventSerializer.Meta):
        fields = PublicEventSerializer.Meta.fields + ("description",)


class DashboardEventSerializer(serializers.ModelSerializer):
    classifications = serializers.PrimaryKeyRelatedField(queryset=EventCategory.objects.exclude(kind="eventbrite"), many=True, required=False)
    public_visible = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = "__all__"
        read_only_fields = ("id", "source", "organization_id", "external_id", "source_url", "last_synced_at", "remote_changed_at", "source_is_public", "sync_error", "created_at", "updated_at")

    def get_public_visible(self, obj):
        visible_ids = self.context.get("visible_ids")
        if visible_ids is None:
            return visible_events().filter(pk=obj.pk).exists()
        return obj.pk in visible_ids

    def validate_timezone(self, value):
        try:
            ZoneInfo(value)
        except (ZoneInfoNotFoundError, ValueError):
            raise ValidationError("Choose a valid time zone, for example Europe/London.")
        return value

    def validate_image_url(self, value):
        if value and not value.startswith(("https://", "http://", "/images/", "/media/")):
            raise ValidationError("Use an HTTP image URL or a local image path.")
        return value

    def validate_cta_href(self, value):
        if value and (not value.startswith(("/", "https://", "http://")) or value.startswith("//")):
            raise ValidationError("Use a website path or an HTTP URL.")
        return value

    def validate(self, attrs):
        if self.instance and self.instance.source == "eventbrite":
            local_fields = {"summary", "image_alt", "is_active", "is_featured", "order", "classifications", "highlights_url"}
            for key in set(attrs) - local_fields:
                if attrs[key] != getattr(self.instance, key, None):
                    raise ValidationError({key: "This field is managed by Eventbrite. Edit it at the source."})
        else:
            if attrs.get("remote_status", "live") not in ("live", "draft", "cancelled"):
                raise ValidationError({"remote_status": "Choose live, draft or cancelled."})
            if attrs.get("sales_status", "unknown") not in ("unknown", "available", "sold_out", "unavailable"):
                raise ValidationError({"sales_status": "Invalid registration status."})
        start = attrs.get("starts_at", getattr(self.instance, "starts_at", None))
        end = attrs.get("ends_at", getattr(self.instance, "ends_at", None))
        if end and not start:
            raise ValidationError({"starts_at": "Set the start date before the end date."})
        if start and end and end <= start:
            raise ValidationError({"ends_at": "The end must be later than the start."})
        return attrs


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.select_related("source_category").prefetch_related("classifications").all()
    serializer_class = DashboardEventSerializer
    permission_classes = [IsDashboardUser]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        if self.action in ("list", "retrieve"):
            context["visible_ids"] = set(visible_events().values_list("pk", flat=True))
        return context

    def destroy(self, request, *args, **kwargs):
        if self.get_object().source == "eventbrite":
            raise ValidationError("Hide imported events instead of deleting their source link.")
        return super().destroy(request, *args, **kwargs)

    @action(detail=True, methods=["post"], url_path="sync")
    def sync(self, request, pk=None):
        event = self.get_object()
        if event.source != "eventbrite":
            raise ValidationError("This is a manual event.")
        try:
            credentials()
        except SyncError as exc:
            raise ValidationError(str(exc))
        job = enqueue("event", f"/events/{event.external_id}/", "manual event")
        return Response({"job_id": job.id, "status": job.status}, status=202)


class EventCategoryViewSet(viewsets.ModelViewSet):
    queryset = EventCategory.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsDashboardUser]

    def perform_destroy(self, instance):
        if instance.kind == "eventbrite" or instance.source_events.exists() or instance.classified_events.exists():
            raise ValidationError("Hide this category, or remove its event assignments before deleting it.")
        instance.delete()


class EventPagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = "page_size"
    max_page_size = 24


def filtered_events(request):
    queryset = visible_events()
    query = request.query_params.get("search", "").strip()[:200]
    if query:
        queryset = queryset.filter(Q(title__icontains=query) | Q(description__icontains=query) | Q(summary__icontains=query) | Q(location__icontains=query))
    scope = request.query_params.get("scope", "upcoming")
    if scope == "past":
        queryset = queryset.filter(ended_query())
    elif scope != "all":
        queryset = queryset.exclude(ended_query())
    for param in ("category", "classification", "programme"):
        slug = request.query_params.get(param)
        if slug:
            queryset = queryset.filter(source_category__slug=slug) if param == "category" else queryset.filter(classifications__slug=slug)
    fmt = request.query_params.get("format")
    if fmt in ("online", "in_person"):
        queryset = queryset.filter(format=fmt)
    if request.query_params.get("exclude"):
        queryset = queryset.exclude(slug=request.query_params["exclude"])
    return queryset.order_by("-is_featured", "order", F("starts_at").desc(nulls_last=True) if scope == "past" else F("starts_at").asc(nulls_last=True), "id").distinct()


@api_view(["GET"])
@permission_classes([AllowAny])
def event_library(request):
    paginator = EventPagination()
    page = paginator.paginate_queryset(filtered_events(request), request)
    return paginator.get_paginated_response(PublicEventSerializer(page, many=True).data)


@api_view(["GET"])
@permission_classes([AllowAny])
def event_options(request):
    visible = visible_events()
    source_ids = visible.values_list("source_category_id", flat=True)
    local_ids = visible.values_list("classifications__id", flat=True)
    terms = EventCategory.objects.filter(is_visible=True).filter(Q(id__in=source_ids) | Q(id__in=local_ids))
    return Response(CategorySerializer(terms, many=True).data)


@api_view(["GET"])
@permission_classes([AllowAny])
def event_detail(request, slug):
    event = get_object_or_404(visible_events(), slug=slug)
    return Response(PublicEventDetailSerializer(event).data)


@api_view(["GET"])
@permission_classes([AllowAny])
def legacy_events(request):
    return Response(PublicEventDetailSerializer(filtered_events(request), many=True).data)


class SyncSettingsSerializer(serializers.Serializer):
    token = serializers.CharField(required=False, allow_blank=True, write_only=True, max_length=1000, trim_whitespace=True)
    clear_token = serializers.BooleanField(required=False, default=False, write_only=True)
    organization_id = serializers.RegexField(r"^\d+$", required=False, allow_blank=True, max_length=120)
    public_base_url = serializers.URLField(required=False, allow_blank=True, max_length=500)
    auto_sync = serializers.BooleanField(required=False)
    interval_minutes = serializers.IntegerField(required=False, min_value=5, max_value=1440)
    show_uncategorized = serializers.BooleanField(required=False)

    def validate_public_base_url(self, value):
        parsed = urlparse(value)
        if value and (parsed.scheme != "https" or parsed.username or parsed.password or parsed.query or parsed.fragment or parsed.hostname in ("localhost", "127.0.0.1")):
            raise ValidationError("Enter a public HTTPS backend URL, without a query or fragment.")
        return value.rstrip("/")


def settings_data(config):
    return {
        "token_saved": bool(config.token_encrypted), "organization_id": config.organization_id,
        "public_base_url": config.public_base_url, "auto_sync": config.auto_sync,
        "interval_minutes": config.interval_minutes, "show_uncategorized": config.show_uncategorized,
        "connection_ok": config.connection_ok, "connection_checked_at": config.connection_checked_at,
        "last_full_sync": config.last_full_sync, "next_full_sync": config.next_full_sync,
        "worker_heartbeat": config.worker_heartbeat,
        "worker_online": bool(config.worker_heartbeat and config.worker_heartbeat > timezone.now() - timedelta(seconds=90)),
        "webhook_url": f"{config.public_base_url}/api/v1/integrations/eventbrite/webhook/{config.webhook_secret}/" if config.public_base_url else "",
    }


@api_view(["GET", "PATCH"])
@permission_classes([IsDashboardUser])
@transaction.atomic
def sync_settings(request):
    config = control()
    if request.method == "PATCH":
        config = EventSyncControl.objects.select_for_update().get(pk=config.pk)
        serializer = SyncSettingsSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        values = dict(serializer.validated_data)
        token = values.pop("token", "")
        clear = values.pop("clear_token", False)
        changing_credentials = token or clear or values.get("organization_id", config.organization_id) != config.organization_id
        if changing_credentials and config.lock_until and config.lock_until > timezone.now():
            return Response({"detail": "A sync is running. Save connection changes after it finishes."}, status=409)
        if token or clear:
            config.token_encrypted = encrypt_token(token) if token and not clear else ""
        if changing_credentials:
            config.connection_ok = False
            config.connection_checked_at = None
            config.next_full_sync = None
        for key, value in values.items():
            setattr(config, key, value)
        config.save(update_fields=["token_encrypted", "organization_id", "public_base_url", "auto_sync", "interval_minutes", "show_uncategorized", "connection_ok", "connection_checked_at", "next_full_sync"])
    return Response(settings_data(config))


@api_view(["POST"])
@permission_classes([IsDashboardUser])
def test_connection(request):
    config = control()
    try:
        client = EventbriteClient(config)
        result = client.get(f"/organizations/{client.organization_id}/events/", {"page_size": 1})
        if not isinstance(result.get("events"), list):
            raise SyncError("The account did not return an event list.")
    except SyncError as exc:
        config.connection_ok = False
        config.connection_checked_at = timezone.now()
        config.save(update_fields=["connection_ok", "connection_checked_at"])
        return Response({"detail": str(exc)}, status=400)
    checked = EventSyncControl.objects.filter(pk=config.pk, token_encrypted=config.token_encrypted, organization_id=config.organization_id).update(connection_ok=True, connection_checked_at=timezone.now())
    if not checked:
        return Response({"detail": "Connection settings changed during the test. Test the saved connection again."}, status=409)
    config.refresh_from_db()
    return Response({"detail": "Connected. The organization event list is accessible.", **settings_data(config)})


@api_view(["POST"])
@permission_classes([IsDashboardUser])
def request_sync(request):
    try:
        credentials()
    except SyncError as exc:
        raise ValidationError(str(exc))
    job = enqueue(reason="dashboard")
    return Response({"job_id": job.id, "status": job.status}, status=202)


@api_view(["GET"])
@permission_classes([IsDashboardUser])
def sync_jobs(request):
    return Response(list(EventSyncJob.objects.values("id", "kind", "reason", "status", "attempts", "created_at", "finished_at", "due_at", "result", "error")[:50]))


@api_view(["POST"])
@permission_classes([IsDashboardUser])
def retry_sync(request, pk):
    job = get_object_or_404(EventSyncJob, pk=pk, status__in=["failed", "pending"])
    job.status, job.due_at, job.attempts, job.error = "pending", timezone.now(), 0, ""
    job.save(update_fields=["status", "due_at", "attempts", "error"])
    return Response({"job_id": job.id, "status": job.status}, status=202)


class WebhookThrottle(SimpleRateThrottle):
    rate = "120/min"
    scope = "eventbrite-webhook"

    def get_cache_key(self, request, view):
        return self.cache_format % {"scope": self.scope, "ident": self.get_ident(request)}


@api_view(["POST"])
@authentication_classes([])
@permission_classes([AllowAny])
@throttle_classes([WebhookThrottle])
def eventbrite_webhook(request, secret):
    config = control()
    if not config.webhook_secret or not hmac.compare_digest(secret, config.webhook_secret):
        return Response({"detail": "Invalid webhook credentials."}, status=403)
    if not isinstance(request.data, dict):
        raise ValidationError("Expected a JSON object.")
    # Eventbrite's initial test call may contain no event resource.
    if not request.data:
        return Response({"ok": True})
    try:
        url = urlparse(str(request.data.get("api_url", "")))
        valid = url.scheme == "https" and url.hostname == "www.eventbriteapi.com" and url.port in (None, 443) and not (url.username or url.password or url.query or url.fragment)
    except ValueError:
        valid = False
    if not valid:
        raise ValidationError("Expected a canonical Eventbrite API URL.")
    event = re.fullmatch(r"/v3/events/(\d+)/(?:ticket_classes/\d+/)?", url.path)
    other = re.fullmatch(r"/v3/(?:orders|venues|organizers)/\d+/", url.path)
    if not event and not other:
        return Response({"ok": True, "ignored": True})
    if not config.auto_sync:
        return Response({"ok": True, "paused": True}, status=202)
    kind, path = ("event", f"/events/{event[1]}/") if event else ("full", "")
    # Store only the resource path; no attendee/order payload or personal data is fetched.
    payload_config = request.data.get("config")
    if not isinstance(payload_config, dict):
        payload_config = {}
    action_name = str(payload_config.get("action") or request.data.get("action") or "notification")[:60]
    job = enqueue(kind, path, "webhook", dedupe=f"{kind}:{path}:{action_name}:{int(time.time()) // 10}")
    return Response({"ok": True, "job_id": job.id}, status=202)
