# campaign/public-sector sections

Composition: [page.tsx](page.tsx). Routes: `/campaign/public-sector`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| Discuss Your Development Needs | [DiscussYourDevelopmentNeeds.tsx](components/DiscussYourDevelopmentNeeds.tsx) | [EnquiryForm.tsx](../../../components/feature/EnquiryForm.tsx) |
| For Councils, Local Authorities and Public Sector Programme Teams | [ForCouncilsLocalAuthoritiesAndPublicSectorProgrammeTeams.tsx](components/ForCouncilsLocalAuthoritiesAndPublicSectorProgrammeTeams.tsx) | [PcpHero.tsx](../../../components/feature/PcpHero.tsx) |
| Frequently Asked Questions | [FrequentlyAskedQuestions.tsx](components/FrequentlyAskedQuestions.tsx) | [PcpFaqSection.tsx](../../../components/feature/PcpFaqSection.tsx) |
| Funding and costs | [FundingAndCosts.tsx](components/FundingAndCosts.tsx) | [PcpFundingStrip.tsx](../../../components/feature/PcpFundingStrip.tsx) |
| Key Message | [KeyMessage.tsx](components/KeyMessage.tsx) | Page-local |
| Learn together | [LearnTogether.tsx](components/LearnTogether.tsx) | [EventsTeaser.tsx](../../../components/feature/EventsTeaser.tsx) |
| PcpComplianceNote | [PcpComplianceNoteSection.tsx](components/PcpComplianceNoteSection.tsx) | [PcpComplianceNote.tsx](../../../components/feature/PcpComplianceNote.tsx) |
| Professional Capability | [ProfessionalCapabilitySection.tsx](components/ProfessionalCapabilitySection.tsx) | [ProfessionalCapability.tsx](../../project-controls-professional-level-6/components/ProfessionalCapability.tsx) |
| Public Sector Delivery Challenges That Stronger Controls Address | [PublicSectorDeliveryChallengesThatStrongerControlsAddress.tsx](components/PublicSectorDeliveryChallengesThatStrongerControlsAddress.tsx) | [PcpPainPointsGrid.tsx](../../../components/feature/PcpPainPointsGrid.tsx) |
| Public Sector Delivery Without Controls vs Public Sector Delivery With Controls | [PublicSectorDeliveryWithoutControlsVsPublicSectorDeliveryWithControls.tsx](components/PublicSectorDeliveryWithoutControlsVsPublicSectorDeliveryWithControls.tsx) | [CampaignTransformation.tsx](../../../components/feature/CampaignTransformation.tsx) |
| Route Fit | [RouteFit.tsx](components/RouteFit.tsx) | [CampaignRouteFit.tsx](../../../components/feature/CampaignRouteFit.tsx) |
| What you could apply at work | [WhatYouCouldApplyAtWork.tsx](components/WhatYouCouldApplyAtWork.tsx) | [OutcomeExamples.tsx](../../../components/feature/OutcomeExamples.tsx) |

Section copy, repeated items and configuration:

- [campaignData.ts](campaignData.ts)

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
