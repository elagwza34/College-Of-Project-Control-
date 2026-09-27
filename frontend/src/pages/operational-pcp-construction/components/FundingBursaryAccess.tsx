import SiteLink from '@/components/base/SiteLink';

const fundedChecks = [
  ['Eligible employees in England', 'Residency, employment and role requirements apply.'],
  ['Employer participation', 'The employer must support the role, evidence and paid learning time.'],
  ['Apprenticeship funding review', 'Operational, Strategic and Chartered routes are assessed against funded pathway criteria.'],
  ['Prior learning assessment', 'Existing qualifications and experience may affect the final route.'],
];

const bursaryRows = [
  ['Operational Pathway', '50% IPC bursary'],
  ['Strategic Pathway', '50% IPC bursary'],
  ['Chartered Pathway', '75% IPC bursary'],
  ['Instalment period', 'Up to 36 months'],
];

const steps = [
  ['1', 'Choose pathway', 'Operational, Strategic or Chartered'],
  ['2', 'Check eligibility', 'Role, employer, residency and prior learning'],
  ['3', 'Confirm access route', 'DfE Funded Route or IPC Bursary Route'],
];

export default function FundingBursaryAccess() {
  return (
    <section id="access" className="scroll-mt-44 bg-white py-16 md:py-24">
      <div className="container-site">
        <header className="max-w-3xl">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[.15em] text-accent-700">Funding and bursary access</span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-foreground-950 md:text-4xl">
              One professional pathway. Two possible access routes.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-foreground-600">
              Choose the pathway first. The College then assesses whether the Department for Education Funded Route or the IPC Bursary Route is more suitable for your circumstances.
            </p>
          </div>
        </header>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="overflow-hidden rounded-lg border border-background-200 bg-background-50 shadow-sm">
            <div className="bg-primary-950 p-6 text-white">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.14em] text-signal-300">Department for Education</p>
                  <h3 className="mt-3 text-2xl font-bold text-white">Funded Route</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/72">
                    For eligible apprenticeship pathways, subject to employer participation, funding availability and a full eligibility assessment.
                  </p>
                </div>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-signal-400 text-2xl text-primary-950">
                  <i className="ri-government-line" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-6 rounded-md bg-white/10 p-4">
                <p className="text-sm font-bold text-signal-200">Potentially fully funded</p>
              </div>
            </div>

            <div className="grid gap-px bg-background-200 sm:grid-cols-2">
              {fundedChecks.map(([title, detail]) => (
                <div key={title} className="bg-white p-5">
                  <i className="ri-checkbox-circle-line text-2xl text-primary-600" aria-hidden="true" />
                  <h4 className="mt-3 font-bold text-foreground-950">{title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-600">{detail}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 bg-white p-6">
              <SiteLink href="#eligibility" className="btn-primary inline-flex min-h-12 items-center justify-center gap-2 px-5 text-sm font-bold">
                Check funded eligibility
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </SiteLink>
              <SiteLink href="/book-a-session" className="inline-flex min-h-12 items-center justify-center rounded-full border border-primary-300 px-5 text-sm font-bold text-primary-950 transition-all hover:border-primary-500 hover:bg-background-50 hover:shadow-sm">
                Speak to an adviser
              </SiteLink>
            </div>
          </article>

          <article className="overflow-hidden rounded-lg border border-background-200 bg-white shadow-sm">
            <div className="bg-accent-50 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.14em] text-accent-800">Institute of Project Controls</p>
                  <h3 className="mt-3 text-2xl font-bold text-primary-950">IPC Bursary Route</h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground-700">
                    For professionals who cannot access the DfE route, IPC bursary support can reduce the cost of selected pathways.
                  </p>
                </div>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white text-2xl text-accent-800 shadow-sm">
                  <i className="ri-hand-coin-line" aria-hidden="true" />
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="grid gap-3">
                {bursaryRows.map(([label, value]) => (
                  <div key={label} className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-background-200 bg-background-50 p-4">
                    <span className="text-sm font-semibold text-foreground-700">{label}</span>
                    <strong className="rounded-full bg-primary-950 px-3 py-1 text-sm text-white">{value}</strong>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-md border border-accent-200 bg-accent-50 p-4 text-sm leading-relaxed text-primary-950">
                IPC bursary places are limited and allocated on a first-come, first-served basis, subject to pathway suitability, approval and availability.
              </div>
            </div>

            <div className="flex flex-wrap gap-3 border-t border-background-200 bg-white p-6">
              <SiteLink href="#eligibility" className="btn-primary inline-flex min-h-12 items-center justify-center gap-2 px-5 text-sm font-bold">
                Check bursary suitability
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </SiteLink>
              <SiteLink href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-full border border-primary-300 px-5 text-sm font-bold text-primary-950 transition-all hover:border-primary-500 hover:bg-background-50 hover:shadow-sm">
                Discuss IPC support
              </SiteLink>
            </div>
          </article>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map(([number, title, detail]) => (
            <div key={title} className="rounded-lg border border-background-200 bg-background-50 p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-100 text-sm font-bold text-accent-800">{number}</span>
              <h3 className="mt-4 font-bold text-foreground-950">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-600">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
