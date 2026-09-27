# campaign/commercial-route sections

Composition: [page.tsx](page.tsx). Routes: `/commercial-project-controls-route`, `/campaign/commercial-route`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| Commercial access for non-eligible learners | [CommercialAccessForNonEligibleLearners.tsx](components/CommercialAccessForNonEligibleLearners.tsx) | [PcpHero.tsx](../../../components/feature/PcpHero.tsx) |
| Commercial Route | [CommercialRoute.tsx](components/CommercialRoute.tsx) | Page-local |
| Frequently Asked Questions | [FrequentlyAskedQuestions.tsx](components/FrequentlyAskedQuestions.tsx) | [PcpFaqSection.tsx](../../../components/feature/PcpFaqSection.tsx) |
| Funding and costs | [FundingAndCosts.tsx](components/FundingAndCosts.tsx) | [PcpFundingStrip.tsx](../../../components/feature/PcpFundingStrip.tsx) |
| Institute of Project Controls | [InstituteOfProjectControls.tsx](components/InstituteOfProjectControls.tsx) | [IpcAuthority.tsx](../../../components/feature/IpcAuthority.tsx) |
| Professional Capability | [ProfessionalCapabilitySection.tsx](components/ProfessionalCapabilitySection.tsx) | [ProfessionalCapability.tsx](../../project-controls-professional-level-6/components/ProfessionalCapability.tsx) |
| Professional Recognition | [ProfessionalRecognition.tsx](components/ProfessionalRecognition.tsx) | Page-local |
| Route Fit | [RouteFit.tsx](components/RouteFit.tsx) | [CampaignRouteFit.tsx](../../../components/feature/CampaignRouteFit.tsx) |
| What you could apply at work | [WhatYouCouldApplyAtWork.tsx](components/WhatYouCouldApplyAtWork.tsx) | [OutcomeExamples.tsx](../../../components/feature/OutcomeExamples.tsx) |
| Without Access vs With the Commercial Route | [WithoutAccessVsWithTheCommercialRoute.tsx](components/WithoutAccessVsWithTheCommercialRoute.tsx) | [CampaignTransformation.tsx](../../../components/feature/CampaignTransformation.tsx) |

Section copy, repeated items and configuration:

- [campaignData.ts](campaignData.ts)

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
