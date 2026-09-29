import SiteLink from '@/components/base/SiteLink';

/** Section: Final homepage decision CTA. */
export default function FinalHomepageCta() {
  return (
    <section className="bg-primary-950 py-16 text-white md:py-24" aria-labelledby="final-homepage-cta-heading">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="max-w-3xl">
            <p className="font-label text-xs font-bold uppercase tracking-[0.18em] text-accent-200">Next step</p>
            <h2 id="final-homepage-cta-heading" className="mt-4 font-heading text-3xl font-bold leading-tight md:text-5xl">
              Find the right next step for your role
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/78 md:text-lg">
              Tell us about your current responsibilities, what you want to develop and the support available from your employer.
              We&apos;ll help you understand the most relevant route.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <SiteLink href="/book-a-session" className="btn-primary inline-flex min-h-12 items-center justify-center gap-3 px-6 text-sm font-bold">
              Book a conversation
              <i className="ri-arrow-right-line text-base" aria-hidden="true" />
            </SiteLink>
            <SiteLink href="/apprenticeship-eligibility-checker" className="cta-button inline-flex min-h-12 items-center justify-center gap-3 px-6 text-sm font-bold">
              Check eligibility
              <i className="ri-arrow-right-line text-base" aria-hidden="true" />
            </SiteLink>
            <SiteLink href="/employers" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-6 text-sm font-bold text-white transition-colors hover:border-accent-300 hover:bg-white/10">
              Develop your team
              <i className="ri-arrow-right-line text-base" aria-hidden="true" />
            </SiteLink>
          </div>
        </div>
      </div>
    </section>
  );
}
