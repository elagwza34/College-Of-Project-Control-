from django.core.exceptions import ValidationError
from django.db import models
from django.conf import settings
from .review_catalogue import PROGRAMMES
from .review_storage import private_review_storage, review_photo_path


class Testimonial(models.Model):
    class Status(models.TextChoices):
        PENDING = 'pending', 'Pending review'
        APPROVED = 'approved', 'Approved'
        REJECTED = 'rejected', 'Rejected'

    name = models.CharField(max_length=120)
    programme = models.CharField(max_length=80, choices=PROGRAMMES)
    reviewer_type = models.CharField(max_length=20, choices=[('professional', 'Professional'), ('employer', 'Employer')], default='professional')
    photo = models.ImageField(storage=private_review_storage, upload_to=review_photo_path, blank=True)
    image_url = models.CharField(
        max_length=500,
        blank=True,
        help_text="Used only when no photo is uploaded. Paste a direct image link.",
    )
    review = models.TextField(max_length=4000)
    consent = models.BooleanField(default=False)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING, db_index=True)
    is_featured = models.BooleanField(default=False)
    order = models.PositiveSmallIntegerField(default=0)
    moderation_notes = models.TextField(blank=True, max_length=2000)
    reviewed_by = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL)
    reviewed_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-is_featured', 'order', '-created_at', '-id']

    def __str__(self):
        return f'{self.name} — {self.get_status_display()}'


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
        STAT_SPOTLIGHT = "stat_spotlight", "Statistic spotlight"
        LEAD_FORM = "lead_form", "Lead form"

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
            self.SectionType.STAT_SPOTLIGHT: {"heading", "stat"},
            self.SectionType.LEAD_FORM: {"heading"},
        }.get(self.section_type, set())
        missing = sorted(required - self.content.keys())
        if missing:
            raise ValidationError({"content": f"Missing required fields: {', '.join(missing)}"})

    def __str__(self):
        return f"{self.page.title} — {self.internal_name}"


class MentorProfile(models.Model):
    name = models.CharField(max_length=120)
    initials = models.CharField(
        max_length=8,
        blank=True,
        help_text="Optional. When blank, initials are generated from the mentor's name.",
    )
    role_title = models.CharField(max_length=140)
    affiliation = models.CharField(max_length=160, blank=True)
    specialties = models.CharField(
        max_length=500,
        blank=True,
        help_text="Comma-separated, for example: Project Management, Strategic Execution, P3M.",
    )
    biography = models.TextField()
    image = models.ImageField(
        upload_to="mentors/%Y/%m/",
        blank=True,
        null=True,
        help_text="Uploaded photo. Takes priority over the image URL below when set.",
    )
    image_url = models.CharField(
        max_length=500,
        blank=True,
        help_text="Used only when no image is uploaded. Optional absolute URL or a local path such as /images/mentor-name.webp.",
    )
    linkedin_url = models.URLField(blank=True)
    order = models.PositiveSmallIntegerField(default=0)
    is_active = models.BooleanField(default=True, help_text="Unpublished mentors are saved as a draft and hidden from the site.")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "id"]

    @property
    def display_initials(self):
        if self.initials.strip():
            return self.initials.strip().upper()
        parts = [part for part in self.name.replace("Dr.", "").split() if part]
        return "".join(part[0] for part in parts[:2]).upper()

    def __str__(self):
        return self.name


class Coach(models.Model):
    name = models.CharField(max_length=120)
    qualification = models.CharField(
        max_length=200, blank=True, help_text="e.g. MSc Strategic Project Management"
    )
    focus = models.TextField(help_text="What this coach helps learners with.")
    image = models.ImageField(upload_to="coaches/%Y/%m/", blank=True, null=True)
    order = models.PositiveSmallIntegerField(default=0)
    is_active = models.BooleanField(default=True, help_text="Unpublished coaches are saved as a draft and hidden from the site.")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "id"]

    @property
    def display_initials(self):
        parts = [part for part in self.name.replace("Dr.", "").split() if part]
        return "".join(part[0] for part in parts[:2]).upper()

    def __str__(self):
        return self.name


class Partner(models.Model):
    name = models.CharField(
        max_length=120,
        blank=True,
        help_text="Optional label, used as image alt text and shown in the dashboard.",
    )
    logo = models.ImageField(upload_to="partners/%Y/%m/", blank=True, null=True)
    logo_url = models.CharField(
        max_length=500,
        blank=True,
        help_text="Used only when no logo is uploaded. Paste a direct image link.",
    )
    link_url = models.URLField(blank=True, help_text="Optional. Where the logo links to when clicked.")
    order = models.PositiveSmallIntegerField(default=0)
    is_active = models.BooleanField(default=True, help_text="Unpublished partners are saved as a draft and hidden from the site.")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.name or f"Partner #{self.pk}"


class ProfessionalCredential(models.Model):
    name = models.CharField(
        max_length=120,
        blank=True,
        help_text="Optional. Certificate, awarding body or professional pathway name, for example: APM.",
    )
    role = models.CharField(
        max_length=160,
        blank=True,
        help_text="Optional supporting label, for example: Professional Body.",
    )
    image = models.ImageField(
        upload_to="professional-credentials/%Y/%m/",
        blank=True,
        null=True,
        help_text="Uploaded certificate image. Takes priority over the external image URL.",
    )
    image_url = models.CharField(
        max_length=500,
        blank=True,
        help_text="Used only when no image is uploaded. Paste a direct image link.",
    )
    link_url = models.URLField(
        blank=True,
        help_text="Optional. Where the certificate image links when clicked.",
    )
    order = models.PositiveSmallIntegerField(default=0)
    is_active = models.BooleanField(
        default=True,
        help_text="Unpublished credentials are saved as a draft and hidden from the site.",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.name


class EventFormat(models.TextChoices):
    ONLINE = "online", "Online"
    IN_PERSON = "in_person", "In Person"


class EventCategory(models.Model):
    class Kind(models.TextChoices):
        EVENTBRITE = "eventbrite", "Eventbrite category"
        LOCAL = "local", "Local classification"
        PROGRAMME = "programme", "Programme"

    name = models.CharField(max_length=160)
    slug = models.SlugField(max_length=180, unique=True)
    kind = models.CharField(max_length=16, choices=Kind.choices, default=Kind.LOCAL)
    remote_id = models.CharField(max_length=120, blank=True)
    is_visible = models.BooleanField(default=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]
        constraints = [models.UniqueConstraint(fields=["kind", "remote_id"], condition=~models.Q(remote_id=""), name="unique_event_category_remote")]

    def __str__(self):
        return self.name


class Event(models.Model):
    title = models.CharField(max_length=240)
    slug = models.SlugField(max_length=260, unique=True, blank=True, null=True)
    source = models.CharField(max_length=16, choices=[("manual", "Manual"), ("eventbrite", "Eventbrite")], default="manual")
    organization_id = models.CharField(max_length=120, blank=True)
    source_category = models.ForeignKey(EventCategory, null=True, blank=True, on_delete=models.SET_NULL, related_name="source_events")
    classifications = models.ManyToManyField(EventCategory, blank=True, related_name="classified_events")
    summary = models.TextField(blank=True, max_length=600)
    image_url = models.CharField(max_length=2000, blank=True)
    image_alt = models.CharField(max_length=240, blank=True)
    starts_at = models.DateTimeField(null=True, blank=True)
    ends_at = models.DateTimeField(null=True, blank=True)
    timezone = models.CharField(max_length=100, default="Europe/London")
    location = models.CharField(max_length=500, blank=True)
    organizer = models.CharField(max_length=240, blank=True)
    remote_status = models.CharField(max_length=30, default="live")
    source_is_public = models.BooleanField(default=True)
    sales_status = models.CharField(max_length=20, default="unknown")
    price_label = models.CharField(max_length=100, blank=True)
    is_featured = models.BooleanField(default=False)
    highlights_url = models.URLField(max_length=2000, blank=True)
    last_synced_at = models.DateTimeField(null=True, blank=True)
    remote_changed_at = models.DateTimeField(null=True, blank=True)
    sync_error = models.CharField(max_length=500, blank=True)
    category = models.CharField(max_length=80, blank=True, help_text="e.g. Masterclass, Webinar, Information Session.")
    format = models.CharField(max_length=16, choices=EventFormat.choices, default=EventFormat.ONLINE)
    cadence = models.CharField(max_length=160, blank=True, help_text="e.g. Monthly, or a specific date/time.")
    description = models.TextField(blank=True)
    cta_label = models.CharField(max_length=80, blank=True, default="Register Your Interest")
    cta_href = models.CharField(max_length=2000, blank=True, default="/contact")
    external_id = models.CharField(
        max_length=120, blank=True,
        help_text="ID from an external source (e.g. Eventbrite), used to avoid duplicate imports when syncing.",
    )
    source_url = models.URLField(max_length=2000, blank=True, help_text="Link to the event on the external platform, if any.")
    order = models.PositiveSmallIntegerField(default=0)
    is_active = models.BooleanField(default=True, help_text="Unpublished events are saved as a draft and hidden from the site.")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "id"]
        constraints = [models.UniqueConstraint(fields=["organization_id", "external_id"], condition=models.Q(source="eventbrite") & ~models.Q(external_id=""), name="unique_eventbrite_event")]

    def save(self, *args, **kwargs):
        if not self.slug:
            from django.utils.text import slugify
            from uuid import uuid4
            self.slug = f"{slugify(self.title)[:220] or 'event'}-{uuid4().hex[:12]}"
        return super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class EventSyncControl(models.Model):
    token_encrypted = models.TextField(blank=True)
    organization_id = models.CharField(max_length=120, blank=True)
    public_base_url = models.URLField(max_length=500, blank=True)
    connection_checked_at = models.DateTimeField(null=True, blank=True)
    connection_ok = models.BooleanField(default=False)
    auto_sync = models.BooleanField(default=True)
    interval_minutes = models.PositiveSmallIntegerField(default=15)
    show_uncategorized = models.BooleanField(default=True)
    webhook_secret = models.CharField(max_length=100, blank=True)
    last_full_sync = models.DateTimeField(null=True, blank=True)
    next_full_sync = models.DateTimeField(null=True, blank=True)
    worker_heartbeat = models.DateTimeField(null=True, blank=True)
    lock_until = models.DateTimeField(null=True, blank=True)
    lock_owner = models.CharField(max_length=64, blank=True)


class EventSyncJob(models.Model):
    kind = models.CharField(max_length=16, default="full")
    resource_path = models.CharField(max_length=240, blank=True)
    dedupe_key = models.CharField(max_length=64, unique=True)
    reason = models.CharField(max_length=80, blank=True)
    status = models.CharField(max_length=16, default="pending")
    attempts = models.PositiveSmallIntegerField(default=0)
    due_at = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    finished_at = models.DateTimeField(null=True, blank=True)
    result = models.JSONField(default=dict, blank=True)
    error = models.CharField(max_length=500, blank=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [models.Index(fields=["status", "due_at"])]


class Sector(models.Model):
    title = models.CharField(max_length=120)
    description = models.CharField(max_length=300, blank=True, help_text="Short focus line shown on the sector card.")
    slug = models.SlugField(
        max_length=60, unique=True,
        help_text="Matches the sector's dedicated landing page, e.g. construction, engineering, public-sector, energy.",
    )
    icon = models.CharField(max_length=60, blank=True, help_text="Remix Icon class, e.g. ri-building-line")
    image = models.ImageField(
        upload_to="sectors/%Y/%m/", blank=True, null=True,
        help_text="Used as the card background and the sector's own page hero background. Takes priority over the image URL below.",
    )
    image_url = models.CharField(
        max_length=500, blank=True,
        help_text="Used only when no image is uploaded. Paste a direct image link.",
    )
    link_url = models.CharField(max_length=240, blank=True, help_text="Where this sector's card links to.")
    order = models.PositiveSmallIntegerField(default=0)
    is_active = models.BooleanField(default=True, help_text="Unpublished sectors are saved as a draft and hidden from the site.")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.title


class Enquiry(models.Model):
    class Status(models.TextChoices):
        NEW = "new", "New"
        CONTACTED = "contacted", "Contacted"
        QUALIFIED = "qualified", "Qualified"
        CLOSED = "closed", "Closed"

    name = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=40, blank=True)
    organisation = models.CharField(max_length=160, blank=True)
    role_title = models.CharField(max_length=140, blank=True)
    enquiry_type = models.CharField(max_length=80, blank=True)
    message = models.TextField(blank=True)
    source_path = models.CharField(max_length=240, blank=True)
    status = models.CharField(max_length=16, choices=Status.choices, default=Status.NEW)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name_plural = "Enquiries"

    def __str__(self):
        return f"{self.name} — {self.enquiry_type or 'General enquiry'}"


class Article(models.Model):
    title = models.CharField(max_length=240)
    slug = models.SlugField(max_length=240, unique=True)
    excerpt = models.TextField(max_length=600)
    content = models.TextField(help_text="Use blank lines between paragraphs, ## for headings and - for list items.")
    category = models.CharField(max_length=100, blank=True)
    author = models.CharField(max_length=160, default="College of Project Controls")
    image = models.ImageField(upload_to="articles/%Y/%m/", blank=True, null=True)
    image_url = models.CharField(max_length=2000, blank=True)
    image_alt = models.CharField(max_length=240, blank=True)
    read_minutes = models.PositiveSmallIntegerField(default=5)
    is_published = models.BooleanField(default=False)
    published_at = models.DateTimeField(blank=True, null=True)
    order = models.PositiveSmallIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "-published_at", "-id"]

    def __str__(self):
        return self.title


class IpcImage(models.Model):
    image_url = models.URLField(max_length=2000)
    alt_text = models.CharField(max_length=255, blank=True)
    order = models.PositiveSmallIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.alt_text or f"IPC image {self.pk}"
