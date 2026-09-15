import PcpFaqSection from '@/components/feature/PcpFaqSection';
import { articleFaqs } from "../sectionData";

/** Section: PCP vs PMP: Common Questions. */
export default function PCPVsPMPCommonQuestions() {
  return (
    <PcpFaqSection title="PCP vs PMP: Common Questions" faqs={articleFaqs} />
  );
}
