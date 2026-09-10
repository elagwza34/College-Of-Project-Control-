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

import { heroBadges, painPoints, beforeItems, afterItems, routeFitCards, energyBenefits, faqs } from './campaignData';

export default function CampaignEnergy() {
  return (
    <div className="min-h-screen bg-background-50">
      <main>
        <PcpHero
          tag="For Energy, Utilities &amp; Capital Programme Teams"
          headline="For Capital Programmes Where Weak Controls Are Too Expensive to Ignore"
          subheadline="Develop project controls professionals who can strengthen baseline control, risk visibility, cost assurance, outage planning, commissioning milestones and governance confidence."
          description="In capital programmes, the cost of weak controls compounds over years — not months. Build the capability to protect programme outcomes from day one."
          fundingLine="Apprenticeship funding may be available, subject to current eligibility rules. Department for Education funding band up to £27,000 for eligible employers in England. Delivered by Kent Business College."
          heroImageUrl="https://readdy.ai/api/search-image?query=Modern%20energy%20facility%20control%20room%20with%20large%20digital%20screens%20showing%20programme%20dashboards%20and%20schedule%20data%2C%20navy%20and%20cream%20interior%2C%20warm%20professional%20lighting%2C%20clean%20industrial%20design%2C%20British%20corporate%20atmosphere%2C%20sophisticated%20technology%20environment%2C%20no%20people%2C%20editorial%20photography%20style&width=1920&height=1080&seq=campaign-energy-hero&orientation=landscape"
          heroImageAlt="Energy Project Controls for Capital Programmes"
          primaryCta={{ label: 'Explore Energy Project Controls Route', href: '#lead-form' }}
          secondaryCta={{ label: 'Check Funding Availability', href: '#lead-form' }}
          badges={heroBadges}
          urgencyMessage="Limited KBC-funded support available — secure your place before the current support allocation closes."
          bestFor={['Cost Engineers', 'Planners', 'Risk Managers', 'Project Controllers', 'Programme Controls Teams']}
          sectors={['Energy', 'Oil & Gas', 'Utilities', 'Infrastructure', 'Net Zero']}
        />

        <PcpFundingStrip />

        <PcpPainPointsGrid
          title="Capital Programme Challenges Where Weak Controls Hurt Most"
          subtitle="In capital programmes, these problems do not self-correct. They compound."
          painPoints={painPoints}
        />

        <CampaignTransformation
          title="Capital Programmes Without Integrated Controls vs Capital Programmes With Integrated Controls"
          subtitle="The difference between hoping for the best and building the capability to control delivery."
          beforeTitle="Fragmented Controls"
          afterTitle="Integrated Project Controls"
          beforeItems={beforeItems}
          afterItems={afterItems}
        />

        <CampaignRouteFit
          tag="Route Fit"
          title="Routes for Capital Programme Environments"
          subtitle="Select the route that matches the scale and complexity of your capital programmes."
          routes={routeFitCards}
        />

        {/* Key Message */}
        <KeyMessage />

        <CapabilityTracks />

        {/* Energy Benefits */}
        

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