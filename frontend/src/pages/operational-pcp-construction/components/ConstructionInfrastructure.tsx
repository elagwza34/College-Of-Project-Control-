import SiteLink from '@/components/base/SiteLink';
import { sectorConfig } from '../sectorData';

const metrics = [
  ['4', 'professional pathways'],
  ['2', 'access routes'],
  ['6', 'credit routes'],
];

export default function ConstructionInfrastructure() {
  return (
    <header className="relative isolate flex min-h-[88vh] items-center overflow-hidden bg-primary-950 pb-14 pt-32 text-white md:min-h-[92vh] md:pb-20 md:pt-40">
      <img src={sectorConfig.hero.sectorImage} alt="" aria-hidden="true" fetchPriority="high" className="absolute inset-0 -z-30 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,#001714_0%,rgba(0,23,20,.9)_38%,rgba(0,47,44,.52)_68%,rgba(0,23,20,.2)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-background-50 to-transparent" />

      <div className="container-site w-full">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="max-w-5xl">
            <p className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-xs font-bold uppercase tracking-[.16em] text-signal-200 backdrop-blur">
              <i className="ri-building-2-line text-base" aria-hidden="true" />
              Construction and infrastructure
            </p>
            <h1 className="mt-6 max-w-none text-4xl font-extrabold leading-tight text-white md:text-[58px]">
              <span className="block md:whitespace-nowrap">Build the capability to control</span>
              <span className="block md:whitespace-nowrap">complex delivery.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/88">
              Develop project-controls capability across planning, scheduling, cost, risk, governance and decision support. Choose the pathway that matches the responsibility your people carry today and the level they are preparing to reach next.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SiteLink href="/book-a-session" className="btn-primary inline-flex min-h-12 items-center gap-2 px-6 font-bold">
                Discuss your team's capability
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </SiteLink>
              <SiteLink href="#eligibility" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 font-bold text-white backdrop-blur transition-colors hover:bg-white/18">
                Check workforce eligibility
                <i className="ri-route-line" aria-hidden="true" />
              </SiteLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
