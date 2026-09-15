# employers sections

Composition: [page.tsx](page.tsx). Routes: `/employers`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| Apprenticeship Funding | [ApprenticeshipFunding.tsx](components/ApprenticeshipFunding.tsx) | Page-local |
| Card Grid | [CardGrid.tsx](components/CardGrid.tsx) | Page-local |
| A Real Partnership | [ARealPartnership.tsx](components/ARealPartnership.tsx) | Page-local |
| Built For Project Driven Organisations | [BuiltForProjectDrivenOrganisations.tsx](components/BuiltForProjectDrivenOrganisations.tsx) | Page-local |
| Capability Planning | [CapabilityPlanning.tsx](components/CapabilityPlanning.tsx) | Page-local |
| Employer Resources | [EmployerResources.tsx](components/EmployerResources.tsx) | Page-local |
| Example Scenarios | [ExampleScenarios.tsx](components/ExampleScenarios.tsx) | Page-local |
| How The Partnership Works | [HowThePartnershipWorks.tsx](components/HowThePartnershipWorks.tsx) | Page-local |
| Learning Applied At Work | [LearningAppliedAtWork.tsx](components/LearningAppliedAtWork.tsx) | Page-local |
| Progress You Can See | [ProgressYouCanSee.tsx](components/ProgressYouCanSee.tsx) | Page-local |
| Project Controls Employer Partnerships | [ProjectControlsEmployerPartnerships.tsx](components/ProjectControlsEmployerPartnerships.tsx) | Page-local |
| Project Controls Pathways | [ProjectControlsPathways.tsx](components/ProjectControlsPathways.tsx) | Page-local |
| Questions Employers Usually Ask Before Starting | [QuestionsEmployersUsuallyAskBeforeStarting.tsx](components/QuestionsEmployersUsuallyAskBeforeStarting.tsx) | Page-local |
| Start With The Business Need | [StartWithTheBusinessNeed.tsx](components/StartWithTheBusinessNeed.tsx) | Page-local |
| Start With Your Need | [StartWithYourNeed.tsx](components/StartWithYourNeed.tsx) | Page-local |
| Why Work With KBC | [WhyWorkWithKBC.tsx](components/WhyWorkWithKBC.tsx) | Page-local |

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
