"""Run local Django commands with backend/.env without exposing credentials.

Examples: python run_local.py migrate
          python run_local.py runserver 127.0.0.1:8000
Explicit environment variables take precedence over .env values.
"""
import os
from pathlib import Path
import sys


def load_local_environment():
    env_file = Path(__file__).resolve().parent / ".env"
    if env_file.exists():
        for line in env_file.read_text(encoding="utf-8-sig").splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            value = value.strip()
            if len(value) >= 2 and value[0] == value[-1] and value[0] in "\"'":
                value = value[1:-1]
            os.environ.setdefault(key.strip(), value)
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.development")


if __name__ == "__main__":
    load_local_environment()
    from django.core.management import execute_from_command_line
    execute_from_command_line([sys.argv[0], *(sys.argv[1:] or ["runserver", "127.0.0.1:8000"])])
