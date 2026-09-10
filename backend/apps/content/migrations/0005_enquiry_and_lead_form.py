from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [("content", "0004_mentorprofile")]

    operations = [
        migrations.CreateModel(
            name="Enquiry",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=120)),
                ("email", models.EmailField(max_length=254)),
                ("phone", models.CharField(blank=True, max_length=40)),
                ("organisation", models.CharField(blank=True, max_length=160)),
                ("role_title", models.CharField(blank=True, max_length=140)),
                ("enquiry_type", models.CharField(blank=True, max_length=80)),
                ("message", models.TextField(blank=True)),
                ("source_path", models.CharField(blank=True, max_length=240)),
                ("status", models.CharField(choices=[("new", "New"), ("contacted", "Contacted"), ("qualified", "Qualified"), ("closed", "Closed")], default="new", max_length=16)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={"ordering": ["-created_at"], "verbose_name_plural": "Enquiries"},
        ),
        migrations.AlterField(
            model_name="pagesection",
            name="section_type",
            field=models.CharField(
                choices=[
                    ("hero", "Hero"), ("rich_text", "Rich text"),
                    ("feature_grid", "Feature grid"), ("card_grid", "Card grid"),
                    ("stats", "Statistics"), ("media_copy", "Media and copy"),
                    ("testimonial", "Testimonial"), ("faq", "Frequently asked questions"),
                    ("cta", "Call to action"), ("logo_marquee", "Logo marquee"),
                    ("funding_calculator", "Funding calculator"),
                    ("stat_spotlight", "Statistic spotlight"), ("lead_form", "Lead form"),
                ],
                max_length=32,
            ),
        ),
    ]
