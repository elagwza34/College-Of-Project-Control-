# Frontend improvement report

Implementation date: 9 September 2026.

Follow-up: at the user's request, the original IPC section was restored, including its black/gold layout, large IPC heading and logo, two original CTAs, feature items and animated portrait strip. The compact IPC replacement described in the historical implementation notes below is superseded. Shared link handling and global reduced-motion support remain. Lint, type-check and production build pass after restoration; the earlier browser results and bundle measurements predate this follow-up.

This work implements the frontend audit and section review in the existing React/Vite application. It retains the KBC/CPCM identity, teal and orange palette, typography, photography, programme routes, employer information, and existing Django API contracts. It does not deploy the application or change the backend.

Reference reports: [frontend audit](frontend-audit-2026-09-09.md) and [page/section review](frontend-section-review-2026-09-09.md).

Further user-requested update: IPC portraits are now CMS-managed through **Dashboard → IPC images**, with direct image links, edit/delete, ordering and visibility controls. The original scrolling appearance remains. See [IPC image management](ipc-images.md) for deployment migrations and the dedicated validation results; this update supersedes the earlier code-owned IPC portrait implementation.

## Completed changes

### 1. Consultation and enquiry journeys

- `/book-a-session` now contains a working consultation **request** form. Existing URLs remain usable; CTA wording consistently requests a consultation instead of promising an appointment.
- Contact, consultation and all six campaign lead sections use the same enquiry infrastructure. Programme interest, role, organisation and contextual information are retained in the submitted message. Consultation links automatically carry their originating page into the form.
- The shared submission hook prevents simultaneous duplicate submissions, uses native required/email validation, disables submission while pending, retains input on failure, and announces errors.
- A success receipt appears only after an HTTP success response with a positive integer enquiry ID. A successful HTTP response with missing or invalid receipt data remains an error.
- Public API calls have a 20-second timeout. A timeout is an unconfirmed outcome, never local success.
- The five direct thank-you URLs use one neutral page component. Visiting or refreshing a URL cannot claim an enquiry was sent, a place reserved, or a booking confirmed.
- The reusable confirmation/status presentation supports stored-request receipts, registration requests pending review (requiring a receipt), neutral unverified visits and downloads with an explicit resource URL. Direct routes default to the neutral mode; they cannot enable receipt/download modes from URL parameters. Actual request receipts explicitly distinguish an enquiry from an appointment or programme reservation.
- The missing home catalogue download was replaced by a programme comparison link. Its analytics event now describes that action.
- The footer now requests programme updates through the same submission hook. It reports a stored enquiry reference rather than claiming an active newsletter subscription, retains the email on failure, and prevents duplicate in-flight requests. Removed unsupplied social-account links rather than routing social icons to unrelated pages.

### 2. Navigation and metadata

- Added `SiteLink` and `resolveDestination` as the shared public link layer. Internal navigation uses React Router, while external links, email, telephone and file downloads retain native link behaviour.
- Centralized legacy destination repairs, including consultation, eligibility, route comparison, employer process, and old PCP article anchors. Fixed the apprentices page's absent contact anchor.
- Added one route/hash focus and scrolling handler that waits for lazy content, focuses the destination and respects sticky header offsets. Removed competing route transition scrolling.
- Made the knowledge hub the primary discovery experience. `/articles` redirects to it, preserving query/hash values, and duplicate navigation entries were removed.
- Removed page-level title, description and canonical elements that competed with `SeoManager`. Kept route-specific structured data with its content. Public pages now have a single title/canonical owner; dashboard routes set `noindex`.
- Updated outcome-example metadata and recognized numeric mentor routes. Mentor pages now expose loading, failure and retry states and ignore stale responses.
- Removed robots exclusions that prevented crawlers from seeing client-rendered campaign/thank-you `noindex` directives. Server rendering remains a separate deployment concern.

### 3. CMS ownership and reliability

The dashboard's **Content ownership** screen documents the editing boundary:

| CMS resource | Public destination |
| --- | --- |
| Mentors | Shared mentor cards and individual profiles |
| Coaches | Coaching/support profiles |
| Partners | Home partner logo grid |
| Sectors | Sector cards and sector-page photography |
| Professional credentials | Shared recognition section |
| Events | Public event listing |
| Media | Assets referenced by CMS records |

All other blocks remain code-managed: layouts, programme facts, route/campaign copy, navigation, metadata, FAQs, funding explanations, articles, examples and legal notices. Legacy page/navigation editor routes now show the ownership explanation, and the disconnected editing screens were removed.

- Shared collection loading handles loading, error with retry, empty and populated states. There are no fabricated partner or credential fallback records.
- Mentor and partner marquees became static, responsive grids without repeated content.
- Dashboard overview counts represent connected events, enquiries and media; network failure does not display invented zero totals.
- Dashboard editor errors are announced visibly. Failed mutations do not reach success handlers, and drafts remain available for retry. Reloading a failed list warns about unsaved input.
- Media upload uses a keyboard-accessible button. Editors can save alternative text, see clipboard feedback and confirm deletion of a potentially referenced asset. Library alternative text is explicitly distinguished from descriptions on linked public resources.
- The dashboard sidebar becomes a modal menu on smaller screens. Dashboard screens load in separate chunks.

## Components changed: before and after

| Before | After |
| --- | --- |
| Separate contact and dormant campaign/route forms | `FormField`, `EnquiryForm`, `useEnquirySubmission`, `RequestStatus`; thin contact adapter |
| Unfinished booking destination | Consultation enquiry page connected to the existing enquiries API |
| Five nearly identical confirmation pages | `ConfirmationPage` wrappers with neutral direct-visit behaviour |
| Three events promotion variants | Shared `EventsTeaser`, with real event and consultation destinations |
| Four duplicated sector pages | `SectorRoutePage` with typed `sectorData.ts` configurations |
| Per-component public link behaviour | `SiteLink`, destination resolver and `RouteScroll` |
| Mobile menu without bounded focus/scrolling | Shared native `Modal`, explicit Tab wrapping, Escape, initial/return focus |
| Eager public/dashboard application imports | Lazy dashboard boundary and lazy dashboard screens |
| Duplicate testimonials and unsupported star ratings | Shared `OutcomeExamples`; existing route adapters retained where useful |
| Silent CMS collection failures | `useCollection`, `CollectionState`, editor error reporting and retry controls |
| Disconnected CMS page/navigation editors | `ContentOwnershipPage` |
| Global hero/button override rules | Component styles with semantic tokens and explicit button/control classes |

## Sections removed or merged

- **Home:** career-direction content moved into professional pathways; inclusion/support content moved into coaching; repeated outcomes and testimonial presentation became clearly labelled workplace examples. The placeholder video area was removed with the unused testimonial component.
- **Programmes:** removed the repeated “Why College” and outcomes blocks. Kept comparison, programme-versus-module guidance, how to choose, employer information, mentors, recognition and FAQs.
- **Campaigns:** removed repeated benefit-card sections after retaining route-specific capability and transformation information. Replaced unsupported testimonial sections with illustrative scenarios and connected every lead section to the shared enquiry form.
- **Sector routes:** retained route-specific capability, problems, process, access routes, audiences, development and FAQs in typed data. Removed the redundant booking-only section and consolidated event promotion.
- **PMO:** replaced unsupported learner evidence with examples and reduced the second full hero to a compact closing CTA.
- **Articles:** consolidated discovery under `/knowledge-hub` and removed its artificial loading delay.
- **IPC:** retained a compact branded explanation of professional requirements and external award decisions; removed unsupported portrait/accreditation presentation.
- **Legal and article layouts:** removed unnecessary near-full-screen minimum heights.

The requested dormant components were checked for references before removal: `CampaignLeadForm`, `RouteConsultationForm`, `RouteEligibilityForm`, `RegisterInterestForm`, `PmoEnquiryForm`, `HomeFaq`, `CroUrgencyStrip` and `ProgrammeIntroduction`. Their useful responsibilities are covered by shared forms, FAQs or existing programme sections. The [exact deletion list](frontend-improvement-work/removed-files.json) also records obsolete event variants, disconnected CMS editors, testimonial content and unused hooks/i18n files. Original public image URLs were preserved for possible external users.

## Design system changes

- Extracted the existing palette and typography into `src/styles/tokens.css`, including semantic surface, canvas, text, muted text, border, action and status tokens. Added scoped IPC colours.
- Connected semantic Tailwind colours to RGB channels so opacity modifiers work consistently. Kept existing brand ramps and mapped legacy highlight utilities to the orange signal ramp.
- Standardized control/card/panel radii at 6/12/16 px and reusable card/overlay shadows.
- Added a responsive display-heading size, shared section spacing, gutters, header and section-navigation offsets. Replaced scattered small/arbitrary text sizes and a broken spacing utility.
- Added explicit primary/secondary button and native form-control styles. Removed broad substring-based CTA overrides and blanket hero layout/background overrides.
- Added reduced-motion handling and removed the continuously moving funding ticker, magnetic navbar CTA and route entrance/exit animation.
- Kept the existing hero imagery, brand typography, editorial sections and purposeful IPC treatment. This is consolidation of the existing design, not a replacement identity.

## Accessibility improvements

- Public form labels use stable IDs, required/optional text and autocomplete. Help/error relationships and pending/error announcements are explicit.
- Received requests move focus to their receipt. Eligibility steps focus the new heading; missing answers are announced and focused.
- Public and dashboard menus share a scroll-bounded native dialog. The background becomes inert; Escape closes it; initial focus is on Close; Tab/Shift+Tab wrap inside; focus returns to the trigger.
- Desktop navigation supports Escape and closes on route changes. Page/hash navigation focuses the destination after lazy rendering. Dashboard content is a skip-link destination.
- Critical mobile navigation uses an inline SVG, so its icon does not depend on the remote icon font.
- Image alternatives are present across the scanned public routes. Media-library descriptions are editable; decorative images remain empty-alt where appropriate.
- Static grids remove inaccessible continuous marquees. Reduced-motion rules suppress remaining entrance effects.
- Sticky calls to action are removed from the tab order when not displayed and reserve bottom space when visible.

## Performance improvements

| Metric | Audit baseline | Final build |
| --- | ---: | ---: |
| Main JavaScript | 513.69 kB | 265.06 kB |
| Main JavaScript, gzip | 150.63 kB | 82.79 kB |
| Stylesheet | 105.52 kB | 93.30 kB |
| Stylesheet, gzip | 18.23 kB | 16.51 kB |

The entry bundle is approximately **48% smaller** (45% smaller gzip). These are build-artifact sizes, not field Core Web Vitals measurements. Route chunks still load as needed.

- Split dashboard code away from public pages and split individual dashboard screens.
- Removed unused motion/i18n runtime paths and nine unused dependencies: Stripe React, Supabase, Firebase, Framer Motion, i18next, language detector, Lucide, react-i18next and Recharts. Package manifest and lockfile agree.
- Served optimized WebP variants: light logo 726 kB → 36 kB; dark logo 650 kB → 32 kB; employer image 2,010 kB → 72 kB; IPC logo 144 kB → 9 kB. The navbar requests one appropriate logo with explicit dimensions.
- Preserved eager/high-priority hero loading and added lazy/asynchronous loading for supporting imagery.
- Removed unused mounted sections and their dependencies, artificial waits and route animations. Added a recoverable rendering/lazy-load error boundary.

## Validation

Lint, type-check and production build were run after the implementation batches. Detected issues were corrected before continuing. **Final lint, type-check, production build and all five unit tests pass.** The [validation summary](frontend-improvement-work/validation-summary.json) and [changed-file manifest](frontend-improvement-work/changed-files.json) record the result.

Reproduce from `frontend`:

```text
npm.cmd run lint
npm.cmd run type-check
npm.cmd run build
node --test scripts/journeys.test.mjs
node scripts/browser-smoke.mjs
```

The five focused unit tests cover legacy-link resolution, unsafe scheme rejection, required-answer validation, eligibility blockers, uncertain answers and indicative rather than confirmed outcomes.

The browser harness runs installed headless Chrome against the production build with a temporary profile and local fixture API. It checks public routes at 1440/375 px, consultation at 320 px, representative tablet/dashboard pages at 768 px, title/canonical counts, headings, IDs, alternative text, local/cross-page anchors, overflow and runtime exceptions. Interactive checks cover menu focus, failed/malformed/successful enquiry responses, duplicate submission protection, neutral thank-you visits, CMS error/retry/empty states, eligibility validation, and client-side navigation. No real enquiry, CMS mutation or external registration is made.

Final browser outcome: **141 viewport checks and eight interactive journeys passed, with zero failures and zero JavaScript exceptions**. The full scan covers all 68 concrete public route declarations at 1440/375 px, one 320 px consultation check and four 768 px checks. Internal and cross-page anchor checks passed. The footer's failure/retry/receipt flow also passed without claiming an active subscription. See [machine-readable results](frontend-improvement-work/browser-results.json), [desktop home](frontend-improvement-work/home-1440.png), [mobile home](frontend-improvement-work/home-375.png), [320 px consultation](frontend-improvement-work/consultation-320.png) and [stored-request receipt](frontend-improvement-work/consultation-received.png). Remote fonts/imagery were blocked in the deterministic run; screenshots show local assets and fallback fonts.

## Remaining issues and external dependencies

1. **Appointment scheduling and communications:** the backend stores enquiries. It does not create calendar appointments, activate newsletter subscriptions or guarantee automated acknowledgement/delivery emails. These need separate backend/service integration; frontend wording now reflects that boundary. Server-side idempotency is still needed to eliminate duplicates after ambiguous network failures.
2. **Content approval:** production CMS owners must approve partner relationships, credential descriptions/images and permissions before activation. No source-approved learner testimonials were supplied, so the site uses labelled examples. Programme facts, funding bands/rules, professional-body requirements and legal content require owner review against authoritative current material; this implementation does not certify their correctness.
3. **External assets and destinations:** remote stock images, fonts, icon CDN, Eventbrite and existing hosted catalogue/employer links remain external dependencies. The deterministic browser test blocks external requests and does not verify their availability or event registration. The missing local catalogue was removed from the journey; publishing a new catalogue requires an approved document.
4. **Production API and hosting:** verify authenticated CMS permissions, live data, enquiry storage, CORS, API origin, SPA fallbacks, caching and domain configuration in staging. Tests use local API fixtures, not a production database. Existing root-relative assets assume root hosting; a subdirectory deployment needs an explicit base-path pass.
5. **Search indexing:** client-side metadata is consistent, but route-specific server rendering/prerendering, HTTP 404 responses and social crawler previews remain hosting/rendering work. Generic mentor metadata can be enhanced with profile-specific server data.
6. **Accessibility scope:** Chromium keyboard/layout checks and inspected screenshots pass as reported above; this is not a WCAG certification. Screen-reader testing, Safari/iOS/Firefox coverage and a full contrast audit of legacy components remain release QA.
7. **Legacy typing and editorial tooling:** existing permissive TypeScript/unused-variable settings were preserved. Tightening them across the remaining application is separate work. CMS drafts are retained on request failure but do not have autosave or navigation-away protection. New alternative text in the media library does not automatically propagate into linked resource descriptions.

The workspace contained extensive pre-existing tracked/untracked changes. This implementation used a separate file-hash baseline and changed frontend/documentation files only; it did not reset the repository, alter backend configuration or publish the site. Phase scripts are historical migration records, **not** an idempotent setup command—do not rerun them on the finished tree.
