# knowledge-hub/commercial-routes-explained sections

Composition: [page.tsx](page.tsx). Routes: `/knowledge-hub/commercial-routes-explained`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| Commercial Route: Common Questions | [CommercialRouteCommonQuestions.tsx](components/CommercialRouteCommonQuestions.tsx) | [PcpFaqSection.tsx](../../../components/feature/PcpFaqSection.tsx) |
| Commercial Route vs Apprenticeship Route: Key Differences | [CommercialRouteVsApprenticeshipRouteKeyDifferences.tsx](components/CommercialRouteVsApprenticeshipRouteKeyDifferences.tsx) | Page-local |
| Explore the Commercial Route | [ExploreTheCommercialRoute.tsx](components/ExploreTheCommercialRoute.tsx) | [ArticleCta.tsx](../../../components/feature/ArticleCta.tsx) |
| Funding Guides | [FundingGuides.tsx](components/FundingGuides.tsx) | [ArticleIntroduction.tsx](../../../components/feature/article/ArticleIntroduction.tsx) |
| Not Eligible for Apprenticeship Funding? You Still Deserve Professional Project Controls Development. | [NotEligibleForApprenticeshipFundingYouStillDeserveProfessionalProjectControlsDevelopment.tsx](components/NotEligibleForApprenticeshipFundingYouStillDeserveProfessionalProjectControlsDevelopment.tsx) | Page-local |
| Payment Options: Making the Commercial Route Accessible | [PaymentOptionsMakingTheCommercialRouteAccessible.tsx](components/PaymentOptionsMakingTheCommercialRouteAccessible.tsx) | Page-local |
| Quick Summary | [QuickSummary.tsx](components/QuickSummary.tsx) | [QuickSummary.tsx](../../../components/feature/article/QuickSummary.tsx) |
| Related Articles | [RelatedArticlesSection.tsx](components/RelatedArticlesSection.tsx) | [RelatedArticles.tsx](../../../components/feature/RelatedArticles.tsx) |
| Taking the Next Step | [TakingTheNextStep.tsx](components/TakingTheNextStep.tsx) | Page-local |
| What the Commercial Route Includes | [WhatTheCommercialRouteIncludes.tsx](components/WhatTheCommercialRouteIncludes.tsx) | Page-local |
| Who the Commercial Route Is For | [WhoTheCommercialRouteIsFor.tsx](components/WhoTheCommercialRouteIsFor.tsx) | Page-local |

Section copy, repeated items and configuration:

- [sectionData.ts](sectionData.ts)

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
