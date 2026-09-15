import SiteLink from '@/components/base/SiteLink';

/** Section: The Employer Case for PMO Capability Investment. */
export default function TheEmployerCaseForPMOCapabilityInvestment() {
  return (
    <><h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">The Employer Case for PMO Capability Investment</h3>
        <p className="mb-4">
          <strong>Build the project controls capability your organisation cannot afford to be without.</strong> A PMO that produces reports is a cost centre. A PMO that produces decision confidence is a strategic asset. The difference is the capability of the people in it.
        </p>
        <p className="mb-4">
          <SiteLink href="/pmo-pcp" className="text-primary-600 hover:text-primary-700 underline font-semibold">Explore the PMO & Governance PCP Route →</SiteLink>
        </p>
      </>
  );
}
