# events/detail sections

Composition: [page.tsx](page.tsx). Routes: `/events/:slug`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| About this event | [AboutThisEvent.tsx](components/AboutThisEvent.tsx) | Page-local |
| Event details | [EventDetails.tsx](components/EventDetails.tsx) | Page-local |
| Event details | [EventDetailsSection.tsx](components/EventDetailsSection.tsx) | Page-local |
| More events to explore | [MoreEventsToExplore.tsx](components/MoreEventsToExplore.tsx) | [EventsSection.tsx](../../../components/feature/EventsSection.tsx) |
| Event status (loading or unavailable) | [EventStatus.tsx](components/EventStatus.tsx) | Page-local |

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
