from django.core.management.base import BaseCommand

from apps.cms.models import MediaAsset
from apps.content.signals import LINKED_IMAGE_FIELDS


class Command(BaseCommand):
    help = "Create a Media library entry for every external image link already saved on content records."

    def handle(self, *args, **options):
        created = 0
        skipped = 0
        for model, (field_name, label_field) in LINKED_IMAGE_FIELDS.items():
            for instance in model.objects.exclude(**{field_name: ""}):
                url = (getattr(instance, field_name) or "").strip()
                if not url.lower().startswith(("http://", "https://")):
                    continue
                if MediaAsset.objects.filter(source_url=url).exists():
                    skipped += 1
                    continue
                MediaAsset.objects.create(source_url=url, alt_text=getattr(instance, label_field, "") or "")
                created += 1
                self.stdout.write(f"Added: {model.__name__} #{instance.pk} -> {url}")

        self.stdout.write(self.style.SUCCESS(f"Done. Added {created} link(s), {skipped} already in the library."))
