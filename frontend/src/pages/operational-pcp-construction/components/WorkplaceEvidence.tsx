const outputs = [
  ['ri-layout-masonry-line', 'Baseline and planning', 'Integrated project baseline', 'Connect scope, schedule, assumptions, governance and control points.'],
  ['ri-git-branch-line', 'Schedule intelligence', 'Schedule health and critical path', 'Test logic, float, interfaces and the credibility of completion dates.'],
  ['ri-bar-chart-grouped-line', 'Performance control', 'Earned value report', 'Connect progress, cost and variance with interpretation and action.'],
  ['ri-shield-check-line', 'Risk and change', 'Risk and change-control pack', 'Create a controlled route from uncertainty and change to decision.'],
  ['ri-dashboard-line', 'Executive reporting', 'Project-controls dashboard', 'Present concise evidence, confidence and recommended intervention.'],
  ['ri-organization-chart', 'PMO capability', 'PMO operating model', 'Define services, standards, decision rights and improvement priorities.'],
];

export default function WorkplaceEvidence() {
  return (
    <section id="outputs" className="scroll-mt-44 bg-background-100 py-16 md:py-24">
      <div className="container-site">
        <header className="grid gap-6 md:grid-cols-[minmax(0,1fr)_320px] md:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-[.15em] text-accent-700">Workplace evidence</span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-foreground-950 md:text-4xl">
              Create outputs that strengthen real delivery control.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-foreground-600">
              Professionals should leave with credible artefacts, clearer judgement and evidence of how they improved planning, governance or decision support in their working context.
            </p>
          </div>
          <div className="rounded-lg bg-primary-950 p-5 text-white">
            <p className="text-xs font-bold uppercase tracking-[.14em] text-signal-300">Evidence pack</p>
            <p className="mt-2 text-3xl font-extrabold">6 outputs</p>
            <p className="mt-2 text-sm text-white/70">Adapted to role, employer context and confidentiality requirements.</p>
          </div>
        </header>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {outputs.map(([icon, tag, title, description]) => (
            <article key={title} className="rounded-lg border border-background-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <i className={`${icon} text-3xl text-primary-700`} aria-hidden="true" />
                <span className="rounded-full bg-accent-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[.08em] text-accent-800">{tag}</span>
              </div>
              <h3 className="mt-5 text-xl font-bold text-foreground-950">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground-600">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
