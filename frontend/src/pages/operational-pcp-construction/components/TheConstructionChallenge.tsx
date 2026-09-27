const problems = [
  {
    icon: 'ri-node-tree',
    title: 'Fragmented baselines',
    detail: 'Scope, schedule and cost are not governed as one integrated promise.',
  },
  {
    icon: 'ri-alarm-warning-line',
    title: 'Delayed warning signals',
    detail: 'Variance appears after recovery options have narrowed.',
  },
  {
    icon: 'ri-presentation-line',
    title: 'Weak decision linkage',
    detail: 'Project data is presented without interpretation or recommendation.',
  },
];

export default function TheConstructionChallenge() {
  return (
    <section id="challenge" className="scroll-mt-44 bg-background-50 py-16 md:py-24">
      <div className="container-site">
        <div className="grid items-start gap-10 lg:grid-cols-[.88fr_1.12fr]">
          <div className="sticky top-32">
            <span className="text-xs font-bold uppercase tracking-[.15em] text-accent-700">The construction challenge</span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-foreground-950 md:text-4xl">
              Data exists. Decision confidence often does not.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-foreground-600">
              Complex construction and infrastructure programmes become harder to control when schedules, cost forecasts, risk, change and governance operate as separate conversations. The result is late intervention, reactive reporting and reduced confidence at the point senior decisions must be made.
            </p>
            <div className="mt-8 rounded-lg border border-primary-200 bg-primary-950 p-5 text-white">
              <p className="text-xs font-bold uppercase tracking-[.14em] text-signal-200">Purpose</p>
              <p className="mt-3 text-lg font-semibold leading-snug">
                Make better intervention possible earlier, not simply produce more reports.
              </p>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="grid gap-4">
              {problems.map((problem, index) => (
                <article key={problem.title} className="group grid gap-4 rounded-lg border border-background-200 bg-white p-5 shadow-sm transition-transform hover:-translate-y-1 md:grid-cols-[72px_minmax(0,1fr)]">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-accent-50 text-3xl text-accent-700">
                    <i className={problem.icon} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[.16em] text-foreground-400">Control gap {index + 1}</p>
                    <h3 className="mt-2 text-xl font-bold text-foreground-950">{problem.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground-600">{problem.detail}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="rounded-lg bg-primary-950 p-6 text-white">
              <p className="text-xs font-bold uppercase tracking-[.14em] text-signal-300">Integrated project controls</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  ['Schedule', 'Critical path and confidence'],
                  ['Cost', 'Forecast and variance'],
                  ['Risk', 'Exposure and response'],
                  ['Change', 'Baseline and control'],
                  ['Governance', 'Decision and assurance'],
                ].map(([label, detail]) => (
                  <div key={label} className="rounded-md border border-white/12 bg-white/8 p-4">
                    <h3 className="font-bold text-signal-200">{label}</h3>
                    <p className="mt-1 text-sm text-white/72">{detail}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 rounded-md bg-signal-400 p-4 text-sm font-bold text-primary-950">Connected evidence creates confident action.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
