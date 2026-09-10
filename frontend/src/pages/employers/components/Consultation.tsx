import SiteLink from '@/components/base/SiteLink';

export default function Consultation() {
  return (
<section id="consultation" className="relative overflow-hidden bg-primary-700 py-16 text-white md:py-24"><div className="pattern-cubes-overlay pattern-cubes-overlay-dark" style={{ opacity: .06 }} /><div className="container-site relative z-10 grid gap-10 lg:grid-cols-[.85fr_1.15fr]"><div><span className="text-xs font-semibold uppercase tracking-[.18em] text-signal-300">Start with the business need</span><h2 className="mt-3 text-3xl text-white md:text-5xl">Tell us what capability you need to build.</h2><p className="mt-5 text-white/75">You do not need to choose the programme first. Tell us about the role, employee or workforce challenge and our team can help identify the most appropriate route.</p><div className="mt-7 flex flex-col gap-3"><SiteLink href="/book-a-session" className="btn-primary inline-flex min-h-12 items-center justify-center px-6 text-sm font-bold">Request an employer consultation</SiteLink><SiteLink href="mailto:info@collegeofprojectcontrols.com?subject=Employer%20partnership%20enquiry" className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/30 px-6 text-sm font-semibold text-white">Email the Employer Team</SiteLink></div><SiteLink href="https://employer.kentbusinesscollege.net/" target="_blank" rel="noreferrer" className="mt-5 inline-flex text-sm font-semibold text-white/75">Already working with KBC? Employer Login</SiteLink></div><div className="flex flex-col items-center justify-center text-center"><h3 className="mb-4 text-xl text-white">Get in touch below</h3><SiteLink
  href="/book-a-session"
  className="btn-primary inline-flex min-h-12 items-center justify-center gap-2 px-7 text-sm font-bold transition-colors"
>
  Request a consultation
  <i className="ri-arrow-right-line" aria-hidden="true" />
</SiteLink></div></div></section>
  );
}
