import SiteLink from '@/components/base/SiteLink';

export default function YourNextStep() {
  return (
<section className="bg-secondary-600 py-16 text-white md:py-20"><div className="container-site text-center"><p className="text-xs font-bold uppercase tracking-[.18em] text-signal-300">Your next step</p><h2 className="mx-auto mt-4 max-w-3xl text-3xl text-white md:text-4xl">Ready to strengthen your project management career?</h2><p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/70">Speak with admissions about your role, programme suitability, apprenticeship funding and the next available cohort.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><SiteLink href="/book-a-session" className="btn-primary inline-flex min-h-12 items-center justify-center px-6 text-sm font-bold">Request a consultation</SiteLink><SiteLink href="#funding" className="cta-button inline-flex min-h-12 items-center justify-center rounded-md border border-white/30 px-6 text-sm font-semibold text-white">Check Funding Eligibility</SiteLink></div><p className="mt-5 text-xs text-white/55">No commitment required. Our team will first help you understand whether the programme and funding route are suitable for you.</p></div></section>
  );
}
