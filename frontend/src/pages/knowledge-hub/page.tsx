import Footer from '@/components/feature/Footer';
import SchemaOrg, { organizationSchema } from '@/components/feature/SchemaOrg';
import StickyCta from '@/components/feature/StickyCta';
import APMChPPReadiness from "./components/APMChPPReadiness";
import BreadcrumbsSection from "./components/BreadcrumbsSection";
import EmployerDecisionGuides from "./components/EmployerDecisionGuides";
import ExploreByTopic from './components/ExploreByTopic';
import Featured from './components/Featured';
import FundingGuides from './components/FundingGuides';
import KnowledgeHub from "./components/KnowledgeHub";
import PcpComplianceNoteSection from "./components/PcpComplianceNoteSection";
import ReadyToFindYourBestRoute from "./components/ReadyToFindYourBestRoute";
import RouteComparisons from './components/RouteComparisons';
import SectorGuides from './components/SectorGuides';
export default function KnowledgeHubPage() {
  return (<>
    <SchemaOrg type="Organization" data={organizationSchema()} />
    <main>
      <KnowledgeHub />

      <BreadcrumbsSection />

      {/* Categories Section */}
      <ExploreByTopic />

      {/* Featured Articles */}
      <Featured />

      {/* Funding Guides */}
      <FundingGuides />

      {/* Route Comparisons */}
      <RouteComparisons />

      {/* Sector Guides */}
      <SectorGuides />

      {/* APM ChPP Readiness */}
      <APMChPPReadiness />

      {/* Employer Decision Guides */}
      <EmployerDecisionGuides />

      {/* CTA */}
      <ReadyToFindYourBestRoute />

      <PcpComplianceNoteSection />
    </main>
    <Footer />
    <StickyCta />
  </>);
}
