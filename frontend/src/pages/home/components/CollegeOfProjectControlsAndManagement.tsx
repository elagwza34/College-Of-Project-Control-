import SiteLink from '@/components/base/SiteLink';
import HomeAudioSummary from './HomeAudioSummary';
export default function CollegeOfProjectControlsAndManagement() {
  const trustSignals = [
    { icon: 'ri-briefcase-4-line', title: 'Workplace applied', detail: 'Built around live responsibilities' },
    { icon: 'ri-user-star-line', title: 'Practitioner led', detail: 'Guidance from industry specialists' },
    { icon: 'ri-route-line', title: 'Progression focused', detail: 'Clear routes from capability to career' },
  ];

  return (
    <section id="hero" className="hero-align-left relative isolate flex min-h-[90vh] w-full items-center overflow-hidden bg-secondary-950 pt-28">
      {/* Background */}
      <img
        src="/images/hero-professional.webp"
        alt="Project controls professional looking towards a complex delivery environment"
        className="absolute inset-0 -z-30 h-full w-full object-cover object-[72%_38%]"
        loading="eager"
        fetchPriority="high"
      />
      <div className="hero-contrast-overlay absolute inset-0 -z-20" />
      <div className="signal-pattern absolute inset-0 -z-10 opacity-25 [mask-image:linear-gradient(90deg,black,transparent_68%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-secondary-950/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 container-site h-full">
        <div className="flex items-center h-full py-10 md:py-12 lg:py-16">
          {/* Left Side — 50% */}
          <div className="w-full lg:w-[50%]">
            {/* Badge — blur-to-clear */}
            <span className="reveal-blur-in is-visible mb-5 inline-flex items-center gap-2 rounded-full border border-signal-400/50 bg-signal-500/15 px-4 py-1.5 text-sm font-label font-semibold uppercase tracking-widest text-signal-300">
              <i className="ri-building-4-line text-sm"></i>
              College of Project Controls &amp; Management
            </span>

            {/* Main Headline — fade up */}
            <h1 className="reveal-fade-up is-visible text-display font-heading font-bold text-background-50 leading-[1.08] tracking-tight">
              Lead projects with
              <br />
              <span className="text-signal-400">clarity, control and confidence</span>
            </h1>

            {/* Supporting Headline — fade up delayed */}
            <p className="reveal-fade-up is-visible mt-4 text-base md:text-lg font-body text-background-50/80 leading-relaxed max-w-xl" style={{ transitionDelay: '100ms' }}>
              A specialist college for professionals and employers working in project controls, project management and PMO.
            </p>

            {/* Body Copy — fade up delayed */}
            <p className="reveal-fade-up is-visible mt-3 max-w-xl text-sm font-body leading-relaxed text-background-50/75 md:text-sm" style={{ transitionDelay: '150ms' }}>
              Choose a structured programme, specialist module or team development route, with learning applied to workplace responsibilities.
            </p>

            {/* Micro Line */}
            <p className="reveal-fade-up is-visible mt-2 max-w-xl text-xs font-body leading-relaxed text-background-50/70" style={{ transitionDelay: '200ms' }}>
              Professional programmes &middot; Specialist modules &middot; Employer capability &middot; Funding guidance
            </p>

            <HomeAudioSummary />

            {/* CTAs — scale in */}
            <div className="reveal-scale-in is-visible mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3" style={{ transitionDelay: '250ms' }}>
              <SiteLink
                href="#programmes"
                className="btn-primary inline-flex items-center justify-center px-7 py-3 text-sm font-bold transition-all duration-300 whitespace-nowrap"
                data-gtm-event="hero_explore_programmes_click"
                data-gtm-location="hero"
                data-gtm-position="primary"
              >
                Explore Programmes
                <i className="ri-arrow-right-line ml-2"></i>
              </SiteLink>
              <SiteLink
                href="/programmes"
                className="cta-button inline-flex items-center justify-center gap-2 rounded-md border border-white/60 bg-primary-950/35 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-signal-400 hover:bg-white/10 whitespace-nowrap"
                data-gtm-event="hero_compare_programmes_click"
                data-gtm-location="hero"
                data-gtm-position="tertiary"
              >
                <i className="ri-layout-grid-line" aria-hidden="true"></i>
                Compare programmes
              </SiteLink>
            </div>

            {/* Tertiary Link */}
            <SiteLink
              href="/knowledge-hub/employer-apprenticeship-funding"
              className="reveal-fade-up is-visible mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-signal-300 transition-colors hover:text-signal-200" style={{ transitionDelay: '300ms' }}
              data-gtm-event="hero_check_bursary_click"
              data-gtm-location="hero"
              data-gtm-position="tertiary"
            >
              <i className="ri-question-line text-sm"></i>
              Explore funding and access options
            </SiteLink>

            {/* Trust Line + Animated Stats */}
            <div className="reveal-fade-up is-visible mt-6 pt-5 border-t border-background-50/10" style={{ transitionDelay: '350ms' }}>
              <p className="mb-4 text-xs font-body text-background-50/70">
                Designed for working professionals and project-driven organisations.
              </p>
              <div className="grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
                {trustSignals.map((signal) => (
                  <div key={signal.title} className="flex items-start gap-2.5 rounded-lg border border-white/10 bg-white/[0.04] p-3 backdrop-blur-sm">
                    <i className={`${signal.icon} mt-0.5 text-sm text-signal-400`} />
                    <span>
                      <strong className="block text-sm font-semibold text-white/90">{signal.title}</strong>
                      <span className="mt-0.5 block text-sm leading-tight text-white/70">{signal.detail}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side — 50% for the character to show through */}
          <div className="hidden lg:block w-[50%]"></div>
        </div>
      </div>
    </section>
  );
}
