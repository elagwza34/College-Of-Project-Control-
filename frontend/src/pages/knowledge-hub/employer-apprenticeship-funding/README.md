# knowledge-hub/employer-apprenticeship-funding sections

Composition: [page.tsx](page.tsx). Routes: `/knowledge-hub/employer-apprenticeship-funding`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| Check Your Organisation's Funding Eligibility | [CheckYourOrganisationsFundingEligibility.tsx](components/CheckYourOrganisationsFundingEligibility.tsx) | [ArticleCta.tsx](../../../components/feature/ArticleCta.tsx) |
| Employer Decision Guides | [EmployerDecisionGuides.tsx](components/EmployerDecisionGuides.tsx) | [ArticleIntroduction.tsx](../../../components/feature/article/ArticleIntroduction.tsx) |
| Employer Funding: Common Questions | [EmployerFundingCommonQuestions.tsx](components/EmployerFundingCommonQuestions.tsx) | [PcpFaqSection.tsx](../../../components/feature/PcpFaqSection.tsx) |
| Quick Summary | [QuickSummary.tsx](components/QuickSummary.tsx) | [QuickSummary.tsx](../../../components/feature/article/QuickSummary.tsx) |
| Related Articles | [RelatedArticlesSection.tsx](components/RelatedArticlesSection.tsx) | [RelatedArticles.tsx](../../../components/feature/RelatedArticles.tsx) |
| Step 1: Understand Your Funding Position | [Step1UnderstandYourFundingPosition.tsx](components/Step1UnderstandYourFundingPosition.tsx) | Page-local |
| Step 2: Identify Where Project Controls Capability Matters Most | [Step2IdentifyWhereProjectControlsCapabilityMattersMost.tsx](components/Step2IdentifyWhereProjectControlsCapabilityMattersMost.tsx) | Page-local |
| Step 3: Choose the Right PCP Route for Your Team | [Step3ChooseTheRightPCPRouteForYourTeam.tsx](components/Step3ChooseTheRightPCPRouteForYourTeam.tsx) | Page-local |
| Step 4: Plan Your Cohort | [Step4PlanYourCohort.tsx](components/Step4PlanYourCohort.tsx) | Page-local |
| Step 5: Make the Business Case | [Step5MakeTheBusinessCase.tsx](components/Step5MakeTheBusinessCase.tsx) | Page-local |
| Take the Next Step | [TakeTheNextStep.tsx](components/TakeTheNextStep.tsx) | Page-local |
| Use Apprenticeship Funding to Build Project Controls Capability Your Business Can Actually Measure | [UseApprenticeshipFundingToBuildProjectControlsCapabilityYourBusinessCanActuallyMeasure.tsx](components/UseApprenticeshipFundingToBuildProjectControlsCapabilityYourBusinessCanActuallyMeasure.tsx) | Page-local |

Section copy, repeated items and configuration:

- [sectionData.ts](sectionData.ts)

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
