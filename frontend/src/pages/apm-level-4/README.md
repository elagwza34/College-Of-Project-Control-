# apm-level-4 sections

Composition: [page.tsx](page.tsx). Routes: `/associate-project-manager-level-4`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| Sticky Cta | [StickyCta.tsx](components/StickyCta.tsx) | [StickyProgrammeCta.tsx](../../components/feature/StickyProgrammeCta.tsx) |
| Build Capability That Transfers Directly To Your Role | [BuildCapabilityThatTransfersDirectlyToYourRole.tsx](components/BuildCapabilityThatTransfersDirectlyToYourRole.tsx) | Page-local |
| Coaching and support | [CoachingAndSupport.tsx](components/CoachingAndSupport.tsx) | [CoachingSupport.tsx](../../components/feature/CoachingSupport.tsx) |
| For Employers | [ForEmployers.tsx](components/ForEmployers.tsx) | Page-local |
| Frequently Asked Questions | [FrequentlyAskedQuestions.tsx](components/FrequentlyAskedQuestions.tsx) | Page-local |
| Funding eligibility and IPC support | [FundingEligibilityAndIPCSupport.tsx](components/FundingEligibilityAndIPCSupport.tsx) | Page-local |
| Apprenticeship eligibility | [ApprenticeshipEligibility.tsx](components/ApprenticeshipEligibility.tsx) | [EligibilityCheckerSection.tsx](../../components/feature/EligibilityCheckerSection.tsx) |
| Funding and costs | [FundingAndCosts.tsx](components/FundingAndCosts.tsx) | [FundingOptionsSection.tsx](../../components/feature/FundingOptionsSection.tsx) |
| Institute of Project Controls | [InstituteOfProjectControls.tsx](components/InstituteOfProjectControls.tsx) | [IpcAuthority.tsx](../../components/feature/IpcAuthority.tsx) |
| How You Learn | [HowYouLearn.tsx](components/HowYouLearn.tsx) | Page-local |
| Key Programme Facts | [KeyProgrammeFacts.tsx](components/KeyProgrammeFacts.tsx) | Page-local |
| Learn By Building | [LearnByBuilding.tsx](components/LearnByBuilding.tsx) | Page-local |
| Learn from Practitioners | [LearnFromPractitioners.tsx](components/LearnFromPractitioners.tsx) | [MeetMentors.tsx](../../components/feature/MeetMentors.tsx) |
| Level4 Work Based Apprenticeship | [Level4WorkBasedApprenticeship.tsx](components/Level4WorkBasedApprenticeship.tsx) | Page-local |
| Professional Development | [ProfessionalDevelopment.tsx](components/ProfessionalDevelopment.tsx) | Page-local |
| Trust And Relevance | [TrustAndRelevance.tsx](components/TrustAndRelevance.tsx) | Page-local |
| Weekly Commitment | [WeeklyCommitment.tsx](components/WeeklyCommitment.tsx) | Page-local |
| What You Will Learn | [WhatYouWillLearn.tsx](components/WhatYouWillLearn.tsx) | Page-local |
| Who Should Apply | [WhoShouldApply.tsx](components/WhoShouldApply.tsx) | Page-local |
| Your12 Month Development Journey | [Your12MonthDevelopmentJourney.tsx](components/Your12MonthDevelopmentJourney.tsx) | Page-local |
| Your Next Step | [YourNextStep.tsx](components/YourNextStep.tsx) | Page-local |

Section copy, repeated items and configuration:

- [programmeData.ts](programmeData.ts)
- [sectionData.ts](sectionData.ts)

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
