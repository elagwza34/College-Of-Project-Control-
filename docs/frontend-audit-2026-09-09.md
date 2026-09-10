# Frontend Audit and Improvement Plan

Date: 9 September 2026. Scope: current working tree in `frontend/`, including public pages, campaigns, articles, lead journeys, and dashboard. Application code and content were not modified or removed.

## Executive Summary

The project is a substantial branded frontend with working build tooling and several good foundations, but it is not yet ready for a production sign-off. Its main weaknesses are incomplete conversion journeys, conflicting content ownership, inconsistent interaction behavior, and visual consistency enforced through broad CSS overrides.

Preserve the existing identity: Poppins typography, deep petrol backgrounds, cool off-white surfaces, orange primary actions, turquoise supporting accents, and the IPC black-and-gold sub-brand. A new visual language is unnecessary. Consolidating existing patterns will produce a more coherent product with less code.

Useful foundations already present:

- Public route components use `React.lazy`; reusable programme, campaign, article, FAQ, funding, mentor, and recognition sections already exist.
- `programme-template/PathwayPage.tsx` separates three pathway variants from their content data. `ProgrammeAccessSections` deliberately keeps funding, eligibility, and IPC adjacent.
- Public content services and the dashboard API have separate modules. Contact submission waits for an actual API response and exposes a failure state.
- There is a skip link, a global focus outline, semantic headings, native disclosure elements in several places, and reasonably consistent responsive grid utilities.
- The eligibility checker separates questions, decision logic, and rendering. Some loading components and API request cleanup are already implemented.

### Evidence and limits

The source inventory covers **174 TS/TSX/CSS files, including 155 TSX files**, and **69 public route declarations including aliases and the wildcard**. The dashboard route tree was reviewed separately. These counts describe source files and route declarations, not unique rendered pages. The companion [section review](frontend-section-review-2026-09-09.md) covers every public page family, its sections, all ten articles, all five confirmation pages, all four legal variants, and all dashboard screens.

| Check | Result | Meaning |
|---|---|---|
| `npm.cmd run lint` | Passed | Current ESLint configuration passes; several quality rules are disabled. |
| `npm.cmd run type-check` | Passed | Current permissive TypeScript configuration passes. |
| `npm.cmd run build` | Passed | Vite 8.2.2 reported a successful production build. |
| Build output | Initial JS 513.69 kB / 150.63 kB gzip; CSS 105.52 kB / 18.23 kB gzip | A greater-than-500-kB chunk warning was emitted. These are artifact sizes, not measured page speed. |
| Source and asset inspection | Completed | Includes import relationships, route destinations, styles, forms, API consumers, and inspection of the local home hero image. |
| Rendered browser / assistive technology / live service checks | Not performed | No browser automation tool or local Playwright package was available. No Lighthouse, live form submission, real booking, or email-delivery result is claimed. |

The first build attempt was blocked when the sandbox prevented Vite writing its temporary config; the approved retry passed. PowerShell's `npm.ps1` restriction was handled by invoking `npm.cmd`. Neither environment issue is an application defect. The workspace had substantial pre-existing changes; this audit does not attribute those changes to a particular author.

The [inventory JSON](frontend-audit-inventory.json) and [read-only inventory script](frontend-audit-inventory.py) support traceability. They use regex extraction, not a JSX parser: counts include inactive source, and dynamic IDs need manual resolution. For example, `ProfessionalPathwaysSection` correctly supplies `id="pathways"` through its default prop, despite appearing unresolved in a literal-only scan. Terminal encoding artifacts were not treated as content defects; a UTF-8 scan found no replacement characters in source.

## Critical Issues

### P1-01 — Primary conversion journeys are incomplete

**Confirmed in source.** [Booking page](../frontend/src/pages/book-a-session/page.tsx#L15) says “This page is coming soon.” The global navigation and many programme/campaign CTAs funnel users there. The contact fallback is useful, but this is an enquiry detour rather than the advertised booking experience.

Campaign `#lead-form` sections say “Complete the form” but render only a booking link. See [construction campaign](../frontend/src/pages/campaign/construction/page.tsx), with the same pattern across the other campaigns. `CampaignLeadForm`, route consultation/eligibility forms, `RegisterInterestForm`, and `PmoEnquiryForm` currently have no inbound source imports. Do not assume that a form file means the form is available to users.

**Recommendation:** establish one working primary journey first. Until a booking integration exists, use the existing contact submission and label the action “Request a programme consultation.” Preserve programme, campaign, and sector context in structured fields. Only use “Book” or “Save your place” when a reservation is actually made. No new booking service is prescribed by this audit.

**Acceptance:** every principal CTA reaches a usable action; successful submission is confirmed only after the service accepts it; failed requests retain entered data and provide a retry. Test one programme, one sector, one campaign, contact, and the employer journey end to end against a test environment.

### P1-02 — Broken or stale destinations

| Source | Destination / defect | Recommended resolution |
|---|---|---|
| [Home hero](../frontend/src/pages/home/components/CompactHero.tsx#L68) | `/College_of_Project_Controls_and_Management_Catalogue.pdf` is absent from `public/` and build assets. | Supply the approved PDF or point to a verified canonical catalogue. A file outside `public/` is not automatically a web asset. |
| [SectorHero](../frontend/src/components/feature/RouteLanding/SectorHero.tsx#L127), [RouteHero](../frontend/src/components/feature/RouteLanding/RouteHero.tsx#L120) | `#consultation` and `#eligibility`; the four sector pages and combined route do not mount corresponding forms/sections. | Use actual routes or restore the intended sections with matching IDs. |
| [StickyCta](../frontend/src/components/feature/StickyCta.tsx) | Assumes every host page has `#eligibility`, `#consultation`, and `#routes`; knowledge hub and article pages do not. | Require destinations as props or use valid application URLs. Verify every experiment variant. |
| [PMO section navigation](../frontend/src/pages/pmo-pcp/components/PmoEditorialNavbar.tsx) | `#consultation` without a matching section. | Point to the working enquiry destination. |
| [Thank-you guide](../frontend/src/pages/thank-you/guide.tsx) and other thank-you pages | PCP `#consultation`, `#proof`, and `#routes`; current PCP uses `#pathways` and has no consultation/proof section. | Reconcile with the current page structure. |
| [Funding article](../frontend/src/pages/knowledge-hub/funded-pcp-employer-guide.tsx) | `/pcp-master#lead-magnet` has no lead-magnet target. | Link to the actual guide or guide request flow. |
| [Footer](../frontend/src/components/feature/Footer.tsx) | `/employers#process`; employer process is `#how-it-works`. | Update the anchor centrally. |
| Sector case-study data, e.g. [construction](../frontend/src/pages/operational-pcp-construction/page.tsx#L228) | `ctaHref: '#'` gives a nonfunctional case-study action. | Publish a real case study or remove that action after content review. |

These are source-confirmed target mismatches; production redirects or externally hosted assets were not verified. Add a rendered route/anchor smoke check after fixing the route registry. Include aliases and default-prop IDs so the check does not repeat regex false positives.

### P1-03 — Outcome claims and confirmation language need correction

The [home testimonials component](../frontend/src/pages/home/components/Testimonials.tsx) does include an “Illustrative examples” statement. However, named people, portrait-search URLs, precise numerical case-study results, star ratings, and location-captioned “Masterclass Photos” visually resemble documented evidence. “Watch Video” opens a placeholder rather than a video. The source does not establish that these stories, people, locations, or measurements are verified. This is a presentation/evidence mismatch, not a conclusion that every claim is false.

[RouteTestimonials](../frontend/src/components/feature/RouteLanding/RouteTestimonials.tsx) explicitly disclaims verified testimonials, yet still renders names, quotes, and stars. PMO outcome copy also uses first-person testimonial styling. The construction campaign publishes a named five-star quotation. These treatments conflict with the standard stated on the dedicated [testimonials page](../frontend/src/pages/testimonials/page.tsx).

**Recommendation:** retain verified material with permission, attribution, and measurement context. Present hypothetical examples as clearly labelled scenarios, without simulated people, ratings, or outcome percentages. Remove placeholder video actions only after review. Prefer an authentic workplace output over an invented testimonial.

Five thank-you routes are directly addressable without proof of a completed action. Consultation says a booking and Teams invitation are forthcoming; Eventbrite says registration is complete; guide says an email has been sent. The checked [enquiry endpoint](../backend/apps/content/views.py) validates and saves an enquiry; it does not itself book a calendar slot or send a guide. No such completion integration was established in the reviewed flow. Use “Request received” for an accepted enquiry and reserve delivery/booking claims for confirmed service outcomes. Direct visits should offer a neutral recovery message.

### P1-04 — CMS editing and public rendering have different sources of truth

The dashboard [page editor](../frontend/src/dashboard/pages/PageEditorPage.tsx) edits page sections, publication state, and SEO; [navigation editor](../frontend/src/dashboard/pages/NavigationPage.tsx) edits header/footer groups. The public home, route registry, [Navbar](../frontend/src/components/feature/Navbar.tsx), [Footer](../frontend/src/components/feature/Footer.tsx), and `SeoManager` use source-defined content instead of those CMS records. Editors can save changes without changing the corresponding public page.

This is **not** a claim that the entire CMS is disconnected: mentors, coaches, partners, sectors, professional credentials, and public events have service consumers.

**Recommendation:** write an ownership map before implementing more CMS features. For each field choose source-managed or CMS-managed. Either connect the currently advertised editable fields to a typed public renderer, or clearly limit/hide unsupported controls after review. Do not rebuild every page as a generic JSON section engine without a real editorial requirement. The editor's “Home Page” label and “Preview Live Home” link also need to respect the selected page.

**Acceptance:** editing one supported field changes the intended public output; preview opens the correct route; unsupported fields cannot misleadingly report a public change.

### P1-05 — Interaction accessibility and small-screen navigation

- **Contact fields:** adjacent `<label>` elements lack `htmlFor`, and their controls lack matching IDs ([ContactForm](../frontend/src/components/feature/ContactForm.tsx#L44)). Placeholders do not replace persistent accessible labels. Several fields use `focus:outline-none`, weakening the shared outline. Add stable IDs, autocomplete hints, visible required/optional indicators, and associated errors.
- **Mobile navigation:** the fixed public header expands to the entire route list without a bounded scrolling region. At phone heights the lower links and booking action can extend beyond the viewport. Add a viewport-bounded scroll region, Escape handling, reliable close behavior, and keyboard focus handling appropriate to its chosen disclosure/drawer model.
- **Dashboard:** its [layout](../frontend/src/dashboard/layout/DashboardLayout.tsx) always allocates a 256px sidebar plus padded content. At 320px width almost no usable content width remains. Add a narrow-screen drawer or collapsed navigation. The global skip link has no `#main-content` target in dashboard pages.
- **Dialog/lightbox:** home testimonials have dialog roles, Escape handling, and body-scroll management, but no clear initial-focus, focus containment, or trigger-focus restoration. Photo triggers are clickable `div`s. Use buttons and an accessible dialog implementation; a role alone does not implement modal behavior. [WAI modal guidance](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) describes these focus requirements.
- **Motion:** the ticker auto-scrolls continuously with no pause control; multiple marquees/carousels and page transitions lack a reduced-motion policy. Provide pause/stop for persistent moving content and a static reduced-motion presentation. Hover-only pauses are insufficient. [WCAG pause/stop guidance](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html).

Check reflow at 320 CSS pixels, 200% text resizing and 400% zoom, plus keyboard-only navigation. These are acceptance checks, not a claim of completed WCAG certification. [WCAG reflow guidance](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html).

### P1-06 — Failures can look like permanent loading or empty content

The public [events page](../frontend/src/pages/events/page.tsx#L49) handles unmount cleanup but has no rejection handler: failed fetching leaves the loading state unresolved. Mentor/coach/partner/sector sections often replace errors with empty arrays, hiding the distinction between no content and unavailable content. Several dashboard loaders and mutations, including page, media, navigation and event editors, have no user-facing catch/retry path.

Introduce explicit loading, empty, error and success states. Keep an error visible until resolved, allow retry, and retain unsaved form values. Add route-level error boundaries for lazy-import/render failures; `Suspense` supplies a loading state, not an error recovery UI. [React lazy documentation](https://react.dev/reference/react/lazy) explains rejected imports being handled by an error boundary.

## Design System Issues

### Existing inconsistencies

| Area | Evidence | Recommendation |
|---|---|---|
| Color roles | `index.css` defines OKLCH primary/secondary/accent/highlight ramps and an RGB signal ramp; highlight and signal both represent orange. PMO/editorial code repeats `#1F2933`, `#1F5F73`, and `#F5F8F9` instead of semantic tokens. | Keep the palette; use one conversion-orange role and semantic aliases for surfaces, text, borders and statuses. Mixing color spaces is not itself a defect; duplicate ownership is. |
| Color exceptions | IPC uses black/gold; social LinkedIn controls use blue; statuses use red/green utilities. | Keep legitimate sub-brand and provider-logo colors scoped. Define status foreground/background/border pairs rather than treating all exceptions as random. |
| CTA overrides | [Global selectors](../frontend/src/index.css#L707) search class substrings and force color, radius and weight with `!important`. A `hover:bg-primary-500` token also matches `[class*="bg-primary-500"]`, even when the base control is white. | Replace substring selectors with explicit button variants. Migrate usages before removing overrides. |
| Hero overrides | `#hero` injects an external photo; child-image opacity and gradient are forced; descendant `.text-center`, `.mx-auto`, and `.justify-center` utilities are overridden. | Own visual treatment at the hero component boundary. Preserve image, alignment and inner diagram intent through explicit variants. |
| Typography | Poppins is consistently configured, but the fluid type scale is bypassed by 25 source occurrences of `text-[64px]`. Diagram labels use 9/10/11px; headings use 34/42/44/56px exceptions. | Use semantic display/heading/body/label tokens. Fixed 64px on narrow screens is a reflow risk, not proof of a particular measured overflow. |
| Type naming | `text-xs` is 14px and `text-sm` is 15px in Tailwind; `font-serif` maps to Poppins. | Preserve readable sizes; document their actual values and remove misleading serif usage. Avoid blindly reverting to framework defaults. |
| Spacing | Most sections use 64/80/96px vertical padding, alongside 56px and 40px variants; navbar nests extra 16/24px padding inside an already padded container. | Standardize section types and one owner for horizontal page gutters. Not every Tailwind spacing value needs removal. |
| Widths | 1280px global container; 1100px route subgrids; multiple 2xl/3xl/4xl/5xl content limits; hero overrides supersede some component max-width choices. | Define page, prose and form widths with explicit meanings. |
| Radius | Editorial cards use 4px, common cards 8/12px, mentor cards 16px, with a 32px exception. Pill CTAs are globally flattened; icon controls can also be affected by fill overrides. | Assign radius by component role; retain circles for avatars/icons and pills for tags. |
| Shadows/effects | Premium card, standard shadows, orange-glow buttons, editorial borders, blurred glass, drifting patterns, hover lifts/scales and magnetic buttons coexist. | Keep one subtle card elevation, one overlay elevation, one hero overlay. Prioritize deliberate visual hierarchy over simultaneous effects. |
| Dark theme | `.dark` changes only background/foreground ramps while many surfaces use literal white or hex colors, and `color-scheme: light` is set. No complete theme switch was identified. | Treat the shipped site as light theme with dark sections; do not advertise dark-mode support until complete. |
| Responsive offsets | Fixed ticker + 72px navbar, sticky section nav at 112px with 56px height, and global anchor offset 144px. | Calculate offsets from actual header/section-nav height. The 144px offset is less than the 168px nominal combined stack on section-nav pages. Verify focus and anchors after layout changes. |

### Recommended unified design system

These are proposed tokens and rules, not implemented CSS. Alias the existing palette first, then migrate components incrementally.

#### Color tokens

| Semantic token | Initial value / mapping | Use |
|---|---|---|
| `surface.canvas` | `#F5F8F9` / background-50 | Page canvas |
| `surface.card` | `#FFFFFF` | Cards and form surfaces |
| `surface.subtle` | Existing background-100 | Secondary grouped regions |
| `surface.inverse` | `#123B4A` / primary-500 | Branded dark sections |
| `surface.inverseStrong` | Existing primary-950 | Deep hero/overlay background |
| `text.primary` | `#1F2933` / foreground-800 | Body and labels |
| `text.heading` | Existing foreground-950 | Headings on light surfaces |
| `text.secondary` | Existing foreground-600 | Readable supporting copy |
| `text.inverse` | White | Text on petrol |
| `border.default` | `#DCE5E8` | Decorative card separation |
| `border.control` | Existing foreground-500, contrast checked | Identifiable input boundaries |
| `action.primary` | `#FFA953` / signal-500 | Main conversion action |
| `action.primaryHover` | Existing signal-400 | Hover state |
| `action.onPrimary` | Existing primary-950 | Text on orange |
| `action.secondary` | `#1F5F73` / secondary-500 | Secondary filled action |
| `action.link` | Existing primary-600 or secondary-600 | Text links with non-color cue |
| `accent.supporting` | `#3FA7A3` / accent-500 | Nonessential accents and graphics |
| `status.error` | Existing red-700 / red-50 / red-300 | Text / surface / border |
| `status.success` | Existing green-700 / green-50 / green-300 | Text / surface / border |
| `status.warning` | Existing amber-800 / amber-50 / amber-300 | Text / surface / border |
| `status.info` | Existing primary-700 / primary-50 / primary-200 | Text / surface / border |
| `ipc.surface`, `ipc.gold` | `#080D10`, `#D8B36E` | IPC-branded regions only |

Retire `highlight` as a separately maintained orange ramp by aliasing its relevant roles to `signal`; do not recolor every gold IPC element orange. Status colors require a label/icon as well as color.

Calculated solid-color checks using the palette's documented hex equivalents: `#667985` on white is about **4.53:1**, but on `#F5F8F9` is **4.24:1**. Orange on white is about **1.90:1**; turquoise on white about **2.89:1**. Petrol `#123B4A` on orange is about **6.31:1**. Thus use stronger secondary text on the canvas and reserve bright orange/turquoise for suitable backgrounds or decorative accents. These are palette calculations, not computed-style checks of every opacity/gradient. Normal text needs 4.5:1 and large text 3:1 under [WCAG contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

#### Typography tokens

| Role | Size | Weight / line height | Rule |
|---|---|---|---|
| Font family | Poppins, system-ui, sans-serif | Existing identity | Start with used weights 400/500/600/700; retain 800 only where justified. |
| Display / H1 | `clamp(2.25rem, 1.5rem + 3vw, 4rem)` | 700 / 1.08 | One main page heading, allow natural wrapping. |
| Section / H2 | `clamp(1.75rem, 1.25rem + 2vw, 2.625rem)` | 700 / 1.18 | Shared section scale. |
| Card / H3 | 1.25rem | 600 / 1.4 | Use 1.125rem for dense admin groups if necessary. |
| Lead paragraph | 1.125rem | 400 / 1.6 | One short introduction. |
| Body | 1rem | 400 / 1.7 | Long-form content and important explanations. |
| Compact body | 0.9375rem | 400 / 1.65 | Cards and forms. |
| Label / caption | 0.875rem | 500–600 / 1.5 | Supporting content; no 9px essential labels. |
| Eyebrow | 0.875rem | 600 / 1.4, tracking .08em | Optional short category marker. |

Use -0.025em tracking only for large headings. Keep body text at normal tracking. Heading level follows document structure, independently of visual size. Shorten oversized status/confirmation heroes rather than shrinking essential copy to fit them.

#### Spacing, radius, shadow and container tokens

| Category | Proposed scale / rules |
|---|---|
| Spacing | 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96px; use 2px only for borders/fine alignment. |
| Component gaps | 8px icon/label; 12px related text; 16px form fields; 24px card groups; 32px larger content groups. |
| Section spacing | Standard 64px mobile / 96px desktop; compact 40/64px; utility/form pages 32/48px. Keep 80px where a specific dense section needs it. |
| Gutters | 16px below 768px, 24px above; applied once by the page container. |
| Page width | 1280px outer container. |
| Reading width | 65–72ch; align summaries, article body and end CTA. |
| Form width | 40rem; narrow single-purpose form may use 32rem. |
| Radius | 6px buttons/inputs; 12px cards and images; 16px dialogs/large grouped panels; 9999px avatars, dots and badges. Editorial 4px exception only if explicitly retained as an editorial variant. |
| Shadow | `none`; card `0 8px 24px -16px rgb(18 59 74 / .20)`; overlay `0 24px 64px -16px rgb(18 59 74 / .24)`. Treat these as starting specifications for visual review. |
| Breakpoints | Keep Tailwind's existing 640 / 768 / 1024 / 1280 / 1536px defaults. One-column first; two-column cards at sm/md; complex layouts at lg. |
| Motion | 150–200ms color/opacity feedback, at most a restrained 300ms entrance; static content and instant scroll under reduced-motion preference. Continuous motion needs user control. |

#### Component rules

- **Actions:** primary orange, secondary outline/petrol, quiet text link, explicit destructive variant. Public actions generally 44–48px high, wrapping labels allowed. Use a link for navigation and a button for actions. Include focus, hover, disabled, pending and error behavior in the specification.
- **Forms:** one shared field shell for label, input, help and error; use native controls. Preserve native validation and add service errors. Announce submission status and focus the first invalid field or error summary where appropriate.
- **Cards:** one heading, one concise explanation, one relevant action. No pointer cursor or hover lift for noninteractive content. Avoid nested competing clickable regions.
- **Heroes:** preserve the existing branded style, with explicit marketing and compact utility variants. A legal page, mentor profile, confirmation or form should not require scrolling through 90vh of promotion.
- **Disclosure/FAQ:** prefer native `details/summary` when it meets the behavior; otherwise use one button-based accordion with heading semantics, `aria-expanded` and controlled panel IDs.
- **Navigation:** route-level and section-level navigation have distinct names, current-state indicators, and a shared height model. Keep essential links usable at zoom.
- **Images:** reserve aspect ratio, meaningful alt where informative, empty alt for decoration, responsive sources for photographic cards, lazy loading below the fold. Preserve owned logos without cropping or distorting them.

## Component Architecture Issues

### Current structure and ownership

| Current area | Assessment |
|---|---|
| `src/pages/<slug>/page.tsx` | Understandable route grouping, but layouts, content arrays and rendering are often mixed. File names are acceptable; universal renaming adds little value. |
| `src/components/base` | A small useful foundation (`SectionHeading`, `BenefitCard`, skeletons), missing shared field/action state patterns. |
| `src/components/feature` | A large mixed directory containing layout, SEO, funding, conversion, content and campaign responsibilities. |
| `src/components/feature/RouteLanding` | Meaningful reusable sector/route building blocks. Repeated page composition remains. |
| `src/pages/home/components` | Several supposedly home-local components are reused elsewhere, e.g. `SectorPathways`. Their location no longer reflects ownership. |
| `src/pages/programme-template` | Good data-driven reuse for operational, strategic and chartered pathways. Keep it and format the dense JSX. |
| `src/pages/pathway-redesign/PathwayPage.tsx` | Empty, unreferenced file; not a second working template. Candidate for cleanup only. |
| `src/hooks` | `useCROTest` is a real hook. `useLeadScoring` exports pure functions/types, not a hook, and is unreferenced. |
| `src/services` | Useful resource boundaries but repeated base URL and request/error behavior across seven public services. |
| `src/dashboard` | Sensibly isolated conceptually, but eagerly imported; repeated editor fields and save/load routines. |
| `src/data` and page data files | Partial separation; programme facts, routes, article metadata and campaign claims remain duplicated. |
| `src/index.css`, `tailwind.config.ts` | Palette foundation exists; global stylesheet mixes tokens, animation utilities, old editorial aliases and patches. |
| `public/` and external assets | Good local hero, but oversized logos and query-based external imagery. Some source assets at repository root are not served assets. |
| Config | Vite aliases and proxy are useful. Auto-import globals are maintained separately in Vite, ESLint and generated declarations; comments/proxy constants preserve scaffolding that needs an ownership decision. |

### Recommended structure

Move files only as they are consolidated; this is not a mandate for a wholesale folder migration.

```text
src/
  app/                 # App, router, route metadata, public error boundary
  components/
    layout/            # PublicLayout, Navbar, Footer, PageSectionNav
    ui/                # Action styles, FormField, SectionHeading, AsyncState
  features/
    programmes/        # Shared pathway template, facts, comparison, sectors
    enquiries/         # Submission hook, field mapping, forms
    funding/           # Funding/eligibility/IPC access block, approved copy
    experts/           # Mentor and coach sections
    events/            # Shared event teaser and event cards
    articles/          # ArticleLayout, metadata, related articles
    recognition/       # Credentials and IPC presentation
  pages/               # Route composition and genuinely local sections
  dashboard/           # Lazy boundary; own layout/pages and editor components
  services/            # Small public request helper and typed resource APIs
  styles/              # tokens.css, base.css, components.css, motion.css
```

Do not create a generic section for every two-column layout, a universal card with dozens of booleans, or a full state-management layer for static content.

### Merge, extract and rename recommendations

| Existing source | Proposed change | Evidence / boundary |
|---|---|---|
| Feature `EventsSection`, home `EventsConsultation`, programmes `EventsSection` | Consolidate as `EventsTeaser` with copy and destination props. | Same two-panel event/consultation purpose and repeated observer logic. Keep API-backed event listings separate. |
| Home `ProgrammeCards` comparison and programmes `ProgrammeComparison` | Share programme comparison data and a small comparison view. | Both ask which programme fits responsibilities. Keep page-specific introductions local. |
| Four sector `page.tsx` files (329 lines each) | Extract `SectorRoutePage` composition with typed content. | Same component sequence and nearly identical API image-fetch flow. Include combined route only if its section contract matches. |
| Six campaign pages | Reuse the repeated campaign composition after fixing conversion. | Existing `PcpHero`, transformation, route-fit, benefits and FAQ parts already provide most building blocks. Preserve sector-specific copy. |
| Dashboard `TextField` / `Field`, repeated image and save rows | Extract `FormField`, `SaveStatus`, and a small media picker where actually repeated. | Concrete repeats in mentors, sectors, events and page editor. Resource schemas stay separate. |
| Public forms | Share submission state and accessible fields. | Do not revive every dormant form or force a giant configurable form. Keep the contact form and one needed campaign variant. |
| Five thank-you pages | `ConfirmationPage` presentation with verified action state. | Same shell and next-action cards; do not encode success merely from the URL. |
| `Testimonials.tsx` (784 lines) | Separate data from rendering; isolate a dialog/gallery and only the carousel behavior still needed. | Contains three content tabs, multiple carousel implementations, counters, lightbox and placeholder video. Decide evidence/removal first. |
| PMO `page.tsx` (636 lines), apprentices page (547) | Extract local sections around discrete responsibilities, then move static arrays to local data modules. | Keep unique visuals local; file length is an indicator, not a component-count target. |
| Dense PCP/APM/template JSX | Format and separate dense visual subcomponents from route composition. | Line counts understate complexity when a whole section occupies one line. |
| `RouteNavbar`, `PmoEditorialNavbar` | Keep as thin contextual adapters to `PageSectionNav`. | Already share the underlying implementation; they do not need a fresh navigation abstraction. |
| `hooks/useLeadScoring.ts` | If retained, `features/enquiries/leadScoring.ts`. | Pure helpers should not suggest hook lifecycle semantics. Remove only after confirming the abandoned integration. |
| `PmoTestimonials` | `PmoOutcomeExamples` if kept as illustrative content. | Name should match what is actually presented. |
| `PremiumMarquee` / `CompactHero` | Prefer `PartnerLogos` / `HomeHero` when touched. | Describe responsibility rather than an aesthetic promise. |
| `bg-editorial-yellow/mint/peach/lavender`, `btn-editorial-purple` | Semantic surface/action names. | Current values are mostly white, canvas, and petrol, not those named colors. |

Confirmed no inbound source imports: `CampaignLeadForm`, `CroUrgencyStrip`, `HomeFaq`, `RouteConsultationForm`, `RouteEligibilityForm`, `useLeadScoring`, `RegisterInterestForm`, `PmoEnquiryForm`, `ProgrammeIntroduction`, and the empty `pathway-redesign/PathwayPage.tsx`. These are cleanup candidates, not automatically safe deletions. The entry point `main.tsx` is naturally referenced by HTML rather than a source import.

### Frontend best practices

| Topic | Finding and improvement |
|---|---|
| Type safety | `strict`, null checks, implicit-any and unused checks are disabled. Enable them gradually by touched boundary, starting with API payloads, eligibility logic and dashboard mutations. Do not switch everything on without a migration plan. |
| Lint | `no-explicit-any` and unused-variable rules are disabled. Restore useful rules incrementally; add accessibility checks for labels, keyboard handlers and names. Keep the existing router-element rule. |
| Imports/dependencies | Prefer explicit imports as files are touched, reducing duplicated auto-import configuration. Stripe, Supabase, Firebase, Recharts and Lucide have no corresponding source usage identified; confirm before removal. Empty translation resources plus forced English make the i18n provider/detector questionable overhead. Unused packages are not automatically included in the production bundle. |
| Routing | Numerous internal `<a href>` links cause full document navigation; use router links for internal routes while retaining native anchors for files/external resources. Root-relative links/assets ignore the configurable non-root `BASE_PATH`. Decide whether non-root hosting is supported and test accordingly. |
| Performance | Lazy-load `DashboardApp` and its screens. Initial entry imports all dashboard pages. Optimize before raising the chunk warning threshold. Add a route-level budget and measure the actual page after changes. |
| Assets | Two navbar logo PNGs total about 1.38 MB and are both mounted. Local promotional PNGs are about 2.01 and 2.21 MB. Optimize without distorting branding; assess unused public images before removal. Source contains 57 query-based Readdy image URLs; migrate approved imagery to controlled assets. |
| Loading | Only eight literal `loading="lazy"` attributes occur among 53 source `<img>` elements; this is a triage metric, not proof every other image should be lazy. Keep hero priority; prioritize below-fold mentor/partner imagery and image dimensions. Remove the knowledge hub's artificial 800ms loading delay for static imported data. |
| Resource priority | `index.html` preloads the home hero on every route, even where another image is the hero. Scope preloads to actual route needs when introducing prerendered metadata. |
| Data layer | Share base URL, parsing/error handling and cancellation at a small request boundary. Validate unknown responses at critical boundaries. Cache repeated public collections only when reuse warrants it. |
| SEO ownership | Static HTML, per-page React metadata, `SeoManager`, `SchemaOrg` and `Breadcrumbs` overlap. `ArticleLayout` declares the site root canonical while the manager later rewrites metadata; dynamic mentor paths fail the literal `knownPaths` test and receive `noindex`. Own metadata in one route-aware path and handle parameterized routes explicitly. |
| SEO delivery | HTML initially contains home metadata for every SPA path. Render/prerender important public content and route-specific metadata where discovery/social previews matter; JS indexing is possible, so CSR alone is not evidence of being unindexable. Check real 404 response behavior and redirects. [Google's JavaScript SEO guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics). |
| SEO directives | Campaign and thank-you `noindex` intentions exist, but robots.txt disallows crawling those paths, preventing bots from seeing page-level directives. Coordinate crawl policy with indexing policy. Dashboard has no dedicated public metadata manager and should receive explicit non-indexable metadata from its own entry/response. Robots directives do not protect private data. |
| Structured data | `courseSchema()` supplies `@type: EducationalOccupationalProgram`, overwriting a caller's `Course` prop, and defaults to `P24M` while current PCP describes 27 months. Rename the helper or make its contract explicit; supply approved programme facts instead of generic defaults. |
| Content governance | April intake on PCP conflicts with May in campaigns. Programme names alternate between PCP/Certified PMO and institution labels. Centralize approved programme name, route relationship, duration, intake, learning-hours and recognition facts with review dates. The audit does not certify current funding or awarding-body rules. |
| Analytics | Thank-you events are pushed during render; re-renders and StrictMode can duplicate them. `data-gtm-*` attributes do not send events by themselves; `index.html` only initializes a dataLayer placeholder. Track actual submission success once; validate the eventual container, consent behavior and deduplication. |
| Newsletter | Footer saves “Newsletter subscription” as an enquiry; a mailing-list integration is not shown. Verify subscription delivery before claiming automatic email updates. |
| Dashboard safety | Local storage token presence controls the UI gate. Backend CMS uses an authenticated staff permission, so no authorization bypass is inferred. Review session expiry and logout with the backend; handle denied access clearly. Media and navigation deletion lack the confirmation already used in other editors. Add consistent confirmation or undo. |
| Admin usability | Add unsaved-change protection for longer editors, field-specific server errors, and row-specific accessible names for enquiry status controls. Media upload's hidden input/label should have a keyboard-operable trigger, alt-text editing and upload constraints. |
| Tests/CI | No active frontend test files or test script were found. The current build script does not run lint/type-check. Add CI gates and a small set of meaningful tests: eligibility branches, accepted/rejected submissions, critical route/anchor journeys, metadata and CMS publish behavior. Avoid tests that merely repeat static JSX. |

## Content and Section Review

The complete [page-and-section matrix](frontend-section-review-2026-09-09.md) gives retention, copy and visual recommendations. Shared components are reviewed once and their host pages are explicitly listed to avoid repeating identical advice.

The principal content issue is excessive repetition of “capability,” “confidence,” “workplace development,” and “professional progression” without consistently showing what the learner will do. Retain these ideas, but make each section answer a different question: Is it for me? What will I learn? What will I produce? What commitment is required? What is included? What does it cost? What can I do next?

### Proposed copy improvements

| Location | Current wording / issue | Proposed wording |
|---|---|---|
| Home introduction | Multiple paragraphs and micro-lines repeat programme/module/employer positioning. | “Develop practical skills in planning, cost, risk and PMO governance through structured programmes and specialist modules.” Keep the existing main headline if preferred. |
| Booking / primary navigation | “Book a Session” leads to no booking interface. | “Request a programme consultation” until scheduling is real. |
| Campaign form section | “Complete the form” but only a link exists. | “Tell us about your team's roles and development needs. An adviser will help you compare suitable options.” Pair with the working enquiry action. |
| PCP registration | “Save your place” implies a reserved seat. | “Register your interest in the next cohort.” Confirm interest, not admission. |
| PMO hero and closing hero | Same “A PMO roadmap for better decisions” headline repeated. | Keep it in the hero; close with “Discuss the PMO capability your team needs.” |
| Construction campaign | “Measurable improvements that directly reduce delay…” promises unmeasured results. | “Develop practical approaches to schedule control, progress reporting and change management.” Add a verified example when available. |
| Testimonials / scenario cards | First-person quotations and invented-person styling obscure illustrative intent. | “Example workplace application: identify schedule variance, explain its causes and propose a recovery action.” |
| Contact success | “Thank You” is nonspecific. | “Your enquiry has been received.” Add a response timeframe only after the service owner confirms it. |
| Guide confirmation | “has been sent to your email” is not established by the flow. | “Your guide request has been received” for accepted requests; offer a direct approved download if available. |
| Programme comparison | Repeats marketing features. | Compare role fit, level, duration, weekly commitment, delivery, example outputs and next action in consistent columns. |

Use one approved College name consistently and introduce “CPCM, a division of Kent Business College” where the relationship needs explanation. Use sentence case for actions and British English consistently. Label an illustrative schedule or dashboard as an example. Replace generic photography with relevant, approved teaching, workplace artefacts and people where those add evidence; no new imagery is required simply to fill space.

## Sections Recommended for Removal

Recommendations only. No sections have been removed. “Merge” means retain useful unique content in the destination section.

| Page | Section | Recommendation and reason | Expected impact |
|---|---|---|---|
| Home | Hero tertiary micro-line and repeated positioning copy | Remove one repetition of programmes/modules/employer support already explained directly above. | Faster comprehension; stronger primary CTA. |
| Home | `ProfessionalDirection` | Merge useful progression details into programme/pathway choice. Overlaps responsibility and progression explanations. | Shorter route to choosing a programme. |
| Home | `ExperienceDifferent` | Merge verified delivery/support distinctions into programme details or coaching. | Fewer generic benefit blocks. |
| Home | `ProfessionalOutcomes` adjacent to testimonials | Keep one outcome/evidence treatment after verifying testimonial content. | Less repeated reassurance; clearer proof. |
| Home | Placeholder “Watch Video” action/modal | Remove the action until an actual approved video is available. | Eliminates a dead-end interaction. |
| Home | Simulated masterclass photo gallery and numerical example case studies | Withhold or replace with clearly labelled scenarios until assets/claims are verified. | More credible social proof. |
| Programmes | `WhyCollege` | Merge unique points into programme features or employer support; generic benefits repeat elsewhere. | Comparison becomes the page's dominant task. |
| Programmes | `ProfessionalOutcomes` | Consider moving the useful example to the comparison/detail pages. | Shorter programme-selection page. |
| Operational/strategic/chartered | Credits cards plus repeated credit detail | Keep overview titles and detailed disclosures, eliminate duplicated capability/output prose across both. | Less reading without losing curriculum detail. |
| Operational/strategic/chartered | Connected-thinking strip + evidence-to-action strip + learning cycle | Merge overlapping sequence copy; preserve any route-specific decision example. | Reduces diagram repetition. |
| Four sector routes and combined route | Standalone booking-button section after `RouteFinalCta` | Remove once the final CTA works; it adds no new decision support. | Fewer competing actions. |
| Six campaigns | Pain points + before/after + outcome benefits | Reduce overlapping claims to a short problem statement and one concrete before/after example. Retain route fit. | More focused campaign journey. |
| PMO | `PmoClosingHero` full repeated hero | Replace with a compact next-step CTA. | Less repeated headline and visual weight. |
| `/testimonials` | Large publishing-standard block | Move operational policy to editorial guidance; retain a short public evidence note where useful. | More space for actual evidence rather than internal process. |
| `/articles` and `/knowledge-hub` | Two comparable article-discovery destinations | Choose one primary hub and retain filter functionality; redirect only after reviewing route value and traffic. | Less navigation ambiguity. |
| Legal, booking, agreement, thank-you pages | 90vh decorative hero treatment | Remove the excessive height/effects, not the heading or essential information. | Task content is reachable sooner. |
| Sitewide | Animated funding ticker | Consider a static, concise funding notice if it adds value; eliminate repeated promotional rotation. | Better readability and less persistent distraction. |

Do not remove eligibility explanations, workload, employer commitments, funding conditions, award limitations, error messages, useful FAQs or verified evidence merely to shorten pages. Preserve the intended funding → eligibility → IPC grouping.

## Improvement Priority Plan

| Priority | Work packages, in order | Acceptance gate |
|---|---|---|
| **Priority 1: Critical fixes** | Repair booking/enquiry journey and missing catalogue; fix stale anchors; correct form/confirmation claims; verify proof content; define CMS ownership; fix contact labels, mobile navigation/dashboard access, modal focus and critical loading failures. | Primary journeys work against test services; every visible action has a real outcome; blocked requests recover; keyboard/phone access works; claims have an evidence owner. |
| **Priority 2: Architecture and consistency** | Establish semantic tokens/action variants; remove broad overrides after migration; centralize programme facts and metadata; consolidate event teasers/fields/sector composition; lazy-load admin; progressively strengthen lint/types. | Representative home, programme, article, form and admin screen use the same tokens; no old selector depends on utility substrings; supported CMS edits reach correct pages; CI build/lint/type-check pass. |
| **Priority 3: Visual and content improvements** | Apply reviewed section reductions; replace repetitive prose with outputs/examples; compact utility heroes; optimize images/logos; improve card density, article authorship, event specifics and evidence presentation. | Review at 320/375/768/1024/1440px and zoom; compare before/after screenshots; no information loss; no false booking or recognition implication. |
| **Priority 4: Future improvements** | Consider prerendering important public routes, measured performance budgets, analytics experiments after instrumentation is reliable, structured CMS previews, search/filter expansion, and translation only with an actual language requirement. | Decisions use observed demand and performance data; no speculative platform rewrite or unused abstractions. |

Suggested first implementation slice: repair one complete home → programme → enquiry journey, including its catalogue and success/error behavior, then apply the established pattern to the remaining pages. Next migrate the shared action and field styles and verify the mobile shell. This creates an observable improvement before broad refactoring.

### Verification still required before production sign-off

- Render representative pages and every public route at desktop/mobile widths; validate all real DOM anchors, aliases, active navigation and focus order.
- Exercise keyboard-only contact, menus, checker, FAQs and dialogs; check screen-reader names, announcements, image alternatives, reduced motion, and computed contrast including overlays.
- Test 400/401/403/404/500, offline/timeout and empty API responses; avoid live leads and real external registrations.
- Confirm authoritative programme facts, funding review dates, recognition wording, testimonial permissions, publication rights and real event/catalogue destinations with the relevant content owner. This report identifies inconsistencies; it does not validate legal/funding accuracy.
- Inspect initial and rendered metadata, canonical links, structured-data entities, indexability, real HTTP 404 behavior, and production deep-link support.
- Measure LCP, CLS and INP plus asset transfer sizes after the functional fixes. Do not infer these metrics from a successful build.
