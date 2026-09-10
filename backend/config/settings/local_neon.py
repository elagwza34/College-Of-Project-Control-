"""Local development against a real Neon Postgres database over plain HTTP.

Reuses development.py (DEBUG on, no SSL redirect) but swaps SQLite for the
Postgres database pointed to by DATABASE_URL, so `runserver` stays usable at
http://127.0.0.1:8000 while the data lives in Neon.
"""

import os
from urllib.parse import parse_qs, unquote, urlparse

from .development import *  # noqa: F403


def _postgres_config(database_url: str) -> dict:
    parsed = urlparse(database_url)
    query = parse_qs(parsed.query)
    return {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": unquote(parsed.path.lstrip("/")),
        "USER": unquote(parsed.username or ""),
        "PASSWORD": unquote(parsed.password or ""),
        "HOST": parsed.hostname or "",
        "PORT": parsed.port or 5432,
        "OPTIONS": {"sslmode": query.get("sslmode", ["require"])[0]},
    }


DATABASES = {"default": _postgres_config(os.environ["DATABASE_URL"])}
