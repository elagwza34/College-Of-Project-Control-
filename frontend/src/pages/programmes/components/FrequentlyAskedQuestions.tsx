import { useEffect,useRef,useState } from 'react';

const faqs = [
  {
    q: 'Which programme is right for me?',
    a: 'Start with your current responsibilities and the capability you want to strengthen. Project Controls Professional Level 6 suits professionals across planning, scheduling, cost, risk, controls and PMO. Associate Project Manager Level 4 suits professionals developing broader project-management and delivery responsibility. Certified PMO Professional Level 6 suits experienced professionals developing strategic PMO governance.',
  },
  {
    q: 'What is the difference between Project Controls Professional Level 6 and Associate Project Manager Level 4?',
    a: 'Project Controls Professional Level 6 focuses on advanced Project Controls capability, while Associate Project Manager Level 4 builds broader project-management and delivery responsibility at Level 4. The right programme depends on your role and the level of responsibility you hold.',
  },
  {
    q: 'Who is Certified PMO Professional Level 6 designed for?',
    a: 'Experienced PMO, Project Controls and project professionals developing strategic governance, integrated controls, assurance and PMO leadership capability.',
  },
  {
    q: 'What is the difference between a programme and a specialist module?',
    a: 'A complete programme provides structured development across a broader professional capability. A specialist module focuses on one specific Project Controls subject, which can be taken individually or combined with others.',
  },
  {
    q: 'Can I take individual Project Controls modules?',
    a: 'Yes. Specialist Project Controls modules can be taken individually, allowing you to target one specific capability rather than a complete programme.',
  },
  {
    q: 'Can I combine several modules?',
    a: 'Yes. You can combine several specialist Project Controls subjects around your role, project environment or organisational capability needs.',
  },
  {
    q: 'Can my employer support my development?',
    a: 'Yes. Employers can support development for an individual, a team or a wider Project Controls function, either directly or through structured employer development.',
  },
  {
    q: 'Can organisations enrol multiple employees?',
    a: 'Yes. Organisations can build capability across roles, teams, PMOs or functions through structured employer development.',
  },
  {
    q: 'Are programmes designed for working professionals?',
    a: 'Yes. Programmes are designed for working professionals, with development structured to fit alongside existing responsibilities.',
  },
  {
    q: 'How does workplace application work?',
    a: 'Development is designed to connect specialist learning directly to live projects, systems and responsibilities, so you can apply what you learn in real work.',
  },
  {
    q: 'What professional pathways are connected to the programmes?',
    a: 'Selected programmes connect with relevant professional qualifications, assessments, memberships and progression pathways. These remain subject to the requirements of the relevant professional body.',
  },
  {
    q: 'Does completing a programme automatically award ChPP?',
    a: 'No. Development can support Chartered Progression towards ChPP, but Chartered status is awarded by APM based on its own requirements and is not automatically awarded on completion of a programme.',
  },
  {
    q: 'Can I speak with the College before choosing?',
    a: 'Yes. Contact the College to discuss your role, responsibilities or team capability needs, and we will help identify the most relevant professional-development option.',
  },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-background-200/70 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer hover:bg-background-100 transition-colors"
      >
        <span className="text-sm md:text-base font-semibold text-foreground-900 pr-4 leading-snug">{question}</span>
        <i className={`ri-${open ? 'subtract' : 'add'}-line text-lg text-primary-500 flex-shrink-0 transition-transform duration-300`}></i>
      </button>
      {open && (
        <div className="px-5 pb-4">
          <p className="text-sm text-foreground-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FrequentlyAskedQuestions() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-16 md:py-20 bg-background-100 relative overflow-hidden">
      <div className="absolute top-1/2 right-[10%] w-[350px] h-[350px] rounded-full pointer-events-none lavender-glow" style={{ background: 'radial-gradient(circle, oklch(var(--primary-300) / 0.035), transparent 70%)', animationDelay: '-2s' }}></div>

      <div className="container-site max-w-3xl relative z-10">
        <div className="text-center mb-10 md:mb-12 reveal-blur-in is-visible">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-label font-semibold uppercase tracking-wider border border-highlight-500/40 text-highlight-600 mb-4">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground-950 leading-tight">
            Choosing a programme, clearly explained
          </h2>
        </div>

        <div ref={ref} className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={faq.q}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(12px)',
                transition: `opacity 400ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 50}ms, transform 400ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 50}ms`,
              }}
            >
              <FaqItem question={faq.q} answer={faq.a} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}