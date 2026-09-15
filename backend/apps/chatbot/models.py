from django.db import models


class KnowledgeSource(models.Model):
    title = models.CharField(max_length=200)
    kind = models.CharField(max_length=16, choices=[('website', 'Website'), ('faq', 'Q&A'), ('document', 'Document')])
    reference_path = models.CharField(max_length=240, blank=True)
    content = models.TextField(max_length=80000)
    is_active = models.BooleanField(default=False)
    import_key = models.CharField(max_length=240, unique=True, null=True, blank=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at', '-id']

    def __str__(self):
        return self.title


class ChatQuota(models.Model):
    """Shared worker-safe request counters, with no message text or raw IPs."""
    key = models.CharField(max_length=100, primary_key=True)
    used = models.PositiveIntegerField(default=0)
    expires_at = models.DateTimeField(db_index=True)

