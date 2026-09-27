interface FaqItem {
  q: string;
  a: string;
}

interface PcpFaqSectionProps {
  title?: string;
  faqs: FaqItem[];
}

export default function PcpFaqSection(_props: PcpFaqSectionProps) {
  void _props;
  return null;
}
