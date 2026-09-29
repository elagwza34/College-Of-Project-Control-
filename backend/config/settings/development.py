from .base import *  # noqa: F403

DEBUG = True
ALLOWED_HOSTS = ["localhost", "127.0.0.1"]
CORS_ALLOWED_ORIGINS = ["http://localhost:5173", "http://localhost:3000", "http://localhost:3001"]

# File-based cache can lock .djcache files on Windows during concurrent local QA.
# Production can still override the base cache with Redis/Memcached.
CACHES = {"default": {"BACKEND": "django.core.cache.backends.locmem.LocMemCache"}}

