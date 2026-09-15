# knowledge-hub/what-is-pcp-apprenticeship sections

Composition: [page.tsx](page.tsx). Routes: `/knowledge-hub/what-is-pcp-apprenticeship`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| Common Questions About the PCP Apprenticeship | [CommonQuestionsAboutThePCPApprenticeship.tsx](components/CommonQuestionsAboutThePCPApprenticeship.tsx) | [PcpFaqSection.tsx](../../../components/feature/PcpFaqSection.tsx) |
| Funding Guides | [FundingGuides.tsx](components/FundingGuides.tsx) | [ArticleIntroduction.tsx](../../../components/feature/article/ArticleIntroduction.tsx) |
| Quick Summary | [QuickSummary.tsx](components/QuickSummary.tsx) | [QuickSummary.tsx](../../../components/feature/article/QuickSummary.tsx) |
| Ready to Explore the PCP Route? | [ReadyToExploreThePCPRoute.tsx](components/ReadyToExploreThePCPRoute.tsx) | [ArticleCta.tsx](../../../components/feature/ArticleCta.tsx) |
| Related Articles | [RelatedArticlesSection.tsx](components/RelatedArticlesSection.tsx) | [RelatedArticles.tsx](../../../components/feature/RelatedArticles.tsx) |
| What Is the Level 6 Project Controls Professional Apprenticeship? | [WhatIsTheLevel6ProjectControlsProfessionalApprenticeship.tsx](components/WhatIsTheLevel6ProjectControlsProfessionalApprenticeship.tsx) | Page-local |
| Employer Value | [EmployerValue.tsx](components/EmployerValue.tsx) | Page-local |
| Funding: Funding Subject to Eligibility | [FundingFundingSubjectToEligibility.tsx](components/FundingFundingSubjectToEligibility.tsx) | Page-local |
| Next Steps | [NextSteps.tsx](components/NextSteps.tsx) | Page-local |
| Professional Recognition and APM ChPP Readiness | [ProfessionalRecognitionAndAPMChPPReadiness.tsx](components/ProfessionalRecognitionAndAPMChPPReadiness.tsx) | Page-local |
| Programme Structure | [ProgrammeStructure.tsx](components/ProgrammeStructure.tsx) | Page-local |
| What Makes This Different from a Normal Project Management Qualification? | [WhatMakesThisDifferentFromANormalProjectManagementQualification.tsx](components/WhatMakesThisDifferentFromANormalProjectManagementQualification.tsx) | Page-local |
| Who Is This For? | [WhoIsThisFor.tsx](components/WhoIsThisFor.tsx) | Page-local |

Section copy, repeated items and configuration:

- [sectionData.ts](sectionData.ts)

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
