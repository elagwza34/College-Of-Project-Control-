import SiteLink from '@/components/base/SiteLink';

/** Section: Funding: Funding Subject to Eligibility. */
export default function FundingFundingSubjectToEligibility() {
  return (
    <><h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Funding: Funding Subject to Eligibility</h3>
        <p className="mb-4">
          <strong>Apprenticeship funding may be available, subject to learner, employer and current funding-rule eligibility.</strong> Energy employers can access apprenticeship funding through the Department for Education framework. This makes the energy PCP route a strategically important investment in the project controls capability that protects capital programme value.
        </p>
        <p className="mb-4">
          <SiteLink href="/operational-pcp-energy" className="text-primary-600 hover:text-primary-700 underline font-semibold">Explore the Energy & Net Zero PCP Route →</SiteLink>
        </p>
      </>
  );
}
