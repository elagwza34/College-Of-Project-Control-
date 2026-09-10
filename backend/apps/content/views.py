from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

from .models import Coach, Event, MentorProfile, NavigationMenu, Page, Partner, ProfessionalCredential, PublicationStatus, Sector, SiteSettings
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
    SiteSettingsSerializer,
)


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
def events_list(request):
    events = Event.objects.filter(is_active=True).order_by("order", "id")
    return Response(EventPublicSerializer(events, many=True, context={"request": request}).data)


@api_view(["POST"])
@permission_classes([AllowAny])
def create_enquiry(request):
    serializer = EnquirySerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)
