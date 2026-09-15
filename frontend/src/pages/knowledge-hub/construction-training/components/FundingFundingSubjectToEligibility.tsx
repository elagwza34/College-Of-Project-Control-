import SiteLink from '@/components/base/SiteLink';

/** Section: Funding: Funding Subject to Eligibility. */
export default function FundingFundingSubjectToEligibility() {
  return (
    <><h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Funding: Funding Subject to Eligibility</h3>
        <p className="mb-4">
          <strong>Apprenticeship funding may be available, subject to learner, employer and current funding-rule eligibility.</strong> Construction employers can access apprenticeship funding through the Department for Education framework. Levy-paying employers use their levy funds. Government support and any employer contribution depend on learner age, employer status and the funding rules in force on the start date. This makes the construction PCP route exceptionally cost-effective for building sector-specific project controls capability.
        </p>
        <p className="mb-4">
          <SiteLink href="/operational-pcp-construction" className="text-primary-600 hover:text-primary-700 underline font-semibold">Explore the Construction & Urban PCP Route →</SiteLink>
        </p>
      </>
  );
}
