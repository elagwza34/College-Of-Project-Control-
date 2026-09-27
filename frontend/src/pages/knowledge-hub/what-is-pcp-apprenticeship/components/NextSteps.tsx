import SiteLink from '@/components/base/SiteLink';

/** Section: Next Steps. */
export default function NextSteps() {
  return (
    <><h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Next Steps</h3>
        <p className="mb-4">
          The best way to understand if this is right for you or your team is to explore the routes, check eligibility and speak to an adviser. Visit the{' '}
          <SiteLink href="/project-controls-professional-level-6" className="text-primary-600 hover:text-primary-700 underline">PCP Master Page</SiteLink>{' '}
          for the full programme overview, or explore specific routes:
        </p>
        <ul className="list-disc pl-5 space-y-1 mb-4 text-foreground-700">
          <li><SiteLink href="/strategic-pcp" className="text-primary-600 hover:text-primary-700 underline">Strategic PCP Route</SiteLink> — Leadership-grade project controls</li>
          <li><SiteLink href="/project-controls-professional/operational-route" className="text-primary-600 hover:text-primary-700 underline">Operational PCP Route</SiteLink> — Real delivery confidence</li>
          <li><SiteLink href="/strategic-operational-pcp" className="text-primary-600 hover:text-primary-700 underline">Strategic + Operational PCP</SiteLink> — Technical depth meets leadership</li>
          <li><SiteLink href="/pmo-pcp" className="text-primary-600 hover:text-primary-700 underline">PMO & Governance PCP</SiteLink> — Decision-ready reporting and governance</li>
          <li><SiteLink href="/operational-pcp-construction" className="text-primary-600 hover:text-primary-700 underline">Construction & Urban PCP</SiteLink> — Built for construction reality</li>
          <li><SiteLink href="/operational-pcp-energy" className="text-primary-600 hover:text-primary-700 underline">Energy & Net Zero PCP</SiteLink> — Capital programme control</li>
          <li><SiteLink href="/operational-pcp-public-sector" className="text-primary-600 hover:text-primary-700 underline">Public Sector & Councils PCP</SiteLink> — Public accountability, private rigour</li>
          <li><SiteLink href="/campaign/commercial-route" className="text-primary-600 hover:text-primary-700 underline">Commercial Route</SiteLink> — For self-employed and non-eligible learners</li>
        </ul>
      </>
  );
}
