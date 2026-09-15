import PcpFaqSection from '@/components/feature/PcpFaqSection';
import { articleFaqs } from "../sectionData";

/** Section: Construction Project Controls: Common Questions. */
export default function ConstructionProjectControlsCommonQuestions() {
  return (
    <PcpFaqSection title="Construction Project Controls: Common Questions" faqs={articleFaqs} />
  );
}
