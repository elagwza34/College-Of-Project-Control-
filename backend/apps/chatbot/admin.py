from django.contrib import admin
from .models import KnowledgeSource


@admin.register(KnowledgeSource)
class KnowledgeSourceAdmin(admin.ModelAdmin):
    list_display = ('title', 'kind', 'is_active', 'updated_at')
    list_filter = ('kind', 'is_active')
    search_fields = ('title', 'content')
    readonly_fields = ('import_key', 'updated_at')

