# project-controls-professional-operational-route sections

Composition: [page.tsx](page.tsx). Route: `/project-controls-professional/operational-route`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| Capability Themes | [CapabilityThemes.tsx](components/CapabilityThemes.tsx) | Page-local |
| Eligibility Criteria | [EligibilityCriteria.tsx](components/EligibilityCriteria.tsx) | Page-local |
| Employer Responsibilities | [EmployerResponsibilities.tsx](components/EmployerResponsibilities.tsx) | Page-local |
| Funding Scenarios For202627 Starts | [FundingScenariosFor202627Starts.tsx](components/FundingScenariosFor202627Starts.tsx) | Page-local |
| Gateway And EPA | [GatewayAndEPA.tsx](components/GatewayAndEPA.tsx) | Page-local |
| Operational Pathway Quick Enquiry | [OperationalPathwayQuickEnquiry.tsx](components/OperationalPathwayQuickEnquiry.tsx) | Page-local |
| Professional Artefacts | [ProfessionalArtefacts.tsx](components/ProfessionalArtefacts.tsx) | Page-local |
| Section202627 Learner And Employer Pathway | [Section202627LearnerAndEmployerPathway.tsx](components/Section202627LearnerAndEmployerPathway.tsx) | Page-local |
| Select Six Credits | [SelectSixCredits.tsx](components/SelectSixCredits.tsx) | Page-local |
| Core credit AI in Project Controls | [CoreCreditAIInProjectControls.tsx](components/CoreCreditAIInProjectControls.tsx) | Page-local |
| Core credit PMP preparation | [CoreCreditPMPPreparation.tsx](components/CoreCreditPMPPreparation.tsx) | Page-local |
| Core credit Project Planning and Control | [CoreCreditProjectPlanningAndControl.tsx](components/CoreCreditProjectPlanningAndControl.tsx) | Page-local |
| Specialist elective APM Risk Management | [SpecialistElectiveAPMRiskManagement.tsx](components/SpecialistElectiveAPMRiskManagement.tsx) | Page-local |
| Specialist elective Earned Value Management | [SpecialistElectiveEarnedValueManagement.tsx](components/SpecialistElectiveEarnedValueManagement.tsx) | Page-local |
| Specialist elective PMI Scheduling Professional | [SpecialistElectivePMISchedulingProfessional.tsx](components/SpecialistElectivePMISchedulingProfessional.tsx) | Page-local |
| Take The Next Step | [TakeTheNextStep.tsx](components/TakeTheNextStep.tsx) | Page-local |
| The Operational Route | [TheOperationalRoute.tsx](components/TheOperationalRoute.tsx) | Page-local |
| Who It Is For | [WhoItIsFor.tsx](components/WhoItIsFor.tsx) | Page-local |

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
