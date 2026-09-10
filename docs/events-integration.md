# Events and Eventbrite integration

## Dashboard setup

Open `/dashboard/events` → **Eventbrite connection**. Enter the Eventbrite private API token and numeric Organization ID, save, then choose **Test saved connection**. Use **Sync now** to queue the first import. Settings are stored in the database; no Eventbrite environment variables are required.

The API token is write-only and encrypted using Fernet with a key derived from `DJANGO_SECRET_KEY`. Keep that server key stable and protected; changing it requires entering the token again. Blank token input preserves the current token; the explicit removal checkbox clears it. Only authenticated staff can read connection status, change settings or run sync.

For push notifications, enter the public HTTPS backend origin (without `/api/v1`) and save. Copy the generated webhook URL into Eventbrite's webhook configuration and enable event create/update/publish/unpublish/delete notifications supported by the account. Treat this URL as a credential. The local `localhost` server cannot receive public webhooks. Scheduled polling and manual sync work without a public URL.

Official references: [Eventbrite API](https://www.eventbrite.com/platform/new/api), [webhook documentation](https://www.eventbrite.co.uk/platform/docs/webhooks), [API key setup](https://www.eventbrite.com/help/en-us/articles/849962/generate-an-api-key/).

## Running the worker

Run alongside the web server, using the same database and secret key:

```powershell
cd backend
python run_local.py run_event_sync_worker
```

In deployment use the process manager to keep `python manage.py run_event_sync_worker` running with the production environment. `--once` processes one tick for diagnostics. The dashboard reports the heartbeat, last complete full sync and latest 50 jobs. The default reconciliation interval is 15 minutes, adjustable from 5 to 1,440. Temporary failures retry with increasing delays, up to five attempts. A database lease prevents concurrent workers from normally importing simultaneously and allows recovery after a crashed worker. Completed job history is retained for 30 days.

## Ownership and visibility

Eventbrite owns title, description, image, timing, time zone, location, organiser, source category, event status, ticket availability and registration URL. The website owns the summary, alternative text, featured flag, order, local topics/programmes, highlights URL and publication switch. Source updates only write source-owned fields.

An event is public only when its own publication switch allows it, the source is public, its source category is visible, and **every** assigned local topic/programme is visible. Any hidden term wins. These rules apply to the grid, search, carousel, filters and direct detail URL. The settings also control events without classifications. Source categories are discovered during import; local topics/programmes are created in the dashboard and assigned in the event editor.

Unpublished/private/password-protected events and series parents are hidden. Individual series occurrences use their own dates. Cancelled events have no registration button; ended events are determined from the end time (start time only if the end is missing). Past highlights appear only when a URL is supplied. Registration stays on Eventbrite. Availability older than 30 minutes is labelled for rechecking; stale prices are not shown. Descriptions are imported as plain text, preserving paragraphs and removing executable markup.

The importer paginates the complete organization event listing without a live-only or future-only filter. Missing imported IDs are checked individually before hiding on confirmed 404; an interrupted listing never causes mass unpublishing. Foreign-organization events are rejected. A page limit of 200 stops unusually large imports with an explicit error. Event resources and description requests are allowlisted to the Eventbrite API; webhook payloads are notifications, never trusted event content. Order notifications can trigger a reconciliation, but no attendee/order personal data is fetched or stored.

## Frontend and API

- `/events`: searchable, paginated grid with upcoming/past, format, source category, topic and programme filters.
- `/events/:slug`: stable detail page, actual event time zone, status-aware booking and Event JSON-LD for dated events.
- `/dashboard/events`: events, category visibility, connection settings and sync history.
- `EventsSection`: reusable section, up to eight events, four desktop/two tablet/one mobile cards, one-card steps, keyboard arrows and reduced-motion support. Props: `id`, `title`, `description`, `programme`, `category`, `classification`, `excludeSlug`, `className`. Filter values are classification slugs. Used by the existing `EventsTeaser` placements and PCP programme page.
- Public API: `/api/v1/events/library/`, `/events/options/`, `/events/<slug>/`; the legacy `/events/` array endpoint remains available with the same visibility rules.
- Staff API: `/api/v1/cms/events/`, `/event-categories/`, `/eventbrite/settings/`, `/eventbrite/test/`, `/eventbrite/sync/`, `/eventbrite/jobs/` and job retry.

The site is client-rendered; SEO metadata and structured data update after loading. Static social-preview crawlers may require server rendering in a future hosting change.

## Validation and activation

Run `python manage.py test apps.content.tests.test_events apps.content.tests.test_articles --noinput` with the isolated development test database. Frontend checks: `npm.cmd run type-check`, `npm.cmd run build`, and `node scripts/events-browser.mjs` after building. The browser script reads the live local event list, then uses isolated fixtures for carousel/search and dashboard credential tests; it never changes live connection settings.

Migrations 0014–0015 add the integration tables and preserve existing events with stable slugs. No sample Eventbrite events or private credentials are inserted. The local worker can run while waiting for credentials. Real account import and public webhook delivery must be verified after the user saves valid account details and supplies the public backend URL.
