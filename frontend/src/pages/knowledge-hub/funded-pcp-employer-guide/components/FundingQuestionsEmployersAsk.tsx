import PcpFaqSection from '@/components/feature/PcpFaqSection';
import { articleFaqs } from "../sectionData";

/** Section: Funding Questions Employers Ask. */
export default function FundingQuestionsEmployersAsk() {
  return (
    <PcpFaqSection title="Funding Questions Employers Ask" faqs={articleFaqs} />
  );
}
