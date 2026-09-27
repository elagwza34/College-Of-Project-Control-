import SiteLink from '@/components/base/SiteLink';

const fundedChecks = [
  ['Eligible role in England', 'Employment, residency and role requirements apply.'],
  ['Employer support', 'The employer confirms paid learning time, evidence access and progress reviews.'],
  ['Relevant workplace activity', 'Live engineering, manufacturing or technical delivery work supports application.'],
  ['Prior learning review', 'Existing qualifications and experience are reviewed before the final route is confirmed.'],
];

const bursaryRows = [
  ['Operational Pathway', '50% IPC bursary'],
  ['Strategic Pathway', '50% IPC bursary'],
  ['Chartered Pathway', '75% IPC bursary'],
  ['Instalment period', 'Up to 36 months'],
];

export default function FundingAndBursaryAccess() {
  return (
    <section id="access" className="scroll-mt-44 bg-background-100 py-16 md:py-24">
      <div className="container-site">
        <header className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(320px,0.78fr)] md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-accent-700">
              <span className="mr-3 inline-block h-px w-7 align-middle bg-signal-400" aria-hidden="true" />
              Funding and bursary access
            </p>
            <h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-[1.03] text-foreground-950 md:text-5xl">
              One professional pathway. Two access routes.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-foreground-600">
            Choose the professional pathway that reflects your responsibilities. The College then assesses whether the
            DfE Funded Route or IPC Bursary Route is more appropriate.
          </p>
        </header>

        <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-2">
          <article className="flex h-full flex-col overflow-hidden rounded-lg border border-background-200 bg-white shadow-card">
            <div className="bg-[linear-gradient(135deg,#fff,#f5f8f9)] p-6 md:p-8">
              <span className="inline-flex rounded-full bg-accent-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-accent-800">
                Department for Education
              </span>
              <h3 className="mt-5 text-3xl font-semibold leading-tight text-foreground-950">Funded Route</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground-600 md:text-base">
                Eligible employees may be able to access an apprenticeship pathway on a fully funded basis, subject to
                current rules and written confirmation.
              </p>
            </div>

            <div className="flex flex-1 flex-col p-6 md:p-8">
              <div className="space-y-4">
                {fundedChecks.map(([title, detail]) => (
                  <div key={title} className="flex gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-50 text-accent-700">
                      <i className="ri-check-line text-sm" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-foreground-950">{title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-foreground-500">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-auto grid grid-cols-2 gap-3 pt-6">
                <SiteLink href="#eligibility" className="btn-primary inline-flex min-h-12 items-center justify-center gap-2 px-4 text-center text-xs font-bold leading-tight sm:text-[13px]">
                  Check eligibility
                  <i className="ri-arrow-right-line" aria-hidden="true" />
                </SiteLink>
                <SiteLink href="/book-a-session" className="btn-secondary inline-flex min-h-12 items-center justify-center gap-2 px-4 text-center text-xs font-bold leading-tight text-primary-950 sm:text-[13px]">
                  Speak to an adviser
                  <i className="ri-arrow-right-line" aria-hidden="true" />
                </SiteLink>
              </div>
            </div>
          </article>

          <article className="flex h-full flex-col overflow-hidden rounded-lg border border-background-200 bg-white shadow-card">
            <div className="bg-primary-950 p-6 text-white md:p-8">
              <span className="inline-flex rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-lime-200">
                Institute of Project Controls
              </span>
              <h3 className="mt-5 text-3xl font-semibold leading-tight text-white">IPC Bursary Route</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/78 md:text-base">
                For suitable applicants who cannot access the Funded Route, IPC bursary support can reduce the cost of
                selected pathways.
              </p>
            </div>

            <div className="flex flex-1 flex-col p-6 md:p-8">
              <div className="space-y-3">
                {bursaryRows.map(([label, value]) => (
                  <div key={label} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-background-200 bg-background-50 px-4 py-3">
                    <span className="text-sm font-bold text-foreground-900">{label}</span>
                    <strong className="text-sm font-bold text-accent-700">{value}</strong>
                  </div>
                ))}
              </div>

              <p className="mt-5 rounded-lg bg-signal-100 px-4 py-3 text-xs font-semibold leading-relaxed text-signal-950">
                Bursary places are limited and allocated on a first-come, first-served basis, subject to approval,
                suitability and availability.
              </p>

              <div className="mt-auto grid grid-cols-2 gap-3 pt-6">
                <SiteLink href="#eligibility" className="btn-primary inline-flex min-h-12 items-center justify-center gap-2 px-4 text-center text-xs font-bold leading-tight sm:text-[13px]">
                  Check bursary
                  <i className="ri-arrow-right-line" aria-hidden="true" />
                </SiteLink>
                <SiteLink href="/contact" className="btn-secondary inline-flex min-h-12 items-center justify-center gap-2 px-4 text-center text-xs font-bold leading-tight text-primary-950 sm:text-[13px]">
                  IPC support
                  <i className="ri-arrow-right-line" aria-hidden="true" />
                </SiteLink>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
