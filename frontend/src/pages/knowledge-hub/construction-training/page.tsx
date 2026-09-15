import ArticleLayout from '@/components/feature/ArticleLayout';
import Footer from '@/components/feature/Footer';
import CheckConstructionRouteEligibility from "./components/CheckConstructionRouteEligibility";
import ConstructionProjectControlsCommonQuestions from "./components/ConstructionProjectControlsCommonQuestions";
import EmployerValueBuildCapabilityYourConstructionBusinessCannotAffordToBeWithout from "./components/EmployerValueBuildCapabilityYourConstructionBusinessCannotAffordToBeWithout";
import FundingFundingSubjectToEligibility from "./components/FundingFundingSubjectToEligibility";
import QuickSummary from "./components/QuickSummary";
import RelatedArticlesSection from "./components/RelatedArticlesSection";
import SectorGuides from "./components/SectorGuides";
import StopLettingScheduleDelaysAndCostDriftBecomeNormal from "./components/StopLettingScheduleDelaysAndCostDriftBecomeNormal";
import WhatTheConstructionPCPRouteDelivers from "./components/WhatTheConstructionPCPRouteDelivers";
import WhoThisIsFor from "./components/WhoThisIsFor";
import WhyConstructionNeedsStrongerProjectControls from "./components/WhyConstructionNeedsStrongerProjectControls";
export default function ArticleConstructionTraining() {
  return (<>
    <ArticleLayout ctaSection={<CheckConstructionRouteEligibility />} faqSection={<ConstructionProjectControlsCommonQuestions />} relatedArticles={<RelatedArticlesSection />} heroSection={<SectorGuides />} summarySection={<QuickSummary />}>
      <StopLettingScheduleDelaysAndCostDriftBecomeNormal /><WhyConstructionNeedsStrongerProjectControls /><WhatTheConstructionPCPRouteDelivers /><WhoThisIsFor /><EmployerValueBuildCapabilityYourConstructionBusinessCannotAffordToBeWithout /><FundingFundingSubjectToEligibility /></ArticleLayout>
    <Footer />
  </>);
}
