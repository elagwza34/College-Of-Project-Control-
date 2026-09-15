import SharedSection from '@/components/feature/article/QuickSummary';

/** Section: Quick Summary. */
export default function QuickSummary() {
  return <SharedSection
    quickSummary={[
          'APM ChPP readiness support helps learners prepare professional evidence, reflect on practice and build confidence for future ChPP pathway progression',
          'It does NOT guarantee Chartered status — ChPP is awarded independently by the Association for Project Management',
          'ChPP readiness support is included across all PCP routes: strategic, operational, PMO and sector-specific',
          'Learners should understand the distinction between preparation support and an actual professional award',
          'The support is designed to strengthen your ChPP application, not bypass the independent APM assessment',
        ]}
  />;
}
