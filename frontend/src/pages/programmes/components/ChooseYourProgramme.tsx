import SiteLink from '@/components/base/SiteLink';
import { useEffect,useRef,useState } from 'react';

interface CapabilityChip {
  label: string;
}

function useReveal(threshold = 0.1) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ── Large Programme Feature (PCP Level 6) ─────────────────── */
function LargeProgrammeFeature() {
  const { ref, visible } = useReveal(0.05);

  const capabilities = [
    'Planning & Scheduling',
    'Cost & Earned Value',
    'Risk',
    'Project Planning & Control',
    'PMO',
    'Governance',
    'Project Performance',
    'Professional Progression',
  ];

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-white border border-background-200/80 rounded-2xl overflow-hidden">
      {/* Image side */}
      <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full overflow-hidden bg-background-100">
        <img loading="lazy" decoding="async"
          src="https://readdy.ai/api/search-image?query=Professional%20project%20controls%20specialist%20analysing%20a%20detailed%20project%20schedule%20and%20cost%20performance%20dashboard%20with%20earned%20value%20charts%20on%20dual%20monitors%20in%20a%20modern%20office%2C%20warm%20natural%20light%2C%20premium%20editorial%20corporate%20photography%2C%20muted%20teal%20and%20charcoal%20tones%2C%20shallow%20depth%20of%20field%2C%20high%20detail&width=1000&height=1200&seq=programme-pcp-l6&orientation=portrait"
          alt="Project Controls Professional analysing schedule and cost data"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground-950/40 via-transparent to-transparent" />
        <span className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-background-200/60 text-foreground-900 text-sm font-label font-semibold uppercase tracking-wider">
          <i className="ri-fire-line text-highlight-600"></i>
          Flagship Programme
        </span>
      </div>

      {/* Content side */}
      <div
        className="p-7 md:p-10"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(20px)',
          transition: 'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <span className="inline-block px-3 py-1 rounded-full text-sm font-label font-semibold uppercase tracking-wider bg-primary-100 text-primary-700 border border-primary-200 mb-4">
          Project Controls &middot; Level 6
        </span>

        <p className="text-xs font-label font-semibold uppercase tracking-wider text-foreground-400 mb-1">
          Programme
        </p>
        <h3 className="text-2xl md:text-3xl font-heading font-bold text-primary-700 leading-tight">
          Project Controls Professional Level 6
        </h3>

        <p className="mt-3 text-lg md:text-xl font-heading font-semibold text-foreground-950 leading-snug">
          Build advanced capability across complex project environments
        </p>

        <p className="mt-3 text-sm md:text-base text-foreground-600 leading-relaxed">
          Designed for professionals working across Project Controls, planning, scheduling, cost, risk, PMO and complex project performance.
        </p>

        {/* Capability areas */}
        <div className="mt-5">
          <p className="text-sm font-label font-semibold uppercase tracking-wider text-foreground-400 mb-2.5">
            Capability Areas
          </p>
          <div className="flex flex-wrap gap-2">
            {capabilities.map((cap) => (
              <span
                key={cap}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-background-100 text-foreground-700 text-xs font-semibold rounded-full border border-background-200/70"
              >
                <i className="ri-check-line text-primary-500 text-sm"></i>
                {cap}
              </span>
            ))}
          </div>
        </div>

        {/* Professional positioning */}
        <div className="mt-5 inline-flex items-start gap-2.5 bg-secondary-100 border border-secondary-200 rounded-lg px-4 py-3">
          <i className="ri-user-star-line text-secondary-600 text-base flex-shrink-0 mt-0.5"></i>
          <span className="text-sm font-medium text-foreground-800">
            Build on existing professional experience rather than starting again.
          </span>
        </div>

        {/* Pathway note */}
        <p className="mt-4 text-xs text-foreground-600 leading-relaxed">
          This programme includes different professional-development pathways, allowing participants to align development with their responsibilities and progression.
        </p>

        {/* CTAs */}
        <div className="mt-6 flex flex-col sm:flex-row items-start gap-3">
          <SiteLink
            href="/project-controls-professional-level-6"
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm cursor-pointer transition-all duration-300 whitespace-nowrap lift-hover"
          >
            Explore Project Controls Professional
            <i className="ri-arrow-right-line text-sm"></i>
          </SiteLink>
          
        </div>
      </div>
    </div>
  );
}

/* ── Standard Programme Feature ─────────────────────────────── */
interface StandardFeatureProps {
  eyebrow: string;
  name: string;
  descriptor?: string;
  headline: string;
  copy: string;
  capabilities: string[];
  positioning: string;
  cta: string;
  href: string;
  icon: string;
  index: number;
}

function StandardProgrammeFeature({ eyebrow, name, descriptor, headline, copy, capabilities, positioning, cta, href, icon, index }: StandardFeatureProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="bg-white border border-background-200/80 rounded-2xl overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 600ms cubic-bezier(0.22, 1, 0.36, 1) ${index * 80}ms, transform 600ms cubic-bezier(0.22, 1, 0.36, 1) ${index * 80}ms`,
      }}
    >
      <div className="p-7 md:p-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <span className="inline-block px-3 py-1 rounded-full text-sm font-label font-semibold uppercase tracking-wider bg-secondary-100 text-secondary-700 border border-secondary-200 mb-4">
              {eyebrow}
            </span>

            <div className="flex items-center gap-3 mb-2">
              <div className="w-11 h-11 flex items-center justify-center rounded-lg bg-primary-100 flex-shrink-0">
                <i className={`${icon} text-xl text-primary-600`}></i>
              </div>
              <div>
                <p className="text-xs font-label font-semibold uppercase tracking-wider text-foreground-400">Programme</p>
                <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 leading-tight">
                  {name}
                </h3>
                {descriptor && (
                  <p className="text-sm font-medium text-foreground-600">{descriptor}</p>
                )}
              </div>
            </div>

            <p className="mt-3 text-lg font-heading font-semibold text-foreground-950 leading-snug">
              {headline}
            </p>

            <p className="mt-3 text-sm md:text-base text-foreground-600 leading-relaxed">
              {copy}
            </p>
          </div>
        </div>

        {/* Capability areas */}
        <div className="mt-5">
          <p className="text-sm font-label font-semibold uppercase tracking-wider text-foreground-400 mb-2.5">
            Capability Areas
          </p>
          <div className="flex flex-wrap gap-2">
            {capabilities.map((cap) => (
              <span
                key={cap}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-background-100 text-foreground-700 text-xs font-semibold rounded-full border border-background-200/70"
              >
                <i className="ri-check-line text-primary-500 text-sm"></i>
                {cap}
              </span>
            ))}
          </div>
        </div>

        {/* Professional positioning */}
        <div className="mt-5 inline-flex items-start gap-2.5 bg-secondary-100 border border-secondary-200 rounded-lg px-4 py-3">
          <i className="ri-user-star-line text-secondary-600 text-base flex-shrink-0 mt-0.5"></i>
          <span className="text-sm font-medium text-foreground-800">{positioning}</span>
        </div>

        {/* CTA */}
        <div className="mt-6">
          <SiteLink
            href={href}
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm cursor-pointer transition-all duration-300 whitespace-nowrap lift-hover"
          >
            {cta}
            <i className="ri-arrow-right-line text-sm"></i>
          </SiteLink>
        </div>
      </div>
    </div>
  );
}

/* ── Main Export ────────────────────────────────────────────── */
export default function ChooseYourProgramme() {
  return (
    <section id="programmes-list" className="py-16 md:py-20 bg-background-50 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, oklch(var(--background-300) / 0.25) 1px, transparent 0)',
          backgroundSize: '20px 20px',
        }}
      ></div>

      <div className="container-site relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14 reveal-blur-in is-visible">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-label font-semibold uppercase tracking-wider border border-highlight-500/40 text-highlight-600 mb-4">
            Choose Your Programme
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground-950 leading-tight">
            <span className="block md:whitespace-nowrap">
              Different responsibilities
            </span>
            <span className="block md:whitespace-nowrap">
              require different development
            </span>
          </h2>
          <p className="mt-3 text-sm md:text-base text-foreground-600 leading-relaxed">
            Not every professional needs the same programme. Start with your current responsibilities, the capability you need to strengthen and the type of work you are responsible for delivering.
          </p>
        </div>

        <LargeProgrammeFeature />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-6 md:mt-8 items-stretch">
          <StandardProgrammeFeature
            eyebrow="Project Management · Level 4"
            name="Associate Project Manager Level 4"
            descriptor="with PMP® & AI in Projects Certificate"
            headline="Build stronger capability across project delivery"
            copy="Designed for professionals developing greater responsibility across project governance, planning, schedule, cost, risk, stakeholders and delivery."
            capabilities={[
              'Project Governance',
              'Project Planning',
              'Schedule',
              'Cost',
              'Risk',
              'Stakeholder Management',
              'Project Delivery',
              'Applied AI',
            ]}
            positioning="Develop practical capability while applying learning directly to real project responsibilities."
            cta="Explore Associate Project Manager"
            href="/associate-project-manager-level-4"
            icon="ri-briefcase-line"
            index={0}
          />
          <StandardProgrammeFeature
            eyebrow="PMO · Level 6"
            name="Certified PMO Professional Level 6"
            headline="Develop stronger PMO governance, control and decision support"
            copy="Designed for experienced professionals working across PMO, Project Controls, projects and programmes who want to strengthen governance, integrated controls, risk, quality, stakeholder leadership and reporting."
            capabilities={[
              'Project Management Office',
              'Project Planning & Control',
              'Risk, Issue & Quality Management',
              'Stakeholder Engagement',
              'Communications',
              'Reporting Systems',
            ]}
            positioning="Build structured evidence of advanced PMO and Project Controls knowledge while developing capability relevant to complex organisational environments."
            cta="Explore Certified PMO Professional"
            href="/pmo-pcp"
            icon="ri-organization-chart"
            index={1}
          />
        </div>
      </div>
    </section>
  );
}
