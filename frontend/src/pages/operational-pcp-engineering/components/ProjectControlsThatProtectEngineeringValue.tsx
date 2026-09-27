import SiteLink from '@/components/base/SiteLink';

const controlAreas = [
  {
    title: 'Design visibility',
    description: 'Connect requirements, design maturity, interfaces, decisions and approvals.',
    icon: 'ri-focus-3-line',
  },
  {
    title: 'Integrated planning',
    description: 'Align engineering, sourcing, tooling, testing, production and launch milestones.',
    icon: 'ri-node-tree',
  },
  {
    title: 'Cost and value',
    description: 'Build credible forecasts and understand the effect of technical trade-offs.',
    icon: 'ri-funds-line',
  },
  {
    title: 'Risk and quality',
    description: 'Identify technical, supply-chain and readiness exposure before commitment.',
    icon: 'ri-shield-check-line',
  },
];

const deliverySignals = ['Requirements', 'Design', 'Tooling', 'Testing', 'Launch'];

export default function ProjectControlsThatProtectEngineeringValue() {
  return (
    <section id="value" className="scroll-mt-44 bg-white">
      <div className="bg-background-50 py-16 md:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,1fr)_460px] lg:items-center">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[.15em] text-signal-300">
              Project controls that protect engineering value
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-foreground-950 md:text-5xl">
              Deliver engineered systems with precision, predictability and controlled change.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground-600">
              Engineering programmes operate through tightly connected requirements, design maturity, suppliers, tooling,
              quality, testing, production readiness and operational acceptance. Integrated controls expose pressure
              earlier, so teams can make stronger decisions before cost and delay become embedded.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {['Stable baselines', 'Earlier exposure', 'Better trade-offs'].map((item) => (
                <div key={item} className="border-l border-accent-500/70 pl-4">
                  <p className="text-sm font-bold text-foreground-950">{item}</p>
                  <p className="mt-1 text-xs leading-relaxed text-foreground-500">Engineering controls outcome</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-7 top-8 hidden h-[calc(100%-4rem)] w-px bg-accent-500/35 sm:block" />
            <div className="space-y-3">
              {deliverySignals.map((signal, index) => (
                <div
                  key={signal}
                  className="relative flex items-center gap-4 rounded-lg border border-background-200 bg-white p-4 shadow-[0_18px_45px_rgba(2,20,28,.08)]"
                >
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-950 text-sm font-bold text-signal-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-foreground-950">{signal}</p>
                    <p className="mt-1 text-xs leading-relaxed text-foreground-500">Controlled decision point</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container-site -mt-10 pb-16 md:pb-24">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {controlAreas.map((area) => (
            <article
              key={area.title}
              className="rounded-lg border border-background-200 bg-white p-6 shadow-[0_18px_45px_rgba(2,20,28,.1)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-950 text-xl text-signal-300">
                <i className={area.icon} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-bold leading-snug text-foreground-900">{area.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground-600">{area.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-6 rounded-lg border border-background-200 bg-background-50 p-6 md:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-[.15em] text-accent-700">Strategic value</span>
            <h3 className="mt-3 text-2xl font-bold leading-tight text-foreground-900">
              Stable baselines. Better trade-offs. Production-ready outcomes.
            </h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground-600">
              Connect engineering scope, planning, cost, risk, quality, change and governance in one coherent control
              environment across products, projects and portfolios.
            </p>
          </div>
          <SiteLink
            href="#pathways"
            className="inline-flex items-center justify-center rounded-full bg-primary-950 px-6 py-3 text-sm font-bold text-white shadow-[0_14px_32px_rgba(2,20,28,.18)] transition hover:bg-primary-900"
          >
            Explore pathways
            <i className="ri-arrow-right-line ml-2 text-lg" aria-hidden="true" />
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
