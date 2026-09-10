from django.db import migrations


def seed_images(apps, schema_editor):
    Image = apps.get_model("content", "IpcImage")
    Image.objects.using(schema_editor.connection.alias).bulk_create([
        Image(image_url=f"https://i.pravatar.cc/400?img={image_id}", alt_text="Project controls professional", order=index * 10)
        for index, image_id in enumerate([12, 33, 47, 5, 44, 52, 29])
    ])


class Migration(migrations.Migration):
    dependencies = [("content", "0011_ipc_image")]
    operations = [migrations.RunPython(seed_images, migrations.RunPython.noop)]
