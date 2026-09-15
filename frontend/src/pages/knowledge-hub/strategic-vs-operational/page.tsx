import ArticleLayout from '@/components/feature/ArticleLayout';
import Footer from '@/components/feature/Footer';
import FindYourBestRoute from "./components/FindYourBestRoute";
import MakingYourChoice from "./components/MakingYourChoice";
import OperationalProjectControlsDeliveryGradeCapability from "./components/OperationalProjectControlsDeliveryGradeCapability";
import QuickSummary from "./components/QuickSummary";
import RelatedArticlesSection from "./components/RelatedArticlesSection";
import RouteComparisons from "./components/RouteComparisons";
import StrategicOperationalTheCombinedRoute from "./components/StrategicOperationalTheCombinedRoute";
import StrategicProjectControlsLeadershipGradeCapability from "./components/StrategicProjectControlsLeadershipGradeCapability";
import StrategicVsOperationalCommonQuestions from "./components/StrategicVsOperationalCommonQuestions";
import TwoPathwaysOneProfessionalStandardDifferentCareerOutcomes from "./components/TwoPathwaysOneProfessionalStandardDifferentCareerOutcomes";
export default function ArticleStrategicVsOperational() {
  return (<>
    <ArticleLayout ctaSection={<FindYourBestRoute />} faqSection={<StrategicVsOperationalCommonQuestions />} relatedArticles={<RelatedArticlesSection />} heroSection={<RouteComparisons />} summarySection={<QuickSummary />}>
      <TwoPathwaysOneProfessionalStandardDifferentCareerOutcomes /><StrategicProjectControlsLeadershipGradeCapability /><OperationalProjectControlsDeliveryGradeCapability /><StrategicOperationalTheCombinedRoute /><MakingYourChoice /></ArticleLayout>
    <Footer />
  </>);
}
