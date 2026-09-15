import PcpFaqSection from '@/components/feature/PcpFaqSection';
import { checkerFaqs } from "../checkerData";

/** Section: Frequently Asked Questions. */
export default function FrequentlyAskedQuestions() {
  return (
    <PcpFaqSection
          title="Frequently Asked Questions"
          faqs={checkerFaqs.map(([q, a]) => ({ q, a }))}
        />
  );
}
