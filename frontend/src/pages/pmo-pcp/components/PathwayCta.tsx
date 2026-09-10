import SiteLink from '@/components/base/SiteLink';

export default function PathwayCta() {
  return (
<section className="py-16 md:py-24 bg-surface">
            <div className="container-site text-center max-w-3xl mx-auto">
              <div className="mb-8">
                <img loading="lazy" decoding="async"
                  src="https://readdy.ai/api/search-image?query=Hand-drawn%20editorial%20ink%20illustration%20of%20a%20hot%20air%20observation%20balloon%20floating%20above%20a%20landscape%20of%20connected%20projects%2C%20a%20lighthouse%20beam%20illuminating%20governance%20checkpoints%20below%2C%20soft%20watercolor%20in%20pale%20yellow%20and%20cream%2C%20black%20fine%20ink%20lines%2C%20premium%20artistic%20editorial%20style&width=600&height=250&seq=pmo-balloon-2026&orientation=landscape"
                  alt="Observation balloon above project landscape"
                  className="w-full h-auto rounded-sm mx-auto"
                  style={{ maxHeight: '220px', objectFit: 'cover' }}
                />
              </div>
              <h2 className="heading-editorial text-2xl md:text-3xl lg:text-4xl mb-4">
                Four capabilities. One route to a PMO that leaders trust.
              </h2>
              <p className="text-sm text-ink/70 leading-relaxed mb-8 max-w-xl mx-auto">
                Build governance confidence, integrated controls, risk and quality discipline, and decision-ready stakeholder reporting through a structured workplace apprenticeship.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <SiteLink href="/apprenticeship-eligibility-checker" className="btn-editorial-teal inline-flex items-center gap-2 text-sm">
                  <i className="ri-shield-check-line"></i>
                  Check Apprenticeship Eligibility
                </SiteLink>
                <SiteLink href="/book-a-session" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-label font-semibold text-ink/70 border border-ink/15 rounded-full hover:border-ink/30 hover:text-ink transition-all whitespace-nowrap">
                  <i className="ri-calendar-line"></i>
                  Request a consultation
                </SiteLink>
              </div>
            </div>
          </section>
  );
}
