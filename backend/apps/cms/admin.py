from django.contrib import admin

from .models import MediaAsset, NavigationGroup, NavigationItem, Page, Section


class SectionInline(admin.StackedInline):
    model = Section
    extra = 0


@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "status", "updated_at")
    list_filter = ("status",)
    search_fields = ("title", "slug")
    inlines = [SectionInline]


class NavigationItemInline(admin.TabularInline):
    model = NavigationItem
    extra = 0


@admin.register(NavigationGroup)
class NavigationGroupAdmin(admin.ModelAdmin):
    list_display = ("name", "location", "order")
    list_filter = ("location",)
    inlines = [NavigationItemInline]


@admin.register(MediaAsset)
class MediaAssetAdmin(admin.ModelAdmin):
    list_display = ("file", "alt_text", "uploaded_by", "uploaded_at")
