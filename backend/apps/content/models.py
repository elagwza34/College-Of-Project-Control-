from django.core.exceptions import ValidationError
from django.db import models


class PublicationStatus(models.TextChoices):
    DRAFT = "draft", "Draft"
    PUBLISHED = "published", "Published"
    ARCHIVED = "archived", "Archived"


class SiteSettings(models.Model):
    site_name = models.CharField(max_length=120, default="College of Project Control")
    tagline = models.CharField(max_length=180, blank=True)
    logo_text = models.CharField(max_length=80, default="College of Project Control")
    logo_url = models.URLField(blank=True)
    primary_cta_label = models.CharField(max_length=60, blank=True)
    primary_cta_url = models.CharField(max_length=240, blank=True)
    announcement_enabled = models.BooleanField(default=False)
    announcement_text = models.CharField(max_length=180, blank=True)
    announcement_url = models.CharField(max_length=240, blank=True)
    footer_description = models.TextField(blank=True)
    footer_cta_title = models.CharField(max_length=120, blank=True)
    footer_cta_body = models.TextField(blank=True)
    footer_cta_label = models.CharField(max_length=60, blank=True)
    footer_cta_url = models.CharField(max_length=240, blank=True)
    copyright_name = models.CharField(max_length=120, default="College of Project Control")
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Site settings"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        raise ValidationError("Site settings cannot be deleted.")

    @classmethod
    def load(cls):
        instance, _ = cls.objects.get_or_create(pk=1)
        return instance

    def __str__(self):
        return "Global site settings"


class NavigationMenu(models.Model):
    class Location(models.TextChoices):
        HEADER = "header", "Header"
        FOOTER_PRIMARY = "footer_primary", "Footer — primary"
        FOOTER_SECONDARY = "footer_secondary", "Footer — secondary"
        LEGAL = "legal", "Footer — legal"

    name = models.CharField(max_length=80)
    location = models.CharField(max_length=32, choices=Location.choices, unique=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["location"]

    def __str__(self):
        return self.name


class MenuItem(models.Model):
    menu = models.ForeignKey(NavigationMenu, related_name="items", on_delete=models.CASCADE)
    parent = models.ForeignKey(
        "self", related_name="children", null=True, blank=True, on_delete=models.CASCADE
    )
    label = models.CharField(max_length=80)
    url = models.CharField(max_length=240)
    order = models.PositiveSmallIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    open_in_new_tab = models.BooleanField(default=False)

    class Meta:
        ordering = ["order", "id"]

    def clean(self):
        if self.parent and self.parent.menu_id != self.menu_id:
            raise ValidationError({"parent": "Parent items must belong to the same menu."})

    def __str__(self):
        return self.label


class Page(models.Model):
    title = models.CharField(max_length=140)
    slug = models.SlugField(max_length=140, unique=True, help_text="Public URL, for example: about-us")
    navigation_title = models.CharField(max_length=80, blank=True)
    summary = models.TextField(blank=True)
    status = models.CharField(
        max_length=16, choices=PublicationStatus.choices, default=PublicationStatus.DRAFT
    )
    is_homepage = models.BooleanField(default=False)
    seo_title = models.CharField(max_length=70, blank=True)
    seo_description = models.CharField(max_length=170, blank=True)
    social_image_url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["title"]

    def clean(self):
        if self.is_homepage:
            conflict = Page.objects.filter(is_homepage=True).exclude(pk=self.pk).exists()
            if conflict:
                raise ValidationError({"is_homepage": "Only one page can be the homepage."})

    def __str__(self):
        return self.title


class PageSection(models.Model):
    class SectionType(models.TextChoices):
        HERO = "hero", "Hero"
        RICH_TEXT = "rich_text", "Rich text"
        FEATURE_GRID = "feature_grid", "Feature grid"
        CARD_GRID = "card_grid", "Card grid"
        STATS = "stats", "Statistics"
        MEDIA_COPY = "media_copy", "Media and copy"
        TESTIMONIAL = "testimonial", "Testimonial"
        FAQ = "faq", "Frequently asked questions"
        CTA = "cta", "Call to action"
        LOGO_MARQUEE = "logo_marquee", "Logo marquee"
        FUNDING_CALCULATOR = "funding_calculator", "Funding calculator"

    page = models.ForeignKey(Page, related_name="sections", on_delete=models.CASCADE)
    internal_name = models.CharField(
        max_length=100, help_text="Only shown in the dashboard, for example: Homepage hero"
    )
    section_type = models.CharField(max_length=32, choices=SectionType.choices)
    order = models.PositiveSmallIntegerField(default=0)
    is_enabled = models.BooleanField(default=True)
    anchor_id = models.SlugField(max_length=80, blank=True)
    style_variant = models.CharField(max_length=60, blank=True, default="default")
    content = models.JSONField(
        default=dict,
        help_text=(
            "Structured section content. Hero example: "
            '{"eyebrow":"Welcome","title":"Page title","body":"Intro copy",'
            '"primaryCta":{"label":"Get started","url":"/contact"}}'
        ),
    )

    class Meta:
        ordering = ["order", "id"]
        constraints = [
            models.UniqueConstraint(fields=["page", "order"], name="unique_section_order_per_page")
        ]

    def clean(self):
        if not isinstance(self.content, dict):
            raise ValidationError({"content": "Section content must be a JSON object."})
        required = {
            self.SectionType.HERO: {"title"},
            self.SectionType.RICH_TEXT: {"heading", "body"},
            self.SectionType.FEATURE_GRID: {"heading", "items"},
            self.SectionType.CARD_GRID: {"heading", "items"},
            self.SectionType.STATS: {"items"},
            self.SectionType.MEDIA_COPY: {"heading", "body"},
            self.SectionType.TESTIMONIAL: {"quote", "name"},
            self.SectionType.FAQ: {"heading", "items"},
            self.SectionType.CTA: {"heading"},
            self.SectionType.LOGO_MARQUEE: {"items"},
            self.SectionType.FUNDING_CALCULATOR: {"heading", "employerOptions", "programmeOptions"},
        }.get(self.section_type, set())
        missing = sorted(required - self.content.keys())
        if missing:
            raise ValidationError({"content": f"Missing required fields: {', '.join(missing)}"})

    def __str__(self):
        return f"{self.page.title} — {self.internal_name}"
