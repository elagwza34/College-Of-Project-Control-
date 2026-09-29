import { formatGBP } from '@/data/apprenticeshipFundingPolicy';
import { PCP_L6 } from '@/data/programmeFacts';

/** Maximum government apprenticeship funding for the ST0845 standard. */
const fundingBandMaximum = formatGBP(PCP_L6?.fundingBandMaximum ?? 0);

/** Section: Apprenticeship funding. */
export default function FundingFundingSubjectToEligibility() {
  return (
    <><h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Apprenticeship funding</h3>
        <p className="mb-4">
          <strong>Apprenticeship funding may be available, subject to learner, employer and current funding-rule eligibility.</strong> The programme has a government funding-band maximum of up to {fundingBandMaximum} for eligible training and assessment costs. Levy-paying employers can use their apprenticeship levy funds. Government support and any employer contribution depend on learner age, employer status and the funding rules in force on the start date.
        </p>
        <p className="mb-4">
          <strong className="text-foreground-900">Important:</strong> Funding and support are subject to employer eligibility, learner suitability, funding rules and availability. This is not "free for everyone." KBC added-value support includes professional exams, memberships, London Master Class Events, private healthcare during the programme and one-to-one tutoring, subject to eligibility and availability.
        </p>

        </>
  );
}
