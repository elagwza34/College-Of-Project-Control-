import ArticleLayout from '@/components/feature/ArticleLayout';
import Footer from '@/components/feature/Footer';
import NotSureWhichRouteFitsYou from "./components/NotSureWhichRouteFitsYou";
import PCPVsPMPCommonQuestions from "./components/PCPVsPMPCommonQuestions";
import QuickSummary from "./components/QuickSummary";
import RelatedArticlesSection from "./components/RelatedArticlesSection";
import RouteComparisons from "./components/RouteComparisons";
import TwoDifferentPathsTwoDifferentPurposes from "./components/TwoDifferentPathsTwoDifferentPurposes";
export default function ArticlePcpVsPmp() {
  return (<>
    <ArticleLayout ctaSection={<NotSureWhichRouteFitsYou />} faqSection={<PCPVsPMPCommonQuestions />} relatedArticles={<RelatedArticlesSection />} heroSection={<RouteComparisons />} summarySection={<QuickSummary />}>
      <TwoDifferentPathsTwoDifferentPurposes /></ArticleLayout>
    <Footer />
  </>);
}
