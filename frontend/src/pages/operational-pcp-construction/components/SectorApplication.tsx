const applications = [
  {
    id: 'app-civil',
    icon: 'ri-building-4-line',
    label: 'Construction & civil engineering',
    title: 'Keep design, sequence and delivery connected.',
    decision: 'Use integrated planning, earned value, risk and change control to manage construction sequence, productivity, procurement interfaces and recovery decisions.',
    roles: 'Planner, project-controls analyst, project manager, cost professional',
    evidence: 'Baseline, schedule health, progress and change-control pack',
    pain: 'Design changes and delivery sequence are not connected early enough',
    result: 'Earlier intervention and more credible completion forecasting',
  },
  {
    id: 'app-transport',
    icon: 'ri-road-map-line',
    label: 'Transport & infrastructure',
    title: 'Coordinate interfaces across long, complex delivery chains.',
    decision: 'Strengthen interface planning, programme governance, risk escalation and integrated reporting across contractors, packages and public stakeholders.',
    roles: 'Programme planner, controls manager, PMO lead, assurance specialist',
    evidence: 'Interface register, integrated master schedule and governance pack',
    pain: 'Package progress does not reconcile with programme milestones',
    result: 'Clearer cross-package confidence and escalation',
  },
  {
    id: 'app-energy',
    icon: 'ri-flashlight-line',
    label: 'Energy & utilities',
    title: 'Control high-risk delivery with stronger assurance.',
    decision: 'Connect technical, commercial and delivery risk so programme decisions are based on coherent evidence rather than separate systems.',
    roles: 'Project engineer, risk lead, cost engineer, programme controls manager',
    evidence: 'Risk-adjusted forecast, assurance review and decision log',
    pain: 'Technical and commercial risk are reported in separate systems',
    result: 'More coherent risk-informed programme decisions',
  },
  {
    id: 'app-portfolio',
    icon: 'ri-dashboard-3-line',
    label: 'Major programmes & portfolios',
    title: 'Prioritise investment and intervention across many projects.',
    decision: 'Connect portfolio reporting, PMO governance and benefit-led prioritisation so leadership can focus resources and intervention.',
    roles: 'Head of project controls, portfolio manager, PMO director, programme lead',
    evidence: 'Portfolio dashboard, prioritisation model and PMO operating model',
    pain: 'All projects compete for attention without a common decision framework',
    result: 'Evidence-led prioritisation and intervention',
  },
];

export default function SectorApplication() {
  return (
    <section id="applications" className="scroll-mt-44 bg-white py-16 md:py-24">
      <div className="container-site">
        <header className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-[.15em] text-accent-700">Sector application</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-foreground-950 md:text-4xl">
            Apply the same control discipline to different built environments.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-foreground-600">
            Case studies, templates and evidence can be contextualised to the type of construction and infrastructure decisions the learner or employer manages.
          </p>
        </header>

        <div className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-2">
          {applications.map((item) => (
            <article key={item.id} id={item.id} className="rounded-lg border border-background-200 bg-background-50 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-950 text-2xl text-signal-300">
                  <i className={item.icon} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.14em] text-accent-700">{item.label}</p>
                  <h3 className="mt-2 text-xl font-bold leading-snug text-foreground-950">{item.title}</h3>
                </div>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-foreground-600">{item.decision}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  ['Typical roles', item.roles],
                  ['Typical evidence', item.evidence],
                  ['Common pain', item.pain],
                  ['Desired result', item.result],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-md bg-white p-4">
                    <p className="text-xs font-bold uppercase tracking-[.12em] text-foreground-400">{label}</p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground-700">{value}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
