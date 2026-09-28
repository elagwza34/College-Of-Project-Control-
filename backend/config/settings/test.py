from .base import *  # noqa: F403

SECRET_KEY = "test-only-secret-key"
DEBUG = False
ALLOWED_HOSTS = ["testserver"]

# Tests must not inherit the shared file-backed cache: rate limits would leak
# between test runs and leave files behind.
CACHES = {"default": {"BACKEND": "django.core.cache.backends.locmem.LocMemCache"}}
LOGGING["root"]["level"] = "ERROR"  # noqa: F405

