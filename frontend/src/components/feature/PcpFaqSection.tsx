import { useState } from 'react';
import SectionHeading from '@/components/base/SectionHeading';

interface FaqItem {
  q: string;
  a: string;
}

interface PcpFaqSectionProps {
  title?: string;
  faqs: FaqItem[];
}

export default function PcpFaqSection({ title = 'Frequently Asked Questions', faqs }: PcpFaqSectionProps) {
  return (
    <section className="py-16 md:py-20 bg-background-100">
      <div className="container-site max-w-3xl">
        <SectionHeading title={title} />

        <div className="mt-10 space-y-3">
          {faqs.map((faq) => (
            <FaqItem key={faq.q} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-background-50 border border-background-200/70 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer hover:bg-background-100 transition-colors"
      >
        <span className="text-sm md:text-base font-semibold text-foreground-900 pr-4">{question}</span>
        <i className={`ri-${open ? 'subtract' : 'add'}-line text-lg text-primary-500 flex-shrink-0 transition-transform duration-200`}></i>
      </button>
      {open && (
        <div className="px-5 pb-4">
          <p className="text-sm text-foreground-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}