from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import NavigationMenu, Page, PublicationStatus, SiteSettings
from .serializers import NavigationMenuSerializer, PageSerializer, SiteSettingsSerializer


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

