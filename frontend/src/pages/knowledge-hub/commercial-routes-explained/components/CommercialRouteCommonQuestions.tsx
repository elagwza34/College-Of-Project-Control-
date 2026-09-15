import PcpFaqSection from '@/components/feature/PcpFaqSection';
import { articleFaqs } from "../sectionData";

/** Section: Commercial Route: Common Questions. */
export default function CommercialRouteCommonQuestions() {
  return (
    <PcpFaqSection title="Commercial Route: Common Questions" faqs={articleFaqs} />
  );
}
