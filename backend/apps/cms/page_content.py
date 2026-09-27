"""Schema-bound copy editing. Layout and interactive controls remain in React."""
import json
import re
from urllib.parse import urlsplit
from pathlib import Path
from django.db import transaction
from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import PageContentRevision
from .permissions import IsDashboardUser


def catalogue():
    return json.loads(Path(__file__).with_name('page_content_catalogue.json').read_text(encoding='utf-8'))


def payload(obj):
    return {'draft': obj.draft, 'published': obj.published, 'version': obj.version,
            'updated_at': obj.updated_at, 'updated_by': obj.updated_by.username if obj.updated_by else None,
            'history': obj.history, 'is_hidden': obj.is_hidden}


@api_view(['GET'])
@permission_classes([AllowAny])
def public_content(request):
    allowed = {s['key']: {f['key'] for f in s['fields']} for s in catalogue()}
    values, hidden = {}, []
    for obj in PageContentRevision.objects.all():
        if obj.section_key not in allowed:
            continue
        if obj.published:
            values[obj.section_key] = {k: v for k, v in obj.published.items() if k in allowed[obj.section_key]}
        if obj.is_hidden:
            hidden.append(obj.section_key)
    return Response({'values': values, 'hidden': hidden})


@api_view(['GET'])
@permission_classes([IsDashboardUser])
def content_catalogue(request):
    return Response(catalogue())


@api_view(['GET', 'POST'])
@permission_classes([IsDashboardUser])
def section_content(request, key):
    spec = next((s for s in catalogue() if s['key'] == key), None)
    if not spec:
        return Response({'detail': 'Section not found.'}, status=404)
    if request.method == 'GET':
        obj = PageContentRevision.objects.filter(section_key=key).select_related('updated_by').first()
        return Response(payload(obj) if obj else {'draft': {}, 'published': {}, 'version': 0, 'history': [], 'updated_at': None, 'updated_by': None, 'is_hidden': False})
    data = request.data
    action = data.get('action')
    if action not in ('save', 'publish', 'restore', 'hide', 'show'):
        return Response({'detail': 'Choose save, publish, restore, hide or show.'}, status=400)
    if action == 'save':
        values = data.get('values')
        fields = {f['key']: f for f in spec['fields']}
        if not isinstance(values, dict) or any(k not in fields for k in values):
            return Response({'detail': 'Unknown content fields.'}, status=400)
        for k, value in values.items():
            if not isinstance(value, str) or len(value) > 10000:
                return Response({'detail': 'Content must be text of at most 10,000 characters.'}, status=400)
            if fields[k]['kind'] == 'link':
                valid = False
                if value and not re.search(r'[\\\x00-\x20\x7f]', value):
                    if value.startswith(('/', '#')) and not value.startswith('//'):
                        valid = True
                    else:
                        try:
                            parsed = urlsplit(value)
                            valid = (parsed.scheme in ('https', 'http') and bool(parsed.hostname)) or (parsed.scheme in ('mailto', 'tel') and bool(parsed.path))
                        except ValueError:
                            pass
                if not valid:
                    return Response({'detail': 'Use a page path, #section, HTTP(S) URL, mailto: or tel: link.'}, status=400)
            if fields[k]['kind'] == 'image' and not (value.startswith('https://') or (value.startswith('/') and not value.startswith('//'))):
                return Response({'detail': 'Images must use HTTPS or a local image path.'}, status=400)
    with transaction.atomic():
        obj, _ = PageContentRevision.objects.get_or_create(section_key=key)
        obj = PageContentRevision.objects.select_for_update().get(pk=obj.pk)
        if data.get('version') != obj.version:
            return Response({'detail': 'This section changed in another session. Reload before saving.'}, status=409)
        if action == 'save':
            obj.draft = values
        elif action == 'publish':
            obj.history = ([{'values': obj.published, 'at': timezone.now().isoformat(), 'by': request.user.username, 'version': obj.version}] + obj.history)[:10]
            obj.published = obj.draft
        elif action == 'restore':
            entry = next((h for h in obj.history if h['version'] == data.get('restore_version')), None)
            if not entry:
                return Response({'detail': 'Previous version not found.'}, status=400)
            obj.draft = entry['values']
        else:
            obj.is_hidden = action == 'hide'
        obj.version += 1
        obj.updated_by = request.user
        obj.save()
        return Response(payload(obj))
