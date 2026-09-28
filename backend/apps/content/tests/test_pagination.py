"""Tests for the shared public-list pagination policy."""
from django.contrib.auth import get_user_model
from django.test import override_settings
from django.utils import timezone
from rest_framework.test import APITestCase

from apps.content.models import Article, Coach, MentorProfile, Sector, ShortCourse


@override_settings(ROOT_URLCONF="config.urls")
class PaginationPolicyTests(APITestCase):
    """Growing collections paginate on request; small catalogues stay whole but capped."""

    def setUp(self):
        get_user_model().objects.create_user(username="pagination-editor", is_staff=True)
        for index in range(30):
            Article.objects.create(
                title=f"Article {index:02d}",
                slug=f"article-{index:02d}",
                excerpt="An excerpt.",
                content="Body copy.",
                is_published=True,
                published_at=timezone.now(),
            )
        for index in range(30):
            ShortCourse.objects.create(slug=f"course-{index:02d}", title=f"Course {index:02d}")
        # Migrations seed published content, so assert against the live totals rather
        # than the number this test created.
        self.course_total = ShortCourse.objects.filter(is_active=True).count()
        self.article_total = Article.objects.filter(is_published=True).count()

    def test_growing_collection_returns_bare_array_without_paging_parameters(self):
        response = self.client.get("/api/v1/short-courses/")
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json(), list)
        self.assertEqual(len(response.json()), self.course_total)

    def test_growing_collection_paginates_when_page_is_requested(self):
        response = self.client.get("/api/v1/short-courses/?page=1&page_size=10")
        self.assertEqual(response.status_code, 200)
        body = response.json()
        self.assertEqual(body["count"], self.course_total)
        self.assertEqual(len(body["results"]), 10)
        self.assertIsNotNone(body["next"])

    def test_growing_collection_honours_max_page_size(self):
        response = self.client.get("/api/v1/short-courses/?page=1&page_size=100000")
        self.assertEqual(response.status_code, 200)
        self.assertLessEqual(len(response.json()["results"]), 100)

    def test_catalogue_endpoints_remain_arrays_for_existing_consumers(self):
        for url in ("/api/v1/sectors/", "/api/v1/coaches/", "/api/v1/mentors/"):
            with self.subTest(url=url):
                response = self.client.get(url)
                self.assertEqual(response.status_code, 200)
                self.assertIsInstance(response.json(), list)

    def test_catalogue_is_capped_so_it_cannot_grow_without_limit(self):
        MentorProfile.objects.bulk_create(
            [
                MentorProfile(
                    name=f"Mentor {i:03d}",
                    role_title="Project Controls Mentor",
                    biography="Biography.",
                    order=i,
                )
                for i in range(260)
            ]
        )
        response = self.client.get("/api/v1/mentors/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 200)

    def test_article_search_still_reaches_seeded_and_created_rows(self):
        response = self.client.get("/api/v1/articles/?search=Article%2005")
        self.assertEqual(response.status_code, 200)
        titles = [row["title"] for row in response.json()["results"]]
        self.assertIn("Article 05", titles)

    def test_article_search_paginates_when_requested(self):
        response = self.client.get("/api/v1/articles/?search=Article&page=1&page_size=5")
        self.assertEqual(response.status_code, 200)
        body = response.json()
        self.assertEqual(body["count"], self.article_total)
        self.assertEqual(len(body["results"]), 5)
