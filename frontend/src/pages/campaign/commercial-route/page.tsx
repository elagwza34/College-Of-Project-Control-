import OutcomeExamples from '@/components/feature/OutcomeExamples';
import Footer from '@/components/feature/Footer';
import PcpHero from '@/components/feature/PcpHero';
import PcpFaqSection from '@/components/feature/PcpFaqSection';
import StickyCta from '@/components/feature/StickyCta';
import CampaignTransformation from '@/components/feature/CampaignTransformation';
import CampaignRouteFit from '@/components/feature/CampaignRouteFit';
import CapabilityTracks from '@/pages/pcp-master/components/CapabilityTracks';
import PcpFundingStrip from '@/components/feature/PcpFundingStrip';
import IpcAuthority from '@/components/feature/IpcAuthority';

import CommercialRouteValue from './components/CommercialRouteValue';
import KeyMessage from './components/KeyMessage';

import { heroBadges, beforeItems, afterItems, routeFitCards, learnerBenefits, faqs } from './campaignData';

export default function CampaignCommercialRoute() {
  return (
    <div className="min-h-screen bg-background-50">
      <main>
        <PcpHero
          tag="Commercial access for non-eligible learners"
          headline="Build Your Project Controls Career Through the Commercial Route"
          headlineHighlight="Commercial Route"
          subheadline="Not eligible for apprenticeship funding? Access structured Level 6 development, expert tutoring and professional progression support through our commercial pathway."
          description="Flexible payment options and discretionary KBC bursary support may be available."
          heroImageUrl="https://readdy.ai/api/search-image?query=Modern%20professional%20workspace%20with%20laptop%2C%20project%20planning%20documents%2C%20digital%20displays%20showing%20Gantt%20charts%2C%20navy%20and%20cream%20interior%2C%20warm%20natural%20lighting%2C%20sophisticated%20home%20office%20meets%20professional%20environment%2C%20clean%20design%2C%20British%20atmosphere%2C%20no%20people%2C%20editorial%20photography%20style&width=1920&height=1080&seq=campaign-commercial-hero&orientation=landscape"
          heroImageAlt="Commercial Route for Project Controls Career"
          primaryCta={{ label: 'Explore the Commercial Route', href: '#commercial-route' }}
          secondaryCta={{ label: 'Speak to an Adviser', href: '/book-a-session' }}
          badges={heroBadges}
          bestFor={['Self-Employed Professionals', 'Career Changers', 'Learners Outside England']}
        />

        {/* Commercial Route Value */}
        <CommercialRouteValue />

        <IpcAuthority />

        <CampaignTransformation
          title="Without Access vs With the Commercial Route"
          subtitle="The commercial pathway opens professional project controls development when apprenticeship funding is not available."
          beforeTitle="Limited Options"
          afterTitle="Commercial Route Access"
          beforeItems={beforeItems}
          afterItems={afterItems}
        />

        <CampaignRouteFit
          tag="Route Fit"
          title="Which Route Matches Your Career Goals?"
          subtitle="Three routes are available through the commercial pathway, each designed for different career stages and ambitions."
          routes={routeFitCards}
        />

        {/* APM ChPP Readiness */}
        <KeyMessage />

        <CapabilityTracks />

        {/* Learner Benefits */}
        

        {/* Testimonial */}
        <OutcomeExamples />

        <div id="funding" aria-label="Commercial route funding">
          <PcpFundingStrip />
        </div>

        <PcpFaqSection faqs={faqs} />

      </main>
      <StickyCta />
      <Footer />
    </div>
  );
}
