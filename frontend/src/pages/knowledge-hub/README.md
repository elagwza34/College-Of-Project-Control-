# knowledge-hub sections

Composition: [page.tsx](page.tsx). Routes: `/knowledge-hub`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| APM Ch PP Readiness | [APMChPPReadiness.tsx](components/APMChPPReadiness.tsx) | Page-local |
| Article Card | [ArticleCard.tsx](components/ArticleCard.tsx) | Page-local |
| Breadcrumbs | [BreadcrumbsSection.tsx](components/BreadcrumbsSection.tsx) | [Breadcrumbs.tsx](../../components/feature/Breadcrumbs.tsx) |
| Employer Decision Guides | [EmployerDecisionGuides.tsx](components/EmployerDecisionGuides.tsx) | Page-local |
| Explore By Topic | [ExploreByTopic.tsx](components/ExploreByTopic.tsx) | Page-local |
| Featured | [Featured.tsx](components/Featured.tsx) | Page-local |
| Funding Guides | [FundingGuides.tsx](components/FundingGuides.tsx) | Page-local |
| Knowledge Hub | [KnowledgeHub.tsx](components/KnowledgeHub.tsx) | [EditorialPageHero.tsx](../../components/feature/EditorialPageHero.tsx) |
| PcpComplianceNote | [PcpComplianceNoteSection.tsx](components/PcpComplianceNoteSection.tsx) | [PcpComplianceNote.tsx](../../components/feature/PcpComplianceNote.tsx) |
| Ready To Find Your Best Route | [ReadyToFindYourBestRoute.tsx](components/ReadyToFindYourBestRoute.tsx) | Page-local |
| Route Comparisons | [RouteComparisons.tsx](components/RouteComparisons.tsx) | Page-local |
| Sector Guides | [SectorGuides.tsx](components/SectorGuides.tsx) | Page-local |

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
