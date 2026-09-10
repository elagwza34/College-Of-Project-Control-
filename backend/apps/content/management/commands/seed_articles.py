import json
from pathlib import Path

from django.core.management.base import BaseCommand
from django.db import transaction
from django.utils import timezone
from apps.content.models import Article


class Command(BaseCommand):
    help = "Import existing website articles without overwriting editorial changes."

    @transaction.atomic
    def handle(self, *args, **options):
        source = Path(__file__).resolve().parents[2] / "seed_data" / "articles.json"
        articles = json.loads(source.read_text(encoding="utf-8"))
        count = 0
        for record in articles:
            slug = record.pop("slug")
            _, created = Article.objects.get_or_create(slug=slug, defaults={**record, "is_published": True, "published_at": timezone.now()})
            count += created
        self.stdout.write(self.style.SUCCESS(f"Created {count} articles; existing articles were preserved."))
