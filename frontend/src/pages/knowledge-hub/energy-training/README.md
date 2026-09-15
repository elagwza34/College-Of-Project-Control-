# knowledge-hub/energy-training sections

Composition: [page.tsx](page.tsx). Routes: `/knowledge-hub/energy-training`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| Energy Project Controls: Common Questions | [EnergyProjectControlsCommonQuestions.tsx](components/EnergyProjectControlsCommonQuestions.tsx) | [PcpFaqSection.tsx](../../../components/feature/PcpFaqSection.tsx) |
| Explore the Energy Project Controls Route | [ExploreTheEnergyProjectControlsRoute.tsx](components/ExploreTheEnergyProjectControlsRoute.tsx) | [ArticleCta.tsx](../../../components/feature/ArticleCta.tsx) |
| For Capital Programmes Where Weak Controls Are Too Expensive to Ignore | [ForCapitalProgrammesWhereWeakControlsAreTooExpensiveToIgnore.tsx](components/ForCapitalProgrammesWhereWeakControlsAreTooExpensiveToIgnore.tsx) | Page-local |
| Funding: Funding Subject to Eligibility | [FundingFundingSubjectToEligibility.tsx](components/FundingFundingSubjectToEligibility.tsx) | Page-local |
| Quick Summary | [QuickSummary.tsx](components/QuickSummary.tsx) | [QuickSummary.tsx](../../../components/feature/article/QuickSummary.tsx) |
| Related Articles | [RelatedArticlesSection.tsx](components/RelatedArticlesSection.tsx) | [RelatedArticles.tsx](../../../components/feature/RelatedArticles.tsx) |
| Sector Guides | [SectorGuides.tsx](components/SectorGuides.tsx) | [ArticleIntroduction.tsx](../../../components/feature/article/ArticleIntroduction.tsx) |
| The Net Zero Dimension | [TheNetZeroDimension.tsx](components/TheNetZeroDimension.tsx) | Page-local |
| Who This Is For | [WhoThisIsFor.tsx](components/WhoThisIsFor.tsx) | Page-local |
| Why Energy and Capital Programmes Need Stronger Controls | [WhyEnergyAndCapitalProgrammesNeedStrongerControls.tsx](components/WhyEnergyAndCapitalProgrammesNeedStrongerControls.tsx) | Page-local |

Section copy, repeated items and configuration:

- [sectionData.ts](sectionData.ts)

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
