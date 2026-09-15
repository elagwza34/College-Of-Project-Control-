import SharedSection from '@/components/feature/article/QuickSummary';

/** Section: Quick Summary. */
export default function QuickSummary() {
  return <SharedSection
    quickSummary={[
          'UK employers can use apprenticeship funding to build project controls capability with minimal direct cost where eligible',
          'Levy-paying employers may use available levy funds; other contribution rates depend on learner age and current rules',
          'The Level 6 PCP apprenticeship is open to both new hires and existing employees — it is professional development, not just an entry route',
          'Multiple learners can be enrolled as cohorts to build consistent organisational project controls capability',
          'Funding and support are subject to employer eligibility, learner suitability, funding rules and availability',
        ]}
  />;
}
