import SiteLink from '@/components/base/SiteLink';
import EditorialPageHero from '@/components/feature/EditorialPageHero';

export default function KnowledgeHub() {
  return (
    <EditorialPageHero
      eyebrow="Knowledge Hub"
      icon="ri-book-open-line"
      title={<>Project Controls <span className="text-signal-400">Knowledge Hub</span></>}
      description="Practical insight for employers and professionals making better decisions across project controls, PMO, funding and career development."
      actions={<>
          <SiteLink
            href="/knowledge-hub/funded-pcp-employer-guide"
            data-gtm-event="hub_read_featured"
            className="btn-primary inline-flex items-center px-5 py-3 text-sm font-bold transition-all duration-200 whitespace-nowrap"
          >
            <i className="ri-book-open-line mr-2"></i>
            Start with the Employer Guide
          </SiteLink>
          <SiteLink
            href="/project-controls-professional-level-6"
            data-gtm-event="hub_explore_routes"
            className="cta-button inline-flex items-center px-5 py-3 border border-background-50/20 text-background-50 font-semibold text-sm rounded-md cursor-pointer hover:bg-background-50/10 transition-all duration-200 whitespace-nowrap"
          >
            <i className="ri-compass-line mr-2"></i>
            Explore All PCP Routes
          </SiteLink>
      </>}
    />
  );
}
