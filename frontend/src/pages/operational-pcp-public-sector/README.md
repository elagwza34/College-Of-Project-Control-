# operational-pcp-public-sector sections

Composition: [page.tsx](page.tsx). Routes: `/project-controls-professional/public-sector-councils-route`, `/operational-pcp-public-sector`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| Apprenticeship Funding | [ApprenticeshipFunding.tsx](components/ApprenticeshipFunding.tsx) | Page-local |
| Career Development | [CareerDevelopment.tsx](components/CareerDevelopment.tsx) | Page-local |
| Career Progression | [CareerProgression.tsx](components/CareerProgression.tsx) | Page-local |
| Develop Accountable Project Capability | [DevelopAccountableProjectCapability.tsx](components/DevelopAccountableProjectCapability.tsx) | Page-local |
| Employer Journey | [EmployerJourney.tsx](components/EmployerJourney.tsx) | Page-local |
| Employer Questions | [EmployerQuestions.tsx](components/EmployerQuestions.tsx) | Page-local |
| Illustrative Public Sector Application | [IllustrativePublicSectorApplication.tsx](components/IllustrativePublicSectorApplication.tsx) | Page-local |
| Learning Grounded In Government Delivery | [LearningGroundedInGovernmentDelivery.tsx](components/LearningGroundedInGovernmentDelivery.tsx) | Page-local |
| Public Sector | [PublicSector.tsx](components/PublicSector.tsx) | Page-local |
| Role To Programme Pathway | [RoleToProgrammePathway.tsx](components/RoleToProgrammePathway.tsx) | [SectorPathwayChoice.tsx](../../components/feature/SectorPathwayChoice.tsx) |
| The Project Controls Capability Model | [TheProjectControlsCapabilityModel.tsx](components/TheProjectControlsCapabilityModel.tsx) | Page-local |
| Why Public Sector Delivery Is Different | [WhyPublicSectorDeliveryIsDifferent.tsx](components/WhyPublicSectorDeliveryIsDifferent.tsx) | Page-local |

Section copy, repeated items and configuration:

- [sectorData.ts](sectorData.ts)

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
