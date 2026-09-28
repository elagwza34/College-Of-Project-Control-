import SiteLink from '@/components/base/SiteLink';
import SectionHeading from '@/components/base/SectionHeading';
import { PCP_L6 } from '@/data/programmeFacts';

const pathwayContent = [
  {
    name: 'Operational',
    label: 'Hands-on delivery',
    title: 'Operational Pathway',
    roleFit:
      'For planners, schedulers, cost professionals and project controls practitioners responsible for reliable project information and day-to-day control.',
    tags: ['Planning', 'Scheduling', 'Cost', 'Risk', 'Performance'],
    summary: 'Strengthen practical control of scope, time, cost, risk and project performance.',
    cta: 'Explore Operational Pathway',
  },
  {
    name: 'Strategic',
    label: 'Leadership and governance',
    title: 'Strategic Pathway',
    roleFit:
      'For senior project controls, PMO, programme and portfolio professionals supporting governance and complex delivery decisions.',
    tags: ['Governance', 'Portfolio', 'Programme', 'PMO', 'Decision-making'],
    summary: 'Develop the judgement to connect project performance with wider organisational priorities.',
    cta: 'Explore Strategic Pathway',
  },
  {
    name: 'Chartered',
    label: 'Professional progression',
    title: 'Chartered Pathway',
    roleFit:
      'For experienced professionals building advanced professional practice and structured evidence towards an eligible APM Chartered Project Professional route.',
    tags: ['Professional practice', 'PMO', 'Portfolio', 'EVM', 'Evidence development'],
    summary:
      'Structure advanced development around professional practice and readiness for independent APM assessment.',
    cta: 'Explore Chartered Pathway',
  },
];

const pathways = pathwayContent.map((pathway) => ({
  ...pathway,
  href:
    PCP_L6?.internalPathways?.find((item) => item.name === pathway.name)?.href ??
    PCP_L6?.url ??
    '/project-controls-professional-level-6',
}));

export default function Level6Pathways() {
  return (
    <section className="mt-14 rounded-xl border border-primary-100 bg-primary-950 px-5 py-8 text-white md:mt-16 md:px-8 md:py-10" aria-labelledby="level-6-pathways-heading">
      <SectionHeading
        tag="Level 6 development pathways"
        title="Shape your Level 6 development around your responsibilities"
        subtitle="Within the Project Controls Professional Level 6 apprenticeship, development can be shaped around the responsibilities you hold, the capability you need to strengthen and the workplace evidence available to you."
        light
        className="max-w-4xl"
      />

      <p className="mx-auto mt-5 max-w-3xl rounded-lg border border-white/15 bg-white/[0.06] px-4 py-3 text-center text-sm font-semibold leading-6 text-white/82">
        These are development pathways within the Level 6 apprenticeship offer, not separate apprenticeship standards.
      </p>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {pathways.map((pathway, index) => (
          <article key={pathway.title} className="rounded-lg border border-white/14 bg-white/[0.06] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal-300">
              {String(index + 1).padStart(2, '0')} {pathway.label}
            </p>
            <h3 className="mt-4 font-heading text-2xl font-bold leading-tight text-white">{pathway.title}</h3>
            <p className="mt-4 text-sm leading-7 text-white/74">{pathway.roleFit}</p>

            <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${pathway.title} capability areas`}>
              {pathway.tags.map((tag) => (
                <li key={tag} className="rounded-full border border-white/14 bg-white/[0.08] px-3 py-1 text-xs font-semibold text-white/86">
                  {tag}
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-white/12 pt-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/50">What it develops</p>
              <p className="mt-2 text-sm leading-7 text-white/78">{pathway.summary}</p>
            </div>

            <SiteLink
              href={pathway.href}
              className="btn-primary mt-6 inline-flex w-full items-center justify-center px-5 py-3 text-sm font-bold"
              aria-label={`${pathway.cta} within Project Controls Professional Level 6`}
            >
              {pathway.cta}
              <i className="ri-arrow-right-line" aria-hidden="true" />
            </SiteLink>
          </article>
        ))}
      </div>

      <div className="mt-8 border-t border-white/12 pt-6 text-sm leading-7 text-white/72 md:flex md:items-center md:justify-between md:gap-6">
        <p>
          Need to discuss a different development mix? Your route may be shaped around current responsibilities, prior learning, employer needs and available workplace evidence.
        </p>
        <SiteLink href="/book-a-session" className="mt-4 inline-flex font-bold text-signal-300 underline-offset-4 hover:underline md:mt-0 md:shrink-0">
          Discuss your route
        </SiteLink>
      </div>
    </section>
  );
}
