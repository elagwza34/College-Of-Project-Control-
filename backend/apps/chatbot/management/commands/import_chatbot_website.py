import json
from pathlib import Path
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from apps.chatbot.models import KnowledgeSource
from apps.chatbot.views import SourceSerializer


class Command(BaseCommand):
    help = 'Import the reviewed public website snapshot. Existing sources are preserved unless --replace is used.'

    def add_arguments(self, parser):
        parser.add_argument('--replace', action='store_true', help='Refresh existing website sources from the new snapshot; keep their activation state.')

    @transaction.atomic
    def handle(self, *args, **options):
        file = Path(__file__).resolve().parents[2] / 'website_knowledge.json'
        if not file.exists():
            raise CommandError('Run npm run chatbot:export in frontend first.')
        data = json.loads(file.read_text(encoding='utf-8'))
        created = updated = 0
        for source in data['sources']:
            serializer = SourceSerializer(data={**source, 'kind': 'website', 'is_active': True})
            serializer.is_valid(raise_exception=True)
            item, new = KnowledgeSource.objects.get_or_create(import_key=source['import_key'], defaults=serializer.validated_data)
            if new:
                created += 1
            elif options['replace']:
                for key, value in serializer.validated_data.items():
                    if key != 'is_active':
                        setattr(item, key, value)
                item.save(); updated += 1
        self.stdout.write(self.style.SUCCESS(f'Website sources: {created} created, {updated} refreshed.'))
