import SiteLink from '@/components/base/SiteLink';
import { Fragment } from 'react';

const fundedChecks = [
  ['For eligible employees in England', 'Residency, employment and role requirements apply.'],
  ['Employer participation is required', 'The employer must support the role, evidence and required paid learning time.'],
  ['Six-credit pathway funding', 'Operational, Strategic and Chartered routes are assessed against the funded pathway criteria.'],
  ['Prior learning is reviewed', 'Existing qualifications and experience may affect the final route.'],
];

const bursaryRows = [
  ['Operational Pathway', '50% IPC bursary'],
  ['Strategic Pathway', '50% IPC bursary'],
  ['Chartered Pathway', '75% IPC bursary'],
  ['Instalment period', 'Up to 36 months'],
];

const steps = [
  ['1. Choose pathway', 'Operational, Strategic, Chartered or PMO'],
  ['2. Check eligibility', 'Role, employer, residency and prior learning'],
  ['3. Receive route', 'DfE Funded Route or IPC Bursary Route'],
];

const accessButtonClass =
  'access-route-button w-full min-w-0 px-4 text-center text-xs font-bold leading-tight sm:text-[13px]';

export default function FundingBursaryAccess() {
  return (
    <section id="access" className="scroll-mt-44 bg-background-100 py-16 md:py-24">
      <div className="container-site">
        <header className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(320px,0.78fr)] md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-accent-700">
              <span className="mr-3 inline-block h-px w-7 align-middle bg-signal-400" aria-hidden="true" />
              Funding & bursary access
            </p>
            <h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-[1.02] text-foreground-950 md:text-5xl">
              One professional pathway. Two access routes.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-foreground-600">
            Choose the pathway first. KBC then assesses whether the Department for Education Funded Route or the IPC Bursary Route is more suitable for your circumstances.
          </p>
        </header>

        <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-2">
          <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-background-200 bg-white shadow-card">
            <div className="bg-[linear-gradient(135deg,#fff,#f5f8f9)] p-6 md:p-8">
              <span className="inline-flex rounded-full bg-accent-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-accent-800">
                Department for Education (DfE)
              </span>
              <h3 className="mt-5 text-3xl font-semibold leading-tight text-foreground-950 md:text-4xl">Funded Route</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground-600 md:text-base">
                A UK government-funded route for eligible six-credit professional pathways, subject to employer participation, funding availability and a full eligibility assessment.
              </p>
            </div>

            <div className="flex flex-1 flex-col p-6 md:p-8">
              <h4 className="text-2xl font-medium text-accent-700">Potentially fully funded</h4>
              <div className="mt-5 space-y-4">
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

              <p className="mt-6 rounded-lg bg-signal-100 px-4 py-3 text-xs font-semibold leading-relaxed text-signal-950">
                Limited funded places are reviewed on a first-come, first-served basis. Funding is never guaranteed until confirmed in writing.
              </p>

              <div className="mt-auto grid grid-cols-2 gap-3 pt-5">
                <SiteLink href="#eligibility" className={`btn-primary inline-flex min-h-12 items-center justify-center gap-2 ${accessButtonClass}`}>
                  Check eligibility
                  <i className="ri-arrow-right-line" aria-hidden="true" />
                </SiteLink>
                <SiteLink href="/book-a-session" className={`btn-secondary inline-flex min-h-12 items-center justify-center gap-2 text-primary-950 ${accessButtonClass}`}>
                  Speak to an adviser
                  <i className="ri-arrow-right-line" aria-hidden="true" />
                </SiteLink>
              </div>
            </div>
          </article>

          <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-background-200 bg-white shadow-card">
            <div className="bg-primary-950 p-6 text-white md:p-8">
              <span className="inline-flex rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-lime-200">
                Institute of Project Controls
              </span>
              <h3 className="mt-5 text-3xl font-semibold leading-tight text-white md:text-4xl">IPC Bursary Route</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/78 md:text-base">
                For professionals who cannot access the DfE route, IPC bursary support can reduce the cost of selected pathways delivered through Kent Business College.
              </p>
            </div>

            <div className="flex flex-1 flex-col p-6 md:p-8">
              <h4 className="text-2xl font-medium text-accent-700">Bursary support + flexible instalments</h4>
              <div className="mt-5 space-y-3">
                {bursaryRows.map(([label, value]) => (
                  <div key={label} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-background-200 bg-background-50 px-4 py-3">
                    <span className="text-sm font-bold text-foreground-900">{label}</span>
                    <strong className="text-sm font-bold text-accent-700">{value}</strong>
                  </div>
                ))}
              </div>

              <p className="mt-5 rounded-lg bg-signal-100 px-4 py-3 text-xs font-semibold leading-relaxed text-signal-950">
                IPC bursary places are limited and allocated on a first-come, first-served basis, subject to pathway suitability, approval and availability. PMO Certified terms are confirmed separately.
              </p>

              <div className="mt-auto grid grid-cols-2 gap-3 pt-5">
                <SiteLink href="#eligibility" className={`btn-primary inline-flex min-h-12 items-center justify-center gap-2 ${accessButtonClass}`}>
                  Check bursary
                  <i className="ri-arrow-right-line" aria-hidden="true" />
                </SiteLink>
                <SiteLink href="/contact" className={`btn-secondary inline-flex min-h-12 items-center justify-center gap-2 text-primary-950 ${accessButtonClass}`}>
                  IPC support
                  <i className="ri-arrow-right-line" aria-hidden="true" />
                </SiteLink>
              </div>
            </div>
          </article>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
          {steps.map(([title, detail], index) => (
            <Fragment key={title}>
              <div className="rounded-xl border border-background-200 bg-white px-5 py-4 text-center shadow-sm">
                <p className="text-sm font-bold text-foreground-950">{title}</p>
                <p className="mt-1 text-xs leading-relaxed text-foreground-500">{detail}</p>
              </div>
              {index < steps.length - 1 && (
                <span className="hidden text-center text-signal-600 md:block" aria-hidden="true">
                  <i className="ri-arrow-right-line" />
                </span>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
