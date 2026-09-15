import SiteLink from '@/components/base/SiteLink';

export default function RegisterYourInterest() {
  return (
<section id="register" className="py-16 md:py-20"><div className="container-site max-w-2xl text-center"><span className="text-xs font-bold uppercase tracking-[.18em] text-accent-700">Register your interest</span><h2 className="mt-4 text-2xl md:text-3xl">Register your interest on the next Project Controls cohort</h2><p className="mt-4 text-foreground-600">The admissions team will review eligibility, funding and the most appropriate pathway. Request a consultation below to get started.</p><div className="mt-7"><SiteLink
  href="/book-a-session"
  className="btn-primary inline-flex min-h-12 items-center justify-center gap-2 px-7 text-sm font-bold transition-colors"
>
  Request a consultation
  <i className="ri-arrow-right-line" aria-hidden="true" />
</SiteLink></div></div></section>
  );
}
