"""Restore only missing original sector data; preserve existing CMS edits."""
import json
from pathlib import Path

from run_local import load_local_environment

load_local_environment()
import django

django.setup()

from django.db import transaction
from apps.content.models import Sector


if __name__ == "__main__":
    rows = json.loads((Path(__file__).resolve().parent.parent / "docs/sectors-restore.json").read_text())
    with transaction.atomic():
        for row in rows:
            sector = Sector.objects.filter(slug=row["slug"]).first()
            created = sector is None
            if created:
                sector = Sector(**row, is_active=True)
            else:
                for field, value in row.items():
                    if not getattr(sector, field) and not (field == "image_url" and sector.image):
                        setattr(sector, field, value)
                sector.is_active = True
            sector.full_clean()
            sector.save()
            print(f'{sector.slug}: {"created" if created else "restored missing fields"}')
