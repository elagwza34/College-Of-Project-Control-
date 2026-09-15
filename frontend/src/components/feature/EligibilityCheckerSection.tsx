import SiteLink from '@/components/base/SiteLink';
// Temporary external image; replace this URL when the final image is ready.
const eligibilityImageUrl = 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85';

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
    <section id="eligibility" className="scroll-mt-28 bg-background-50 py-12 md:py-16" aria-labelledby="eligibility-checker-cta-title">
      <div className="container-site">
        <div className="overflow-hidden rounded-2xl border border-background-200 bg-white shadow-card">
          <div className="grid lg:grid-cols-[1.15fr_1fr]">
            <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
              <p className="text-xs font-bold uppercase tracking-[.18em] text-accent-700">Apprenticeship eligibility</p>
              <h2 id="eligibility-checker-cta-title" className="mt-4 max-w-lg text-3xl font-bold leading-[1.1] tracking-tight text-foreground-950 sm:text-4xl xl:text-5xl">Take the next step<br className="hidden sm:block" /> with confidence</h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-foreground-600 sm:text-base">Use our quick eligibility check to get an initial indication of your suitability and understand your options before speaking with our team.</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <SiteLink href="/apprenticeship-eligibility-checker/" className="btn-primary inline-flex min-h-12 items-center justify-center gap-2 px-5 text-sm font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700">Check Your Eligibility <i className="ri-arrow-right-line" aria-hidden="true" /></SiteLink>
                <SiteLink href="/contact" className="cta-button inline-flex min-h-12 items-center justify-center rounded-md border border-primary-700/50 px-5 text-sm font-bold text-primary-800 transition-colors hover:border-primary-700 hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700">Speak to Our Team</SiteLink>
              </div>
              <div className="mt-6 flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-800 text-white"><i className="ri-information-line text-lg" aria-hidden="true" /></span>
                <p className="text-xs leading-relaxed text-foreground-600"><strong className="mb-0.5 block text-sm font-semibold text-foreground-950">Initial indication only</strong>Final eligibility is confirmed after a full review of your circumstances.</p>
              </div>
            </div>
            <div className="relative isolate min-h-72 overflow-hidden bg-primary-900 sm:min-h-80 lg:min-h-full">
              <img src={eligibilityImageUrl} alt="Bright modern workplace with collaborative spaces" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-950/35 to-primary-950/10" aria-hidden="true" />
              <div className="relative flex h-full min-h-72 flex-col justify-end p-8 sm:min-h-80 sm:p-10 lg:p-12">
                <span className="mb-4 h-1 w-14 rounded-full bg-highlight-400" aria-hidden="true" />
                <p className="max-w-xs text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">Skills today.<br /><span className="text-highlight-300">Opportunities tomorrow.</span></p>
              </div>
            </div>
          </div>
        </div>
        {criteria.length > 0 && (
          <details className="group mt-4 rounded-xl border border-background-200 bg-white px-5 py-4 sm:px-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-primary-800 [&::-webkit-details-marker]:hidden">
              What should I check before applying?
              <i className="ri-add-line text-lg transition-transform group-open:rotate-45" aria-hidden="true" />
            </summary>
            <ol className="mt-5 grid gap-4 border-t border-background-200 pt-5 sm:grid-cols-2">
              {criteria.map((item, index) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-50 text-xs font-bold text-primary-700" aria-hidden="true">{index + 1}</span>
                  <span className="text-sm leading-relaxed text-foreground-600">{item}</span>
                </li>
              ))}
            </ol>
          </details>
        )}
      </div>
    </section>
  );
}
