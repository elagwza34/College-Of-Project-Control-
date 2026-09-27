# Page-by-page content review

Recorded before implementation. CURRENT is a quoted excerpt, not necessarily the complete paragraph. PROPOSED is an editorial recommendation; confirmation-dependent recommendations are not implemented as facts. See REPORT.md and CHANGES.json for what actually changed.

## PAGE: home

Routes: `/`.

**PURPOSE:** Introduce the College and route visitors to relevant development.

**AUDIENCE:** Professionals and employers.

**PRIMARY ACTION:** Explore programmes.

**WHAT WORKS:** Concrete planning, cost and governance disciplines.

**PROBLEMS:** COPY ISSUE: identify the actual subjects sooner; repeated cards/comparison/guidance also need an information-order decision.

**CURRENT:** “A specialist business college for professionals and organisations responsible for project performance, governance and complex delivery.”

**PROPOSED:** A specialist college for professionals and employers working in project controls, project management and PMO.

**REASON:** COPY ISSUE: identify the actual subjects sooner; repeated cards/comparison/guidance also need an information-order decision.

**SEVERITY:** Medium

**EVIDENCE:** `frontend/src/pages/home/components/CollegeOfProjectControlsAndManagement.tsx:43`

## PAGE: about

Routes: `/about`.

**PURPOSE:** Explain identity, approach and ownership.

**AUDIENCE:** Prospective learners and employers.

**PRIMARY ACTION:** Explore programmes or contact an adviser.

**WHAT WORKS:** Workplace application is explained through an understandable learning cycle.

**PROBLEMS:** COPY ISSUE: a descriptive headline is more useful than abstract confidence. Confirm the KBC affiliation and Level 3 offer before changing those facts (BC01/02).

**CURRENT:** “A specialist college for the people behind confident project delivery”

**PROPOSED:** A specialist college for project controls, project management and PMO

**REASON:** COPY ISSUE: a descriptive headline is more useful than abstract confidence. Confirm the KBC affiliation and Level 3 offer before changing those facts (BC01/02).

**SEVERITY:** Medium

**EVIDENCE:** `frontend/src/pages/about/components/AboutCPCM.tsx:22`

## PAGE: programmes

Routes: `/programmes`.

**PURPOSE:** Compare programmes and depth of study.

**AUDIENCE:** Professionals choosing a route and employers.

**PRIMARY ACTION:** Compare programmes, then request advice.

**WHAT WORKS:** Comparison separates responsibility and subject focus.

**PROBLEMS:** BUSINESS AMBIGUITY: the L4 detail page distinguishes preparation from independently awarded certification. Do not silently replace the advertised qualification (BC02/07).

**CURRENT:** “with PMP® & AI in Projects Certificate”

**PROPOSED:** Proposed after confirmation: with PMP preparation and applied AI learning

**REASON:** BUSINESS AMBIGUITY: the L4 detail page distinguishes preparation from independently awarded certification. Do not silently replace the advertised qualification (BC02/07).

**SEVERITY:** High

**EVIDENCE:** `frontend/src/pages/programmes/components/ChooseYourProgramme.tsx:277`

## PAGE: apm-level-4

Routes: `/associate-project-manager-level-4`.

**PURPOSE:** Explain Level 4 learning, suitability and commitment.

**AUDIENCE:** Employed professionals supporting or managing projects.

**PRIMARY ACTION:** Request a consultation.

**WHAT WORKS:** PMP exam independence and employer involvement are explained.

**PROBLEMS:** COPY ISSUE: development history provides no learner value. Separately confirm 12 months, approximately seven hours and included assessment (BC03/04/08).

**CURRENT:** “No verified programme-specific testimonial copy or approved employer-logo assets were available locally, so endorsements have not been invented or implied.”

**PROPOSED:** Remove this editorial note; retain sector relevance and the approved review workflow.

**REASON:** COPY ISSUE: development history provides no learner value. Separately confirm 12 months, approximately seven hours and included assessment (BC03/04/08).

**SEVERITY:** Medium

**EVIDENCE:** `frontend/src/pages/apm-level-4/components/TrustAndRelevance.tsx:5`

## PAGE: pcp-master

Routes: `/project-controls-professional-level-6`, `/pcp-master`.

**PURPOSE:** Explain the Level 6 offer and route choice.

**AUDIENCE:** Controls professionals and sponsoring employers.

**PRIMARY ACTION:** Request a consultation.

**WHAT WORKS:** Six-credit sequence, workplace outputs and separate external awards are described.

**PROBLEMS:** COPY ISSUE plus BUSINESS AMBIGUITY: replace source arithmetic commentary with a useful next step; keep the conflicting figures explicitly in BC03/04, not silently corrected.

**CURRENT:** “Workload clarification:”

**PROPOSED:** Ask the College to confirm your weekly learning commitment and total programme hours before enrolment.

**REASON:** COPY ISSUE plus BUSINESS AMBIGUITY: replace source arithmetic commentary with a useful next step; keep the conflicting figures explicitly in BC03/04, not silently corrected.

**SEVERITY:** High

**EVIDENCE:** `frontend/src/pages/pcp-master/components/ExpectedWorkload.tsx:6`

## PAGE: strategic-pcp

Routes: `/project-controls-professional/strategic-route`, `/strategic-pcp`.

**PURPOSE:** Explain strategic controls and its module sequence.

**AUDIENCE:** Experienced controls, programme and PMO professionals.

**PRIMARY ACTION:** Request a consultation.

**WHAT WORKS:** Credit outputs and independent external certification are specific.

**PROBLEMS:** CTA MISMATCH: destination submits a request. Move role fit before long credit descriptions as a separate IA recommendation. Eligibility remains BC06.

**CURRENT:** “Book an information session”

**PROPOSED:** Request a consultation

**REASON:** CTA MISMATCH: destination submits a request. Move role fit before long credit descriptions as a separate IA recommendation. Eligibility remains BC06.

**SEVERITY:** Medium

**EVIDENCE:** `frontend/src/pages/strategic-pcp/components/ProjectControlsProfessionalLevel6.tsx:13`; `frontend/src/pages/strategic-pcp/components/YourCreditJourney.tsx:134`

## PAGE: operational-pcp

Routes: `/project-controls-professional/operational-route`, `/operational-pcp`.

**PURPOSE:** Explain integrated operational controls development.

**AUDIENCE:** Planning, cost, risk and controls professionals.

**PRIMARY ACTION:** Request a consultation.

**WHAT WORKS:** Applied outputs and employer evidence responsibilities are concrete.

**PROBLEMS:** CTA MISMATCH: no appointment is booked. Move audience/commitment before the syllabus; preserve all mandatory standard and eligibility statements pending confirmation.

**CURRENT:** “book an information session”

**PROPOSED:** Request a consultation

**REASON:** CTA MISMATCH: no appointment is booked. Move audience/commitment before the syllabus; preserve all mandatory standard and eligibility statements pending confirmation.

**SEVERITY:** Medium

**EVIDENCE:** `frontend/src/pages/operational-pcp/components/Section202627LearnerAndEmployerPathway.tsx:53`; `frontend/src/pages/operational-pcp/components/TakeTheNextStep.tsx:14`

## PAGE: chartered-pmo-pathway

Routes: `/project-controls-professional/chartered-pmo-pathway`, `/chartered-pmo-pathway`.

**PURPOSE:** Explain PMO development and preparation for independent ChPP assessment.

**AUDIENCE:** Experienced PMO and controls professionals.

**PRIMARY ACTION:** Request a consultation.

**WHAT WORKS:** Explicitly separates learning from an APM award.

**PROBLEMS:** CTA MISMATCH. Preserve independent-award warnings; verify recognised assessment, duration and prerequisites rather than equating course completion with ChPP (BC03/07).

**CURRENT:** “Book an information session”

**PROPOSED:** Request a consultation

**REASON:** CTA MISMATCH. Preserve independent-award warnings; verify recognised assessment, duration and prerequisites rather than equating course completion with ChPP (BC03/07).

**SEVERITY:** Medium

**EVIDENCE:** `frontend/src/pages/chartered-pmo-pathway/components/ProgrammeInformationAndNextSteps.tsx:70`; `frontend/src/pages/chartered-pmo-pathway/components/ProgrammeInformationAndNextSteps.tsx:77`; `frontend/src/pages/chartered-pmo-pathway/components/ProjectControlsProfessionalLevel6.tsx:13`

## PAGE: pmo-pcp

Routes: `/project-controls-professional/pmo-governance-route`, `/pmo-pcp`.

**PURPOSE:** Explain PMO-focused apprenticeship development.

**AUDIENCE:** PMO, governance and reporting professionals.

**PRIMARY ACTION:** Request a PMO consultation.

**WHAT WORKS:** Explains workplace evidence and employer support.

**PROBLEMS:** BUSINESS AMBIGUITY: Chartered pages explicitly require separate recognition checks. Also change booking CTAs to requests without changing their destinations.

**CURRENT:** “APM-recognised technical-knowledge progression”

**PROPOSED:** REQUIRES BUSINESS CONFIRMATION: confirm the exact recognised provider and assessment before approving this phrase.

**REASON:** BUSINESS AMBIGUITY: Chartered pages explicitly require separate recognition checks. Also change booking CTAs to requests without changing their destinations.

**SEVERITY:** Critical

**EVIDENCE:** `frontend/src/pages/pmo-pcp/components/ProjectControlsProfessionalLevel6.tsx:38`

## PAGE: strategic-operational-pcp

Routes: `/project-controls-professional/strategic-operational-route`, `/strategic-operational-pcp`.

**PURPOSE:** Explain combined technical and strategic development.

**AUDIENCE:** Experienced practitioners and employers developing leaders.

**PRIMARY ACTION:** Request a consultation.

**WHAT WORKS:** Connects delivery evidence with senior decisions.

**PROBLEMS:** COPY ISSUE: remove unsupported competitor generalisation. Confirm OTHM award name and two-year/27-month relationship separately (BC03/13).

**CURRENT:** “Most development programmes make you choose between technical and strategic.”

**PROPOSED:** The combined pathway develops technical project controls and strategic decision-making together.

**REASON:** COPY ISSUE: remove unsupported competitor generalisation. Confirm OTHM award name and two-year/27-month relationship separately (BC03/13).

**SEVERITY:** High

**EVIDENCE:** `frontend/src/pages/strategic-operational-pcp/routeData.ts:13`

## PAGE: apprentices

Routes: `/apprentices`.

**PURPOSE:** Explain the learner journey and support.

**AUDIENCE:** Prospective working learners.

**PRIMARY ACTION:** Contact the College about suitability.

**WHAT WORKS:** Workplace learning and employer support are visible.

**PROBLEMS:** BUSINESS AMBIGUITY: L4 says 12 months and L6 says 27. Evening classes, certifications, weekly mentoring and 24-hour response also need confirmation. Correct the literal currency escape and enquiry labels now.

**CURRENT:** “Typically 18–24 months depending on your level and pace.”

**PROPOSED:** REQUIRES BUSINESS CONFIRMATION: replace the blanket duration with approved programme-specific durations.

**REASON:** BUSINESS AMBIGUITY: L4 says 12 months and L6 says 27. Evening classes, certifications, weekly mentoring and 24-hour response also need confirmation. Correct the literal currency escape and enquiry labels now.

**SEVERITY:** High

**EVIDENCE:** `frontend/src/pages/apprentices/components/QuickAnswers.tsx:7`

## PAGE: employers

Routes: `/employers`.

**PURPOSE:** Explain employer value, responsibilities and resources.

**AUDIENCE:** HR, L&D, managers and programme sponsors.

**PRIMARY ACTION:** Request an employer consultation.

**WHAT WORKS:** Concrete employer responsibilities and conditional funding are strong.

**PROBLEMS:** COPY ISSUE: link behaviour needs no explanation about missing approved source material. Avoid treating illustrative examples as measured outcomes.

**CURRENT:** “The progress-review card returns to the guidance on this page because no separate approved guide route is currently available.”

**PROPOSED:** Remove the implementation note; retain the working progress guidance link.

**REASON:** COPY ISSUE: link behaviour needs no explanation about missing approved source material. Avoid treating illustrative examples as measured outcomes.

**SEVERITY:** Medium

**EVIDENCE:** `frontend/src/pages/employers/components/EmployerResources.tsx:16`

## PAGE: contact

Routes: `/contact`.

**PURPOSE:** Collect a relevant enquiry and explain the next step.

**AUDIENCE:** Prospective learners and employers.

**PRIMARY ACTION:** Send an enquiry.

**WHAT WORKS:** Form asks for role and needs and explains use of information.

**PROBLEMS:** FUNCTIONAL COPY ISSUE: those audience options are not present in the actual form. Do not promise a calendar booking through Events; 24-hour service statements need BC11.

**CURRENT:** “Select "Employer" or "HR / L&D" in the form.”

**PROPOSED:** Tell us your organisation and role, then describe your team’s development needs in the message field.

**REASON:** FUNCTIONAL COPY ISSUE: those audience options are not present in the actual form. Do not promise a calendar booking through Events; 24-hour service statements need BC11.

**SEVERITY:** High

**EVIDENCE:** `frontend/src/pages/contact/components/BeforeYouReachOut.tsx:4`

## PAGE: book-a-session

Routes: `/book-a-session`.

**PURPOSE:** Request a discussion about programme fit.

**AUDIENCE:** Prospective learners and employers.

**PRIMARY ACTION:** Send an enquiry.

**WHAT WORKS:** The page correctly says the College will contact the visitor.

**PROBLEMS:** REFERENCE PAGE: copy matches the actual enquiry workflow; no calendar, reservation or confirmed appointment is promised here.

**CURRENT:** “Request a programme consultation”

**PROPOSED:** Retain this heading and use request terminology on referring CTAs.

**REASON:** REFERENCE PAGE: copy matches the actual enquiry workflow; no calendar, reservation or confirmed appointment is promised here.

**SEVERITY:** Low

**EVIDENCE:** `frontend/src/pages/book-a-session/components/RequestAProgrammeConsultation.tsx:5`

## PAGE: apprenticeship-eligibility-checker

Routes: `/apprenticeship-eligibility-checker`.

**PURPOSE:** Collect initial suitability indicators.

**AUDIENCE:** Prospective apprenticeship applicants.

**PRIMARY ACTION:** Review initial result and request a consultation.

**WHAT WORKS:** Results distinguish likely suitability, further review and current blockers.

**PROBLEMS:** BUSINESS AMBIGUITY: do not rewrite the calculation or imply that the checker determines funding. Static eligibility conditions differ (BC06).

**CURRENT:** “Likely suitable for review”

**PROPOSED:** Retain qualified result language; obtain an approved matching checklist for the static programme pages.

**REASON:** BUSINESS AMBIGUITY: do not rewrite the calculation or imply that the checker determines funding. Static eligibility conditions differ (BC06).

**SEVERITY:** High

**EVIDENCE:** `frontend/src/pages/apprenticeship-eligibility-checker/eligibilityEngine.ts:49`

## PAGE: employer-agreement

Routes: `/employer-agreement`.

**PURPOSE:** Collect employer participation information.

**AUDIENCE:** Employer representatives.

**PRIMARY ACTION:** Complete the embedded agreement form.

**WHAT WORKS:** Purpose and KBC next step are stated.

**PROBLEMS:** SCOPE LIMIT: the external Zoho form is not repository copy. Confirm agreement wording, consent and completion state with its owner (BC12).

**CURRENT:** “Complete this form to confirm your organisation&apos;s participation and agree the next steps with Kent Business College.”

**PROPOSED:** Retain pending owner review of the embedded form’s exact legal effect.

**REASON:** SCOPE LIMIT: the external Zoho form is not repository copy. Confirm agreement wording, consent and completion state with its owner (BC12).

**SEVERITY:** Medium

**EVIDENCE:** `frontend/src/pages/employer-agreement/components/ForEmployers.tsx:15`

## PAGE: governance-board

Routes: `/governance-board`.

**PURPOSE:** Explain board contribution and recruit interest.

**AUDIENCE:** Experienced governance candidates.

**PRIMARY ACTION:** Submit an expression of interest.

**WHAT WORKS:** Responsibilities, expertise and commitment are separated.

**PROBLEMS:** BUSINESS CONFIRMATION: distinguish KBC board remit from College marketing; verify current recruitment status and external EOI form (BC01/14).

**CURRENT:** “Four formal Board meetings per year.”

**PROPOSED:** Retain pending confirmation of meeting, committee and appointment terms.

**REASON:** BUSINESS CONFIRMATION: distinguish KBC board remit from College marketing; verify current recruitment status and external EOI form (BC01/14).

**SEVERITY:** Medium

**EVIDENCE:** `frontend/src/pages/governance-board/components/TimeCommitment.tsx:2`

## PAGE: ipc

Routes: `/institute-of-project-controls`, `/ipc`.

**PURPOSE:** Explain IPC and links to professional development.

**AUDIENCE:** Learners and professionals considering membership.

**PRIMARY ACTION:** Visit IPC or explore programmes.

**WHAT WORKS:** Membership is explicitly subject to Institute criteria.

**PROBLEMS:** BUSINESS AMBIGUITY: the shared block calls IPC a globally trusted accreditation body; confirm the exact accreditation and recognition scope (BC07).

**CURRENT:** “Membership criteria, assessment and fees are set and administered by the Institute of Project Controls.”

**PROPOSED:** Retain this qualification and apply equally precise scope to the shared IPC authority section.

**REASON:** BUSINESS AMBIGUITY: the shared block calls IPC a globally trusted accreditation body; confirm the exact accreditation and recognition scope (BC07).

**SEVERITY:** High

**EVIDENCE:** `frontend/src/pages/ipc/components/Membership.tsx:12`

## PAGE: events

Routes: `/events`.

**PURPOSE:** Help users find relevant events.

**AUDIENCE:** Prospects, learners and employers.

**PRIMARY ACTION:** View an event and its registration options.

**WHAT WORKS:** Filtering and empty-result guidance are actionable.

**PROBLEMS:** UX ISSUE: event availability and registration differ from consultation enquiries. Avoid replacing functional empty or failed-search states with branding.

**CURRENT:** “No events found”

**PROPOSED:** Retain explicit search feedback; a decorative divider would hide the result of a user’s search.

**REASON:** UX ISSUE: event availability and registration differ from consultation enquiries. Avoid replacing functional empty or failed-search states with branding.

**SEVERITY:** Low

**EVIDENCE:** `frontend/src/pages/events/components/FindEvents.tsx:30`

## PAGE: events/detail

Routes: `/events/:slug`.

**PURPOSE:** Explain an event and its availability.

**AUDIENCE:** People considering attendance.

**PRIMARY ACTION:** Use the event registration destination.

**WHAT WORKS:** Separate event detail and registration states exist.

**PROBLEMS:** DYNAMIC CONTENT: event copy and ticket terms are owned by the event record/Eventbrite. Do not normalise an event’s real registration CTA to a consultation request.

**CURRENT:** “Event unavailable”

**PROPOSED:** Retain a clear unavailable state and a route back to events.

**REASON:** DYNAMIC CONTENT: event copy and ticket terms are owned by the event record/Eventbrite. Do not normalise an event’s real registration CTA to a consultation request.

**SEVERITY:** Low

**EVIDENCE:** `frontend/src/components/feature/SeoManager.tsx:251`

## PAGE: articles

Routes: `/articles`.

**PURPOSE:** Help visitors search the article library.

**AUDIENCE:** Professionals and employers researching options.

**PRIMARY ACTION:** Read a relevant article.

**WHAT WORKS:** Search has clear recovery instructions.

**PROBLEMS:** INFORMATION ARCHITECTURE ISSUE: Articles and Knowledge Hub contain the same ten topics in separate sources; users and editors need a consistent ownership/canonical strategy.

**CURRENT:** “Try a different keyword or clear your search.”

**PROPOSED:** Retain this actionable search feedback.

**REASON:** INFORMATION ARCHITECTURE ISSUE: Articles and Knowledge Hub contain the same ten topics in separate sources; users and editors need a consistent ownership/canonical strategy.

**SEVERITY:** Medium

**EVIDENCE:** `frontend/src/pages/articles/components/ArticleResults.tsx:39`

## PAGE: articles/detail

Routes: `/articles/:slug`.

**PURPOSE:** Present CMS-managed long-form guidance.

**AUDIENCE:** Professionals and employers researching programmes.

**PRIMARY ACTION:** Read guidance and follow the relevant next step.

**WHAT WORKS:** Structured articles expose topic, author and reading information.

**PROBLEMS:** CROSS-PAGE ISSUE: all ten published article bodies were fetched; duration, funding-band and APM-recognition statements repeat static-guide risks. Live records are not automatically rewritten by a source-code change.

**CURRENT:** “The programme typically runs over 24 to 36 months”

**PROPOSED:** REQUIRES BUSINESS CONFIRMATION: align approved facts across CMS article bodies and static guides after BC03/05/07 are settled.

**REASON:** CROSS-PAGE ISSUE: all ten published article bodies were fetched; duration, funding-band and APM-recognition statements repeat static-guide risks. Live records are not automatically rewritten by a source-code change.

**SEVERITY:** High

**EVIDENCE:** Page source: `frontend/src/pages/articles/detail/`; related shared or CMS text is noted in the finding.

## PAGE: knowledge-hub

Routes: `/knowledge-hub`.

**PURPOSE:** Organise guidance by decision/topic.

**AUDIENCE:** Visitors researching programmes, sectors and access.

**PRIMARY ACTION:** Choose a relevant guide.

**WHAT WORKS:** Topic-based entry points help exploration.

**PROBLEMS:** INFORMATION ARCHITECTURE ISSUE: duplicate `/articles` and `/knowledge-hub` versions need an agreed source and publication workflow; preserve existing routes meanwhile.

**CURRENT:** “Project Controls Knowledge Hub”

**PROPOSED:** Retain the topic structure; differentiate programme comparison, employer funding and sector application guides.

**REASON:** INFORMATION ARCHITECTURE ISSUE: duplicate `/articles` and `/knowledge-hub` versions need an agreed source and publication workflow; preserve existing routes meanwhile.

**SEVERITY:** Medium

**EVIDENCE:** `frontend/src/components/feature/SeoManager.tsx:115`

## PAGE: testimonials

Routes: `/testimonials`.

**PURPOSE:** Present approved experiences and accept new reviews.

**AUDIENCE:** Prospective learners, employers and former learners.

**PRIMARY ACTION:** Read or submit a review.

**WHAT WORKS:** Submission consent and publication approval are explicit.

**PROBLEMS:** REFERENCE WORKFLOW: do not rewrite approved quotations or imply that illustrative workplace scenarios are actual testimonials.

**CURRENT:** “Your review has been sent to our team. It will appear on the website only after approval.”

**PROPOSED:** Retain this confirmation and the approval distinction.

**REASON:** REFERENCE WORKFLOW: do not rewrite approved quotations or imply that illustrative workplace scenarios are actual testimonials.

**SEVERITY:** Low

**EVIDENCE:** `frontend/src/components/feature/TestimonialSubmission.tsx:23`

## PAGE: mentors/detail

Routes: `/mentors/:id`.

**PURPOSE:** Explain an individual mentor’s contribution.

**AUDIENCE:** Prospective and current learners.

**PRIMARY ACTION:** Review profile and explore relevant development.

**WHAT WORKS:** An unavailable profile has a clear state.

**PROBLEMS:** DYNAMIC CONTENT: changing a shared paragraph must not alter a person’s approved biography (BC14). Individual live biographies were not edited.

**CURRENT:** “This mentor profile is not available”

**PROPOSED:** Retain the state; confirm current biographies, credentials and programme participation through the dedicated editor.

**REASON:** DYNAMIC CONTENT: changing a shared paragraph must not alter a person’s approved biography (BC14). Individual live biographies were not edited.

**SEVERITY:** Low

**EVIDENCE:** `frontend/src/pages/mentors/detail/components/MentorProfile.tsx:13`

## PAGE: not-found

Routes: `*`.

**PURPOSE:** Recover from an invalid route.

**AUDIENCE:** Any visitor following a broken link.

**PRIMARY ACTION:** Return to a working route.

**WHAT WORKS:** Offers a clear recovery message.

**PROBLEMS:** UX ISSUE: error and empty collection are different states. No business claim or content rewrite is needed.

**CURRENT:** “Let&apos;s get you back to the right route.”

**PROPOSED:** Retain; no decorative empty state should replace navigation recovery.

**REASON:** UX ISSUE: error and empty collection are different states. No business claim or content rewrite is needed.

**SEVERITY:** Low

**EVIDENCE:** `frontend/src/pages/not-found/components/PageNotFound.tsx:20`

## PAGE: campaign/commercial-route

Routes: `/commercial-project-controls-route`, `/campaign/commercial-route`.

**PURPOSE:** Explain access without apprenticeship funding.

**AUDIENCE:** Self-funded, self-employed and other commercial applicants.

**PRIMARY ACTION:** Contact an adviser.

**WHAT WORKS:** Makes an alternative access route visible.

**PROBLEMS:** COMMERCIAL AMBIGUITY: qualification equivalence, exam coverage and costs need approved terms. Simplify generic without/with copy without changing the commercial promise (BC08/09).

**CURRENT:** “No hidden fees or additional assessment costs”

**PROPOSED:** REQUIRES BUSINESS CONFIRMATION: state exact fee inclusions and possible additional examination or assessment charges.

**REASON:** COMMERCIAL AMBIGUITY: qualification equivalence, exam coverage and costs need approved terms. Simplify generic without/with copy without changing the commercial promise (BC08/09).

**SEVERITY:** High

**EVIDENCE:** `frontend/src/pages/campaign/commercial-route/components/CommercialRoute.tsx:40`

## PAGE: campaign/construction

Routes: `/campaign/construction`.

**PURPOSE:** Connect project controls development to construction problems.

**AUDIENCE:** Construction employers and delivery teams.

**PRIMARY ACTION:** Request an employer consultation.

**WHAT WORKS:** NEC, schedules, interfaces and reporting are concrete.

**PROBLEMS:** COPY ISSUE: avoid presenting training as a guaranteed cure for delays or cost drift. Retain role-specific subject matter; verify limited-support allocation (BC10).

**CURRENT:** “These are not inevitable. They are capability gaps the Operational PCP route closes.”

**PROPOSED:** Develop planning, cost and change-control skills to address these construction challenges.

**REASON:** COPY ISSUE: avoid presenting training as a guaranteed cure for delays or cost drift. Retain role-specific subject matter; verify limited-support allocation (BC10).

**SEVERITY:** High

**EVIDENCE:** `frontend/src/pages/campaign/construction/components/ConstructionDeliveryProblemsThatStrongerControlsSolve.tsx:9`

## PAGE: campaign/energy

Routes: `/campaign/energy`.

**PURPOSE:** Connect controls development to energy programmes.

**AUDIENCE:** Energy and utilities employers.

**PRIMARY ACTION:** Request an employer consultation.

**WHAT WORKS:** Outages, commissioning and contractor interfaces are relevant.

**PROBLEMS:** COPY ISSUE: replace a dismissive comparison with specific information. Confirm regulatory-scope and support claims separately.

**CURRENT:** “The difference between hoping for the best and building the capability to control delivery.”

**PROPOSED:** Connect cost, schedule and risk information to support decisions across capital programmes.

**REASON:** COPY ISSUE: replace a dismissive comparison with specific information. Confirm regulatory-scope and support claims separately.

**SEVERITY:** Medium

**EVIDENCE:** `frontend/src/pages/campaign/energy/components/CapitalProgrammesWithoutIntegratedControlsVsCapitalProgrammesWithIntegratedControls.tsx:9`

## PAGE: campaign/head-of-pmo

Routes: `/campaign/head-of-pmo`.

**PURPOSE:** Explain PMO development to functional leaders.

**AUDIENCE:** Heads of PMO and governance leads.

**PRIMARY ACTION:** Request a PMO consultation.

**WHAT WORKS:** Examples connect reporting to decisions.

**PROBLEMS:** BUSINESS AMBIGUITY: this campaign inherits the PMO recognition issue; do not infer approval from an authoring source (BC07).

**CURRENT:** “APM Recognised Assessment Centre support”

**PROPOSED:** REQUIRES BUSINESS CONFIRMATION: identify the exact provider and recognised assessment before approving this claim.

**REASON:** BUSINESS AMBIGUITY: this campaign inherits the PMO recognition issue; do not infer approval from an authoring source (BC07).

**SEVERITY:** Critical

**EVIDENCE:** `frontend/src/pages/campaign/head-of-pmo/campaignData.ts:33`; `frontend/src/pages/campaign/head-of-pmo/campaignData.ts:43`; `frontend/src/pages/campaign/head-of-pmo/campaignData.ts:48`; `frontend/src/pages/campaign/head-of-pmo/components/APMRecognisedAssessmentCentre.tsx:12`

## PAGE: campaign/hr-employer

Routes: `/campaign/hr-employer`.

**PURPOSE:** Help employers use development against capability needs.

**AUDIENCE:** HR, L&D and organisational leaders.

**PRIMARY ACTION:** Request an employer consultation.

**WHAT WORKS:** Role and capability priorities frame a workforce decision.

**PROBLEMS:** COMMERCIAL AMBIGUITY: generic value language obscures the difference between government funding, College support and discretionary bursaries (BC08).

**CURRENT:** “KBC added support value included”

**PROPOSED:** REQUIRES BUSINESS CONFIRMATION: list only benefits included in the applicable written offer.

**REASON:** COMMERCIAL AMBIGUITY: generic value language obscures the difference between government funding, College support and discretionary bursaries (BC08).

**SEVERITY:** High

**EVIDENCE:** `frontend/src/pages/campaign/hr-employer/campaignData.ts:4`

## PAGE: campaign/public-sector

Routes: `/campaign/public-sector`.

**PURPOSE:** Connect project controls to public accountability.

**AUDIENCE:** Public-sector employers and teams.

**PRIMARY ACTION:** Request an employer consultation.

**WHAT WORKS:** Governance and scrutiny are contextually relevant.

**PROBLEMS:** BUSINESS CLAIM: scarcity should have evidence; separate illustrative benefits from guaranteed public-sector outcomes (BC10).

**CURRENT:** “Limited KBC-funded support available”

**PROPOSED:** REQUIRES BUSINESS CONFIRMATION: verify the allocation, availability and expiry before using urgency.

**REASON:** BUSINESS CLAIM: scarcity should have evidence; separate illustrative benefits from guaranteed public-sector outcomes (BC10).

**SEVERITY:** High

**EVIDENCE:** `frontend/src/pages/campaign/public-sector/components/ForCouncilsLocalAuthoritiesAndPublicSectorProgrammeTeams.tsx:18`

## PAGE: operational-pcp-construction

Routes: `/project-controls-professional/construction-route`, `/operational-pcp-construction`.

**PURPOSE:** Explain relevant pathways in construction.

**AUDIENCE:** Construction and infrastructure professionals/employers.

**PRIMARY ACTION:** Request a capability conversation.

**WHAT WORKS:** Practical outputs and confidentiality context are strong.

**PROBLEMS:** COPY ISSUE: remove the stray article; change booking labels to requests. Keep specific NEC/assessment/funding claims for confirmation.

**CURRENT:** “The AI in Project Controls develops responsible use of AI”

**PROPOSED:** AI in Project Controls develops responsible use of AI

**REASON:** COPY ISSUE: remove the stray article; change booking labels to requests. Keep specific NEC/assessment/funding claims for confirmation.

**SEVERITY:** Low

**EVIDENCE:** `frontend/src/pages/operational-pcp-construction/components/CoreProfessionalCapability.tsx:13`

## PAGE: operational-pcp-energy

Routes: `/project-controls-professional/energy-oil-gas-utilities-route`, `/operational-pcp-energy`.

**PURPOSE:** Explain pathways in energy delivery.

**AUDIENCE:** Energy and utilities professionals/employers.

**PRIMARY ACTION:** Request a capability conversation.

**WHAT WORKS:** Sector examples describe interfaces and integrated controls.

**PROBLEMS:** CTA MISMATCH: preserve the enquiry destination. Confirm bursary allocation and instalment terms separately from curriculum.

**CURRENT:** “Book a capability conversation”

**PROPOSED:** Request a capability conversation

**REASON:** CTA MISMATCH: preserve the enquiry destination. Confirm bursary allocation and instalment terms separately from curriculum.

**SEVERITY:** Medium

**EVIDENCE:** `frontend/src/pages/operational-pcp-energy/components/EmployerCapability.tsx:108`

## PAGE: operational-pcp-engineering

Routes: `/project-controls-professional/engineering-manufacturing-aerospace-route`, `/operational-pcp-engineering`.

**PURPOSE:** Explain integrated controls in engineering.

**AUDIENCE:** Engineering, manufacturing and aerospace teams.

**PRIMARY ACTION:** Request a team consultation.

**WHAT WORKS:** Application domains distinguish technical contexts.

**PROBLEMS:** COPY ISSUE: shorter, subject-specific headline. Treat ISO/GxP references as application context, not a qualification or compliance guarantee.

**CURRENT:** “Control complex engineering programmes with precision, integration and confidence.”

**PROPOSED:** Build integrated project controls skills for complex engineering programmes.

**REASON:** COPY ISSUE: shorter, subject-specific headline. Treat ISO/GxP references as application context, not a qualification or compliance guarantee.

**SEVERITY:** Medium

**EVIDENCE:** `frontend/src/pages/operational-pcp-engineering/components/EngineeringAdvancedManufacturing.tsx:8`

## PAGE: operational-pcp-public-sector

Routes: `/project-controls-professional/public-sector-councils-route`, `/operational-pcp-public-sector`.

**PURPOSE:** Explain Level 4/6 role fit for public services.

**AUDIENCE:** Public-sector project teams and employers.

**PRIMARY ACTION:** Request an employer capability review.

**WHAT WORKS:** Clearly distinguishes coordinating roles from integrated controls roles.

**PROBLEMS:** COPY ISSUE: orphan source text is visible in prose. Preserve illustrative-case and conditional-funding qualifiers.

**CURRENT:** “Employer-confirmed impact”

**PROPOSED:** Remove the trailing orphan label from the FAQ answer; retain the actual evidence explanation.

**REASON:** COPY ISSUE: orphan source text is visible in prose. Preserve illustrative-case and conditional-funding qualifiers.

**SEVERITY:** Medium

**EVIDENCE:** `frontend/src/pages/operational-pcp-public-sector/components/EmployerQuestions.tsx:3`

## PAGE: legal/privacy

Routes: `/privacy`.

**PURPOSE:** Explain personal-information handling.

**AUDIENCE:** Visitors submitting information.

**PRIMARY ACTION:** Understand use and contact the privacy team.

**WHAT WORKS:** Includes AI disclosure and review publication consent.

**PROBLEMS:** POLICY COMPLETENESS: preserve existing rights and disclosure text; no legal policy is invented by this audit (BC12).

**CURRENT:** “We retain personal data only for as long as it is needed”

**PROPOSED:** REQUIRES BUSINESS CONFIRMATION: approve controller, retention and external-provider details.

**REASON:** POLICY COMPLETENESS: preserve existing rights and disclosure text; no legal policy is invented by this audit (BC12).

**SEVERITY:** High

**EVIDENCE:** Page source: `frontend/src/pages/legal/privacy/`; related shared or CMS text is noted in the finding.

## PAGE: legal/terms

Routes: `/terms`.

**PURPOSE:** Explain limits of site information.

**AUDIENCE:** All visitors.

**PRIMARY ACTION:** Read conditions before relying on information.

**WHAT WORKS:** Funding and enrolment conditions are distinct.

**PROBLEMS:** CROSS-PAGE ISSUE: a general disclaimer cannot resolve a specific promise about included examinations or costs (BC09/12).

**CURRENT:** “Availability, eligibility, content, schedules and fees are confirmed during the formal enquiry and enrolment process.”

**PROPOSED:** Retain; verify that programme and commercial pages do not contradict it.

**REASON:** CROSS-PAGE ISSUE: a general disclaimer cannot resolve a specific promise about included examinations or costs (BC09/12).

**SEVERITY:** Medium

**EVIDENCE:** Page source: `frontend/src/pages/legal/terms/`; related shared or CMS text is noted in the finding.

## PAGE: legal/cookies

Routes: `/cookies`.

**PURPOSE:** Explain browser storage and measurement.

**AUDIENCE:** All visitors.

**PRIMARY ACTION:** Understand storage choices.

**WHAT WORKS:** Mentions browser controls and external services.

**PROBLEMS:** POLICY/UX ISSUE: this is an instruction to the implementer, not a disclosure of actual behaviour; do not guess deployed consent state (BC12).

**CURRENT:** “Analytics should be configured with an appropriate consent mechanism before production use.”

**PROPOSED:** REQUIRES BUSINESS CONFIRMATION: replace implementation advice with a factual description of the deployed analytics and consent arrangement.

**REASON:** POLICY/UX ISSUE: this is an instruction to the implementer, not a disclosure of actual behaviour; do not guess deployed consent state (BC12).

**SEVERITY:** High

**EVIDENCE:** Page source: `frontend/src/pages/legal/cookies/`; related shared or CMS text is noted in the finding.

## PAGE: legal/accessibility

Routes: `/accessibility`.

**PURPOSE:** Explain access and support.

**AUDIENCE:** Visitors with access needs.

**PRIMARY ACTION:** Report a barrier or request another format.

**WHAT WORKS:** Provides a practical contact route.

**PROBLEMS:** REFERENCE COPY: accessibility commitments should reflect tested behaviour and an owned support process.

**CURRENT:** “If you need programme information or application guidance in another format”

**PROPOSED:** Retain practical support wording; do not add an unverified WCAG compliance claim.

**REASON:** REFERENCE COPY: accessibility commitments should reflect tested behaviour and an owned support process.

**SEVERITY:** Low

**EVIDENCE:** Page source: `frontend/src/pages/legal/accessibility/`; related shared or CMS text is noted in the finding.

## PAGE: knowledge-hub/what-is-pcp-apprenticeship

Routes: `/knowledge-hub/what-is-pcp-apprenticeship`.

**PURPOSE:** Explain the Level 6 apprenticeship.

**AUDIENCE:** Prospective learners and employers.

**PRIMARY ACTION:** Explore Level 6 or request advice.

**WHAT WORKS:** Workplace evidence and independent ChPP assessment are explained.

**PROBLEMS:** COPY ISSUE: remove a repeated heading; retain the conditional funding paragraph. Duration, band number and new-entrant suitability need BC02/03/05.

**CURRENT:** “Funding: Funding Subject to Eligibility”

**PROPOSED:** Apprenticeship funding

**REASON:** COPY ISSUE: remove a repeated heading; retain the conditional funding paragraph. Duration, band number and new-entrant suitability need BC02/03/05.

**SEVERITY:** High

**EVIDENCE:** `frontend/src/pages/knowledge-hub/what-is-pcp-apprenticeship/components/FundingFundingSubjectToEligibility.tsx:5`

## PAGE: knowledge-hub/funded-pcp-employer-guide

Routes: `/knowledge-hub/fully-funded-project-controls-apprenticeship`, `/knowledge-hub/funded-pcp-employer-guide`.

**PURPOSE:** Explain employer funding access.

**AUDIENCE:** HR, L&D and employers.

**PRIMARY ACTION:** Request funding guidance.

**WHAT WORKS:** Distinguishes levy and non-levy contexts.

**PROBLEMS:** FACTUAL ISSUE: do not silently substitute a band. Residency, English/maths and employer-location claims also require the approved checklist (BC05/06).

**CURRENT:** “Funding Band 11”

**PROPOSED:** REQUIRES BUSINESS CONFIRMATION: confirm the correct funding-band reference and amount for the applicable standard/intake.

**REASON:** FACTUAL ISSUE: do not silently substitute a band. Residency, English/maths and employer-location claims also require the approved checklist (BC05/06).

**SEVERITY:** Critical

**EVIDENCE:** `frontend/src/pages/knowledge-hub/funded-pcp-employer-guide/components/HowApprenticeshipFundingWorks.tsx:7`; `frontend/src/pages/knowledge-hub/funded-pcp-employer-guide/components/QuickSummary.tsx:9`

## PAGE: knowledge-hub/employer-apprenticeship-funding

Routes: `/knowledge-hub/employer-apprenticeship-funding`.

**PURPOSE:** Explain the employer funding decision and steps.

**AUDIENCE:** HR and workforce-development leaders.

**PRIMARY ACTION:** Request an employer consultation.

**WHAT WORKS:** Focuses on identifying roles and capability needs.

**PROBLEMS:** COPY ISSUE: prefer plain language. Verify the levy-expiry rule and distinguish this process guide from the other employer funding guide (BC05).

**CURRENT:** “leverage apprenticeship funding”

**PROPOSED:** use apprenticeship funding

**REASON:** COPY ISSUE: prefer plain language. Verify the levy-expiry rule and distinguish this process guide from the other employer funding guide (BC05).

**SEVERITY:** Medium

**EVIDENCE:** `frontend/src/pages/knowledge-hub/employer-apprenticeship-funding/components/EmployerDecisionGuides.tsx:14`

## PAGE: knowledge-hub/pcp-vs-pmp

Routes: `/knowledge-hub/project-controls-level-6-vs-pmp`, `/knowledge-hub/pcp-vs-pmp`.

**PURPOSE:** Compare a development pathway with exam preparation.

**AUDIENCE:** Professionals selecting development.

**PRIMARY ACTION:** Discuss programme fit.

**WHAT WORKS:** The comparison recognises different purposes.

**PROBLEMS:** FACTUAL/FAIRNESS ISSUE: the L6 detail page says 27 months; comparative recognition and quicker-qualification claims need evidence, not a sales conclusion (BC03/07/10).

**CURRENT:** “24-36 months”

**PROPOSED:** REQUIRES BUSINESS CONFIRMATION: use the approved programme schedule and describe comparison criteria consistently.

**REASON:** FACTUAL/FAIRNESS ISSUE: the L6 detail page says 27 months; comparative recognition and quicker-qualification claims need evidence, not a sales conclusion (BC03/07/10).

**SEVERITY:** High

**EVIDENCE:** `frontend/src/pages/knowledge-hub/pcp-vs-pmp/components/SideBySideComparison.tsx:24`

## PAGE: knowledge-hub/apm-chpp-readiness

Routes: `/knowledge-hub/apm-chpp-readiness-support`, `/knowledge-hub/apm-chpp-readiness`.

**PURPOSE:** Explain readiness versus an independent award.

**AUDIENCE:** Professionals considering ChPP progression.

**PRIMARY ACTION:** Explore relevant support.

**WHAT WORKS:** Clearly states that ChPP is not automatic.

**PROBLEMS:** COPY ISSUE: avoid unsupported competitor criticism. Preserve the substantive limits of readiness support (BC07).

**CURRENT:** “Some providers blur the line between preparation and guarantee.”

**PROPOSED:** Readiness support helps you prepare evidence; APM decides eligibility and awards ChPP through its own assessment.

**REASON:** COPY ISSUE: avoid unsupported competitor criticism. Preserve the substantive limits of readiness support (BC07).

**SEVERITY:** Medium

**EVIDENCE:** `frontend/src/pages/knowledge-hub/apm-chpp-readiness/components/HonestyAboutProfessionalRecognitionMatters.tsx:13`

## PAGE: knowledge-hub/strategic-vs-operational

Routes: `/knowledge-hub/strategic-vs-operational`.

**PURPOSE:** Compare responsibility and pathway emphasis.

**AUDIENCE:** Professionals choosing between pathways.

**PRIMARY ACTION:** Compare pathways or request advice.

**WHAT WORKS:** Hands-on versus strategic decision work is understandable.

**PROBLEMS:** COPY ISSUE: describe the decision rather than implying determined career outcomes. Verify combined-route workload and availability separately.

**CURRENT:** “Two Pathways. One Professional Standard. Different Career Outcomes.”

**PROPOSED:** Strategic and operational pathways: different responsibilities

**REASON:** COPY ISSUE: describe the decision rather than implying determined career outcomes. Verify combined-route workload and availability separately.

**SEVERITY:** Medium

**EVIDENCE:** `frontend/src/pages/knowledge-hub/strategic-vs-operational/components/TwoPathwaysOneProfessionalStandardDifferentCareerOutcomes.tsx:5`

## PAGE: knowledge-hub/construction-training

Routes: `/knowledge-hub/construction-training`.

**PURPOSE:** Explain applied construction development.

**AUDIENCE:** Construction teams and employers.

**PRIMARY ACTION:** Explore the construction route.

**WHAT WORKS:** Scheduling, change and progress examples are concrete.

**PROBLEMS:** COPY ISSUE: avoids blaming all delay on staff capability. Preserve specific practical techniques and do not promise contractual compliance.

**CURRENT:** “Stop Letting Schedule Delays and Cost Drift Become Normal”

**PROPOSED:** Build stronger planning, cost and change-control skills

**REASON:** COPY ISSUE: avoids blaming all delay on staff capability. Preserve specific practical techniques and do not promise contractual compliance.

**SEVERITY:** Medium

**EVIDENCE:** `frontend/src/pages/knowledge-hub/construction-training/components/StopLettingScheduleDelaysAndCostDriftBecomeNormal.tsx:5`

## PAGE: knowledge-hub/energy-training

Routes: `/knowledge-hub/energy-training`.

**PURPOSE:** Explain controls development for energy projects.

**AUDIENCE:** Energy and utilities teams.

**PRIMARY ACTION:** Explore the energy route.

**WHAT WORKS:** Risk, assurance and integrated-baseline examples are useful.

**PROBLEMS:** COPY ISSUE: lead with the offer, not a threat. Do not imply safety or regulatory certification.

**CURRENT:** “For Capital Programmes Where Weak Controls Are Too Expensive to Ignore”

**PROPOSED:** Project controls skills for complex energy programmes

**REASON:** COPY ISSUE: lead with the offer, not a threat. Do not imply safety or regulatory certification.

**SEVERITY:** Medium

**EVIDENCE:** `frontend/src/pages/knowledge-hub/energy-training/components/ForCapitalProgrammesWhereWeakControlsAreTooExpensiveToIgnore.tsx:5`

## PAGE: knowledge-hub/pmo-governance-training

Routes: `/knowledge-hub/pmo-governance-training`.

**PURPOSE:** Explain PMO governance capability.

**AUDIENCE:** PMO leaders and practitioners.

**PRIMARY ACTION:** Discuss the PMO route.

**WHAT WORKS:** Shows why decisions need more than reporting.

**PROBLEMS:** FACTUAL ISSUE: repeats on the published CMS article and differs from Chartered pathway wording (BC07).

**CURRENT:** “The PMO & Governance PCP route is delivered through an APM Recognised Assessment Centre.”

**PROPOSED:** REQUIRES BUSINESS CONFIRMATION: confirm provider and assessment recognition; preserve the separate ChPP-award condition.

**REASON:** FACTUAL ISSUE: repeats on the published CMS article and differs from Chartered pathway wording (BC07).

**SEVERITY:** Critical

**EVIDENCE:** `frontend/src/pages/knowledge-hub/pmo-governance-training/components/APMRecognition.tsx:7`

## PAGE: knowledge-hub/commercial-routes-explained

Routes: `/knowledge-hub/commercial-routes-explained`.

**PURPOSE:** Explain access and payment outside apprenticeship funding.

**AUDIENCE:** Commercial applicants.

**PRIMARY ACTION:** Explore commercial options.

**WHAT WORKS:** Makes alternatives and conditional bursaries visible.

**PROBLEMS:** COPY ISSUE: describe the available route without a patronising entitlement message. Confirm fees, scope and equivalent recognition (BC08/09).

**CURRENT:** “You Still Deserve Professional Project Controls Development.”

**PROPOSED:** Explore professional development through the commercial route.

**REASON:** COPY ISSUE: describe the available route without a patronising entitlement message. Confirm fees, scope and equivalent recognition (BC08/09).

**SEVERITY:** Medium

**EVIDENCE:** `frontend/src/pages/knowledge-hub/commercial-routes-explained/components/NotEligibleForApprenticeshipFundingYouStillDeserveProfessionalProjectControlsDevelopment.tsx:5`

## PAGE: faq

Routes: `/faq`.

**PURPOSE:** Answer recurring questions by topic.

**AUDIENCE:** Prospective learners and employers.

**PRIMARY ACTION:** Find an answer or request a consultation.

**WHAT WORKS:** Qualified funding and award language is consistently clear.

**PROBLEMS:** CTA MISMATCH: align the question and response with the actual enquiry workflow; retain useful category-based navigation.

**CURRENT:** “What happens after I book a session?”

**PROPOSED:** What happens after I request a consultation?

**REASON:** CTA MISMATCH: align the question and response with the actual enquiry workflow; retain useful category-based navigation.

**SEVERITY:** Medium

**EVIDENCE:** `frontend/src/pages/faq/components/BrowseByTopicData.ts:86`

## PAGE: thank-you/commercial

Routes: `/thank-you/commercial`.

**PURPOSE:** Explain the status of a commercial enquiry.

**AUDIENCE:** Visitors completing or opening a request status page.

**PRIMARY ACTION:** Review the next step.

**WHAT WORKS:** The shared status component does not pretend a direct page visit submitted a request.

**PROBLEMS:** FUNCTIONAL COPY: preserve pending, received and download states; an event enquiry is not a confirmed Eventbrite registration.

**CURRENT:** “No completed request to display”

**PROPOSED:** Retain the state and receipt-based distinction.

**REASON:** FUNCTIONAL COPY: preserve pending, received and download states; an event enquiry is not a confirmed Eventbrite registration.

**SEVERITY:** Low

**EVIDENCE:** `frontend/src/components/feature/RequestStatus.tsx:9`

## PAGE: thank-you/consultation

Routes: `/thank-you/consultation`.

**PURPOSE:** Explain the status of a consultation request.

**AUDIENCE:** Visitors completing or opening a request status page.

**PRIMARY ACTION:** Review the next step.

**WHAT WORKS:** The shared status component does not pretend a direct page visit submitted a request.

**PROBLEMS:** FUNCTIONAL COPY: preserve pending, received and download states; an event enquiry is not a confirmed Eventbrite registration.

**CURRENT:** “No completed request to display”

**PROPOSED:** Retain the state and receipt-based distinction.

**REASON:** FUNCTIONAL COPY: preserve pending, received and download states; an event enquiry is not a confirmed Eventbrite registration.

**SEVERITY:** Low

**EVIDENCE:** `frontend/src/components/feature/RequestStatus.tsx:9`

## PAGE: thank-you/eligibility

Routes: `/thank-you/eligibility`.

**PURPOSE:** Explain the status of a eligibility enquiry.

**AUDIENCE:** Visitors completing or opening a request status page.

**PRIMARY ACTION:** Review the next step.

**WHAT WORKS:** The shared status component does not pretend a direct page visit submitted a request.

**PROBLEMS:** FUNCTIONAL COPY: preserve pending, received and download states; an event enquiry is not a confirmed Eventbrite registration.

**CURRENT:** “No completed request to display”

**PROPOSED:** Retain the state and receipt-based distinction.

**REASON:** FUNCTIONAL COPY: preserve pending, received and download states; an event enquiry is not a confirmed Eventbrite registration.

**SEVERITY:** Low

**EVIDENCE:** `frontend/src/components/feature/RequestStatus.tsx:9`

## PAGE: thank-you/eventbrite

Routes: `/thank-you/eventbrite`.

**PURPOSE:** Explain the status of a event registration request.

**AUDIENCE:** Visitors completing or opening a request status page.

**PRIMARY ACTION:** Review the next step.

**WHAT WORKS:** The shared status component does not pretend a direct page visit submitted a request.

**PROBLEMS:** FUNCTIONAL COPY: preserve pending, received and download states; an event enquiry is not a confirmed Eventbrite registration.

**CURRENT:** “No completed request to display”

**PROPOSED:** Retain the state and receipt-based distinction.

**REASON:** FUNCTIONAL COPY: preserve pending, received and download states; an event enquiry is not a confirmed Eventbrite registration.

**SEVERITY:** Low

**EVIDENCE:** `frontend/src/components/feature/RequestStatus.tsx:9`

## PAGE: thank-you/guide

Routes: `/thank-you/guide`.

**PURPOSE:** Explain the status of a programme guide request.

**AUDIENCE:** Visitors completing or opening a request status page.

**PRIMARY ACTION:** Review the next step.

**WHAT WORKS:** The shared status component does not pretend a direct page visit submitted a request.

**PROBLEMS:** FUNCTIONAL COPY: preserve pending, received and download states; an event enquiry is not a confirmed Eventbrite registration.

**CURRENT:** “No completed request to display”

**PROPOSED:** Retain the state and receipt-based distinction.

**REASON:** FUNCTIONAL COPY: preserve pending, received and download states; an event enquiry is not a confirmed Eventbrite registration.

**SEVERITY:** Low

**EVIDENCE:** `frontend/src/components/feature/RequestStatus.tsx:9`

## Additional findings: events, shared components and publishing sources

**EVENTS ? High/Critical (BC15):** The four public records are Eventbrite-owned. Two promote CIM marketing qualifications, which introduces a different College audience and offer into a project-controls journey. The general funding event claims number-one UK learner numbers, satisfaction and retention. The PMP/AI event describes an 8,000 GBP total, 7,000 GBP DfE support, 1,000 GBP KBC support and a 70% bursary; the shared website block uses other support percentages. Marketing event descriptions advertise only 20/40 funded places. Confirm scope, evidence, dates and terms at source. Do not substitute unrelated website funding text into these event records.

**GLOBAL NAVIGATION/FOOTER ? Medium:** Menu groupings distinguish programmes, pathways, sectors and resources, but PMO programme naming needs BC02. Footer updates are explicitly a request rather than an automatic mailing-list subscription; retain that distinction. Do not normalise real event-registration or download labels to consultation requests.

**SHARED FUNDING/IPC ? Critical/High:** Separate commercial tuition value, apprenticeship funding maximum and discretionary bursary contributions. The phrase four-credit course does not clearly reconcile with the internal four-month credit definition. IPC professional-body and global accreditation claims require BC05/07/08; no speculative factual rewrites were applied.

**FORMS/ERRORS ? Low/Medium:** Enquiry receipts, consent, failed searches and unpublished-content states communicate useful functional information. Keep them, even though empty promotional collections now use a decorative divider. Contact guidance was corrected to match actual fields and the enquiry workflow. External Zoho agreement/EOI contents require owner review and were not scraped or submitted.

**DASHBOARD ? Low:** Draft versus publish, retry preservation, unread request handling and testimonial consent are clearly distinguished. Page-editor help did not mention the new link setting; it now does. Technical labels used by staff are intentional and should not be removed as public marketing filler.

**CHATBOT ? High:** The checked-in website snapshot and active knowledge records are separate from page defaults. A source-code copy edit does not refresh the assistant. Confirm the disputed facts before re-exporting approved pages and reviewing/activating replacement knowledge. No paid AI calls, private conversations or source activations were performed during this audit.

**SEEDS/HISTORICAL SOURCES ? Medium:** Article seeds, static guide components and live article records contain overlapping subjects. Historical source-adoption scripts can also restore old wording if re-run. Preserve source archives and migrations as history; use the current approved copy plus a deliberate import/review workflow, rather than treating an old seed as the current approved offer.

**PUBLIC MENTOR AND RECOGNITION RECORDS ? High (BC07/14):** All three active mentor records link to the LinkedIn homepage rather than the named professional profile. Obtain verified profile URLs, current roles and approved biographies; do not guess a social profile. All eight active recognition records have blank name, role and link fields, leaving image-only assertions without explanatory scope. Obtain an approved description and appropriate destination for each mark. Twenty-six active partner logos require permission and relationship records; the audit does not establish endorsement from their presence. No coach records are currently active. Four sector descriptions are concise and useful.
