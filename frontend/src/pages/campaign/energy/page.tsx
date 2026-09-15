import Footer from '@/components/feature/Footer';
import StickyCta from '@/components/feature/StickyCta';
import CapitalProgrammeChallengesWhereWeakControlsHurtMost from "./components/CapitalProgrammeChallengesWhereWeakControlsHurtMost";
import CapitalProgrammesWithoutIntegratedControlsVsCapitalProgrammesWithIntegratedControls from "./components/CapitalProgrammesWithoutIntegratedControlsVsCapitalProgrammesWithIntegratedControls";
import DiscussYourDevelopmentNeeds from "./components/DiscussYourDevelopmentNeeds";
import ForEnergyUtilitiesAndCapitalProgrammeTeams from "./components/ForEnergyUtilitiesAndCapitalProgrammeTeams";
import FrequentlyAskedQuestions from "./components/FrequentlyAskedQuestions";
import FundingAndCosts from "./components/FundingAndCosts";
import KeyMessage from './components/KeyMessage';
import LearnTogether from "./components/LearnTogether";
import PcpComplianceNoteSection from "./components/PcpComplianceNoteSection";
import ProfessionalCapabilitySection from "./components/ProfessionalCapabilitySection";
import RouteFit from "./components/RouteFit";
import WhatYouCouldApplyAtWork from "./components/WhatYouCouldApplyAtWork";
export default function CampaignEnergy() {
  return (<div className="min-h-screen bg-background-50">
    <main>
      <ForEnergyUtilitiesAndCapitalProgrammeTeams />

      <FundingAndCosts />

      <CapitalProgrammeChallengesWhereWeakControlsHurtMost />

      <CapitalProgrammesWithoutIntegratedControlsVsCapitalProgrammesWithIntegratedControls />

      <RouteFit />

      {/* Key Message */}
      <KeyMessage />

      <ProfessionalCapabilitySection />

      {/* Energy Benefits */}


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
