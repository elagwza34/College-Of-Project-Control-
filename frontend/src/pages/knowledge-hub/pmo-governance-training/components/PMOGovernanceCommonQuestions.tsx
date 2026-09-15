import PcpFaqSection from '@/components/feature/PcpFaqSection';
import { articleFaqs } from "../sectionData";

/** Section: PMO Governance: Common Questions. */
export default function PMOGovernanceCommonQuestions() {
  return (
    <PcpFaqSection title="PMO Governance: Common Questions" faqs={articleFaqs} />
  );
}
