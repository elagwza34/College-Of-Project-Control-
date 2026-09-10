# Strategic and Chartered content adoption

The supplied Strategic Pathway.txt and charted pathway.txt are archived as source HTML and parsed trees in this directory. Their visible curriculum content was adapted into native React pages using the current site colours, typography, cards, navigation and Footer. Source CSS, scripts, fonts and WordPress behaviours are not executed.

- Strategic: 15 sections covering six pathway credits, applied outputs, experts, role fit, eligibility, funding, delivery and enquiries.
- Chartered: 17 sections covering occupational capability, four PMO modules, AI, portfolio management, EVM, evidence, delivery, eligibility and next steps.
- Both heroes use locally stored photographs and an 80vh desktop height. A minimum height and mobile content expansion prevent clipping on short screens.
- Enquiries use local booking/contact routes and the College contact email. Eligibility links open the existing checker. Programme testimonials remain provided by the shared Footer.
- Kent-specific names, addresses, image hosts and certificate branding were removed from the two pages. Provider-specific APM recognition was not transferred to the College: copy distinguishes professional development from separately confirmed recognised assessments and independent ChPP awards.
- Source editorial catalogue instructions and the old publication-review date were omitted from the learner experience. Source expert names and biographies remain, without their externally hosted Kent portraits. The eligibility illustration uses a current site asset.
- Shared Footer affiliation wording and the shared SEO parent-organisation field were removed to keep these pages under College branding. Pathway SEO titles and descriptions were updated.

Source funding, occupational-standard and certification information is user-supplied content, not a newly conducted regulatory audit. Written-offer and independent-award conditions are retained.

Hero photographs reuse the previous pathway configuration's Pexels sources: photo 6285078 (strategic meeting), photo 19357343 (professional documents). Local assets are in frontend/public/images.

Validation: TypeScript, targeted ESLint and production build passed. scripts/pathways-browser.mjs checks every adapted section's text, local image loading, 800px hero at a 1000px viewport, layouts at 1440/768/375px, section anchors, one H1, booking/eligibility links, native details, programme testimonials, canonical/alias routes and removal of Kent references from page content and destinations. Screenshots and results are in pathways-validation; no JavaScript exceptions were reported.
