import SharedSection from '@/components/feature/article/QuickSummary';

/** Section: Quick Summary. */
export default function QuickSummary() {
  return <SharedSection
    quickSummary={[
          'Apprenticeship funding may be available for eligible employers and learners in England',
          'Contribution rates depend on learner age, employer circumstances and the rules in force on the start date',
          'The Level 6 PCP apprenticeship sits in Funding Band 11 with a cap of up to £27,000 per learner',
          'KBC added-value support includes professional exams, memberships, London Master Class Events, private healthcare and one-to-one tutoring, where applicable',
          'Funding and support are subject to employer eligibility, learner suitability, funding rules and availability',
        ]}
  />;
}
