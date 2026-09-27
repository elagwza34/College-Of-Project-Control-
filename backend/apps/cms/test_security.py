from datetime import timedelta

from django.contrib.auth import get_user_model
from django.core.cache import cache
from django.core import mail
from django.test import TestCase
from django.test.utils import override_settings
from django.utils import timezone
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient


class DashboardSecurityTests(TestCase):
    def setUp(self):
        cache.clear()
        self.addCleanup(cache.clear)
        self.client = APIClient()
        self.user = get_user_model().objects.create_user('secure-editor', password='test-pass-12345', is_staff=True)
        self.login_url = '/api/v1/cms/auth/login/'

    def login(self, username='secure-editor'):
        return self.client.post(self.login_url, {'username': username, 'password': 'test-pass-12345'}, format='json')

    def test_login_requires_active_staff(self):
        visitor = get_user_model().objects.create_user('visitor', password='test-pass-12345')
        self.assertEqual(self.login('visitor').status_code, 400)
        self.assertFalse(Token.objects.filter(user=visitor).exists())
        self.user.is_active = False
        self.user.save()
        self.assertEqual(self.login().status_code, 400)

    def test_staff_user_can_login_with_email_or_username(self):
        self.user.email = 'editor@example.com'
        self.user.save(update_fields=['email'])
        self.assertEqual(self.login('secure-editor').status_code, 200)
        self.assertEqual(self.login('editor@example.com').status_code, 200)

    def test_login_rate_limit_cannot_be_bypassed_with_forwarded_headers(self):
        for index in range(10):
            response = self.client.post(self.login_url, {'username': 'missing', 'password': 'wrong'}, format='json', HTTP_X_FORWARDED_FOR=f'192.0.2.{index}')
            self.assertEqual(response.status_code, 400)
        response = self.login()
        self.assertEqual(response.status_code, 429)
        self.assertIn('Retry-After', response)

    def test_logout_revokes_token(self):
        response = self.login()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response['Cache-Control'], 'no-store')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + response.data['token'])
        self.assertEqual(self.client.get('/api/v1/cms/enquiries/').status_code, 200)
        self.assertEqual(self.client.post('/api/v1/cms/auth/logout/').status_code, 204)
        self.assertEqual(self.client.get('/api/v1/cms/enquiries/').status_code, 401)

    def test_expired_token_rejected_and_replaced_on_login(self):
        token = Token.objects.create(user=self.user)
        Token.objects.filter(pk=token.pk).update(created=timezone.now() - timedelta(hours=13))
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        self.assertEqual(self.client.get('/api/v1/cms/enquiries/').status_code, 401)
        self.client.credentials()
        response = self.login()
        self.assertEqual(response.status_code, 200)
        self.assertNotEqual(response.data['token'], token.key)

    @override_settings(
        DEBUG=True,
        EMAIL_BACKEND='django.core.mail.backends.locmem.EmailBackend',
        DASHBOARD_PASSWORD_RESET_URL='http://localhost:3000/dashboard/reset-password',
    )
    def test_staff_user_can_reset_password_and_old_sessions_are_revoked(self):
        self.user.email = 'editor@example.com'
        self.user.save(update_fields=['email'])
        old_token = Token.objects.create(user=self.user)
        response = self.client.post('/api/v1/cms/auth/password-reset/', {'email': self.user.email}, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertIn('/dashboard/reset-password/', response.data['reset_link'])
        self.assertEqual(len(mail.outbox), 1)
        link = next(part for part in mail.outbox[0].body.split() if '/dashboard/reset-password/' in part)
        uid, token = link.rstrip('/').split('/')[-2:]
        response = self.client.post(f'/api/v1/cms/auth/password-reset/{uid}/{token}/', {'password': 'different-safe-password-987'}, format='json')
        self.assertEqual(response.status_code, 200)
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password('different-safe-password-987'))
        self.assertFalse(Token.objects.filter(pk=old_token.pk).exists())

    @override_settings(
        DEBUG=True,
        EMAIL_BACKEND='django.core.mail.backends.locmem.EmailBackend',
        DASHBOARD_PASSWORD_RESET_URL='http://localhost:3000/dashboard/reset-password',
    )
    def test_password_reset_allows_reusing_current_password(self):
        self.user.email = 'editor@example.com'
        self.user.save(update_fields=['email'])
        response = self.client.post('/api/v1/cms/auth/password-reset/', {'email': self.user.email}, format='json')
        uid, token = response.data['reset_link'].rstrip('/').split('/')[-2:]
        response = self.client.post(f'/api/v1/cms/auth/password-reset/{uid}/{token}/', {'password': 'test-pass-12345'}, format='json')
        self.assertEqual(response.status_code, 200)
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password('test-pass-12345'))

    @override_settings(EMAIL_BACKEND='django.core.mail.backends.locmem.EmailBackend')
    def test_password_reset_does_not_disclose_account_existence(self):
        response = self.client.post('/api/v1/cms/auth/password-reset/', {'email': 'unknown@example.com'}, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(mail.outbox), 0)

    def test_cms_collections_deny_anonymous_and_nonstaff(self):
        paths = ['pages', 'sections', 'navigation-groups', 'navigation-items', 'media', 'mentors', 'coaches', 'partners', 'professional-credentials', 'sectors', 'events', 'event-categories', 'enquiries', 'articles', 'ipc-images', 'testimonials', 'chatbot/sources', 'page-content']
        for path in paths:
            self.assertEqual(self.client.get(f'/api/v1/cms/{path}/').status_code, 401, path)
        visitor = get_user_model().objects.create_user('visitor')
        token = Token.objects.create(user=visitor)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        for path in paths:
            self.assertEqual(self.client.get(f'/api/v1/cms/{path}/').status_code, 403, path)


class EnquirySecurityTests(TestCase):
    def setUp(self):
        cache.clear()
        self.addCleanup(cache.clear)
        self.client = APIClient()

    def test_submission_rate_limit(self):
        for index in range(5):
            response = self.client.post('/api/v1/enquiries/', {'name': 'Visitor', 'email': 'visitor@example.com'}, format='json', HTTP_X_FORWARDED_FOR=f'192.0.2.{index}')
            self.assertEqual(response.status_code, 201)
        self.assertEqual(self.client.post('/api/v1/enquiries/', {}, format='json').status_code, 429)

    def test_oversized_fields_rejected(self):
        response = self.client.post('/api/v1/enquiries/', {'name': 'Visitor', 'email': 'visitor@example.com', 'organisation': 'x' * 161, 'roleTitle': 'x' * 141, 'enquiryType': 'x' * 81, 'sourcePath': 'x' * 241, 'message': 'x' * 10001}, format='json')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(set(response.data), {'organisation', 'roleTitle', 'enquiryType', 'sourcePath', 'message'})
