import ArticleLayout from '@/components/feature/ArticleLayout';
import Footer from '@/components/feature/Footer';
import APMRecognition from "./components/APMRecognition";
import DiscussThePMORoute from "./components/DiscussThePMORoute";
import EmployerDecisionGuides from "./components/EmployerDecisionGuides";
import PMOGovernanceCommonQuestions from "./components/PMOGovernanceCommonQuestions";
import QuickSummary from "./components/QuickSummary";
import RelatedArticlesSection from "./components/RelatedArticlesSection";
import TheEmployerCaseForPMOCapabilityInvestment from "./components/TheEmployerCaseForPMOCapabilityInvestment";
import ThePMOReportingProblem from "./components/ThePMOReportingProblem";
import WhatThePMOGovernancePCPRouteDevelops from "./components/WhatThePMOGovernancePCPRouteDevelops";
import WhoThisIsFor from "./components/WhoThisIsFor";
import YourPMODoesNotNeedMoreReportsItNeedsStrongerDecisionConfidence from "./components/YourPMODoesNotNeedMoreReportsItNeedsStrongerDecisionConfidence";
export default function ArticlePmoGovernance() {
  return (<>
    <ArticleLayout ctaSection={<DiscussThePMORoute />} faqSection={<PMOGovernanceCommonQuestions />} relatedArticles={<RelatedArticlesSection />} heroSection={<EmployerDecisionGuides />} summarySection={<QuickSummary />}>
      <YourPMODoesNotNeedMoreReportsItNeedsStrongerDecisionConfidence /><ThePMOReportingProblem /><WhatThePMOGovernancePCPRouteDevelops /><WhoThisIsFor /><APMRecognition /><TheEmployerCaseForPMOCapabilityInvestment /></ArticleLayout>
    <Footer />
  </>);
}
