from django.urls import reverse
from rest_framework.test import APITestCase

from apps.content.models import Enquiry, MentorProfile, Page, PageSection, ProfessionalCredential, PublicationStatus, ShortCourse


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

    def test_mentor_section_uses_active_dashboard_profiles_in_order(self):
        MentorProfile.objects.update(is_active=False)
        page = Page.objects.create(
            title="Home",
            slug="home",
            status=PublicationStatus.PUBLISHED,
            is_homepage=True,
        )
        PageSection.objects.create(
            page=page,
            internal_name="Mentor team",
            section_type=PageSection.SectionType.CARD_GRID,
            style_variant="mentors",
            order=10,
            content={"heading": "Learn from practitioners", "items": []},
        )
        MentorProfile.objects.create(
            name="Second Mentor",
            role_title="Consultant",
            biography="Second profile",
            order=20,
        )
        MentorProfile.objects.create(
            name="First Mentor",
            role_title="Director",
            specialties="Planning, Risk",
            biography="First profile",
            order=10,
        )
        MentorProfile.objects.create(
            name="Hidden Mentor",
            role_title="Hidden",
            biography="Not public",
            order=1,
            is_active=False,
        )

        response = self.client.get(reverse("homepage"))

        self.assertEqual(response.status_code, 200)
        items = response.data["sections"][0]["content"]["items"]
        self.assertEqual([item["name"] for item in items], ["First Mentor", "Second Mentor"])
        self.assertEqual(items[0]["specialties"], ["Planning", "Risk"])
        self.assertEqual(items[0]["initials"], "FM")

    def test_anonymous_visitor_can_submit_an_enquiry(self):
        response = self.client.post(
            reverse("create-enquiry"),
            {
                "name": "Alex Morgan",
                "email": "alex@example.com",
                "organisation": "Example Employer",
                "roleTitle": "PMO Manager",
                "enquiryType": "Employer capability",
                "message": "We want to develop a cohort.",
                "sourcePath": "/employers",
            },
            format="json",
        )

        self.assertEqual(response.status_code, 201)
        enquiry = Enquiry.objects.get()
        self.assertEqual(enquiry.role_title, "PMO Manager")
        self.assertEqual(enquiry.source_path, "/employers")

    def test_active_mentor_has_a_public_detail_endpoint(self):
        mentor = MentorProfile.objects.create(
            name="Public Mentor",
            role_title="Programme Director",
            biography="A detailed professional biography.",
            linkedin_url="https://www.linkedin.com/in/public-mentor",
        )

        response = self.client.get(reverse("mentor-detail", kwargs={"pk": mentor.pk}))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["name"], "Public Mentor")
        self.assertEqual(response.data["linkedinUrl"], "https://www.linkedin.com/in/public-mentor")

    def test_professional_credentials_returns_only_active_items_in_order(self):
        ProfessionalCredential.objects.all().delete()
        ProfessionalCredential.objects.create(
            name="Second certificate",
            role="Qualification Pathway",
            image_url="https://example.com/second.png",
            order=20,
        )
        ProfessionalCredential.objects.create(
            name="First certificate",
            role="Professional Body",
            image_url="https://example.com/first.png",
            order=10,
        )
        ProfessionalCredential.objects.create(
            name="Hidden certificate",
            image_url="https://example.com/hidden.png",
            order=1,
            is_active=False,
        )

        response = self.client.get(reverse("professional-credentials-list"))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            [credential["name"] for credential in response.data],
            ["First certificate", "Second certificate"],
        )
        self.assertEqual(response.data[0]["imageUrl"], "https://example.com/first.png")

    def test_short_courses_returns_only_active_items_in_order(self):
        ShortCourse.objects.all().delete()
        ShortCourse.objects.create(
            slug="second",
            title="Second course",
            category="Planning",
            summary="Second summary",
            focus=["Second focus"],
            image_url="https://example.com/second.jpg",
            order=20,
        )
        ShortCourse.objects.create(
            slug="first",
            title="First course",
            category="AI",
            summary="First summary",
            focus=["First focus"],
            image_url="https://example.com/first.jpg",
            order=10,
        )
        ShortCourse.objects.create(
            slug="hidden",
            title="Hidden course",
            is_active=False,
            order=1,
        )

        response = self.client.get(reverse("short-courses-list"))

        self.assertEqual(response.status_code, 200)
        self.assertEqual([course["slug"] for course in response.data], ["first", "second"])
        self.assertEqual(response.data[0]["imageUrl"], "https://example.com/first.jpg")
        self.assertEqual(response.data[0]["focus"], ["First focus"])
        self.assertIn("detail", response.data[0])

        detail = self.client.get(reverse("short-course-detail", kwargs={"slug": "first"}))
        self.assertEqual(detail.status_code, 200)
        self.assertEqual(detail.data["title"], "First course")
