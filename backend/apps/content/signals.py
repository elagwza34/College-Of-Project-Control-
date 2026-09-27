from django.db.models.signals import post_save

from .models import Article, IpcImage, MentorProfile, Partner, ProfessionalCredential, Sector, ShortCourse, Testimonial

# Maps each model to (field holding a pasted external image link, field used as the alt text label)
LINKED_IMAGE_FIELDS = {
    MentorProfile: ("image_url", "name"),
    Partner: ("logo_url", "name"),
    ProfessionalCredential: ("image_url", "name"),
    Sector: ("image_url", "title"),
    ShortCourse: ("image_url", "title"),
    Article: ("image_url", "title"),
    IpcImage: ("image_url", "alt_text"),
    Testimonial: ("image_url", "name"),
}


def track_external_image(sender, instance, **kwargs):
    field_name, label_field = LINKED_IMAGE_FIELDS[sender]
    url = (getattr(instance, field_name) or "").strip()
    if not url.lower().startswith(("http://", "https://")):
        return
    from apps.cms.models import MediaAsset

    if MediaAsset.objects.filter(source_url=url).exists():
        return
    MediaAsset.objects.create(source_url=url, alt_text=getattr(instance, label_field, "") or "")


def connect():
    for model in LINKED_IMAGE_FIELDS:
        post_save.connect(
            track_external_image, sender=model, dispatch_uid=f"track_external_image_{model.__name__}"
        )
