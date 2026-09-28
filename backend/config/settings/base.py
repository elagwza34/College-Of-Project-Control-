import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[2]

SECRET_KEY = "development-only-change-me"
DEBUG = False
ALLOWED_HOSTS: list[str] = []

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "corsheaders",
    "rest_framework",
    "rest_framework.authtoken",
    "apps.content",
    "apps.cms",
    "apps.chatbot",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    }
]

WSGI_APPLICATION = "config.wsgi.application"
ASGI_APPLICATION = "config.asgi.application"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "en-gb"
TIME_ZONE = "Europe/London"
USE_I18N = True
USE_TZ = True

STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
MEDIA_URL = "media/"
# DJANGO_MEDIA_ROOT lets a deployment point uploads at a mounted volume instead of
# the application directory, so a redeploy cannot discard uploaded files.
MEDIA_ROOT = Path(os.environ.get("DJANGO_MEDIA_ROOT") or (BASE_DIR / "media"))
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# A shared, restart-safe cache keeps rate limits meaningful across worker
# processes. Override DJANGO_CACHE_BACKEND with Redis/Memcached when available.
CACHES = {
    "default": {
        "BACKEND": os.environ.get(
            "DJANGO_CACHE_BACKEND", "django.core.cache.backends.filebased.FileBasedCache"
        ),
        "LOCATION": os.environ.get("DJANGO_CACHE_DIR") or str(BASE_DIR / ".cache"),
        "TIMEOUT": 300,
    }
}

LOG_LEVEL = os.environ.get("DJANGO_LOG_LEVEL", "INFO")
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "standard": {"format": "[{asctime}] {levelname} {name}: {message}", "style": "{"},
    },
    "handlers": {
        "console": {"class": "logging.StreamHandler", "formatter": "standard"},
    },
    "root": {"handlers": ["console"], "level": LOG_LEVEL},
    "loggers": {
        "django.request": {"handlers": ["console"], "level": "WARNING", "propagate": False},
        "apps": {"handlers": ["console"], "level": os.environ.get("APP_LOG_LEVEL", LOG_LEVEL), "propagate": False},
    },
}

REST_FRAMEWORK = {
    "NUM_PROXIES": 0,
    "DEFAULT_RENDERER_CLASSES": ["rest_framework.renderers.JSONRenderer"],
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.IsAuthenticatedOrReadOnly"],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "apps.cms.authentication.ExpiringTokenAuthentication",
        "rest_framework.authentication.SessionAuthentication",
    ],
    # Baseline protection for every endpoint; the per-view throttles add stricter
    # limits where needed. Rates are configurable so they can be tuned per host.
    "DEFAULT_THROTTLE_CLASSES": [
        "rest_framework.throttling.AnonRateThrottle",
        "rest_framework.throttling.UserRateThrottle",
    ],
    "DEFAULT_THROTTLE_RATES": {
        "anon": os.environ.get("API_ANON_RATE", "240/min"),
        "user": os.environ.get("API_USER_RATE", "4000/hour"),
        "dashboard-login": os.environ.get("RATE_LOGIN", "10/min"),
        "dashboard-password-reset": os.environ.get("RATE_PASSWORD_RESET", "5/hour"),
        "enquiry-submission": os.environ.get("RATE_ENQUIRY", "5/hour"),
        "maintenance-access": os.environ.get("RATE_MAINTENANCE_ACCESS", "5/min"),
        "maintenance-status": os.environ.get("RATE_MAINTENANCE_STATUS", "60/min"),
        "public-list": os.environ.get("RATE_PUBLIC_LIST", "120/min"),
    },
}

CMS_TOKEN_MAX_AGE = 12 * 60 * 60
PASSWORD_RESET_TIMEOUT = 60 * 60
DASHBOARD_PASSWORD_RESET_URL = os.environ.get(
    "DASHBOARD_PASSWORD_RESET_URL", "http://localhost:3000/dashboard/reset-password"
).rstrip("/")
DEFAULT_FROM_EMAIL = os.environ.get("DEFAULT_FROM_EMAIL", "no-reply@collegeofprojectcontrols.com")
EMAIL_BACKEND = os.environ.get("EMAIL_BACKEND", "django.core.mail.backends.smtp.EmailBackend")
EMAIL_HOST = os.environ.get("EMAIL_HOST", "")
EMAIL_PORT = int(os.environ.get("EMAIL_PORT", "587"))
EMAIL_HOST_USER = os.environ.get("EMAIL_HOST_USER", "")
EMAIL_HOST_PASSWORD = os.environ.get("EMAIL_HOST_PASSWORD", "")
EMAIL_USE_TLS = os.environ.get("EMAIL_USE_TLS", "true").lower() == "true"
