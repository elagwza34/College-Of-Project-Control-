import PcpFaqSection from '@/components/feature/PcpFaqSection';
import { articleFaqs } from "../sectionData";

/** Section: Employer Funding: Common Questions. */
export default function EmployerFundingCommonQuestions() {
  return (
    <PcpFaqSection title="Employer Funding: Common Questions" faqs={articleFaqs} />
  );
}
