import SiteLink from '@/components/base/SiteLink';

export default function ReadyToFindYourBestRoute() {
  return (
<section className="py-14 md:py-20 bg-secondary-900">
          <div className="container-site text-center">
            <h2 className="text-xl md:text-3xl font-heading font-bold text-background-50">
              Ready to Find Your Best Route?
            </h2>
            <p className="mt-3 text-sm md:text-base text-background-50/70 max-w-xl mx-auto">
              Speak to an adviser about your goals, your sector and the project controls pathway that fits your career or your team.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <SiteLink
                href="/book-a-session"
                data-gtm-event="hub_cta_consultation"
                className="btn-primary inline-flex items-center px-5 py-3 text-secondary-950 font-semibold text-sm cursor-pointer transition-all duration-200 whitespace-nowrap"
              >
                <i className="ri-calendar-line mr-2"></i>
                Request a consultation
              </SiteLink>
              <SiteLink
                href="/project-controls-professional-level-6#eligibility"
                data-gtm-event="hub_cta_eligibility"
                className="cta-button inline-flex items-center px-5 py-3 border border-background-50/20 text-background-50 font-semibold text-sm rounded-md cursor-pointer hover:bg-background-50/10 transition-all duration-200 whitespace-nowrap"
              >
                <i className="ri-shield-check-line mr-2"></i>
                Check Eligibility
              </SiteLink>
            </div>
          </div>
        </section>
  );
}
