# ipc sections

Composition: [page.tsx](page.tsx). Routes: `/institute-of-project-controls`, `/ipc`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| Build Your Professional Direction | [BuildYourProfessionalDirection.tsx](components/BuildYourProfessionalDirection.tsx) | Page-local |
| IPC Explained | [IPCExplained.tsx](components/IPCExplained.tsx) | Page-local |
| Membership | [Membership.tsx](components/Membership.tsx) | Page-local |
| Professional Journey | [ProfessionalJourney.tsx](components/ProfessionalJourney.tsx) | Page-local |
| The Capability Framework | [TheCapabilityFramework.tsx](components/TheCapabilityFramework.tsx) | Page-local |
| The Professional Home Of Project Controls | [TheProfessionalHomeOfProjectControls.tsx](components/TheProfessionalHomeOfProjectControls.tsx) | Page-local |
| Trust Bar | [TrustBar.tsx](components/TrustBar.tsx) | Page-local |
| Why IPC Matters | [WhyIPCMatters.tsx](components/WhyIPCMatters.tsx) | Page-local |

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
