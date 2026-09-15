import ArticleLayout from '@/components/feature/ArticleLayout';
import Footer from '@/components/feature/Footer';
import CheckYourOrganisationsFundingEligibility from "./components/CheckYourOrganisationsFundingEligibility";
import FundingGuides from "./components/FundingGuides";
import FundingQuestionsEmployersAsk from "./components/FundingQuestionsEmployersAsk";
import QuickSummary from "./components/QuickSummary";
import RelatedArticlesSection from "./components/RelatedArticlesSection";
import UseApprenticeshipFundingToBuildProjectControlsCapabilityYourBusinessCanActuallyMeasure from "./components/UseApprenticeshipFundingToBuildProjectControlsCapabilityYourBusinessCanActuallyMeasure";
export default function ArticleFundedEmployerGuide() {
  return (<>
    <ArticleLayout ctaSection={<CheckYourOrganisationsFundingEligibility />} faqSection={<FundingQuestionsEmployersAsk />} relatedArticles={<RelatedArticlesSection />} heroSection={<FundingGuides />} summarySection={<QuickSummary />}>
      <UseApprenticeshipFundingToBuildProjectControlsCapabilityYourBusinessCanActuallyMeasure /></ArticleLayout>
    <Footer />
  </>);
}
