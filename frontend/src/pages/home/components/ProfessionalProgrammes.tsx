import SiteLink from '@/components/base/SiteLink';
import { APPRENTICESHIPS, PMO_L6 } from '@/data/programmeFacts';
import { useEffect,useRef,useState } from 'react';

/* ─────────────────── ProgrammeCard ─────────────────── */
interface ProgrammeCardProps {
  title: string;
  badge: string;
  duration: string;
  shortLine: string;
  bestFor: string;
  includes: string[];
  cta: string;
  href: string;
  popular?: boolean;
  ctaTracking: string;
  delay?: number;
}

function ProgrammeCard({
  title,
  badge,
  duration,
  shortLine,
  bestFor,
  includes,
  cta,
  href,
  popular,
  ctaTracking,
  delay = 0,
}: ProgrammeCardProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const animClass = visible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-[0.95] translate-y-6';

  return (
    <div
      ref={ref}
      className={`relative flex flex-col rounded-xl transition-all duration-500 ${animClass} hover:-translate-y-1 ${
        popular
          ? 'bg-white border-2 border-signal-500 hover:shadow-lg hover:shadow-signal-500/15'
          : 'bg-white border border-background-300 hover:border-primary-400 hover:shadow-md hover:shadow-primary-500/10'
      }`}
      style={{
        transition: `transform 350ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 350ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
      }}
    >
      {/* Popular badge */}
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
          <span className="inline-flex items-center gap-1 rounded-full bg-signal-500 px-3 py-1 text-sm font-label font-bold text-primary-950 shadow-md whitespace-nowrap">
            <i className="ri-fire-line text-sm"></i>
            Most Popular
          </span>
        </div>
      )}

      {/* Header band */}
      <div className="px-5 pt-6 pb-4 rounded-t-xl bg-white">
        <span
          className={`inline-block px-2.5 py-0.5 text-sm font-label font-semibold rounded-full whitespace-nowrap mb-2 ${
            popular
              ? 'bg-signal-50 text-signal-800 border border-signal-200'
              : 'bg-primary-100 text-primary-700 border border-primary-300'
          }`}
        >
          {badge}
        </span>
        <h3 className="text-xl font-heading font-bold leading-tight text-primary-800 md:text-2xl">
          {title}
        </h3>
        <p className="text-xs text-foreground-600 mt-1 leading-snug">{shortLine}</p>
        <div
          className={`inline-flex items-center gap-1 mt-2.5 px-2 py-0.5 rounded-full text-sm font-label font-semibold ${
            popular
              ? 'bg-signal-50 text-signal-800'
              : 'bg-secondary-100 text-secondary-700'
          }`}
        >
          <i className="ri-medal-line text-sm"></i>
          {duration}
        </div>
      </div>

      {/* Body */}
      <div className="px-5 pt-4 pb-4 flex-1">
        <div className="mb-4">
          <p className="text-sm text-foreground-400 font-label font-semibold uppercase tracking-wider mb-1">
            About
          </p>
          <p className="text-xs text-foreground-600 leading-relaxed">{bestFor}</p>
        </div>

        <p className="text-sm text-foreground-400 font-label font-semibold uppercase tracking-wider mb-1.5">
          Includes
        </p>
        <ul className="space-y-1">
          {includes.map((item) => (
            <li key={item} className="flex items-start gap-1.5 text-xs text-foreground-700">
              <i
                className={`ri-check-line mt-0.5 flex-shrink-0 text-sm ${
                  popular ? 'text-signal-600' : 'text-primary-500'
                }`}
              ></i>
              <span className="leading-snug">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="px-5 pb-6 pt-4">
        <SiteLink
          href={href}
          className="btn-primary inline-flex w-full items-center justify-center gap-1.5 whitespace-nowrap px-6 py-3 text-sm font-bold transition-colors duration-300"
          data-gtm-event={ctaTracking}
          data-gtm-location="programme-cards"
        >
          {cta}
          <i className="ri-arrow-right-line text-sm"></i>
        </SiteLink>
      </div>
    </div>
  );
}

/* ─────────────────── Programme Comparison Table ─────────────────── */
function ProgrammeComparisonTable() {
  const [highlightedRow, setHighlightedRow] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const [pcp, apm] = APPRENTICESHIPS;

  /* Audit P01.3: compare responsibilities, new learning, delivery, duration and
     assessment — not just the badge level. Facts are inherited from the master
     record rather than retyped here. */
  const rows = [
    {
      id: 'role',
      label: 'Role emphasis',
      pcp: pcp.purpose,
      apm: apm.purpose,
      icon: 'ri-briefcase-4-line',
    },
    {
      id: 'newLearning',
      label: 'New learning',
      pcp:
        'Integrate schedule, cost, risk and performance information into defensible control decisions.',
      apm:
        'Plan activities, work with stakeholders and support successful project delivery.',
      icon: 'ri-book-open-line',
    },
    {
      id: 'delivery',
      label: 'Delivery',
      pcp: pcp.facts.delivery,
      apm: apm.facts.delivery,
      icon: 'ri-building-4-line',
    },
    {
      id: 'duration',
      label: 'Duration',
      pcp: pcp.facts.duration,
      apm: apm.facts.duration,
      icon: 'ri-time-line',
    },
    {
      id: 'assessment',
      label: 'Assessment',
      pcp: pcp.facts.assessment,
      apm: apm.facts.assessment,
      icon: 'ri-file-check-line',
    },
    {
      id: 'standard',
      label: 'Occupational standard',
      pcp: `${pcp.standard.code} ${pcp.standard.version} (${pcp.standard.issuingBody})`,
      apm: `${apm.standard.code} ${apm.standard.version} (${apm.standard.issuingBody})`,
      icon: 'ri-shield-check-line',
    },
  ];

  const animClass = visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8';

  return (
    <div ref={ref} className={`mt-14 md:mt-18 transition-all duration-500 ${animClass}`} style={{ transition: 'opacity 500ms cubic-bezier(0.22, 1, 0.36, 1) 100ms, transform 500ms cubic-bezier(0.22, 1, 0.36, 1) 100ms' }}>
      <div className="text-center mb-8 md:mb-10">
        <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mb-2">
          Which programme best fits your responsibilities?
        </h3>
        <p className="text-sm text-foreground-600">
          Both are apprenticeships. Compare the responsibilities, new learning and assessment each one
          covers.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-background-300 bg-white">
        <table className="w-full min-w-[640px]">
          <caption className="sr-only">
            Comparison of the two apprenticeships offered by Kent Business College
          </caption>
          <thead>
            <tr className="bg-primary-500 border-b border-background-50/20">
              <th scope="col" className="text-left px-4 py-3 text-xs font-label font-semibold uppercase tracking-wider text-background-50 w-44">
                <span className="sr-only">Comparison point</span>
              </th>
              <th scope="col" className="text-left px-4 py-3 text-xs font-label font-semibold uppercase tracking-wider text-background-50">
                Project Controls Professional Level 6
              </th>
              <th scope="col" className="text-left px-4 py-3 text-xs font-label font-semibold uppercase tracking-wider text-background-50">
                Associate Project Manager Level 4
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className={`border-b border-background-200 align-top transition-colors duration-200 ${
                  highlightedRow === row.id ? 'bg-primary-50' : 'bg-white'
                }`}
                onMouseEnter={() => setHighlightedRow(row.id)}
                onMouseLeave={() => setHighlightedRow(null)}
              >
                <th scope="row" className="px-4 py-3.5 text-left">
                  <span className="flex items-center gap-2 text-sm font-label font-semibold text-foreground-700">
                    <i className={`${row.icon} text-foreground-400 text-sm`} aria-hidden="true"></i>
                    {row.label}
                  </span>
                </th>
                <td className="px-4 py-3.5 text-sm leading-relaxed text-foreground-700">{row.pcp}</td>
                <td className="px-4 py-3.5 text-sm leading-relaxed text-foreground-700">{row.apm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-foreground-500">
        Both programmes are apprenticeships assessed against their own occupational standard. Our
        admissions team assesses suitable employment, the work available to develop and your
        development needs before confirming a programme. Professional study is offered separately
        and is not part of this comparison.
      </p>

    </div>
  );
}

/* ─────────────────── Programme Guidance ─────────────────── */
function ProgrammeGuidance() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const steps = [
    { number: '01', title: 'Your Role', desc: 'What are you responsible for today?', icon: 'ri-user-line' },
    { number: '02', title: 'Your Capability', desc: 'What do you need to strengthen?', icon: 'ri-bar-chart-line' },
    { number: '03', title: 'Your Development', desc: 'Do you need a complete programme or targeted specialist development?', icon: 'ri-list-check-2' },
    { number: '04', title: 'Your Professional Direction', desc: 'What do you want to build towards next?', icon: 'ri-road-map-line' },
  ];

  const animClass = visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8';

  return (
    <div ref={ref} className={`mt-16 md:mt-20 transition-all duration-500 ${animClass}`} style={{ transition: 'opacity 500ms cubic-bezier(0.22, 1, 0.36, 1) 100ms, transform 500ms cubic-bezier(0.22, 1, 0.36, 1) 100ms' }}>
      <div className="text-center mb-10 md:mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-label font-semibold uppercase tracking-wider border border-primary-300 text-primary-600 mb-4">
          Programme Guidance
        </span>
        <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mb-2">
          Not sure which programme fits your responsibilities?
        </h3>
        <p className="text-sm text-foreground-600 max-w-2xl mx-auto">
          Start with the work you do now, the capability you want to strengthen and the professional direction you want to build towards.
        </p>
      </div>

      <div className="relative">
        <div className="hidden lg:block absolute top-8 left-[12%] right-[12%] h-0.5 bg-background-300"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4">
          {steps.map((step, i) => (
            <div key={step.number} className="relative flex flex-col items-center text-center" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)', transition: `opacity 450ms cubic-bezier(0.22, 1, 0.36, 1) ${150 + i * 80}ms, transform 450ms cubic-bezier(0.22, 1, 0.36, 1) ${150 + i * 80}ms` }}>
              <div className="relative z-10 w-16 h-16 flex items-center justify-center rounded-full bg-white border-2 border-primary-300 mb-4 md:mb-5 lift-hover">
                <i className={`${step.icon} text-primary-500 text-xl`}></i>
              </div>
              <span className="text-xs font-label font-bold text-primary-400 mb-1">{step.number}</span>
              <h4 className="text-sm font-heading font-bold text-foreground-800 leading-snug max-w-[180px]">{step.title}</h4>
              <p className="text-xs text-foreground-600 leading-snug mt-1.5 max-w-[190px]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

/* ─────────────────── Main Export ─────────────────── */
export default function ProfessionalProgrammes() {
  return (
    <section id="programmes" className="py-16 md:py-20 bg-background-50 relative overflow-hidden">
      {/* Subtle glow */}
      <div
        className="absolute top-1/4 left-[10%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, oklch(var(--primary-300) / 0.04), transparent 70%)',
        }}
      ></div>
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, oklch(var(--background-300) / 0.25) 1px, transparent 0)',
          backgroundSize: '20px 20px',
        }}
      ></div>

      {/* 3D Structural Pattern Overlay — light */}
      <div className="pattern-cubes-overlay pattern-cubes-overlay-light pattern-cubes-animate" />

      <div className="container-site relative z-10">
        <div className="text-center max-w-5xl mx-auto mb-10 md:mb-14 reveal-blur-in is-visible">
          <span className="inline-block rounded-full border border-signal-400 px-4 py-1.5 text-xs font-label font-bold uppercase tracking-wider text-signal-700 mb-4">
            Apprenticeships
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground-950 leading-tight">
            Choose around your work, not the badge
          </h2>
          <p className="mt-3 text-sm md:text-base text-foreground-600 leading-relaxed">
            Two apprenticeships, built around the responsibilities you already hold. We review your
            role, previous learning and the development opportunities available to you before we
            identify the right programme.
          </p>
        </div>

        {/* Cards grid — audit P00.2/P01.2: two apprenticeships of equal visual
            weight. The professional programme is not a third peer. */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
          {APPRENTICESHIPS.map((programme, index) => (
            <ProgrammeCard
              key={programme.id}
              title={programme.officialTitle}
              badge={programme.offerTypeLabel}
              duration={`Level ${programme.level} · ${programme.facts.duration}`}
              shortLine={programme.purpose}
              bestFor={programme.facts.entry}
              includes={[programme.facts.delivery, programme.facts.assessment]}
              cta={`Explore ${programme.officialTitle.replace(' Apprenticeship', '')}`}
              href={programme.slug}
              ctaTracking={`${programme.id}_explore`}
              delay={index * 80}
            />
          ))}
        </div>

        {/* Secondary professional-study panel — audit P00.5 / P01.2. No
            apprenticeship application button: this is a separate offer with its
            own fee and funding terms. */}
        <div className="mt-6 rounded-xl border border-background-300 bg-white">
          <div className="grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary-300 bg-primary-100 px-3 py-1 text-xs font-label font-semibold text-primary-700">
                <i className="ri-briefcase-line" aria-hidden="true"></i>
                Professional development linked to the Chartered pathway
              </span>
              <h3 className="mt-3 text-lg md:text-xl font-heading font-bold text-foreground-950">
                {PMO_L6.officialTitle}
              </h3>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-foreground-600">
                {PMO_L6.purpose}
              </p>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground-600">
                This is professional study, not a third apprenticeship. It is assessed separately and
                carries its own fee and funding terms, which are set out in full in your written
                offer.
              </p>
              <p className="mt-3 max-w-3xl text-xs leading-relaxed text-foreground-500">
                {PMO_L6.recognition.statement}
              </p>
            </div>
            <div className="shrink-0">
              <SiteLink
                href={PMO_L6.slug}
                className="cta-button inline-flex items-center justify-center gap-2 rounded-md border border-primary-700/50 px-6 py-3 text-sm font-semibold text-primary-800 transition-colors hover:bg-primary-50 whitespace-nowrap"
                data-gtm-event="pmo_level_6_explore"
                data-gtm-location="programme-cards"
              >
                Understand the PMO programme
                <i className="ri-arrow-right-line" aria-hidden="true"></i>
              </SiteLink>
            </div>
          </div>
        </div>

        <ProgrammeComparisonTable />
        <ProgrammeGuidance />

      </div>
    </section>
  );
}
