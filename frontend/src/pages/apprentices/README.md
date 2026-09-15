# apprentices sections

Composition: [page.tsx](page.tsx). Routes: `/apprentices`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| Cost For Eligible Learners | [CostForEligibleLearners.tsx](components/CostForEligibleLearners.tsx) | Page-local |
| For Apprentices Professionals | [ForApprenticesProfessionals.tsx](components/ForApprenticesProfessionals.tsx) | Page-local |
| Learner Support | [LearnerSupport.tsx](components/LearnerSupport.tsx) | Page-local |
| Quick Answers | [QuickAnswers.tsx](components/QuickAnswers.tsx) | Page-local |
| Ready To Advance Your Career In Project Controls | [ReadyToAdvanceYourCareerInProjectControls.tsx](components/ReadyToAdvanceYourCareerInProjectControls.tsx) | Page-local |
| Weekly Rhythm | [WeeklyRhythm.tsx](components/WeeklyRhythm.tsx) | Page-local |
| What you could apply at work | [WhatYouCouldApplyAtWork.tsx](components/WhatYouCouldApplyAtWork.tsx) | [OutcomeExamples.tsx](../../components/feature/OutcomeExamples.tsx) |
| What You Will Gain | [WhatYouWillGain.tsx](components/WhatYouWillGain.tsx) | Page-local |
| Your Journey | [YourJourney.tsx](components/YourJourney.tsx) | Page-local |

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
