import SharedSection from '@/components/feature/article/QuickSummary';
import { formatGBP } from '@/data/apprenticeshipFundingPolicy';
import { PCP_L6 } from '@/data/programmeFacts';

/** Maximum government apprenticeship funding for the ST0845 standard. */
const fundingBandMaximum = formatGBP(PCP_L6?.fundingBandMaximum ?? 0);

/** Section: Quick Summary. */
export default function QuickSummary() {
  return <SharedSection
    quickSummary={[
          'Apprenticeship funding may be available for eligible employers and learners in England',
          'Contribution rates depend on learner age, employer circumstances and the rules in force on the start date',
          `The Level 6 PCP apprenticeship has a government funding-band maximum of up to ${fundingBandMaximum} per learner for eligible training and assessment costs`,
          'KBC added-value support includes professional exams, memberships, London Master Class Events, private healthcare and one-to-one tutoring, where applicable',
          'Funding and support are subject to employer eligibility, learner suitability, funding rules and availability',
        ]}
  />;
}
