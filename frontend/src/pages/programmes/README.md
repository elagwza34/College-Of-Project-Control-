# programmes sections

Composition: [page.tsx](page.tsx). Routes: `/programmes`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| Choose Your Programme | [ChooseYourProgramme.tsx](components/ChooseYourProgramme.tsx) | Page-local |
| Compare Programmes | [CompareProgrammes.tsx](components/CompareProgrammes.tsx) | Page-local |
| Find Your Fit | [FindYourFit.tsx](components/FindYourFit.tsx) | Page-local |
| Flexible Professional Development | [FlexibleProfessionalDevelopment.tsx](components/FlexibleProfessionalDevelopment.tsx) | Page-local |
| For Employers | [ForEmployers.tsx](components/ForEmployers.tsx) | Page-local |
| Frequently Asked Questions | [FrequentlyAskedQuestions.tsx](components/FrequentlyAskedQuestions.tsx) | Page-local |
| Learn from Practitioners | [LearnFromPractitioners.tsx](components/LearnFromPractitioners.tsx) | [MeetMentors.tsx](../../components/feature/MeetMentors.tsx) |
| Learn together | [LearnTogether.tsx](components/LearnTogether.tsx) | [EventsTeaser.tsx](../../components/feature/EventsTeaser.tsx) |
| Professional development and recognition | [ProfessionalDevelopmentAndRecognition.tsx](components/ProfessionalDevelopmentAndRecognition.tsx) | [ProfessionalRecognitionSection.tsx](../../components/feature/ProfessionalRecognitionSection.tsx) |
| Professional Programmes | [ProfessionalProgrammes.tsx](components/ProfessionalProgrammes.tsx) | Page-local |

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
