import SiteLink from '@/components/base/SiteLink';

export default function ReadyToTakeControl() {
  return (
    <section id="sector-section-12" className="scroll-mt-44 bg-background-100 py-16 md:py-24">
      <div className="container-site">
        <div className="rounded-lg border border-background-200 bg-primary-950 p-6 text-white shadow-card md:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[.18em] text-signal-300">Ready to take control</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-5xl">
                Build the capability to deliver complex engineering programmes with confidence.
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/72">
                Compare the pathways, complete an initial eligibility check or book a conversation about your
                organisation's engineering project-controls needs.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <SiteLink href="#eligibility" className="btn-primary inline-flex min-h-12 items-center justify-center gap-2 px-5 text-sm font-bold">
                Check eligibility
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </SiteLink>
              <SiteLink href="#pathways" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-5 text-sm font-bold text-white transition-all hover:border-signal-300 hover:bg-white/10">
                Compare pathways
              </SiteLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
