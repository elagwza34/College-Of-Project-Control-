from django.db import migrations
from django.utils.text import slugify


def populate(apps, schema_editor):
    Event = apps.get_model('content', 'Event')
    Category = apps.get_model('content', 'EventCategory')
    for event in Event.objects.all():
        if not event.slug:
            event.slug = f'{slugify(event.title)[:220] or "event"}-{event.pk}'
            event.save(update_fields=['slug'])
        if event.category and event.source == 'manual':
            term, _ = Category.objects.get_or_create(slug=f'local-{slugify(event.category)[:160]}', defaults={'name': event.category, 'kind': 'local'})
            event.classifications.add(term)
    for slug, name in [('pcp-level-6', 'Project Controls Professional Level 6'), ('associate-project-manager-level-4', 'Associate Project Manager Level 4'), ('pmo-level-6', 'PMO & Governance')]:
        Category.objects.get_or_create(slug=slug, defaults={'name': name, 'kind': 'programme'})


class Migration(migrations.Migration):
    dependencies = [('content', '0014_eventsynccontrol_eventsyncjob_event_ends_at_and_more')]
    operations = [migrations.RunPython(populate, migrations.RunPython.noop)]
