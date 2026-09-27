# project-controls-professional-level-6 sections

Composition: [page.tsx](page.tsx). Route: `/project-controls-professional-level-6`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| Sticky Cta | [StickyCta.tsx](components/StickyCta.tsx) | [StickyProgrammeCta.tsx](../../components/feature/StickyProgrammeCta.tsx) |
| Capability And Workplace Outputs | [CapabilityAndWorkplaceOutputs.tsx](components/CapabilityAndWorkplaceOutputs.tsx) | Page-local |
| Coaching and support | [CoachingAndSupport.tsx](components/CoachingAndSupport.tsx) | [CoachingSupport.tsx](../../components/feature/CoachingSupport.tsx) |
| Cohort Orientation | [CohortOrientation.tsx](components/CohortOrientation.tsx) | Page-local |
| College Of Project Controls And Project Management | [CollegeOfProjectControlsAndProjectManagement.tsx](components/CollegeOfProjectControlsAndProjectManagement.tsx) | Page-local |
| Course At A Glance | [CourseAtAGlance.tsx](components/CourseAtAGlance.tsx) | Page-local |
| Delivery And Assessment | [DeliveryAndAssessment.tsx](components/DeliveryAndAssessment.tsx) | Page-local |
| Bullets | [Bullets.tsx](components/Bullets.tsx) | Page-local |
| Employer Partnerships Across Project Driven Sectors | [EmployerPartnershipsAcrossProjectDrivenSectors.tsx](components/EmployerPartnershipsAcrossProjectDrivenSectors.tsx) | Page-local |
| Expected Workload | [ExpectedWorkload.tsx](components/ExpectedWorkload.tsx) | Page-local |
| Funding eligibility and IPC support | [FundingEligibilityAndIPCSupport.tsx](components/FundingEligibilityAndIPCSupport.tsx) | Page-local |
| Apprenticeship eligibility | [ApprenticeshipEligibility.tsx](components/ApprenticeshipEligibility.tsx) | [EligibilityCheckerSection.tsx](../../components/feature/EligibilityCheckerSection.tsx) |
| Funding and costs | [FundingAndCosts.tsx](components/FundingAndCosts.tsx) | [FundingOptionsSection.tsx](../../components/feature/FundingOptionsSection.tsx) |
| Institute of Project Controls | [InstituteOfProjectControls.tsx](components/InstituteOfProjectControls.tsx) | [IpcAuthority.tsx](../../components/feature/IpcAuthority.tsx) |
| Learn from Practitioners | [LearnFromPractitioners.tsx](components/LearnFromPractitioners.tsx) | [MeetMentors.tsx](../../components/feature/MeetMentors.tsx) |
| Next Step | [NextStep.tsx](components/NextStep.tsx) | Page-local |
| Professional pathways | [ProfessionalPathways.tsx](components/ProfessionalPathways.tsx) | [ProfessionalPathwaysSection.tsx](../../components/feature/ProfessionalPathwaysSection.tsx) |
| Programme Benefits | [ProgrammeBenefits.tsx](components/ProgrammeBenefits.tsx) | Page-local |
| Programme events & masterclasses | [ProgrammeEventsMasterclasses.tsx](components/ProgrammeEventsMasterclasses.tsx) | [EventsSection.tsx](../../components/feature/EventsSection.tsx) |
| Programme Overview | [ProgrammeOverview.tsx](components/ProgrammeOverview.tsx) | Page-local |
| Programme Structure | [ProgrammeStructure.tsx](components/ProgrammeStructure.tsx) | Page-local |
| Project Controls Professional Level 6, clearly explained | [ProjectControlsProfessionalLevel6ClearlyExplained.tsx](components/ProjectControlsProfessionalLevel6ClearlyExplained.tsx) | [PcpFaqSection.tsx](../../components/feature/PcpFaqSection.tsx) |
| Project-Driven Sectors | [ProjectDrivenSectorsSection.tsx](components/ProjectDrivenSectorsSection.tsx) | [ProjectDrivenSectors.tsx](../home/components/ProjectDrivenSectors.tsx) |
| Register Your Interest | [RegisterYourInterest.tsx](components/RegisterYourInterest.tsx) | Page-local |
| Who Should Apply | [WhoShouldApply.tsx](components/WhoShouldApply.tsx) | Page-local |
| Professional Capability | [ProfessionalCapability.tsx](components/ProfessionalCapability.tsx) | Page-local |

Section copy, repeated items and configuration:

- [programmeData.ts](programmeData.ts)
- [sectionData.ts](sectionData.ts)

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
