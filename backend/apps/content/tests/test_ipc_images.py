from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase

from apps.content.models import IpcImage


class IpcImageApiTests(APITestCase):
    def setUp(self):
        IpcImage.objects.all().delete()
        self.staff = get_user_model().objects.create_user(username="ipc-editor", is_staff=True)
        self.url = "/api/v1/cms/ipc-images/"
        self.public_url = "/api/v1/ipc-images/"

    def test_public_reads_only_active_images_in_order(self):
        second = IpcImage.objects.create(image_url="https://example.com/second.jpg", order=20)
        first = IpcImage.objects.create(image_url="https://example.com/first.jpg", order=10)
        IpcImage.objects.create(image_url="https://example.com/draft.jpg", is_active=False)
        response = self.client.get(self.public_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual([item["id"] for item in response.data], [first.id, second.id])

    def test_staff_can_add_edit_hide_and_delete_images(self):
        self.client.force_authenticate(self.staff)
        response = self.client.post(self.url, {"image_url": "https://example.com/photo.jpg", "alt_text": "A project team", "order": 4}, format="json")
        self.assertEqual(response.status_code, 201)
        detail = f'{self.url}{response.data["id"]}/'
        self.assertEqual(self.client.get(self.public_url).data[0]["alt_text"], "A project team")
        self.assertEqual(self.client.patch(detail, {"image_url": "https://example.com/new.jpg", "order": 1, "is_active": False}, format="json").status_code, 200)
        self.assertEqual(self.client.get(self.public_url).data, [])
        self.assertEqual(self.client.delete(detail).status_code, 204)
        self.assertEqual(self.client.get(self.public_url).data, [])

    def test_anonymous_and_non_staff_cannot_edit(self):
        payload = {"image_url": "https://example.com/photo.jpg"}
        self.assertIn(self.client.post(self.url, payload).status_code, [401, 403])
        user = get_user_model().objects.create_user(username="ordinary-user")
        self.client.force_authenticate(user)
        self.assertEqual(self.client.get(self.url).status_code, 403)
        self.assertEqual(self.client.post(self.url, payload).status_code, 403)
        self.assertEqual(self.client.post(self.public_url, payload).status_code, 405)

    def test_rejects_invalid_and_non_http_links(self):
        self.client.force_authenticate(self.staff)
        for url in ["not-an-image-url", "javascript:alert(1)", "ftp://example.com/image.jpg", "data:image/png;base64,abc"]:
            self.assertEqual(self.client.post(self.url, {"image_url": url}, format="json").status_code, 400)
        self.assertEqual(self.client.post(self.url, {"image_url": "https://example.com/image.jpg", "order": -1}, format="json").status_code, 400)

    def test_empty_collection_stays_empty(self):
        self.assertEqual(self.client.get(self.public_url).data, [])
