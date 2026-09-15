import ArticleLayout from '@/components/feature/ArticleLayout';
import Footer from '@/components/feature/Footer';
import CommonQuestionsAboutThePCPApprenticeship from "./components/CommonQuestionsAboutThePCPApprenticeship";
import FundingGuides from "./components/FundingGuides";
import QuickSummary from "./components/QuickSummary";
import ReadyToExploreThePCPRoute from "./components/ReadyToExploreThePCPRoute";
import RelatedArticlesSection from "./components/RelatedArticlesSection";
import WhatIsTheLevel6ProjectControlsProfessionalApprenticeship from "./components/WhatIsTheLevel6ProjectControlsProfessionalApprenticeship";
export default function ArticleWhatIsPcp() {
  return (<>
    <ArticleLayout ctaSection={<ReadyToExploreThePCPRoute />} faqSection={<CommonQuestionsAboutThePCPApprenticeship />} relatedArticles={<RelatedArticlesSection />} heroSection={<FundingGuides />} summarySection={<QuickSummary />}>
      <WhatIsTheLevel6ProjectControlsProfessionalApprenticeship /></ArticleLayout>
    <Footer />
  </>);
}
