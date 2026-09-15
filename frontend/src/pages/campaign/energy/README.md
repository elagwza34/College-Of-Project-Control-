# campaign/energy sections

Composition: [page.tsx](page.tsx). Routes: `/campaign/energy`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| Capital Programme Challenges Where Weak Controls Hurt Most | [CapitalProgrammeChallengesWhereWeakControlsHurtMost.tsx](components/CapitalProgrammeChallengesWhereWeakControlsHurtMost.tsx) | [PcpPainPointsGrid.tsx](../../../components/feature/PcpPainPointsGrid.tsx) |
| Capital Programmes Without Integrated Controls vs Capital Programmes With Integrated Controls | [CapitalProgrammesWithoutIntegratedControlsVsCapitalProgrammesWithIntegratedControls.tsx](components/CapitalProgrammesWithoutIntegratedControlsVsCapitalProgrammesWithIntegratedControls.tsx) | [CampaignTransformation.tsx](../../../components/feature/CampaignTransformation.tsx) |
| Discuss Your Development Needs | [DiscussYourDevelopmentNeeds.tsx](components/DiscussYourDevelopmentNeeds.tsx) | [EnquiryForm.tsx](../../../components/feature/EnquiryForm.tsx) |
| For Energy, Utilities and Capital Programme Teams | [ForEnergyUtilitiesAndCapitalProgrammeTeams.tsx](components/ForEnergyUtilitiesAndCapitalProgrammeTeams.tsx) | [PcpHero.tsx](../../../components/feature/PcpHero.tsx) |
| Frequently Asked Questions | [FrequentlyAskedQuestions.tsx](components/FrequentlyAskedQuestions.tsx) | [PcpFaqSection.tsx](../../../components/feature/PcpFaqSection.tsx) |
| Funding and costs | [FundingAndCosts.tsx](components/FundingAndCosts.tsx) | [PcpFundingStrip.tsx](../../../components/feature/PcpFundingStrip.tsx) |
| Key Message | [KeyMessage.tsx](components/KeyMessage.tsx) | Page-local |
| Learn together | [LearnTogether.tsx](components/LearnTogether.tsx) | [EventsTeaser.tsx](../../../components/feature/EventsTeaser.tsx) |
| PcpComplianceNote | [PcpComplianceNoteSection.tsx](components/PcpComplianceNoteSection.tsx) | [PcpComplianceNote.tsx](../../../components/feature/PcpComplianceNote.tsx) |
| Professional Capability | [ProfessionalCapabilitySection.tsx](components/ProfessionalCapabilitySection.tsx) | [ProfessionalCapability.tsx](../../pcp-master/components/ProfessionalCapability.tsx) |
| Route Fit | [RouteFit.tsx](components/RouteFit.tsx) | [CampaignRouteFit.tsx](../../../components/feature/CampaignRouteFit.tsx) |
| What you could apply at work | [WhatYouCouldApplyAtWork.tsx](components/WhatYouCouldApplyAtWork.tsx) | [OutcomeExamples.tsx](../../../components/feature/OutcomeExamples.tsx) |

Section copy, repeated items and configuration:

- [campaignData.ts](campaignData.ts)

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
