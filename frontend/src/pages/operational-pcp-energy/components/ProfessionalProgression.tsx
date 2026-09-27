const progressionStages = [
  {
    level: '01',
    stage: 'Operational foundation',
    title: 'Emerging energy controls professional',
    copy: 'Build dependable planning, reporting and performance-control practice for live energy delivery environments.',
    roles: ['PMO Analyst', 'Project Controls Analyst', 'Planner / Scheduler', 'Project Engineer'],
  },
  {
    level: '02',
    stage: 'Operational influence',
    title: 'Energy controls specialist',
    copy: 'Own stronger schedules, forecasts, earned value, risk evidence and change conversations.',
    roles: ['Senior Planner', 'Cost Engineer', 'Risk Analyst', 'Project Controls Manager'],
  },
  {
    level: '03',
    stage: 'Strategic influence',
    title: 'Programme controls leader',
    copy: 'Connect controls information to programme governance, outages, commissioning and senior decisions.',
    roles: ['Programme Manager', 'Outage Lead', 'Head of Planning', 'PMO Manager'],
  },
  {
    level: '04',
    stage: 'Enterprise influence',
    title: 'Portfolio and transition leadership',
    copy: 'Shape portfolio investment, assurance, transition priorities and confidence in long-cycle capital decisions.',
    roles: ['Head of Project Controls', 'Energy Portfolio Lead', 'PMO Director', 'Transition Lead'],
  },
];

export default function ProfessionalProgression() {
  return (
    <section id="roles" className="scroll-mt-44 bg-white py-16 md:py-24">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start">
          <header className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-accent-700">Professional progression</span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-foreground-950 md:text-5xl">
              Grow from delivery control to energy investment confidence.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-foreground-600">
              The route supports professionals as responsibility grows from reliable project controls practice into programme, portfolio and PMO influence.
            </p>
            <p className="mt-6 rounded-lg border-l-4 border-accent-500 bg-background-100 p-4 text-sm leading-relaxed text-foreground-700">
              Progression is illustrative. Promotion, external recognition and professional status remain subject to role, evidence, employer context and awarding-body requirements.
            </p>
          </header>

          <div className="grid gap-4 md:grid-cols-2">
            {progressionStages.map((item) => (
              <article key={item.level} className="rounded-lg border border-background-200 bg-background-50 p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent-700">{item.stage}</p>
                    <h3 className="mt-3 text-xl font-bold leading-snug text-foreground-950">{item.title}</h3>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-950 text-sm font-bold text-white">
                    {item.level}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-foreground-600">{item.copy}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {item.roles.map((role) => (
                    <span key={role} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-foreground-700 ring-1 ring-background-200">
                      {role}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
