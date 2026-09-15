import Footer from '@/components/feature/Footer';
import StickyCta from '@/components/feature/StickyCta';
import ConstructionDeliveryProblemsThatStrongerControlsSolve from "./components/ConstructionDeliveryProblemsThatStrongerControlsSolve";
import ConstructionWithoutControlsVsConstructionWithControls from "./components/ConstructionWithoutControlsVsConstructionWithControls";
import DiscussYourDevelopmentNeeds from "./components/DiscussYourDevelopmentNeeds";
import ForConstructionEmployersPlannersAndProjectControlsTeams from "./components/ForConstructionEmployersPlannersAndProjectControlsTeams";
import FrequentlyAskedQuestions from "./components/FrequentlyAskedQuestions";
import FundingAndCosts from "./components/FundingAndCosts";
import KeyMessage from './components/KeyMessage';
import LearnTogether from "./components/LearnTogether";
import PcpComplianceNoteSection from "./components/PcpComplianceNoteSection";
import ProfessionalCapabilitySection from "./components/ProfessionalCapabilitySection";
import RouteFit from "./components/RouteFit";
import WhatYouCouldApplyAtWork from "./components/WhatYouCouldApplyAtWork";
export default function CampaignConstruction() {
  return (<div className="min-h-screen bg-background-50">
    <main>
      <ForConstructionEmployersPlannersAndProjectControlsTeams />

      <FundingAndCosts />

      <ConstructionDeliveryProblemsThatStrongerControlsSolve />

      <ConstructionWithoutControlsVsConstructionWithControls />

      <RouteFit />

      {/* Key Message */}
      <KeyMessage />

      <ProfessionalCapabilitySection />

      {/* Construction Benefits */}


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
