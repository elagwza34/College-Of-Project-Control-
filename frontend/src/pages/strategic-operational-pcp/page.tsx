import Footer from '@/components/feature/Footer';
import SchemaOrg, { courseSchema, faqPageSchema } from '@/components/feature/SchemaOrg';
import StickyCta from '@/components/feature/StickyCta';
import ChooseTheRightAccessRoute from "./components/ChooseTheRightAccessRoute";
import CombinedCapabilitiesLearnersDevelop from "./components/CombinedCapabilitiesLearnersDevelop";
import CombinedCapability from "./components/CombinedCapability";
import CombinedValue from "./components/CombinedValue";
import ComplianceNote from './components/ComplianceNote';
import FromProjectControlsToProgrammeLeadership from "./components/FromProjectControlsToProgrammeLeadership";
import FundingSubjectToEligibility from "./components/FundingSubjectToEligibility";
import LearnTogether from "./components/LearnTogether";
import ReadyToBuildCompleteProjectControlsCapability from "./components/ReadyToBuildCompleteProjectControlsCapability";
import RequestConsultationCta from './components/RequestConsultationCta';
import RouteNavbarSection from "./components/RouteNavbarSection";
import StrategicOperationalPCPRouteFAQs from "./components/StrategicOperationalPCPRouteFAQs";
import WhatYouCouldApplyAtWork from "./components/WhatYouCouldApplyAtWork";
import WhoShouldChooseTheStrategicOperationalRoute from "./components/WhoShouldChooseTheStrategicOperationalRoute";
import WhyThisRoute from "./components/WhyThisRoute";
import { faqData } from './routeData';
export default function StrategicOperationalPcp() {
  return (<>
    <SchemaOrg type="EducationalOccupationalProgram" data={courseSchema({
      name: 'Strategic + Operational Project Controls Professional Level 6 Route with OTHM Level 7 Diploma',
      description: 'A premium combined pathway combining Level 6 project controls capability with strategic leadership development and OTHM Level 7 Diploma progression. Funding subject to eligibility.',
      occupationalCategory: 'Strategic and Operational Project Controls Professional',
    })} />
    <SchemaOrg type="FAQPage" data={faqPageSchema(faqData.faqs)} />

    <div className="min-h-screen bg-background-50">
      <main>
        <FundingSubjectToEligibility />
        <RouteNavbarSection />
        <CombinedCapability />
        <WhyThisRoute />
        <FromProjectControlsToProgrammeLeadership />
        <CombinedValue />
        <ChooseTheRightAccessRoute />
        <WhoShouldChooseTheStrategicOperationalRoute />
        <CombinedCapabilitiesLearnersDevelop />
        <WhatYouCouldApplyAtWork />
        <LearnTogether />
        <ReadyToBuildCompleteProjectControlsCapability />
        <RequestConsultationCta />
        <StrategicOperationalPCPRouteFAQs />
        <ComplianceNote />
      </main>
      <Footer />
      <StickyCta />
    </div>
  </>);
}
