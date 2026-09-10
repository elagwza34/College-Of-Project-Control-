"""Import the user-supplied partner logos without duplicating existing URLs."""
import json
from pathlib import Path

from run_local import load_local_environment

load_local_environment()
import django

django.setup()

from django.db import transaction
from django.db.models import Max
from apps.content.models import Partner

NAMES = [
    "Wincanton", "Stanlow Terminals", "Bilfinger", "BMT",
    "UK Agri-Tech Centre", "University of Sheffield", "University of Hull",
    "Savills", "NuVision", "Pragmatics 3D", "Suncombe",
    "St John Ambulance Jersey", "United Lincolnshire Hospitals NHS Trust",
    "NHS", "DHU Healthcare", "Callisto Pharma Group", "Amber Therapeutics",
    "Trafford Council", "North Yorkshire Council", "Kirklees Council",
    "ECS", "VINCI", "Watts Group", "Primech Building Services Ltd",
    "Morgan Sindall Construction", "Barhale",
]
BASE = "https://jokdxsdbxorzciulkdyl.supabase.co/storage/v1/object/public/images/"


if __name__ == "__main__":
    files = json.loads(
        (Path(__file__).resolve().parent.parent / "docs/partner-logos-import.json")
        .read_text(encoding="utf-8-sig")
    )
    assert len(files) == len(NAMES) == len(set(files))
    created_count = 0
    with transaction.atomic():
        next_order = (Partner.objects.aggregate(value=Max("order"))["value"] or 0) + 1
        for filename, name in zip(files, NAMES):
            url = BASE + filename
            existing = Partner.objects.filter(logo_url=url).first()
            if existing:
                if not existing.is_active:
                    existing.is_active = True
                    existing.save(update_fields=["is_active", "updated_at"])
                continue
            partner = Partner(name=name, logo_url=url, order=next_order, is_active=True)
            partner.full_clean()
            partner.save()
            created_count += 1
            next_order += 1
    print(json.dumps({"created": created_count, "supplied_unique": len(files),
                      "total_partners": Partner.objects.count()}))
