# Dashboard workflows — first implementation

## Enquiries and notifications

- `/dashboard/enquiries` offers searchable requests, status/unread/follow-up-due filters and full submission details.
- Staff can save internal notes, assign an active staff member and set a follow-up timestamp. Original submission fields remain read-only.
- The navigation badge counts unread requests across the staff team. Opening an individual request marks it read without changing its follow-up status. Opening the list does not clear unread requests.
- Notifications refresh every 30 seconds while the page is visible, on window focus and after reading a request. New arrivals produce an in-app announcement and a link; no email, OS notification or sound is sent.
- Existing requests already contacted/qualified/closed are marked read by the migration. Existing new requests remain unread.

## Page copy and images

- `/dashboard/pages` lists the connected page-local sections. The current catalogue has 214 sections across 48 page groups.
- `frontend/scripts/page-content-plugin.mjs` registers literal JSX copy and image sources in page component files at build/dev time. The same transform connects those fields to the published-content provider, without manually duplicating page copy or changing layout markup.
- The generated `backend/apps/cms/page_content_catalogue.json` must be deployed with the matching frontend build. Field IDs depend on source file and default content; changing defaults in code creates new field IDs. Old published keys are ignored.
- Editors save a draft, review its fields, then publish explicitly. Publication history retains ten previous snapshots. Restore creates a draft and requires another explicit publish.
- Concurrent version conflicts return HTTP 409. Images accept HTTPS or same-site paths. Public APIs return only published, currently registered fields; they never expose drafts or enquiry information.
- Shared configuration, dynamic collections, layout changes and general SEO are not editable through this first field editor. Dedicated existing editors continue to own articles, events and other dynamic collections. This is not a full visual page builder.

## Validation and activation

Local Django tests cover staff access, original submission preservation, assignment, filtering, idempotent read state, draft isolation, publication, restore, schema validation and concurrent edits. `npm run test:dashboard:browser` exercises the UI against isolated fixtures and verifies that a published heading appears in the public page; it sends no real requests to customers.

Database changes are in `content/0019` and `cms/0003`. They have been tested against an isolated local test database. On 14 September 2026, both migrations were tested on an isolated Neon branch copied from the active database. Enquiry read/follow-up and content publication APIs passed, with temporary test writes rolled back. The same migrations were then applied to the connected database using its direct endpoint, verifying original enquiry data fingerprints before and after. Django was restarted, live APIs returned HTTP 200, and a browser confirmed 48 page groups and editable fields at localhost:3000/dashboard/pages.

Next work after this first implementation: appointment availability/booking, richer overview reporting, chatbot operational analytics, and granular staff roles. Those are separate workflows, not implied to be complete by the enquiry/content editors.


## Visual page editor

The page selector now opens the actual public route in a same-origin preview iframe, with all sections in page order. Click an editable text/image to select its field in the adjacent panel. Typing updates the preview immediately; each section keeps its own unsaved values when switching to another section. Save section draft and Publish section remain separate actions. Fit, 1280px, 768px and 390px viewports are available.

Preview mode only activates inside a frame with `cms-preview=1`. Drafts are sent by the dashboard through messages checked against both origin and parent/frame window identity. The public content endpoint still exposes only published values. The frame suppresses link navigation, form submission and the chatbot launcher while editing. Normal public rendering retains its original markup. This editor changes connected text, images and static button/link destinations, not section order or layout; dynamically routed content without a concrete URL retains field editing without an iframe.

Browser checks cover field selection from the frame, immediate draft display, publication isolation, explicit save/publish, mobile preview width and blocked preview navigation. A read-only check on localhost confirmed that selecting the real page heading opens the correct field, without submitting edits.

Button text fields include a linked URL setting when the source anchor has a literal href. Clicking the anchor area also selects its URL directly. Supported destinations are same-site paths, section anchors, HTTP(S), mailto and tel links. Draft previews update immediately; destinations are published with their section. Shared/config-driven links remain outside this page-local editor.
