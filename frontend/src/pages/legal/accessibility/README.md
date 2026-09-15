# legal/accessibility sections

Composition: [page.tsx](page.tsx). Routes: `/accessibility`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| Inclusive access | [InclusiveAccess.tsx](components/InclusiveAccess.tsx) | [PageIntroduction.tsx](../components/PageIntroduction.tsx) |
| Known limitations | [KnownLimitations.tsx](components/KnownLimitations.tsx) | [PolicyClause.tsx](../components/PolicyClause.tsx) |
| Our approach | [OurApproach.tsx](components/OurApproach.tsx) | [PolicyClause.tsx](../components/PolicyClause.tsx) |
| Report a problem | [ReportAProblem.tsx](components/ReportAProblem.tsx) | [PolicyClause.tsx](../components/PolicyClause.tsx) |
| Request an alternative | [RequestAnAlternative.tsx](components/RequestAnAlternative.tsx) | [PolicyClause.tsx](../components/PolicyClause.tsx) |
| Supported use | [SupportedUse.tsx](components/SupportedUse.tsx) | [PolicyClause.tsx](../components/PolicyClause.tsx) |

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
