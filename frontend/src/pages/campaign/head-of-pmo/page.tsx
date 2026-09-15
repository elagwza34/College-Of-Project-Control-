import Footer from '@/components/feature/Footer';
import StickyCta from '@/components/feature/StickyCta';
import APMRecognisedAssessmentCentre from "./components/APMRecognisedAssessmentCentre";
import DiscussYourDevelopmentNeeds from "./components/DiscussYourDevelopmentNeeds";
import ForHeadsOfPMOPMOLeadsAndGovernanceProfessionals from "./components/ForHeadsOfPMOPMOLeadsAndGovernanceProfessionals";
import FrequentlyAskedQuestions from "./components/FrequentlyAskedQuestions";
import FromReportingPMOToDecisionSupportPMO from "./components/FromReportingPMOToDecisionSupportPMO";
import FundingAndCosts from "./components/FundingAndCosts";
import LearnTogether from "./components/LearnTogether";
import PcpComplianceNoteSection from "./components/PcpComplianceNoteSection";
import PMOChallengesThatHoldOrganisationsBack from "./components/PMOChallengesThatHoldOrganisationsBack";
import ProfessionalCapabilitySection from "./components/ProfessionalCapabilitySection";
import RouteFit from "./components/RouteFit";
import WhatYouCouldApplyAtWork from "./components/WhatYouCouldApplyAtWork";
export default function CampaignHeadOfPmo() {
  return (<div className="min-h-screen bg-background-50">
    <main>
      <ForHeadsOfPMOPMOLeadsAndGovernanceProfessionals />

      <FundingAndCosts />

      <PMOChallengesThatHoldOrganisationsBack />

      <FromReportingPMOToDecisionSupportPMO />

      <RouteFit />

      {/* APM ChPP Readiness */}
      <APMRecognisedAssessmentCentre />

      <ProfessionalCapabilitySection />

      {/* PMO Benefits */}


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
