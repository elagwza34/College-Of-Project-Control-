# Sector content adoption

The four supplied sector HTML/text files are archived in this directory alongside parsed trees and readable content extracts. Source styles, scripts, navigation, forms and branding are not executed or copied into the application.

Updated pages: construction/infrastructure, energy/utilities, engineering/advanced manufacturing, and public sector. Each uses current site typography, colours, cards, sticky section navigation and shared Footer. Heroes use local photographs, 80vh desktop height and responsive expansion to avoid clipping on small screens.

Sector-specific challenges, applications, workplace outputs, roles, learning, access guidance and FAQs were adopted. All five engineering application domains were extracted as text from the source data declaration without running its script.

Source pathway-credit structures conflict with the recently adopted programme pages. The interactive SectorPathwayChoice uses the current Operational, Strategic and Chartered structures and links to the existing PMO governance route. It replaces source credit builders and duplicated pathway tabs. Funding copy refers to eligibility for the apprenticeship rather than treating internal credits as proof of funding eligibility.

The existing eligibility checker replaces separate source quizzes. Source IPC percentages and instalment terms retain suitability, availability and written-confirmation conditions. Funding and external-recognition copy is user-supplied content, not an independent regulatory audit.

Kent names, addresses, logos and provider-specific ownership claims were removed. Enquiries use existing College booking/contact routes. External source expert portraits were omitted; supplied expertise text remains with cohort-confirmation conditions.

The public-sector template contained repeated, hidden and placeholder material. It was consolidated into role-to-programme routes (Level 4 and Level 6), five capability areas, four governance frameworks, career progression, employer delivery journey, an explicitly illustrative workplace example, funding, career support and six substantive FAQs. Its illustrative testimonial slider is replaced by the existing approved programme-testimonial section in the Footer. The unavailable source career-guide PDF is not advertised as a working download; the career-support CTA opens Contact.

Hero sources: embedded source photographs for construction, engineering and public sector; energy uses the source Pexels photo 4254157, stored locally. No source logo carousel or endorsement presentation was imported.

Validation: TypeScript, targeted ESLint, production build, and Chrome desktop/tablet/mobile checks. Browser coverage includes local images, 80vh desktop heroes, section anchors, FAQ expansion, all four pathway choices, canonical/alias routes, approved testimonials, branding and overflow. Results and screenshots: sectors-validation. Reproduction scripts: adopt-sector-content.py followed by adopt-public-sector-content.py; browser checks: frontend/scripts/sectors-browser.mjs.
