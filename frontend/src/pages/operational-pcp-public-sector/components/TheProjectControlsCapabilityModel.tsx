const capabilities = [
  ['Planning and scheduling', 'Roadmaps, baselines, dependencies, progress and scenario planning.'],
  ['Cost and forecasting', 'Budgets, commitments, estimates, variance, affordability and forecast confidence.'],
  ['Risk and change', 'Risk appetite, escalation, impact assessment, change control and mitigation.'],
  ['Performance reporting', 'Integrated data, trends, dashboards and a decision-ready narrative.'],
  ['Governance and assurance', 'Evidence, auditability, approvals, public accountability and value for money.'],
];

export default function TheProjectControlsCapabilityModel() {
  return (
    <section id="capability" className="scroll-mt-44 bg-white py-16 md:py-24">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-[360px_minmax(0,1fr)]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-accent-700">The project-controls capability model</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-foreground-950 md:text-4xl">
              Five capabilities for accountable public-project delivery.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-foreground-600">
              Build reliable controls that give senior leaders decision-ready insight, support earlier intervention and
              connect delivery to approved programme baselines.
            </p>
          </div>

          <div className="rounded-lg border border-background-200 bg-background-50 p-4 md:p-5">
            <div className="grid gap-3">
              {capabilities.map(([title, copy], index) => (
                <article key={title} className="grid gap-4 rounded-lg border border-background-200 bg-white p-5 shadow-sm sm:grid-cols-[64px_minmax(0,1fr)]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-950 text-sm font-bold text-signal-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-foreground-950">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground-600">{copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
