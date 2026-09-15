import SiteLink from '@/components/base/SiteLink';

/** Section: Next Steps. */
export default function NextSteps() {
  return (
    <><h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Next Steps</h3>
        <p className="mb-4">
          If you are considering a PCP route and want to understand how ChPP readiness support fits your professional development plan, speak to an adviser. Explore the routes that include ChPP readiness support:
        </p>
        <ul className="list-disc pl-5 space-y-1 mb-4 text-foreground-700">
          <li><SiteLink href="/strategic-pcp" className="text-primary-600 hover:text-primary-700 underline">Strategic PCP Route</SiteLink> — Leadership-grade project controls with ChPP readiness</li>
          <li><SiteLink href="/operational-pcp" className="text-primary-600 hover:text-primary-700 underline">Operational PCP Route</SiteLink> — Delivery confidence with professional recognition support</li>
          <li><SiteLink href="/pmo-pcp" className="text-primary-600 hover:text-primary-700 underline">PMO & Governance PCP</SiteLink> — Governance capability with APM recognition pathway</li>
        </ul>
      </>
  );
}
