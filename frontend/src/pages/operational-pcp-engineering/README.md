# operational-pcp-engineering sections

Composition: [page.tsx](page.tsx). Routes: `/project-controls-professional/engineering-manufacturing-aerospace-route`, `/operational-pcp-engineering`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| Check The Right Access Route For You | [CheckTheRightAccessRouteForYou.tsx](components/CheckTheRightAccessRouteForYou.tsx) | Page-local |
| Choose your professional direction | [ChooseYourProfessionalDirection.tsx](components/ChooseYourProfessionalDirection.tsx) | [SectorPathwayChoice.tsx](../../components/feature/SectorPathwayChoice.tsx) |
| Engineering Advanced Manufacturing | [EngineeringAdvancedManufacturing.tsx](components/EngineeringAdvancedManufacturing.tsx) | Page-local |
| Engineering Project Controls Evidence | [EngineeringProjectControlsEvidence.tsx](components/EngineeringProjectControlsEvidence.tsx) | Page-local |
| Funding And Bursary Access | [FundingAndBursaryAccess.tsx](components/FundingAndBursaryAccess.tsx) | Page-local |
| Learn Apply Test And Evidence | [LearnApplyTestAndEvidence.tsx](components/LearnApplyTestAndEvidence.tsx) | Page-local |
| One Professional Foundation Across Complex Engineering Environments | [OneProfessionalFoundationAcrossComplexEngineeringEnvironments.tsx](components/OneProfessionalFoundationAcrossComplexEngineeringEnvironments.tsx) | Page-local |
| Professional Insight | [ProfessionalInsight.tsx](components/ProfessionalInsight.tsx) | Page-local |
| Project Controls That Protect Engineering Value | [ProjectControlsThatProtectEngineeringValue.tsx](components/ProjectControlsThatProtectEngineeringValue.tsx) | Page-local |
| Questions Before You Enquire | [QuestionsBeforeYouEnquire.tsx](components/QuestionsBeforeYouEnquire.tsx) | Page-local |
| Ready To Take Control | [ReadyToTakeControl.tsx](components/ReadyToTakeControl.tsx) | Page-local |
| Support Engineering Delivery Roles | [SupportEngineeringDeliveryRoles.tsx](components/SupportEngineeringDeliveryRoles.tsx) | Page-local |

Section copy, repeated items and configuration:

- [sectionData.ts](sectionData.ts)
- [sectorData.ts](sectorData.ts)

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
