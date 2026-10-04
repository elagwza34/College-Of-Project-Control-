import SiteLink from '@/components/base/SiteLink';
import { apprenticeshipNames } from '@/data/programmeFacts';
import HomeAudioSummary from './HomeAudioSummary';

const proofItems = [
  {
    icon: 'ri-briefcase-4-line',
    title: 'Workplace applied',
    detail: 'Learning connected to real responsibilities',
  },
  {
    icon: 'ri-user-star-line',
    title: 'Practitioner led',
    detail: 'Guidance from experienced project professionals',
  },
  {
    icon: 'ri-team-line',
    title: 'Employer supported',
    detail: 'Learning aligned with workplace development',
  },
  {
    icon: 'ri-route-line',
    title: 'Progression focused',
    detail: 'Clear routes for continued professional development',
  },
];

export default function CollegeOfProjectControlsAndManagement() {
  return (
    <>
      <section id="hero" className="hero-align-left relative isolate flex min-h-[760px] w-full items-center overflow-hidden bg-secondary-950 pt-28 text-white md:min-h-[820px] lg:min-h-[88vh]">
        <img
          src="/images/hero-professional.webp"
          alt="Project controls professionals in a practical learning environment"
          className="absolute inset-0 -z-30 h-full w-full object-cover object-[70%_40%]"
          loading="eager"
          fetchPriority="high"
        />
        <div className="hero-contrast-overlay absolute inset-0 -z-20" />
        <div className="signal-pattern absolute inset-0 -z-10 opacity-25 [mask-image:linear-gradient(90deg,black,transparent_68%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-secondary-950/70 to-transparent" />

        <div className="relative z-10 container-site h-full">
          <div className="flex h-full items-center py-10 md:py-12 lg:py-16">
            <div className="w-full max-w-3xl lg:w-[58%]">
              <div className="reveal-blur-in is-visible mb-5 inline-flex max-w-full flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-signal-400/50 bg-signal-500/15 px-4 py-1.5 text-xs font-label font-semibold uppercase tracking-[0.18em] text-signal-300">
                <span>College of Project Controls &amp; Management</span>
                <span className="hidden h-1 w-1 rounded-full bg-signal-300/70 sm:inline-block" aria-hidden="true" />
                <span className="text-background-50/78">Part of Kent Business College</span>
              </div>

              <h1 className="reveal-fade-up is-visible text-display font-heading font-bold leading-[1.04] tracking-tight text-background-50">
                Project controls and project management apprenticeships
              </h1>

              <p className="reveal-fade-up is-visible mt-5 max-w-2xl text-base font-body leading-relaxed text-background-50/84 md:text-lg" style={{ transitionDelay: '100ms' }}>
                Build the capability to plan, control and deliver projects through practical, work-based learning with Kent Business College.
              </p>

              <p className="reveal-fade-up is-visible mt-3 max-w-2xl text-sm font-body leading-relaxed text-background-50/74 md:text-base" style={{ transitionDelay: '150ms' }}>
                Explore the apprenticeship that fits your responsibilities, experience and development needs.
              </p>

              <p className="reveal-fade-up is-visible mt-3 max-w-2xl text-sm font-label font-semibold leading-relaxed text-signal-300" style={{ transitionDelay: '200ms' }}>
                {apprenticeshipNames(' | ')}
              </p>

              <div className="reveal-scale-in is-visible mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center" style={{ transitionDelay: '250ms' }}>
                <SiteLink
                  href="#programmes"
                  className="btn-primary inline-flex items-center justify-center px-7 py-3 text-sm font-bold transition-all duration-300"
                  data-gtm-event="hero_explore_apprenticeships_click"
                  data-gtm-location="hero"
                  data-gtm-position="primary"
                >
                  Explore apprenticeships
                  <i className="ri-arrow-right-line ml-2" aria-hidden="true"></i>
                </SiteLink>
                <SiteLink
                  href="/employers"
                  className="btn-secondary inline-flex min-h-[3.25rem] items-center justify-center gap-2 border-white/60 px-7 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-signal-400 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-400"
                  data-gtm-event="hero_develop_your_team_click"
                  data-gtm-location="hero"
                  data-gtm-position="secondary"
                >
                  Develop your team
                  <i className="ri-arrow-right-line" aria-hidden="true"></i>
                </SiteLink>
              </div>

              <HomeAudioSummary />
            </div>

            <div className="hidden lg:block lg:w-[42%]" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="border-b border-background-200 bg-white" aria-label="Programme value summary">
        <div className="container-site grid gap-px bg-background-200 py-px sm:grid-cols-2 lg:grid-cols-4">
          {proofItems.map((item) => (
            <div key={item.title} className="flex min-h-24 items-start gap-3 bg-white px-4 py-5 md:px-5">
              <i className={`${item.icon} mt-1 text-lg text-primary-700`} aria-hidden="true" />
              <div>
                <h2 className="font-label text-sm font-bold text-foreground-950">{item.title}</h2>
                <p className="mt-1 text-sm leading-6 text-foreground-600">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
