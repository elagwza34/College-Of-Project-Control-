import SiteLink from '@/components/base/SiteLink';
import { useEffect,useRef,useState } from 'react';

const scopeItems = [
  { icon: 'ri-user-star-line', title: 'Develop Existing Talent', desc: 'Build on the experience already inside your organisation.' },
  { icon: 'ri-crosshair-line', title: 'Target Capability Gaps', desc: 'Focus development around specific responsibilities.' },
  { icon: 'ri-briefcase-line', title: 'Apply Development at Work', desc: 'Connect learning directly to live project environments.' },
  { icon: 'ri-stack-line', title: 'Build Professional Depth', desc: 'Support employees as responsibilities become more complex.' },
  { icon: 'ri-team-line', title: 'Team Development', desc: 'Combine programmes and specialist modules where appropriate.' },
];

export default function ForEmployers() {
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
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] -translate-y-1/2 translate-x-1/3 rounded-full pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(circle, oklch(var(--primary-200) / 0.15), transparent 70%)' }} />

      <div className="container-site relative z-10" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Text */}
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
              Develop the capability your organisation actually needs
            </h2>

            <p className="mt-4 text-base md:text-lg text-foreground-600 leading-relaxed max-w-lg">
              Use complete programmes to build deeper professional capability around roles with significant project, Project Controls or PMO responsibility.
            </p>

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

            <div className="mt-6 inline-flex items-start gap-2.5 bg-primary-50 border border-primary-200 rounded-lg px-4 py-3">
              <i className="ri-check-double-line text-primary-600 text-base flex-shrink-0 mt-0.5"></i>
              <span className="text-sm font-semibold text-foreground-800">Target capability gaps without over-training your team.</span>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap items-start gap-4">
              <SiteLink
                href="/contact"
                className="btn-primary inline-flex items-center gap-3 px-6 py-3.5 font-semibold text-sm cursor-pointer transition-all duration-300 whitespace-nowrap lift-hover"
              >
                Discuss Programmes for Your Team
                <i className="ri-arrow-right-line text-sm" />
              </SiteLink>
              <SiteLink
                href="/employers"
                className="cta-button inline-flex items-center gap-2 px-6 py-3.5 border border-foreground-200 text-foreground-800 font-semibold text-sm rounded-xl cursor-pointer hover:bg-foreground-50 hover:border-foreground-300 transition-all duration-300 whitespace-nowrap"
              >
                <i className="ri-calendar-check-line text-sm" />
                Book Employer Consultation
              </SiteLink>
            </div>
          </div>

          {/* Right: Image */}
          <div
            className="relative rounded-2xl overflow-hidden aspect-[4/3]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(20px)',
              transition: 'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) 150ms, transform 700ms cubic-bezier(0.22, 1, 0.36, 1) 150ms',
            }}
          >
            <img loading="lazy" decoding="async"
              src="https://readdy.ai/api/search-image?query=Professional%20corporate%20team%20discussing%20project%20controls%20in%20a%20modern%20office%20meeting%20room%2C%20warm%20natural%20lighting%2C%20clean%20minimal%20design%2C%20neutral%20warm%20tones%2C%20editorial%20corporate%20photography%2C%20high%20quality%2C%20sharp%20detail%2C%20professional%20atmosphere&width=1200&height=900&seq=programmes-employer-v1&orientation=landscape"
              alt="Employer team developing project controls capability"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground-950/60 via-foreground-950/20 to-transparent" />
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
