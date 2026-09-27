# Feature Replication Prompt For Another Project

Use this prompt in a new project when you want to replicate the feature set and operating model of this project without copying its content, branding, visual identity, or design system.

```text
Act as a senior full-stack architect, senior frontend engineer, senior backend engineer, CMS architect, and product-minded dashboard designer.

I want you to build or refactor this project into a modern content-driven website with a secure admin dashboard.

IMPORTANT:
- Do NOT copy any old content, copywriting, visual style, brand identity, colours, typography, imagery, or design system from the reference project.
- Only replicate the FEATURE SET, DATA STRUCTURE, DASHBOARD LOGIC, WORKFLOWS, SECURITY MODEL, and GENERAL OPERATING MECHANICS.
- Use this project's own brand/design system if it already exists.
- If the project has no design system, create a clean neutral system, but do not imitate the reference project visually.
- Inspect the existing project first before making changes.
- Preserve existing user work and avoid unrelated refactors.
- Implement incrementally with migrations, API endpoints, dashboard screens, public views, and verification.

GOAL:
Create a public website + protected dashboard architecture where non-technical staff can manage dynamic website content, media, enquiries, articles, events, case studies, testimonials, short courses/resources, people profiles, partner logos, and chatbot/knowledge sources.

The implementation should include these feature groups:

1. Public Website Architecture
- Frontend routing for normal public pages.
- A global public shell with navigation, footer, SEO manager, route scroll handling, and optional assistant widget.
- Public pages should remain component-driven and maintainable.
- Dynamic public sections should load from API endpoints.
- Static page structure should stay in code, but selected text/image/link fields should be dashboard-editable where appropriate.

2. Protected Dashboard
- A separate dashboard area under `/dashboard`.
- Login page.
- Password reset flow.
- Protected layout with sidebar navigation.
- Dashboard overview page with counts and quick links.
- Token-based or secure session-based auth.
- API client wrapper for authenticated dashboard requests.
- Automatic logout/redirect on unauthorized responses.
- Mobile-friendly dashboard navigation.

3. Authentication and Permissions
- Only authenticated staff/admin users can access dashboard APIs.
- Login must accept email or username.
- Passwords must use the backend framework's secure password hashing.
- Add login throttling/rate limiting.
- Add password reset throttling.
- Add expiring tokens or secure sessions.
- Create a reusable dashboard permission class/middleware.
- Public APIs must not expose dashboard-only fields.

4. Page Content Editor
Build a dashboard feature called "Pages & Sections" with:
- A catalogue of approved editable sections/fields.
- Draft values.
- Published values.
- Version number for conflict detection.
- History of previous published versions.
- Hide/show section toggle.
- Updated by / updated at.
- Live preview in an iframe using the real public page.
- Preview mode using query string such as `?cms-preview=1`.
- `postMessage` communication between dashboard and preview:
  - preview ready
  - send draft values
  - select editable field from preview
  - focus selected section/field
- Field types:
  - text
  - image URL
  - link URL
- Validation:
  - text length limit
  - safe local paths, anchors, HTTP(S), mailto, tel links
  - image fields must be local paths or HTTPS URLs
- Actions:
  - save draft
  - publish saved draft
  - save and publish immediately
  - restore previous version to draft
  - hide/show section
- Public pages must only read published values.

5. Media Library
- Dashboard CRUD for media assets.
- Upload image files.
- Store source URL if using external media.
- Store alt text.
- Store uploaded by and uploaded at.
- Return usable public media URLs.
- Use media URLs from other dashboard forms.

6. Enquiry / Lead Management
Public:
- Enquiry/contact forms.
- Submit to public API.
- Capture name, email, phone, organisation, role/title, enquiry type, message, and source path.

Dashboard:
- Enquiry inbox.
- Search by name/email/organisation/message.
- Filter by status.
- Filter unread.
- Filter due follow-ups.
- Mark as read.
- Change status.
- Assign to staff user.
- Add internal notes.
- Set follow-up date.
- Show unread enquiry notifications in dashboard layout.

Statuses:
- new
- contacted
- qualified
- closed

7. Articles / Insights
Public:
- Article listing page.
- Article detail page by slug.
- Related/latest article cards where needed.

Dashboard:
- Create, edit, publish/unpublish, and delete articles.

Fields:
- title
- slug
- excerpt
- content
- category
- author
- image upload or image URL
- image alt
- read minutes
- is published
- published at
- order

8. Case Studies
Public:
- Case studies listing page.
- Case study detail page by slug.
- Optional homepage/latest case studies section.

Dashboard:
- Create, edit, publish/unpublish, feature/unfeature, order, and delete case studies.

Fields:
- title
- slug
- sector/category
- client/organisation name
- headline
- summary
- challenge
- approach
- outcome
- metrics as JSON list of `{ value, label }`
- image upload or image URL
- image alt
- is featured
- is published
- published at
- order

9. Testimonials / Reviews
Public:
- Approved testimonials listing/section.
- Public testimonial submission form.
- Optional photo upload or image URL.
- Consent checkbox.

Dashboard:
- Review moderation queue.
- Approve/reject testimonials.
- Feature/unfeature.
- Add moderation notes.
- Store reviewed by and reviewed at.

Fields:
- name
- programme/product/service/category
- reviewer type
- photo
- image URL
- review text
- consent
- status: pending, approved, rejected
- is featured
- order
- moderation notes

10. Events and Masterclasses
Public:
- Event listing page.
- Event detail page by slug.
- Filters/search options.
- Event formats such as online/in-person.
- Category/classification support.

Dashboard:
- Manual event CRUD.
- Event categories/classifications CRUD.
- Featured event flag.
- Active/draft flag.

Fields:
- title
- slug
- summary
- description
- image URL
- image alt
- starts at
- ends at
- timezone
- location
- organiser
- category
- classifications
- format
- sales/status
- price label
- CTA label
- CTA URL
- source URL
- order
- is active
- is featured

11. External Event Integration
If relevant to the project, add an external event sync module similar to Eventbrite:
- Store encrypted private API token.
- Store organisation/account ID.
- Store public backend URL for webhooks.
- Test connection.
- Manual sync.
- Auto sync flag.
- Sync interval.
- Webhook secret.
- Sync jobs table.
- Job status, attempts, due date, result, error.
- Retry failed sync jobs.
- Dedupe external events by account/organisation and external ID.
- Keep manually created events separate from external events.

12. Short Courses / Resources / Products
Public:
- Listing page.
- Detail page or detail state by slug.

Dashboard:
- CRUD screen.
- Active/draft toggle.
- Ordering.

Fields:
- slug
- title
- category
- duration
- format
- owner/provider
- audience
- summary
- focus list as JSON
- detail JSON for structured page content
- icon
- image URL
- order
- is active

13. People Profiles
Add dynamic people/profile management for mentors, experts, coaches, or team members.

Public:
- Profile cards.
- Optional detail pages.

Dashboard:
- CRUD.
- Image upload or image URL.
- Active/draft toggle.
- Ordering.

Fields:
- name
- initials fallback
- role/title
- affiliation/qualification
- specialties/focus
- biography
- image
- image URL
- link URL such as LinkedIn
- order
- is active

14. Partners / Logos / Credentials / Sectors
Add dashboard-managed collections for:
- partner logos
- credentials/accreditations
- sectors/categories/service areas
- image galleries if needed

Common fields:
- name/title
- slug where appropriate
- description
- icon
- image upload or image URL
- link URL
- order
- is active

15. Chatbot / Programme Assistant / Knowledge Assistant
If the project needs an assistant:

Public:
- Chat widget.
- Status endpoint to know whether assistant is available.
- Chat endpoint.
- Fallback consultation/contact link if unavailable.

Dashboard:
- Knowledge source CRUD.
- Upload document source.
- Activate/deactivate sources.
- Dashboard status showing provider config and active source count.

Knowledge source fields:
- title
- kind: website, FAQ, document
- reference path
- content
- is active
- import key

Safety and quota:
- Do not store raw IP addresses.
- Use hashed request quota keys.
- Add hourly per-user/IP quota.
- Add global daily quota.
- Validate reference paths so dashboard/admin/API paths cannot become public knowledge sources.
- Keep provider API keys only in backend environment.

16. Site Navigation and Settings
Add if useful:
- Site settings model.
- Global announcement/ticker.
- Logo text/URL.
- Primary CTA label/URL.
- Footer text and footer CTA.
- Navigation groups and navigation items.
- Header/footer/legal locations.
- Active/inactive menu items.
- Ordering.

17. SEO and Structured Data
- Central SEO manager.
- Per-page title/description support.
- Article structured data.
- Organisation/site schema where useful.
- Noindex dashboard routes.
- Sensible fallback metadata.

18. Frontend Data Strategy
- Use dedicated service modules per resource.
- Use local loading/error/retry states.
- Build reusable collection loading hook if no query library exists.
- If the project already uses React Query/SWR/Redux Toolkit Query, use that instead.
- Keep public services separate from dashboard API client.

19. Backend API Design
Create public read endpoints and dashboard CRUD endpoints separately.

Public endpoints should return only active/published records.
Dashboard endpoints should require dashboard permission.

Suggested API shape:
- `/api/v1/articles/`
- `/api/v1/articles/<slug>/`
- `/api/v1/case-studies/`
- `/api/v1/case-studies/<slug>/`
- `/api/v1/events/`
- `/api/v1/events/<slug>/`
- `/api/v1/testimonials/`
- `/api/v1/testimonials/submit/`
- `/api/v1/enquiries/`
- `/api/v1/media or /api/v1/cms/media/`
- `/api/v1/page-content/`
- `/api/v1/cms/<resource>/`

20. Dashboard UX Requirements
- Clear overview cards.
- Search/filter on operational lists.
- Empty states.
- Loading states.
- Error states.
- Confirm destructive deletes.
- Form validation.
- Image preview.
- Published/draft/active badges.
- Save feedback.
- Mobile/tablet friendly layout.
- Avoid hiding critical actions.

21. Database Requirements
Create models/migrations for all dynamic content.
Use timestamps:
- created_at
- updated_at

Use publish fields where needed:
- is_published
- published_at

Use visibility fields where needed:
- is_active
- is_featured
- order

Use audit fields where needed:
- updated_by
- reviewed_by
- reviewed_at
- uploaded_by

22. Security Requirements
- Public forms must validate data.
- Dashboard APIs must be protected server-side.
- Never rely on frontend-only checks.
- Never expose private tokens/API keys.
- Store integration tokens encrypted if they must be saved.
- Use safe upload handling.
- Validate URLs.
- Throttle login/password reset/public chatbot.
- Add permission tests.

23. Optional Multi-Tenant Readiness
If this project may become multi-site/multi-tenant:
- Add a `Site` or `Tenant` model early.
- Add `site_id` to dynamic content tables.
- Add user-site memberships.
- Add roles per site.
- Add dashboard site selector.
- Scope every dashboard query by selected site.
- Enforce site membership on backend.
- Resolve public site by hostname/path/deployment config.
- Scope media, events, page content, articles, case studies, testimonials, navigation and settings by site.

24. Implementation Order
Do the work in this order:

1. Inspect existing project architecture.
2. Report current frontend/backend/auth/database/routing state.
3. Create or adapt backend models.
4. Create migrations.
5. Add serializers/public APIs/dashboard APIs.
6. Add dashboard auth/permission protection if missing.
7. Add dashboard API client.
8. Add dashboard layout and routes.
9. Build dashboard CRUD pages.
10. Build public listing/detail/section components.
11. Connect public forms.
12. Add page content draft/publish editor if required.
13. Add seed/demo content only if requested.
14. Run migrations.
15. Run backend checks/tests.
16. Run frontend type-check/lint/build.
17. Summarise changed files and how to use the system.

25. Acceptance Criteria
The final result is acceptable only when:
- Public pages load successfully.
- Dashboard login works.
- Dashboard CRUD creates records in the database.
- Published/active records appear publicly.
- Draft/inactive/unpublished records stay hidden publicly.
- Media uploads can be reused.
- Enquiries appear in dashboard after public submission.
- Testimonials require moderation.
- Case studies/articles/events have working listing and detail pages.
- Dashboard APIs reject unauthenticated requests.
- Validation and error states are present.
- The implementation follows the target project's own design system, not the reference project's design.

Deliverables:
- Database migrations.
- Backend models, serializers, views/viewsets, URLs.
- Frontend services.
- Public pages/sections.
- Dashboard pages.
- Auth and permission flow.
- Short README or documentation explaining the feature set and operating workflow.
```

