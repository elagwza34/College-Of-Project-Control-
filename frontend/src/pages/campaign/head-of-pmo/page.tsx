import OutcomeExamples from '@/components/feature/OutcomeExamples';
import Footer from '@/components/feature/Footer';
import PcpHero from '@/components/feature/PcpHero';
import PcpFundingStrip from '@/components/feature/PcpFundingStrip';
import PcpPainPointsGrid from '@/components/feature/PcpPainPointsGrid';
import PcpFaqSection from '@/components/feature/PcpFaqSection';
import PcpComplianceNote from '@/components/feature/PcpComplianceNote';
import StickyCta from '@/components/feature/StickyCta';
import CampaignTransformation from '@/components/feature/CampaignTransformation';
import CampaignRouteFit from '@/components/feature/CampaignRouteFit';
import CapabilityTracks from '@/pages/pcp-master/components/CapabilityTracks';
import EventsSection from '@/components/feature/EventsTeaser';

import KeyMessage from './components/KeyMessage';
import LeadForm from './components/LeadForm';

import { heroBadges, painPoints, beforeItems, afterItems, routeFitCards, pmoBenefits, faqs } from './campaignData';

export default function CampaignHeadOfPmo() {
  return (
    <div className="min-h-screen bg-background-50">
      <main>
        <PcpHero
          tag="For Heads of PMO, PMO Leads &amp; Governance Professionals"
          headline="Your PMO Does Not Need More Reports. It Needs Stronger Decision Confidence"
          subheadline="Develop PMO and project controls professionals who can turn schedule, cost, risk and performance data into governance insight senior leaders can trust."
          description="Stop producing reports that describe problems. Build the PMO capability to present options, forecasts and recommended actions that give senior leaders confidence before key decisions."
          fundingLine="Apprenticeship funding may be available, subject to current eligibility rules. Department for Education funding band up to £27,000 for eligible employers in England. Delivered by Kent Business College."
          heroImageUrl="https://readdy.ai/api/search-image?query=Modern%20executive%20boardroom%20with%20large%20digital%20dashboard%20displays%20showing%20project%20data%20and%20KPIs%2C%20navy%20and%20cream%20interior%2C%20warm%20professional%20lighting%2C%20clean%20architectural%20lines%2C%20British%20corporate%20atmosphere%2C%20sophisticated%20design%2C%20no%20people%2C%20editorial%20photography&width=1920&height=1080&seq=campaign-pmo-hero&orientation=landscape"
          heroImageAlt="PMO Decision Confidence and Governance"
          primaryCta={{ label: 'Discuss the PMO Route', href: '#lead-form' }}
          secondaryCta={{ label: 'Explore APM ChPP Readiness Support', href: '#lead-form' }}
          badges={heroBadges}
          urgencyMessage="Limited KBC-funded support available — secure your place before the current support allocation closes."
          bestFor={['Heads of PMO', 'PMO Leads', 'Programme Directors', 'Portfolio Managers', 'Governance Leads']}
          sectors={['Public Sector', 'Defence', 'Energy', 'Infrastructure', 'Consultancy', 'Digital Transformation']}
        />

        <PcpFundingStrip />

        <PcpPainPointsGrid
          title="PMO Challenges That Hold Organisations Back"
          subtitle="The symptoms of a PMO that produces data but does not drive decisions."
          painPoints={painPoints}
        />

        <CampaignTransformation
          title="From Reporting PMO to Decision-Support PMO"
          subtitle="The difference between producing reports and building decision confidence."
          beforeTitle="Reporting PMO"
          afterTitle="Decision-Support PMO"
          beforeItems={beforeItems}
          afterItems={afterItems}
        />

        <CampaignRouteFit
          tag="Route Fit"
          title="Routes Built for PMO and Governance Professionals"
          subtitle="Select the route that aligns with your PMO maturity and career progression goals."
          routes={routeFitCards}
        />

        {/* APM ChPP Readiness */}
        <KeyMessage />

        <CapabilityTracks />

        {/* PMO Benefits */}
        

        {/* Testimonial */}
        <OutcomeExamples />

        <EventsSection ctaHref="#lead-form" />

        {/* Lead Form */}
        <LeadForm />

        <PcpFaqSection faqs={faqs} />

        <PcpComplianceNote />
      </main>
      <StickyCta />
      <Footer />
    </div>
  );
}