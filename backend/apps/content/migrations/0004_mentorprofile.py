from django.db import migrations, models


def add_initial_mentors(apps, _schema_editor):
    MentorProfile = apps.get_model("content", "MentorProfile")
    PageSection = apps.get_model("content", "PageSection")
    mentors = [
        {
            "name": "Dr. Stephen Jenner",
            "initials": "SJ",
            "role_title": "Managing Portfolio Specialist",
            "affiliation": "UK Senior Civil Service",
            "specialties": "Portfolio Management, Benefits Management, Public Sector",
            "biography": (
                "Extensive experience at senior level of the UK Senior Civil Service, where he "
                "was Director of Criminal Justice IT and benefits management adviser on a range "
                "of cross-government programmes."
            ),
            "linkedin_url": "https://www.linkedin.com/",
            "order": 10,
        },
        {
            "name": "Dr. Ray Mead",
            "initials": "RM",
            "role_title": "Project Management Consultant",
            "affiliation": "Founding Partner, p3m global",
            "specialties": "Project Management, Strategic Execution, P3M",
            "biography": (
                "Founding Partner at p3m global, a leading consultancy in delivering sustainable "
                "change and strategic execution. With over 20 years in the P3M industry, he is a "
                "recognised thought leader advising FTSE 100 boards."
            ),
            "linkedin_url": "https://www.linkedin.com/",
            "order": 20,
        },
        {
            "name": "Dr. Amgad Badewi",
            "initials": "AB",
            "role_title": "Project Management Specialist",
            "affiliation": "Reader, University of Kent",
            "specialties": "Project Management, Programme Management",
            "biography": (
                "A highly accomplished academic and practitioner in Project and Programme "
                "Management, with a PhD from Cranfield University, serving as Reader at the "
                "University of Kent and holding multiple leadership roles."
            ),
            "linkedin_url": "https://www.linkedin.com/",
            "order": 30,
        },
    ]
    for mentor in mentors:
        MentorProfile.objects.get_or_create(name=mentor["name"], defaults=mentor)

    for section in PageSection.objects.filter(internal_name="Mentor team"):
        content = dict(section.content)
        content.update(
            {
                "tag": "Learn from practitioners",
                "heading": "Learn from people who understand the work",
                "body": (
                    "Our mentors bring professional experience from project, programme, PMO "
                    "and Project Controls environments."
                ),
            }
        )
        section.style_variant = "mentors"
        section.content = content
        section.save(update_fields=["style_variant", "content"])


def remove_initial_mentors(apps, _schema_editor):
    MentorProfile = apps.get_model("content", "MentorProfile")
    PageSection = apps.get_model("content", "PageSection")
    MentorProfile.objects.filter(
        name__in=["Dr. Stephen Jenner", "Dr. Ray Mead", "Dr. Amgad Badewi"]
    ).delete()
    PageSection.objects.filter(internal_name="Mentor team", style_variant="mentors").update(
        style_variant="default"
    )


class Migration(migrations.Migration):
    dependencies = [("content", "0003_alter_pagesection_section_type")]

    operations = [
        migrations.CreateModel(
            name="MentorProfile",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=120)),
                ("initials", models.CharField(blank=True, help_text="Optional. When blank, initials are generated from the mentor's name.", max_length=8)),
                ("role_title", models.CharField(max_length=140)),
                ("affiliation", models.CharField(blank=True, max_length=160)),
                ("specialties", models.CharField(blank=True, help_text="Comma-separated, for example: Project Management, Strategic Execution, P3M.", max_length=500)),
                ("biography", models.TextField()),
                ("image_url", models.CharField(blank=True, help_text="Optional absolute URL or a local path such as /images/mentor-name.webp.", max_length=500)),
                ("linkedin_url", models.URLField(blank=True)),
                ("order", models.PositiveSmallIntegerField(default=0)),
                ("is_active", models.BooleanField(default=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={"ordering": ["order", "id"]},
        ),
        migrations.RunPython(add_initial_mentors, remove_initial_mentors),
    ]
