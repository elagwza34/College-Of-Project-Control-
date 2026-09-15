import RouteFaq from '@/components/feature/RouteLanding/RouteFaq';
import { faqs } from "../sectionData";

/** Section: RouteFaq. */
export default function RouteFaqSection() {
  return (
    <RouteFaq heading="PMO Route frequently asked questions" faqs={faqs} />
  );
}
