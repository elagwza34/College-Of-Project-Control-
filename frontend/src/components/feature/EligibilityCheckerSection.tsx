import SiteLink from '@/components/base/SiteLink';
const benefits = [
  { icon: 'ri-timer-line', title: 'Quick assessment', copy: 'Complete a short guided check in a few minutes.' },
  { icon: 'ri-compass-3-line', title: 'Understand your options', copy: 'Learn what information may be needed before applying.' },
  { icon: 'ri-route-line', title: 'Prepare for your next step', copy: 'Understand whether an apprenticeship discussion may be suitable.' },
  { icon: 'ri-shield-check-line', title: 'No commitment required', copy: 'Explore your options before making a decision.' },
];

const defaultEligibilityCriteria = [
  'UK resident for the past three years, subject to the applicable funding rules.',
  'Has the right to work and does not require unsupported sponsorship arrangements.',
  'Not enrolled on another government-funded training programme at the same time.',
  'In paid employment in England in a productive, relevant role.',
  'Employer is based in England and uses the Apprenticeship Service.',
  'Normally works at least 16 hours a week, spending most working time in England.',
];

interface EligibilityCheckerSectionProps {
  criteria?: string[];
}

export default function EligibilityCheckerSection({ criteria = defaultEligibilityCriteria }: EligibilityCheckerSectionProps) {
  return (
    <section id="eligibility" className="bg-white py-16 md:py-24" aria-labelledby="eligibility-checker-cta-title">
      <div className="container-site">
        {criteria.length > 0 && (
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-accent-700">Could this be right for you?</p>
            <h3 className="mt-3 text-xl font-bold text-foreground-950 md:text-2xl">A quick self-check before you go further</h3>
            <p className="mt-2 max-w-2xl text-sm text-foreground-600">This is an initial indication only. Final eligibility is confirmed after a full review.</p>
            <ol className="mt-6 grid gap-3 sm:grid-cols-2">
              {criteria.map((item, index) => (
                <li key={item} className="flex gap-4 rounded-xl border border-background-200 bg-background-50 p-4">
                  <span className="font-heading text-2xl font-bold text-primary-300" aria-hidden="true">{index + 1}</span>
                  <span className="text-sm leading-relaxed text-foreground-700">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
        <div className="overflow-hidden rounded-2xl border border-background-200 bg-background-50 shadow-card">
          <div className="grid lg:grid-cols-[.9fr_1.1fr]">
            <div className="bg-primary-800 p-7 text-white md:p-10 lg:p-12">
              <p className="text-xs font-bold uppercase tracking-[.18em] text-signal-300">Check your eligibility</p>
              <h2 id="eligibility-checker-cta-title" className="mt-4 text-3xl font-bold leading-tight text-white md:text-4xl">Find out if an apprenticeship route could be right for you</h2>
              <p className="mt-5 text-sm leading-relaxed text-white/70 md:text-base">Complete our short apprenticeship eligibility checker to receive an initial indication of your suitability and understand your next step before speaking with our team.</p>
              <p className="mt-6 rounded-xl border border-white/10 bg-white/[.07] p-4 text-xs leading-relaxed text-white/65"><strong className="text-white">Initial indication only:</strong> Final eligibility is confirmed after reviewing your circumstances.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <SiteLink href="/apprenticeship-eligibility-checker/" className="btn-primary inline-flex min-h-12 items-center justify-center px-6 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Check Your Eligibility <i className="ri-arrow-right-line ml-2" aria-hidden="true" /></SiteLink>
                <SiteLink href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/30 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10">Speak To Our Team</SiteLink>
              </div>
            </div>
            <div className="grid gap-px bg-background-200 sm:grid-cols-2">
              {benefits.map(benefit => <article key={benefit.title} className="bg-white p-6 md:p-8"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700"><i className={`${benefit.icon} text-lg`} aria-hidden="true" /></span><h3 className="mt-4 text-lg font-bold text-foreground-950">{benefit.title}</h3><p className="mt-2 text-sm leading-relaxed text-foreground-600">{benefit.copy}</p></article>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
