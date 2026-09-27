const riskItems = [
  {
    number: '01',
    title: 'Fragmented programme baselines',
    copy: 'Engineering, procurement, construction and commissioning are not governed as one integrated promise.',
  },
  {
    number: '02',
    title: 'Late risk visibility',
    copy: 'Supply-chain, regulatory, safety and interface risks surface after recovery options have narrowed.',
  },
  {
    number: '03',
    title: 'Weak operational linkage',
    copy: 'Project data is reported without connecting delivery decisions to reliability, readiness or benefits.',
  },
];

const controlAreas = [
  ['Schedule', 'Milestones, outages and commissioning'],
  ['Cost', 'Forecast, inflation and contingency'],
  ['Risk', 'Safety, regulation and interfaces'],
  ['Change', 'Baseline, scope and configuration'],
  ['Governance', 'Assurance, readiness and decision'],
];

export default function TheEnergyDeliveryChallenge() {
  return (
    <section id="challenge" className="scroll-mt-44 bg-white py-16 md:py-24">
      <div className="container-site grid items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,1fr)] lg:gap-14">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.18em] text-accent-700">
            <span className="mr-3 inline-block h-px w-7 align-middle bg-signal-400" aria-hidden="true" />
            The energy delivery challenge
          </p>

          <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-[1.02] text-foreground-950 md:text-5xl">
            Energy programmes carry connected risks. Reporting often does not.
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground-600">
            Energy and utilities programmes become harder to control when technical scope, regulatory gates, outage windows, contractor interfaces, cost forecasts, risk, change and operational readiness are managed as separate conversations.
          </p>

          <p className="mt-5 max-w-2xl rounded-lg border-l-4 border-signal-400 bg-signal-50 px-5 py-4 text-sm font-bold leading-relaxed text-foreground-950">
            The purpose of project controls is not to produce more dashboards. It is to make safer, earlier and better-informed intervention possible.
          </p>

          <div className="mt-7 grid gap-3">
            {riskItems.map((item) => (
              <article key={item.number} className="card-premium flex gap-4 p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-50 text-xs font-bold text-accent-700">
                  {item.number}
                </span>
                <div>
                  <h3 className="text-base font-bold text-foreground-950">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-foreground-600">{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="overflow-hidden rounded-xl border border-background-200 bg-primary-950 text-white shadow-card">
          <div className="border-b border-white/10 p-6 md:p-8">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-signal-300">Integrated project controls</p>
            <h3 className="mt-4 max-w-md text-3xl font-semibold leading-tight text-white md:text-4xl">
              Connect evidence before decisions become recovery work.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              A joined-up control model links schedule, cost, risk, change and governance into one delivery view.
            </p>
          </div>

          <div className="grid gap-3 p-5 sm:grid-cols-2 md:p-6">
            {controlAreas.map(([title, copy]) => (
              <article key={title} className="rounded-lg border border-white/10 bg-white/[.07] p-4">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-lime-100 text-primary-950">
                  <i className="ri-checkbox-circle-line text-lg" aria-hidden="true" />
                </div>
                <h4 className="text-base font-bold text-white">{title}</h4>
                <p className="mt-1 text-xs leading-relaxed text-white/65">{copy}</p>
              </article>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
