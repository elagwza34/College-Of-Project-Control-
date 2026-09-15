import Footer from '@/components/feature/Footer';
import StickyCta from '@/components/feature/StickyCta';
import APMChPPReadinessSupport from "./components/APMChPPReadinessSupport";
import CommonEmployerChallenges from "./components/CommonEmployerChallenges";
import DiscussYourDevelopmentNeeds from "./components/DiscussYourDevelopmentNeeds";
import ForHRDirectorsLAndDManagersAndEmployers from "./components/ForHRDirectorsLAndDManagersAndEmployers";
import FrequentlyAskedQuestions from "./components/FrequentlyAskedQuestions";
import FundingAndCosts from "./components/FundingAndCosts";
import LearnTogether from "./components/LearnTogether";
import PcpComplianceNoteSection from "./components/PcpComplianceNoteSection";
import ProfessionalCapabilitySection from "./components/ProfessionalCapabilitySection";
import RouteFit from "./components/RouteFit";
import TraditionalTrainingVsFundedProfessionalDevelopment from "./components/TraditionalTrainingVsFundedProfessionalDevelopment";
import WhatYouCouldApplyAtWork from "./components/WhatYouCouldApplyAtWork";
export default function CampaignHrEmployer() {
  return (<div className="min-h-screen bg-background-50">
    <main>
      <ForHRDirectorsLAndDManagersAndEmployers />

      <FundingAndCosts />

      <CommonEmployerChallenges />

      <TraditionalTrainingVsFundedProfessionalDevelopment />

      <RouteFit />

      {/* APM ChPP Readiness */}
      <APMChPPReadinessSupport />

      <ProfessionalCapabilitySection />

      {/* Employer Benefit Cards */}


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
