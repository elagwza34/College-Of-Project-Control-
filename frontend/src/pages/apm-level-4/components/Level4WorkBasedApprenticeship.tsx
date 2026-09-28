import SiteLink from '@/components/base/SiteLink';

const catalogueUrl = 'https://kentbusinesscollege.com/wp-content/uploads/2026/04/Associated-manger-level-4-Level-4_-1.pdf';

function HeroVisual() {
  return <div className="relative mx-auto w-full max-w-xl" role="img" aria-label="Project delivery dashboard showing schedule, reporting, risk and AI-assisted decision support">
    <div className="absolute -inset-4 rounded-[2rem] bg-signal-400/10 blur-2xl" aria-hidden="true" />
    <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.08] p-4 shadow-2xl backdrop-blur md:p-5">
      <div className="flex items-center justify-between border-b border-white/10 pb-4"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-signal-300">Project command view</p><p className="mt-1 text-sm font-semibold text-white">Delivery portfolio · Live status</p></div><span className="rounded-full bg-accent-400/20 px-3 py-1 text-xs font-bold text-accent-200">ON TRACK</span></div>
      <div className="mt-4 grid grid-cols-3 gap-2.5">{[['74%', 'Progress'], ['6', 'Open risks'], ['92%', 'Confidence']].map(([value, label]) => <div key={label} className="rounded-lg bg-white/10 p-3"><p className="text-xl font-bold text-white md:text-2xl">{value}</p><p className="mt-1 text-xs text-white/60">{label}</p></div>)}</div>
      <div className="mt-3 rounded-xl bg-white/10 p-4"><div className="flex items-center justify-between"><p className="text-xs font-semibold text-white">Integrated schedule</p><p className="text-xs text-white/55">12-month view</p></div><div className="mt-4 space-y-3">{[['Initiate', 'w-[28%]', 'bg-accent-300'], ['Plan & control', 'w-[67%]', 'bg-signal-400'], ['AI-enabled delivery', 'w-[42%]', 'bg-primary-300']].map(([label, width, colour]) => <div key={label} className="grid grid-cols-[92px_1fr] items-center gap-2"><span className="text-xs text-white/65">{label}</span><div className="h-2 rounded-full bg-white/10"><div className={`h-2 rounded-full ${width} ${colour}`} /></div></div>)}</div></div>
      <div className="mt-3 grid gap-3 sm:grid-cols-[1.1fr_.9fr]"><div className="rounded-xl bg-white/10 p-4"><p className="text-xs font-semibold text-white">Weekly reporting</p><div className="mt-4 flex h-16 items-end gap-1.5" aria-hidden="true">{[30, 48, 43, 62, 57, 78, 88].map((height, index) => <span key={index} className="flex-1 rounded-t bg-accent-300/80" style={{ height: `${height}%` }} />)}</div></div><div className="rounded-xl border border-signal-300/25 bg-signal-300/10 p-4"><div className="flex items-center gap-2"><i className="ri-sparkling-2-line text-signal-300" aria-hidden="true" /><p className="text-xs font-semibold text-white">AI decision brief</p></div><p className="mt-3 text-xs leading-relaxed text-white/65">Schedule trend analysed. Review resource pressure before the next approval gate.</p><span className="mt-3 inline-flex rounded bg-white/10 px-2 py-1 text-xs font-bold text-white/70">HUMAN REVIEW REQUIRED</span></div></div>
    </div>
  </div>;
}

export default function Level4WorkBasedApprenticeship() {
  return (
<section id="hero" className="hero-image-project relative flex min-h-[90vh] items-center overflow-hidden bg-primary-950 pb-16 pt-28 text-white md:pb-24 md:pt-36">
        <div className="absolute inset-0 opacity-25" aria-hidden="true" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="container-site relative grid items-center gap-12 lg:grid-cols-[1.08fr_.92fr] lg:gap-16"><div>
          <p className="inline-flex rounded-full border border-signal-300/40 bg-signal-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[.16em] text-signal-300">Level 4 · Work-Based Apprenticeship</p>
          <h1 className="mt-6 max-w-3xl text-display font-bold leading-[1.05] text-white">Associate Project Manager Level 4</h1>
          <p className="mt-6 max-w-2xl text-xl font-semibold leading-snug text-white md:text-2xl">Build the project management, leadership and AI capability to deliver projects with greater confidence.</p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">Develop practical project management expertise through a structured 12-month programme combining professional project management preparation, workplace application and applied AI in project controls.</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">{[['ri-award-line', 'PMP Preparation', 'Structured professional learning and exam preparation.'], ['ri-sparkling-2-line', 'Applied AI', 'Support reporting, analysis, automation and decisions.'], ['ri-briefcase-4-line', 'Workplace Application', 'Apply learning directly within your organisation.']].map(([icon, title, copy]) => <div key={title} className="rounded-lg border border-white/10 bg-white/[0.07] p-4"><i className={`${icon} text-xl text-signal-300`} aria-hidden="true" /><h2 className="mt-3 text-sm font-bold text-white">{title}</h2><p className="mt-1 text-xs leading-relaxed text-white/60">{copy}</p></div>)}</div>
          <p className="mt-6 flex items-start gap-2 text-sm font-semibold text-accent-200"><i className="ri-shield-check-line mt-0.5 text-lg" aria-hidden="true" />An apprenticeship route is available with no apprenticeship fees for eligible learners. Eligibility depends on your age, the funding rules in force when you start, and your employer’s levy status.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row"><SiteLink href="/book-a-session" className="btn-primary inline-flex min-h-12 items-center justify-center px-6 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Request a consultation <i className="ri-arrow-right-line ml-2" aria-hidden="true" /></SiteLink><SiteLink href="#funding" className="cta-button inline-flex min-h-12 items-center justify-center rounded-md border border-white/35 px-6 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10">Check Funding Eligibility</SiteLink></div>
          <SiteLink href={catalogueUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white/70 underline decoration-white/30 underline-offset-4 hover:text-white"><i className="ri-file-pdf-2-line" aria-hidden="true" />Download Programme Catalogue</SiteLink>
        </div><HeroVisual /></div>
      </section>
  );
}
