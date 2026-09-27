import { useMemo, useState, type ReactNode } from 'react';
import SiteLink from '@/components/base/SiteLink';
import SectionHeading from '@/components/base/SectionHeading';
import PcpComplianceNote from '@/components/feature/PcpComplianceNote';

const roleOptions = [
  { id: 'delivery', label: 'Project delivery or controls', hint: 'Planning, cost, risk, reporting or project delivery work.' },
  { id: 'leader', label: 'Senior programme work', hint: 'Programme, portfolio, assurance or leadership responsibility.' },
  { id: 'pmo', label: 'PMO or governance', hint: 'PMO services, standards, reporting, controls and decision support.' },
  { id: 'sector', label: 'Sector-specific delivery', hint: 'Construction, engineering, public sector or energy environments.' },
];

const goalOptions = [
  { id: 'foundation', label: 'Build practical controls capability' },
  { id: 'strategic', label: 'Move into strategic leadership' },
  { id: 'chartered', label: 'Prepare professional evidence' },
  { id: 'commercial', label: 'Explore a non-apprenticeship route' },
];

const fundingOptions = [
  { id: 'apprenticeship', label: 'Apprenticeship funding may apply' },
  { id: 'commercial', label: 'Commercial route may be better' },
  { id: 'unsure', label: 'I am not sure yet' },
];

const recommendations = {
  operational: {
    title: 'Operational Project Controls Route',
    copy: 'Best for delivery-facing professionals building practical controls capability across planning, cost, risk and workplace evidence.',
    href: '/project-controls-professional/operational-route',
  },
  strategic: {
    title: 'Strategic Project Controls Route',
    copy: 'Best for senior professionals moving towards programme, portfolio and strategic project controls leadership.',
    href: '/project-controls-professional/strategic-route',
  },
  pmo: {
    title: 'PMO & Governance Route',
    copy: 'Best for PMO professionals building governance, reporting, portfolio support and decision-led operating models.',
    href: '/project-controls-professional/pmo-governance-route',
  },
  chartered: {
    title: 'Chartered PMO Pathway',
    copy: 'Best for experienced professionals preparing structured evidence and professional development towards chartered ambition.',
    href: '/project-controls-professional/chartered-pmo-pathway',
  },
  sector: {
    title: 'Sector-specific route',
    copy: 'Best when the work environment matters most: construction, engineering, public sector or energy delivery.',
    href: '/project-controls-professional/construction-route',
  },
  commercial: {
    title: 'Commercial Project Controls Route',
    copy: 'Best where apprenticeship funding is not the right route, but structured project controls development is still needed.',
    href: '/commercial-project-controls-route',
  },
};

type Choice = { role: string; goal: string; funding: string };

function getRecommendation(choice: Choice) {
  if (choice.funding === 'commercial' || choice.goal === 'commercial') return recommendations.commercial;
  if (choice.goal === 'chartered') return recommendations.chartered;
  if (choice.role === 'pmo') return recommendations.pmo;
  if (choice.role === 'sector') return recommendations.sector;
  if (choice.role === 'leader' || choice.goal === 'strategic') return recommendations.strategic;
  return recommendations.operational;
}

export default function RouteFinder() {
  const [choice, setChoice] = useState<Choice>({ role: 'delivery', goal: 'foundation', funding: 'unsure' });
  const result = useMemo(() => getRecommendation(choice), [choice]);

  return (
    <>
      <section className="bg-primary-950 pb-16 pt-32 text-white md:pb-20 md:pt-40">
        <div className="container-site text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-signal-300">Route finder</p>
          <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-extrabold leading-tight text-white md:text-6xl">
            Find your best project controls route.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
            Answer three quick questions to narrow down the most likely pathway before speaking with the College team.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-site">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_0.8fr] lg:items-start">
            <div className="space-y-8">
              <Question title="1. What best describes the role?">
                <div className="grid gap-3 sm:grid-cols-2">
                  {roleOptions.map((option) => (
                    <ChoiceButton
                      key={option.id}
                      active={choice.role === option.id}
                      title={option.label}
                      hint={option.hint}
                      onClick={() => setChoice((current) => ({ ...current, role: option.id }))}
                    />
                  ))}
                </div>
              </Question>

              <Question title="2. What is the main development goal?">
                <div className="grid gap-3 sm:grid-cols-2">
                  {goalOptions.map((option) => (
                    <ChoiceButton
                      key={option.id}
                      active={choice.goal === option.id}
                      title={option.label}
                      onClick={() => setChoice((current) => ({ ...current, goal: option.id }))}
                    />
                  ))}
                </div>
              </Question>

              <Question title="3. What do you know about funding?">
                <div className="grid gap-3 sm:grid-cols-3">
                  {fundingOptions.map((option) => (
                    <ChoiceButton
                      key={option.id}
                      active={choice.funding === option.id}
                      title={option.label}
                      onClick={() => setChoice((current) => ({ ...current, funding: option.id }))}
                    />
                  ))}
                </div>
              </Question>
            </div>

            <aside className="sticky top-28 rounded-2xl border border-background-200 bg-white p-6 shadow-card">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-700">Recommended next step</p>
              <h2 className="mt-4 text-3xl font-bold">{result.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground-600">{result.copy}</p>
              <div className="mt-7 flex flex-col gap-3">
                <SiteLink href={result.href} className="btn-primary inline-flex min-h-12 items-center justify-center px-6 text-sm font-bold">
                  Explore this route
                </SiteLink>
                <SiteLink href="/book-a-session" className="btn-secondary inline-flex min-h-12 items-center justify-center px-6 text-sm font-semibold text-primary-800">
                  Discuss with an adviser
                </SiteLink>
              </div>
              <p className="mt-5 text-xs leading-relaxed text-foreground-500">
                This is a guide only. Final route, eligibility and funding are confirmed by the College before enrolment.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-background-100 py-16 md:py-20">
        <div className="container-site">
          <SectionHeading
            tag="What happens next"
            title="Use the result as a starting point, not a final decision."
            subtitle="A short conversation can confirm role fit, funding, prior learning and the evidence you can realistically produce at work."
            className="mb-10"
          />
          <div className="grid gap-5 md:grid-cols-3">
            {['Confirm your role and sector', 'Review funding and prior learning', 'Agree the right route and start date'].map((item, index) => (
              <article key={item} className="rounded-xl border border-background-200 bg-white p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-700 text-sm font-bold text-white">{index + 1}</span>
                <h3 className="mt-5 text-xl font-bold">{item}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PcpComplianceNote />
    </>
  );
}

function Question({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-background-200 bg-white p-6">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function ChoiceButton({ active, title, hint, onClick }: { active: boolean; title: string; hint?: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-24 rounded-xl border p-4 text-left transition ${
        active ? 'border-primary-500 bg-primary-50 text-primary-950' : 'border-background-200 bg-background-50 hover:border-primary-300'
      }`}
    >
      <span className="flex items-center gap-2 text-sm font-bold">
        <i className={active ? 'ri-radio-button-line text-primary-700' : 'ri-checkbox-blank-circle-line text-foreground-400'} aria-hidden="true" />
        {title}
      </span>
      {hint && <span className="mt-2 block text-xs leading-relaxed text-foreground-600">{hint}</span>}
    </button>
  );
}
