from io import BytesIO
from tempfile import TemporaryDirectory
from unittest.mock import patch

from PIL import Image
from django.contrib.auth import get_user_model
from django.core.cache import cache
from django.core.files.storage import FileSystemStorage
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.test import APITestCase
from apps.content.models import Testimonial


class TestimonialTests(APITestCase):
    def setUp(self):
        cache.clear()
        self.directory = TemporaryDirectory()
        self.photo_storage = patch.object(Testimonial._meta.get_field('photo'), 'storage', FileSystemStorage(location=self.directory.name))
        self.photo_storage.start()
        self.addCleanup(self.directory.cleanup)
        self.addCleanup(self.photo_storage.stop)
        self.staff = get_user_model().objects.create_user(username='review-editor', is_staff=True)
        self.public = '/api/v1/testimonials/'
        self.cms = '/api/v1/cms/testimonials/'

    def payload(self, **overrides):
        image = BytesIO()
        Image.new('RGB', (1200, 800), 'blue').save(image, format='PNG')
        return { 'name': 'Sample Learner', 'programme': 'pcp-level-6', 'reviewer_type': 'professional', 'review': 'The programme helped me understand planning and forecasting.', 'consent': 'true', 'photo': SimpleUploadedFile('portrait.png', image.getvalue(), content_type='image/png'), **overrides }

    def submit(self, **overrides):
        response = self.client.post(self.public+'submit/', self.payload(**overrides), format='multipart')
        self.assertEqual(response.status_code, 201, response.data)
        return Testimonial.objects.latest('id')

    def test_submission_is_pending_even_when_client_requests_approval(self):
        item = self.submit(status='approved', is_featured='true', reviewed_by=str(self.staff.id))
        self.assertEqual(item.status, 'pending'); self.assertFalse(item.is_featured); self.assertIsNone(item.reviewed_by)
        self.assertEqual(self.client.get(self.public).data, [])
        self.assertEqual(self.client.get(self.public+f'{item.id}/photo/').status_code, 404)
        self.assertIn(self.client.get(self.cms).status_code, [401, 403])
        with item.photo.open('rb') as saved:
            with Image.open(saved) as image:
                self.assertEqual(image.format, 'JPEG'); self.assertLessEqual(image.width, 1000)
                self.assertFalse(image.getexif())

    def test_staff_review_approve_filter_and_withdraw(self):
        item = self.submit()
        self.client.force_authenticate(self.staff)
        pending = self.client.get(self.cms, {'status': 'pending'})
        self.assertEqual(pending.data['count'], 1)
        photo = self.client.get(self.public+f'{item.id}/photo/')
        self.assertEqual(photo.status_code, 200); photo.close()
        response = self.client.patch(self.cms+f'{item.pk}/', {'status': 'approved', 'moderation_notes': 'Checked internally', 'is_featured': True, 'order': 2}, format='json')
        self.assertEqual(response.status_code, 200, response.data)
        item.refresh_from_db(); self.assertEqual(item.reviewed_by, self.staff); self.assertIsNotNone(item.reviewed_at)
        self.client.force_authenticate(None)
        public = self.client.get(self.public).data
        self.assertEqual(len(public), 1); self.assertEqual(public[0]['name'], item.name)
        self.assertNotIn('moderation_notes', public[0]); self.assertNotIn('consent', public[0]); self.assertNotIn('reviewed_by', public[0])
        self.assertEqual(len(self.client.get(self.public, {'programme': 'pcp-level-6'}).data), 1)
        self.assertEqual(self.client.get(self.public, {'programme': 'construction'}).data, [])
        photo = self.client.get(self.public+f'{item.pk}/photo/'); self.assertEqual(photo.status_code, 200); photo.close()
        self.client.force_authenticate(self.staff)
        self.client.patch(self.cms+f'{item.pk}/', {'status': 'rejected'}, format='json')
        self.client.force_authenticate(None)
        self.assertEqual(self.client.get(self.public).data, [])
        self.assertEqual(self.client.get(self.public+f'{item.pk}/photo/').status_code, 404)

    def test_validation_and_consent_required(self):
        for override in [{'consent': 'false'}, {'programme': 'not-a-programme'}, {'review': 'short'}, {'name': ' '}, {'photo': SimpleUploadedFile('bad.jpg', b'not an image', content_type='image/jpeg')}]:
            cache.clear()
            response = self.client.post(self.public+'submit/', self.payload(**override), format='multipart')
            self.assertEqual(response.status_code, 400, response.data)
        self.assertFalse(Testimonial.objects.exists())

    def test_normal_user_cannot_moderate_or_view_pending_portrait(self):
        item = self.submit()
        normal = get_user_model().objects.create_user(username='learner')
        self.client.force_authenticate(normal)
        self.assertEqual(self.client.patch(self.cms+f'{item.pk}/', {'status': 'approved'}, format='json').status_code, 403)
        self.assertEqual(self.client.get(self.public+f'{item.pk}/photo/').status_code, 404)

    def test_staff_cannot_rewrite_submission_or_approve_without_consent(self):
        item = self.submit()
        self.client.force_authenticate(self.staff)
        self.client.patch(self.cms+f'{item.pk}/', {'name': 'Replacement', 'review': 'Different words', 'status': 'approved'}, format='json')
        item.refresh_from_db(); self.assertEqual(item.name, 'Sample Learner'); self.assertNotEqual(item.review, 'Different words')
        item.consent = False; item.status = 'pending'; item.save()
        self.assertEqual(self.client.patch(self.cms+f'{item.pk}/', {'status': 'approved'}, format='json').status_code, 400)

    def test_rate_limit_and_featured_order(self):
        for index in range(5):
            self.submit(name=f'Learner {index}')
        self.assertEqual(self.client.post(self.public+'submit/', self.payload(), format='multipart').status_code, 429)
        Testimonial.objects.update(status='approved')
        last = Testimonial.objects.latest('id'); last.is_featured=True; last.save()
        self.assertEqual(self.client.get(self.public).data[0]['id'], last.id)
        self.assertEqual(len(self.client.get(self.public+'programmes/').data), 13)
