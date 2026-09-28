import os
from urllib.parse import parse_qs, unquote, urlparse

from django.core.exceptions import ImproperlyConfigured

from .base import *  # noqa: F403


def required(name: str) -> str:
    value = os.environ.get(name, "").strip()
    if not value:
        raise ImproperlyConfigured(f"{name} is required in production")
    return value


def postgres_config(database_url: str) -> dict:
    parsed = urlparse(database_url)
    if parsed.scheme not in {"postgres", "postgresql"}:
        raise ImproperlyConfigured("DATABASE_URL must use PostgreSQL")
    query = parse_qs(parsed.query)
    return {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": unquote(parsed.path.lstrip("/")),
        "USER": unquote(parsed.username or ""),
        "PASSWORD": unquote(parsed.password or ""),
        "HOST": parsed.hostname or "",
        "PORT": parsed.port or 5432,
        "OPTIONS": {"sslmode": query.get("sslmode", ["require"])[0]},
        "CONN_MAX_AGE": 60,
    }


SECRET_KEY = required("DJANGO_SECRET_KEY")
DEBUG = False
ALLOWED_HOSTS = [host.strip() for host in required("ALLOWED_HOSTS").split(",") if host.strip()]
DATABASES = {"default": postgres_config(required("DATABASE_URL"))}

CORS_ALLOWED_ORIGINS = [value.strip() for value in required("CORS_ALLOWED_ORIGINS").split(",")]
CSRF_TRUSTED_ORIGINS = [value.strip() for value in required("CSRF_TRUSTED_ORIGINS").split(",")]
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_REFERRER_POLICY = "strict-origin-when-cross-origin"
X_FRAME_OPTIONS = "DENY"

# Most deployments terminate TLS at a load balancer, CDN or cPanel proxy. Without
# this, Django sees plain HTTP and SECURE_SSL_REDIRECT loops forever. Set
# DJANGO_TRUST_PROXY_HEADERS=false only when the app receives TLS directly.
if os.environ.get("DJANGO_TRUST_PROXY_HEADERS", "true").strip().lower() not in {"0", "false", "no"}:
    SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

