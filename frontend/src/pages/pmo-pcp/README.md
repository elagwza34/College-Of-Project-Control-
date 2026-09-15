# pmo-pcp sections

Composition: [page.tsx](page.tsx). Routes: `/project-controls-professional/pmo-governance-route`, `/pmo-pcp`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| Apm Recognition | [ApmRecognition.tsx](components/ApmRecognition.tsx) | Page-local |
| Apply Stronger PMO Practice | [ApplyStrongerPMOPractice.tsx](components/ApplyStrongerPMOPractice.tsx) | [OutcomeExamples.tsx](../../components/feature/OutcomeExamples.tsx) |
| Apprenticeship Route | [ApprenticeshipRoute.tsx](components/ApprenticeshipRoute.tsx) | Page-local |
| A Workplace Development Journey Not Just A Course | [AWorkplaceDevelopmentJourneyNotJustACourse.tsx](components/AWorkplaceDevelopmentJourneyNotJustACourse.tsx) | Page-local |
| Develop PMO Capability Inside Your Organisation | [DevelopPMOCapabilityInsideYourOrganisation.tsx](components/DevelopPMOCapabilityInsideYourOrganisation.tsx) | Page-local |
| Discuss The PMO Capability Your Team Needs | [DiscussThePMOCapabilityYourTeamNeeds.tsx](components/DiscussThePMOCapabilityYourTeamNeeds.tsx) | Page-local |
| Footer Landscape | [FooterLandscape.tsx](components/FooterLandscape.tsx) | Page-local |
| Four Capabilities One Route To APMO That Leaders Trust | [FourCapabilitiesOneRouteToAPMOThatLeadersTrust.tsx](components/FourCapabilitiesOneRouteToAPMOThatLeadersTrust.tsx) | Page-local |
| Four Capabilities To Help Your PMO Become Trusted | [FourCapabilitiesToHelpYourPMOBecomeTrusted.tsx](components/FourCapabilitiesToHelpYourPMOBecomeTrusted.tsx) | Page-local |
| Funding eligibility and IPC support | [FundingEligibilityAndIPCSupport.tsx](components/FundingEligibilityAndIPCSupport.tsx) | Page-local |
| Apprenticeship eligibility | [ApprenticeshipEligibility.tsx](components/ApprenticeshipEligibility.tsx) | [EligibilityCheckerSection.tsx](../../components/feature/EligibilityCheckerSection.tsx) |
| Funding and costs | [FundingAndCosts.tsx](components/FundingAndCosts.tsx) | [FundingOptionsSection.tsx](../../components/feature/FundingOptionsSection.tsx) |
| Institute of Project Controls | [InstituteOfProjectControls.tsx](components/InstituteOfProjectControls.tsx) | [IpcAuthority.tsx](../../components/feature/IpcAuthority.tsx) |
| Get Direction For Stronger PMO Capability | [GetDirectionForStrongerPMOCapability.tsx](components/GetDirectionForStrongerPMOCapability.tsx) | Page-local |
| It Is Time To Stop Asking PM Os Only For Reports | [ItIsTimeToStopAskingPMOsOnlyForReports.tsx](components/ItIsTimeToStopAskingPMOsOnlyForReports.tsx) | Page-local |
| Learn from Practitioners | [LearnFromPractitioners.tsx](components/LearnFromPractitioners.tsx) | [MeetMentors.tsx](../../components/feature/MeetMentors.tsx) |
| Learn together | [LearnTogether.tsx](components/LearnTogether.tsx) | [EventsTeaser.tsx](../../components/feature/EventsTeaser.tsx) |
| Pmo Editorial Navbar | [PmoEditorialNavbar.tsx](components/PmoEditorialNavbar.tsx) | [PageSectionNav.tsx](../../components/feature/PageSectionNav.tsx) |
| PMOINSIGHTS | [PMOINSIGHTS.tsx](components/PMOINSIGHTS.tsx) | Page-local |
| Project Controls Professional Level6 | [ProjectControlsProfessionalLevel6.tsx](components/ProjectControlsProfessionalLevel6.tsx) | Page-local |
| Request Consultation Cta | [RequestConsultationCta.tsx](components/RequestConsultationCta.tsx) | Page-local |
| RouteFaq | [RouteFaqSection.tsx](components/RouteFaqSection.tsx) | [RouteFaq.tsx](../../components/feature/RouteLanding/RouteFaq.tsx) |
| Sticky Cta | [StickyCta.tsx](components/StickyCta.tsx) | [StickyProgrammeCta.tsx](../../components/feature/StickyProgrammeCta.tsx) |
| Trust Strip | [TrustStrip.tsx](components/TrustStrip.tsx) | Page-local |
| Want The PMO Route Without Apprenticeship Paperwork | [WantThePMORouteWithoutApprenticeshipPaperwork.tsx](components/WantThePMORouteWithoutApprenticeshipPaperwork.tsx) | Page-local |

Section copy, repeated items and configuration:

- [sectionData.ts](sectionData.ts)

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
