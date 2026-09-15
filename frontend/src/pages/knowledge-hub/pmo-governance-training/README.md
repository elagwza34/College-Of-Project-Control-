# knowledge-hub/pmo-governance-training sections

Composition: [page.tsx](page.tsx). Routes: `/knowledge-hub/pmo-governance-training`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| APM Recognition | [APMRecognition.tsx](components/APMRecognition.tsx) | Page-local |
| Discuss the PMO Route | [DiscussThePMORoute.tsx](components/DiscussThePMORoute.tsx) | [ArticleCta.tsx](../../../components/feature/ArticleCta.tsx) |
| Employer Decision Guides | [EmployerDecisionGuides.tsx](components/EmployerDecisionGuides.tsx) | [ArticleIntroduction.tsx](../../../components/feature/article/ArticleIntroduction.tsx) |
| PMO Governance: Common Questions | [PMOGovernanceCommonQuestions.tsx](components/PMOGovernanceCommonQuestions.tsx) | [PcpFaqSection.tsx](../../../components/feature/PcpFaqSection.tsx) |
| Quick Summary | [QuickSummary.tsx](components/QuickSummary.tsx) | [QuickSummary.tsx](../../../components/feature/article/QuickSummary.tsx) |
| Related Articles | [RelatedArticlesSection.tsx](components/RelatedArticlesSection.tsx) | [RelatedArticles.tsx](../../../components/feature/RelatedArticles.tsx) |
| The Employer Case for PMO Capability Investment | [TheEmployerCaseForPMOCapabilityInvestment.tsx](components/TheEmployerCaseForPMOCapabilityInvestment.tsx) | Page-local |
| The PMO Reporting Problem | [ThePMOReportingProblem.tsx](components/ThePMOReportingProblem.tsx) | Page-local |
| What the PMO & Governance PCP Route Develops | [WhatThePMOGovernancePCPRouteDevelops.tsx](components/WhatThePMOGovernancePCPRouteDevelops.tsx) | Page-local |
| Who This Is For | [WhoThisIsFor.tsx](components/WhoThisIsFor.tsx) | Page-local |
| Your PMO Does Not Need More Reports. It Needs Stronger Decision Confidence. | [YourPMODoesNotNeedMoreReportsItNeedsStrongerDecisionConfidence.tsx](components/YourPMODoesNotNeedMoreReportsItNeedsStrongerDecisionConfidence.tsx) | Page-local |

Section copy, repeated items and configuration:

- [sectionData.ts](sectionData.ts)

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
