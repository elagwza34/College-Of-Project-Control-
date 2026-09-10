# CRO Testing Framework & Optimisation Guide
## College of Project Controls — Phase 8

---

## A/B Testing Framework

The site uses a lightweight A/B testing hook (`src/hooks/useCROTest.ts`) that:
- Randomly assigns a variant on first visit
- Persists the assignment in localStorage
- Pushes `cro_test_assigned` events to GA4 dataLayer
- Exposes variant data via `data-cro-variant` attributes on section elements

### Active A/B Tests

| Test ID | Location | Variants | What Changes |
|---|---|---|---|
| `pcp-master-hero` | PCP Master Hero | a, b, c, d | Headline, subheadline, badges, CTA order + labels |
| `route-selector-heading` | Route Selector | a, b, c | Title and subtitle copy |
| `sticky-cta` | Sticky CTA Bar | a, b, c | Primary/secondary/tertiary CTA labels |
| `urgency-message` | Urgency Strip | a, b, c | Urgency wording and detail line |
| `sector-construction-copy` | Construction Card | original, test | Pain point copy |
| `sector-engineering-copy` | Engineering Card | original, test | Pain point copy |
| `sector-public-copy` | Public Sector Card | original, test | Pain point copy |
| `sector-energy-copy` | Energy Card | original, test | Pain point copy |

---

## GA4 / GTM Conversion Dashboard Structure

### Dashboard Sections

1. **Traffic Source Performance** — Channel grouping, campaign, source/medium conversion rate
2. **Landing Page Conversion Rate** — By page path, sessions with conversion events
3. **Hero CTA Click Rate** — `eligibility_check_click`, `find_best_route_click`, `book_consultation_click` by variant
4. **Route Selector Click Rate** — `route_selected_strategic`, `route_selected_operational`, `route_selected_hybrid`, `route_selected_pmo`
5. **Sector Card Click Rate** — `sector_selected_construction`, `sector_selected_engineering`, `sector_selected_public_sector`, `sector_selected_energy`
6. **Eligibility Form Completion Rate** — Form starts, step-1-to-step-2 progression, completions
7. **Consultation Booking Click Rate** — `book_consultation_click` by location (hero, sticky, section)
8. **Eventbrite Click Rate** — `eventbrite_click` across all pages
9. **Commercial Route Enquiry Rate** — `commercial_route_click` + commercial form submissions
10. **Guide Download Rate** — `guide_download_submit` by traffic source
11. **Thank-You Page Next-Action Rate** — Thank-you page CTA clicks
12. **High-Intent Lead Rate** — `generate_lead` events by lead type

### Success Metrics

**Primary Conversion (Macro):**
- `lead_form_submit` — Any form submission
- `generate_lead` — Qualified lead captured
- `book_consultation_click` — Consultation booking intent

**Secondary Conversion (Micro):**
- `eligibility_check_click` — Funding/eligibility interest
- `route_selected_strategic` — Strategic route interest
- `route_selected_operational` — Operational route interest
- `route_selected_hybrid` — Combined route interest
- `route_selected_pmo` — PMO route interest
- `sector_selected_construction` — Construction sector interest
- `sector_selected_engineering` — Engineering sector interest
- `sector_selected_public_sector` — Public sector interest
- `sector_selected_energy` — Energy sector interest
- `commercial_route_click` — Commercial route interest
- `eventbrite_click` — Event booking intent
- `guide_download_submit` — Guide download

---

## Heatmap & Scroll Tracking

The site pushes scroll depth events to GA4 dataLayer:
- `scroll_depth_25` — 25% scrolled
- `scroll_depth_50` — 50% scrolled
- `scroll_depth_75` — 75% scrolled
- `scroll_depth_90` — 90% scrolled

### Recommended Heatmap Elements to Track (via GA4 / Hotjar / MS Clarity)

1. Hero CTA clicks (primary vs secondary vs tertiary)
2. Scroll depth to route selector section
3. Clicks on individual route cards
4. Clicks on sector cards
5. Clicks within the funding section
6. Clicks on APM ChPP readiness section
7. Clicks on commercial route CTA
8. Lead form field starts (form interaction tracking)
9. Lead form completions
10. Drop-off fields in multi-step forms
11. Sticky CTA bar clicks (desktop + mobile)
12. Navbar PCP dropdown clicks
13. Navbar Audiences dropdown clicks
14. Thank-you page CTA clicks
15. Guide download button clicks

---

## Monthly Optimisation Cycle

### Week 1: Review
- Review GA4 traffic sources, CTA clicks and conversion rates
- Compare variant performance across active A/B tests
- Identify top-performing and under-performing pages

### Week 2: Analyse
- Review heatmaps, scroll depth and form drop-off patterns
- Identify friction points in forms and navigation
- Review session recordings for usability issues

### Week 3: Test
- Launch one new A/B test (hero, CTA, route selector or form layout)
- Update variant copy based on Week 2 insights
- Deploy and monitor

### Week 4: Apply
- Review test winner with statistical confidence
- Apply winning variant as new default
- Remove under-performing variant code
- Prepare next test hypothesis

---

## CRO Page Annotations

### PCP Master Landing Page
- [x] Most important CTA above the fold (eligibility check)
- [x] Funding proof visible in the first screen (badges row)
- [x] Route selector near the top (after comparison table)
- [x] Sticky CTA on desktop and mobile
- [x] Hero badges limited to 3 (not overloading hero)
- [x] Shorter first-step eligibility form (5 fields)
- [x] CTA repeated after objection-killer FAQ
- [x] CTA repeated after comparison section
- [x] Sector-specific proof before form section
- [x] Microcopy near forms: "Not sure which route fits? We will help you choose."

### Campaign Landing Pages
- [x] Shorter form fields (name, email, phone, with role-specific extras)
- [x] Primary CTA above fold
- [x] Urgency strip immediately below hero
- [x] Pain points before transformation (build problem awareness first)
- [x] FAQ after CTA (handle objections after interest is captured)

### Knowledge Hub Articles
- [x] Article CTA block after main content (before FAQ)
- [x] Related articles at bottom (keep users on-site)
- [x] Sticky CTA for high-intent actions

### Route & Sector Pages
- [x] Funding strip immediately after hero
- [x] Pain points before outcomes (problem-first structure)
- [x] Eligibility form before consultation form
- [x] Sector-specific testimonial for social proof

---

## Form Optimisation Summary

### Eligibility Form (PcpEligibilityForm)
- **Step 1 (low friction):** Name, Email, Employer, Job Title, Learner Count
- **Step 2 (qualification):** England-based, Levy-payer, Preferred Route, Message
- **Why:** Reduces initial friction. Users commit to step 1 before seeing qualification fields.

### Consultation Form (PcpConsultationForm)
- **Fields:** Name, Email, Phone, Learner/Employer, Preferred Route, Preferred Meeting Time, Message
- **Why:** Meeting time preference improves lead quality. Simplified from original programme selector.

### Commercial Route Form (PcpCommercialForm)
- **Fields:** Name, Email, Phone, Current Role, Employment Status, Bursary Interest, Payment Option, Message
- **Why:** Focus on affordability and fit. Bursary and payment options front-and-centre.

### Campaign Lead Form (CampaignLeadForm)
- **Flexible:** Configurable field set per campaign audience
- **Shorter for cold traffic:** Name, Email, Employer, Role on HR/employer pages
- **Qualification fields only on high-intent pages**

---

## CRO Copy Rules

### Stronger Section Headlines (Applied)
- "Not Just a Qualification. A Capability Route Built Around Real Projects."
- "The Funding May Be Eligible. The Value Must Be Obvious."
- "Build the Capability Your Projects Cannot Afford to Be Without."
- "Project Controls Is Not Admin. It Is Decision Confidence."
- "Your Route Should Match Your Role, Sector and Ambition."

### Microcopy Near Forms (Applied)
- "Not sure which route fits? We will help you choose."
- "Funding depends on eligibility, role suitability and availability."
- "ChPP readiness support is included where applicable, but Chartered status is not guaranteed."
- "Commercial options are available if apprenticeship funding is not suitable."
- "Your enquiry helps us assess your route, funding position and next best step."

### Compliance Language (Consistent Across All Pages)
- "Fully Funded Where Eligible."
- "fully funded options available for eligible employers in England."
- Never: "free for everyone."
- "funding and support are subject to employer eligibility, learner suitability, funding rules and availability."
- "APM ChPP readiness support." (never imply ChPP is automatically awarded)
- "KBC added-value support" (never imply Kent Business College is the government funder)

---

## Conversion Tracking QA Checklist

- [x] Every CTA has a `data-gtm-event` attribute
- [x] Every form has a `data-gtm-form` attribute
- [x] Every form submission triggers `lead_form_submit` and `generate_lead`
- [x] Every thank-you page has `thank_you_page_view` in dataLayer
- [x] Every route card has a route selection event
- [x] Every sector card has a sector selection event
- [x] External booking links have `eventbrite_click`
- [x] Every consultation button has `book_consultation_click`
- [x] All lead forms trigger `generate_lead` with lead_type
- [x] A/B test variants push `cro_test_assigned` to dataLayer
- [x] Scroll depth events fire at 25%, 50%, 75%, 90%
- [x] All CTA locations carry `data-gtm-location` for attribution
- [x] All A/B variant sections carry `data-cro-variant` attributes