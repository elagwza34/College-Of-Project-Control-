# faq sections

Composition: [page.tsx](page.tsx). Routes: `/faq`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| Browse By Topic | [BrowseByTopic.tsx](components/BrowseByTopic.tsx) | Page-local |
| Browse by topic | [BrowseByTopicSection.tsx](components/BrowseByTopicSection.tsx) | Page-local |
| Choose a category | [ChooseACategory.tsx](components/ChooseACategory.tsx) | Page-local |
| Help Centre | [HelpCentre.tsx](components/HelpCentre.tsx) | [EditorialPageHero.tsx](../../components/feature/EditorialPageHero.tsx) |
| Need A Specific Answer | [NeedASpecificAnswer.tsx](components/NeedASpecificAnswer.tsx) | Page-local |

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
