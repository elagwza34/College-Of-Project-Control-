import SiteLink from '@/components/base/SiteLink';
export default function ProgrammesHero() {
  return (
    <section className="hero-align-left relative isolate flex min-h-[90vh] w-full items-center overflow-hidden bg-secondary-950 pt-16 md:pt-[72px]">
      <img
        src="https://readdy.ai/api/search-image?query=Sophisticated%20senior%20project%20professional%20in%20a%20tailored%20suit%20reviewing%20architectural%20project%20plans%20and%20scheduling%20documents%20on%20a%20large%20screen%20in%20a%20modern%20glass%20office%20overlooking%20a%20city%20skyline%2C%20warm%20golden%20hour%20lighting%2C%20premium%20editorial%20corporate%20photography%2C%20muted%20teal%20and%20charcoal%20tones%2C%20shallow%20depth%20of%20field%2C%20high%20detail%2C%20professional%20atmosphere&width=1600&height=900&seq=programmes-hero-v1&orientation=landscape"
        alt="Senior project professional reviewing project plans"
        className="absolute inset-0 -z-30 h-full w-full object-cover object-[70%_center]"
        loading="eager"
        fetchPriority="high"
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = '/images/hero-professional.webp';
        }}
      />
      <div className="hero-contrast-overlay absolute inset-0 -z-20" />
      <div className="signal-pattern absolute inset-0 -z-10 opacity-20 [mask-image:linear-gradient(90deg,black,transparent_70%)]" />

      <div className="container-site relative z-10 h-full">
        <div className="flex items-center h-full py-10 md:py-12 lg:py-16">
          <div className="w-full lg:w-[56%]">
            <span className="reveal-blur-in is-visible mb-5 inline-flex items-center gap-2 rounded-full border border-signal-400/50 bg-signal-500/15 px-4 py-1.5 text-sm font-label font-semibold uppercase tracking-widest text-signal-300">
              <i className="ri-graduation-cap-line text-sm"></i>
              Professional Programmes
            </span>

            <h1 className="reveal-fade-up is-visible text-display font-heading font-bold text-background-50 leading-[1.1] tracking-tight">
              Build capability around the
              <br />
              <span className="text-signal-400">responsibility you already hold</span>
            </h1>

            <p className="reveal-fade-up is-visible mt-4 text-base md:text-lg font-body text-background-50/80 leading-relaxed max-w-xl" style={{ transitionDelay: '100ms' }}>
              Develop deeper capability across Project Controls, Project Management and PMO through structured professional programmes designed for working professionals and project-driven organisations.
            </p>

            <p className="reveal-fade-up is-visible mt-3 max-w-xl text-sm font-body leading-relaxed text-background-50/75 md:text-sm" style={{ transitionDelay: '150ms' }}>
              From project delivery and controls to PMO leadership and advanced professional progression, choose development aligned with the work you do now and the responsibilities you want to build towards.
            </p>

            <div className="reveal-scale-in is-visible mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3" style={{ transitionDelay: '250ms' }}>
              <SiteLink
                href="#programmes-list"
                className="btn-primary inline-flex items-center justify-center px-7 py-3 text-sm font-bold transition-all duration-300 whitespace-nowrap"
              >
                Explore Programmes
                <i className="ri-arrow-down-line ml-2"></i>
              </SiteLink>
              <SiteLink
                href="/contact"
                className="inline-flex items-center justify-center rounded-md border border-white/60 bg-primary-950/35 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-signal-400 hover:bg-white/10 whitespace-nowrap"
              >
                Discuss My Development
                <i className="ri-arrow-right-line ml-2"></i>
              </SiteLink>
            </div>

            <div className="reveal-fade-up is-visible mt-6 pt-5 border-t border-background-50/10" style={{ transitionDelay: '350ms' }}>
              <p className="text-xs font-body text-background-50/70">
                For working professionals &middot; Employers &middot; Project teams &middot; PMO functions
              </p>
            </div>
          </div>

          <div className="hidden lg:block w-[44%]"></div>
        </div>
      </div>
    </section>
  );
}
