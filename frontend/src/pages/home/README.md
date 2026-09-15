# home sections

Composition: [page.tsx](page.tsx). Routes: `/`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| Coaching and support | [CoachingAndSupport.tsx](components/CoachingAndSupport.tsx) | [CoachingSupport.tsx](../../components/feature/CoachingSupport.tsx) |
| College Of Project Controls And Management | [CollegeOfProjectControlsAndManagement.tsx](components/CollegeOfProjectControlsAndManagement.tsx) | Page-local |
| For Employers | [ForEmployers.tsx](components/ForEmployers.tsx) | Page-local |
| From the journal | [FromTheJournal.tsx](components/FromTheJournal.tsx) | [ArticlesSection.tsx](../../components/feature/ArticlesSection.tsx) |
| Funding eligibility and IPC support | [FundingEligibilityAndIPCSupport.tsx](components/FundingEligibilityAndIPCSupport.tsx) | Page-local |
| Apprenticeship eligibility | [ApprenticeshipEligibility.tsx](components/ApprenticeshipEligibility.tsx) | [EligibilityCheckerSection.tsx](../../components/feature/EligibilityCheckerSection.tsx) |
| Funding and costs | [FundingAndCosts.tsx](components/FundingAndCosts.tsx) | [FundingOptionsSection.tsx](../../components/feature/FundingOptionsSection.tsx) |
| Institute of Project Controls | [InstituteOfProjectControls.tsx](components/InstituteOfProjectControls.tsx) | [IpcAuthority.tsx](../../components/feature/IpcAuthority.tsx) |
| Learn from Practitioners | [LearnFromPractitioners.tsx](components/LearnFromPractitioners.tsx) | [MeetMentors.tsx](../../components/feature/MeetMentors.tsx) |
| Learn together | [LearnTogether.tsx](components/LearnTogether.tsx) | [EventsTeaser.tsx](../../components/feature/EventsTeaser.tsx) |
| Professional development and recognition | [ProfessionalDevelopmentAndRecognition.tsx](components/ProfessionalDevelopmentAndRecognition.tsx) | [ProfessionalRecognitionSection.tsx](../../components/feature/ProfessionalRecognitionSection.tsx) |
| Professional experience | [ProfessionalExperience.tsx](components/ProfessionalExperience.tsx) | [TestimonialsSection.tsx](../../components/feature/TestimonialsSection.tsx) |
| Professional pathways | [ProfessionalPathways.tsx](components/ProfessionalPathways.tsx) | [ProfessionalPathwaysSection.tsx](../../components/feature/ProfessionalPathwaysSection.tsx) |
| Professional Programmes | [ProfessionalProgrammes.tsx](components/ProfessionalProgrammes.tsx) | Page-local |
| Project Driven Sectors | [ProjectDrivenSectors.tsx](components/ProjectDrivenSectors.tsx) | Page-local |
| Specialist Modules | [SpecialistModules.tsx](components/SpecialistModules.tsx) | Page-local |
| Trusted By | [TrustedBy.tsx](components/TrustedBy.tsx) | Page-local |

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
