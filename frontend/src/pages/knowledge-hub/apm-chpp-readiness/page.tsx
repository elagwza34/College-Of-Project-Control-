import ArticleLayout from '@/components/feature/ArticleLayout';
import Footer from '@/components/feature/Footer';
import APMChPPReadiness from "./components/APMChPPReadiness";
import ChPPReadinessQuestionsAnsweredHonestly from "./components/ChPPReadinessQuestionsAnsweredHonestly";
import ExploreAPMChPPReadinessSupport from "./components/ExploreAPMChPPReadinessSupport";
import HonestyAboutProfessionalRecognitionMatters from "./components/HonestyAboutProfessionalRecognitionMatters";
import QuickSummary from "./components/QuickSummary";
import RelatedArticlesSection from "./components/RelatedArticlesSection";
export default function ArticleChppReadiness() {
  return (<>
    <ArticleLayout ctaSection={<ExploreAPMChPPReadinessSupport />} faqSection={<ChPPReadinessQuestionsAnsweredHonestly />} relatedArticles={<RelatedArticlesSection />} heroSection={<APMChPPReadiness />} summarySection={<QuickSummary />}>
      <HonestyAboutProfessionalRecognitionMatters /></ArticleLayout>
    <Footer />
  </>);
}
