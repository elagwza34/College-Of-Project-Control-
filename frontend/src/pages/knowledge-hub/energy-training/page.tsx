import ArticleLayout from '@/components/feature/ArticleLayout';
import Footer from '@/components/feature/Footer';
import EnergyProjectControlsCommonQuestions from "./components/EnergyProjectControlsCommonQuestions";
import ExploreTheEnergyProjectControlsRoute from "./components/ExploreTheEnergyProjectControlsRoute";
import ForCapitalProgrammesWhereWeakControlsAreTooExpensiveToIgnore from "./components/ForCapitalProgrammesWhereWeakControlsAreTooExpensiveToIgnore";
import FundingFundingSubjectToEligibility from "./components/FundingFundingSubjectToEligibility";
import QuickSummary from "./components/QuickSummary";
import RelatedArticlesSection from "./components/RelatedArticlesSection";
import SectorGuides from "./components/SectorGuides";
import TheNetZeroDimension from "./components/TheNetZeroDimension";
import WhoThisIsFor from "./components/WhoThisIsFor";
import WhyEnergyAndCapitalProgrammesNeedStrongerControls from "./components/WhyEnergyAndCapitalProgrammesNeedStrongerControls";
export default function ArticleEnergyTraining() {
  return (<>
    <ArticleLayout ctaSection={<ExploreTheEnergyProjectControlsRoute />} faqSection={<EnergyProjectControlsCommonQuestions />} relatedArticles={<RelatedArticlesSection />} heroSection={<SectorGuides />} summarySection={<QuickSummary />}>
      <ForCapitalProgrammesWhereWeakControlsAreTooExpensiveToIgnore /><WhyEnergyAndCapitalProgrammesNeedStrongerControls /><WhoThisIsFor /><TheNetZeroDimension /><FundingFundingSubjectToEligibility /></ArticleLayout>
    <Footer />
  </>);
}
