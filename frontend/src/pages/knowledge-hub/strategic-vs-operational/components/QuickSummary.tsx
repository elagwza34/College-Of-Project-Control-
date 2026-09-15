import SharedSection from '@/components/feature/article/QuickSummary';

/** Section: Quick Summary. */
export default function QuickSummary() {
  return <SharedSection
    quickSummary={[
          'Strategic PCP focuses on leadership-grade project controls: governance, decision confidence, portfolio-level reporting and senior stakeholder engagement',
          'Operational PCP focuses on delivery-grade project controls: planning, cost, risk, scheduling and performance reporting on live projects',
          'The combined Strategic + Operational route develops both — technical depth and leadership capability',
          'Your choice depends on your current responsibilities, career ambitions and the kind of professional impact you want to make',
          'All routes are funding subject to eligibility for employers in England and include APM ChPP readiness support',
        ]}
  />;
}
