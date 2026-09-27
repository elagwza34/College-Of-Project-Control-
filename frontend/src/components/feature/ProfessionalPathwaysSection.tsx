import SiteLink from '@/components/base/SiteLink';
const pathways = [
  {
    number: '01',
    icon: 'ri-tools-line',
    label: 'Hands-on delivery',
    title: 'Operational Pathway',
    audience: 'For planners, schedulers, cost professionals and project controls practitioners responsible for reliable delivery information.',
    focus: ['PMP (2 credits)', 'AI in Project Management / Controls (1 credit)', 'Risk Management (APM) (1 credit)', 'Project Planning and Control (2 credits)', 'EVM (1 credit)', 'PMI-SP (1 credit)'],
    outcome: 'Build stronger day-to-day control of scope, time, cost, risk and project performance.',
    href: '/project-controls-professional/operational-route',
  },
  {
    number: '02',
    icon: 'ri-compass-3-line',
    label: 'Leadership and governance',
    title: 'Strategic Pathway',
    audience: 'For senior project controls, PMO, programme, portfolio and governance professionals supporting complex decisions.',
    focus: ['PMP (2 credits)', 'AI in Project Management / Controls (1 credit)', 'Risk Management (APM) (1 credit)', 'PMI (PMO) (1 credit)', 'Portfolio Management (APMG) (1 credit)', 'Managing Successful Programmes (1 credit)'],
    outcome: 'Develop the strategic judgement needed to connect project performance with organisational priorities.',
    href: '/project-controls-professional/strategic-route',
  },
  {
    number: '03',
    icon: 'ri-award-line',
    label: 'Professional progression',
    title: 'Chartered Pathway',
    audience: 'For experienced professionals prioritising technical-knowledge evidence and readiness for APM Chartered Project Professional progression.',
    focus: ['Certified PMO Professional Level 6 (4 credits)', 'AI in Project Management (1 credit)', 'Portfolio Management (APMG) (1 credit)', 'Earned Value Management (APMG) (1 credit)'],
    outcome: 'Structure development around advanced professional practice and an eligible route towards independent APM assessment.',
    href: '/project-controls-professional/chartered-pmo-pathway',
  },
];

interface ProfessionalPathwaysSectionProps {
  id?: string;
  className?: string;
}

export default function ProfessionalPathwaysSection({
  id = 'pathways',
  className = '',
}: ProfessionalPathwaysSectionProps) {
  return (
    <section id={id} className={`relative overflow-hidden bg-gradient-to-br from-primary-950 via-primary-800 to-primary-950 py-16 md:py-24 ${className}`}>
      <div className="pattern-cubes-overlay pointer-events-none opacity-[0.06]" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-accent-400/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-accent-300/10 blur-3xl" aria-hidden="true" />

      <div className="container-site relative z-10">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-accent-200">
            <i className="ri-route-line" aria-hidden="true" />
            Professional pathways
          </span>
          <h2 className="mt-5 text-3xl font-heading font-bold leading-tight text-white md:text-4xl lg:text-4xl">
            Three routes shaped around how you work
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base">
            Compare each pathway against your current responsibilities: hands-on planning and controls, programme and portfolio decisions, or professional evidence development. Progression depends on your role, experience and the requirements of any external award.
          </p>
        </div>

        <div className="mt-10 space-y-6">
          {pathways.map((pathway) => (
            <article
              key={pathway.title}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-background-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 hover:shadow-xl"
            >
              <div className="h-1.5 bg-gradient-to-r from-primary-700 via-accent-500 to-signal-500" aria-hidden="true" />
              <div className="flex flex-1 flex-col p-6 md:p-7">
                <div className="flex items-center justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-700 transition-colors group-hover:bg-primary-700 group-hover:text-white">
                    <i className={`${pathway.icon} text-xl`} aria-hidden="true" />
                  </span>
                  <span className="text-sm font-bold text-background-400">{pathway.number}</span>
                </div>

                <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-highlight-700">{pathway.label}</p>
                <h3 className="mt-2 text-2xl font-heading font-bold text-foreground-950">{pathway.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-foreground-600">{pathway.audience}</p>

                <ul className="mt-6 space-y-2.5 border-t border-background-200 pt-5">
                  {pathway.focus.map((item) => (
                    <li key={item} className="flex items-center justify-between gap-4 rounded-lg border border-background-200 bg-background-50 px-3 py-2.5 text-sm font-medium text-foreground-700">
                      <span className="flex items-center gap-2.5"><i className="ri-check-line text-signal-600" aria-hidden="true" />{item.replace(/ \(\d+ credits?\)$/, '')}</span>
                      <span className="shrink-0 rounded-full bg-primary-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-primary-800">{item.match(/\((\d+ credits?)\)$/)?.[1] ?? 'Pathway'}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-xl border border-primary-100 bg-primary-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary-700">What it develops</p>
                  <p className="mt-2 text-xs leading-relaxed text-foreground-600">{pathway.outcome}</p>
                </div>

                <SiteLink
                  href={pathway.href}
                  className="cta-button mt-7 inline-flex min-h-12 items-center justify-center rounded-md bg-primary-700 px-5 text-sm font-bold text-white transition-colors hover:bg-primary-800"
                >
                  Explore {pathway.title}
                  <i className="ri-arrow-right-line ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </SiteLink>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-accent-200 bg-accent-50 p-6 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <h3 className="text-xl font-heading font-bold text-foreground-950">Need a tailored six-credit route?</h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground-600">A different module combination may be agreed around current duties, employer needs and workplace evidence.</p>
          </div>
          <SiteLink href="/book-a-session" className="cta-button mt-5 inline-flex min-h-11 shrink-0 items-center rounded-md border border-primary-300 bg-white px-5 text-sm font-bold text-primary-800 transition-colors hover:bg-primary-50 md:mt-0">
            Discuss your route
            <i className="ri-arrow-right-line ml-2" aria-hidden="true" />
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
