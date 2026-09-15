# legal/terms sections

Composition: [page.tsx](page.tsx). Routes: `/terms`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| Contact | [Contact.tsx](components/Contact.tsx) | [PolicyClause.tsx](../components/PolicyClause.tsx) |
| External services | [ExternalServices.tsx](components/ExternalServices.tsx) | [PolicyClause.tsx](../components/PolicyClause.tsx) |
| Funding statements | [FundingStatements.tsx](components/FundingStatements.tsx) | [PolicyClause.tsx](../components/PolicyClause.tsx) |
| Information, not an offer | [InformationNotAnOffer.tsx](components/InformationNotAnOffer.tsx) | [PolicyClause.tsx](../components/PolicyClause.tsx) |
| Intellectual property | [IntellectualProperty.tsx](components/IntellectualProperty.tsx) | [PolicyClause.tsx](../components/PolicyClause.tsx) |
| Website use | [WebsiteUse.tsx](components/WebsiteUse.tsx) | [PageIntroduction.tsx](../components/PageIntroduction.tsx) |

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
