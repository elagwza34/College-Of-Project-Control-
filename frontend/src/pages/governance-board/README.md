# governance-board sections

Composition: [page.tsx](page.tsx). Routes: `/governance-board`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| About The Board | [AboutTheBoard.tsx](components/AboutTheBoard.tsx) | Page-local |
| Candidate Profile | [CandidateProfile.tsx](components/CandidateProfile.tsx) | Page-local |
| Expertise Sought | [ExpertiseSought.tsx](components/ExpertiseSought.tsx) | Page-local |
| Expression Of Interest | [ExpressionOfInterest.tsx](components/ExpressionOfInterest.tsx) | Page-local |
| Governance Board | [GovernanceBoard.tsx](components/GovernanceBoard.tsx) | [EditorialPageHero.tsx](../../components/feature/EditorialPageHero.tsx) |
| Help Shape The Future Of Professional Education | [HelpShapeTheFutureOfProfessionalEducation.tsx](components/HelpShapeTheFutureOfProfessionalEducation.tsx) | Page-local |
| Our Approach | [OurApproach.tsx](components/OurApproach.tsx) | Page-local |
| Responsibilities | [Responsibilities.tsx](components/Responsibilities.tsx) | Page-local |
| Time Commitment | [TimeCommitment.tsx](components/TimeCommitment.tsx) | Page-local |
| Why Join | [WhyJoin.tsx](components/WhyJoin.tsx) | Page-local |

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
