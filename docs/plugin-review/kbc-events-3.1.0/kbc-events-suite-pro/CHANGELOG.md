# Changelog

## 3.1.0

- Added a dedicated Google Workspace SMTP transport used only by Events Suite Pro.
- Added encrypted-at-rest storage for the Google App Password.
- Added an isolated email connection test inside Email Automations.
- Routed welcome emails, reminders, and manual registration emails through the selected event-only transport.
- Kept WordPress core mail and all other plugin email settings unchanged.

## 3.0.0

- Added Zoom Server-to-Server OAuth settings and a connection test.
- Added explicit Zoom meeting selection for every Eventbrite-synced event.
- Saves each selected meeting's attendee `join_url` against the WordPress event.
- Added `{{zoom_url}}` to email templates.
- Added optional automatic Zoom-link appending to registration emails.
- Preserves existing Eventbrite registrations and queued emails during upgrade.

## 2.9.0

- Added an immediate welcome email automation for new registrations only.
- Added independent master switches for welcome emails and the three reminder automations.
- Added sender name, sender email and reply-to settings.
- Added a manual compose-and-send action beside every registration, independent of automation switches.
- Added a safe activation timestamp so existing attendees never receive the welcome email during backfill.

## 2.8.0

- Added Eventbrite attendee synchronization and a protected REST webhook receiver.
- Added a dedicated Registrations dashboard with event, status, name and email filtering.
- Added dedicated registration and email queue database tables with duplicate prevention.
- Added three configurable pre-event email reminders with amount, unit, subject and message controls.
- Added a five-minute email queue, retry handling, sent/failed tracking and automatic cancellation for refunded/cancelled attendees.
- Added automatic reminder rescheduling after event date/time or automation setting changes.

## 2.7.0

### Universal website support
- Added configurable event post type registration with Auto, Always when slug is free, and Never modes.
- Added configurable event singular/plural labels, event archive slug and taxonomy URL slug.
- Added full field mapping for title, description, dates, times, location, map/address, status, registration URL, imported category text, image, highlights URL and gallery URL.
- Made metadata reads/writes and Eventbrite sync respect configured field names while preserving legacy KBC defaults.

### Upcoming / Ended tabs and category filtering
- Added `[kbc_events_grid date_tabs="yes"]` with Upcoming and Ended tabs.
- Added server-side `date_scope="upcoming|ended|all"` filtering.
- Moved ended events to the Ended tab based on end date, falling back to start date when no end date exists.
- Added shortcode category scoping with `category`, `categories`, `term`, `terms`, `taxonomy` and `filter_terms` attributes.
- Added scoped grids such as `[kbc_events_grid category="pcp" date_tabs="yes"]`, where both Upcoming and Ended tabs are limited to the same term.
- Added category-aware Elementor Loop Grid filters such as `[kbc_event_loop_date_filters target=".pcp-events" category="pcp"]`.
- Added public event term data for frontend filtering and cache invalidation for mapped fields.

## 2.6.1

- Stopped Eventbrite synchronization from writing to the ACF `map` field.
- Deleted only Eventbrite-owned map values on the next sync so ACF can return its configured default value.
- Preserved manually entered map values.

## 2.6.0

### Manual-edit protection
- Added source-aware three-way comparison for every Eventbrite-owned field.
- Preserved manually edited WordPress titles, content and excerpts after bulk, cron and single-event syncs.
- Mirrored protected native title/content/excerpt values into duplicate ACF fields so templates remain consistent.
- Preserved manually changed ACF fields, featured images and category assignments.
- Added safe first-sync migration behavior for pre-2.6 content.
- Added optional permanent field locks and a visible list of protected fields in the event editor.

### Synchronization
- Stopped normal syncs from republishing existing Draft, Pending, Private or Trashed events.
- Added cross-request sync locking, remote hashes, retry windows and resumable pagination.
- Added reconciliation for cancelled, deleted and missing Eventbrite events.
- Added configurable actions, batch limits and new-event status.
- Prevented failed description requests from clearing local content.
- Fixed stale Eventbrite image reuse and preserved manual images.
- Kept editorial categories while managing only the Eventbrite-owned term.
- Enabled title-keyword category mapping when Eventbrite has no category.
- Hid stored API tokens in the settings form; blank secret fields now preserve saved values.

### Dates, registration and frontend
- Fixed registration reopening between event end and highlights day.
- Made server state authoritative and removed visitor-timezone recalculation.
- Removed closed booking links from server-rendered HTML.
- Kept multi-day events visible through their end date.
- Excluded Private/Future events from public timing data.
- Limited filter queries and removed frontend database writes.
- Reduced broad DOM observation and fixed active-filter CSS precedence.

### Data integrity, SEO and administration
- Added canonical event date indexes and collision-free global manual ordering.
- Validated event/track/session/partner relationships and image attachments.
- Added complete Event JSON-LD with dates, location, attendance mode, organizer, image and sponsors.
- Added post-type/taxonomy conflict handling and missing-component notices.
- Added a non-destructive uninstall routine and standalone regression checks.
- Added translation-ready strings throughout the updated interfaces.
