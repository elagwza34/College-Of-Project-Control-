# Website content audit — 15 September 2026

## Scope and evidence

Baseline: Git commit `addb3d50eff6658d7fd04da50d74a7180d9e903f`. This audit was recorded before implementing copy changes. It reviews the business message, journeys, headings, calls to action, functional copy, consistency and information order, rather than grammar alone.

The source inventory covers 56 routed page groups, their aliases, shared components, dashboard copy, metadata, article seeds and the chatbot website snapshot. An automated inventory identified 555 TypeScript files with 8,063 candidate strings; these include some technical strings and are not a count of editorial defects. Route composition and relevant source documents were checked alongside the inventory. Public APIs supplied ten published article bodies and four event listings with descriptions. Active public collections were also reviewed: three mentors, no coaches, 26 partner records, four sectors and eight recognition records. Some HTTP reads timed out; the same public serializers were used in read-only mode to complete those collection checks. Local public pages were inspected in a browser without submitting forms. External embedded forms and third-party registration content are outside the inspected repository and require a separate owner review. No enquiry records or personal submissions were exported.

The live page-content API returned no published overrides, and a read-only check found zero `PageContentRevision` records. Consequently there are no saved page-editor drafts to lose when the changed source defaults receive new generated field IDs. This finding applies to the connected local database, not an uninspected deployment.

Source documents in `docs/*-source-content.txt` are supplied material, not independent substantiation. Historical adoption notes explicitly say that funding/recognition statements were not independently verified. This audit does not determine legal eligibility or validate current regulatory rules: unresolved claims are marked **REQUIRES BUSINESS CONFIRMATION** instead of replacing them with guessed facts.

## Business and audience assessment

The site offers applied development in project controls, project management and PMO practice. Its main decision is matching current workplace responsibility to Associate Project Manager Level 4, Project Controls Professional Level 6, a PMO-focused offering or specialist development. Operational, Strategic and Chartered pathways describe professional emphasis; apprenticeship and commercial access describe how a learner enters or pays. These two decisions should remain distinct.

Primary audiences are employed professionals, employers/HR/L&D teams and professionals exploring commercial access. Secondary audiences include prospective governance-board members and existing learners or employers seeking resources. Most conversion links lead to an enquiry form. The College reviews a request and arranges a conversation; the site does not currently offer a confirmed appointment calendar. Events use a separate registration journey.

The strongest positioning is practical learning applied to schedules, forecasts, risk registers, governance decisions and workplace evidence. The weakest positioning is repeated abstract language about confidence, capability and progression without describing the next decision. The exact College/Kent Business College/IPC relationship is inconsistent across sources and must be approved before site-wide name changes.

## Top ten problems

| Priority | Problem | Evidence and required action |
| --- | --- | --- |
| Critical | Conflicting or inadequately scoped funding and eligibility claims | Universal residency/visa/employer conditions, Funding Band 11 alongside £27,000, percentage tables and support packages require confirmation against the applicable intake. Keep an owner-approved facts record. |
| Critical | Recognition is not described consistently | PMO pages/articles assert APM-recognised provision; Chartered copy says exact assessment recognition must be confirmed. Confirm legal provider, exact assessment and approval scope. |
| High | Duration and workload are not comparable | Level 4 says 12 months; general learner FAQ says 18–24; Level 6 says 27; guides say 24–36; the combined route says two years; standard context says 48. Level 6 also has 840/835 and seven/eight-hour figures. Distinguish programme schedule, standard typical duration, taught phase and assessment. |
| High | CTA labels promise a booking or application that the destination does not complete | `Book an information session` opens `/book-a-session`, which submits an enquiry. Use request wording and preserve the working destinations. |
| High | Programme taxonomy and organisational identity drift | Three main programmes, three standard pathways, PMO route and a combined route can look like interchangeable qualifications. About says Level 3–6, while principal programme listings show Level 4/6. Confirm names and scope. |
| High | Commercial inclusions are too absolute | `No hidden fees or additional assessment costs`, exam inclusion and equivalent qualification/recognition claims conflict with written-offer qualifications elsewhere. Obtain approved commercial terms. |
| Medium | Editorial implementation notes appear in public copy | Missing local logos, unavailable guide routes and source arithmetic explanations distract visitors. Move these observations to this audit; retain meaningful programme conditions. |
| Medium | Programme discovery repeats before advancing the decision | Home/listing pages repeat programme cards, comparison, format choice, role questions and pathways. Reduce repeated positioning; propose order changes separately. |
| Medium | Static guides, seeded/live articles and chatbot snapshots duplicate content | Ten article topics also exist as static guides. Changing one does not update the other or active chatbot sources. Use an explicit review/publishing workflow. |
| Medium | Language and presentation defects undermine polish | Literal `\u00A30`, mojibake dashes, `Learn & Practice`, inconsistent masterclass spelling and long decorative headings. Correct visible copy without changing identifiers. |

## Proposed information order

These are recommendations, not permission to reorder every page or remove required content. No layout redesign is needed for the safe copy changes.

| Page | Current order (major stages) | Recommended order | Reason |
| --- | --- | --- | --- |
| Home | Hero → partners → programme cards/comparison/guidance → modules → pathways → sectors → funding → employers → mentors/coaching/events/articles/reviews/recognition | Hero → programmes with concise comparison → professional/employer next steps → pathway or module choice → sectors → funding → relevant evidence/support → resources | Move from offer to role fit and access before optional reading; avoid two comparisons in the same journey. |
| Programmes | Hero → programme detail cards → comparison → format/module choice → role prompts → employer/support/FAQ material | Hero → concise comparison → programme details → programme versus module decision → funding/access link → support → FAQ and consultation | Visitors should identify a likely route before reading several long cards. |
| Operational | Hero → overview → credit selection → module catalogue → audience → capability → outputs → eligibility → employer responsibilities → funding → assessment → CTA | Hero → audience → overview and commitment → credit/module catalogue → outputs → employer responsibilities → eligibility/funding → assessment → CTA | Role fit and commitment currently arrive after detailed module material. |
| Strategic | Hero → credit overview → long credit descriptions → evidence/experts/audience → practical/eligibility/funding material → CTA | Hero → role fit → indicative structure and commitment → credit overview/details → outputs → delivery/eligibility/funding → experts → CTA | Qualify the audience before a long syllabus. |
| Chartered | Hero → role/development architecture → occupational breadth → PMO and specialist details → evidence/assessment → delivery/eligibility/sources | Hero → role fit → what the route does and does not award → structure/commitment → modules → workplace evidence and separate assessment → access and CTA | Keep independent ChPP assessment visible near the offer, not only in later qualifications. |
| Commercial | Hero → commercial value → IPC → without/with comparison → routes → recognition → capability/examples → shared funding → FAQ | Hero → route choice → scope/assessment → commercial fee and inclusions once approved → conditional support → evidence → FAQ and adviser request | Buying questions need clear scope and price before repeated promotional comparisons. |
| Apprentices | Hero → benefits → journey → support → weekly example → cost → FAQ → CTA | Hero → programme/role choice → employer and eligibility overview → learning/commitment → support → costs → FAQ → enquiry | The current page implies one standard learner experience across programmes with materially different arrangements. |

## Confirmation register

Every row below is **REQUIRES BUSINESS CONFIRMATION**. Existing factual figures and rules have not been silently normalised.

| ID | Topic | Evidence | What the business must supply |
| --- | --- | --- | --- |
| BC01 | Official organisational identity | About/Home/SEO use Controls & Management; L6 uses Controls and Project Management; adoption notes removed some Kent affiliations while About retains them. | Approved full/short College names, legal provider and exact relationship to KBC and IPC. |
| BC02 | Programme and award catalogue | Listings use Certified PMO Professional Level 6; Chartered pages distinguish College professional development from an independently recognised assessment. About/general learner FAQ mention Level 3. | Current programme list, internal route labels versus awarded qualifications, awarding bodies and available levels. |
| BC03 | Duration and assessment | 12 months L4; 18–24 learner FAQ; 27 L6; 24–36 guides; two-year combined route; 48-month typical standard in Chartered source. | Approved duration for each intake and whether each figure includes preparation, practical training, EPA and additional development. |
| BC04 | Workload | L6 workload 840 hours and 2+3+3 weekly; Operational/Chartered standard references 835 minimum; source note mentions seven hours. | Agreed total, weekly indicative commitment, off-the-job requirements and prior-learning treatment. |
| BC05 | Funding terminology and values | Shared component says four-credit course £4,000; L6 describes a credit as a four-month course; guides describe Band 11 and £27,000. | Confirm unit of pricing, fee versus commercial value versus funding maximum, applicable band and approved wording. |
| BC06 | Eligibility and contribution rules | Strategic/Operational/Chartered pages prescribe residency/visa, employer-location and working-hours conditions; checker uses individual-review states. | Intake-specific approved checklist with exceptions and escalation wording. Do not infer rules from this audit. |
| BC07 | APM/IPC and other recognition | PMO page and guide assert APM recognition; Chartered says recognised assessment must be checked separately. IPC authority uses global accreditation wording. | Evidence of provider/assessment approval and exact scope; distinctions between training, exam eligibility and award. |
| BC08 | Additional benefits and support | Healthcare, exams, memberships, Level 7, psychological assessments, IPC 75%/50% and discretionary KBC bursaries. | What is included, optional, separately purchased, means-tested or discretionary for each programme. |
| BC09 | Commercial equivalence and fees | Commercial FAQ says equivalent recognition; page promises no additional assessment costs but other pages make exams conditional. | Price, assessment route, exam/resit charges, instalment terms and differences from apprenticeship awards. |
| BC10 | Outcome/popularity/scarcity evidence | Most Popular badge; measurable improvement, many learners/employers, limited allocation and first-come claims. | Evidence and effective date, or approval to remove/qualify claims. |
| BC11 | Learner experience and response standards | General learner page specifies evening teaching, weekly mentor contact and 24-hour response; L4/L6 detail differs. | Programme-specific timetable, coaching frequency, cohort availability and enquiry service standard. |
| BC12 | Legal notices and external services | Generic retention wording, conditional analytics configuration statement, AI provider alternatives, embedded Zoho forms. | Owner-approved privacy/cookie/retention/controller details and external-form disclosures. This is a content completeness finding, not legal advice. |
| BC13 | OTHM/Level 7 | Combined route names OTHM Level 7 in Project Management with Strategy and Leadership; L6 calls additional access a Diploma in Strategy and Leadership. | Exact award, awarding body, prerequisites, duration, fee and whether access or certification is included. |
| BC14 | Expert participation and governance roles | Named tutors, qualifications, senior experience and board meeting/term commitments. | Current biographies, consent, cohort participation and approved board appointment terms. |
| BC15 | Imported event scope and claims | Four public Eventbrite records include two CIM marketing events, a PMP/AI event and a broad funding event. Descriptions claim UK number-one rankings, 20/40 remaining places, funding splits, 70% bursary and no hidden costs. All four records reported stale availability at audit time. | Confirm which KBC events belong on this specialist site; substantiate ranking/scarcity and approve intake-specific prices/support in Eventbrite. Availability freshness is an operational observation, not proof an event is sold out. |

## Editorial policy for implementation

- Use British English and sentence case for revised functional labels. Preserve official proper names until BC01/BC02 are settled.
- Describe an enquiry as a request. Preserve event registration, actual downloads, existing URLs, analytics identifiers, form values and accessibility attributes.
- Keep funding, professional-award, confidentiality and illustrative-example qualifications where they help a decision.
- Remove repository/process commentary from public pages; record the original issue and required decision here instead.
- Correct encoding and spelling only in user-visible strings. Do not rename API fields such as `organizer`, `organization` autocomplete values or business identifiers.
- Do not edit backend logic, API contracts, database schemas, migration history, approved review quotations or live external services.
- Treat articles and active chatbot sources as independent publication records. Report their outdated claims without publishing unreviewed replacements into the database.

The companion `PAGES.md` supplies page-specific purpose, audience, action, strengths, current/proposed examples, reasons and severity. `REPORT.md` records implemented changes and final verification.
