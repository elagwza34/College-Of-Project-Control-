# Events Suite Pro 3.1.0 Universal

## Dedicated event email transport

Version 3.1.0 can send welcome messages, reminders, manual registration emails, and connection tests through a private Google Workspace SMTP connection used only by Events Suite Pro. It does not install global mail hooks and does not change password-reset messages, contact forms, WooCommerce mail, or mail from other plugins. The Google App Password is encrypted at rest using the site's WordPress authentication key.

## Zoom event links

Open **Events → Zoom Integration** and connect a Zoom Server-to-Server OAuth app. Then edit each Eventbrite-synced event and select its matching Zoom meeting. The plugin saves that meeting's attendee `join_url` on the event and exposes it to email templates as `{{zoom_url}}`. The link can also be appended automatically to all automated emails.

## Registrations and email reminders

Open **Events → Registrations** to import Eventbrite attendees and inspect email status. Open **Events → Email Automations** to configure three reminders before each event. Each reminder supports minutes, hours, days or weeks plus an editable subject and message.

Copy the protected webhook URL from the Email Automations page into Eventbrite and subscribe it to attendee/order creation, update, cancellation and refund actions. The hourly attendee sync remains enabled as a recovery mechanism if a webhook delivery is missed.

Universal WordPress events suite with configurable post type, taxonomy, meta/ACF field mapping, Eventbrite sync, event grids, agenda tracks and sessions, speakers, partners, Elementor Loop integration, manual ordering and Event schema.

The plugin keeps the existing `kbc_` function/option namespace for safe upgrades, but the visible settings are now designed for use on any website.

## Universal setup

Open **Events → Suite Settings** after activation and configure:

- **Event Post Type Slug**: use an existing slug such as `event`, `events`, `tribe_events`, `training`, `course`, or `webinar`.
- **Register Event Post Type**: Auto-register the post type when it is missing, or disable registration when another plugin/theme owns it.
- **Event Taxonomy Slug**: use the category taxonomy that should drive filters, for example `event_category`, `tribe_events_cat`, `category`, or `course_category`.
- **Field Mapping**: map the plugin to your actual meta/ACF field names for start date, end date, times, location, registration URL, image, highlights URL and other fields.
- **Grid Display**: choose the default date scope, enable Upcoming/Ended tabs by default, and customize the tab labels.

When changing post type, taxonomy, archive, or taxonomy URL slugs, open **Settings → Permalinks** and click **Save Changes**.

## Upcoming and ended event logic

Upcoming/ended filtering is based on the event end date. If the event has no end date, the start date is used instead.

- Upcoming: event end date is today or in the future.
- Ended: event end date is before today.
- Multi-day events remain in Upcoming until the end date has passed.

The date indexes are stored in `_kbc_event_start_ymd` and `_kbc_event_end_ymd` for fast filtering. They are refreshed on event save, Eventbrite sync, and when date field mappings change.

## Event grid examples

Show all events with Upcoming / Ended tabs:

```text
[kbc_events_grid date_tabs="yes"]
```

Show all events with date tabs and category buttons:

```text
[kbc_events_grid date_tabs="yes" filters="yes"]
```

Show only PCP events, with Upcoming PCP and Ended PCP tabs:

```text
[kbc_events_grid category="pcp" date_tabs="yes"]
```

Show only PMP events:

```text
[kbc_events_grid category="pmp" date_tabs="yes"]
```

Show only Marketing events:

```text
[kbc_events_grid category="marketing" date_tabs="yes"]
```

Use another taxonomy for one grid:

```text
[kbc_events_grid taxonomy="course_category" category="pcp" date_tabs="yes"]
```

Show only upcoming or ended server-side without tabs:

```text
[kbc_events_grid date_scope="upcoming"]
[kbc_events_grid date_scope="ended"]
```

Limit category filter buttons to chosen terms:

```text
[kbc_events_grid filters="yes" filter_terms="pcp,pmp,marketing" date_tabs="yes"]
```

## Elementor Loop Grid date filters

Add a custom CSS class to the Elementor Loop Grid container, for example `pcp-events`, `pmp-events`, or `marketing-events`. Then place one of these shortcodes above the loop:

```text
[kbc_event_loop_date_filters target=".pcp-events" category="pcp"]
[kbc_event_loop_date_filters target=".pmp-events" category="pmp"]
[kbc_event_loop_date_filters target=".marketing-events" category="marketing"]
```

Each filter instance controls only the target grid and only the requested term, so Upcoming and Ended are scoped to the same category.

## Manual edits are preserved

The plugin stores the latest Eventbrite value in a separate source snapshot for every synced field. During each later sync it compares three values:

1. the current WordPress value;
2. the last value received from Eventbrite;
3. the new Eventbrite value.

When the current WordPress value differs from the previous Eventbrite source, it is treated as an editorial/manual change and remains visible. The new remote value is recorded only as the latest hidden source snapshot. This protection covers the native WordPress title, content and excerpt, duplicate mapped fields, dates, times, location, status, booking URL, image and featured image. The `map` field is intentionally not imported from Eventbrite, so its ACF/default value remains authoritative.

Existing sites are migrated safely: on the first sync after upgrading, an unexplained pre-existing difference is assumed to be manual rather than overwritten.

The option is enabled by default under **Events → Suite Settings → Manual Edit Protection**. Optional permanent field locks are available in the same section.

## Eventbrite sync safeguards

- Existing Draft, Pending, Private and Trashed events are never republished by a normal sync.
- Manual featured images and editorial categories are retained.
- Only the Eventbrite-managed category term is changed when a mapping changes.
- A cross-request lock prevents cron, bulk and single-event syncs from running concurrently.
- Unchanged events are skipped using a remote hash.
- Large imports pause at the configured page limit and resume from the saved continuation.
- Failed description/image downloads are retried later without clearing the local value.
- Reconciliation detects cancelled, deleted and missing Eventbrite events and applies the configured action.
- Saved Eventbrite tokens are never rendered back into the settings form. A blank field preserves the stored token.

For the strongest credential protection, define `KBC_EVENTS_SUITE_EVENTBRITE_TOKEN` and `KBC_EVENTS_SUITE_EVENTBRITE_ORGANIZATION_ID` in `wp-config.php`.

## Main shortcodes

- `[kbc_events_grid]`
- `[kbc_event_loop_date_filters]`
- `[kbc_event_agenda]`
- `[kbc_event_speakers]`
- `[kbc_event_partners]`

## Installation

Upload the ZIP as a normal WordPress plugin. The archive contains one root folder: `kbc-events-suite-pro/`.

After upgrading:

1. activate/update the plugin;
2. open **Events → Suite Settings** and confirm the post type, taxonomy and field mapping;
3. confirm manual-edit protection is enabled;
4. open **Events → Eventbrite Sync**, save the desired reconciliation settings, then run one manual sync;
5. clear page, Elementor and LiteSpeed caches when applicable.

## Development checks

Run the bundled lightweight regression checks:

```bash
php tests/regression.php
```

The release is intended for WordPress 5.8+ and PHP 7.4+.

## Uninstall behavior

`uninstall.php` removes plugin options, credentials, locks, schedules, logs and transients. It deliberately retains event posts, agenda content, partners, media and editorial metadata.
