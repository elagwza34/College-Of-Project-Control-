# knowledge-hub/strategic-vs-operational sections

Composition: [page.tsx](page.tsx). Routes: `/knowledge-hub/strategic-vs-operational`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| Find Your Best Route | [FindYourBestRoute.tsx](components/FindYourBestRoute.tsx) | [ArticleCta.tsx](../../../components/feature/ArticleCta.tsx) |
| Making Your Choice | [MakingYourChoice.tsx](components/MakingYourChoice.tsx) | Page-local |
| Operational Project Controls: Delivery-Grade Capability | [OperationalProjectControlsDeliveryGradeCapability.tsx](components/OperationalProjectControlsDeliveryGradeCapability.tsx) | Page-local |
| Quick Summary | [QuickSummary.tsx](components/QuickSummary.tsx) | [QuickSummary.tsx](../../../components/feature/article/QuickSummary.tsx) |
| Related Articles | [RelatedArticlesSection.tsx](components/RelatedArticlesSection.tsx) | [RelatedArticles.tsx](../../../components/feature/RelatedArticles.tsx) |
| Route Comparisons | [RouteComparisons.tsx](components/RouteComparisons.tsx) | [ArticleIntroduction.tsx](../../../components/feature/article/ArticleIntroduction.tsx) |
| Strategic + Operational: The Combined Route | [StrategicOperationalTheCombinedRoute.tsx](components/StrategicOperationalTheCombinedRoute.tsx) | Page-local |
| Strategic Project Controls: Leadership-Grade Capability | [StrategicProjectControlsLeadershipGradeCapability.tsx](components/StrategicProjectControlsLeadershipGradeCapability.tsx) | Page-local |
| Strategic vs Operational: Common Questions | [StrategicVsOperationalCommonQuestions.tsx](components/StrategicVsOperationalCommonQuestions.tsx) | [PcpFaqSection.tsx](../../../components/feature/PcpFaqSection.tsx) |
| Two Pathways. One Professional Standard. Different Career Outcomes. | [TwoPathwaysOneProfessionalStandardDifferentCareerOutcomes.tsx](components/TwoPathwaysOneProfessionalStandardDifferentCareerOutcomes.tsx) | Page-local |

Section copy, repeated items and configuration:

- [sectionData.ts](sectionData.ts)

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
