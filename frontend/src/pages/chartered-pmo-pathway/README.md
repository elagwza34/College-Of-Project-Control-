# chartered-pmo-pathway sections

Composition: [page.tsx](page.tsx). Routes: `/project-controls-professional/chartered-pmo-pathway`, `/chartered-pmo-pathway`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| APMG International Certification Context | [APMGInternationalCertificationContext.tsx](components/APMGInternationalCertificationContext.tsx) | Page-local |
| Catalogue Navigation | [CatalogueNavigation.tsx](components/CatalogueNavigation.tsx) | Page-local |
| College Specialist Development | [CollegeSpecialistDevelopment.tsx](components/CollegeSpecialistDevelopment.tsx) | Page-local |
| Eligibility Criteria | [EligibilityCriteria.tsx](components/EligibilityCriteria.tsx) | Page-local |
| Independent Professional Development Route | [IndependentProfessionalDevelopmentRoute.tsx](components/IndependentProfessionalDevelopmentRoute.tsx) | Page-local |
| Live Teaching Coaching And Workplace Application | [LiveTeachingCoachingAndWorkplaceApplication.tsx](components/LiveTeachingCoachingAndWorkplaceApplication.tsx) | Page-local |
| Occupational Assessment And Future Ch PP Application | [OccupationalAssessmentAndFutureChPPApplication.tsx](components/OccupationalAssessmentAndFutureChPPApplication.tsx) | Page-local |
| PMO Professional Development Module1 | [PMOProfessionalDevelopmentModule1.tsx](components/PMOProfessionalDevelopmentModule1.tsx) | Page-local |
| PMO Professional Development Module2 | [PMOProfessionalDevelopmentModule2.tsx](components/PMOProfessionalDevelopmentModule2.tsx) | Page-local |
| PMO Professional Development Module3 | [PMOProfessionalDevelopmentModule3.tsx](components/PMOProfessionalDevelopmentModule3.tsx) | Page-local |
| PMO Professional Development Module4 | [PMOProfessionalDevelopmentModule4.tsx](components/PMOProfessionalDevelopmentModule4.tsx) | Page-local |
| Programme Information And Next Steps | [ProgrammeInformationAndNextSteps.tsx](components/ProgrammeInformationAndNextSteps.tsx) | Page-local |
| Project Controls Professional Level6 | [ProjectControlsProfessionalLevel6.tsx](components/ProjectControlsProfessionalLevel6.tsx) | Page-local |
| Technical Knowledge Professional Practice Chartered Ambition | [TechnicalKnowledgeProfessionalPracticeCharteredAmbition.tsx](components/TechnicalKnowledgeProfessionalPracticeCharteredAmbition.tsx) | Page-local |
| The Complete ST0845 Capability Remains Mandatory | [TheCompleteST0845CapabilityRemainsMandatory.tsx](components/TheCompleteST0845CapabilityRemainsMandatory.tsx) | Page-local |
| The Professional Development Architecture | [TheProfessionalDevelopmentArchitecture.tsx](components/TheProfessionalDevelopmentArchitecture.tsx) | Page-local |
| The Technical Knowledge Development Component | [TheTechnicalKnowledgeDevelopmentComponent.tsx](components/TheTechnicalKnowledgeDevelopmentComponent.tsx) | Page-local |
| Who Should Choose The Chartered Pathway | [WhoShouldChooseTheCharteredPathway.tsx](components/WhoShouldChooseTheCharteredPathway.tsx) | Page-local |

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
