# about sections

Composition: [page.tsx](page.tsx). Routes: `/about`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| About CPCM | [AboutCPCM.tsx](components/AboutCPCM.tsx) | Page-local |
| How We Work | [HowWeWork.tsx](components/HowWeWork.tsx) | Page-local |
| Our Point Of View | [OurPointOfView.tsx](components/OurPointOfView.tsx) | Page-local |
| Our Specialist Focus | [OurSpecialistFocus.tsx](components/OurSpecialistFocus.tsx) | Page-local |
| Specialist capability for project-driven organisations | [SpecialistCapabilityForProjectDrivenOrganisations.tsx](components/SpecialistCapabilityForProjectDrivenOrganisations.tsx) | [CapabilityStrip.tsx](../../components/feature/CapabilityStrip.tsx) |
| Start With The Right Question | [StartWithTheRightQuestion.tsx](components/StartWithTheRightQuestion.tsx) | Page-local |
| Who CPCM Supports | [WhoCPCMSupports.tsx](components/WhoCPCMSupports.tsx) | Page-local |
| Who We Are | [WhoWeAre.tsx](components/WhoWeAre.tsx) | Page-local |

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
