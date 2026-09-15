import PcpFaqSection from '@/components/feature/PcpFaqSection';
import { articleFaqs } from "../sectionData";

/** Section: Energy Project Controls: Common Questions. */
export default function EnergyProjectControlsCommonQuestions() {
  return (
    <PcpFaqSection title="Energy Project Controls: Common Questions" faqs={articleFaqs} />
  );
}
