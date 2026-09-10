from datetime import timedelta
from unittest.mock import Mock, patch

from django.contrib.auth import get_user_model
from django.utils import timezone
from rest_framework.test import APITestCase

from apps.content.models import Event, EventCategory, EventSyncJob
from apps.content.eventbrite import control, credentials, import_event, refresh_one, sync_all, SyncError, enqueue, run_worker_tick


class EventTests(APITestCase):
    def setUp(self):
        self.staff = get_user_model().objects.create_user(username='events-editor', is_staff=True)
        self.library = '/api/v1/events/library/'
        self.cms = '/api/v1/cms/'
        self.remote = Mock(organization_id='42')
        self.remote.get.return_value = {'description': '<p>Full description</p><script>secret()</script>'}

    def event(self, **kwargs):
        return Event.objects.create(**{'title': 'Planning masterclass', 'starts_at': timezone.now() + timedelta(days=1), 'ends_at': timezone.now() + timedelta(days=1, hours=1), **kwargs})

    def payload(self, **kwargs):
        return {'id': '123', 'organization_id': '42', 'name': {'text': 'Remote event'}, 'listed': True, 'status': 'live', 'start': {'utc': '2027-05-01T10:00:00Z', 'timezone': 'Europe/London'}, 'end': {'utc': '2027-05-01T12:00:00Z'}, 'changed': '2026-09-09T12:00:00Z', 'online_event': True, 'url': 'https://www.eventbrite.com/e/123', 'category': {'id': '101', 'name': 'Business'}, 'ticket_availability': {'has_available_tickets': True}, **kwargs}

    def test_visibility_applies_to_all_endpoints_and_any_hidden_term_wins(self):
        shown = EventCategory.objects.create(name='Shown', slug='shown')
        hidden = EventCategory.objects.create(name='Hidden', slug='hidden', is_visible=False)
        event = self.event(); event.classifications.set([shown, hidden])
        for url in [self.library, self.library + '?search=Planning&page_size=8']:
            self.assertEqual(self.client.get(url).data['count'], 0)
        self.assertEqual(self.client.get('/api/v1/events/').data, [])
        self.assertEqual(self.client.get('/api/v1/events/options/').data, [])
        self.assertEqual(self.client.get(f'/api/v1/events/{event.slug}/').status_code, 404)
        hidden.is_visible = True; hidden.save()
        self.assertEqual(self.client.get(self.library).data['count'], 1)
        event.source_category = hidden; event.classifications.clear(); event.save()
        hidden.is_visible = False; hidden.save()
        self.assertEqual(self.client.get(self.library).data['count'], 0)

    def test_uncategorized_private_past_and_booking_states(self):
        live = self.event()
        self.event(source_is_public=False)
        self.event(remote_status='draft')
        past = self.event(starts_at=timezone.now()-timedelta(hours=2), ends_at=timezone.now()-timedelta(hours=1))
        cancelled = self.event(remote_status='cancelled')
        self.assertEqual(self.client.get(self.library).data['count'], 2)
        self.assertEqual(self.client.get(self.library, {'scope': 'past'}).data['count'], 1)
        for event in [past, cancelled]:
            self.assertEqual(self.client.get(f'/api/v1/events/{event.slug}/').data['booking_url'], '')
        config = control(); config.show_uncategorized = False; config.save()
        self.assertEqual(self.client.get(self.library).data['count'], 0)
        category = EventCategory.objects.create(name='Programme', slug='programme', kind='programme')
        live.classifications.add(category)
        self.assertEqual(self.client.get(self.library, {'programme': category.slug}).data['count'], 1)

    def test_import_preserves_local_fields_and_stable_slug(self):
        self.assertEqual(import_event(self.payload(), self.remote), 'created')
        event = Event.objects.get(external_id='123'); slug = event.slug
        event.summary = 'Our introduction'; event.is_active = False; event.is_featured = True; event.order = 7; event.save()
        category = EventCategory.objects.create(name='Local', slug='local', is_visible=False)
        event.classifications.add(category)
        import_event(self.payload(name={'text': 'Changed title'}), self.remote)
        event.refresh_from_db()
        self.assertEqual(event.title, 'Changed title'); self.assertEqual(event.slug, slug)
        self.assertEqual(event.summary, 'Our introduction'); self.assertFalse(event.is_active)
        self.assertTrue(event.is_featured); self.assertEqual(event.order, 7)
        self.assertEqual(list(event.classifications.all()), [category])
        self.assertEqual(event.description, 'Full description')
        self.assertEqual(Event.objects.count(), 1)
        self.assertEqual(import_event(self.payload(changed='2026-01-01T00:00:00Z'), self.remote), 'skipped')
        self.assertEqual(Event.objects.get(pk=event.pk).title, 'Changed title')

    def test_private_event_unpublished_and_missing_confirmation(self):
        import_event(self.payload(), self.remote)
        import_event(self.payload(listed=False), self.remote)
        self.assertEqual(self.client.get(self.library).data['count'], 0)
        self.remote.event.side_effect = SyncError('Temporarily unavailable', 503)
        with self.assertRaises(SyncError): refresh_one('123', self.remote)
        self.assertEqual(Event.objects.get().remote_status, 'live')
        self.remote.event.side_effect = SyncError('Not found', 404)
        self.assertEqual(refresh_one('123', self.remote), 'hidden')
        self.assertEqual(Event.objects.get().remote_status, 'deleted')

    def test_foreign_organization_rejected_and_partial_list_does_not_remove(self):
        with self.assertRaises(SyncError): import_event(self.payload(organization_id='999'), self.remote)
        self.assertFalse(Event.objects.exists())
        event = self.event(source='eventbrite', organization_id='42', external_id='999')
        self.remote.get.side_effect = [{'events': [], 'pagination': {'has_more_items': True}}, SyncError('Network failed')]
        with self.assertRaises(SyncError): sync_all(self.remote)
        event.refresh_from_db(); self.assertTrue(event.source_is_public)
        self.remote.event.assert_not_called()

    def test_settings_staff_only_encrypted_and_blank_preserves(self):
        path = self.cms + 'eventbrite/settings/'
        self.assertIn(self.client.get(path).status_code, [401, 403])
        self.client.force_authenticate(self.staff)
        response = self.client.patch(path, {'token': 'private-test-value', 'organization_id': '42'}, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertNotIn('private-test-value', str(response.data))
        self.assertNotIn('private-test-value', control().token_encrypted)
        self.assertEqual(credentials()[0], 'private-test-value')
        self.client.patch(path, {'token': '', 'interval_minutes': 5}, format='json')
        self.assertEqual(credentials()[0], 'private-test-value')
        self.assertEqual(self.client.patch(path, {'interval_minutes': 1}, format='json').status_code, 400)
        self.assertEqual(self.client.patch(path, {'public_base_url': 'http://localhost:8000'}, format='json').status_code, 400)
        self.client.patch(path, {'clear_token': True}, format='json')
        self.assertFalse(control().token_encrypted)

    def test_imported_fields_readonly_and_local_visibility_editable(self):
        import_event(self.payload(), self.remote)
        event = Event.objects.get(); self.client.force_authenticate(self.staff)
        path = self.cms + f'events/{event.id}/'
        self.assertEqual(self.client.patch(path, {'title': 'Local override'}, format='json').status_code, 400)
        self.assertEqual(self.client.patch(path, {'summary': 'Local summary', 'is_active': False}, format='json').status_code, 200)
        self.assertEqual(self.client.delete(path).status_code, 400)
        self.client.force_authenticate(None)
        self.assertEqual(self.client.get(f'/api/v1/events/{event.slug}/').status_code, 404)

    def test_webhook_validates_origin_secret_payload_and_deduplicates(self):
        path = f'/api/v1/integrations/eventbrite/webhook/{control().webhook_secret}/'
        self.assertEqual(self.client.post('/api/v1/integrations/eventbrite/webhook/wrong/', {}, format='json').status_code, 403)
        self.assertEqual(self.client.post(path, {}, format='json').status_code, 200)
        for url in ['http://127.0.0.1/admin/', 'https://www.eventbriteapi.com.evil.test/v3/events/123/', 'https://www.eventbriteapi.com:bad/v3/events/123/']:
            self.assertEqual(self.client.post(path, {'api_url': url}, format='json').status_code, 400)
        data = {'api_url': 'https://www.eventbriteapi.com/v3/events/123/', 'config': 'malformed'}
        with patch('apps.content.events.time.time', return_value=100):
            self.assertEqual(self.client.post(path, data, format='json').status_code, 202)
            self.assertEqual(self.client.post(path, data, format='json').status_code, 202)
        self.assertEqual(EventSyncJob.objects.count(), 1)
        self.assertEqual(EventSyncJob.objects.get().resource_path, '/events/123/')

    def test_worker_retries_then_completes_and_coalesces(self):
        job = enqueue(); self.assertEqual(enqueue().id, job.id)
        with patch('apps.content.eventbrite.EventbriteClient', return_value=self.remote), patch('apps.content.eventbrite.sync_all', side_effect=SyncError('Temporary failure')):
            self.assertTrue(run_worker_tick())
        job.refresh_from_db(); self.assertEqual(job.status, 'pending'); self.assertEqual(job.attempts, 1)
        self.assertGreater(job.due_at, timezone.now())
        self.assertIsNone(control().lock_until)
        job.due_at = timezone.now(); job.save()
        with patch('apps.content.eventbrite.EventbriteClient', return_value=self.remote), patch('apps.content.eventbrite.sync_all', return_value={'created': 2}):
            self.assertTrue(run_worker_tick())
        job.refresh_from_db(); self.assertEqual(job.status, 'complete'); self.assertEqual(job.result, {'created': 2})
        self.assertIsNotNone(control().last_full_sync)

    def test_active_lease_prevents_parallel_import(self):
        config = control(); config.lock_until = timezone.now()+timedelta(minutes=5); config.lock_owner='other'; config.save()
        enqueue()
        with patch('apps.content.eventbrite.EventbriteClient') as client:
            self.assertFalse(run_worker_tick()); client.assert_not_called()

    def test_full_pagination_import_and_source_category_visibility_survives(self):
        term = EventCategory.objects.create(name='Business', slug='eventbrite-101', kind='eventbrite', remote_id='101', is_visible=False)
        def response(path, params=None):
            if path.endswith('/description/'):
                return {'description': '<p>Details</p>'}
            if params.get('page') == 1:
                return {'events': [self.payload()], 'pagination': {'has_more_items': True, 'continuation': 'next-page'}}
            self.assertEqual(params.get('continuation'), 'next-page')
            return {'events': [self.payload(id='124')], 'pagination': {'has_more_items': False}}
        self.remote.get.side_effect = response
        self.assertEqual(sync_all(self.remote)['created'], 2)
        term.refresh_from_db(); self.assertFalse(term.is_visible)
        self.assertEqual(self.client.get(self.library).data['count'], 0)

    def test_connection_test_uses_saved_token_and_enables_scheduler(self):
        self.client.force_authenticate(self.staff)
        self.client.patch(self.cms+'eventbrite/settings/', {'token': 'test-token', 'organization_id': '42'}, format='json')
        with patch('apps.content.events.EventbriteClient') as client:
            client.return_value.get.return_value = {'events': []}
            self.assertEqual(self.client.post(self.cms+'eventbrite/test/', {}, format='json').status_code, 200)
        self.assertTrue(control().connection_ok)
        with patch('apps.content.eventbrite.EventbriteClient', return_value=self.remote), patch('apps.content.eventbrite.sync_all', return_value={'created': 0}):
            run_worker_tick()
        self.assertEqual(EventSyncJob.objects.get().reason, 'scheduled')
        self.assertGreater(control().next_full_sync, timezone.now())

    def test_filter_pagination_and_stale_sold_out(self):
        for i in range(13): self.event(title=f'Event {i}')
        self.assertEqual(len(self.client.get(self.library, {'page_size': 8}).data['results']), 8)
        self.assertEqual(self.client.get(self.library, {'search': 'Event 12'}).data['count'], 1)
        event = self.event(source='eventbrite', source_url='https://www.eventbrite.com/e/123', sales_status='sold_out', last_synced_at=timezone.now())
        url = f'/api/v1/events/{event.slug}/'
        self.assertEqual(self.client.get(url).data['booking_url'], '')
        event.last_synced_at = timezone.now()-timedelta(hours=1); event.save()
        self.assertEqual(self.client.get(url).data['booking_label'], 'Check availability on Eventbrite')
        self.assertTrue(self.client.get(url).data['booking_url'])
