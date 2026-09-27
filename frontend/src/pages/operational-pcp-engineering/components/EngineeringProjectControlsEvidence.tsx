const outputs = [
  {
    code: 'BL',
    title: 'Integrated baseline',
    description: 'Requirements, scope, work breakdown, interfaces, schedule and cost structures.',
    signal: 'Control foundation',
  },
  {
    code: 'DM',
    title: 'Design maturity register',
    description: 'Traceability, approvals, technical decisions and configuration status.',
    signal: 'Design confidence',
  },
  {
    code: 'IP',
    title: 'Integrated plan',
    description: 'Engineering, procurement, tooling, testing, production and launch dependencies.',
    signal: 'Delivery sequence',
  },
  {
    code: 'EV',
    title: 'EVM and forecast view',
    description: 'Performance indicators, variance analysis and estimate confidence.',
    signal: 'Cost visibility',
  },
  {
    code: 'RK',
    title: 'Risk and change register',
    description: 'Technical, supplier, quality, safety and commercial exposure.',
    signal: 'Early warning',
  },
  {
    code: 'RD',
    title: 'Readiness pack',
    description: 'Verification evidence, readiness gates and senior decision points.',
    signal: 'Assurance gate',
  },
];

export default function EngineeringProjectControlsEvidence() {
  return (
    <section id="outputs" className="scroll-mt-44 bg-background-100 py-16 md:py-24">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-[390px_minmax(0,1fr)] lg:items-start">
          <div className="lg:sticky lg:top-32">
            <span className="text-xs font-bold uppercase tracking-[.15em] text-accent-700">
              Engineering project-controls evidence
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-foreground-950 md:text-4xl">
              Create decision-ready evidence, not disconnected documents.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-foreground-600">
              Build a compact evidence pack that links technical progress, commercial confidence and programme readiness.
            </p>

            <div className="mt-8 rounded-lg border border-primary-950 bg-primary-950 p-6 text-white shadow-[0_24px_55px_rgba(2,20,28,.18)]">
              <span className="text-xs font-bold uppercase tracking-[.15em] text-signal-300">Evidence pack</span>
              <p className="mt-3 text-2xl font-bold leading-tight">Six connected outputs.</p>
              <p className="mt-3 text-sm leading-relaxed text-white/68">
                Each output supports a real decision: approve, intervene, re-plan or release.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-background-200 bg-white p-4 shadow-[0_18px_50px_rgba(2,20,28,.08)] md:p-6">
            <div className="grid gap-3">
              {outputs.map((output, index) => (
                <article
                  key={output.code}
                  className="group grid gap-4 rounded-lg border border-background-200 bg-background-50 p-4 transition hover:border-accent-400 hover:bg-white hover:shadow-[0_14px_34px_rgba(2,20,28,.08)] md:grid-cols-[72px_minmax(0,1fr)_170px] md:items-center"
                >
                  <div className="flex items-center gap-3 md:block">
                    <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-sm font-bold text-accent-700 shadow-sm ring-1 ring-background-200 group-hover:bg-primary-950 group-hover:text-signal-300">
                      {output.code}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-[.14em] text-foreground-400 md:mt-3 md:block">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold leading-snug text-foreground-950">{output.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground-600">{output.description}</p>
                  </div>

                  <div className="flex items-center gap-2 rounded-full border border-background-200 bg-white px-3 py-2 text-xs font-bold text-foreground-700 md:justify-center">
                    <span className="h-2 w-2 rounded-full bg-accent-500" />
                    {output.signal}
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
