import SiteLink from '@/components/base/SiteLink';

const fundingPoints = [
  ['Levy-funded employers', 'Use available apprenticeship-service funds where the organisation, learner and route are eligible.'],
  ['Transfers and co-investment', 'Alternative support may apply depending on current rules, employer circumstances and availability.'],
  ['Available places', 'Supported places are subject to eligibility, pathway suitability and written confirmation.'],
  ['Employer responsibilities', 'Provide paid learning time, relevant work, supervision, evidence opportunities and progress reviews.'],
];

export default function ApprenticeshipFunding() {
  return (
    <section id="employers" className="scroll-mt-44 bg-background-100 py-16 md:py-24">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-accent-700">Apprenticeship funding</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-foreground-950 md:text-4xl">
              Use the right funding route for the right employee.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-foreground-600">
              The College reviews the employer, learner, role, programme and prior learning before confirming funding.
              Fully funded is not automatic.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <SiteLink href="/apprenticeship-eligibility-checker" className="btn-primary inline-flex min-h-12 items-center justify-center gap-2 px-5 text-sm font-bold">
                Check employer eligibility
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </SiteLink>
              <SiteLink href="/book-a-session" className="inline-flex min-h-12 items-center justify-center rounded-full border border-primary-300 px-5 text-sm font-bold text-primary-950 transition-all hover:border-primary-500 hover:bg-white">
                Request a funding review
              </SiteLink>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {fundingPoints.map(([title, copy]) => (
              <article key={title} className="rounded-lg border border-background-200 bg-white p-5 shadow-sm">
                <i className="ri-checkbox-circle-line text-2xl text-accent-700" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-bold text-foreground-950">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-600">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
