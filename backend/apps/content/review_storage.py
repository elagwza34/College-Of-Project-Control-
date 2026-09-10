import uuid
from django.conf import settings
from django.core.files.storage import FileSystemStorage


def private_review_storage():
    # Outside MEDIA_ROOT: pending portraits are available only through the staff-authorized API.
    return FileSystemStorage(location=settings.BASE_DIR / 'private_uploads' / 'testimonials')


def review_photo_path(instance, filename):
    return f'{uuid.uuid4().hex}.jpg'
