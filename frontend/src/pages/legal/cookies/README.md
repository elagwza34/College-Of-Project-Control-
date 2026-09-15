# legal/cookies sections

Composition: [page.tsx](page.tsx). Routes: `/cookies`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| Contact | [Contact.tsx](components/Contact.tsx) | [PolicyClause.tsx](../components/PolicyClause.tsx) |
| Essential storage | [EssentialStorage.tsx](components/EssentialStorage.tsx) | [PolicyClause.tsx](../components/PolicyClause.tsx) |
| Managing storage | [ManagingStorage.tsx](components/ManagingStorage.tsx) | [PolicyClause.tsx](../components/PolicyClause.tsx) |
| Measurement | [Measurement.tsx](components/Measurement.tsx) | [PolicyClause.tsx](../components/PolicyClause.tsx) |
| Third-party services | [ThirdPartyServices.tsx](components/ThirdPartyServices.tsx) | [PolicyClause.tsx](../components/PolicyClause.tsx) |
| Website preferences | [WebsitePreferences.tsx](components/WebsitePreferences.tsx) | [PageIntroduction.tsx](../components/PageIntroduction.tsx) |

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
