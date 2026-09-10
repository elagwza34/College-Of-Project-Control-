# Moderated programme testimonials

## User and editor flow

The Contact page has a **Share your experience** button. `/contact?review=1` opens the same accessible dialog directly; `&programme=pcp-level-6` preselects a programme. The user supplies their name, completed programme, professional/employer audience, portrait and review, plus agreement to publication. The server always creates a **pending** submission regardless of any publication fields sent by a client.

Open `/dashboard/testimonials` (**Testimonials & reviews** in the sidebar). The initial view shows pending submissions with their portraits and original wording. Staff can approve, reject, return to pending, feature, reorder and add internal notes. Approval records the reviewing staff member and timestamp. Original names, programme choices and review text cannot be rewritten through the moderation API. Notes and moderation details never appear in the public API.

Only approved submissions with publication consent appear on the site. Rejecting or returning to pending also removes public photo access. Pages already open must refresh to pick up moderation changes. Until the first approval, the public section displays an invitation to share an experience, without invented reviewers, stock testimonial claims or dummy videos.

## Placement

`TestimonialsSection` is a reusable component with `programme`, `title` and `id` props. It includes professional/employer tabs, previous/next controls and portrait thumbnails. The home page shows all approved reviews. The dedicated `/testimonials` page uses the same section.

`ProgrammeTestimonials` is mounted by the shared Footer before the newsletter/footer, and renders only on recognised programme URLs. `programmeReviewRoutes` in `frontend/src/services/testimonialsApi.ts` maps canonical URLs and their aliases to the review programme classification. Each individual programme page displays matching reviews. Add new programme values to `backend/apps/content/review_catalogue.py` and their route mapping when introducing new programmes, then create the corresponding choices migration.

## Images and deployment

JPG, PNG and WebP files are accepted up to 5 MB and 20 megapixels. The backend validates and re-encodes portraits as JPEG, removes metadata, caps dimensions at 1,000 pixels and generates random filenames. Portraits live in `backend/private_uploads/testimonials`, outside public `MEDIA_ROOT`. Persist and back up this directory alongside the database in deployment; do not expose it as a public static directory. It is excluded from Git.

`GET /api/v1/testimonials/<id>/photo/` serves portraits only for approved/consented records or authenticated staff. The dashboard fetches pending portraits with its existing auth token and displays a temporary blob URL. Responses use no-store caching so a new request checks the current publication state. The public submission endpoint has a 5-per-hour IP throttle; use a shared cache and configure trusted proxy handling for multi-worker deployments.

## API and verification

- Public: `GET /api/v1/testimonials/` with optional `programme` and `reviewer_type` filters; `GET /testimonials/programmes/`; multipart `POST /testimonials/submit/`.
- Staff: paginated `GET /api/v1/cms/testimonials/?status=pending`, detail GET and PATCH. No public update/moderation endpoint exists.
- Migration: `content.0016_testimonial`.
- Backend tests: `python manage.py test apps.content.tests.test_testimonials --noinput` covers pending-by-default, private portraits, staff approval/withdrawal, consent, image validation/re-encoding, permissions, ordering and throttling.
- Browser: build the frontend, then run `node scripts/testimonials-browser.mjs`. It reads the real public endpoint and runs the submission/moderation UI flow against isolated in-memory fixtures. No sample reviews are submitted or approved in the project database.

Screenshots and browser checks are saved under `docs/testimonials-validation`.
