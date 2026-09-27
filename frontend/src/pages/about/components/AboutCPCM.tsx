import SiteLink from '@/components/base/SiteLink';
import PageSectionNav from '@/components/feature/PageSectionNav';
import { shortCourses } from '@/pages/short-courses/data/shortCourses';

const sectionLinks = [
  { label: 'About the College', href: '#hero' },
  { label: 'Who we are', href: '#who-we-are' },
  { label: 'Controls', href: '#controls' },
  { label: 'Learning', href: '#learning' },
  { label: 'Programmes', href: '#programmes' },
  { label: 'AI', href: '#ai' },
  { label: 'Experts', href: '#experts' },
  { label: 'Employers', href: '#employers' },
  { label: 'Beliefs', href: '#beliefs' },
];

const heroStats = [
  ['Project controls', 'Planning, cost, risk, schedule and assurance discipline.'],
  ['Professional learning', 'Programmes and modules connected to workplace responsibility.'],
  ['Employer capability', 'Development routes for teams working in complex delivery.'],
];

const principles = [
  ['01', 'Clarity before confidence', 'We help professionals understand what the project information is really saying before decisions are made.'],
  ['02', 'Learning through responsibility', 'Capability grows when teaching, workplace evidence and professional judgement are connected.'],
  ['03', 'Controls that serve delivery', 'Project controls should help leaders intervene earlier, not simply produce more reporting.'],
  ['04', 'Progression with purpose', 'Routes are shaped around role, sector, capability gaps and the evidence a learner can build.'],
];

const decisionFlow = ['Data', 'Evidence', 'Insight', 'Judgement', 'Decision', 'Delivery'];

const learningSteps = [
  ['01', 'Prepare', 'Understand the role, context, current project challenge and evidence opportunities.'],
  ['02', 'Learn', 'Use structured teaching, expert discussion, worked examples and sector scenarios.'],
  ['03', 'Apply', 'Use the framework or technique inside an approved workplace context.'],
  ['04', 'Evidence', 'Capture professional judgement, output, delivery impact and next improvement.'],
];

const programmes = [
  {
    title: 'Associate Project Manager Level 4',
    href: '/associate-project-manager-level-4',
    tag: 'Project management foundation',
    body: 'For professionals building practical project-management capability across planning, delivery, stakeholders, risk, governance and workplace application.',
  },
  {
    title: 'Project Controls Professional Level 6',
    href: '/project-controls-professional-level-6',
    tag: 'Advanced project controls',
    body: 'For planners, schedulers, cost, risk, PMO and project controls professionals who need stronger control over complex delivery environments.',
  },
  {
    title: 'Certified PMO Professional Level 6',
    href: '/short-courses/pmo-level-6',
    tag: 'PMO and governance capability',
    body: 'For PMO professionals developing strategic governance, assurance, reporting, stakeholder leadership and evidence-led operating models.',
  },
];

const featuredCourseSlugs = [
  'ai-in-project-controls',
  'project-planning-control',
  'earned-value-management',
  'pmi-scheduling-professional',
  'apm-risk-management',
  'managing-successful-programmes',
];

const aiPrinciples = [
  'Plan',
  'Analyse',
  'Forecast',
  'Challenge',
  'Recommend',
  'Govern',
  'Human judgement in the loop',
];

const expertAreas = [
  ['Project controls standards', 'Earned value, planning discipline, control frameworks and professional evidence.'],
  ['Portfolio governance', 'Benefits, investment decisions, assurance and strategic portfolio control.'],
  ['PMO capability', 'Operating models, reporting cadence, stakeholder confidence and organisational governance.'],
];

const employerPillars = [
  'Capability mapped to roles',
  'Learning connected to live projects',
  'Evidence reviewed through work',
  'Governance and reporting improvement',
  'Sector-specific examples',
  'Team progression planning',
];

const beliefs = [
  'Project information should make complexity easier to act on.',
  'Professional judgement cannot be outsourced to a dashboard.',
  'AI should strengthen accountability, not remove it.',
  'Learning should produce better decisions in the workplace.',
  'Employers need capability that lasts beyond a single course.',
  'Project controls deserves a clear professional identity.',
];

const imagePanels = [
  {
    src: '/images/construction-sector-hero.webp',
    alt: 'Construction project environment representing complex project delivery',
    label: 'Construction and infrastructure',
  },
  {
    src: '/images/energy-sector-hero.jpg',
    alt: 'Energy infrastructure representing programme controls in the energy sector',
    label: 'Energy and utilities',
  },
  {
    src: '/images/engineering-sector-hero.webp',
    alt: 'Engineering environment representing advanced manufacturing and aerospace delivery',
    label: 'Engineering and aerospace',
  },
  {
    src: '/images/public-sector-sector-hero.png',
    alt: 'Public sector delivery environment representing accountable programme governance',
    label: 'Public sector',
  },
];

const featuredCourses = featuredCourseSlugs
  .map((slug) => shortCourses.find((course) => course.slug === slug))
  .filter(Boolean);

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`text-xs font-extrabold uppercase tracking-[0.28em] ${light ? 'text-accent-300' : 'text-primary-700'}`}>
      {children}
    </p>
  );
}

function SectionHeader({
  eyebrow,
  title,
  body,
  centered = false,
  light = false,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  centered?: boolean;
  light?: boolean;
}) {
  return (
    <div className={`${centered ? 'mx-auto text-center' : ''} max-w-3xl`}>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2 className={`mt-4 font-serif text-4xl font-black leading-[0.98] md:text-6xl ${light ? 'text-white' : 'text-primary-950'}`}>
        {title}
      </h2>
      {body ? (
        <p className={`mt-5 text-lg leading-8 ${light ? 'text-white/78' : 'text-slate-600'}`}>
          {body}
        </p>
      ) : null}
    </div>
  );
}

export default function AboutCPCM() {
  return (
    <>
      <section className="relative isolate min-h-[760px] overflow-hidden bg-primary-950 text-white">
        <img
          src="/images/hero-professional.webp"
          alt="Project professionals learning together in a professional programme setting"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="pattern-cubes-overlay pattern-cubes-overlay-dark absolute inset-0 opacity-70" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,13,16,0.95)_0%,rgba(0,13,16,0.78)_46%,rgba(0,13,16,0.32)_100%)]" />

        <div className="relative mx-auto flex min-h-[760px] max-w-7xl flex-col justify-end px-6 pb-16 pt-40 lg:px-8">
          <div className="max-w-4xl">
            <Eyebrow light>About the College</Eyebrow>
            <h1 className="mt-5 max-w-5xl font-serif text-5xl font-black leading-[0.92] md:text-7xl lg:text-8xl">
              A specialist college for project control, delivery confidence and professional judgement.
            </h1>
            <p className="mt-7 max-w-3xl text-xl leading-9 text-white/82">
              We develop professionals and employers who need clearer plans, better evidence, stronger governance and more confident decisions in complex project environments.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <SiteLink href="/programmes" className="btn-primary btn-primary--pattern">
                Explore programmes
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </SiteLink>
              <SiteLink href="/contact" className="btn-primary btn-primary--outline">
                Speak with the team
              </SiteLink>
            </div>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden border border-white/18 bg-white/18 md:grid-cols-3">
            {heroStats.map(([title, body]) => (
              <div key={title} className="bg-primary-950/72 p-6 backdrop-blur">
                <p className="font-serif text-2xl font-black">{title}</p>
                <p className="mt-3 text-sm leading-6 text-white/72">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageSectionNav pageLabel="About the College" links={sectionLinks} showCta={false} />

      <section id="who-we-are" className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <SectionHeader
              eyebrow="Who we are"
              title="Built for the people who make project decisions possible."
              body="The College of Project Controls and Management exists for professionals whose work sits between ambition and delivery: the planners, project managers, controls specialists, PMO teams and employers who need project information to be trusted."
            />
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Our focus is deliberately specialist. We connect structured professional learning with practical project responsibilities, so capability is developed through the work people actually do.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {principles.map(([number, title, body]) => (
              <article key={title} className="rounded-lg border border-slate-200 bg-background-50 p-6 shadow-sm">
                <p className="text-sm font-black text-accent-600">{number}</p>
                <h3 className="mt-5 font-serif text-2xl font-black text-primary-950">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="controls" className="relative overflow-hidden bg-primary-950 py-24 text-white">
        <div className="pattern-cubes-overlay pattern-cubes-overlay-dark absolute inset-0 opacity-45" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <SectionHeader
              eyebrow="Controls"
              title="Project controls is the discipline that turns uncertainty into accountable action."
              body="We treat controls as a decision system: data becomes evidence, evidence becomes insight, and insight supports professional judgement."
              light
            />
            <div className="grid gap-px overflow-hidden rounded-lg border border-white/18 bg-white/18 sm:grid-cols-3">
              {decisionFlow.map((item, index) => (
                <div key={item} className="bg-white/[0.06] p-6">
                  <span className="text-xs font-black text-accent-300">{String(index + 1).padStart(2, '0')}</span>
                  <p className="mt-4 font-serif text-2xl font-black">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-4">
            {imagePanels.map((image) => (
              <figure key={image.label} className="group relative h-72 overflow-hidden rounded-lg">
                <img src={image.src} alt={image.alt} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-950 via-primary-950/70 to-transparent p-5">
                  <span className="text-sm font-extrabold text-white">{image.label}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="learning" className="bg-background-100 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            eyebrow="Learning model"
            title="Live learning becomes stronger when it is applied, evidenced and reviewed."
            body="The experience is designed around a repeatable rhythm, so every session can move closer to workplace impact."
            centered
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-4">
            {learningSteps.map(([number, title, body]) => (
              <article key={title} className="flex min-h-[300px] flex-col justify-between rounded-lg border border-slate-200 bg-white p-7 shadow-sm">
                <div>
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent-300 text-lg font-black text-primary-950">
                    {number}
                  </span>
                  <h3 className="mt-8 font-serif text-3xl font-black text-primary-950">{title}</h3>
                  <p className="mt-4 text-base leading-7 text-slate-600">{body}</p>
                </div>
                <div className="mt-8 h-1 rounded-full bg-slate-100">
                  <div className="h-1 rounded-full bg-accent-300" style={{ width: `${Number(number) * 24}%` }} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="programmes" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <SectionHeader
              eyebrow="Programmes"
              title="Structured routes for different responsibilities."
              body="The programme offer is not built around a generic catalogue. It is organised around the level of responsibility, evidence and professional direction a learner needs."
            />

            <div className="grid gap-5">
              {programmes.map((programme) => (
                <SiteLink
                  key={programme.title}
                  href={programme.href}
                  className="group block rounded-lg border border-slate-200 bg-background-50 p-7 shadow-sm transition hover:-translate-y-1 hover:border-accent-300 hover:shadow-xl"
                >
                  <div className="flex flex-wrap items-start justify-between gap-5">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.24em] text-primary-700">{programme.tag}</p>
                      <h3 className="mt-3 font-serif text-3xl font-black text-primary-950">{programme.title}</h3>
                    </div>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent-300 text-primary-950 transition group-hover:translate-x-1">
                      <i className="ri-arrow-right-line text-xl" aria-hidden="true" />
                    </span>
                  </div>
                  <p className="mt-5 text-base leading-7 text-slate-600">{programme.body}</p>
                </SiteLink>
              ))}
            </div>
          </div>

          <div className="mt-16 border-t border-slate-200 pt-10">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <Eyebrow>Specialist modules</Eyebrow>
                <h3 className="mt-3 font-serif text-4xl font-black text-primary-950">Build one capability at a time.</h3>
              </div>
              <SiteLink href="/short-courses" className="btn-primary btn-primary--pattern">
                Browse short courses
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </SiteLink>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {featuredCourses.map((course) => (
                <SiteLink
                  key={course?.slug}
                  href={`/short-courses/${course?.slug}`}
                  className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-primary-300"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{course?.category}</p>
                  <h4 className="mt-3 font-serif text-2xl font-black text-primary-950">{course?.title}</h4>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{course?.duration} - {course?.format}</p>
                </SiteLink>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="ai" className="bg-primary-950 py-24 text-white">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8">
          <div>
            <SectionHeader
              eyebrow="AI in project controls"
              title="AI can accelerate analysis. Accountability still belongs to people."
              body="The College treats AI as a professional capability, not a shortcut around judgement, review, confidentiality or governance."
              light
            />
            <div className="mt-8 flex flex-wrap gap-3">
              {aiPrinciples.map((item) => (
                <span key={item} className="rounded-full border border-white/18 px-4 py-2 text-sm font-bold text-white/86">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-white/14 bg-white/[0.06]">
            <img
              src="/images/testimonial-leaders-grid.png"
              alt="Professionals and leaders representing learning, community and professional experience"
              className="h-72 w-full object-cover"
            />
            <div className="p-7">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-accent-300">Responsible use</p>
              <p className="mt-4 text-lg leading-8 text-white/78">
                AI learning is developed around governed workflows, validated information, human review and clear decision accountability.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="experts" className="bg-background-100 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            eyebrow="Expert-led perspective"
            title="Learn from people who understand project delivery pressure."
            body="The College brings together project controls, PMO, portfolio, governance and delivery expertise so learning stays connected to professional reality."
            centered
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {expertAreas.map(([title, body]) => (
              <article key={title} className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm">
                <div className="mb-8 h-1 w-16 rounded-full bg-accent-300" />
                <h3 className="font-serif text-3xl font-black text-primary-950">{title}</h3>
                <p className="mt-4 text-base leading-7 text-slate-600">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="employers" className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
          <figure className="relative overflow-hidden rounded-lg">
            <img
              src="/images/employer-capability-team.webp"
              alt="Employer team collaborating on project capability and learning plans"
              className="h-[520px] w-full object-cover"
            />
            <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary-950 to-transparent p-7 text-white">
              <p className="max-w-md font-serif text-3xl font-black">Capability plans should reflect real roles, not abstract training catalogues.</p>
            </figcaption>
          </figure>

          <div>
            <SectionHeader
              eyebrow="Employer capability"
              title="For organisations that need stronger project confidence across teams."
              body="Employers can use the College to develop role-based capability, strengthen project governance and connect learning with live delivery environments."
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {employerPillars.map((pillar) => (
                <div key={pillar} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-background-50 px-4 py-4">
                  <span className="h-2.5 w-2.5 rounded-full bg-accent-400" />
                  <span className="text-sm font-bold text-primary-950">{pillar}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="beliefs" className="bg-primary-950 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            eyebrow="What we believe"
            title="Better control is a professional habit, not a reporting template."
            body="These beliefs shape the way we design programmes, short courses, employer support and professional development routes."
            centered
            light
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-white/18 bg-white/18 md:grid-cols-2 lg:grid-cols-3">
            {beliefs.map((belief) => (
              <div key={belief} className="bg-primary-950/76 p-7">
                <i className="ri-checkbox-circle-line text-2xl text-accent-300" aria-hidden="true" />
                <p className="mt-5 font-serif text-2xl font-black leading-tight">{belief}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-start justify-between gap-8 border-t border-white/14 pt-10 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-accent-300">Next step</p>
              <h3 className="mt-3 max-w-3xl font-serif text-4xl font-black leading-tight md:text-5xl">
                Choose a programme, compare a route or talk through the role you need to develop.
              </h3>
            </div>
            <SiteLink href="/contact" className="btn-primary btn-primary--pattern shrink-0">
              Request a consultation
              <i className="ri-arrow-right-line" aria-hidden="true" />
            </SiteLink>
          </div>
        </div>
      </section>
    </>
  );
}
