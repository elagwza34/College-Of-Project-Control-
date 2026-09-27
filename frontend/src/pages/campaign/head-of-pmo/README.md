# campaign/head-of-pmo sections

Composition: [page.tsx](page.tsx). Routes: `/campaign/head-of-pmo`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| APM Recognised Assessment Centre | [APMRecognisedAssessmentCentre.tsx](components/APMRecognisedAssessmentCentre.tsx) | Page-local |
| Discuss Your Development Needs | [DiscussYourDevelopmentNeeds.tsx](components/DiscussYourDevelopmentNeeds.tsx) | [EnquiryForm.tsx](../../../components/feature/EnquiryForm.tsx) |
| For Heads of PMO, PMO Leads and Governance Professionals | [ForHeadsOfPMOPMOLeadsAndGovernanceProfessionals.tsx](components/ForHeadsOfPMOPMOLeadsAndGovernanceProfessionals.tsx) | [PcpHero.tsx](../../../components/feature/PcpHero.tsx) |
| Frequently Asked Questions | [FrequentlyAskedQuestions.tsx](components/FrequentlyAskedQuestions.tsx) | [PcpFaqSection.tsx](../../../components/feature/PcpFaqSection.tsx) |
| From Reporting PMO to Decision-Support PMO | [FromReportingPMOToDecisionSupportPMO.tsx](components/FromReportingPMOToDecisionSupportPMO.tsx) | [CampaignTransformation.tsx](../../../components/feature/CampaignTransformation.tsx) |
| Funding and costs | [FundingAndCosts.tsx](components/FundingAndCosts.tsx) | [PcpFundingStrip.tsx](../../../components/feature/PcpFundingStrip.tsx) |
| Learn together | [LearnTogether.tsx](components/LearnTogether.tsx) | [EventsTeaser.tsx](../../../components/feature/EventsTeaser.tsx) |
| PcpComplianceNote | [PcpComplianceNoteSection.tsx](components/PcpComplianceNoteSection.tsx) | [PcpComplianceNote.tsx](../../../components/feature/PcpComplianceNote.tsx) |
| PMO Challenges That Hold Organisations Back | [PMOChallengesThatHoldOrganisationsBack.tsx](components/PMOChallengesThatHoldOrganisationsBack.tsx) | [PcpPainPointsGrid.tsx](../../../components/feature/PcpPainPointsGrid.tsx) |
| Professional Capability | [ProfessionalCapabilitySection.tsx](components/ProfessionalCapabilitySection.tsx) | [ProfessionalCapability.tsx](../../project-controls-professional-level-6/components/ProfessionalCapability.tsx) |
| Route Fit | [RouteFit.tsx](components/RouteFit.tsx) | [CampaignRouteFit.tsx](../../../components/feature/CampaignRouteFit.tsx) |
| What you could apply at work | [WhatYouCouldApplyAtWork.tsx](components/WhatYouCouldApplyAtWork.tsx) | [OutcomeExamples.tsx](../../../components/feature/OutcomeExamples.tsx) |

Section copy, repeated items and configuration:

- [campaignData.ts](campaignData.ts)

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
