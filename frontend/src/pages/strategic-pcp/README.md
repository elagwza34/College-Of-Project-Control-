# strategic-pcp sections

Composition: [page.tsx](page.tsx). Routes: `/project-controls-professional/strategic-route`, `/strategic-pcp`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| AI In Project Controls | [AIInProjectControls.tsx](components/AIInProjectControls.tsx) | Page-local |
| Eligibility Criteria | [EligibilityCriteria.tsx](components/EligibilityCriteria.tsx) | Page-local |
| Expert Led Learning | [ExpertLedLearning.tsx](components/ExpertLedLearning.tsx) | Page-local |
| From Evidence To Action | [FromEvidenceToAction.tsx](components/FromEvidenceToAction.tsx) | Page-local |
| Funding Scenarios For Starts From1 August2026 | [FundingScenariosForStartsFrom1August2026.tsx](components/FundingScenariosForStartsFrom1August2026.tsx) | Page-local |
| How You Study | [HowYouStudy.tsx](components/HowYouStudy.tsx) | Page-local |
| PMIPMOCP Preparation And PMO Leadership | [PMIPMOCPPreparationAndPMOLeadership.tsx](components/PMIPMOCPPreparationAndPMOLeadership.tsx) | Page-local |
| PMP Exam Preparation And Strategic Project Leadership | [PMPExamPreparationAndStrategicProjectLeadership.tsx](components/PMPExamPreparationAndStrategicProjectLeadership.tsx) | Page-local |
| PRINCE2 Portfolio Management | [PRINCE2PortfolioManagement.tsx](components/PRINCE2PortfolioManagement.tsx) | Page-local |
| PRINCE2 Programme Management | [PRINCE2ProgrammeManagement.tsx](components/PRINCE2ProgrammeManagement.tsx) | Page-local |
| Programme Essentials | [ProgrammeEssentials.tsx](components/ProgrammeEssentials.tsx) | Page-local |
| Project Controls Professional Level6 | [ProjectControlsProfessionalLevel6.tsx](components/ProjectControlsProfessionalLevel6.tsx) | Page-local |
| Strategic Pathway Complete | [StrategicPathwayComplete.tsx](components/StrategicPathwayComplete.tsx) | Page-local |
| Take The Next Step | [TakeTheNextStep.tsx](components/TakeTheNextStep.tsx) | Page-local |
| Who Should Apply | [WhoShouldApply.tsx](components/WhoShouldApply.tsx) | Page-local |
| Your Credit Journey | [YourCreditJourney.tsx](components/YourCreditJourney.tsx) | Page-local |

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
