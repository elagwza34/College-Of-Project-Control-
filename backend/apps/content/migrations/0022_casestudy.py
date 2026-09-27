from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("content", "0021_shortcourse_detail"),
    ]

    operations = [
        migrations.CreateModel(
            name="CaseStudy",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=240)),
                ("slug", models.SlugField(max_length=240, unique=True)),
                ("sector", models.CharField(blank=True, max_length=120)),
                ("client_name", models.CharField(blank=True, max_length=160)),
                ("headline", models.CharField(blank=True, max_length=260)),
                ("summary", models.TextField(max_length=800)),
                ("challenge", models.TextField(blank=True)),
                ("approach", models.TextField(blank=True)),
                ("outcome", models.TextField(blank=True)),
                (
                    "metrics",
                    models.JSONField(
                        blank=True,
                        default=list,
                        help_text='List of metric objects, for example [{"label":"Schedule confidence","value":"+18%"}].',
                    ),
                ),
                ("image", models.ImageField(blank=True, null=True, upload_to="case-studies/%Y/%m/")),
                ("image_url", models.CharField(blank=True, max_length=2000)),
                ("image_alt", models.CharField(blank=True, max_length=240)),
                ("is_featured", models.BooleanField(default=False)),
                ("is_published", models.BooleanField(default=False)),
                ("published_at", models.DateTimeField(blank=True, null=True)),
                ("order", models.PositiveSmallIntegerField(default=0)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "verbose_name_plural": "Case studies",
                "ordering": ["order", "-published_at", "-id"],
            },
        ),
    ]
