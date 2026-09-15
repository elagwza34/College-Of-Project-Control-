# legal/privacy sections

Composition: [page.tsx](page.tsx). Routes: `/privacy`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| Contact | [Contact.tsx](components/Contact.tsx) | [PolicyClause.tsx](../components/PolicyClause.tsx) |
| How we use it | [HowWeUseIt.tsx](components/HowWeUseIt.tsx) | [PolicyClause.tsx](../components/PolicyClause.tsx) |
| Information we collect | [InformationWeCollect.tsx](components/InformationWeCollect.tsx) | [PolicyClause.tsx](../components/PolicyClause.tsx) |
| Programme reviews | [ProgrammeReviews.tsx](components/ProgrammeReviews.tsx) | [PolicyClause.tsx](../components/PolicyClause.tsx) |
| Sharing and retention | [SharingAndRetention.tsx](components/SharingAndRetention.tsx) | [PolicyClause.tsx](../components/PolicyClause.tsx) |
| Your choices | [YourChoices.tsx](components/YourChoices.tsx) | [PolicyClause.tsx](../components/PolicyClause.tsx) |
| Your information | [YourInformation.tsx](components/YourInformation.tsx) | [PageIntroduction.tsx](../components/PageIntroduction.tsx) |

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
