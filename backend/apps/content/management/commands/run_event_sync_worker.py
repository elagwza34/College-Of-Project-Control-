import time
from django.core.management.base import BaseCommand
from django.db import close_old_connections
from apps.content.eventbrite import run_worker_tick


class Command(BaseCommand):
    help = "Run durable Eventbrite jobs and periodic reconciliation. No email or attendee processing."

    def add_arguments(self, parser):
        parser.add_argument("--once", action="store_true")

    def handle(self, *args, **options):
        while True:
            close_old_connections()
            try:
                worked = run_worker_tick()
            except KeyboardInterrupt:
                return
            except Exception as exc:
                # Never log request bodies or credentials.
                self.stderr.write(f"Event worker retrying after {type(exc).__name__}.")
                worked = False
            if options["once"]:
                return
            time.sleep(1 if worked else 15)
