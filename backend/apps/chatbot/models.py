import base64
import hashlib
import hmac

from cryptography.fernet import Fernet, InvalidToken
from django.conf import settings
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


class AssistantSettings(models.Model):
    PROVIDER_CHOICES = [('openai', 'OpenAI'), ('openrouter', 'OpenRouter')]

    provider = models.CharField(max_length=20, choices=PROVIDER_CHOICES, default='openai')
    model = models.CharField(max_length=120, default='gpt-4.1-mini')
    api_key_encrypted = models.TextField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL)

    class Meta:
        verbose_name = 'Assistant settings'
        verbose_name_plural = 'Assistant settings'

    def __str__(self):
        return 'Programme assistant settings'

    @classmethod
    def get_solo(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj

    @staticmethod
    def cipher():
        key = hmac.new(settings.SECRET_KEY.encode(), b'cpcm-chatbot-api-key-v1', hashlib.sha256).digest()
        return Fernet(base64.urlsafe_b64encode(key))

    @property
    def has_api_key(self):
        return bool(self.api_key_encrypted)

    def set_api_key(self, value):
        self.api_key_encrypted = self.cipher().encrypt(value.encode()).decode()

    def clear_api_key(self):
        self.api_key_encrypted = ''

    def get_api_key(self):
        if not self.api_key_encrypted:
            return ''
        try:
            return self.cipher().decrypt(self.api_key_encrypted.encode()).decode()
        except InvalidToken:
            return ''
