import ArticleLayout from '@/components/feature/ArticleLayout';
import Footer from '@/components/feature/Footer';
import CheckYourOrganisationsFundingEligibility from "./components/CheckYourOrganisationsFundingEligibility";
import EmployerDecisionGuides from "./components/EmployerDecisionGuides";
import EmployerFundingCommonQuestions from "./components/EmployerFundingCommonQuestions";
import QuickSummary from "./components/QuickSummary";
import RelatedArticlesSection from "./components/RelatedArticlesSection";
import Step1UnderstandYourFundingPosition from "./components/Step1UnderstandYourFundingPosition";
import Step2IdentifyWhereProjectControlsCapabilityMattersMost from "./components/Step2IdentifyWhereProjectControlsCapabilityMattersMost";
import Step3ChooseTheRightPCPRouteForYourTeam from "./components/Step3ChooseTheRightPCPRouteForYourTeam";
import Step4PlanYourCohort from "./components/Step4PlanYourCohort";
import Step5MakeTheBusinessCase from "./components/Step5MakeTheBusinessCase";
import TakeTheNextStep from "./components/TakeTheNextStep";
import UseApprenticeshipFundingToBuildProjectControlsCapabilityYourBusinessCanActuallyMeasure from "./components/UseApprenticeshipFundingToBuildProjectControlsCapabilityYourBusinessCanActuallyMeasure";
export default function ArticleEmployerFunding() {
  return (<>
    <ArticleLayout ctaSection={<CheckYourOrganisationsFundingEligibility />} faqSection={<EmployerFundingCommonQuestions />} relatedArticles={<RelatedArticlesSection />} heroSection={<EmployerDecisionGuides />} summarySection={<QuickSummary />}>
      <UseApprenticeshipFundingToBuildProjectControlsCapabilityYourBusinessCanActuallyMeasure /><Step1UnderstandYourFundingPosition /><Step2IdentifyWhereProjectControlsCapabilityMattersMost /><Step3ChooseTheRightPCPRouteForYourTeam /><Step4PlanYourCohort /><Step5MakeTheBusinessCase /><TakeTheNextStep /></ArticleLayout>
    <Footer />
  </>);
}
