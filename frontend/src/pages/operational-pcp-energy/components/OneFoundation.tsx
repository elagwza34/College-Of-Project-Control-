const lifecycleItems = [
  ['ri-home-8-line', 'Power generation'],
  ['ri-solar-panel-line', 'Renewables'],
  ['ri-briefcase-4-line', 'Electricity networks'],
  ['ri-water-percent-line', 'Oil & gas'],
  ['ri-flask-line', 'Nuclear & water'],
  ['ri-bar-chart-box-line', 'Major energy programmes'],
];

export default function OneFoundation() {
  return (
    <section id="sector-section-1" className="scroll-mt-44 bg-background-100 py-14 md:py-16">
      <div className="container-site">
        <div className="grid gap-6 lg:grid-cols-[minmax(260px,0.72fr)_minmax(0,1.4fr)] lg:items-stretch">
          <div className="rounded-xl border border-background-200 bg-primary-950 p-6 text-white shadow-card md:p-7">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-signal-300">
              Designed for energy and utilities
            </p>
            <h2 className="mt-4 max-w-sm text-3xl font-semibold leading-tight text-white md:text-4xl">
              One professional foundation across the energy lifecycle.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              A common project-controls language for capital delivery, operational readiness, risk, cost and evidence-led decisions.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {lifecycleItems.map(([icon, label]) => (
              <article key={label} className="card-premium flex min-h-32 items-center gap-4 p-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-50 text-xl text-accent-700">
                  <i className={icon} aria-hidden="true" />
                </span>
                <h3 className="text-base font-bold leading-snug text-foreground-950">{label}</h3>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
