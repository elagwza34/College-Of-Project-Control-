import { useState } from 'react';

interface RouteFaqProps {
  heading: string;
  faqs: { q: string; a: string }[];
}

export default function RouteFaq({ heading, faqs }: RouteFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 md:py-20 bg-background-50">
      <div className="container-site max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground-950 text-center leading-tight mb-10 md:mb-12">
          {heading}
        </h2>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-lg border border-background-200/80 overflow-hidden">
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer hover:bg-background-50/50 transition-colors"
              >
                <span className="text-sm font-label font-semibold text-foreground-900 pr-4">{faq.q}</span>
                <div className={`w-5 h-5 flex items-center justify-center shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-45' : ''}`}>
                  <i className="ri-add-line text-foreground-400"></i>
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-5 pb-4 text-sm text-foreground-600 leading-relaxed">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}