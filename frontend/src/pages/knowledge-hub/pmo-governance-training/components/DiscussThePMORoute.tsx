import ArticleCta from '@/components/feature/ArticleCta';

/** Section: Discuss the PMO Route. */
export default function DiscussThePMORoute() {
  return (
    <ArticleCta
            title="Discuss the PMO Route"
            body="Speak to an adviser about how the PMO & Governance PCP route strengthens your team's decision-support and governance capability."
            primaryCta={{ label: 'Discuss the PMO Route', href: '/project-controls-professional-level-6#consultation', tracking: 'book_consultation_click' }}
            secondaryCta={{ label: 'Explore the PMO PCP Route', href: '/pmo-pcp', tracking: 'pmo_route_click' }}
          />
  );
}
