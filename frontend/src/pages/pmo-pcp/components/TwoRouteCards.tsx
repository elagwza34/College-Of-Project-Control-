import SiteLink from '@/components/base/SiteLink';

export default function TwoRouteCards() {
  return (
<section className="py-16 md:py-24 bg-canvas">
            <div className="container-site">
              <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Apprenticeship Card */}
                <div className="card-editorial p-6 md:p-8">
                  <span className="text-sm font-label font-bold text-secondary-500 uppercase tracking-wider mb-3 block">
                    Apprenticeship Route
                  </span>
                  <h3 className="heading-editorial text-xl md:text-2xl mb-3">
                    Structured workplace development, funded where eligible.
                  </h3>
                  <p className="text-xs text-ink/70 leading-relaxed mb-6">
                    For employed learners with employer support who can complete workplace evidence, progress reviews, off-the-job learning records and apprenticeship requirements.
                  </p>
                  <SiteLink href="/apprenticeship-eligibility-checker" className="btn-editorial-teal inline-flex items-center gap-2 text-sm">
                    Check Eligibility
                  </SiteLink>
                </div>

                {/* Commercial Card */}
                <div className="card-editorial p-6 md:p-8 border-primary-500/15 bg-primary-500/3">
                  <span className="text-sm font-label font-bold text-primary-500/70 uppercase tracking-wider mb-3 block">
                    Commercial Route
                  </span>
                  <h3 className="heading-editorial text-xl md:text-2xl mb-3">
                    Direct access with less apprenticeship administration.
                  </h3>
                  <p className="text-xs text-ink/70 leading-relaxed mb-6">
                    For professionals and employers who prefer assignment-based assessment, certificate outcomes and flexible commercial delivery.
                  </p>
                  <SiteLink href="/commercial-project-controls-route" className="btn-editorial-purple inline-flex items-center gap-2 text-sm hover-arrow-nudge">
                    Explore Commercial PMO
                    <i className="ri-arrow-right-line arrow-icon text-ipc-gold"></i>
                  </SiteLink>
                </div>
              </div>
            </div>
          </section>
  );
}
