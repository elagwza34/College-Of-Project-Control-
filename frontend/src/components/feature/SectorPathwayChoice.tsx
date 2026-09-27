import SiteLink from '@/components/base/SiteLink';
import { useState, type KeyboardEvent } from 'react';

const routes = [
  {
    key: 'operational',
    name: 'Operational Pathway',
    href: '/project-controls-professional/operational-route',
    eyebrow: 'Pathway 01 · 6 credits',
    panelEyebrow: 'Operational pathway',
    audience: 'Emerging and developing professionals',
    title: 'Build reliable controls close to delivery.',
    description: 'For planners, schedulers, PMO analysts, project-controls analysts, assistant project managers and professionals moving into structured project-controls responsibility.',
    credits: '6',
    creditNote: 'Three mandatory core credits plus three specialist credits selected to match operational responsibilities.',
    tags: ['Planning & scheduling', 'Earned value', 'Risk & control', 'AI-enabled practice'],
    coreTitle: 'Mandatory core',
    specialistTitle: 'Choose three specialist credits',
    core: [
      ['PMP preparation and professional development', 'Project management foundation and applied practice', '2 credits'],
      ['AI in Project Controls Certificate', 'Responsible AI for analysis, reporting and workflow', '1 credit'],
    ],
    specialist: [
      ['PMI Scheduling Professional (PMI-SP)', '1 credit'],
      ['Earned Value Management (EVM)', '1 credit'],
      ['Risk Management', '1 credit'],
      ['Project Planning & Control (PPC)', '1 credit'],
    ],
    outcomes: [
      ['Build integrated schedules', 'Strengthen planning, logic and critical-path interpretation.'],
      ['Measure performance', 'Connect progress, cost and earned-value evidence.'],
      ['Support earlier action', 'Translate project information into operational recommendations.'],
    ],
  },
  {
    key: 'strategic',
    name: 'Strategic Pathway',
    href: '/project-controls-professional/strategic-route',
    eyebrow: 'Pathway 02 · 6 credits',
    panelEyebrow: 'Strategic pathway',
    audience: 'Senior controls and programme leaders',
    title: 'Connect controls to programme decisions.',
    description: 'For senior controls, programme, portfolio and PMO leaders who need stronger governance, prioritisation and decision support across complex delivery environments.',
    credits: '6',
    creditNote: 'Three mandatory core credits plus three specialist credits selected to match strategic responsibilities.',
    tags: ['Programme leadership', 'Portfolio thinking', 'PMO governance', 'Decision support'],
    coreTitle: 'Mandatory core',
    specialistTitle: 'Choose three specialist credits',
    core: [
      ['PMP preparation and professional development', 'Strategic project leadership foundation', '2 credits'],
      ['AI in Project Controls Certificate', 'Decision support and controls intelligence', '1 credit'],
    ],
    specialist: [
      ['Managing Successful Programmes (MSP)', '1 credit'],
      ['Managing Portfolios', '1 credit'],
      ['Risk Management', '1 credit'],
      ['Project Management Office (PMO)', '1 credit'],
    ],
    outcomes: [
      ['Strengthen governance', 'Connect controls evidence to programme decision forums.'],
      ['Prioritise intervention', 'Identify where senior action will protect outcomes.'],
      ['Improve assurance', 'Translate risk, performance and confidence into clearer leadership choices.'],
    ],
  },
  {
    key: 'chartered',
    name: 'Chartered Pathway',
    href: '/project-controls-professional/chartered-pmo-pathway',
    eyebrow: 'Pathway 03 · 6 credits',
    panelEyebrow: 'Chartered pathway',
    audience: 'Senior evidence and professional progression',
    title: 'Build evidence for senior professional practice.',
    description: 'For experienced practitioners developing senior professional evidence across PMO governance, integrated controls, earned value, portfolio practice and professional judgement.',
    credits: '6',
    creditNote: 'Five mandatory core credits plus one specialist credit selected to support professional evidence.',
    tags: ['PMO governance', 'Integrated controls', 'Earned value', 'Professional evidence'],
    coreTitle: 'Mandatory core',
    specialistTitle: 'Choose one specialist credit',
    core: [
      ['Certified PMO Professional Level 6', 'PMO governance, operating models and professional evidence', '4 credits'],
      ['AI in Project Controls Certificate', 'Responsible AI-enabled controls practice', '1 credit'],
    ],
    specialist: [
      ['Portfolio Management', '1 credit'],
      ['Earned Value Management', '1 credit'],
    ],
    outcomes: [
      ['Evidence senior judgement', 'Show how professional decisions improve project or portfolio control.'],
      ['Connect governance', 'Align PMO standards, controls and assurance.'],
      ['Prepare progression', 'Support readiness discussions without guaranteeing external awards.'],
    ],
  },
  {
    key: 'pmo',
    name: 'PMO Certified',
    href: '/project-controls-professional/pmo-governance-route',
    eyebrow: 'Pathway 04 · 4 credits',
    panelEyebrow: 'PMO certified',
    audience: 'PMO governance and operating-model specialists',
    title: 'Shape PMO services, standards and operating models.',
    description: 'For PMO professionals and leaders who need a focused route around governance, services, decision rights, reporting standards and organisational capability.',
    credits: '4',
    creditNote: 'A focused four-credit route with no elective selection.',
    tags: ['PMO services', 'Governance', 'Operating models', 'Standards'],
    coreTitle: 'Fixed route',
    specialistTitle: 'Applied PMO focus',
    core: [
      ['Certified PMO Professional Level 6', 'PMO governance, operating models and organisational capability', '4 credits'],
    ],
    specialist: [
      ['PMO services and decision rights', 'Included'],
      ['Reporting standards and assurance', 'Included'],
      ['Operating-model improvement', 'Included'],
    ],
    outcomes: [
      ['Define PMO value', 'Clarify services, standards and decision support.'],
      ['Improve governance', 'Strengthen repeatable reporting and assurance practice.'],
      ['Build capability', 'Support PMO maturity and operating-model change.'],
    ],
  },
];

export default function SectorPathwayChoice({ backgroundImage: _backgroundImage = '' }: { backgroundImage?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = routes[activeIndex];
  const focusTab = (index: number) => {
    window.requestAnimationFrame(() => {
      document.getElementById(`pathway-tab-${routes[index].key}`)?.focus();
    });
  };
  const handleTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const lastIndex = routes.length - 1;
    let nextIndex = activeIndex;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') nextIndex = activeIndex === lastIndex ? 0 : activeIndex + 1;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') nextIndex = activeIndex === 0 ? lastIndex : activeIndex - 1;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = lastIndex;
    if (nextIndex === activeIndex && event.key !== 'Home' && event.key !== 'End') return;
    event.preventDefault();
    setActiveIndex(nextIndex);
    focusTab(nextIndex);
  };

  return (
    <section id="pathways" className="scroll-mt-44 bg-background-100 py-16 md:py-24">
      <div className="container-site">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-accent-700">Choose your professional direction</p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-foreground-950 md:text-4xl">
            Four pathways. Different levels of responsibility.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-foreground-600">
            Each route is designed around the decisions professionals make at work. Compare the core direction first, then confirm role fit, prior learning, employer support and workplace evidence.
          </p>
        </header>

        <div className="mt-12 grid gap-5 lg:grid-cols-[minmax(240px,25%)_minmax(0,1fr)]">
          <div role="tablist" aria-label="Professional pathways" onKeyDown={handleTabKeyDown} className="grid gap-3 lg:sticky lg:top-[184px] lg:z-10 lg:max-h-[calc(100vh-13rem)] lg:self-start lg:overflow-y-auto lg:pr-1">
            {routes.map((route, index) => {
              const selected = index === activeIndex;
              return (
                <button
                  key={route.key}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`pathway-panel-${route.key}`}
                  id={`pathway-tab-${route.key}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveIndex(index)}
                  className={`interactive-surface rounded-lg border p-4 text-left shadow-sm ${
                    selected
                      ? 'border-primary-950 bg-primary-950 text-white shadow-card'
                      : 'border-background-200 bg-white text-foreground-950 hover:border-primary-300'
                  }`}
                >
                  <span className={`text-[10px] font-bold uppercase tracking-[.16em] ${selected ? 'text-signal-300' : 'text-accent-700'}`}>
                    {route.eyebrow}
                  </span>
                  <span className="mt-2 block text-base font-bold">{route.name}</span>
                </button>
              );
            })}
          </div>

          <article
            id={`pathway-panel-${active.key}`}
            role="tabpanel"
            aria-labelledby={`pathway-tab-${active.key}`}
            className="overflow-hidden rounded-lg border border-background-200 bg-white shadow-card"
          >
            <div className="grid gap-6 bg-[linear-gradient(135deg,#fff,#f5f8f9)] p-6 md:p-8 xl:grid-cols-[minmax(0,1fr)_310px]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.16em] text-accent-700">
                  <span className="mr-3 inline-block h-px w-7 align-middle bg-signal-400" aria-hidden="true" />
                  {active.panelEyebrow}
                </p>
                <h3 className="mt-4 max-w-2xl text-2xl font-bold leading-tight text-foreground-950 md:text-3xl">
                  {active.title}
                </h3>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground-600">{active.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {active.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-primary-50 px-3 py-1 text-[11px] font-bold text-primary-800">{tag}</span>
                  ))}
                </div>
              </div>

              <aside className="rounded-lg bg-primary-950 p-6 text-white">
                <p className="text-5xl font-light leading-none text-lime-200">{active.credits}</p>
                <p className="mt-2 text-sm font-semibold text-white/75">credits</p>
                <p className="mt-4 text-sm leading-relaxed text-white/68">{active.creditNote}</p>
              </aside>
            </div>

            <div className="grid gap-5 p-6 md:p-8 lg:grid-cols-2">
              <div className="rounded-lg border border-background-200 bg-background-50 p-5">
                <h4 className="text-xs font-bold uppercase tracking-[.16em] text-accent-700">{active.coreTitle}</h4>
                <div className="mt-4 divide-y divide-background-200">
                  {active.core.map(([title, detail, credits]) => (
                    <div key={title} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                      <div className="min-w-0 flex-1">
                  <h5 className="text-sm font-bold leading-snug text-foreground-950">{title}</h5>
                        <p className="mt-1 text-sm leading-relaxed text-foreground-600">{detail}</p>
                      </div>
                      <span className="h-fit shrink-0 rounded-full bg-accent-50 px-3 py-1 text-xs font-bold text-accent-800">{credits}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-background-200 bg-background-50 p-5">
                <h4 className="text-xs font-bold uppercase tracking-[.16em] text-accent-700">{active.specialistTitle}</h4>
                <div className="mt-4 divide-y divide-background-200">
                  {active.specialist.map(([title, credits]) => (
                    <div key={title} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                      <h5 className="min-w-0 flex-1 text-sm font-bold leading-snug text-foreground-950">{title}</h5>
                      <span className="shrink-0 rounded-full bg-accent-50 px-3 py-1 text-xs font-bold text-accent-800">{credits}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-3 px-6 md:grid-cols-3 md:px-8">
              {active.outcomes.map(([title, detail]) => (
                <div key={title} className="rounded-lg border border-background-200 bg-white p-4 transition-colors hover:border-primary-200">
                  <h4 className="text-sm font-bold text-foreground-950">{title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-foreground-600">{detail}</p>
                </div>
              ))}
            </div>

            <div className="p-6 md:p-8">
              <div className="flex flex-col gap-4 rounded-lg border border-signal-200 bg-signal-50 p-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <h4 className="font-bold text-foreground-950">Access options</h4>
                  <p className="mt-1 text-sm leading-relaxed text-foreground-600">DfE Funded Route subject to eligibility · IPC Bursary Route with instalments up to 36 months.</p>
                </div>
                <SiteLink href="#access" className="interactive-arrow inline-flex items-center gap-2 text-sm font-bold text-primary-800">
                  Compare routes
                  <i className="ri-arrow-right-line" aria-hidden="true" />
                </SiteLink>
              </div>
            </div>
          </article>
        </div>

        <p className="mt-6 max-w-4xl text-sm leading-relaxed text-foreground-600">
          Internal pathway credits are not transferable academic credits. Final sequencing, eligibility and support are confirmed in the written training plan.
        </p>
      </div>
    </section>
  );
}
