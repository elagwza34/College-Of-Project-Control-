import { formatGBP } from '@/data/apprenticeshipFundingPolicy';
import { PCP_L6 } from '@/data/programmeFacts';

/** Maximum government apprenticeship funding for the ST0845 standard. */
const fundingBandMaximum = formatGBP(PCP_L6?.fundingBandMaximum ?? 0);

/** Section: How Apprenticeship Funding Works. */
export default function HowApprenticeshipFundingWorks() {
  return (
    <><h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">How Apprenticeship Funding Works</h3>
        <p className="mb-4">
          The Level 6 Project Controls Professional apprenticeship has a government funding-band maximum of up to {fundingBandMaximum} per learner for eligible training and assessment costs. That is the ceiling for the standard, not a payment to the learner or a guaranteed saving for the employer. Funding is accessed differently depending on whether your organisation is a levy-paying or non-levy employer.
        </p>

        <h4 className="text-base font-heading font-semibold text-foreground-900 mt-6 mb-2">Levy-Paying Employers</h4>
        <p className="mb-4">
          Organisations with an annual pay bill over £3 million pay the apprenticeship levy at 0.5%. These funds accumulate in a digital apprenticeship service account and can be used to fully fund apprenticeship training costs. Levy funds not used within 24 months expire, so using them for project controls capability development is a commercially responsible decision.
        </p>

        <h4 className="text-base font-heading font-semibold text-foreground-900 mt-6 mb-2">Non-Levy Employers</h4>
        <p className="mb-4">
          Non-levy employers may access government co-investment. For the PCP Level 6 apprenticeship, the government contribution and any employer payment depend on learner age, employer circumstances and the funding rules in force on the apprenticeship start date. We assess the position before presenting a costed proposal.
        </p>

        </>
  );
}
