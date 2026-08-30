from django.contrib import admin

from .models import MenuItem, NavigationMenu, Page, PageSection, SiteSettings

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
        ("Footer", {"fields": ("footer_description", "footer_cta_title", "footer_cta_body", "footer_cta_label", "footer_cta_url", "copyright_name")}),
    )

    def has_add_permission(self, request):
        return not SiteSettings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False

