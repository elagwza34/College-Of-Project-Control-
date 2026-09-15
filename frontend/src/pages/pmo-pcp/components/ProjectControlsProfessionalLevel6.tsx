import SiteLink from '@/components/base/SiteLink';
export default function ProjectControlsProfessionalLevel6() {
  return (
    <section id="hero" className="relative isolate flex min-h-[90vh] items-center overflow-hidden bg-primary-950 pb-16 pt-32 text-white md:pb-24 md:pt-40">
      <img
        src="https://storage.readdy-site.link/project_files/2c065606-36c7-4cac-81e4-2edb67f93f84/ccfd5a06-a782-4365-9053-d233a8ee035d_compressed_ChatGPT-Image-Jul-2-2026-12_48_48-PM.webp"
        alt="PMO governance journey connecting assurance, controls and decision points"
        className="absolute inset-0 -z-30 h-full w-full object-cover object-center opacity-55"
        loading="eager"
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = '/images/hero-professional.webp';
        }}
      />
      <div className="hero-contrast-overlay absolute inset-0 -z-20" />
      <div className="signal-pattern absolute inset-0 -z-10 opacity-20 [mask-image:linear-gradient(90deg,black,transparent_72%)]" />

      <div className="container-site relative z-10">
        <div className="max-w-4xl">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-signal-400/55 bg-signal-500/15 px-4 py-2 text-sm font-label font-bold uppercase tracking-[0.14em] text-signal-300">
            <span className="h-2 w-2 rounded-full bg-signal-500" />
            Project Controls Professional Level 6
          </span>

          <h1 className="max-w-3xl text-display font-extrabold leading-[1.06] text-white">
            A PMO roadmap for <span className="text-signal-400">better decisions.</span>
          </h1>

          <p className="mt-5 text-xl font-heading font-semibold text-white md:text-2xl">
            Build a PMO that leaders trust
          </p>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            A structured Level 6 apprenticeship route for PMO, governance and reporting professionals who want stronger assurance, integrated controls, stakeholder confidence and recognised professional progression.
          </p>

          <p className="mt-4 max-w-3xl text-sm font-medium leading-relaxed text-white/70">
            Funded where eligible &middot; Employer-supported &middot; Workplace-applied &middot; APM-recognised technical-knowledge progression
          </p>

          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <SiteLink href="/apprenticeship-eligibility-checker" className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold transition-colors">
              <i className="ri-shield-check-line" />
              Check apprenticeship eligibility
            </SiteLink>
            <SiteLink href="/book-a-session" className="cta-button inline-flex items-center gap-2 rounded-lg border border-white/55 bg-primary-950/35 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-signal-400 hover:bg-white/10">
              <i className="ri-calendar-line" />
              Book a PMO consultation
            </SiteLink>
            <SiteLink href="/PMO_Governance_Project_Controls_Professional_Catalogue.pdf" className="cta-button inline-flex items-center gap-2 rounded-lg border border-white/55 bg-primary-950/35 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-signal-400 hover:bg-white/10">
              <i className="ri-file-pdf-2-line" />
              Download Catalogue
            </SiteLink>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-white/70">
            <span>Prefer direct commercial access?</span>
            <SiteLink href="/commercial-project-controls-route" className="inline-flex items-center gap-2 font-bold text-signal-300 transition-colors hover:text-signal-200">
              Explore the Commercial PMO Route
              <i className="ri-arrow-right-line" />
            </SiteLink>
          </div>
        </div>
      </div>
    </section>
  );
}
