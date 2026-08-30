from rest_framework import serializers

from .models import MenuItem, NavigationMenu, Page, PageSection, SiteSettings


class MenuItemSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()
    openInNewTab = serializers.BooleanField(source="open_in_new_tab")

    class Meta:
        model = MenuItem
        fields = ("id", "label", "url", "order", "openInNewTab", "children")

    def get_children(self, obj):
        children = obj.children.filter(is_active=True).order_by("order", "id")
        return MenuItemSerializer(children, many=True).data


class NavigationMenuSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()

    class Meta:
        model = NavigationMenu
        fields = ("location", "name", "items")

    def get_items(self, obj):
        items = obj.items.filter(is_active=True, parent__isnull=True).order_by("order", "id")
        return MenuItemSerializer(items, many=True).data


class SiteSettingsSerializer(serializers.ModelSerializer):
    siteName = serializers.CharField(source="site_name")
    logoText = serializers.CharField(source="logo_text")
    logoUrl = serializers.URLField(source="logo_url")
    primaryCtaLabel = serializers.CharField(source="primary_cta_label")
    primaryCtaUrl = serializers.CharField(source="primary_cta_url")
    announcementEnabled = serializers.BooleanField(source="announcement_enabled")
    announcementText = serializers.CharField(source="announcement_text")
    announcementUrl = serializers.CharField(source="announcement_url")
    footerDescription = serializers.CharField(source="footer_description")
    footerCtaTitle = serializers.CharField(source="footer_cta_title")
    footerCtaBody = serializers.CharField(source="footer_cta_body")
    footerCtaLabel = serializers.CharField(source="footer_cta_label")
    footerCtaUrl = serializers.CharField(source="footer_cta_url")
    copyrightName = serializers.CharField(source="copyright_name")

    class Meta:
        model = SiteSettings
        fields = (
            "siteName", "tagline", "logoText", "logoUrl", "primaryCtaLabel", "primaryCtaUrl",
            "announcementEnabled", "announcementText", "announcementUrl", "footerDescription",
            "footerCtaTitle", "footerCtaBody", "footerCtaLabel", "footerCtaUrl", "copyrightName",
        )


class PageSectionSerializer(serializers.ModelSerializer):
    type = serializers.CharField(source="section_type")
    sectionTypeLabel = serializers.CharField(source="get_section_type_display")
    anchorId = serializers.CharField(source="anchor_id")
    styleVariant = serializers.CharField(source="style_variant")

    class Meta:
        model = PageSection
        fields = ("id", "type", "sectionTypeLabel", "anchorId", "styleVariant", "content")


class PageSerializer(serializers.ModelSerializer):
    sections = serializers.SerializerMethodField()
    navigationTitle = serializers.CharField(source="navigation_title")
    seoTitle = serializers.CharField(source="seo_title")
    seoDescription = serializers.CharField(source="seo_description")
    socialImageUrl = serializers.URLField(source="social_image_url")
    isHomepage = serializers.BooleanField(source="is_homepage")
    updatedAt = serializers.DateTimeField(source="updated_at")

    class Meta:
        model = Page
        fields = (
            "id", "title", "slug", "navigationTitle", "summary", "seoTitle",
            "seoDescription", "socialImageUrl", "isHomepage", "updatedAt", "sections",
        )

    def get_sections(self, obj):
        sections = obj.sections.filter(is_enabled=True).order_by("order", "id")
        return PageSectionSerializer(sections, many=True).data
