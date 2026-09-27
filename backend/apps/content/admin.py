from django.contrib import admin
from .models import Article, CaseStudy


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "is_published", "published_at", "order")
    list_filter = ("is_published", "category")
    search_fields = ("title", "excerpt", "content")
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ("created_at", "updated_at")


@admin.register(CaseStudy)
class CaseStudyAdmin(admin.ModelAdmin):
    list_display = ("title", "sector", "client_name", "is_published", "is_featured", "published_at", "order")
    list_filter = ("is_published", "is_featured", "sector")
    search_fields = ("title", "headline", "summary", "client_name", "sector")
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ("created_at", "updated_at")

from .models import Coach, Enquiry, Event, MentorProfile, MenuItem, NavigationMenu, Page, PageSection, Partner, ProfessionalCredential, Sector, ShortCourse, SiteSettings

admin.site.site_header = "College of Project Control — Content Dashboard"
admin.site.site_title = "Project Control CMS"
admin.site.index_title = "Website administration"


class PageSectionInline(admin.StackedInline):
    model = PageSection
    extra = 0
    fields = ("internal_name", "section_type", "order", "is_enabled", "anchor_id", "style_variant", "content")
    show_change_link = True


@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "status", "is_homepage", "updated_at")
    list_filter = ("status", "is_homepage")
    search_fields = ("title", "slug", "summary")
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ("created_at", "updated_at")
    inlines = [PageSectionInline]
    fieldsets = (
        ("Page", {"fields": ("title", "slug", "navigation_title", "summary", "status", "is_homepage")}),
        ("Search and sharing", {"fields": ("seo_title", "seo_description", "social_image_url")}),
        ("Publishing", {"fields": ("published_at", "created_at", "updated_at")}),
    )


class MenuItemInline(admin.TabularInline):
    model = MenuItem
    extra = 1
    fields = ("label", "url", "parent", "order", "is_active", "open_in_new_tab")


@admin.register(NavigationMenu)
class NavigationMenuAdmin(admin.ModelAdmin):
    list_display = ("name", "location", "is_active")
    inlines = [MenuItemInline]


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    fieldsets = (
        ("Brand", {"fields": ("site_name", "tagline", "logo_text", "logo_url")}),
        ("Header", {"fields": ("primary_cta_label", "primary_cta_url", "announcement_enabled", "announcement_text", "announcement_url")}),
        ("Maintenance mode", {"fields": ("maintenance_enabled", "maintenance_heading", "maintenance_message", "maintenance_pin_hash")}),
        ("Footer", {"fields": ("footer_description", "footer_cta_title", "footer_cta_body", "footer_cta_label", "footer_cta_url", "copyright_name")}),
    )
    readonly_fields = ("maintenance_pin_hash",)

    def has_add_permission(self, request):
        return not SiteSettings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(MentorProfile)
class MentorProfileAdmin(admin.ModelAdmin):
    list_display = ("name", "role_title", "affiliation", "order", "is_active", "updated_at")
    list_editable = ("order", "is_active")
    list_filter = ("is_active",)
    search_fields = ("name", "role_title", "affiliation", "specialties", "biography")
    ordering = ("order", "id")
    fieldsets = (
        ("Profile", {"fields": ("name", "initials", "role_title", "affiliation", "biography")}),
        ("Expertise", {"fields": ("specialties",)}),
        ("Links and image", {"fields": ("image", "image_url", "linkedin_url")}),
        ("Publishing", {"fields": ("order", "is_active")}),
    )


@admin.register(Coach)
class CoachAdmin(admin.ModelAdmin):
    list_display = ("name", "qualification", "order", "is_active", "updated_at")
    list_editable = ("order", "is_active")
    list_filter = ("is_active",)
    search_fields = ("name", "qualification", "focus")
    ordering = ("order", "id")
    fieldsets = (
        ("Profile", {"fields": ("name", "qualification", "focus")}),
        ("Image", {"fields": ("image",)}),
        ("Publishing", {"fields": ("order", "is_active")}),
    )


@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ("__str__", "order", "is_active", "updated_at")
    list_editable = ("order", "is_active")
    list_filter = ("is_active",)
    search_fields = ("name",)
    ordering = ("order", "id")
    fieldsets = (
        ("Logo", {"fields": ("name", "logo", "logo_url", "link_url")}),
        ("Publishing", {"fields": ("order", "is_active")}),
    )


@admin.register(ProfessionalCredential)
class ProfessionalCredentialAdmin(admin.ModelAdmin):
    list_display = ("name", "role", "order", "is_active", "updated_at")
    list_editable = ("order", "is_active")
    list_filter = ("is_active",)
    search_fields = ("name", "role")
    ordering = ("order", "id")
    fieldsets = (
        ("Credential", {"fields": ("name", "role")}),
        ("Certificate image", {"fields": ("image", "image_url", "link_url")}),
        ("Publishing", {"fields": ("order", "is_active")}),
    )


@admin.register(Sector)
class SectorAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "order", "is_active", "updated_at")
    list_editable = ("order", "is_active")
    list_filter = ("is_active",)
    search_fields = ("title", "slug", "description")
    ordering = ("order", "id")
    fieldsets = (
        ("Sector", {"fields": ("title", "slug", "description", "icon")}),
        ("Image and link", {"fields": ("image", "image_url", "link_url")}),
        ("Publishing", {"fields": ("order", "is_active")}),
    )


@admin.register(ShortCourse)
class ShortCourseAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "duration", "order", "is_active", "updated_at")
    list_editable = ("order", "is_active")
    list_filter = ("is_active", "category")
    search_fields = ("title", "slug", "summary", "audience")
    prepopulated_fields = {"slug": ("title",)}
    ordering = ("order", "title")
    fieldsets = (
        ("Course", {"fields": ("title", "slug", "category", "duration", "format", "owner", "icon")}),
        ("Content", {"fields": ("summary", "audience", "focus")}),
        ("Hero image", {"fields": ("image_url",)}),
        ("Publishing", {"fields": ("order", "is_active")}),
    )


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "format", "order", "is_active", "updated_at")
    list_editable = ("order", "is_active")
    list_filter = ("is_active", "format")
    search_fields = ("title", "category", "description", "external_id")
    ordering = ("order", "id")
    fieldsets = (
        ("Event", {"fields": ("title", "category", "format", "cadence", "description")}),
        ("Call to action", {"fields": ("cta_label", "cta_href")}),
        ("External source", {"fields": ("external_id", "source_url")}),
        ("Publishing", {"fields": ("order", "is_active")}),
    )


@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "organisation", "enquiry_type", "status", "created_at")
    list_editable = ("status",)
    list_filter = ("status", "enquiry_type", "created_at")
    search_fields = ("name", "email", "phone", "organisation", "role_title", "message")
    readonly_fields = ("created_at", "updated_at", "source_path")
    ordering = ("-created_at",)
