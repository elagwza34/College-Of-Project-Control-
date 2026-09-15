import SiteLink from '@/components/base/SiteLink';

export default function CollegeOfProjectControlsAndProjectManagement() {
  return (
<section id="hero" className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden bg-primary-700 pb-20 pt-32 text-white md:pb-24 md:pt-40">
        <img
          src="https://jokdxsdbxorzciulkdyl.supabase.co/storage/v1/object/public/images/304c1c37f02c49dcb7b6bc84c60de0fa.png"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-primary-950/40 lg:bg-primary-950/20" />
        <div className="container-site relative z-10 grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
          <div><p className="text-xs font-bold uppercase tracking-[.18em] text-signal-300">College of Project Controls and Project Management</p><h1 className="mt-5 max-w-3xl text-display font-extrabold leading-[1.04] text-white">Project Controls<br />Professional<br /><span className="text-signal-400">Level 6</span></h1><p className="mt-6 max-w-2xl text-lg text-white/80">A fully funded, work-based pathway for eligible professionals involved in planning, controls, cost, risk, reporting, governance and project transformation.</p><p className="mt-4 max-w-2xl text-sm text-white/65">Government apprenticeship funding is subject to learner eligibility, employer support, prior-learning review and the rules applying at enrolment.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><SiteLink href="/book-a-session" className="btn-primary inline-flex min-h-12 items-center justify-center px-6 text-sm font-bold">Request a consultation</SiteLink><SiteLink href="#pathways" className="cta-button inline-flex min-h-12 items-center justify-center rounded-md border border-white/30 px-6 text-sm font-semibold text-white hover:bg-white/10">Compare pathways</SiteLink><SiteLink href="#register" className="inline-flex min-h-12 items-center justify-center gap-2 px-3 text-sm font-semibold text-signal-300">Register your interest<i className="ri-arrow-down-line" /></SiteLink></div></div>
          <aside className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur md:p-8"><p className="text-xs font-bold uppercase tracking-wider text-signal-300">For professionals working across</p><div className="mt-5 flex flex-wrap gap-2">{['Project controls', 'Planning', 'Cost', 'Risk', 'Reporting', 'Governance', 'Transformation'].map(item => <span key={item} className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white/85">{item}</span>)}</div><div className="mt-7 border-t border-white/15 pt-6"><p className="text-sm font-semibold text-white">Three standard pathways</p><p className="mt-2 text-sm text-white/65">Operational · Strategic · Chartered</p><p className="mt-4 text-xs leading-relaxed text-white/55">A tailored six-credit combination may be agreed around job duties and employer requirements.</p></div></aside>
        </div>
        <div className="container-site relative z-10 mt-8">
          <SiteLink href="https://kentbusinesscollege.com/wp-content/uploads/2026/05/Edit-Project-Control-Professional-with-ChPP_compressed.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-signal-300 hover:text-signal-200">
            <i className="ri-file-pdf-2-line" aria-hidden="true" />
            Download Catalogue
          </SiteLink>
        </div>
      </section>
  );
}
