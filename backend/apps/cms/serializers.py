from rest_framework import serializers

from apps.content.models import Coach, Enquiry, Event, MentorProfile, Partner, ProfessionalCredential, Sector, ShortCourse

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


class DashboardShortCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShortCourse
        fields = (
            "id", "slug", "title", "category", "duration", "format", "owner",
            "audience", "summary", "focus", "detail", "icon", "image_url", "order",
            "is_active", "updated_at",
        )
        read_only_fields = ("id", "updated_at")

    def validate_focus(self, value):
        if not isinstance(value, list) or any(not isinstance(item, str) for item in value):
            raise serializers.ValidationError("Focus must be a list of text items.")
        return value


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
    url = serializers.SerializerMethodField()

    class Meta:
        model = MediaAsset
        fields = ("id", "file", "source_url", "url", "alt_text", "uploadedBy", "uploaded_at")
        read_only_fields = ("id", "uploaded_at")
        extra_kwargs = {"file": {"required": False, "allow_null": True, "write_only": True}}

    def get_url(self, obj):
        if obj.file:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.file.url) if request else obj.file.url
        return obj.source_url

    def validate(self, attrs):
        file = attrs.get("file", getattr(self.instance, "file", None))
        source_url = attrs.get("source_url", getattr(self.instance, "source_url", ""))
        if not file and not source_url:
            raise serializers.ValidationError("Provide an image file or an image URL.")
        return attrs


class DashboardEnquirySerializer(serializers.ModelSerializer):
    roleTitle = serializers.CharField(source="role_title", read_only=True)
    enquiryType = serializers.CharField(source="enquiry_type", read_only=True)
    sourcePath = serializers.CharField(source="source_path", read_only=True)

    assigned_name = serializers.CharField(source="assigned_to.username", read_only=True, default=None)

    def validate_assigned_to(self, user):
        if user and not (user.is_active and user.is_staff):
            raise serializers.ValidationError("Select an active dashboard user.")
        return user

    class Meta:
        model = Enquiry
        fields = (
            "id", "name", "email", "phone", "organisation", "roleTitle",
            "enquiryType", "message", "sourcePath", "status", "created_at", "updated_at",
            "read_at", "internal_notes", "assigned_to", "assigned_name", "follow_up_at",
        )
        read_only_fields = (
            "id", "name", "email", "phone", "organisation", "roleTitle",
            "enquiryType", "message", "sourcePath", "created_at", "updated_at", "read_at",
        )
