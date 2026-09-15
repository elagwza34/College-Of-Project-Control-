import PcpFaqSection from '@/components/feature/PcpFaqSection';
import { faqs } from "../campaignData";

/** Section: Frequently Asked Questions. */
export default function FrequentlyAskedQuestions() {
  return (
    <PcpFaqSection faqs={faqs} />
  );
}
