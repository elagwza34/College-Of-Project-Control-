from django.conf import settings
from django.db import models


class PublicationStatus(models.TextChoices):
    DRAFT = "draft", "Draft"
    PUBLISHED = "published", "Published"


class Page(models.Model):
    slug = models.SlugField(max_length=140, unique=True)
    title = models.CharField(max_length=140)
    seo_title = models.CharField(max_length=70, blank=True)
    seo_description = models.CharField(max_length=170, blank=True)
    status = models.CharField(max_length=16, choices=PublicationStatus.choices, default=PublicationStatus.DRAFT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["title"]

    def __str__(self):
        return self.title


class SectionType(models.TextChoices):
    HERO = "hero", "Hero"
    RICH_TEXT = "rich_text", "Rich text"
    CARD_GRID = "card_grid", "Card grid"
    STATS = "stats", "Stats"
    FAQ = "faq", "FAQ"
    CTA = "cta", "Call to action"
    TESTIMONIAL = "testimonial", "Testimonial"
    GALLERY = "gallery", "Gallery"
    CUSTOM = "custom", "Custom"


class Section(models.Model):
    page = models.ForeignKey(Page, related_name="sections", on_delete=models.CASCADE)
    internal_name = models.CharField(max_length=140, blank=True, help_text="Human-readable label shown in the dashboard, e.g. \"Hero\", \"Why Join\"")
    section_type = models.CharField(max_length=32, choices=SectionType.choices, default=SectionType.CUSTOM)
    order = models.PositiveSmallIntegerField(default=0)
    is_visible = models.BooleanField(default=True)
    content = models.JSONField(default=dict, blank=True)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.internal_name or f"{self.page.slug} — {self.get_section_type_display()} ({self.order})"

    def clean(self):
        from django.core.exceptions import ValidationError

        if not isinstance(self.content, dict):
            raise ValidationError({"content": "Section content must be an object."})


class NavigationLocation(models.TextChoices):
    HEADER = "header", "Header"
    FOOTER = "footer", "Footer"


class NavigationGroup(models.Model):
    name = models.CharField(max_length=80)
    location = models.CharField(max_length=16, choices=NavigationLocation.choices)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["location", "order"]

    def __str__(self):
        return f"{self.name} ({self.get_location_display()})"


class NavigationItem(models.Model):
    group = models.ForeignKey(NavigationGroup, related_name="items", on_delete=models.CASCADE)
    label = models.CharField(max_length=80)
    url = models.CharField(max_length=240)
    icon = models.CharField(max_length=60, blank=True, help_text="Remix Icon class, e.g. ri-book-open-line")
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.label


class MediaAsset(models.Model):
    file = models.ImageField(upload_to="uploads/%Y/%m/")
    alt_text = models.CharField(max_length=200, blank=True)
    uploaded_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL, related_name="cms_uploads"
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-uploaded_at"]

    def __str__(self):
        return self.file.name

class PageContentRevision(models.Model):
    section_key = models.CharField(max_length=32, unique=True)
    draft = models.JSONField(default=dict)
    published = models.JSONField(default=dict)
    history = models.JSONField(default=list)
    version = models.PositiveIntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL)
