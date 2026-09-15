import SharedSection from '@/components/feature/article/QuickSummary';

/** Section: Quick Summary. */
export default function QuickSummary() {
  return <SharedSection
    quickSummary={[
          'PMP is a globally recognised certification that validates existing project management knowledge through an exam',
          'The PCP Level 6 is a structured professional development pathway building project controls capability through workplace evidence, tutoring and sector-specific learning',
          'PCP is funding subject to eligibility for employers in England; PMP is typically self-funded or employer-sponsored at lower cost',
          'PCP includes APM ChPP readiness support; PMP does not include APM recognition',
          'Your choice depends on whether you need structured capability development (PCP) or a standalone credential to validate existing knowledge (PMP)',
        ]}
  />;
}
