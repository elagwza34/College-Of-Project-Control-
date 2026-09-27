const pressures = [
  {
    title: 'Formal baselines and controlled change',
    copy: 'Scope, cost and timetable changes need visible impact analysis, agreed approval routes and traceable decisions.',
    icon: 'ri-file-list-3-line',
  },
  {
    title: 'Accountability and value for money',
    copy: 'Reports must support governance, assurance and responsible use of public funds, with clear recommendations.',
    icon: 'ri-scales-3-line',
  },
  {
    title: 'Multi-supplier delivery',
    copy: 'Departments, partners and suppliers need one coherent view of dependencies, milestones and commitments.',
    icon: 'ri-team-line',
  },
  {
    title: 'Data, security and service continuity',
    copy: 'Controls must respect information governance, access requirements, resilience and critical-service duties.',
    icon: 'ri-shield-keyhole-line',
  },
];

export default function WhyPublicSectorDeliveryIsDifferent() {
  return (
    <section id="challenge" className="scroll-mt-44 bg-background-50 py-16 md:py-24">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-accent-700">
              <span className="mr-3 inline-block h-px w-7 align-middle bg-signal-400" aria-hidden="true" />
              Why public-sector delivery is different
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.03] text-foreground-950 md:text-5xl">
              Project capability must remain clear, auditable and defensible.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-foreground-600">
              Public programmes operate across formal governance, constrained budgets, complex stakeholders and scrutiny.
              Decisions must connect scope, affordability, risk, service outcomes and public value.
            </p>
          </div>

          <div className="rounded-lg border border-background-200 bg-white p-5 shadow-card md:p-6">
            <div className="grid gap-px overflow-hidden rounded-lg border border-background-200 bg-background-200 sm:grid-cols-2">
              {pressures.map((item) => (
                <article key={item.title} className="bg-white p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent-50 text-xl text-accent-800">
                    <i className={item.icon} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold leading-snug text-foreground-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground-600">{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
