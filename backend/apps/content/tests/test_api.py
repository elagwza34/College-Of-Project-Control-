from django.urls import reverse
from rest_framework.test import APITestCase

from apps.content.models import Page, PageSection, PublicationStatus


class ContentApiTests(APITestCase):
    def test_published_page_returns_enabled_sections_in_order(self):
        page = Page.objects.create(title="About", slug="about", status=PublicationStatus.PUBLISHED)
        PageSection.objects.create(
            page=page,
            internal_name="Closing call to action",
            section_type=PageSection.SectionType.CTA,
            order=20,
            content={"heading": "Start today"},
        )
        PageSection.objects.create(
            page=page,
            internal_name="Hero",
            section_type=PageSection.SectionType.HERO,
            order=10,
            content={"title": "About us"},
        )
        PageSection.objects.create(
            page=page,
            internal_name="Hidden section",
            section_type=PageSection.SectionType.RICH_TEXT,
            order=30,
            is_enabled=False,
            content={"heading": "Hidden", "body": "Not public"},
        )

        response = self.client.get(reverse("page-detail", kwargs={"slug": "about"}))

        self.assertEqual(response.status_code, 200)
        self.assertEqual([section["type"] for section in response.data["sections"]], ["hero", "cta"])
        self.assertEqual(response.data["navigationTitle"], "")

    def test_draft_page_is_not_public(self):
        Page.objects.create(title="Draft", slug="draft", status=PublicationStatus.DRAFT)

        response = self.client.get(reverse("page-detail", kwargs={"slug": "draft"}))

        self.assertEqual(response.status_code, 404)

    def test_site_endpoint_returns_camel_case_settings(self):
        response = self.client.get(reverse("site-detail"))

        self.assertEqual(response.status_code, 200)
        self.assertIn("siteName", response.data["settings"])
        self.assertIn("primaryCtaLabel", response.data["settings"])

