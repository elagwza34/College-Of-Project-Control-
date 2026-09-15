# knowledge-hub/apm-chpp-readiness sections

Composition: [page.tsx](page.tsx). Routes: `/knowledge-hub/apm-chpp-readiness-support`, `/knowledge-hub/apm-chpp-readiness`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| APM ChPP Readiness | [APMChPPReadiness.tsx](components/APMChPPReadiness.tsx) | [ArticleIntroduction.tsx](../../../components/feature/article/ArticleIntroduction.tsx) |
| ChPP Readiness: Questions Answered Honestly | [ChPPReadinessQuestionsAnsweredHonestly.tsx](components/ChPPReadinessQuestionsAnsweredHonestly.tsx) | [PcpFaqSection.tsx](../../../components/feature/PcpFaqSection.tsx) |
| Explore APM ChPP Readiness Support | [ExploreAPMChPPReadinessSupport.tsx](components/ExploreAPMChPPReadinessSupport.tsx) | [ArticleCta.tsx](../../../components/feature/ArticleCta.tsx) |
| Honesty About Professional Recognition Matters | [HonestyAboutProfessionalRecognitionMatters.tsx](components/HonestyAboutProfessionalRecognitionMatters.tsx) | Page-local |
| KBC Compliance Note | [KBCComplianceNote.tsx](components/KBCComplianceNote.tsx) | Page-local |
| Next Steps | [NextSteps.tsx](components/NextSteps.tsx) | Page-local |
| What ChPP Readiness Support Does NOT Guarantee | [WhatChPPReadinessSupportDoesNOTGuarantee.tsx](components/WhatChPPReadinessSupportDoesNOTGuarantee.tsx) | Page-local |
| What 'ChPP Readiness Support' Means | [WhatChPPReadinessSupportMeans.tsx](components/WhatChPPReadinessSupportMeans.tsx) | Page-local |
| What Is APM ChPP? | [WhatIsAPMChPP.tsx](components/WhatIsAPMChPP.tsx) | Page-local |
| Why ChPP Readiness Matters Even Without a Guarantee | [WhyChPPReadinessMattersEvenWithoutAGuarantee.tsx](components/WhyChPPReadinessMattersEvenWithoutAGuarantee.tsx) | Page-local |
| Quick Summary | [QuickSummary.tsx](components/QuickSummary.tsx) | [QuickSummary.tsx](../../../components/feature/article/QuickSummary.tsx) |
| Related Articles | [RelatedArticlesSection.tsx](components/RelatedArticlesSection.tsx) | [RelatedArticles.tsx](../../../components/feature/RelatedArticles.tsx) |

Section copy, repeated items and configuration:

- [sectionData.ts](sectionData.ts)

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
