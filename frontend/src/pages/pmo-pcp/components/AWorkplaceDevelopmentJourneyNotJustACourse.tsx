import SiteLink from '@/components/base/SiteLink';

const apprenticeshipSteps = [
  { step: '1', title: 'Learn', text: 'Live 2-hour tutor-led sessions.' },
  { step: '2', title: 'Apply', text: 'Use learning in real PMO, governance and reporting activity.' },
  { step: '3', title: 'Evidence', text: 'Collect workplace outputs, reflection and portfolio evidence.' },
  { step: '4', title: 'Review', text: 'Complete structured progress reviews with employer support.' },
  { step: '5', title: 'Improve', text: 'Use feedback to strengthen professional practice and organisational capability.' },
];

export default function AWorkplaceDevelopmentJourneyNotJustACourse() {
  return (
<section id="apprenticeship" className="py-16 md:py-24 bg-canvas">
            <div className="container-site">
              <h2 className="heading-editorial text-3xl md:text-4xl lg:text-5xl text-center mb-4">
                A workplace development journey, not just a course.
              </h2>
              <p className="text-center text-sm text-ink/70 leading-relaxed max-w-xl mx-auto mb-12 md:mb-16">
                Structured around live learning, workplace application, evidence collection and employer-supported progress.
              </p>

              <div className="max-w-3xl mx-auto relative">
                {/* Vertical dotted line */}
                <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px">
                  <div className="h-full route-line-vertical"></div>
                </div>

                <div className="flex flex-col gap-8 md:gap-10">
                  {apprenticeshipSteps.map((step, i) => (
                    <div key={step.step} className="flex items-start gap-4 md:gap-6 relative">
                      {/* Step marker */}
                      <div className="relative z-10 shrink-0">
                        <div className="w-16 h-16 rounded-full bg-surface border border-ink/10 flex flex-col items-center justify-center">
                          <span className="text-sm font-label font-bold text-ink/70 uppercase">Step</span>
                          <span className="text-xl font-heading font-bold text-secondary-500">{step.step}</span>
                        </div>
                        {/* Red pin on line */}
                        {i < apprenticeshipSteps.length - 1 && (
                          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-[72px]">
                            <div className="route-marker" style={{ width: 12, height: 12, borderWidth: 2, boxShadow: '0 0 0 1.5px #D6A85F' }}></div>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="pt-2">
                        <h3 className="font-heading text-lg md:text-xl text-ink mb-1">{step.title}</h3>
                        <p className="text-xs text-ink/70 leading-relaxed">{step.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Info strip */}
              <div className="max-w-3xl mx-auto mt-12 md:mt-16">
                <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-8">
                  {['Funded where eligible', 'Employer-supported', 'Workplace evidence required', 'Off-the-job learning records', 'Progress reviews', 'Quality and compliance requirements'].map((item) => (
                    <span key={item} className="text-sm font-label text-ink/70 tracking-wide">
                      {item}
                    </span>
                  ))}
                </div>
                <div className="text-center">
                  <SiteLink href="/apprenticeship-eligibility-checker" className="btn-editorial-teal inline-flex items-center gap-2 text-sm">
                    <i className="ri-shield-check-line"></i>
                    Check PMO Apprenticeship Eligibility
                  </SiteLink>
                </div>
              </div>
            </div>
          </section>
  );
}
