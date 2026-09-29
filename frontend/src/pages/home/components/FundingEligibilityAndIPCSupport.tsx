import SiteLink from '@/components/base/SiteLink';

const fundingRoutes = [
  {
    title: 'Employer has sufficient levy funds',
    body: 'Eligible apprenticeship training and assessment costs can normally be paid through the employer\'s apprenticeship service account, subject to available funds, the applicable funding rules and the funding-band maximum.',
  },
  {
    title: 'Employer does not pay the apprenticeship levy',
    body: 'For eligible new starts under the current 2026/27 rules:',
    details: [
      {
        label: 'Age 16-24',
        text: 'Government may fund eligible training and assessment costs up to the funding-band maximum.',
      },
      {
        label: 'Age 25+',
        text: 'Government currently contributes 95% of eligible costs up to the funding-band maximum, with 5% employer co-investment.',
      },
    ],
    note: 'Other conditions apply and the position is confirmed before enrolment.',
  },
  {
    title: 'Levy-paying employer with insufficient account funds',
    body: 'For eligible new starts under the current 2026/27 rules:',
    details: [
      {
        label: 'Age 16-24',
        text: 'Government may fund eligible training and assessment costs up to the funding-band maximum.',
      },
      {
        label: 'Age 25+',
        text: 'Government currently contributes 75% of eligible costs up to the funding-band maximum, with 25% employer co-investment.',
      },
    ],
    note: 'The exact funding route is confirmed with the employer before enrolment.',
  },
];

const eligibilityFactors = [
  {
    title: 'Employment',
    copy: 'You need suitable employment that supports the apprenticeship and provides relevant opportunities to develop the occupational knowledge and skills.',
  },
  {
    title: 'Work in England',
    copy: 'Apprenticeship funding in England is subject to workplace and funding-rule requirements. We confirm your working arrangements as part of the eligibility check.',
  },
  {
    title: 'Right to live and work / residency',
    copy: 'Your immigration and residency circumstances must meet the applicable apprenticeship funding rules for the duration of the programme.',
  },
  {
    title: 'Initial assessment',
    copy: 'We review your existing knowledge, skills, qualifications and experience so that the apprenticeship provides substantial new learning.',
  },
  {
    title: 'Time to complete',
    copy: 'Your employment and immigration circumstances must allow enough time to complete the applicable apprenticeship requirements.',
  },
];

/** Section: Homepage funding, eligibility and professional-study separation. */
export default function FundingEligibilityAndIPCSupport() {
  return (
    <section id="funding" className="bg-white py-16 md:py-24" aria-labelledby="funding-eligibility-heading">
      <div className="container-site">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-label text-xs font-bold uppercase tracking-[0.18em] text-accent-700">Funding & eligibility</p>
          <h2
            id="funding-eligibility-heading"
            className="mt-4 font-heading text-3xl font-bold leading-tight text-foreground-950 md:text-5xl"
          >
            Funding explained before you commit
          </h2>
          <p className="mt-5 text-base leading-relaxed text-foreground-600 md:text-lg">
            Government apprenticeship funding may be available where the learner, employer and programme meet the applicable
            rules. Your employer&apos;s levy position, your age at the start of training and your individual circumstances affect
            how the apprenticeship is funded.
          </p>
          <p className="mt-4 rounded-lg border border-primary-100 bg-primary-50 px-4 py-3 text-sm font-bold leading-relaxed text-primary-950">
            We confirm eligibility, the funding route and any employer contribution before enrolment.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {fundingRoutes.map((route) => (
            <article key={route.title} className="flex h-full flex-col rounded-xl border border-background-200 bg-background-50 p-5 shadow-sm">
              <h3 className="font-heading text-xl font-bold leading-tight text-foreground-950">{route.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-foreground-600">{route.body}</p>
              {route.details && (
                <dl className="mt-5 space-y-3">
                  {route.details.map((detail) => (
                    <div key={detail.label} className="rounded-lg border border-background-200 bg-white p-4">
                      <dt className="text-xs font-bold uppercase tracking-[0.12em] text-primary-800">{detail.label}</dt>
                      <dd className="mt-2 text-sm leading-relaxed text-foreground-700">{detail.text}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {route.note && <p className="mt-5 text-sm font-semibold leading-relaxed text-foreground-700">{route.note}</p>}
            </article>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-3xl rounded-lg border border-accent-200 bg-accent-50 px-4 py-3 text-center text-sm leading-relaxed text-foreground-700">
          Current rules shown apply to eligible apprenticeship starts from 1 August 2026 to 31 July 2027 and may change.
        </p>

        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.72fr)] lg:items-start">
          <section aria-labelledby="apprenticeship-eligibility-heading" className="rounded-xl border border-background-200 bg-background-50 p-6 md:p-8">
            <div className="max-w-2xl">
              <p className="font-label text-xs font-bold uppercase tracking-[0.16em] text-accent-700">Apprenticeship eligibility</p>
              <h3 id="apprenticeship-eligibility-heading" className="mt-3 font-heading text-2xl font-bold leading-tight text-foreground-950 md:text-3xl">
                Check whether an apprenticeship could fit your circumstances
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-foreground-600 md:text-base">
                Eligibility is reviewed against your role, employer, prior learning and personal circumstances. The homepage gives
                the headline factors only; the detailed review happens through the eligibility check and admissions process.
              </p>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {eligibilityFactors.map((factor) => (
                <article key={factor.title} className="rounded-lg border border-background-200 bg-white p-4">
                  <h4 className="text-sm font-bold text-foreground-950">{factor.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-600">{factor.copy}</p>
                </article>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <SiteLink href="/apprenticeship-eligibility-checker" className="btn-primary inline-flex min-h-12 items-center justify-center gap-3 px-6 text-sm font-bold">
                Check eligibility
                <i className="ri-arrow-right-line text-base" aria-hidden="true" />
              </SiteLink>
              <SiteLink href="/book-a-session" className="cta-button inline-flex min-h-12 items-center justify-center gap-3 px-6 text-sm font-bold">
                Discuss funding
                <i className="ri-arrow-right-line text-base" aria-hidden="true" />
              </SiteLink>
            </div>
          </section>

          <aside aria-labelledby="professional-study-heading" className="rounded-xl border border-primary-200 bg-primary-950 p-6 text-white md:p-8">
            <p className="font-label text-xs font-bold uppercase tracking-[0.16em] text-accent-200">Professional study</p>
            <h3 id="professional-study-heading" className="mt-3 font-heading text-2xl font-bold leading-tight md:text-3xl">
              Professional courses have separate fees and support arrangements
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-white/80 md:text-base">
              Short courses and professional programmes are not automatically funded through apprenticeship funding. Commercial
              fees and any private support are confirmed separately in writing.
            </p>
            <p className="mt-4 rounded-lg border border-white/15 bg-white/10 p-4 text-sm leading-relaxed text-white/80">
              Private support may be available for eligible professional-study applicants, subject to the provider or fund&apos;s
              current criteria, approval and written terms.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
