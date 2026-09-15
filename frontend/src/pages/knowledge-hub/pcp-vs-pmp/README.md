# knowledge-hub/pcp-vs-pmp sections

Composition: [page.tsx](page.tsx). Routes: `/knowledge-hub/project-controls-level-6-vs-pmp`, `/knowledge-hub/pcp-vs-pmp`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| Not Sure Which Route Fits You? | [NotSureWhichRouteFitsYou.tsx](components/NotSureWhichRouteFitsYou.tsx) | [ArticleCta.tsx](../../../components/feature/ArticleCta.tsx) |
| PCP vs PMP: Common Questions | [PCPVsPMPCommonQuestions.tsx](components/PCPVsPMPCommonQuestions.tsx) | [PcpFaqSection.tsx](../../../components/feature/PcpFaqSection.tsx) |
| Quick Summary | [QuickSummary.tsx](components/QuickSummary.tsx) | [QuickSummary.tsx](../../../components/feature/article/QuickSummary.tsx) |
| Related Articles | [RelatedArticlesSection.tsx](components/RelatedArticlesSection.tsx) | [RelatedArticles.tsx](../../../components/feature/RelatedArticles.tsx) |
| Route Comparisons | [RouteComparisons.tsx](components/RouteComparisons.tsx) | [ArticleIntroduction.tsx](../../../components/feature/article/ArticleIntroduction.tsx) |
| Two Different Paths. Two Different Purposes. | [TwoDifferentPathsTwoDifferentPurposes.tsx](components/TwoDifferentPathsTwoDifferentPurposes.tsx) | Page-local |
| Side-by-Side Comparison | [SideBySideComparison.tsx](components/SideBySideComparison.tsx) | Page-local |
| The Bottom Line | [TheBottomLine.tsx](components/TheBottomLine.tsx) | Page-local |
| What About the Commercial PCP Route? | [WhatAboutTheCommercialPCPRoute.tsx](components/WhatAboutTheCommercialPCPRoute.tsx) | Page-local |
| When PMP May Be the Better Choice | [WhenPMPMayBeTheBetterChoice.tsx](components/WhenPMPMayBeTheBetterChoice.tsx) | Page-local |
| When the PCP Level 6 Is the Better Choice | [WhenThePCPLevel6IsTheBetterChoice.tsx](components/WhenThePCPLevel6IsTheBetterChoice.tsx) | Page-local |

Section copy, repeated items and configuration:

- [sectionData.ts](sectionData.ts)

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
