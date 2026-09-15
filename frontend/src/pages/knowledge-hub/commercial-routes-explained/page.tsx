import ArticleLayout from '@/components/feature/ArticleLayout';
import Footer from '@/components/feature/Footer';
import CommercialRouteCommonQuestions from "./components/CommercialRouteCommonQuestions";
import CommercialRouteVsApprenticeshipRouteKeyDifferences from "./components/CommercialRouteVsApprenticeshipRouteKeyDifferences";
import ExploreTheCommercialRoute from "./components/ExploreTheCommercialRoute";
import FundingGuides from "./components/FundingGuides";
import NotEligibleForApprenticeshipFundingYouStillDeserveProfessionalProjectControlsDevelopment from "./components/NotEligibleForApprenticeshipFundingYouStillDeserveProfessionalProjectControlsDevelopment";
import PaymentOptionsMakingTheCommercialRouteAccessible from "./components/PaymentOptionsMakingTheCommercialRouteAccessible";
import QuickSummary from "./components/QuickSummary";
import RelatedArticlesSection from "./components/RelatedArticlesSection";
import TakingTheNextStep from "./components/TakingTheNextStep";
import WhatTheCommercialRouteIncludes from "./components/WhatTheCommercialRouteIncludes";
import WhoTheCommercialRouteIsFor from "./components/WhoTheCommercialRouteIsFor";
export default function ArticleCommercialRoutes() {
  return (<>
    <ArticleLayout ctaSection={<ExploreTheCommercialRoute />} faqSection={<CommercialRouteCommonQuestions />} relatedArticles={<RelatedArticlesSection />} heroSection={<FundingGuides />} summarySection={<QuickSummary />}>
      <NotEligibleForApprenticeshipFundingYouStillDeserveProfessionalProjectControlsDevelopment /><WhoTheCommercialRouteIsFor /><WhatTheCommercialRouteIncludes /><PaymentOptionsMakingTheCommercialRouteAccessible /><CommercialRouteVsApprenticeshipRouteKeyDifferences /><TakingTheNextStep /></ArticleLayout>
    <Footer />
  </>);
}
