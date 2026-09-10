import SiteLink from '@/components/base/SiteLink';

export default function ApmRecognition() {
  return (
<section id="apm" className="py-16 md:py-24 bg-canvas">
            <div className="container-site">
              <div className="divider-ink mb-10"></div>
              <div className="text-center mb-3">
                <span className="label-editorial">Professional Recognition</span>
              </div>
              <h2 className="heading-editorial text-3xl md:text-4xl lg:text-5xl text-center mb-2">
                APM RECOGNITION
              </h2>
              <div className="text-center mb-12">
                <span className="text-sm font-label font-bold text-primary-500/60 tracking-wider uppercase">Pathway 2</span>
              </div>

              <div className="max-w-5xl mx-auto">
                {/* Main feature */}
                <div className="card-editorial p-6 md:p-8 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    <div className="md:col-span-2">
                      <span className="text-sm font-label font-bold text-primary-500/60 tracking-wider uppercase mb-2 block">APM Technical Knowledge</span>
                      <h3 className="heading-editorial text-xl md:text-2xl mb-3">
                        Recognised technical knowledge for the ChPP journey
                      </h3>
                      <p className="text-xs text-ink/70 leading-relaxed mb-4">
                        The relevant Certified PMO Professional Level 6 element supports an APM-recognised technical-knowledge assessment route for ChPP Pathway 2, subject to APM eligibility, currency and current requirements.
                      </p>
                      <SiteLink href="/book-a-session" className="inline-flex items-center gap-2 text-sm font-label font-semibold text-secondary-500 hover:text-primary-500 transition-colors">
                        Understand APM Recognition
                        <i className="ri-arrow-right-line"></i>
                      </SiteLink>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-primary-500/5 flex items-center justify-center">
                        <i className="ri-shield-star-line text-4xl text-primary-500/40"></i>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Two smaller features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="card-editorial p-5 md:p-6">
                    <h3 className="font-heading text-lg text-ink mb-2">ChPP Readiness Support</h3>
                    <p className="text-sm text-ink/70 leading-relaxed mb-4">
                      Learners receive support to understand readiness, organise evidence and prepare for professional progression.
                    </p>
                    <SiteLink href="/book-a-session" className="text-sm font-label font-semibold text-secondary-500 hover:text-primary-500 transition-colors">
                      Discuss ChPP Readiness <i className="ri-arrow-right-line"></i>
                    </SiteLink>
                  </div>
                  <div className="card-editorial p-5 md:p-6">
                    <h3 className="font-heading text-lg text-ink mb-2">Important Chartered Status Note</h3>
                    <p className="text-sm text-ink/70 leading-relaxed">
                      Completion does not automatically confer ChPP. Chartered Project Professional status is awarded only by APM after all applicable professional practice, CPD, ethics and assessment requirements are met.
                    </p>
                  </div>
                </div>
              </div>

              <div className="divider-ink mt-10"></div>
            </div>
          </section>
  );
}
