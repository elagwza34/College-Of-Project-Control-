# College of Project Control - Full Project Features & Dashboard Overview

Last inspected: 23 September 2026

This document is a practical map of the whole project: what exists, how it works, which parts are dynamic, how the dashboard controls content, and where the important frontend/backend logic lives.

It intentionally does not document any private values from `.env`.

## 1. Project Summary

The project is a React + Django content website for College of Project Control. It combines:

- Public marketing website and programme pages.
- Project Controls Professional route pages.
- Sector-specific route pages.
- Events and masterclasses.
- Articles / knowledge hub.
- Case studies.
- Testimonials and review submission.
- Apprenticeship eligibility checker.
- Enquiry and contact flows.
- Programme assistant chatbot.
- A protected dashboard for managing dynamic content, media, events, enquiries and integrations.

The frontend is a Vite React app. The backend is a Django REST Framework API with a CMS/dashboard layer.

## 2. Technology Stack

### Frontend

- React 19.
- React Router 7.
- Vite 8.
- TypeScript.
- Tailwind CSS.
- Remix Icon class names for iconography.
- Custom hooks and fetch services instead of React Query or Redux.
- Public pages are code-driven React components with selected CMS-editable fields.

Important files:

- `frontend/src/App.tsx`
- `frontend/src/router/index.tsx`
- `frontend/src/router/config.tsx`
- `frontend/src/index.css`
- `frontend/src/styles/tokens.css`
- `frontend/tailwind.config.ts`

### Backend

- Django 5.2.
- Django REST Framework.
- DRF token authentication for dashboard login.
- PostgreSQL-compatible database driver via `psycopg`.
- `django-cors-headers`.
- Pillow for image fields.
- Cryptography for encrypted Eventbrite token storage.
- `pypdf` for uploaded chatbot documents.

Important files:

- `backend/manage.py`
- `backend/config/urls.py`
- `backend/config/api_router.py`
- `backend/apps/content/models.py`
- `backend/apps/content/urls.py`
- `backend/apps/cms/urls.py`
- `backend/apps/cms/auth.py`
- `backend/apps/cms/page_content.py`
- `backend/apps/chatbot/views.py`

## 3. High-Level Architecture

### Public Website

The public website is rendered by React routes. Most pages are static component compositions, but many collections are loaded dynamically from the API.

Global public shell:

- `FundingTicker`
- `Navbar`
- `SeoManager`
- route content
- `Footer` inside pages
- `ProgrammeAssistant`
- `PageContentProvider`

Public API base:

```text
/api/v1/
```

### Dashboard

Dashboard routes live under:

```text
/dashboard/*
```

The dashboard is a separate React app mounted inside the same frontend application:

- `frontend/src/dashboard/DashboardApp.tsx`
- `frontend/src/dashboard/layout/DashboardLayout.tsx`
- `frontend/src/dashboard/api/client.ts`
- `frontend/src/dashboard/auth/AuthContext.tsx`

Dashboard API base:

```text
/api/v1/cms/
```

Dashboard authentication is token-based. The token is stored in `localStorage` as:

```text
cms_token
```

## 4. Public Routes

Defined in:

```text
frontend/src/router/config.tsx
```

Main public routes include:

- `/` - Home page.
- `/programmes` - Programmes index.
- `/short-courses` - Short courses page.
- `/short-courses/:slug` - Short course detail state handled by the same page.
- `/how-to-apply` - Application guidance.
- `/find-your-best-project-controls-route` and `/route-finder` - Route finder.
- `/about` - About page.
- `/institute-of-project-controls` and `/ipc` - IPC page.
- `/employers` - Employers page.
- `/apprentices` - Apprentices page.
- `/employer-agreement` - Employer agreement.
- `/governance-board` - Governance board.
- `/events` - Events listing.
- `/events/:slug` - Event detail.
- `/articles` - Articles listing.
- `/articles/:slug` - Article detail.
- `/case-studies` - Case studies listing.
- `/case-studies/:slug` - Case study detail.
- `/testimonials` - Testimonials and review submission.
- `/contact` - Contact.
- `/book-a-session` - Book a session.
- `/faq` - FAQ page.
- `/privacy`, `/terms`, `/accessibility`, `/cookies` - Legal pages.

Programme and route pages:

- `/associate-project-manager-level-4`
- `/project-controls-professional-level-6`
- `/project-controls-professional/operational-route`
- `/project-controls-professional/strategic-route`
- `/project-controls-professional/strategic-operational-route`
- `/project-controls-professional/pmo-governance-route`
- `/project-controls-professional/chartered-pmo-pathway`
- `/project-controls-professional/construction-route`
- `/project-controls-professional/engineering-manufacturing-aerospace-route`
- `/project-controls-professional/public-sector-councils-route`
- `/project-controls-professional/energy-oil-gas-utilities-route`

Campaign routes:

- `/campaign/hr-employer`
- `/campaign/head-of-pmo`
- `/campaign/construction`
- `/campaign/energy`
- `/campaign/public-sector`
- `/campaign/commercial-route`
- `/commercial-project-controls-route`

Knowledge hub routes:

- `/knowledge-hub`
- `/knowledge-hub/what-is-pcp-apprenticeship`
- `/knowledge-hub/fully-funded-project-controls-apprenticeship`
- `/knowledge-hub/funded-pcp-employer-guide`
- `/knowledge-hub/project-controls-level-6-vs-pmp`
- `/knowledge-hub/pcp-vs-pmp`
- `/knowledge-hub/apm-chpp-readiness-support`
- `/knowledge-hub/apm-chpp-readiness`
- `/knowledge-hub/strategic-vs-operational`
- `/knowledge-hub/construction-training`
- `/knowledge-hub/energy-training`
- `/knowledge-hub/pmo-governance-training`
- `/knowledge-hub/employer-apprenticeship-funding`
- `/knowledge-hub/commercial-routes-explained`

Thank-you routes:

- `/thank-you/eligibility`
- `/thank-you/consultation`
- `/thank-you/eventbrite`
- `/thank-you/commercial`
- `/thank-you/guide`

## 5. Main Frontend Feature Areas

### Home Page

File:

```text
frontend/src/pages/home/page.tsx
```

The home page is the top-level marketing entry. It combines brand, programme and employer messaging with dynamic feature sections.

Key dynamic sections used on or around the home experience:

- Articles section.
- Case studies section.
- Events teaser/section.
- Mentors / expert sections.
- Partner logos.
- Testimonials.
- Enquiry CTAs.
- Programme assistant.

### Programme Pages

Programme pages present the educational offer and professional pathways.

Examples:

- APM Level 4: `frontend/src/pages/apm-level-4/`
- PCP Level 6: `frontend/src/pages/project-controls-professional-level-6/`
- Operational route: `frontend/src/pages/project-controls-professional-operational-route/`
- Strategic PCP: `frontend/src/pages/strategic-pcp/`
- Strategic + Operational PCP: `frontend/src/pages/strategic-operational-pcp/`
- PMO PCP: `frontend/src/pages/pmo-pcp/`
- Chartered PMO pathway: `frontend/src/pages/chartered-pmo-pathway/`

Common feature patterns:

- Hero sections.
- Professional capability grids.
- Funding and access route sections.
- Workload and delivery rhythm sections.
- Eligibility CTAs.
- Specialist pathway cards.
- FAQ is intended to be centralised into `/faq`.

### Sector Route Pages

Sector pages are tailored PCP pages for specific industries:

- Construction and infrastructure.
- Engineering, manufacturing and aerospace.
- Public sector and councils.
- Energy, oil, gas, utilities and net zero.

Folders:

```text
frontend/src/pages/operational-pcp-construction/
frontend/src/pages/operational-pcp-engineering/
frontend/src/pages/operational-pcp-public-sector/
frontend/src/pages/operational-pcp-energy/
```

Each sector normally has:

- Sector hero.
- Sector capability strip.
- Sector-specific challenge section.
- Pathway/access content.
- Employer capability/progression content where retained.
- Instructor/expert sections where retained.
- CTA buttons using the shared brand CTA style.

Sector pages use a mix of static React content and shared/dynamic feature components.

### Route Finder and Eligibility Checker

Route finder:

```text
frontend/src/pages/route-finder/
```

Eligibility checker:

```text
frontend/src/pages/apprenticeship-eligibility-checker/
```

Eligibility logic:

```text
frontend/src/pages/apprenticeship-eligibility-checker/eligibilityEngine.ts
frontend/src/pages/apprenticeship-eligibility-checker/checkerData.ts
```

These are frontend-driven interactive tools. They collect user choices and show route/funding guidance. They can link users into enquiry flows.

### Events and Masterclasses

Public pages:

```text
frontend/src/pages/events/page.tsx
frontend/src/pages/events/detail/page.tsx
```

Services:

```text
frontend/src/services/eventsApi.ts
```

Backend:

```text
backend/apps/content/events.py
backend/apps/content/eventbrite.py
backend/apps/content/models.py
```

Features:

- Event listing.
- Event detail by slug.
- Search/filter options.
- Event categories and classifications.
- Online/in-person format.
- Manual events.
- Eventbrite-synced events.
- Eventbrite sync settings and jobs.
- Webhook support.

### Articles and Knowledge Hub

Dynamic articles:

```text
frontend/src/pages/articles/page.tsx
frontend/src/pages/articles/detail/page.tsx
frontend/src/services/articlesApi.ts
backend/apps/content/articles.py
```

Code-driven knowledge hub:

```text
frontend/src/pages/knowledge-hub/
```

The project has two article-like systems:

- Dynamic article records in the database.
- Static/code-authored knowledge hub pages.

Dynamic article fields include:

- title
- slug
- excerpt
- content
- category
- author
- image/image URL
- read time
- publish state
- order

### Case Studies

Public pages:

```text
frontend/src/pages/case-studies/page.tsx
frontend/src/pages/case-studies/detail/page.tsx
frontend/src/components/feature/CaseStudyCard.tsx
frontend/src/components/feature/CaseStudiesSection.tsx
frontend/src/services/caseStudiesApi.ts
```

Backend:

```text
backend/apps/content/case_studies.py
backend/apps/content/models.py
backend/apps/content/migrations/0022_casestudy.py
```

Dashboard:

```text
frontend/src/dashboard/pages/CaseStudiesPage.tsx
```

Case study fields:

- title
- slug
- sector
- client name
- headline
- summary
- challenge
- approach
- outcome
- metrics as JSON list
- image upload or image URL
- image alt text
- featured flag
- published flag
- published date
- order

Public display:

- Listing page at `/case-studies`.
- Detail page at `/case-studies/:slug`.
- Home page teaser via `CaseStudiesSection`.
- Only published records should appear publicly.

Dashboard behavior:

- Create, edit and delete case studies.
- New case studies are saved to the database through `/api/v1/cms/case-studies/`.
- Published case studies become visible on the public site.

### Testimonials

Public pages and components:

```text
frontend/src/pages/testimonials/
frontend/src/components/feature/TestimonialsSection.tsx
frontend/src/components/feature/TestimonialSubmission.tsx
frontend/src/services/testimonialsApi.ts
```

Backend:

```text
backend/apps/content/testimonials.py
backend/apps/content/models.py
```

Features:

- Public approved testimonials.
- Review submission.
- Programme catalogue for review form.
- Consent flag.
- Moderation status: pending, approved, rejected.
- Featured flag.
- Private photo upload storage plus optional image URL.
- Dashboard moderation.

### Enquiries and Contact Forms

Frontend:

```text
frontend/src/components/feature/ContactForm.tsx
frontend/src/components/feature/EnquiryForm.tsx
frontend/src/hooks/useEnquirySubmission.ts
frontend/src/services/enquiryApi.ts
```

Backend:

```text
backend/apps/content/models.py
backend/apps/content/views.py
backend/apps/cms/views.py
```

Enquiry fields:

- name
- email
- phone
- organisation
- role title
- enquiry type
- message
- source path
- status
- read state
- internal notes
- assigned staff user
- follow-up date

Dashboard features:

- View enquiries.
- Filter by status/search/unread/due.
- Mark as read.
- Assign to staff user.
- Add notes.
- Set follow-up date.
- Notifications for unread enquiries.

### Mentors and Coaches

Frontend:

```text
frontend/src/services/mentorsApi.ts
frontend/src/services/coachesApi.ts
frontend/src/components/feature/MeetMentors.tsx
frontend/src/components/feature/CoachingSupport.tsx
frontend/src/pages/mentors/detail/
```

Backend models:

- `MentorProfile`
- `Coach`

Dashboard:

- `MentorsPage.tsx`
- `CoachesPage.tsx`

Features:

- Active/draft toggle.
- Ordering.
- Mentor images by upload or URL.
- Coach image upload.
- Mentor detail routes.

### Partners, Credentials, Sectors and IPC Images

Dynamic collections:

- Partner logos.
- Professional credentials.
- Sectors.
- IPC image gallery/assets.

Frontend services:

```text
frontend/src/services/partnersApi.ts
frontend/src/services/professionalCredentialsApi.ts
frontend/src/services/sectorsApi.ts
frontend/src/services/ipcImagesApi.ts
```

Dashboard pages:

```text
PartnersPage.tsx
ProfessionalCredentialsPage.tsx
SectorsPage.tsx
IpcImagesPage.tsx
```

Backend models:

- `Partner`
- `ProfessionalCredential`
- `Sector`
- `IpcImage`

### Short Courses

Public page:

```text
frontend/src/pages/short-courses/page.tsx
```

Backend model:

- `ShortCourse`

Dashboard:

```text
frontend/src/dashboard/pages/ShortCoursesPage.tsx
```

Fields:

- slug
- title
- category
- duration
- format
- owner
- audience
- summary
- focus list
- detail JSON
- icon
- image URL
- active flag
- order

### Programme Assistant Chatbot

Frontend:

```text
frontend/src/components/feature/chatbot/ProgrammeAssistant.tsx
frontend/src/services/chatbotApi.ts
frontend/src/dashboard/pages/ChatbotPage.tsx
```

Backend:

```text
backend/apps/chatbot/
```

Features:

- Public chatbot status endpoint.
- Public chat endpoint.
- Active knowledge source lookup.
- Dashboard source management.
- Document upload and text extraction.
- Quota enforcement by hashed IP and global daily limit.
- No raw IP storage in quota model.
- Provider configuration lives in backend environment.

Knowledge source fields:

- title
- kind: website, FAQ, document
- reference path
- content
- active flag
- import key

### Media Library

Dashboard:

```text
frontend/src/dashboard/pages/MediaLibraryPage.tsx
```

Backend:

```text
backend/apps/cms/models.py
backend/apps/cms/views.py
```

Model:

- `MediaAsset`

Features:

- Image upload.
- External source URL.
- Alt text.
- Uploaded-by user.
- Uploaded timestamp.
- Used by dashboard sections and content modules that need media URLs.

## 6. Design System and UI Identity

Key style files:

```text
frontend/src/index.css
frontend/src/styles/tokens.css
frontend/tailwind.config.ts
```

Design system characteristics:

- Brand colors based around deep teal/primary and signal orange.
- Source Serif 4 for headings.
- Body and label fonts defined through CSS variables.
- Shared CTA button style using `cta-background.png`.
- Capsule CTA buttons with orange arrow panel.
- Shared card, panel, shadow and radius tokens.
- Pattern cube overlay for dark/light sections.
- Section heading patterns via reusable components.
- Responsive layouts based on Tailwind utilities.

Important reusable components:

- `SectionHeading`
- `SiteLink`
- `Modal`
- `Skeleton`
- `CollectionState`
- `EditorialPageHero`
- `PcpHero`
- `StickyCta`
- `StickyProgrammeCta`
- `Breadcrumbs`
- `SchemaOrg`
- `SeoManager`

## 7. Dynamic Content Map

The following content is dynamic and backed by database/API records:

- Site settings.
- Navigation/menu structures in older CMS models.
- Page content revisions for editable text/images/links.
- Page section draft/published content.
- Media assets.
- Mentors.
- Coaches.
- Partners.
- Professional credentials.
- Sectors.
- Short courses.
- Events.
- Event categories.
- Eventbrite sync settings/jobs.
- Enquiries.
- Articles.
- Case studies.
- Testimonials.
- IPC images.
- Chatbot knowledge sources.
- Chatbot quota counters.

The following are mostly static/code-driven:

- Most route page layouts.
- Most programme page structures.
- Knowledge hub article pages under `frontend/src/pages/knowledge-hub/`.
- Eligibility checker decision UI and rule data.
- Route finder interface.
- Legal page structures, although copy can be component/data driven.

Hybrid CMS-editable pages:

- Public React components can contain `CmsText`, `CmsImage`, and `CmsLink`.
- Those fields load published values from `/api/v1/page-content/`.
- Dashboard preview can inject draft values into an iframe.

## 8. Backend API Map

Main API mount:

```text
backend/config/api_router.py
```

Public endpoints:

```text
GET  /api/v1/page-content/
GET  /api/v1/chatbot/status/
POST /api/v1/chatbot/chat/
GET  /api/v1/testimonials/
GET  /api/v1/testimonials/programmes/
POST /api/v1/testimonials/submit/
GET  /api/v1/articles/
GET  /api/v1/articles/<slug>/
GET  /api/v1/case-studies/
GET  /api/v1/case-studies/<slug>/
GET  /api/v1/ipc-images/
GET  /api/v1/site/
GET  /api/v1/navigation/
GET  /api/v1/pages/home/
GET  /api/v1/pages/<slug>/
GET  /api/v1/mentors/
GET  /api/v1/mentors/<id>/
GET  /api/v1/coaches/
GET  /api/v1/partners/
GET  /api/v1/professional-credentials/
GET  /api/v1/sectors/
GET  /api/v1/sectors/<slug>/
GET  /api/v1/short-courses/
GET  /api/v1/short-courses/<slug>/
GET  /api/v1/events/
GET  /api/v1/events/library/
GET  /api/v1/events/options/
GET  /api/v1/events/<slug>/
POST /api/v1/enquiries/
POST /api/v1/integrations/eventbrite/webhook/<secret>/
```

Dashboard endpoints:

```text
POST /api/v1/cms/auth/login/
POST /api/v1/cms/auth/logout/
POST /api/v1/cms/auth/password-reset/
POST /api/v1/cms/auth/password-reset/<uid>/<token>/

GET  /api/v1/cms/page-content/
GET  /api/v1/cms/page-content/<key>/
POST /api/v1/cms/page-content/<key>/

CRUD /api/v1/cms/chatbot/sources/
POST /api/v1/cms/chatbot/sources/upload/
GET  /api/v1/cms/chatbot/status/

CRUD /api/v1/cms/testimonials/
CRUD /api/v1/cms/articles/
CRUD /api/v1/cms/case-studies/
CRUD /api/v1/cms/ipc-images/
CRUD /api/v1/cms/pages/
CRUD /api/v1/cms/sections/
CRUD /api/v1/cms/navigation-groups/
CRUD /api/v1/cms/navigation-items/
CRUD /api/v1/cms/media/
CRUD /api/v1/cms/mentors/
CRUD /api/v1/cms/coaches/
CRUD /api/v1/cms/partners/
CRUD /api/v1/cms/professional-credentials/
CRUD /api/v1/cms/sectors/
CRUD /api/v1/cms/short-courses/
CRUD /api/v1/cms/events/
CRUD /api/v1/cms/event-categories/
GET/PATCH /api/v1/cms/enquiries/

GET  /api/v1/cms/eventbrite/settings/
PATCH/POST /api/v1/cms/eventbrite/settings/
POST /api/v1/cms/eventbrite/test/
POST /api/v1/cms/eventbrite/sync/
GET  /api/v1/cms/eventbrite/jobs/
POST /api/v1/cms/eventbrite/jobs/<id>/retry/
```

## 9. Dashboard Pages and What They Manage

Dashboard routes are defined in:

```text
frontend/src/dashboard/DashboardApp.tsx
```

Pages:

- `/dashboard` - Overview, counts and quick links.
- `/dashboard/login` - Dashboard login.
- `/dashboard/reset-password/:uid/:token` - Password reset.
- `/dashboard/pages` - Visual page content editor.
- `/dashboard/media` - Media library.
- `/dashboard/mentors` - Mentor CRUD.
- `/dashboard/coaches` - Coach CRUD.
- `/dashboard/partners` - Partner logo CRUD.
- `/dashboard/professional-credentials` - Credentials CRUD.
- `/dashboard/ipc-images` - IPC image CRUD.
- `/dashboard/sectors` - Sector CRUD.
- `/dashboard/short-courses` - Short course CRUD.
- `/dashboard/articles` - Article CRUD.
- `/dashboard/case-studies` - Case study CRUD.
- `/dashboard/testimonials` - Testimonial moderation.
- `/dashboard/events` - Event CRUD and event management.
- `/dashboard/enquiries` - Enquiry inbox and workflow.
- `/dashboard/chatbot` - Chatbot knowledge source management.

Dashboard layout includes:

- Sidebar navigation.
- Auth-protected content.
- Logout handling.
- Enquiry notifications.
- Mobile menu support.

## 10. Dashboard Authentication and Security Flow

Auth files:

```text
backend/apps/cms/auth.py
backend/apps/cms/authentication.py
backend/apps/cms/permissions.py
frontend/src/dashboard/auth/AuthContext.tsx
frontend/src/dashboard/api/client.ts
```

How login works:

1. User submits username/email and password from `/dashboard/login`.
2. Frontend sends `POST /api/v1/cms/auth/login/`.
3. Backend finds a matching Django user by username or email.
4. Backend authenticates with Django auth.
5. User must be active and staff.
6. Backend returns a DRF token.
7. Frontend stores the token in `localStorage` under `cms_token`.
8. Every dashboard request sends:

```text
Authorization: Token <token>
```

Permission boundary:

- Dashboard APIs require `IsDashboardUser`.
- `IsDashboardUser` requires authenticated + staff user.
- Dashboard login has throttling.
- Password reset has throttling.
- Expiring token authentication rejects stale tokens.

Important current limitation:

- There is no fine-grained role/permission UI yet.
- Any staff dashboard user can broadly manage dashboard-protected resources unless further view-level restrictions are added.

## 11. Page Content Draft / Publish Workflow

Files:

```text
backend/apps/cms/page_content.py
backend/apps/cms/models.py
frontend/src/dashboard/pages/PagesPage.tsx
frontend/src/components/feature/PageContent.tsx
```

Model:

```text
PageContentRevision
```

Fields:

- section key
- draft JSON
- published JSON
- history JSON
- version number
- hidden flag
- updated timestamp
- updated by

Workflow:

1. Dashboard loads editable section catalogue.
2. User chooses a page.
3. Dashboard opens the real public page inside an iframe with `?cms-preview=1`.
4. Public page sends `cpcm-preview-ready` message.
5. Dashboard sends draft values into iframe.
6. User can click editable text/image/link in preview.
7. User edits field in side panel.
8. User can:
   - Save draft.
   - Publish saved draft.
   - Save & publish immediately.
   - Hide/show section.
   - Restore previous version to draft.
9. Public site only reads published values from `/api/v1/page-content/`.

Important:

- Layout remains in React code.
- Dashboard controls text, image URLs and links for registered editable fields.
- The CMS does not visually recompose every page from arbitrary blocks; it edits approved fields.

## 12. Database Models Overview

### `apps.content`

Main content models:

- `SiteSettings`
- `NavigationMenu`
- `MenuItem`
- `Page`
- `PageSection`
- `MentorProfile`
- `Coach`
- `Partner`
- `ProfessionalCredential`
- `ShortCourse`
- `EventCategory`
- `Event`
- `EventSyncControl`
- `EventSyncJob`
- `Sector`
- `Enquiry`
- `Article`
- `CaseStudy`
- `IpcImage`
- `Testimonial`

### `apps.cms`

Dashboard/CMS models:

- `Page`
- `Section`
- `NavigationGroup`
- `NavigationItem`
- `MediaAsset`
- `PageContentRevision`

Note:

There are older/generic CMS `Page` and `Section` models and also content app `Page` / `PageSection` models. Current dashboard page content editing mainly uses `PageContentRevision` and catalogue-based fields.

### `apps.chatbot`

Chatbot models:

- `KnowledgeSource`
- `ChatQuota`

### Django built-ins

Used heavily:

- `auth.User`
- DRF `Token`

## 13. Data Loading Strategy

### Public frontend

Public dynamic data uses small service modules:

- `articlesApi.ts`
- `caseStudiesApi.ts`
- `chatbotApi.ts`
- `coachesApi.ts`
- `enquiryApi.ts`
- `eventsApi.ts`
- `ipcImagesApi.ts`
- `mentorsApi.ts`
- `partnersApi.ts`
- `professionalCredentialsApi.ts`
- `sectorsApi.ts`
- `shortCoursesApi.ts`
- `testimonialsApi.ts`

Common pattern:

- React component mounts.
- `fetch` request is made to `/api/v1/...`.
- Loading/error/retry states are handled locally.
- Some simple collection pages use `useCollection`.

There is currently no global query cache such as React Query, SWR, Apollo or Redux Toolkit Query.

### Dashboard frontend

Dashboard uses:

```text
frontend/src/dashboard/api/client.ts
```

This wraps fetch with:

- base URL setup
- token header
- JSON/FormData handling
- 20-second timeout
- 401 token clearing and redirect
- `get`, `post`, `patch`, `del` helper methods

Dashboard pages generally own their own local state.

## 14. Existing Caching and Query System

Current caching system:

- No dedicated frontend query cache.
- Browser/network cache is not centrally managed.
- `PageContentProvider` loads published editable content once on mount.
- Dashboard content pages load data on mount or revision changes.
- Backend returns JSON directly; no explicit HTTP cache layer is visible in the inspected files.

Implication:

- This is simple and predictable.
- For larger scale, React Query/SWR could reduce repeated fetching and standardise optimistic updates, invalidation and retries.

## 15. External Integrations

### Eventbrite

Files:

```text
backend/apps/content/eventbrite.py
backend/apps/content/events.py
frontend/src/dashboard/pages/EventbriteSettings.tsx
```

Features:

- Private API token storage.
- Organization ID.
- Public backend URL for webhooks.
- Auto sync flag.
- Sync interval.
- Show/hide uncategorized events.
- Connection test.
- Manual sync request.
- Sync job tracking.
- Retry failed jobs.
- Webhook route protected by secret.

### Chatbot Provider

Files:

```text
backend/apps/chatbot/service.py
backend/apps/chatbot/views.py
frontend/src/components/feature/chatbot/
```

Provider keys/config are environment-based and not stored in frontend code.

### Media / Images

The project uses a mix of:

- local `/images/...` assets
- uploaded dashboard media under backend media
- external HTTPS image URLs
- legacy/generated Readdy image URLs in some page content

## 16. Security Boundaries

Existing boundaries:

- Public APIs are read-only or carefully scoped where needed.
- Enquiry creation is public.
- Testimonial submission is public but goes to moderation.
- Dashboard APIs require staff token auth.
- Token auth expires through custom auth class.
- Dashboard login is throttled.
- Password reset is throttled.
- Chatbot quotas limit abuse.
- Chatbot quotas hash IP addresses instead of storing raw IPs.
- Eventbrite webhook has a secret path.
- Dashboard document source validation blocks external dashboard/admin/API reference paths.
- Page content link validation allows local paths, anchors, HTTP(S), mailto and tel.
- Page content image validation requires HTTPS or local image path.

Current limitations / future hardening:

- No tenant/site boundary yet.
- Staff access is broad; no resource-level RBAC in dashboard.
- Dashboard token is stored in localStorage, which is simple but exposed to XSS risk if XSS ever occurs.
- No central audit table beyond page content history and model timestamps.
- No explicit per-model ownership or approval workflow except testimonials/page content draft-publish.

## 17. Current Dynamic Dashboard Logic

### CRUD Pattern

Most dashboard modules follow the same pattern:

1. Load records from `/api/v1/cms/<resource>/`.
2. Render table/cards/list.
3. Open form or inline editor.
4. Save through `POST` or `PATCH`.
5. Delete through `DELETE` where allowed.
6. Public site reads separate public endpoints or only active/published records.

### Draft/Publish Pattern

Only `PageContentRevision` has a formal draft/published/history workflow.

Other content usually uses flags:

- `is_active`
- `is_published`
- `status`
- `published_at`

### Enquiry Workflow

Enquiries are not deleted through normal dashboard flow. They are operational records:

- read/unread
- status
- internal notes
- assignment
- follow-up
- notifications

### Events Workflow

Events can be:

- manual
- synced from Eventbrite

Eventbrite events are deduped by organization and external ID.

### Testimonials Workflow

Testimonials are submitted publicly, then reviewed in dashboard:

- pending
- approved
- rejected
- featured
- moderation notes
- reviewed by / reviewed at

## 18. Important User-Facing Features

### Marketing and Conversion

- Branded dark/light heroes.
- Programme CTAs.
- Funding ticker.
- Eligibility checker links.
- Consultation request CTAs.
- Sticky programme CTA components.
- Sector-specific value propositions.

### Education and Programme Clarity

- Programme overview pages.
- Route comparison and pathway cards.
- Workload sections.
- Funding/access route sections.
- Professional recognition sections.
- Case studies and articles to build evidence/trust.

### Employer-Focused Tools

- Employer pages.
- Campaign pages for HR/employers and heads of PMO.
- Enquiry capture.
- Capability review CTAs.
- Workforce eligibility CTAs.

### Learner-Focused Tools

- Apprentices page.
- Eligibility checker.
- Route finder.
- How-to-apply guidance.
- Short courses catalogue.

### Trust Content

- Governance board.
- About page.
- Mentors and experts.
- Testimonials.
- Articles.
- Case studies.
- Professional credentials.
- Partner logos.

## 19. Important Admin/Dashboard Features

- Secure login.
- Token auth.
- Password reset.
- Overview dashboard.
- Page copy/image/link editing with preview.
- Media library.
- Articles management.
- Case studies management.
- Events management.
- Eventbrite settings and sync.
- Enquiry management.
- Testimonials moderation.
- Short courses management.
- Mentor/coach management.
- Sector cards management.
- Partner/credential/IPC image management.
- Chatbot knowledge source management.

## 20. Known Current Architecture Shape

The project is currently a single-site architecture:

- One public brand/site.
- One dashboard.
- One primary API.
- One database schema.
- No tenant/site selector in dashboard.
- No `site_id` or `tenant_id` on content records.

There are early/global site concepts:

- `SiteSettings`
- navigation models
- page/page section models

But these are global, not multi-tenant.

## 21. Multi-Site / Multi-Tenant Readiness Notes

To support a secure multi-site dashboard later, the following would likely need a `site_id` or `tenant_id`:

- `SiteSettings`
- `NavigationMenu`
- `MenuItem`
- `Page`
- `PageSection`
- `PageContentRevision`
- `MediaAsset`
- `MentorProfile`
- `Coach`
- `Partner`
- `ProfessionalCredential`
- `ShortCourse`
- `EventCategory`
- `Event`
- `EventSyncControl`
- `EventSyncJob`
- `Sector`
- `Enquiry`
- `Article`
- `CaseStudy`
- `IpcImage`
- `Testimonial`
- `KnowledgeSource`

User/site access tables would be needed:

- `Site`
- `SiteMembership`
- user roles per site
- permissions per resource/action

Dashboard changes needed:

- Site selector.
- Store selected site in dashboard state.
- Send selected site with every CMS request.
- Filter all dashboard queries by site.
- Enforce site membership on backend, not only frontend.
- Scope Eventbrite settings per site.
- Scope media uploads per site.
- Scope page content revisions by site + section key.

Public site changes needed:

- Resolve current site by hostname, path prefix, or deployment config.
- Return only content for that site.
- Generate site-specific nav/footer/settings.
- Site-specific SEO metadata and assets.

## 22. One Database or Multiple Data Sources?

Current observed architecture:

- One Django backend.
- One Django database connection configured through environment/settings.
- Dynamic website and dashboard data live in Django models.
- External data can be imported/synced from Eventbrite.
- Chatbot may call an external AI provider.
- Images can be local uploads or external URLs.

So the architecture is primarily one database with selected external integrations/data sources.

## 23. Run Commands

Frontend:

```powershell
cd frontend
npm.cmd install
npm.cmd run dev
```

Backend:

```powershell
cd backend
python manage.py migrate
python manage.py runserver 127.0.0.1:8000
```

Common validation:

```powershell
cd frontend
npm.cmd run type-check
npm.cmd run lint
```

```powershell
cd backend
python manage.py check
```

## 24. Most Important Files by Responsibility

### Public routing

```text
frontend/src/App.tsx
frontend/src/router/index.tsx
frontend/src/router/config.tsx
```

### Dashboard routing/layout/auth

```text
frontend/src/dashboard/DashboardApp.tsx
frontend/src/dashboard/layout/DashboardLayout.tsx
frontend/src/dashboard/auth/AuthContext.tsx
frontend/src/dashboard/api/client.ts
```

### Public API services

```text
frontend/src/services/
```

### Backend public URLs

```text
backend/config/urls.py
backend/config/api_router.py
backend/apps/content/urls.py
backend/apps/chatbot/urls.py
```

### Backend dashboard URLs

```text
backend/apps/cms/urls.py
```

### Backend models

```text
backend/apps/content/models.py
backend/apps/cms/models.py
backend/apps/chatbot/models.py
```

### Page content editor

```text
backend/apps/cms/page_content.py
frontend/src/dashboard/pages/PagesPage.tsx
frontend/src/components/feature/PageContent.tsx
```

### Case studies

```text
backend/apps/content/case_studies.py
frontend/src/services/caseStudiesApi.ts
frontend/src/pages/case-studies/
frontend/src/dashboard/pages/CaseStudiesPage.tsx
```

### Events/Eventbrite

```text
backend/apps/content/events.py
backend/apps/content/eventbrite.py
frontend/src/pages/events/
frontend/src/dashboard/pages/EventsManager.tsx
frontend/src/dashboard/pages/EventbriteSettings.tsx
```

### Chatbot

```text
backend/apps/chatbot/
frontend/src/components/feature/chatbot/
frontend/src/dashboard/pages/ChatbotPage.tsx
```

## 25. Practical Mental Model

Think of the project in four layers:

1. Public React experience:
   The pages, sections, brand design, CTAs, and interactive tools users see.

2. Public API:
   Read endpoints for events, articles, case studies, testimonials, mentors, sectors, short courses and page content.

3. Dashboard:
   Authenticated React admin that manages database records and page content revisions.

4. Django data layer:
   Models, serializers, viewsets, public endpoints, CMS endpoints, integrations and migrations.

## 26. What Is Most Valuable in the Project Right Now

- Strong design system and brand direction.
- Rich programme and sector-specific content.
- Protected dashboard already managing many content types.
- Dynamic articles, events, case studies and testimonials.
- Eventbrite integration groundwork.
- Chatbot source management and quota protection.
- Page content preview editor with draft/publish/history.
- Reusable frontend services and dashboard CRUD pattern.

## 27. What Needs Attention Next

- Decide which CMS model family is canonical long-term: `apps.content.Page/PageSection`, `apps.cms.Page/Section`, or catalogue-based `PageContentRevision`.
- Add finer-grained dashboard roles if multiple editors will use the system.
- Add a formal audit log for all dashboard content changes.
- Standardise list/pagination/search behavior across all dashboard modules.
- Add shared dashboard form primitives to reduce repeated CRUD UI.
- Add a site/tenant model before any multi-site rollout.
- Add tests for newer features such as case studies.
- Consider a frontend query/cache library if data flows keep growing.
- Review localStorage token storage if threat model requires stronger protection.

