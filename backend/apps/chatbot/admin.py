from django.contrib import admin
from .models import AssistantSettings, KnowledgeSource


@admin.register(KnowledgeSource)
class KnowledgeSourceAdmin(admin.ModelAdmin):
    list_display = ('title', 'kind', 'is_active', 'updated_at')
    list_filter = ('kind', 'is_active')
    search_fields = ('title', 'content')
    readonly_fields = ('import_key', 'updated_at')


@admin.register(AssistantSettings)
class AssistantSettingsAdmin(admin.ModelAdmin):
    list_display = ('provider', 'model', 'has_api_key', 'updated_at', 'updated_by')
    readonly_fields = ('api_key_encrypted', 'updated_at')
