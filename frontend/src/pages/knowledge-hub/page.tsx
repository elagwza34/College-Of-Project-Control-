import Footer from '@/components/feature/Footer';
import PcpComplianceNote from '@/components/feature/PcpComplianceNote';
import StickyCta from '@/components/feature/StickyCta';
import Breadcrumbs from '@/components/feature/Breadcrumbs';
import SchemaOrg, { organizationSchema } from '@/components/feature/SchemaOrg';

import Hero from './components/Hero';
import ExploreByTopic from './components/ExploreByTopic';
import Featured from './components/Featured';
import FundingGuides from './components/FundingGuides';
import RouteComparisons from './components/RouteComparisons';
import SectorGuides from './components/SectorGuides';
import ChppReadiness from './components/ChppReadiness';
import EmployerGuides from './components/EmployerGuides';
import ClosingCta from './components/ClosingCta';

export default function KnowledgeHub() {
  return (
    <>
      <SchemaOrg type="Organization" data={organizationSchema()} />
      <main>
        <Hero />

        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Knowledge Hub' },
          ]}
        />

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
        <ChppReadiness />

        {/* Employer Decision Guides */}
        <EmployerGuides />

        {/* CTA */}
        <ClosingCta />

        <PcpComplianceNote />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
