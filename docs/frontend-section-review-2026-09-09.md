# Page and Section Review

Companion to the [frontend audit](frontend-audit-2026-09-09.md), 9 September 2026. This is a source-based UX/content review, with local hero-asset inspection. It does not claim rendered browser, live CMS-content, or external embed validation. Recommendations are not implemented.

“Keep” means retain the section's purpose, not accept every current claim or interaction. Shared sections are assessed once below and apply to every listed host. Aliases use the same page component and inherit its findings. Headings generated from data and repeated card items are treated as one section pattern with route-specific content, not separate unique sections.

## Shared shell and recurring sections

| Section / hosts | Content and journey assessment | Visual / interaction recommendation |
|---|---|---|
| FundingTicker — all public routes | Funding and progression messages compete with page tasks; a 15-minute consultation message leads into an unfinished booking flow. | Consider a static notice; otherwise add pause and reduced-motion support. Do not use a universal funding claim on every programme without context. |
| Navbar — all public routes | Route groups are useful but “Explore” contains most of the site's navigation. “Certified PMO” versus pathway naming needs a single product taxonomy. | Keep desktop grouping; bound mobile height and scrolling, add Escape behavior. White unscrolled links/logo need a light-page variant for mentor pages/loading states. Avoid doubled horizontal gutters. |
| PageSectionNav / route adapters — programme, pathway, sector, PMO, employer pages | Useful on long pages; broken consultation destinations undermine it. | Use actual section IDs, meaningful current-section state, scroll affordance and a shared offset calculation. Don't create new navigation implementations. |
| Footer — public pages that mount it | Useful navigation/contact/legal links; employer process anchor is stale. Newsletter delivery is not demonstrated by an enquiry-only submission. | Preserve link groups, label success accurately, verify provider integration; make newsletter optional for utility/confirmation layouts if it distracts. |
| SectionHeading — shared pages | Useful existing heading structure; text can become long and generic. | Add only needed alignment support; use shared type scale instead of ad hoc copies. Keep heading level semantic. |
| ProgrammeAccessSections — home, PCP, APM, three core pathways, PMO | Funding → eligibility → IPC is an intentional unit. Keep conditions and learner next steps. Generic PCP assumptions must not leak into APM or commercial context. | Preserve adjacency; allow approved programme-specific data. Ensure three full sections do not repeat the same CTA and benefit list. |
| FundingOptionsSection via PcpFundingStrip | Funding options, package inclusion and CTA are decision-critical. Funding and included support need distinct explanations. | One comparison of options, one inclusion list where needed, one next action; strong text contrast and programme-specific facts. |
| EligibilityCheckerSection | Keep the self-check explanation and link. State it gives an initial indication rather than approval. | Short intro and one action; no need for another large benefit grid. |
| IpcAuthority | Useful explanation of institutional support; distinguish CPCM delivery from IPC support and independent awards. | Retain scoped gold/black identity; keep genuine logos, legible labels and concrete links. |
| MeetMentors — home, programmes, PCP/APM, core pathways, PMO | Names, roles and expertise can supply real evidence when CMS records are approved. Silent API failure currently removes content. | Prefer readable static cards or a controlled carousel; below-fold image optimization, visible error fallback, accessible duplicate handling if marquee retained. |
| CoachingSupport — home, PCP/APM, core pathways | Distinct support function worth keeping. Clarify what coaching covers and when it happens. | Use actual coach records and role labels; avoid duplicating the mentor biography presentation or hiding service failure. |
| ProfessionalRecognitionSection — home and programmes | Keep award/membership context and conditions; approval to display credentials is required by content governance. | Group by awarding body and type of support, not a wall of unexplained certificate imagery. |
| ProfessionalOutcomes — home, programmes, testimonials | Meaningful goals, but overlaps other capability/benefit sections. | Merge where adjacent to similar content; show one workplace artefact or concrete example rather than another generic icon grid. |
| EventsSection / EventsConsultation — home, programmes, sector, campaign and PMO pages | Event invitation and adviser conversation are separate actions. No actual date is provided by generic teaser content. | Consolidate duplicate implementations; use “View events” for the listing and accurate enquiry copy for the adviser action. |
| PcpFaqSection / RouteFaq / native FAQ variants | Retain answers that resolve real objections. Repeated funding/recognition answers need centrally approved facts. | Consolidate interaction behavior where useful; keep native disclosure versions simple and keyboard accessible. |
| PcpComplianceNote / inline qualification notes | Keep meaningful eligibility and award conditions close to their claims. | Legible body/caption token; do not bury material conditions in faint microtext. |
| StickyCta — sectors, combined route, campaigns, hub, articles | All variants assume host-local anchors; several are absent. “Secure Your Funded Place” is stronger than an initial check. | Use context-specific valid destinations, preferably one primary mobile action; reserve bottom space and remove hidden controls from keyboard navigation. |

## Home — `/`

Source: [home composition](../frontend/src/pages/home/page.tsx), [home components](../frontend/src/pages/home/components/CompactHero.tsx).

| Section | Assessment and copy recommendation | Visual / disposition |
|---|---|---|
| CompactHero | Existing headline is understandable. Intro, supporting copy, micro-line and trust statements repeat scope. Fix catalogue action. | Preserve right-positioned professional and space for text. The inspected asset has purple lighting; evaluate the petrol overlay in-browser before deciding on image treatment. Use fluid type and fewer lines. |
| PremiumMarquee | Partner recognition is useful only when relationships/permissions are clear. API empty/error states should differ. | Keep authentic logos without implying unspecified endorsement; static strip is simpler than continuous movement. |
| ProgrammeCards | Core decision section. Programme summaries and embedded comparison should use the same approved facts as `/programmes`. | Keep; prioritize role fit, programme level, commitment and next action over decorative card detail. |
| SpecialistModules | Distinguishes focused study from full programmes. Add concrete capability examples and a clear availability/enquiry destination. | Keep as a concise module selection, not a second programme catalogue. |
| ProfessionalDirection | Progression copy overlaps pathway selection and programme fit. | Merge unique progression information into those sections; avoid an extra sequence graphic. |
| ProfessionalPathwaysSection | Explains operational, strategic and chartered choices and tailored options. | Keep concise role/outcome comparison; make clear these are PCP pathways rather than three unrelated qualifications. |
| SectorPathways | Relevant sector context and direct route destinations. | Keep, with relevant images and real route labels; external image failure needs a dependable fallback. |
| ExperienceDifferent | Broad “complete experience” benefit claims overlap support sections. | Merge unique details into mentors/coaching or programme inclusion. |
| Funding block | See shared access review. | Keep grouped and contextual. |
| ForEmployers | Distinct employer audience merits its own entry. | Keep compact; lead with roles/team needs and employer responsibilities. Use owned, relevant team imagery. |
| MeetMentors + CoachingSupport | See shared review; teaching and coaching are distinct responsibilities. | Keep distinction, reduce repeated bios and marquee movement. |
| EventsConsultation | Helpful bridge to meeting the team. | Consolidate with shared event teaser and fix consultation destination. |
| ProfessionalOutcomes | Repeats capability and testimonial material near the end. | Merge into one outcome/evidence region. |
| Testimonials — learner tab | Illustrative label exists, but names, portraits, stars and quotes resemble authenticated testimonials. | Verify or restyle as anonymous scenarios. No placeholder videos. |
| Testimonials — employer case studies | Detailed numerical results require source, time period and permission. | Keep only approved evidence, otherwise use clearly hypothetical examples without precise performance claims. |
| Testimonials — masterclass photos | Query-driven images with real venue captions risk looking like documentary event photographs. | Use approved real event photography or clearly labelled illustrations; make gallery triggers buttons. |
| Recognition + footer | See shared review. | Keep compact; do not repeat the full recognition/funding argument. |

## Programme index — `/programmes`

Source: [programmes composition](../frontend/src/pages/programmes/page.tsx).

| Section | Assessment / improvement | Visual / disposition |
|---|---|---|
| ProgrammesHero | Role-based positioning supports selection. | Shorten hero and move comparison nearer the start. |
| ProgrammeFeatures | Long PCP/APM/PMO descriptions partly reproduce destination pages. | Keep short programme summaries with identical fields and clear route links. |
| ProgrammeComparison | Highest decision value. | Keep and share data with home; provide mobile stacked presentation or a bounded accessible table. |
| ProgrammeVsModule | Explains breadth versus focused development; important distinction. | Keep concise two-option comparison. |
| HowToChoose | Responsibilities → fit → discussion is useful. | Keep brief; avoid repeating programme descriptions. |
| WhyCollege | “More than professional training” is generic beside the detailed features. | Merge specific differences; recommend removing standalone section. |
| EmployerSection | Useful dedicated team route. | Keep concise CTA panel. |
| Recognition, mentors, events | See shared review. | Keep only enough proof/support for selection; details belong on programme pages. |
| ProfessionalOutcomes | Repeated broad benefits. | Consider removing standalone block; preserve useful example within programme summary. |
| ProgrammesFaq | Resolve programme-versus-module, eligibility and choosing questions. | Keep factual, short and keyboard accessible. |

## PCP Level 6 — `/project-controls-professional-level-6` and `/pcp-master`

Source: [PCP page](../frontend/src/pages/pcp-master/page.tsx), [programme data](../frontend/src/pages/pcp-master/programmeData.ts).

| Section | Assessment / recommended content | Visual / disposition |
|---|---|---|
| Hero / professional disciplines / catalogue | Clear programme identity; qualify funding in the same reading flow. “Save your place” does not currently reserve anything. | Retain identity; compact secondary discipline tags and keep one leading action. |
| Course at a glance / cohort windows / tailored route / Level 7 note | Important specifics, but cohort months conflict with campaign copy. Distinguish included access from an additional award. | Keep one facts strip and approved cohort list; remove unverified availability emphasis. |
| Register interest | Says admissions will review but sends users to unfinished booking. | Replace with a real interest request or accurate enquiry link. |
| Overview + recognition condition | Goals are meaningful but abstract. | Keep a short overview with one output example; keep recognition condition visible. |
| Audience | Real responsibilities are better criteria than job titles alone. | Keep grouped roles, shorten lists and link to a fit discussion. |
| Structure + Level 7 access | Essential duration/credit distinction. | Keep three-phase timeline; clearly separate Level 7 support from the six Level 6 credits. |
| Pathways | See home/shared pathway review. | Keep; default `#pathways` is valid. |
| Sectors | Relevant options. | Keep compact; avoid repeating all sector-route benefits. |
| Cohort orientation | Tailoring examples overlap the sector list. | Merge examples into sector cards unless teaching differences are material. |
| Workplace outputs | One of the strongest sections: tells users what they will produce. | Keep and emphasize sample schedule, forecast, risk log or decision brief. Label examples. |
| Delivery / learning cycle / assessment / employer involvement | Essential expectation-setting. | Keep, but group around what learners and employers do rather than multiple similarly styled grids. |
| Workload / monthly submissions / coaching reviews | Essential planning information. Learning-hours claims need approved programme data. | Keep prominent; use a compact weekly/monthly schedule, not tiny labels. |
| Teachers / coaching | See shared review. | Keep evidence and clear support roles. |
| Benefits / wider support | Some items duplicate coaching and recognition. | Retain concrete inclusions, remove repeated general outcomes. |
| Funding/access/IPC | See shared review. | Keep adjacent and context-specific. |
| Employer partnerships | Relationship claims need approved evidence; generic reassurance adds little. | Use verifiable partner context or merge into employer support. |
| Events | Static event descriptions can drift from CMS event listing. | Use one authoritative event source/destination. |
| Final next-step CTA | Useful after detailed content. | Keep one working interest/enquiry action. |
| FAQ | Useful objections and summary. | Keep, drawing facts from approved data; avoid another full benefit list. |

## Core pathways — operational, strategic, chartered

Routes: `/project-controls-professional/operational-route`, `/strategic-route`, `/chartered-pmo-pathway` under the same prefix, plus their short aliases. Source: [shared template](../frontend/src/pages/programme-template/PathwayPage.tsx), [variant data](../frontend/src/pages/programme-template/pathwayData.ts).

| Shared section | Assessment / improvement |
|---|---|
| Hero and route-specific graphic | Keep distinct purpose: operational controls dashboard, strategic decision layers, chartered evidence record. Label numbers and progress indicators as illustrative. Increase 9–11px labels and prevent global hero rules from overriding internal layout. |
| Programme facts strip | Keep programme level, duration and delivery facts; define what “credits” means. Avoid promising external professional status. |
| Audience / role groups | Keep role-focused selection. Operational: planning/cost/risk work; strategic: governance/programme/portfolio decisions; chartered: eligibility/evidence requirements. |
| Access/funding/IPC | Keep intentional grouping; use the same approved programme facts. |
| Process / overview | Keep only the steps needed to understand this pathway, not another generic learner lifecycle. |
| Credit overview | Keep titles, durations and capability summary. |
| Credit detail disclosures | Keep unique workplace output and awarding-body context; do not repeat all overview prose. |
| Capabilities | Keep route-specific outcomes; merge repeated credit explanations. |
| Connected thinking / system example | Keep if it illustrates a real relationship rather than repeated labels. Operational: forecast-to-action; strategic: project-to-portfolio; chartered: knowledge/evidence/assessment boundaries. |
| Workplace outputs + evidence quality | Keep strongly; use concrete artefacts and explain acceptable evidence. |
| Evidence-to-action / decision pillars | Overlaps system example and learning cycle. Merge unique decision logic into the most useful diagram. |
| Learning experience | Keep a compact shared cycle; no need for repeated full sections across several nearby blocks. |
| Mentors / coaching | See shared review. |
| Employer benefits | Keep specific responsibilities and outcomes; link to employer page for full detail. |
| Professional recognition | Keep independent-award limitations, especially chartered completion versus ChPP. Do not imply the College confers external status. |
| Programme essentials | Useful facts, but much repeats facts/learning/employer sections. Consolidate into a single programme summary rather than duplicating all explanations. |
| FAQ | Keep distinct pathway-fit and recognition questions. |
| Final CTA | Keep one working consultation request plus compare-pathways link. |

## APM Level 4 — `/associate-project-manager-level-4`

Source: [APM page](../frontend/src/pages/apm-level-4/page.tsx), [data](../frontend/src/pages/apm-level-4/programmeData.ts).

| Section | Content and visual recommendation |
|---|---|
| Hero / HeroVisual / facts / cohort intake | Keep explicit Level 4 identity; the diagram should demonstrate project-management work. Reconcile intake facts and avoid oversized fixed type. |
| Programme overview | Explain the practical role benefit in one paragraph; reduce generic “confidence” repetition. |
| Core capabilities | Keep planning, communication and delivery examples; use consistent card structure. |
| Programme structure: PMP preparation + AI | Clarify preparation versus external certification, inclusion, assessment and sequence. A compact two-phase timeline is sufficient. |
| Curriculum groups | Keep disclosure-based detail; show a workplace task per group. |
| Workplace outputs | Keep as principal evidence of learning; actual examples add more than decorative badges. |
| Audience / job-title note | Keep; the “you do not need Project Manager in your title” clarification helps self-selection. |
| Delivery / workload | Keep actual time commitment and learning-hours conditions in the same section; verify numbers with the owner. |
| Teachers / coaching | See shared review. |
| Employer development | Keep learner support responsibilities and progress-review expectations. |
| Funding/access/IPC | Ensure the shared block is correct for Level 4, not inherited PCP funding assumptions. |
| Beyond the apprenticeship / wider package | Distinguish progression support from promised awards; merge overlaps with recognition/support. |
| Programme essentials / FAQ | Keep useful operational questions; consolidate repeated delivery statements. |
| Final CTA | Direct to working programme-specific enquiry. |

## Four sector routes and strategic-operational combined route

Sources: [construction](../frontend/src/pages/operational-pcp-construction/page.tsx), [engineering/manufacturing/aerospace](../frontend/src/pages/operational-pcp-engineering/page.tsx), [public sector/councils](../frontend/src/pages/operational-pcp-public-sector/page.tsx), [energy/utilities](../frontend/src/pages/operational-pcp-energy/page.tsx), [combined route](../frontend/src/pages/strategic-operational-pcp/page.tsx). Canonical paths and aliases share these compositions.

| Section, on each page | Assessment / improvement |
|---|---|
| SectorHero / RouteHero | Preserve sector relevance; fix missing `#consultation` and `#eligibility` actions. Use meaningful imagery and avoid loading both an unnecessary CSS background and equivalent image. |
| RouteNavbar | Keep adapter; ensure every advertised section exists. |
| RouteCapability | Short introduction to distinctive capability; avoid repeating later development cards. |
| RouteProblems | Keep a concise statement of the sector's challenges; remove fear-based claims without evidence. |
| RouteProcess | Keep concrete learning/application steps; merge if it repeats generic programme process. |
| RouteStats | Treat values as programme facts, not unexplained success metrics. Use approved data and labels. |
| RouteChoose | Useful funded/commercial choice; correct broken eligibility links and make differences explicit. |
| RouteWhoFor | Keep real roles and responsibilities; shorten overlapping job lists. |
| RouteDevelop | Core curriculum value; use sector-specific examples, consistent cards and mobile stacking. |
| RouteTestimonials / case study | Existing illustrative disclaimer must be reflected in visual language. Remove simulated stars/names and `#` case-study actions after review. |
| EventsSection | See shared review; valid consultation destination needed. |
| RouteFinalCta | Keep one working next action. |
| Standalone Book a Session region | Duplicates final CTA and leads to placeholder; recommend removing once final action is repaired. |
| RouteFaq / qualification note | Keep material conditions and genuine questions; use approved shared facts. |
| StickyCta / footer | Fix contextual destinations and bottom overlap; shared review applies. |

Route-specific content/visual improvements:

| Route | Preserve and strengthen |
|---|---|
| Construction | NEC change, subcontractor interfaces and progress measurement. Show an illustrative change-to-schedule-impact example; do not claim measured delay reduction without evidence. |
| Engineering/manufacturing/aerospace | Supplier interfaces, integrated schedules and regulated programme reporting. Show a milestone/interface artefact; distinguish training capability from regulatory compliance assurance. |
| Public sector/councils | Audit evidence, value, governance and public programme reporting. Show an example decision brief rather than generic government-building imagery alone. |
| Energy/utilities | Outages, commissioning, contractor coordination and forecast assurance. Show a baseline/risk/commissioning relationship diagram with legible labels. |
| Strategic-operational | Explain why one role needs both levels of decision-making. Reconcile this combined offer with the newer three-standard-pathway taxonomy and clarify any Level 7 inclusion. |

## PMO — `/project-controls-professional/pmo-governance-route` and `/pmo-pcp`

Source: [PMO composition](../frontend/src/pages/pmo-pcp/page.tsx).

| Section | Assessment / recommendation |
|---|---|
| PmoEditorialHero | Keep distinctive decision-support message and editorial style within the same tokens. |
| Editorial section nav | Fix consultation target; retain shared implementation. |
| Direction / discover route introduction | Repeats hero purpose; merge into a concise four-capability introduction. |
| PmoTestimonials | Outcome examples are useful but first-person quotation treatment suggests evidence. Rename/restyle as scenarios; a three-card static row may replace carousel complexity. |
| Events | Keep concise, valid destinations. |
| Four capabilities / “stop asking PMOs only for reports” | Useful message, repeated elsewhere. Use each card to name a specific decision/output rather than more positioning. |
| PmoJourney | Keep four-stage learning map; align illustration type, borders and typography with shared rules. |
| Mentors | Keep approved expertise; shared review applies. |
| Apprenticeship/funding/IPC | Keep funding choices and conditions; verify terminology and duration. |
| APM recognition / readiness / status note | Keep all material distinctions, reduce repeated reassurance. Explain what the provider supports and what APM independently decides. |
| Employer capability | Keep team responsibilities and one concrete PMO application. |
| Workplace-development journey | Overlaps PmoJourney; merge operational support details into that sequence. |
| PMO insights | Useful relevant articles; avoid showing generic links merely to fill a grid. |
| Commercial teaser | Explain direct-paid option without characterizing apprenticeship requirements simply as unwanted paperwork. Confirm payment and inclusion terms. |
| FAQ | Keep fit/funding/award questions. |
| PmoClosingHero | Repeats the opening headline and large visual. Replace with compact “Discuss the PMO capability your team needs” CTA. |
| Fixed lower CTA / footer | Keep at most one main mobile action with valid destination and sufficient page clearance. |

## Six campaign pages

Sources: [HR/employer](../frontend/src/pages/campaign/hr-employer/page.tsx), [head of PMO](../frontend/src/pages/campaign/head-of-pmo/page.tsx), [construction](../frontend/src/pages/campaign/construction/page.tsx), [energy](../frontend/src/pages/campaign/energy/page.tsx), [public sector](../frontend/src/pages/campaign/public-sector/page.tsx), [commercial](../frontend/src/pages/campaign/commercial-route/page.tsx). The commercial component also serves `/commercial-project-controls-route`.

| Shared section | Assessment / improvement |
|---|---|
| PcpHero + badges | Keep one audience-specific proposition and one accurate action. Reconcile May/April intakes and all financial/support claims. Reduce badge overload. |
| PcpFundingStrip | Useful for funded variants; distinguish the commercial pathway's actual payment options and avoid implying apprenticeship entitlement. |
| Pain points (funded campaign variants) | Up to many overlapping problems precede the solution. Reduce to three specific challenges. |
| CampaignTransformation | Keep one practical before/after example; avoid promising measured improvement from hypothetical training. |
| CampaignRouteFit | Keep audience-specific choices; use canonical routes and consistent programme names. |
| CapabilityTracks | Useful curriculum content but often too extensive for a focused campaign. Keep a short relevant subset or link to the full programme. |
| Benefits grid | Duplicates transformation and capability claims. Merge unique benefits into those sections. |
| Recognition support / IPC (where mounted) | Keep actual support and limits; use approved status wording and appropriate sub-brand styling. |
| Quotation / proof (where mounted) | Verify named/quantified claims; otherwise use a clearly labelled scenario without rating stars. |
| Events | Secondary optional action; should not compete with the campaign's main response. |
| Lead-form section | Text advertises a form, but only a booking link is rendered. Highest-priority content/functional repair across all six. |
| FAQ / compliance | Keep audience objections and conditions; remove duplicate marketing answers. |
| Sticky CTA / footer | Context-specific working actions, no generic broken anchors. |

| Campaign | Specific copy / visual improvement |
|---|---|
| HR/employer | Lead with suitable employee roles, protected learning time and cohort planning. Replace “business can actually measure” with an example of an agreed development objective and review process. |
| Head of PMO | Show a reporting-to-decision example: issue, evidence, options, requested decision. Avoid repeating “not more reports” in multiple sections. |
| Construction | Use a schedule variance/change example; retain NEC relevance. Review named testimonial and “typically” improvement claims. |
| Energy | Use commissioning/outage planning context rather than general fear of expensive weak controls. |
| Public sector | Show an audit-ready decision record and responsible governance outcome; avoid claiming training produces public trust or political confidence. |
| Commercial | Explain who it suits, inclusions, enquiry steps and approved payment conditions. “Same development” needs a verified like-for-like inclusion comparison. Use normal public metadata on the canonical commercial page and deliberate campaign metadata on the campaign alias. |

## Audience, institutional and utility pages

| Page / source | Sections assessed and recommendations |
|---|---|
| [About](../frontend/src/pages/about/page.tsx) `/about` | **Hero:** keep specialist positioning, shorten repeated capability language. **Focused college introduction:** explain institutional role concretely. **Principles:** retain distinct teaching principles. **CapabilityStrip / connected performance disciplines:** merge duplicated discipline labels. **Responsibility-to-evidence process:** show one example output. **Audience groups:** keep routes for professionals and employers. **Closing CTA:** working enquiry with clear purpose. |
| [Employers](../frontend/src/pages/employers/page.tsx) `/employers` | **Hero/external employer service links:** clear roles and destinations. **Overview:** shorten generic training contrast. **Employer needs:** keep practical self-selection. **How it works:** keep stages and fix footer anchor. **Programme choices:** align with shared comparison. **Progress reviews:** keep evidence and responsibilities. **Funding:** keep conditions. **Responsibilities:** retain protected learning/support expectations. **Workforce services:** explain concrete service outputs. **Stories:** verify or label examples. **Sector relevance:** keep concise. **Resources:** actual downloads/destinations only. **FAQ:** specific objections. **Consultation/closing contact:** keep one usable enquiry path and accurately describe it. |
| [Apprentices](../frontend/src/pages/apprentices/page.tsx) `/apprentices` | **Hero/stats:** use verified facts, role-based value. **Application-to-career journey:** keep admission, learning and progression distinctions. **Skills:** concrete workplace tasks. **Weekly rhythm:** retain actionable commitment. **Support benefits:** consolidate with coaching/recognition facts. **Outcome section:** avoid duplicating skills. **FAQ:** truthful funding and support conditions. **Final CTA:** working eligibility or enquiry action. Split local rendering responsibilities; don't generalize every card. |
| [IPC](../frontend/src/pages/ipc/page.tsx) `/institute-of-project-controls`, `/ipc` | **Hero:** keep IPC identity. **Institutional purpose/principles:** explain authoritative role without vague prestige. **Connected disciplines:** useful diagram if distinct from home. **Learning-to-practice steps:** clarify provider/recognition boundaries. **Membership grades:** keep exact approved requirements and links. **FAQ:** specific membership questions. **Final CTA:** meaningful external/institutional destination. Retain gold/black as scoped sub-brand, not a competing global palette. |
| [Governance board](../frontend/src/pages/governance-board/page.tsx) `/governance-board` | **Hero/purpose:** distinguish governance overview from recruitment. **Strategic pillars:** retain specific remit. **Contribution/benefits:** shorten prestige-oriented copy. **Responsibilities:** keep concrete duties. **Commitment:** retain expected participation. **Expertise/eligibility:** merge overlapping skills and candidate lists. **Governance approach:** actual structures/processes add credibility. **Expression-of-interest embed:** primary task; add direct-open fallback and loading/error explanation. Embedded form has an aria-label; third-party keyboard and success behavior remain untested. |
| [Testimonials](../frontend/src/pages/testimonials/page.tsx) `/testimonials` | **Hero:** “Credibility before claims” is editorial process, not evidence. **ProfessionalOutcomes:** broad goals. **Evidence areas:** useful outcome categories, merge with goals. **Publishing standard:** move most operational policy into editorial guidance; retain short public explanation. Label navigation “Outcomes” unless actual testimonials are supplied. |
| [Contact](../frontend/src/pages/contact/page.tsx) `/contact` | **Hero:** compact introduction. **Form introduction/form:** keep direct task; fix label associations and assess whether four overlapping selectors are necessary. **What happens next:** retain clear response expectation only if operationally supported. **Quick FAQs:** keep short. Contact errors already have an alert; improve success announcement and retain data on failure. |
| [Booking](../frontend/src/pages/book-a-session/page.tsx) `/book-a-session` | **Coming-soon hero/contact fallback:** replace unfinished booking promise with working enquiry or a genuine scheduler. Until then, compact heading “Request a programme consultation” matches available behavior. |
| [Employer agreement](../frontend/src/pages/employer-agreement/page.tsx) `/employer-agreement` | **Hero:** compact task context, not 90vh. **Zoho agreement embed:** keep purpose, direct-open fallback and expectations; verify keyboard usability and submission outcome. The iframe has an aria-label; a conventional title can make embed purpose clearer across tooling. Fixed 100vh iframe may cause nested scrolling; test before adjusting. |
| [Mentor profile](../frontend/src/pages/mentors/detail.tsx) `/mentors/:id` | **Loading:** announce status rather than blank screen. **Unavailable:** distinguish retryable service failure from missing profile. **Back link:** preserve context when possible. **Portrait/bio/specialties/external profile:** keep approved content and meaningful labels. Reset state on ID changes and handle stale fetches. Fix dynamic metadata/noindex and white-on-light public header. |
| [404](../frontend/src/pages/NotFound.tsx) unmatched public routes | **Recovery heading/path explanation/home/programme links:** useful recovery. Shorten oversized heading and let long unknown paths wrap. **Decorative 404:** optional. Check actual server 404 status; SPA display alone does not establish it. |

## Eligibility checker — `/apprenticeship-eligibility-checker`

Sources: [page](../frontend/src/pages/apprenticeship-eligibility-checker/page.tsx), [flow](../frontend/src/pages/apprenticeship-eligibility-checker/components/EligibilityCheckerFlow.tsx), [engine](../frontend/src/pages/apprenticeship-eligibility-checker/eligibilityEngine.ts).

| Section | Assessment / improvement |
|---|---|
| Hero | Keep purpose and provisional-result language; move checker into view sooner. |
| Intro/start | Explain approximate effort and that in-memory answers are retained while moving between steps, not permanently saved. |
| Step progress and questions | Useful separated data/engine design; existing labels/fieldset patterns are better than contact. Keep native input semantics. Focus new step or error summary, and provide required/error announcements for radio/checkbox groups. |
| Validation | Missing fields are indicated; add first-invalid-field focus and ensure help/error IDs are associated with controls. |
| Result | Keep provisional status, reasons and relevant next action. The flow calculates locally; it does not submit an enquiry or create a booking. Do not send users to a page claiming receipt unless data was actually submitted. |
| Back/restart | Keep predictable behavior and warn only if genuinely losing meaningful work. |
| Still unsure / FAQ | Keep short route-to-adviser help and conditions. Replace unfinished booking destination. |

Version eligibility rules with their source/review date and test meaningful decision branches. This audit does not confirm the funding-rule calculations against current policy.

## Article discovery and all ten articles

Sources: [hub](../frontend/src/pages/knowledge-hub/page.tsx), [articles list](../frontend/src/pages/articles/page.tsx), [article data](../frontend/src/data/articles.ts), [ArticleLayout](../frontend/src/components/feature/ArticleLayout.tsx).

| Discovery section | Assessment / improvement |
|---|---|
| Hub hero | Keep purpose; shorten 90vh treatment so useful material is visible sooner. |
| “Find the insight you need” category cards | Useful category navigation; correct visible labels and section links. |
| “Start here” featured articles | Useful starting point, but avoid repeatedly showing identical articles without context. |
| Funding guides | Two employer-funding articles overlap; clarify distinct purposes or consolidate after review. |
| Route comparisons | Keep consistent, balanced comparison dimensions. |
| Sector guides | Keep actual sector-specific explanations, not campaign copy alone. |
| APM ChPP readiness | Keep independent award boundaries. |
| Employer decision guides | Differentiate actionable cohort/business-case advice from basic funding explanation. |
| Hub final CTA / compliance / sticky CTA | Keep one working next action; remove broken host-local sticky destinations. |
| Hub loading skeleton | Static data is deliberately delayed 800ms; remove artificial wait. |
| `/articles` hero / breadcrumb / category filters / list / empty filter state | Useful compact browsing view of the same data; merge this functionality into the primary discovery page if both do not have distinct user value. |

Every article uses the same recurring sections: **hero, quick summary, body, end CTA, FAQ, related articles, qualification note and sticky action**. Keep the quick summary and unique body advice; reduce oversized heroes and repeated promotional end matter. Add a real author/reviewer and reviewed date where maintained; verify external facts. Give the article one canonical URL and consistent metadata. Make related links relevant to the reader's next question, not simply more conversion pages.

| Article | Body sections assessed; specific improvement |
|---|---|
| [What is PCP?](../frontend/src/pages/knowledge-hub/what-is-pcp-apprenticeship.tsx) | **Definition, structure, audience, funding, recognition, qualification comparison, employer value, next steps:** keep introductory explanation, use current approved duration/intakes and concrete output examples. Distinguish the apprenticeship from external awards and general training. |
| [Funded employer guide](../frontend/src/pages/knowledge-hub/funded-pcp-employer-guide.tsx) | **How funding works, coverage, eligibility, employer value, business case, guide download:** keep factual funding scope; remove unsupported ROI implications; repair nonexistent lead-magnet link. Use a useful approval checklist or direct guide instead of another marketing summary. |
| [PCP versus PMP](../frontend/src/pages/knowledge-hub/pcp-vs-pmp.tsx) | **Purpose, comparison table, when each fits, commercial option, conclusion:** keep balanced criteria; source external requirements and prices before publishing. Ensure table is readable on mobile. Avoid assuming one qualification universally replaces another. |
| [ChPP readiness](../frontend/src/pages/knowledge-hub/apm-chpp-readiness.tsx) | **Recognition context, what ChPP is, readiness support, exclusions, value without guarantee, condition note, next steps:** keep boundaries; combine repeated limitation paragraphs into one clear explanation near the support description. Link to authoritative award requirements after review. |
| [Strategic versus operational](../frontend/src/pages/knowledge-hub/strategic-vs-operational.tsx) | **Two pathways, strategic, operational, combined, choosing:** keep role/decision comparison; align combined-route positioning with the current pathway data. Use one real task example per route. |
| [Construction training](../frontend/src/pages/knowledge-hub/construction-training.tsx) | **Problem, sector need, curriculum, audience, employer value, funding:** much resembles campaign persuasion. Add an example of schedule/change reasoning and practical questions to assess a course; retain sector specificity. |
| [Energy training](../frontend/src/pages/knowledge-hub/energy-training.tsx) | **Capital-programme problem, control needs, audience, net zero, funding:** add outage/commissioning or risk-interface example; separate development goals from guaranteed delivery assurance. |
| [PMO governance](../frontend/src/pages/knowledge-hub/pmo-governance-training.tsx) | **Reporting problem, capability, audience, recognition, employer case:** use an example decision brief or escalation criteria. Reduce repeated “more reports” contrast and preserve award limits. |
| [Employer apprenticeship funding](../frontend/src/pages/knowledge-hub/employer-apprenticeship-funding.tsx) | **Funding position, role selection, route choice, cohort planning, business case, next step:** best differentiated as an employer implementation checklist. Avoid duplicating funding mechanics from the other guide. |
| [Commercial routes](../frontend/src/pages/knowledge-hub/commercial-routes-explained.tsx) | **Alternative access, audience, inclusions, payment options, funded/commercial comparison, next step:** useful alternative; verify bursary/installment/inclusion terms. A transparent comparison table communicates more than several repeated benefit sections. |

## Events — `/events`

Source: [events page](../frontend/src/pages/events/page.tsx).

| Section | Assessment / improvement |
|---|---|
| Hero / breadcrumb | Clear discovery purpose; compact hero. |
| Event cards | Title/category/format/cadence/description/CTA are useful, but cadence alone is insufficient for a scheduled event. Add approved date, time, timezone, location and booking status if actual dated events are supported. |
| Loading / empty states | Keep genuine skeletons and empty messages, add failed-fetch state and retry. No catch currently resolves a network failure. |
| Registration destination | Ensure action labels match external registration versus internal interest enquiry. Do not claim registration based on visiting a thank-you URL. |

## Confirmation routes — all five

Each has a large hero, status icon, claimed outcome, and next-action cards, plus footer. Compact all five and fix stale PCP anchor links. Track views outside render and distinguish a page view from an actual conversion.

| Route | Outcome and section-specific recommendation |
|---|---|
| `/thank-you/eligibility` | Only say details were received if submitted. The local checker alone does not submit them. Keep one relevant adviser/route next step. |
| `/thank-you/consultation` | Only say booked / Teams invitation when confirmed by the scheduling service. Otherwise “Consultation request received.” Preparation cards should link to existing content. |
| `/thank-you/eventbrite` | Only say registered when the event provider confirms. Show actual event details if available; otherwise offer registration link without a success claim. |
| `/thank-you/commercial` | Confirm a received enquiry only after API success. Keep approved response expectation and one relevant programme link. |
| `/thank-you/guide` | Confirm request versus actual delivery accurately. A direct approved download is useful. Remove unavailable “case studies” and route-anchor actions. |

## Legal variants

Source: [LegalPage](../frontend/src/pages/legal/LegalPage.tsx). All four share **hero/introduction, reviewed-date line, numbered information sections, footer**. Keep the common renderer. Use compact layout, readable prose width and authentic review dates.

| Route | Content recommendation |
|---|---|
| `/privacy` | Ensure descriptions match actual enquiry storage, external forms, processors and contact routes. Obtain substantive review from the owner; this audit does not certify legal completeness. |
| `/terms` | Align programme-information limitations, external services and institutional identity with actual offering. Keep material conditions accessible. |
| `/accessibility` | Replace broad unsupported assurances with the tested status and specific known limitations once browser/assistive-technology checks are complete. Keep alternative-format and issue-reporting contact. |
| `/cookies` | Describe actual storage/measurement behavior. “Analytics should be configured…” is implementation guidance and should become an accurate statement of current practice. Keep user-facing control information. |

## Dashboard — all screens

Source: [dashboard routes](../frontend/src/dashboard/DashboardApp.tsx). All authenticated screens share the sidebar/content shell. Add narrow-screen navigation, skip target, consistent headings and stable loading/error/action feedback. Keep resource-specific editors; shared fields do not require a generic CRUD framework.

| Screen | Sections / controls assessed; recommendation |
|---|---|
| Login | **Heading, email/username, password, submit, error:** labels and error role exist. Clarify expected credential identifier; provide accurate rejected-login versus service-error feedback. Keep keyboard focus visible on dark background. |
| Overview | **Summary / quick navigation:** show real operational counts and destinations, not inferred performance metrics. Add clear failed-load state and useful next action. |
| Pages list | **Page rows / creation / edit links:** clarify which pages actually drive public content. Show route, publication state and editability; handle load/create errors. |
| Page editor, including `/dashboard/home` | **Metadata, publication state, section list, visibility/order/type, content JSON/editor, save/delete, preview:** fix home-only labels/preview. Explain supported section types. Validate fields/JSON, preserve unsaved changes, report per-operation errors. Do not imply unsupported public publishing. |
| Navigation | **Group creation, location, item creation, delete:** connect to actual public consumers or label scope accurately. Add URL validation, deletion confirmation/undo and service feedback. |
| Media library | **Upload, grid, copy URL, delete:** keyboard-operable upload, limits, alt-text editing, success/failure feedback and safe deletion. Explain asset usage if available. |
| Mentors | **Add/list, identity, portrait, role/affiliation/specialties, external profile, active/order, save/delete:** keep approved bio detail; shared fields/media behavior. Distinguish bad image URL from no image. |
| Coaches | **Add/list, support description, image/active/order, save/delete:** ensure public section describes coaching specifically and does not duplicate teaching roles. Add reliable load/save errors. |
| Partners | **Add/list, logo/link/order/active, save/delete:** record approved relationship and logo use; previews should preserve aspect ratio and legibility. |
| Professional credentials | **Certificate list, fields, certificate image upload, active/order, save/delete:** separate professional body, certificate type and College support. Reuse media picker/feedback; do not imply every displayed credential is automatically awarded. |
| Sectors | **Sector title/description/image/route/order/active, save/delete:** route destination should be valid; changes to images should be reflected by the actual public consumer. Share fields, not full resource schema. |
| Events | **Add/list, title/category/format/cadence, CTA, source fields, active/order, save/delete:** preview actual card; distinguish registration link from enquiry. Add explicit errors and dated-event fields only when supported operationally. |
| Enquiries | **Table, source/type/date, status selector:** keep workflow; identify each status control by enquiry, expose saved/failed state, and avoid silently hiding a failed optimistic update. Add detail access if operators need message/phone/organisation context; add filtering/pagination when volume warrants. |

## Unmounted source sections

`CampaignLeadForm`, `RouteConsultationForm`, `RouteEligibilityForm`, `RegisterInterestForm`, and `PmoEnquiryForm` contain form implementations but are not mounted by current source imports. Decide which are needed to repair the live journey before consolidating them. `HomeFaq`, `CroUrgencyStrip`, and `ProgrammeIntroduction` are also unreferenced; they are not additional visible sections. The empty `pathway-redesign/PathwayPage.tsx` is not an alternative rendered design. None were removed during this audit.
