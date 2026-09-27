from django.shortcuts import get_object_or_404
from django.core.signing import BadSignature, SignatureExpired, TimestampSigner
from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes, throttle_classes
from apps.cms.throttles import EnquiryThrottle
from apps.cms.permissions import IsDashboardUser
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers

from .models import Coach, Event, MentorProfile, NavigationMenu, Page, Partner, ProfessionalCredential, PublicationStatus, Sector, ShortCourse, SiteSettings
from .serializers import (
    CoachPublicSerializer,
    EnquirySerializer,
    EventPublicSerializer,
    MentorPublicSerializer,
    NavigationMenuSerializer,
    PageSerializer,
    PartnerPublicSerializer,
    ProfessionalCredentialPublicSerializer,
    SectorPublicSerializer,
    ShortCoursePublicSerializer,
    SiteSettingsSerializer,
)

MAINTENANCE_TOKEN_MAX_AGE = 60 * 60 * 24 * 7


class MaintenanceSettingsSerializer(serializers.Serializer):
    enabled = serializers.BooleanField()
    heading = serializers.CharField(max_length=120, allow_blank=False)
    message = serializers.CharField(max_length=1000, allow_blank=False)
    pin = serializers.RegexField(regex=r"^\d{6}$", required=False, allow_blank=True, write_only=True)


def maintenance_signer():
    return TimestampSigner(salt="cpcm-maintenance-access-v1")


def maintenance_token_valid(request):
    token = request.headers.get("X-Maintenance-Access", "").strip()
    if not token:
        return False
    try:
        return maintenance_signer().unsign(token, max_age=MAINTENANCE_TOKEN_MAX_AGE) == "maintenance-access"
    except (BadSignature, SignatureExpired):
        return False


def maintenance_payload(settings, request=None):
    return {
        "enabled": settings.maintenance_enabled,
        "authenticated": (not settings.maintenance_enabled) or maintenance_token_valid(request) if request else False,
        "heading": settings.maintenance_heading,
        "message": settings.maintenance_message,
        "pinSet": settings.has_maintenance_pin,
    }


@api_view(["GET"])
def site_detail(_request):
    settings = SiteSettings.load()
    menus = NavigationMenu.objects.filter(is_active=True).prefetch_related("items__children")
    return Response(
        {
            "settings": SiteSettingsSerializer(settings).data,
            "menus": NavigationMenuSerializer(menus, many=True).data,
        }
    )


@api_view(["GET"])
@permission_classes([AllowAny])
def maintenance_status(request):
    settings = SiteSettings.load()
    return Response(maintenance_payload(settings, request))


@api_view(["POST"])
@permission_classes([AllowAny])
def maintenance_verify(request):
    settings = SiteSettings.load()
    pin = str(request.data.get("pin", "")).strip()
    if not settings.maintenance_enabled:
        return Response({"accessToken": "", **maintenance_payload(settings, request)})
    if not pin.isdigit() or len(pin) != 6 or not settings.check_maintenance_pin(pin):
        return Response({"detail": "Invalid access code."}, status=status.HTTP_400_BAD_REQUEST)
    return Response({
        "accessToken": maintenance_signer().sign("maintenance-access"),
        **maintenance_payload(settings, request),
        "authenticated": True,
    })


@api_view(["GET", "PATCH"])
@permission_classes([IsDashboardUser])
def cms_maintenance_settings(request):
    settings = SiteSettings.load()
    if request.method == "GET":
        return Response(maintenance_payload(settings))
    serializer = MaintenanceSettingsSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    data = serializer.validated_data
    if data["enabled"] and not data.get("pin") and not settings.has_maintenance_pin:
        return Response({"pin": ["Set a 6-digit PIN before enabling maintenance mode."]}, status=status.HTTP_400_BAD_REQUEST)
    settings.maintenance_enabled = data["enabled"]
    settings.maintenance_heading = data["heading"]
    settings.maintenance_message = data["message"]
    if data.get("pin"):
        settings.set_maintenance_pin(data["pin"])
    settings.save()
    return Response(maintenance_payload(settings))


@api_view(["GET"])
def navigation(_request):
    menus = NavigationMenu.objects.filter(is_active=True).prefetch_related("items__children")
    return Response({"items": NavigationMenuSerializer(menus, many=True).data})


@api_view(["GET"])
def page_detail(_request, slug):
    page = get_object_or_404(
        Page.objects.prefetch_related("sections"), slug=slug, status=PublicationStatus.PUBLISHED
    )
    return Response(PageSerializer(page).data)


@api_view(["GET"])
def homepage(_request):
    page = get_object_or_404(
        Page.objects.prefetch_related("sections"),
        is_homepage=True,
        status=PublicationStatus.PUBLISHED,
    )
    return Response(PageSerializer(page).data)


@api_view(["GET"])
def mentors_list(request):
    mentors = MentorProfile.objects.filter(is_active=True).order_by("order", "id")
    return Response(MentorPublicSerializer(mentors, many=True, context={"request": request}).data)


@api_view(["GET"])
def mentor_detail(request, pk):
    mentor = get_object_or_404(MentorProfile, pk=pk, is_active=True)
    return Response(MentorPublicSerializer(mentor, context={"request": request}).data)


@api_view(["GET"])
def coaches_list(request):
    coaches = Coach.objects.filter(is_active=True).order_by("order", "id")
    return Response(CoachPublicSerializer(coaches, many=True, context={"request": request}).data)


@api_view(["GET"])
def partners_list(request):
    partners = Partner.objects.filter(is_active=True).order_by("order", "id")
    return Response(PartnerPublicSerializer(partners, many=True, context={"request": request}).data)


@api_view(["GET"])
def professional_credentials_list(request):
    credentials = ProfessionalCredential.objects.filter(is_active=True).order_by("order", "id")
    return Response(
        ProfessionalCredentialPublicSerializer(
            credentials,
            many=True,
            context={"request": request},
        ).data
    )


@api_view(["GET"])
def sectors_list(request):
    sectors = Sector.objects.filter(is_active=True).order_by("order", "id")
    return Response(SectorPublicSerializer(sectors, many=True, context={"request": request}).data)


@api_view(["GET"])
def sector_detail(request, slug):
    sector = get_object_or_404(Sector, slug=slug, is_active=True)
    return Response(SectorPublicSerializer(sector, context={"request": request}).data)


@api_view(["GET"])
def short_courses_list(request):
    courses = ShortCourse.objects.filter(is_active=True).order_by("order", "title")
    return Response(ShortCoursePublicSerializer(courses, many=True, context={"request": request}).data)


@api_view(["GET"])
def short_course_detail(request, slug):
    course = get_object_or_404(ShortCourse, slug=slug, is_active=True)
    return Response(ShortCoursePublicSerializer(course, context={"request": request}).data)


@api_view(["GET"])
def events_list(request):
    events = Event.objects.filter(is_active=True).order_by("order", "id")
    return Response(EventPublicSerializer(events, many=True, context={"request": request}).data)


@api_view(["POST"])
@permission_classes([AllowAny])
@throttle_classes([EnquiryThrottle])
def create_enquiry(request):
    serializer = EnquirySerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)
