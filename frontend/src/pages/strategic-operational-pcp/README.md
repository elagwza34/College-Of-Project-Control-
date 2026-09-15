# strategic-operational-pcp sections

Composition: [page.tsx](page.tsx). Routes: `/project-controls-professional/strategic-operational-route`, `/strategic-operational-pcp`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| Choose the Right Access Route | [ChooseTheRightAccessRoute.tsx](components/ChooseTheRightAccessRoute.tsx) | [RouteChoose.tsx](../../components/feature/RouteLanding/RouteChoose.tsx) |
| Combined Capabilities Learners Develop | [CombinedCapabilitiesLearnersDevelop.tsx](components/CombinedCapabilitiesLearnersDevelop.tsx) | [RouteDevelop.tsx](../../components/feature/RouteLanding/RouteDevelop.tsx) |
| Combined Capability | [CombinedCapability.tsx](components/CombinedCapability.tsx) | [RouteCapability.tsx](../../components/feature/RouteLanding/RouteCapability.tsx) |
| Combined Value | [CombinedValue.tsx](components/CombinedValue.tsx) | [RouteStats.tsx](../../components/feature/RouteLanding/RouteStats.tsx) |
| Compliance Note | [ComplianceNote.tsx](components/ComplianceNote.tsx) | Page-local |
| From Project Controls to Programme Leadership | [FromProjectControlsToProgrammeLeadership.tsx](components/FromProjectControlsToProgrammeLeadership.tsx) | [RouteProcess.tsx](../../components/feature/RouteLanding/RouteProcess.tsx) |
| Funding Subject to Eligibility | [FundingSubjectToEligibility.tsx](components/FundingSubjectToEligibility.tsx) | [RouteHero.tsx](../../components/feature/RouteLanding/RouteHero.tsx) |
| Learn together | [LearnTogether.tsx](components/LearnTogether.tsx) | [EventsTeaser.tsx](../../components/feature/EventsTeaser.tsx) |
| Ready to Build Complete Project Controls Capability? | [ReadyToBuildCompleteProjectControlsCapability.tsx](components/ReadyToBuildCompleteProjectControlsCapability.tsx) | [RouteFinalCta.tsx](../../components/feature/RouteLanding/RouteFinalCta.tsx) |
| Request Consultation Cta | [RequestConsultationCta.tsx](components/RequestConsultationCta.tsx) | Page-local |
| RouteNavbar | [RouteNavbarSection.tsx](components/RouteNavbarSection.tsx) | [RouteNavbar.tsx](../../components/feature/RouteLanding/RouteNavbar.tsx) |
| Strategic + Operational PCP Route FAQs | [StrategicOperationalPCPRouteFAQs.tsx](components/StrategicOperationalPCPRouteFAQs.tsx) | [RouteFaq.tsx](../../components/feature/RouteLanding/RouteFaq.tsx) |
| What you could apply at work | [WhatYouCouldApplyAtWork.tsx](components/WhatYouCouldApplyAtWork.tsx) | [RouteTestimonials.tsx](../../components/feature/RouteLanding/RouteTestimonials.tsx) |
| Who Should Choose the Strategic + Operational Route? | [WhoShouldChooseTheStrategicOperationalRoute.tsx](components/WhoShouldChooseTheStrategicOperationalRoute.tsx) | [RouteWhoFor.tsx](../../components/feature/RouteLanding/RouteWhoFor.tsx) |
| Why This Route | [WhyThisRoute.tsx](components/WhyThisRoute.tsx) | [RouteProblems.tsx](../../components/feature/RouteLanding/RouteProblems.tsx) |

Section copy, repeated items and configuration:

- [routeData.ts](routeData.ts)

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
