# knowledge-hub/construction-training sections

Composition: [page.tsx](page.tsx). Routes: `/knowledge-hub/construction-training`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| Check Construction Route Eligibility | [CheckConstructionRouteEligibility.tsx](components/CheckConstructionRouteEligibility.tsx) | [ArticleCta.tsx](../../../components/feature/ArticleCta.tsx) |
| Construction Project Controls: Common Questions | [ConstructionProjectControlsCommonQuestions.tsx](components/ConstructionProjectControlsCommonQuestions.tsx) | [PcpFaqSection.tsx](../../../components/feature/PcpFaqSection.tsx) |
| Employer Value: Build Capability Your Construction Business Cannot Afford to Be Without | [EmployerValueBuildCapabilityYourConstructionBusinessCannotAffordToBeWithout.tsx](components/EmployerValueBuildCapabilityYourConstructionBusinessCannotAffordToBeWithout.tsx) | Page-local |
| Funding: Funding Subject to Eligibility | [FundingFundingSubjectToEligibility.tsx](components/FundingFundingSubjectToEligibility.tsx) | Page-local |
| Quick Summary | [QuickSummary.tsx](components/QuickSummary.tsx) | [QuickSummary.tsx](../../../components/feature/article/QuickSummary.tsx) |
| Related Articles | [RelatedArticlesSection.tsx](components/RelatedArticlesSection.tsx) | [RelatedArticles.tsx](../../../components/feature/RelatedArticles.tsx) |
| Sector Guides | [SectorGuides.tsx](components/SectorGuides.tsx) | [ArticleIntroduction.tsx](../../../components/feature/article/ArticleIntroduction.tsx) |
| Stop Letting Schedule Delays and Cost Drift Become Normal | [StopLettingScheduleDelaysAndCostDriftBecomeNormal.tsx](components/StopLettingScheduleDelaysAndCostDriftBecomeNormal.tsx) | Page-local |
| What the Construction PCP Route Delivers | [WhatTheConstructionPCPRouteDelivers.tsx](components/WhatTheConstructionPCPRouteDelivers.tsx) | Page-local |
| Who This Is For | [WhoThisIsFor.tsx](components/WhoThisIsFor.tsx) | Page-local |
| Why Construction Needs Stronger Project Controls | [WhyConstructionNeedsStrongerProjectControls.tsx](components/WhyConstructionNeedsStrongerProjectControls.tsx) | Page-local |

Section copy, repeated items and configuration:

- [sectionData.ts](sectionData.ts)

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
