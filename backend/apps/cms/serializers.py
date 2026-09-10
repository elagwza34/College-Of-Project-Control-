from rest_framework import serializers

from apps.content.models import Coach, Enquiry, Event, MentorProfile, Partner, ProfessionalCredential, Sector

from .models import MediaAsset, NavigationGroup, NavigationItem, Page, Section


class DashboardMentorSerializer(serializers.ModelSerializer):
    class Meta:
        model = MentorProfile
        fields = (
            "id", "name", "initials", "role_title", "affiliation", "specialties",
            "biography", "image", "image_url", "linkedin_url", "order", "is_active", "updated_at",
        )
        read_only_fields = ("id", "updated_at")


class DashboardCoachSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coach
        fields = ("id", "name", "qualification", "focus", "image", "order", "is_active", "updated_at")
        read_only_fields = ("id", "updated_at")


class DashboardPartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partner
        fields = ("id", "name", "logo", "logo_url", "link_url", "order", "is_active", "updated_at")
        read_only_fields = ("id", "updated_at")


class DashboardProfessionalCredentialSerializer(serializers.ModelSerializer):
    remove_image = serializers.BooleanField(write_only=True, required=False, default=False)

    class Meta:
        model = ProfessionalCredential
        fields = (
            "id", "name", "role", "image", "image_url", "link_url",
            "remove_image", "order", "is_active", "updated_at",
        )
        read_only_fields = ("id", "updated_at")

    def create(self, validated_data):
        validated_data.pop("remove_image", None)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        remove_image = validated_data.pop("remove_image", False)
        if remove_image and instance.image:
            instance.image.delete(save=False)
            instance.image = None
        return super().update(instance, validated_data)


class DashboardSectorSerializer(serializers.ModelSerializer):
    remove_image = serializers.BooleanField(write_only=True, required=False, default=False)

    class Meta:
        model = Sector
        fields = (
            "id", "title", "slug", "description", "icon", "image", "image_url", "link_url",
            "remove_image", "order", "is_active", "updated_at",
        )
        read_only_fields = ("id", "updated_at")

    def create(self, validated_data):
        validated_data.pop("remove_image", None)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        remove_image = validated_data.pop("remove_image", False)
        if remove_image and instance.image:
            instance.image.delete(save=False)
            instance.image = None
        return super().update(instance, validated_data)


class DashboardEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = (
            "id", "title", "category", "format", "cadence", "description",
            "cta_label", "cta_href", "external_id", "source_url", "order", "is_active", "updated_at",
        )
        read_only_fields = ("id", "updated_at")


class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ("id", "page", "internal_name", "section_type", "order", "is_visible", "content")


class PageSerializer(serializers.ModelSerializer):
    sections = SectionSerializer(many=True, read_only=True)

    class Meta:
        model = Page
        fields = (
            "id", "slug", "title", "seo_title", "seo_description", "status",
            "created_at", "updated_at", "sections",
        )
        read_only_fields = ("id", "created_at", "updated_at")


class NavigationItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = NavigationItem
        fields = ("id", "group", "label", "url", "icon", "order")


class NavigationGroupSerializer(serializers.ModelSerializer):
    items = NavigationItemSerializer(many=True, read_only=True)

    class Meta:
        model = NavigationGroup
        fields = ("id", "name", "location", "order", "items")


class MediaAssetSerializer(serializers.ModelSerializer):
    uploadedBy = serializers.CharField(source="uploaded_by.username", read_only=True, default=None)

    class Meta:
        model = MediaAsset
        fields = ("id", "file", "alt_text", "uploadedBy", "uploaded_at")
        read_only_fields = ("id", "uploaded_at")


class DashboardEnquirySerializer(serializers.ModelSerializer):
    roleTitle = serializers.CharField(source="role_title", read_only=True)
    enquiryType = serializers.CharField(source="enquiry_type", read_only=True)
    sourcePath = serializers.CharField(source="source_path", read_only=True)

    class Meta:
        model = Enquiry
        fields = (
            "id", "name", "email", "phone", "organisation", "roleTitle",
            "enquiryType", "message", "sourcePath", "status", "created_at", "updated_at",
        )
        read_only_fields = (
            "id", "name", "email", "phone", "organisation", "roleTitle",
            "enquiryType", "message", "sourcePath", "created_at", "updated_at",
        )
