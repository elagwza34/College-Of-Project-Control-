# Operational Pathway content adoption

Source: user-supplied `Operational Pathway.txt` from the PCP/Pathways folder. `operational-source.html` is an archival copy only; its CSS and scripts are not imported or executed by the application. The extracted tree and text provide a reviewable content reference.

The public operational page now owns this approved copy directly in `frontend/src/pages/operational-pcp/page.tsx`, instead of rendering the older operational configuration from the shared strategic/chartered pathway template. Both `/project-controls-professional/operational-route` and `/operational-pcp` use this page.

All source header and section wording is retained, including:

- Five core credits plus one specialist elective; PMP 2, AI 1, Planning and Control 2, and one of Risk/EVM/PMI-SP 1.
- Credit owners, durations, descriptions and expandable workplace outputs.
- The source's credit-allocation discrepancy note and separate professional-award conditions.
- Roles, capability, evidence, eligibility, employer responsibilities, 2026/27 funding scenarios, gateway and EPA.
- Admissions contact information and the source's information-review date.

Presentation uses existing site tokens, typography, orange actions, dark teal hero/cards, containers, responsive grids, `SiteLink`, `PageSectionNav` and the shared Footer. Approved programme testimonials remain at the bottom through the existing Footer integration. The floating enquiry bar is implemented in React. WordPress/Elementor header detection and inline source CSS are omitted. Decorative source SVGs are omitted; the eligibility illustration retains its source URL with an existing local-image fallback.

The source's booking and eligibility-checker links point to equivalent local pages. The source's email and organisation website links remain intact. No content from this attachment changes other programme pages or backend funding/eligibility logic.

Validation: `frontend/scripts/operational-browser.mjs` compares the complete rendered text of every source header and top-level section against the extracted source, checks all local anchors, module expansion, booking/eligibility links, desktop/tablet/mobile overflow, and canonical/alias routes. Screenshots and results are in `docs/operational-validation`. Source text is preserved as supplied; the content-adoption check is not an independent review of the funding or eligibility statements.
