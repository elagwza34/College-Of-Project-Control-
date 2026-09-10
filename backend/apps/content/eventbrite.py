"""One-way Eventbrite import with durable jobs. Never sends attendee data or emails."""
import base64
import hashlib
import hmac
import json
import re
import secrets
from datetime import timedelta
from html.parser import HTMLParser
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, build_opener, HTTPRedirectHandler
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError

from cryptography.fernet import Fernet, InvalidToken
from django.conf import settings
from django.db import transaction
from django.db.models import Q
from django.utils import timezone
from django.utils.dateparse import parse_datetime
from django.utils.text import slugify

from .models import Event, EventCategory, EventSyncControl, EventSyncJob

API_BASE = "https://www.eventbriteapi.com/v3"


class SyncError(Exception):
    def __init__(self, message, status=0):
        self.status = status
        super().__init__(message)


def control():
    obj, _ = EventSyncControl.objects.get_or_create(pk=1, defaults={"webhook_secret": secrets.token_urlsafe(32)})
    return obj


def cipher():
    key = hmac.new(settings.SECRET_KEY.encode(), b"cpcm-eventbrite-token-v1", hashlib.sha256).digest()
    return Fernet(base64.urlsafe_b64encode(key))


def encrypt_token(token):
    return cipher().encrypt(token.encode()).decode()


def credentials(config=None):
    config = config or control()
    if not config.token_encrypted or not config.organization_id:
        raise SyncError("Save the Eventbrite token and Organization ID in Events settings first.")
    try:
        token = cipher().decrypt(config.token_encrypted.encode()).decode()
    except InvalidToken:
        raise SyncError("The saved token cannot be decrypted. Save it again in Events settings.") from None
    return token, config.organization_id


class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


class EventbriteClient:
    def __init__(self, config=None):
        self.token, self.organization_id = credentials(config)

    def get(self, path, params=None):
        if not re.fullmatch(r"/(?:organizations/\d+(?:/events)?|events/\d+(?:/description)?)/", path):
            raise SyncError("Unsupported Eventbrite resource.")
        url = API_BASE + path + ("?" + urlencode(params) if params else "")
        request = Request(url, headers={"Authorization": "Bearer " + self.token, "Accept": "application/json"})
        try:
            with build_opener(NoRedirect).open(request, timeout=20) as response:
                raw = response.read(8 * 1024 * 1024 + 1)
                if len(raw) > 8 * 1024 * 1024:
                    raise SyncError("Eventbrite response exceeded the safe import size.")
                result = json.loads(raw)
                if not isinstance(result, dict):
                    raise SyncError("Eventbrite returned an invalid response.")
                return result
        except HTTPError as exc:
            messages = {401: "Eventbrite rejected the saved token.", 403: "The Eventbrite account cannot access this resource.", 404: "Eventbrite resource not found.", 429: "Eventbrite rate limit reached. The job will retry later."}
            raise SyncError(messages.get(exc.code, f"Eventbrite request failed (HTTP {exc.code})."), exc.code) from None
        except (URLError, TimeoutError, OSError):
            raise SyncError("Eventbrite could not be reached. The saved event data has been preserved.") from None
        except (ValueError, UnicodeError):
            raise SyncError("Eventbrite returned invalid JSON.") from None

    def event(self, event_id):
        return self.get(f"/events/{event_id}/", {"expand": "venue,organizer,category,logo,ticket_availability"})


class PlainDescription(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.parts = []
        self.skip = 0

    def handle_starttag(self, tag, attrs):
        if tag in ("script", "style"):
            self.skip += 1
        elif not self.skip and tag in ("p", "div", "br", "li", "h1", "h2", "h3", "tr"):
            self.parts.append("\n\n" if tag != "br" else "\n")

    def handle_endtag(self, tag):
        if tag in ("script", "style"):
            self.skip = max(0, self.skip - 1)
        elif not self.skip and tag in ("p", "div", "li", "h1", "h2", "h3", "tr"):
            self.parts.append("\n\n")

    def handle_data(self, data):
        if not self.skip:
            self.parts.append(data)


def description_text(html):
    parser = PlainDescription()
    parser.feed(str(html or ""))
    return re.sub(r"\n[ \t]*\n(?:[ \t]*\n)+", "\n\n", "".join(parser.parts)).strip()


def remote_datetime(value):
    if not value:
        return None
    parsed = parse_datetime(str(value))
    if not parsed or timezone.is_naive(parsed):
        raise SyncError("Eventbrite returned a date without a UTC offset.")
    return parsed


def import_event(data, client, renew=lambda: None):
    event_id = str(data.get("id", ""))
    if not event_id.isdigit() or str(data.get("organization_id", "")) != client.organization_id:
        raise SyncError("The event does not belong to the configured organization.")
    existing = Event.objects.filter(source="eventbrite", organization_id=client.organization_id, external_id=event_id).first()
    changed = remote_datetime(data.get("changed"))
    if existing and changed and existing.remote_changed_at and changed < existing.remote_changed_at:
        return "skipped"
    event_status = str(data.get("status", "draft"))
    # Private/unpublished events may be stored for editors, never served publicly.
    is_public = data.get("listed") is True and not data.get("is_series_parent", data.get("is_series", False)) and not data.get("is_protected_event", False)
    if event_status in ("draft", "deleted"):
        is_public = False
    values = {
        "title": str((data.get("name") or {}).get("text") or "Untitled event")[:240],
        "remote_status": event_status,
        "source_is_public": is_public,
        "remote_changed_at": changed,
        "last_synced_at": timezone.now(), "sync_error": "",
        "source_url": str(data.get("url") or "")[:2000],
        "cta_href": str(data.get("url") or "")[:2000],
        "cta_label": "Register on Eventbrite",
        "format": "online" if data.get("online_event") else "in_person",
        "organizer": str((data.get("organizer") or {}).get("name") or "")[:240],
    }
    start = data.get("start") or {}
    end = data.get("end") or {}
    values["starts_at"] = remote_datetime(start.get("utc"))
    values["ends_at"] = remote_datetime(end.get("utc"))
    if values["starts_at"] and values["ends_at"] and values["ends_at"] < values["starts_at"]:
        raise SyncError("Eventbrite returned an end date before the start date.")
    zone = str(start.get("timezone") or "UTC")
    try:
        ZoneInfo(zone)
    except (ZoneInfoNotFoundError, ValueError):
        zone = "UTC"
    values["timezone"] = zone
    venue = data.get("venue") or {}
    address = (venue.get("address") or {}).get("localized_address_display", "")
    values["location"] = "Online" if data.get("online_event") else ", ".join(filter(None, [venue.get("name"), address]))[:500]
    if "logo" in data:
        values["image_url"] = str((data.get("logo") or {}).get("original", {}).get("url") or (data.get("logo") or {}).get("url") or "")[:2000]
    availability = data.get("ticket_availability") or {}
    values["sales_status"] = "sold_out" if availability.get("is_sold_out") is True else "available" if availability.get("has_available_tickets") is True else "unavailable" if availability.get("has_available_tickets") is False else "unknown"
    values["price_label"] = str((availability.get("minimum_ticket_price") or {}).get("display") or ("Free" if data.get("is_free") is True else ""))[:100]
    raw_description = data.get("description") or {}
    text = description_text(raw_description.get("html") or raw_description.get("text") or "")
    try:
        renew()
        full = client.get(f"/events/{event_id}/description/")
        if "description" in full:
            text = description_text(full["description"])
    except SyncError:
        # Do not replace an existing complete description with an abbreviated one.
        if existing:
            text = existing.description
        values["sync_error"] = "Full description could not be refreshed; it will be retried on the next sync."
    values["description"] = text
    category = data.get("category") or {}
    category_id = str(data.get("category_id") or category.get("id") or "")
    with transaction.atomic():
        if category_id:
            term, _ = EventCategory.objects.get_or_create(kind="eventbrite", remote_id=category_id, defaults={"name": str(category.get("name") or f"Eventbrite {category_id}")[:160], "slug": f"eventbrite-{category_id}"})
            if category.get("name") and term.name != category["name"]:
                term.name = str(category["name"])[:160]
                term.save(update_fields=["name"])
            values["source_category"] = term
            values["category"] = term.name[:80]
        else:
            values["source_category"] = None
            values["category"] = ""
        event, created = Event.objects.get_or_create(source="eventbrite", organization_id=client.organization_id, external_id=event_id, defaults={**values, "slug": f"{slugify(values['title'])[:210] or 'event'}-{event_id}"})
        if not created:
            # Site-owned fields (summary, visibility, order, classifications, highlights) are deliberately absent.
            for key, value in values.items():
                setattr(event, key, value)
            Event.objects.filter(pk=event.pk).update(**values, updated_at=timezone.now())
    return "created" if created else "updated"


def refresh_one(event_id, client, renew=lambda: None):
    try:
        renew()
        return import_event(client.event(event_id), client, renew)
    except SyncError as exc:
        if exc.status == 404:
            count = Event.objects.filter(source="eventbrite", organization_id=client.organization_id, external_id=event_id).update(remote_status="deleted", source_is_public=False, last_synced_at=timezone.now(), sync_error="")
            return "hidden" if count else "skipped"
        raise


def sync_all(client, renew=lambda: None):
    seen = set()
    result = {"created": 0, "updated": 0, "hidden": 0, "skipped": 0}
    continuation = None
    page = 1
    while True:
        renew()
        params = {"page_size": 50, "expand": "venue,organizer,category,logo,ticket_availability", "show_series_parent": "false"}
        params.update({"continuation": continuation} if continuation else {"page": page})
        response = client.get(f"/organizations/{client.organization_id}/events/", params)
        if not isinstance(response.get("events"), list):
            raise SyncError("Eventbrite returned an invalid event list; reconciliation was skipped.")
        for data in response["events"]:
            state = import_event(data, client, renew)
            result[state] += 1
            seen.add(str(data["id"]))
        pagination = response.get("pagination") or {}
        more = pagination.get("has_more_items", page < int(pagination.get("page_count") or 1))
        if not more:
            break
        page += 1
        if page > 200:
            raise SyncError("Import page limit reached; existing events remain intact. Narrow the source organization or increase the documented limit.")
        next_cursor = pagination.get("continuation")
        if next_cursor and next_cursor == continuation:
            raise SyncError("Eventbrite repeated its continuation cursor.")
        continuation = next_cursor
    # Absence alone never deletes a record; confirm the remote resource first.
    linked = Event.objects.filter(source="eventbrite", organization_id=client.organization_id).exclude(external_id__in=seen)
    for event_id in linked.values_list("external_id", flat=True):
        result[refresh_one(event_id, client, renew)] += 1
    return result


def enqueue(kind="full", resource_path="", reason="manual", dedupe=""):
    if kind == "full":
        pending = EventSyncJob.objects.filter(kind="full", status="pending").first()
        if pending:
            return pending
    digest = hashlib.sha256((dedupe or secrets.token_urlsafe(24)).encode()).hexdigest()
    job, _ = EventSyncJob.objects.get_or_create(dedupe_key=digest, defaults={"kind": kind, "resource_path": resource_path, "reason": reason, "due_at": timezone.now()})
    return job


def run_worker_tick():
    config = control()
    now = timezone.now()
    owner = secrets.token_hex(24)
    EventSyncControl.objects.filter(pk=1).update(worker_heartbeat=now)
    acquired = EventSyncControl.objects.filter(pk=1).filter(Q(lock_until__isnull=True) | Q(lock_until__lte=now)).update(lock_owner=owner, lock_until=now + timedelta(minutes=5))
    if not acquired:
        return False
    config.refresh_from_db()

    def renew():
        if not EventSyncControl.objects.filter(pk=1, lock_owner=owner).update(lock_until=timezone.now() + timedelta(minutes=5), worker_heartbeat=timezone.now()):
            raise SyncError("The sync worker lease expired; the job will be retried.")

    try:
        EventSyncJob.objects.filter(status="running").update(status="pending", due_at=now)
        if config.auto_sync and config.connection_ok and (not config.next_full_sync or config.next_full_sync <= now):
            enqueue(reason="scheduled")
            EventSyncControl.objects.filter(pk=1).update(next_full_sync=now + timedelta(minutes=config.interval_minutes))
        job = EventSyncJob.objects.filter(status="pending", due_at__lte=now).order_by("due_at", "id").first()
        if not job:
            return False
        job.status = "running"
        job.attempts += 1
        job.save(update_fields=["status", "attempts"])
        try:
            client = EventbriteClient(config)
            if job.kind == "event":
                match = re.fullmatch(r"/events/(\d+)/", job.resource_path)
                if not match:
                    raise SyncError("Invalid event job.")
                result = {refresh_one(match[1], client, renew): 1}
            else:
                result = sync_all(client, renew)
                EventSyncControl.objects.filter(pk=1, lock_owner=owner).update(last_full_sync=timezone.now())
            job.status, job.result, job.error, job.finished_at = "complete", result, "", timezone.now()
        except Exception as exc:
            job.error = str(exc)[:500] if isinstance(exc, SyncError) else "The import failed unexpectedly. Check the server and retry."
            job.status = "failed" if job.attempts >= 5 else "pending"
            job.due_at = timezone.now() + timedelta(seconds=min(3600, 60 * 2 ** job.attempts))
            job.finished_at = timezone.now() if job.status == "failed" else None
        job.save()
        EventSyncJob.objects.filter(status="complete", created_at__lt=now - timedelta(days=30)).delete()
        return True
    finally:
        EventSyncControl.objects.filter(pk=1, lock_owner=owner).update(lock_owner="", lock_until=None, worker_heartbeat=timezone.now())
