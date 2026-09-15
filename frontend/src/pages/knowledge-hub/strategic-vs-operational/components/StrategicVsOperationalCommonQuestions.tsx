import PcpFaqSection from '@/components/feature/PcpFaqSection';
import { articleFaqs } from "../sectionData";

/** Section: Strategic vs Operational: Common Questions. */
export default function StrategicVsOperationalCommonQuestions() {
  return (
    <PcpFaqSection title="Strategic vs Operational: Common Questions" faqs={articleFaqs} />
  );
}
