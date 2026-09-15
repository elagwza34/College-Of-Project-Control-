import Footer from '@/components/feature/Footer';
import StickyCta from '@/components/feature/StickyCta';
import DiscussYourDevelopmentNeeds from "./components/DiscussYourDevelopmentNeeds";
import ForCouncilsLocalAuthoritiesAndPublicSectorProgrammeTeams from "./components/ForCouncilsLocalAuthoritiesAndPublicSectorProgrammeTeams";
import FrequentlyAskedQuestions from "./components/FrequentlyAskedQuestions";
import FundingAndCosts from "./components/FundingAndCosts";
import KeyMessage from './components/KeyMessage';
import LearnTogether from "./components/LearnTogether";
import PcpComplianceNoteSection from "./components/PcpComplianceNoteSection";
import ProfessionalCapabilitySection from "./components/ProfessionalCapabilitySection";
import PublicSectorDeliveryChallengesThatStrongerControlsAddress from "./components/PublicSectorDeliveryChallengesThatStrongerControlsAddress";
import PublicSectorDeliveryWithoutControlsVsPublicSectorDeliveryWithControls from "./components/PublicSectorDeliveryWithoutControlsVsPublicSectorDeliveryWithControls";
import RouteFit from "./components/RouteFit";
import WhatYouCouldApplyAtWork from "./components/WhatYouCouldApplyAtWork";
export default function CampaignPublicSector() {
  return (<div className="min-h-screen bg-background-50">
    <main>
      <ForCouncilsLocalAuthoritiesAndPublicSectorProgrammeTeams />

      <FundingAndCosts />

      <PublicSectorDeliveryChallengesThatStrongerControlsAddress />

      <PublicSectorDeliveryWithoutControlsVsPublicSectorDeliveryWithControls />

      <RouteFit />

      {/* Key Message */}
      <KeyMessage />

      <ProfessionalCapabilitySection />

      {/* Public Sector Benefits */}


      {/* Testimonial */}
      <WhatYouCouldApplyAtWork />

      <LearnTogether />

      {/* Lead Form */}
      <DiscussYourDevelopmentNeeds />

      <FrequentlyAskedQuestions />

      <PcpComplianceNoteSection />
    </main>
    <StickyCta />
    <Footer />
  </div>);
}
