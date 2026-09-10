from datetime import timedelta
from io import BytesIO

from PIL import Image
from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.management import call_command
from django.test import override_settings
from django.utils import timezone
from rest_framework.test import APITestCase
import tempfile

from apps.content.models import Article


class ArticleApiTests(APITestCase):
    def setUp(self):
        self.staff = get_user_model().objects.create_user(username="article-editor", is_staff=True)
        self.public = "/api/v1/articles/"
        self.cms = "/api/v1/cms/articles/"
        self.payload = {"title": "Planning with confidence", "slug": "planning", "excerpt": "A practical guide.", "content": "## Planning\n\nReliable schedules help teams.", "category": "Practice"}

    def publish(self, slug="planning", **overrides):
        return Article.objects.create(**{**self.payload, "slug": slug, "is_published": True, "published_at": timezone.now(), **overrides})

    def test_list_and_detail_hide_drafts_and_future_articles(self):
        active = self.publish()
        self.publish("draft", is_published=False)
        self.publish("scheduled", published_at=timezone.now() + timedelta(days=1))
        self.publish("undated", published_at=None)
        response = self.client.get(self.public)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["count"], 1)
        self.assertEqual(response.data["results"][0]["id"], active.id)
        self.assertNotIn("content", response.data["results"][0])
        self.assertEqual(self.client.get(self.public + "planning/").data["content"], active.content)
        for slug in ["draft", "scheduled", "undated", "missing"]:
            self.assertEqual(self.client.get(self.public + slug + "/").status_code, 404)

    def test_search_pagination_order_and_carousel_limit(self):
        for i in range(15):
            self.publish(f"article-{i}", order=i, title=f"Guide {i}")
        self.publish("draft", is_published=False, title="Secret draft")
        response = self.client.get(self.public, {"page_size": 8})
        self.assertEqual(len(response.data["results"]), 8)
        self.assertEqual(response.data["results"][0]["slug"], "article-0")
        page2 = self.client.get(self.public, {"page_size": 8, "page": 2})
        self.assertEqual(len(page2.data["results"]), 7)
        self.assertEqual(self.client.get(self.public, {"search": "GUIDE 14"}).data["count"], 1)
        self.assertEqual(self.client.get(self.public, {"search": "schedules"}).data["count"], 15)
        self.assertEqual(self.client.get(self.public, {"search": "Practice"}).data["count"], 15)
        self.assertEqual(self.client.get(self.public, {"search": "Secret"}).data["count"], 0)
        self.assertEqual(self.client.get(self.public, {"search": "no matches"}).data["count"], 0)
        self.assertEqual(self.client.get(self.public, {"exclude": "article-0"}).data["count"], 14)
        self.assertEqual(self.client.get(self.public, {"page": 99}).status_code, 404)

    def test_staff_create_edit_publish_unpublish_delete(self):
        self.client.force_authenticate(self.staff)
        response = self.client.post(self.cms, self.payload, format="json")
        self.assertEqual(response.status_code, 201)
        detail = f'{self.cms}{response.data["id"]}/'
        self.assertEqual(self.client.get(self.public).data["count"], 0)
        response = self.client.patch(detail, {"is_published": True, "title": "Updated guide"}, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.data["published_at"])
        self.assertEqual(self.client.get(self.public + "planning/").data["title"], "Updated guide")
        self.assertEqual(self.client.patch(detail, {"is_published": False}, format="json").status_code, 200)
        self.assertEqual(self.client.get(self.public + "planning/").status_code, 404)
        self.assertEqual(self.client.delete(detail).status_code, 204)

    def test_permissions_and_validation(self):
        self.assertIn(self.client.post(self.cms, self.payload).status_code, [401, 403])
        user = get_user_model().objects.create_user(username="reader")
        self.client.force_authenticate(user)
        self.assertEqual(self.client.get(self.cms).status_code, 403)
        self.assertEqual(self.client.post(self.cms, self.payload).status_code, 403)
        self.assertEqual(self.client.post(self.public, self.payload).status_code, 405)
        self.client.force_authenticate(self.staff)
        for overrides in [{"content": ""}, {"slug": "bad slug"}, {"read_minutes": 0}, {"image_url": "javascript:alert(1)"}]:
            self.assertEqual(self.client.post(self.cms, {**self.payload, **overrides}, format="json").status_code, 400)
        self.publish()
        self.assertEqual(self.client.post(self.cms, self.payload, format="json").status_code, 400)

    def test_uploaded_image_takes_priority_and_can_be_removed(self):
        self.client.force_authenticate(self.staff)
        with tempfile.TemporaryDirectory() as directory, override_settings(MEDIA_ROOT=directory):
            stream = BytesIO()
            Image.new("RGB", (10, 10)).save(stream, format="PNG")
            upload = SimpleUploadedFile("cover.png", stream.getvalue(), content_type="image/png")
            response = self.client.post(self.cms, {**self.payload, "image": upload, "image_url": "https://example.com/fallback.jpg", "is_published": "true", "published_at": ""}, format="multipart")
            self.assertEqual(response.status_code, 201)
            self.assertIn("/media/articles/", self.client.get(self.public + "planning/").data["image_url"])
            self.client.patch(f'{self.cms}{response.data["id"]}/', {"remove_image": True}, format="json")
            self.assertEqual(self.client.get(self.public + "planning/").data["image_url"], "https://example.com/fallback.jpg")

    def test_seed_is_idempotent_and_preserves_edits(self):
        call_command("seed_articles", verbosity=0)
        count = Article.objects.count()
        self.assertGreaterEqual(count, 8)
        article = Article.objects.first()
        article.title = "Editor change"
        article.save()
        call_command("seed_articles", verbosity=0)
        article.refresh_from_db()
        self.assertEqual(article.title, "Editor change")
        self.assertEqual(Article.objects.count(), count)
