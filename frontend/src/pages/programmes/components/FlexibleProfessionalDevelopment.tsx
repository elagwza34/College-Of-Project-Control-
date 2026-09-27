import SiteLink from '@/components/base/SiteLink';
import { useEffect,useRef,useState } from 'react';

const moduleCatalogue = [
  'Project Management Professional (PMP)',
  'AI in Project Controls',
  'Risk Management',
  'Scheduling Professional (SP)',
  'Earned Value Management (EVM)',
  'Project Planning and Controls (PPC)',
  'Managing Successful Programmes (MSP)',
  'Management of Portfolios',
  'Project Management Office (PMO)',
];

const options = [
  {
    icon: 'ri-book-open-line',
    eyebrow: 'Broadest development',
    title: 'Complete Programme',
    desc: 'Broader structured development around a professional role or level of responsibility.',
    note: 'Best when you are building towards a defined role or qualification.',
  },
  {
    icon: 'ri-focus-3-line',
    eyebrow: 'One capability',
    title: 'Specialist Module',
    desc: 'Focused development around one specific Project Controls capability.',
    note: 'Best when one skill gap is holding back your current work.',
  },
  {
    icon: 'ri-stack-line',
    eyebrow: 'Flexible pathway',
    title: 'Multiple Modules',
    desc: 'Combine several specialist areas around your current role or capability gaps.',
    note: 'Best when you need a tailored mix without a complete programme.',
  },
];

export default function FlexibleProfessionalDevelopment() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-background-50 relative overflow-hidden">
      <div
        className="absolute -top-28 -right-24 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, oklch(var(--highlight-300) / 0.14), transparent 68%)' }}
      ></div>
      <div
        className="absolute -bottom-40 -left-32 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, oklch(var(--primary-300) / 0.1), transparent 70%)' }}
      ></div>

      <div className="container-site relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28 reveal-blur-in is-visible">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-label font-semibold uppercase tracking-wider border border-highlight-500/40 text-highlight-600 mb-5">
              <i className="ri-equalizer-2-line text-sm"></i>
              Flexible Professional Development
            </span>
            <h2 className="max-w-xl text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground-950 leading-[1.08]">
              Choose the depth of development you need
            </h2>
            <p className="mt-5 max-w-lg text-base md:text-lg text-foreground-600 leading-relaxed">
              Build towards a complete professional role, close one specific capability gap, or combine modules into a pathway shaped around your work.
            </p>

            <div className="mt-7 pl-4 border-l-2 border-highlight-400">
              <p className="text-sm font-semibold text-foreground-800">Not sure which format fits?</p>
              <p className="mt-1 text-sm text-foreground-600 leading-relaxed">
                We can map your current responsibilities and recommend the right level of development.
              </p>
            </div>
          </div>

          <div ref={ref} className="relative">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-primary-500 text-white inline-flex items-center justify-center text-xs font-bold">01</span>
              <p className="text-sm font-label font-semibold uppercase tracking-wider text-foreground-600">
                Select your development format
              </p>
            </div>

            <div className="space-y-3">
              {options.map((option, i) => (
                <article
                  key={option.title}
                  className={`group relative overflow-hidden rounded-2xl border p-5 md:p-6 transition-all duration-300 hover:-translate-y-0.5 ${
                    i === 0
                      ? 'bg-primary-500 border-primary-500 text-white'
                      : 'bg-white border-background-200/90 hover:border-primary-300'
                  }`}
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(18px)',
                    transition: `opacity 500ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 90}ms, transform 500ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 90}ms, border-color 300ms`,
                  }}
                >
                  {i === 0 && (
                    <div className="absolute top-0 right-0 w-36 h-36 rounded-full translate-x-12 -translate-y-14 bg-white/5"></div>
                  )}
                  <div className="relative flex gap-4 md:gap-5 items-start">
                    <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl ${i === 0 ? 'bg-white/10' : 'bg-primary-100'}`}>
                      <i className={`${option.icon} text-xl ${i === 0 ? 'text-highlight-300' : 'text-primary-600'}`}></i>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`text-xs font-label font-semibold uppercase tracking-wider ${i === 0 ? 'text-highlight-300' : 'text-highlight-600'}`}>
                        {option.eyebrow}
                      </p>
                      <h3 className={`mt-1 text-xl font-heading font-bold ${i === 0 ? 'text-white' : 'text-foreground-950'}`}>
                        {option.title}
                      </h3>
                      <p className={`mt-2 text-sm leading-relaxed ${i === 0 ? 'text-white/80' : 'text-foreground-600'}`}>
                        {option.desc}
                      </p>
                      <p className={`mt-3 text-xs font-medium ${i === 0 ? 'text-white/65' : 'text-foreground-600'}`}>
                        {option.note}
                      </p>
                    </div>
                    <i className={`ri-arrow-right-up-line text-lg flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${i === 0 ? 'text-highlight-300' : 'text-primary-400'}`}></i>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-12 md:mt-16 mb-4">
          <span className="w-8 h-8 rounded-full bg-highlight-500 text-foreground-950 inline-flex items-center justify-center text-xs font-bold">02</span>
          <p className="text-sm font-label font-semibold uppercase tracking-wider text-foreground-600">
            Explore available specialist areas
          </p>
        </div>

        <div className="bg-white border border-background-200/90 rounded-2xl p-5 md:p-7 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-5">
            <div>
              <p className="text-xs font-label font-semibold uppercase tracking-wider text-highlight-600">Module catalogue</p>
              <h3 className="mt-1 text-xl font-heading font-bold text-foreground-950">Build a focused pathway</h3>
            </div>
            <span className="text-xs font-medium text-foreground-400">9 specialist areas</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {moduleCatalogue.map((mod) => (
              <div
                key={mod}
                className="flex items-center gap-3 rounded-xl border border-background-200/70 bg-background-50 px-3.5 py-3"
              >
                <span className="w-7 h-7 flex-shrink-0 rounded-lg bg-primary-100 inline-flex items-center justify-center">
                  <i className="ri-check-line text-primary-600 text-sm"></i>
                </span>
                <span className="text-xs md:text-sm font-semibold text-foreground-700 leading-snug">{mod}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
