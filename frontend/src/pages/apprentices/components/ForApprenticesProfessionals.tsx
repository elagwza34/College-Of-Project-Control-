import { useReveal } from '@/hooks/useReveal';

import SiteLink from '@/components/base/SiteLink';

const stats = [
  { value: 'Live', label: 'Tutor-led learning', sub: 'structured around professional practice' },
  { value: '1:1', label: 'Individual guidance', sub: 'for route fit and workplace application' },
  { value: 'Real', label: 'Workplace evidence', sub: 'connected to responsibilities you already hold' },
];

function StatItem({ stat, i }: { stat: typeof stats[0]; i: number }) {
  const { ref, visible } = useReveal(0.1);
  return (
    <div
      ref={ref}
      className={`relative text-center px-4 md:px-8 ${i < 2 ? 'md:border-r md:border-white/15' : ''}`}
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: `opacity 600ms cubic-bezier(0.22,1,0.36,1) ${400 + i * 150}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${400 + i * 150}ms` }}
    >
      <p className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-highlight-400 mb-1">{stat.value}</p>
      <p className="text-sm font-semibold text-white/90 mb-1">{stat.label}</p>
      <p className="text-xs text-white/70">{stat.sub}</p>
    </div>
  );
}


export default function ForApprenticesProfessionals() {
  const hero = useReveal(0.05);
  return (
<div className="hero-align-left relative min-h-[90vh] flex items-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img loading="lazy" decoding="async"
              src="https://readdy.ai/api/search-image?query=Young%20professional%20woman%20confidently%20presenting%20project%20controls%20dashboard%20on%20large%20screen%20in%20modern%20bright%20corporate%20office%20with%20floor%20to%20ceiling%20windows%2C%20warm%20natural%20daylight%20streaming%20in%2C%20diverse%20team%20of%20young%20professionals%20engaged%20and%20taking%20notes%2C%20modern%20minimalist%20interior%20with%20warm%20wood%20accents%20and%20clean%20white%20surfaces%2C%20editorial%20corporate%20photography%20style%20with%20sharp%20focus%20and%20soft%20natural%20tones%2C%20aspirational%20career%20growth%20atmosphere%2C%20cinematic%20composition%20with%20depth%20of%20field&width=1800&height=1200&seq=apprentices-hero-v3&orientation=landscape"
              alt="Project controls professional presenting in modern office"
              className="w-full h-full object-cover object-top"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = '/images/hero-professional.webp';
              }}
            />
            {/* Dark gradient overlays for text readability */}
            <div className="hero-contrast-overlay absolute inset-0" />
          </div>

          {/* Dot pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />

          <div className="container-site relative z-10 w-full pt-28 md:pt-36 pb-16 md:pb-20">
            <div
              ref={hero.ref}
              className="flex flex-col items-center text-center"
              style={{ opacity: hero.visible ? 1 : 0, transform: hero.visible ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 800ms cubic-bezier(0.22,1,0.36,1), transform 800ms cubic-bezier(0.22,1,0.36,1)' }}
            >
              {/* Badge */}
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-label font-semibold uppercase tracking-wider border border-highlight-400/40 text-highlight-300 mb-6 backdrop-blur-sm">
                <i className="ri-user-line text-sm" />
                For Apprentices & Professionals
              </span>

              <h1 className="text-display font-heading font-extrabold text-white leading-[1.08] max-w-5xl">
                Progress Your Career in<br className="hidden sm:block" />
                <span className="text-highlight-400"> Project Controls</span>
              </h1>

              <p className="mt-6 text-base md:text-lg lg:text-xl text-white/70 max-w-2xl leading-relaxed">
                Structured government-funded pathways that build real capability — planning, cost, risk, and reporting skills that employers value and promote.
              </p>

              {/* CTA */}
              <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                <SiteLink href="/contact" className="btn-primary inline-flex items-center gap-3 px-8 py-4 font-semibold text-sm cursor-pointer transition-all duration-300 whitespace-nowrap lift-hover">
                  <i className="ri-rocket-line text-lg" />
                  Start your application
                  <i className="ri-arrow-right-line text-sm" />
                </SiteLink>
                <SiteLink href="#rhythm" className="cta-button inline-flex items-center gap-2 px-6 py-4 border border-white/25 text-white font-semibold text-sm rounded-xl cursor-pointer hover:bg-white/10 hover:border-white/40 transition-all duration-300 whitespace-nowrap">
                  <i className="ri-calendar-line text-sm" />
                  What to expect
                </SiteLink>
              </div>

              <p className="mt-4 text-xs text-white/25">Free eligibility check. No commitment required.</p>
            </div>

            {/* Stats Row */}
            <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 max-w-4xl mx-auto">
              {stats.map((stat, i) => (
                <StatItem key={stat.label} stat={stat} i={i} />
              ))}
            </div>
          </div>
        </div>
  );
}
