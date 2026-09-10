# IPC image management

## Local runtime diagnosis

The frontend at port 3001 returned HTTP 502 because no API was listening on
port 8000. `backend/.env` selects `config.settings.local_neon`; the earlier
SQLite migrations did not update that database. Starting Django through
`python run_local.py runserver 127.0.0.1:8000` fixed connectivity and exposed the
remaining HTTP 500: Neon lacked the `content_ipcimage` table and its migration
history stopped at content 0005. The user subsequently explicitly approved the
Neon update. Content migrations 0006–0012 were then applied successfully.

Live verification through the frontend proxy on port 3001 passed: authenticated
list HTTP 200 with seven images, create HTTP 201, edit HTTP 200, public list
HTTP 200 excluding a hidden test image, and delete HTTP 204. The temporary test
record was deleted and the original seven records were preserved. Both the
direct API on port 8000 and frontend proxy now return HTTP 200 for IPC images.

Dashboard form errors now distinguish malformed image URLs from server failures.

The original black/gold IPC section is retained. Its moving photo strip is now owned by the CMS rather than a hardcoded array.

## Using the dashboard

Open **Dashboard → IPC images** (`/dashboard/ipc-images`).

1. Paste a direct HTTP/HTTPS image URL in **Direct image link**.
2. Optionally add an image description and display order. Lower numbers appear first; IDs break ties.
3. Click **Add image**. Existing cards support **Save image**, **Show on website**, and **Remove image**.
4. Reload any public page using the IPC section to see saved changes.

The strip loops continuously from right to left, including while hovered, without a Pause/Play button as requested. Short collections are repeated to fill the track. IPC's continuous loop is explicitly exempt from the site's reduced-motion animation suppression; the rest of the site retains that setting. Removing or hiding all images removes the strip; the original placeholders never reappear as a runtime fallback.

## Implementation and deployment

- `content.IpcImage`: image URL, alternative text, order and visibility.
- Public read-only endpoint: `/api/v1/ipc-images/` (active images only).
- Staff-only CRUD endpoint: `/api/v1/cms/ipc-images/`.
- URLs are validated server-side and client-side. Images are displayed by the browser, not downloaded by the backend.
- Migrations `0011_ipc_image` and `0012_seed_ipc_images` create the collection and transfer the seven existing portrait links once. Editors can replace/remove them afterward.
- Both migrations were applied to local SQLite and, after explicit user approval, the configured Neon database. Other environments must apply migrations using their normal settings before deploying this frontend.

## Validation

- Frontend lint, type-check and production build passed.
- All 12 content API tests passed, including 5 new IPC tests for CRUD, ordering, visibility, empty collections, link validation and staff permissions.
- No pending content model migrations.
- `node scripts/browser-smoke.mjs --ipc-only` checks desktop/mobile pages and the complete add/edit/hide/delete journey. It measures decreasing horizontal CSS transform values at 1440/375 px while hovered, under both motion preferences, verifies infinite looping and absence of playback controls, and checks that an empty collection stays empty.
- Browser tests use local fixtures; backend tests use an isolated test database. See `ipc-images-validation/browser-results.json`.
