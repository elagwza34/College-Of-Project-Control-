import PcpFaqSection from '@/components/feature/PcpFaqSection';
import { articleFaqs } from "../sectionData";

/** Section: ChPP Readiness: Questions Answered Honestly. */
export default function ChPPReadinessQuestionsAnsweredHonestly() {
  return (
    <PcpFaqSection title="ChPP Readiness: Questions Answered Honestly" faqs={articleFaqs} />
  );
}
