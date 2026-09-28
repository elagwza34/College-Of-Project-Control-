import { useReveal } from '@/hooks/useReveal';
import { useState } from 'react';

const faqs = [
  { q: 'Do I need prior project controls experience?', a: 'No. We have entry points from Level 3 through to Level 6. Your eligibility depends on your current role and qualifications, not prior controls knowledge.' },
  { q: 'How much does it cost me personally?', a: 'Apprentices must not be asked to contribute to eligible apprenticeship training costs. Whether a place is funded depends on employer support, learner eligibility and the funding rules that apply on the start date. We confirm this before enrolment.' },
  { q: 'How long does the programme take?', a: 'Duration depends on the programme and the plan agreed for you, and the approved facts are confirmed in your written offer. You will be learning while working, so the programme fits around your job.' },
  { q: 'What certification will I achieve?', a: 'Completing the apprenticeship awards the qualification set out in the official standard for your programme. Any external professional certification is separate: it has its own eligibility, application and assessment requirements, and your written offer confirms what is included.' },
  { q: 'Can I study while working full-time?', a: 'Yes. The programme is designed for working professionals. Live sessions are in the evenings, and workplace assignments count as your evidence.' },
];

export default function QuickAnswers() {
  const faqRef = useReveal(0.05);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
<div className="bg-background-50 py-16 md:py-24 border-t border-background-200/40">
          <div className="container-site max-w-3xl" ref={faqRef.ref}>
            <div className="text-center mb-12 md:mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-label font-semibold uppercase tracking-wider border border-highlight-500/40 text-highlight-700 mb-5">
                <i className="ri-question-line text-sm" />
                Quick Answers
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground-950 leading-tight">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-background-200/60 overflow-hidden"
                  style={{ opacity: faqRef.visible ? 1 : 0, transform: faqRef.visible ? 'translateY(0)' : 'translateY(16px)', transition: `opacity 500ms cubic-bezier(0.22,1,0.36,1) ${i * 70}ms, transform 500ms cubic-bezier(0.22,1,0.36,1) ${i * 70}ms` }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left cursor-pointer hover:bg-background-50 transition-colors duration-200"
                  >
                    <span className="text-sm font-semibold text-foreground-900 pr-4">{faq.q}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${openFaq === i ? 'bg-highlight-500 text-white rotate-45' : 'bg-background-100 text-foreground-600'}`}>
                      <i className="ri-add-line text-sm" />
                    </div>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-350"
                    style={{ maxHeight: openFaq === i ? '200px' : '0px', opacity: openFaq === i ? 1 : 0 }}
                  >
                    <p className="px-5 pb-5 text-sm text-foreground-600 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
  );
}
