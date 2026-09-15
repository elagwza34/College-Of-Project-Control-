import PcpFaqSection from '@/components/feature/PcpFaqSection';
import { articleFaqs } from "../sectionData";

/** Section: Common Questions About the PCP Apprenticeship. */
export default function CommonQuestionsAboutThePCPApprenticeship() {
  return (
    <PcpFaqSection title="Common Questions About the PCP Apprenticeship" faqs={articleFaqs} />
  );
}
