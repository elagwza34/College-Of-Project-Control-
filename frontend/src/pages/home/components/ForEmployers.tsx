import SiteLink from '@/components/base/SiteLink';
import { useEffect,useRef,useState } from 'react';

function useReveal(threshold = 0.1) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const scopeItems = [
  { icon: 'ri-crosshair-line', title: 'Target Capability Gaps', desc: 'Focus development on the skills your organisation actually needs.' },
  { icon: 'ri-user-star-line', title: 'Develop Existing Talent', desc: 'Build on the experience already inside your organisation.' },
  { icon: 'ri-briefcase-line', title: 'Apply Learning to Real Work', desc: 'Connect development directly to live projects, systems and responsibilities.' },
  { icon: 'ri-list-check-2', title: 'Build Role-Relevant Development', desc: 'Choose complete programmes or targeted specialist modules.' },
];

export default function ForEmployers() {
  const { ref, visible } = useReveal(0.05);

  return (
    <section id="employers" className="py-16 md:py-24 bg-background-50 relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] -translate-y-1/2 translate-x-1/3 rounded-full pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(circle, oklch(var(--primary-200) / 0.15), transparent 70%)' }} />

      <div className="container-site relative z-10" ref={ref}>
        {/* ── Two Column Layout: Text + Image ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-20px)',
              transition: 'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-label font-semibold uppercase tracking-wider border border-highlight-500/40 text-highlight-700 mb-5">
              <i className="ri-building-2-line text-sm" />
              For Employers
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-4xl font-heading font-bold text-foreground-950 leading-tight">
              Build Project Controls capability across your organisation
            </h2>

            <p className="mt-4 text-base md:text-lg text-foreground-600 leading-relaxed max-w-lg">
              Develop individual specialists, strengthen a PMO or build structured capability across a wider Project Controls function.
            </p>

            {/* Scope items */}
            <div className="mt-8 space-y-3">
              {scopeItems.map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary-100 text-primary-600 flex-shrink-0">
                    <i className={`${item.icon} text-base`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground-900">{item.title}</p>
                    <p className="text-xs text-foreground-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap items-start gap-4">
              <SiteLink
                href="/employers"
                className="btn-primary inline-flex items-center gap-3 px-6 py-3.5 font-semibold text-sm cursor-pointer transition-all duration-300 whitespace-nowrap lift-hover"
              >
                <i className="ri-building-2-line text-lg" />
                Build a Capability Plan
                <i className="ri-arrow-right-line text-sm" />
              </SiteLink>
              <SiteLink
                href="/contact"
                className="cta-button inline-flex items-center gap-2 px-6 py-3.5 border border-foreground-200 text-foreground-800 font-semibold text-sm rounded-xl cursor-pointer hover:bg-foreground-50 hover:border-foreground-300 transition-all duration-300 whitespace-nowrap"
              >
                <i className="ri-calendar-check-line text-sm" />
                Request an employer consultation
              </SiteLink>
            </div>
          </div>

          {/* Right: Image with dark overlay and CTA badge */}
          <div
            className="relative rounded-2xl overflow-hidden aspect-[4/3]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(20px)',
              transition: 'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) 150ms, transform 700ms cubic-bezier(0.22, 1, 0.36, 1) 150ms',
            }}
          >
            <img loading="lazy" decoding="async"
              src="/images/employer-capability-team.webp"
              alt="Employer team developing project controls capability"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground-950/60 via-foreground-950/20 to-transparent" />

            {/* Floating badge on image */}
            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
              <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-xl p-4 border border-background-200/60">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 flex-shrink-0">
                  <i className="ri-bar-chart-2-line text-lg" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-foreground-900">Employer capability development</p>
                  <p className="text-xs text-foreground-600">Develop individual specialists, teams or entire functions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
