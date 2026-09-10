import mimetypes
import urllib.request
from urllib.error import URLError

from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand

from apps.content.models import Partner


class Command(BaseCommand):
    help = "Download partner logos currently stored as an external logo_url and re-host them as uploaded files."

    def handle(self, *args, **options):
        partners = Partner.objects.exclude(logo_url="").filter(logo="")
        if not partners:
            self.stdout.write(self.style.SUCCESS("No partners need migrating — every logo is already stored locally."))
            return

        migrated = 0
        failed = 0
        for partner in partners:
            url = partner.logo_url
            try:
                request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
                with urllib.request.urlopen(request, timeout=15) as response:
                    data = response.read()
                    content_type = response.headers.get_content_type()
            except URLError as exc:
                failed += 1
                self.stderr.write(self.style.ERROR(f"Failed to download {url}: {exc}"))
                continue

            extension = mimetypes.guess_extension(content_type or "") or ".jpg"
            if extension == ".jpe":
                extension = ".jpg"
            filename = f"partner-{partner.pk}{extension}"

            partner.logo.save(filename, ContentFile(data), save=False)
            partner.logo_url = ""
            partner.save(update_fields=["logo", "logo_url"])
            migrated += 1
            self.stdout.write(f"Migrated: {partner} -> {partner.logo.name}")

        self.stdout.write(self.style.SUCCESS(f"Done. Migrated {migrated} logo(s), {failed} failed."))
