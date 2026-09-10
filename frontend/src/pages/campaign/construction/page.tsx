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

import { heroBadges, painPoints, beforeItems, afterItems, routeFitCards, constructionBenefits, faqs } from './campaignData';

export default function CampaignConstruction() {
  return (
    <div className="min-h-screen bg-background-50">
      <main>
        <PcpHero
          tag="For Construction Employers, Planners &amp; Project Controls Teams"
          headline="Stop Letting Schedule Delays and Cost Drift Become Normal"
          subheadline="Build project controls capability for construction, building and urban programmes where planning discipline, NEC change control, cost visibility and progress reporting matter."
          description="Delay and cost drift are not inevitable. They are symptoms of weak project controls capability. Build the discipline to see problems earlier and control them faster."
          fundingLine="Apprenticeship funding may be available, subject to current eligibility rules. Department for Education funding band up to £27,000 for eligible employers in England. Delivered by Kent Business College."
          heroImageUrl="https://readdy.ai/api/search-image?query=Modern%20construction%20planning%20office%20with%20large%20Gantt%20charts%20and%20building%20plans%20on%20digital%20displays%2C%20navy%20and%20cream%20interior%2C%20warm%20lighting%2C%20architectural%20drawings%20visible%2C%20clean%20design%2C%20British%20professional%20atmosphere%2C%20no%20people%2C%20editorial%20photography%20style&width=1920&height=1080&seq=campaign-construction-hero&orientation=landscape"
          heroImageAlt="Construction Project Controls Capability"
          primaryCta={{ label: 'Check Construction Route Eligibility', href: '#lead-form' }}
          secondaryCta={{ label: 'Request a consultation', href: '#lead-form' }}
          badges={heroBadges}
          urgencyMessage="Limited KBC-funded support available — secure your place before the current support allocation closes."
          bestFor={['Planners', 'Schedulers', 'Cost Engineers', 'Project Controllers', 'Commercial Teams', 'NEC Project Teams']}
          sectors={['Construction', 'Building', 'Urban Development', 'Infrastructure', 'Civil Engineering']}
        />

        <PcpFundingStrip />

        <PcpPainPointsGrid
          title="Construction Delivery Problems That Stronger Controls Solve"
          subtitle="These are not inevitable. They are capability gaps the Operational PCP route closes."
          painPoints={painPoints}
        />

        <CampaignTransformation
          title="Construction Without Controls vs Construction With Controls"
          subtitle="The difference between accepting delay as normal and building the capability to control delivery."
          beforeTitle="Weak Project Controls"
          afterTitle="Professional Project Controls"
          beforeItems={beforeItems}
          afterItems={afterItems}
        />

        <CampaignRouteFit
          tag="Route Fit"
          title="Routes Built for Construction Reality"
          subtitle="Select the route that matches your role and the complexity of your construction programmes."
          routes={routeFitCards}
        />

        {/* Key Message */}
        <KeyMessage />

        <CapabilityTracks />

        {/* Construction Benefits */}
        

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