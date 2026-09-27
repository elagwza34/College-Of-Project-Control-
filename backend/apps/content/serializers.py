from rest_framework import serializers

from .models import Coach, Enquiry, Event, MentorProfile, MenuItem, NavigationMenu, Page, PageSection, Partner, ProfessionalCredential, Sector, ShortCourse, SiteSettings


class MentorPublicSerializer(serializers.ModelSerializer):
    initials = serializers.CharField(source="display_initials", read_only=True)
    role = serializers.CharField(source="role_title")
    specialties = serializers.SerializerMethodField()
    body = serializers.CharField(source="biography")
    imageUrl = serializers.SerializerMethodField()
    linkedinUrl = serializers.CharField(source="linkedin_url")

    class Meta:
        model = MentorProfile
        fields = ("id", "initials", "name", "role", "affiliation", "specialties", "body", "imageUrl", "linkedinUrl")

    def get_specialties(self, obj):
        return [value.strip() for value in obj.specialties.split(",") if value.strip()]

    def get_imageUrl(self, obj):
        if not obj.image:
            return obj.image_url or ""
        request = self.context.get("request")
        return request.build_absolute_uri(obj.image.url) if request else obj.image.url


class CoachPublicSerializer(serializers.ModelSerializer):
    initials = serializers.CharField(source="display_initials", read_only=True)
    imageUrl = serializers.SerializerMethodField()

    class Meta:
        model = Coach
        fields = ("id", "initials", "name", "qualification", "focus", "imageUrl")

    def get_imageUrl(self, obj):
        if not obj.image:
            return ""
        request = self.context.get("request")
        return request.build_absolute_uri(obj.image.url) if request else obj.image.url


class PartnerPublicSerializer(serializers.ModelSerializer):
    imageUrl = serializers.SerializerMethodField()
    linkUrl = serializers.CharField(source="link_url")

    class Meta:
        model = Partner
        fields = ("id", "name", "imageUrl", "linkUrl")

    def get_imageUrl(self, obj):
        if not obj.logo:
            return obj.logo_url or ""
        request = self.context.get("request")
        return request.build_absolute_uri(obj.logo.url) if request else obj.logo.url


class ProfessionalCredentialPublicSerializer(serializers.ModelSerializer):
    imageUrl = serializers.SerializerMethodField()
    linkUrl = serializers.CharField(source="link_url")

    class Meta:
        model = ProfessionalCredential
        fields = ("id", "name", "role", "imageUrl", "linkUrl")

    def get_imageUrl(self, obj):
        if not obj.image:
            return obj.image_url or ""
        request = self.context.get("request")
        return request.build_absolute_uri(obj.image.url) if request else obj.image.url


class SectorPublicSerializer(serializers.ModelSerializer):
    imageUrl = serializers.SerializerMethodField()
    linkUrl = serializers.CharField(source="link_url")

    class Meta:
        model = Sector
        fields = ("id", "slug", "title", "description", "icon", "imageUrl", "linkUrl")

    def get_imageUrl(self, obj):
        if not obj.image:
            return obj.image_url or ""
        request = self.context.get("request")
        return request.build_absolute_uri(obj.image.url) if request else obj.image.url


class ShortCoursePublicSerializer(serializers.ModelSerializer):
    imageUrl = serializers.CharField(source="image_url")

    class Meta:
        model = ShortCourse
        fields = (
            "id", "slug", "title", "category", "duration", "format", "owner",
            "audience", "summary", "focus", "detail", "icon", "imageUrl", "order",
        )


class EventPublicSerializer(serializers.ModelSerializer):
    format = serializers.CharField(source="get_format_display")
    ctaLabel = serializers.CharField(source="cta_label")
    ctaHref = serializers.CharField(source="cta_href")

    class Meta:
        model = Event
        fields = ("id", "title", "category", "format", "cadence", "description", "ctaLabel", "ctaHref")


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
    content = serializers.SerializerMethodField()

    class Meta:
        model = PageSection
        fields = ("id", "type", "sectionTypeLabel", "anchorId", "styleVariant", "content")

    def get_content(self, obj):
        content = dict(obj.content)
        if obj.style_variant != "mentors":
            return content

        mentors = MentorProfile.objects.filter(is_active=True).order_by("order", "id")
        content["items"] = MentorPublicSerializer(mentors, many=True, context=self.context).data
        return content


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


class EnquirySerializer(serializers.ModelSerializer):
    organisation = serializers.CharField(required=False, allow_blank=True, max_length=160)
    roleTitle = serializers.CharField(source="role_title", required=False, allow_blank=True, max_length=140)
    enquiryType = serializers.CharField(source="enquiry_type", required=False, allow_blank=True, max_length=80)
    sourcePath = serializers.CharField(source="source_path", required=False, allow_blank=True, max_length=240)
    message = serializers.CharField(required=False, allow_blank=True, max_length=10000)

    class Meta:
        model = Enquiry
        fields = (
            "id", "name", "email", "phone", "organisation", "roleTitle",
            "enquiryType", "message", "sourcePath", "created_at",
        )
        read_only_fields = ("id", "created_at")
