from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework.test import APIClient
from apps.content.models import Enquiry
from .page_content import catalogue


class DashboardWorkflowTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user('editor', is_staff=True)
        self.enquiry = Enquiry.objects.create(name='Test learner', email='test@example.com', message='Explain Level 6')
        self.client.force_authenticate(self.user)

    def test_read_is_idempotent_and_independent_of_status(self):
        notices = '/api/v1/cms/enquiries/notifications/'
        self.assertEqual(self.client.get(notices).data['unread_count'], 1)
        url = f'/api/v1/cms/enquiries/{self.enquiry.pk}/read/'
        result = self.client.post(url)
        self.assertEqual(result.status_code, 200)
        self.assertEqual(result.data['status'], 'new')
        self.assertIsNotNone(result.data['read_at'])
        self.assertEqual(self.client.post(url).data['read_at'], result.data['read_at'])
        self.assertEqual(self.client.get(notices).data['unread_count'], 0)

    def test_followup_filters_and_preserves_submission(self):
        url = f'/api/v1/cms/enquiries/{self.enquiry.pk}/'
        result = self.client.patch(url, {'assigned_to': self.user.pk, 'internal_notes': 'Call later', 'follow_up_at': '2026-01-01T10:00:00Z', 'status': 'contacted', 'message': 'Replace'}, format='json')
        self.assertEqual(result.status_code, 200)
        self.assertEqual(result.data['assigned_name'], 'editor')
        self.enquiry.refresh_from_db()
        self.assertEqual(self.enquiry.message, 'Explain Level 6')
        self.assertEqual(len(self.client.get('/api/v1/cms/enquiries/?search=explain&due=true').data), 1)
        self.assertEqual(len(self.client.get('/api/v1/cms/enquiries/?status=closed').data), 0)
        self.assertEqual(self.client.post('/api/v1/cms/enquiries/', {}).status_code, 405)

    def test_staff_required_and_nonstaff_assignment_rejected(self):
        visitor = get_user_model().objects.create_user('visitor')
        self.assertEqual(self.client.patch(f'/api/v1/cms/enquiries/{self.enquiry.pk}/', {'assigned_to': visitor.pk}, format='json').status_code, 400)
        self.client.force_authenticate(visitor)
        self.assertEqual(self.client.get('/api/v1/cms/enquiries/notifications/').status_code, 403)
        self.client.force_authenticate(None)
        self.assertIn(self.client.get('/api/v1/cms/enquiries/notifications/').status_code, (401, 403))

    def test_drafts_publish_conflicts_and_restore(self):
        spec = next(s for s in catalogue() if any(f['kind'] == 'text' for f in s['fields']))
        key = spec['key']; field = next(f['key'] for f in spec['fields'] if f['kind'] == 'text')
        url = f'/api/v1/cms/page-content/{key}/'
        self.assertEqual(self.client.post(url, {'action': 'save', 'version': 0, 'values': {field: 'New heading'}}, format='json').status_code, 200)
        self.assertNotIn(key, self.client.get('/api/v1/page-content/').data['values'])
        self.assertEqual(self.client.post(url, {'action': 'save', 'version': 0, 'values': {}}, format='json').status_code, 409)
        self.assertEqual(self.client.post(url, {'action': 'publish', 'version': 1}, format='json').status_code, 200)
        self.assertEqual(self.client.get('/api/v1/page-content/').data['values'][key][field], 'New heading')
        response = self.client.post(url, {'action': 'restore', 'version': 2, 'restore_version': 1}, format='json')
        self.assertEqual(response.data['draft'], {})
        self.assertEqual(self.client.get('/api/v1/page-content/').data['values'][key][field], 'New heading')
        self.client.post(url, {'action': 'publish', 'version': 3}, format='json')
        self.assertNotIn(key, self.client.get('/api/v1/page-content/').data['values'])

    def test_sections_can_be_hidden_and_shown(self):
        spec = next(s for s in catalogue() if any(f['kind'] == 'text' for f in s['fields']))
        key = spec['key']; field = next(f['key'] for f in spec['fields'] if f['kind'] == 'text')
        url = f'/api/v1/cms/page-content/{key}/'
        self.assertEqual(self.client.post(url, {'action': 'save', 'version': 0, 'values': {field: 'Visible heading'}}, format='json').status_code, 200)
        self.assertEqual(self.client.post(url, {'action': 'publish', 'version': 1}, format='json').status_code, 200)
        hidden = self.client.post(url, {'action': 'hide', 'version': 2}, format='json')
        self.assertEqual(hidden.status_code, 200)
        self.assertTrue(hidden.data['is_hidden'])
        self.assertIn(key, self.client.get('/api/v1/page-content/').data['hidden'])
        shown = self.client.post(url, {'action': 'show', 'version': 3}, format='json')
        self.assertEqual(shown.status_code, 200)
        self.assertFalse(shown.data['is_hidden'])
        self.assertNotIn(key, self.client.get('/api/v1/page-content/').data['hidden'])

    def test_content_schema_and_permissions(self):
        spec = next(s for s in catalogue() if any(f['kind'] == 'image' for f in s['fields']))
        field = next(f['key'] for f in spec['fields'] if f['kind'] == 'image')
        url = f"/api/v1/cms/page-content/{spec['key']}/"
        for values in ({field: 'javascript:alert(1)'}, {'unknown': 'value'}, {field: True}):
            self.assertEqual(self.client.post(url, {'action': 'save', 'version': 0, 'values': values}, format='json').status_code, 400)
        self.client.force_authenticate(None)
        self.assertIn(self.client.post(url, {'action': 'publish', 'version': 0}, format='json').status_code, (401, 403))
        self.assertEqual(self.client.get('/api/v1/page-content/').status_code, 200)

    def test_button_links_validate_and_publish(self):
        spec = next(s for s in catalogue() if any(f['kind'] == 'link' for f in s['fields']))
        field = next(f['key'] for f in spec['fields'] if f['kind'] == 'link')
        url = f"/api/v1/cms/page-content/{spec['key']}/"
        for value in ['javascript:alert(1)', '//example.com', '/\\evil.com', 'data:text/html,test', '']:
            response = self.client.post(url, {'action': 'save', 'version': 0, 'values': {field: value}}, format='json')
            self.assertEqual(response.status_code, 400, value)
        version = 0
        for value in ['/contact', '#funding', 'https://example.com/path', 'mailto:info@example.com', 'tel:+44123456789']:
            response = self.client.post(url, {'action': 'save', 'version': version, 'values': {field: value}}, format='json')
            self.assertEqual(response.status_code, 200, value)
            version += 1
        self.client.post(url, {'action': 'publish', 'version': version}, format='json')
        self.assertEqual(self.client.get('/api/v1/page-content/').data['values'][spec['key']][field], 'tel:+44123456789')
