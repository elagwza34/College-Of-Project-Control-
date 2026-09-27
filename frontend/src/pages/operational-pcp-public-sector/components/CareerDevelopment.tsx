import SiteLink from '@/components/base/SiteLink';

export default function CareerDevelopment() {
  return (
    <section id="career-support" className="scroll-mt-44 bg-white py-16 md:py-24">
      <div className="container-site">
        <div className="rounded-lg border border-background-200 bg-primary-950 p-6 text-white shadow-card md:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[.18em] text-signal-300">Career development</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-4xl">
                Plan the next professional step with the right route and evidence.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/72">
                Discuss role progression, planning, cost, risk, reporting, public-sector governance and preparation for
                senior responsibility.
              </p>
            </div>

            <SiteLink href="/contact" className="btn-primary inline-flex min-h-12 items-center justify-center gap-2 px-6 text-sm font-bold">
              Discuss career development
              <i className="ri-arrow-right-line" aria-hidden="true" />
            </SiteLink>
          </div>
        </div>
      </div>
    </section>
  );
}
