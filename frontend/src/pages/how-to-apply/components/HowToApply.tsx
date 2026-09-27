import SiteLink from '@/components/base/SiteLink';
import SectionHeading from '@/components/base/SectionHeading';
import Footer from '@/components/feature/Footer';

const steps = [
  ['Register your interest', 'Share your details, role and the programme or pathway you are considering.'],
  ['Eligibility and funding review', 'Admissions reviews eligibility, funding position, prior learning and route fit.'],
  ['Pathway discussion', 'We discuss the route, modules and evidence that best match your work.'],
  ['Employer engagement', 'For apprenticeship routes, employer agreement and learning commitments are confirmed.'],
  ['Enrolment and onboarding', 'Document checks, platform setup and induction are completed before teaching starts.'],
  ['Start learning', 'You join your cohort and begin applying the learning to live workplace responsibilities.'],
];

const criteria = [
  'You are in, or moving into, a project, programme, PMO or project controls role.',
  'Your prior learning and experience support entry at the relevant level.',
  'For apprenticeship-funded routes, your employer can support the programme commitments.',
  'Eligibility, funding and route fit are confirmed in writing before enrolment.',
];

export default function HowToApply() {
  return (
    <div className="min-h-screen bg-background-50">
      <main>
        <section className="bg-primary-950 pb-16 pt-32 text-white md:pb-20 md:pt-40">
          <div className="container-site grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-signal-300">Admissions</p>
              <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white md:text-6xl">How to apply without choosing alone.</h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
                Start with a short enquiry. We help confirm route fit, eligibility, funding and employer support before enrolment.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <SiteLink href="/book-a-session" className="btn-primary inline-flex min-h-12 items-center justify-center px-6 text-sm font-bold">
                  Start your enquiry
                </SiteLink>
                <SiteLink href="/apprenticeship-eligibility-checker" className="btn-secondary inline-flex min-h-12 items-center justify-center px-6 text-sm font-semibold text-white">
                  Check eligibility
                </SiteLink>
              </div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal-300">Before you commit</p>
              <ul className="mt-5 space-y-3">
                {criteria.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-white/80">
                    <i className="ri-check-line mt-1 text-signal-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container-site">
            <SectionHeading
              tag="Application process"
              title="Six clear steps from enquiry to first day."
              subtitle="The process is designed to confirm suitability, funding and fit before anything is committed."
              className="mb-12"
            />
            <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {steps.map(([title, copy], index) => (
                <li key={title} className="rounded-xl border border-background-200 bg-white p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-700 text-sm font-bold text-white">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h2 className="mt-5 text-xl font-bold">{title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-foreground-600">{copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-background-100 py-16 md:py-20">
          <div className="container-site grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-700">Eligibility</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">Not sure where you fit? Start with the role.</h2>
              <p className="mt-4 text-foreground-600">
                The right route depends on your responsibilities, evidence opportunities, prior learning and funding position.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {criteria.map((item) => (
                <div key={item} className="rounded-xl border border-background-200 bg-white p-5 text-sm font-semibold text-foreground-800">
                  <i className="ri-checkbox-circle-line mr-2 text-primary-700" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
