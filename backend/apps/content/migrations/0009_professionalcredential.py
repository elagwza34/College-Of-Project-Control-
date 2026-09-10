from django.db import migrations, models


def seed_professional_credentials(apps, schema_editor):
    ProfessionalCredential = apps.get_model("content", "ProfessionalCredential")
    logo_base = "https://jokdxsdbxorzciulkdyl.supabase.co/storage/v1/object/public/images/"
    defaults = [
        ("APM", "Professional Body", "f1b007c5c5314826b51cc5e408ad4322.webp"),
        ("PMI", "Professional Certification", "4d32dd29a0f54f96911429817594774f.png"),
        ("APMG", "Qualification Pathway", "b25f42a62d564028b7fc2ee9e87ccd83.jpg"),
        ("Axelos", "Qualification Pathway", "dcc7742ecfb84cbab3a835e956f1103b.jfif"),
        (
            "Institute of Project Controls",
            "Professional Recognition",
            "abe2fdd4255447a3a8c8211ffabdb066.png",
        ),
        ("ICostE", "Professional Pathway", "4dfd6a8809d74ca88831efbd34c7c480.png"),
    ]
    for index, (name, role, filename) in enumerate(defaults, start=1):
        ProfessionalCredential.objects.get_or_create(
            name=name,
            defaults={
                "role": role,
                "image_url": f"{logo_base}{filename}",
                "order": index * 10,
                "is_active": True,
            },
        )


class Migration(migrations.Migration):
    dependencies = [
        ("content", "0008_event"),
    ]

    operations = [
        migrations.CreateModel(
            name="ProfessionalCredential",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "name",
                    models.CharField(
                        help_text="Certificate, awarding body or professional pathway name, for example: APM.",
                        max_length=120,
                    ),
                ),
                (
                    "role",
                    models.CharField(
                        blank=True,
                        help_text="Optional supporting label, for example: Professional Body.",
                        max_length=160,
                    ),
                ),
                (
                    "image",
                    models.ImageField(
                        blank=True,
                        help_text="Uploaded certificate image. Takes priority over the external image URL.",
                        null=True,
                        upload_to="professional-credentials/%Y/%m/",
                    ),
                ),
                (
                    "image_url",
                    models.CharField(
                        blank=True,
                        help_text="Used only when no image is uploaded. Paste a direct image link.",
                        max_length=500,
                    ),
                ),
                (
                    "link_url",
                    models.URLField(
                        blank=True,
                        help_text="Optional. Where the certificate image links when clicked.",
                    ),
                ),
                ("order", models.PositiveSmallIntegerField(default=0)),
                (
                    "is_active",
                    models.BooleanField(
                        default=True,
                        help_text="Unpublished credentials are saved as a draft and hidden from the site.",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={"ordering": ["order", "id"]},
        ),
        migrations.RunPython(seed_professional_credentials, migrations.RunPython.noop),
    ]
