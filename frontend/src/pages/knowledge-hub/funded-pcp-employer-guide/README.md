# knowledge-hub/funded-pcp-employer-guide sections

Composition: [page.tsx](page.tsx). Routes: `/knowledge-hub/fully-funded-project-controls-apprenticeship`, `/knowledge-hub/funded-pcp-employer-guide`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| Check Your Organisation's Funding Eligibility | [CheckYourOrganisationsFundingEligibility.tsx](components/CheckYourOrganisationsFundingEligibility.tsx) | [ArticleCta.tsx](../../../components/feature/ArticleCta.tsx) |
| Funding Guides | [FundingGuides.tsx](components/FundingGuides.tsx) | [ArticleIntroduction.tsx](../../../components/feature/article/ArticleIntroduction.tsx) |
| Funding Questions Employers Ask | [FundingQuestionsEmployersAsk.tsx](components/FundingQuestionsEmployersAsk.tsx) | [PcpFaqSection.tsx](../../../components/feature/PcpFaqSection.tsx) |
| Quick Summary | [QuickSummary.tsx](components/QuickSummary.tsx) | [QuickSummary.tsx](../../../components/feature/article/QuickSummary.tsx) |
| Related Articles | [RelatedArticlesSection.tsx](components/RelatedArticlesSection.tsx) | [RelatedArticles.tsx](../../../components/feature/RelatedArticles.tsx) |
| Use Apprenticeship Funding to Build Project Controls Capability Your Business Can Actually Measure | [UseApprenticeshipFundingToBuildProjectControlsCapabilityYourBusinessCanActuallyMeasure.tsx](components/UseApprenticeshipFundingToBuildProjectControlsCapabilityYourBusinessCanActuallyMeasure.tsx) | Page-local |
| Download the Employer Guide | [DownloadTheEmployerGuide.tsx](components/DownloadTheEmployerGuide.tsx) | Page-local |
| Employer Eligibility | [EmployerEligibility.tsx](components/EmployerEligibility.tsx) | Page-local |
| How Apprenticeship Funding Works | [HowApprenticeshipFundingWorks.tsx](components/HowApprenticeshipFundingWorks.tsx) | Page-local |
| Making the Business Case | [MakingTheBusinessCase.tsx](components/MakingTheBusinessCase.tsx) | Page-local |
| The Employer Value: What Better Project Controls Capability Saves Your Organisation | [TheEmployerValueWhatBetterProjectControlsCapabilitySavesYourOrganisation.tsx](components/TheEmployerValueWhatBetterProjectControlsCapabilitySavesYourOrganisation.tsx) | Page-local |
| What the Funding Covers | [WhatTheFundingCovers.tsx](components/WhatTheFundingCovers.tsx) | Page-local |

Section copy, repeated items and configuration:

- [sectionData.ts](sectionData.ts)

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
