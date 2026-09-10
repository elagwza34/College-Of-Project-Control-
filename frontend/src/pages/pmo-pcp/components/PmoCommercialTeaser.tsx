import SiteLink from '@/components/base/SiteLink';
export default function PmoCommercialTeaser() {
  return (
    <section className="py-16 md:py-24 bg-canvas">
      <div className="container-site">
        <div className="max-w-4xl mx-auto">
          {/* Illustration */}
          <div className="mb-8 text-center">
            <img loading="lazy" decoding="async"
              src="https://readdy.ai/api/search-image?query=Hand-drawn%20editorial%20ink%20illustration%20of%20an%20elegant%20direct%20bridge%20or%20shortcut%20road%20connecting%20two%20landscapes%20over%20a%20gentle%20valley%2C%20one%20side%20marked%20with%20apprenticeship%20pathway%20signs%20and%20the%20other%20with%20direct%20access%20markers%2C%20soft%20watercolor%20in%20pale%20lavender%20and%20soft%20gold%2C%20black%20fine%20ink%20lines%2C%20premium%20artistic%20editorial%20magazine%20style%2C%20generous%20white%20space%2C%20cream%20paper%20background&width=800&height=350&seq=pmo-commercial-bridge-2026&orientation=landscape"
              alt="Direct bridge illustration showing commercial route alternative"
              className="w-full h-auto rounded-sm mx-auto"
              style={{ maxHeight: '280px', objectFit: 'cover' }}
            />
          </div>

          <div className="text-center mb-8">
            <span className="label-editorial mb-2 block">Alternative Access</span>
            <h2 className="heading-editorial text-3xl md:text-4xl mb-3">
              Want the PMO Route without apprenticeship paperwork?
            </h2>
            <p className="text-sm text-ink/70 leading-relaxed max-w-xl mx-auto">
              Explore the separate Commercial PMO Route for direct access, assignment-based assessment and more flexible delivery.
            </p>
          </div>

          {/* Two columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10">
            {/* Apprenticeship column */}
            <div className="card-editorial p-6 md:p-8">
              <span className="text-sm font-label font-bold text-ink/70 uppercase tracking-wider mb-4 block">
                Apprenticeship PMO Route
              </span>
              <ul className="space-y-2.5">
                {[
                  'Funded where eligible',
                  'Employer-supported',
                  'Workplace evidence',
                  'Portfolio development',
                  'Progress reviews',
                  'Compliance requirements',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-ink/65">
                    <span className="text-secondary-500 mt-0.5"><i className="ri-check-line text-xs"></i></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Commercial column */}
            <div className="card-editorial p-6 md:p-8 border-primary-500/15 bg-primary-500/3">
              <span className="text-sm font-label font-bold text-primary-500/70 uppercase tracking-wider mb-4 block">
                Commercial PMO Route
              </span>
              <ul className="space-y-2.5">
                {[
                  'Direct commercial access',
                  'Assignment-based assessment',
                  'Certificate outcome',
                  'Less apprenticeship administration',
                  'No apprenticeship progress reviews',
                  'No off-the-job evidence logs',
                  'Flexible employer group delivery',
                  'Weekend or agreed delivery options',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-ink/65">
                    <span className="text-ipc-gold mt-0.5"><i className="ri-check-line text-xs"></i></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <SiteLink
              href="/commercial-project-controls-route"
              className="btn-editorial-purple inline-flex items-center gap-2 text-sm hover-arrow-nudge"
            >
              Explore Commercial PMO Route
              <i className="ri-arrow-right-line arrow-icon text-ipc-gold"></i>
            </SiteLink>
            <SiteLink
              href="/book-a-session"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-label font-semibold text-ink/70 border border-ink/15 rounded-full hover:border-ink/30 hover:text-ink transition-all whitespace-nowrap"
            >
              Compare My Options
            </SiteLink>
          </div>

          <p className="text-center text-sm text-ink/70 mt-6 max-w-lg mx-auto">
            The Commercial PMO Route opens as a separate page under Commercial Route.
            Pricing, payment options and inclusions are confirmed on the commercial page and during consultation.
          </p>
        </div>
      </div>
    </section>
  );
}