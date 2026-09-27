import SiteLink from '@/components/base/SiteLink';
import { sectorConfig } from '../sectorData';

const maturityStages = [
  {
    step: '01',
    title: 'Reactive',
    description: 'Reporting exists, but leaders still find risk late.',
    signals: ['Manual reporting', 'Late risk visibility', 'Disconnected asset data'],
  },
  {
    step: '02',
    title: 'Standardised',
    description: 'Teams work from shared formats and recurring control cycles.',
    signals: ['Common templates', 'Defined control cycles', 'Consistent governance'],
  },
  {
    step: '03',
    title: 'Integrated',
    description: 'Schedule, cost, risk and readiness evidence begin to move together.',
    signals: ['Connected programme baseline', 'Cross-functional evidence', 'Readiness and early warning'],
  },
  {
    step: '04',
    title: 'Decision-led',
    description: 'Controls information is trusted enough to guide intervention and investment.',
    signals: ['Forecast confidence', 'Risk-informed action', 'Portfolio investment prioritisation'],
  },
];

export default function EmployerCapability() {
  return (
    <section
      id="maturity"
      className="relative isolate scroll-mt-44 overflow-hidden bg-primary-950 bg-cover bg-center py-16 text-white md:bg-fixed md:py-24"
      style={{ backgroundImage: `url('${sectorConfig.hero.sectorImage}')` }}
    >
      <div className="absolute inset-0 -z-10 bg-primary-950/88" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#001716_0%,rgba(0,32,35,.92)_48%,rgba(0,75,77,.68)_100%)]" aria-hidden="true" />

      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,430px)_minmax(0,1fr)] lg:items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-signal-300">Employer capability</span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">
              Move energy teams from reactive reporting to integrated assurance.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/74">
              Employers can use the pathway mix to build a common operating model across planning, cost, risk, regulatory assurance, reporting and operational readiness.
            </p>

            <div className="mt-7 rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur">
              <p className="text-sm font-bold text-white">Capability conversation</p>
              <p className="mt-2 text-sm leading-relaxed text-white/68">
                Review your current controls maturity, priority roles and the best-fit route for capital projects, programmes or PMO teams.
              </p>
            </div>

            <SiteLink href="/book-a-session" className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-full bg-signal-400 px-5 py-3 text-sm font-bold text-primary-950 shadow-lg transition-colors hover:bg-signal-300">
              Request a capability conversation
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-950 text-white">
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </span>
            </SiteLink>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {maturityStages.map((stage) => (
              <article key={stage.step} className="rounded-lg border border-white/20 bg-primary-950/60 p-5 shadow-xl backdrop-blur-md">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <span className="text-xs font-bold text-signal-300">{stage.step}</span>
                    <h3 className="mt-1 text-xl font-bold text-white">{stage.title}</h3>
                  </div>
                  <i className="ri-radar-line text-2xl text-signal-300" aria-hidden="true" />
                </div>

                <p className="mt-4 text-sm leading-relaxed text-white/68">{stage.description}</p>

                <ul className="mt-5 space-y-3">
                  {stage.signals.map((signal) => (
                    <li key={signal} className="flex items-start gap-3 text-sm text-white/82">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal-400 text-[13px] text-primary-950">
                        <i className="ri-check-line" aria-hidden="true" />
                      </span>
                      <span>{signal}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
