# articles sections

Composition: [page.tsx](page.tsx). Routes: `/articles`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| Article Results | [ArticleResults.tsx](components/ArticleResults.tsx) | [ArticleCard.tsx](../../components/feature/ArticleCard.tsx) |
| The CPCM Journal | [TheCPCMJournal.tsx](components/TheCPCMJournal.tsx) | Page-local |

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
