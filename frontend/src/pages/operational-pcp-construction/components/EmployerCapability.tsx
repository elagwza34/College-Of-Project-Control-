import SiteLink from '@/components/base/SiteLink';
import { sectorConfig } from '../sectorData';

const maturity = [
  ['Reactive', 'Manual reporting', 'Late variance visibility', 'Unclear ownership'],
  ['Standardised', 'Common templates', 'Defined control cycles', 'Consistent governance'],
  ['Integrated', 'Connected baseline', 'Cross-functional evidence', 'Early-warning discipline'],
  ['Decision-led', 'Forecast confidence', 'Risk-informed intervention', 'Portfolio-level prioritisation'],
];

export default function EmployerCapability() {
  return (
    <section
      id="maturity"
      className="relative isolate scroll-mt-44 overflow-hidden bg-primary-950 bg-cover bg-center py-16 text-white md:bg-fixed md:py-24"
      style={{ backgroundImage: `url('${sectorConfig.hero.sectorImage}')` }}
    >
      <div className="absolute inset-0 -z-10 bg-primary-950/82" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#001714_0%,rgba(0,23,20,.88)_42%,rgba(0,47,44,.66)_100%)]" aria-hidden="true" />

      <div className="container-site">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-[.15em] text-signal-300">Employer capability</span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-white md:text-4xl">
              Move from reactive reporting to decision-led control.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/76">
              Employers can use the pathways to develop a more consistent project-controls operating model across planning, cost, risk, reporting and governance.
            </p>
            <SiteLink href="/book-a-session" className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-signal-400 px-5 py-3 text-sm font-bold text-primary-950 shadow-lg transition-colors hover:bg-signal-300">
              Request a capability conversation
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-950 text-white">
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </span>
            </SiteLink>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {maturity.map(([stage, ...items], index) => (
              <article key={stage} className="rounded-lg border border-white/25 bg-primary-950/62 p-5 text-white shadow-xl backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-primary-950">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="text-xl font-bold text-white">{stage}</h3>
                </div>
                <ul className="mt-5 space-y-3">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-white/82">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal-400 text-[13px] text-primary-950">
                        <i className="ri-check-line" aria-hidden="true" />
                      </span>
                      <span>{item}</span>
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
