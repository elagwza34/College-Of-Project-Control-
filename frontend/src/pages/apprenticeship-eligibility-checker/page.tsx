import SiteLink from '@/components/base/SiteLink';
import Footer from '@/components/feature/Footer';
import PcpFaqSection from '@/components/feature/PcpFaqSection';
import EligibilityCheckerFlow from './components/EligibilityCheckerFlow';
import { checkerFaqs } from './checkerData';

export default function ApprenticeshipEligibilityCheckerPage() {
  return (
    <div className="min-h-screen bg-background-50">
      <main>
        <section className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-primary-950 via-primary-800 to-primary-950 py-28 md:py-36" aria-labelledby="eligibility-title">
          <div className="pattern-cubes-overlay pattern-cubes-overlay-dark pointer-events-none opacity-[0.06]" aria-hidden="true" />
          <div className="container-site relative z-10 grid w-full items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <div>
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-label font-semibold uppercase tracking-wider text-accent-200">
                <i className="ri-shield-check-line text-sm" aria-hidden="true" />
                Apprenticeship Eligibility Checker
              </span>
              <h1 id="eligibility-title" className="max-w-xl text-3xl font-heading font-extrabold leading-tight text-white md:text-4xl lg:text-5xl">
                Check your apprenticeship eligibility
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80">
                Answer a few questions to receive an initial indication of whether an apprenticeship route may be suitable for you.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white/90">
                  <i className="ri-time-line text-xs text-accent-200" aria-hidden="true" />
                  Usually takes less than 5 minutes
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white/90">
                  <i className="ri-shield-star-line text-xs text-accent-200" aria-hidden="true" />
                  Initial indication only, no commitment
                </span>
              </div>
              <div className="mt-8 border-t border-white/20 pt-6">
                <h2 className="text-xl font-heading font-bold text-white">Still not sure?</h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80">
                  Speak with our admissions team about your circumstances before or after completing the checker.
                </p>
                <SiteLink href="/book-a-session" className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-signal-300 underline underline-offset-4 hover:text-signal-200">
                  Request a consultation
                  <i className="ri-arrow-right-line" aria-hidden="true" />
                </SiteLink>
              </div>
            </div>
            <EligibilityCheckerFlow />
          </div>
        </section>

        <PcpFaqSection
          title="Frequently Asked Questions"
          faqs={checkerFaqs.map(([q, a]) => ({ q, a }))}
        />

      </main>
      <Footer />
    </div>
  );
}
