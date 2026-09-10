import SiteLink from '@/components/base/SiteLink';

export default function SupportStrip() {
  return (
<div className="bg-primary-500 py-10 md:py-14">
          <div className="container-site">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-highlight-500 text-primary-950 flex-shrink-0">
                  <i className="ri-graduation-cap-line text-xl" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Government-funded apprenticeship programmes</p>
                  <p className="text-xs text-white/70 mt-0.5 max-w-md">Apprentices do not contribute to eligible training costs. Employer funding is confirmed against the rules in force at the planned start date.</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="text-center sm:text-right px-4">
                  <p className="text-2xl font-heading font-bold text-highlight-400">\u00A30</p>
                  <p className="text-sm text-white/70 uppercase tracking-wider font-semibold">Cost for eligible learners</p>
                </div>
                <SiteLink href="/contact" className="btn-primary inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm cursor-pointer transition-all duration-300 whitespace-nowrap">
                  Check your eligibility
                  <i className="ri-arrow-right-line text-sm" />
                </SiteLink>
              </div>
            </div>
          </div>
        </div>
  );
}
