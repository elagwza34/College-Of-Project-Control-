# contact sections

Composition: [page.tsx](page.tsx). Routes: `/contact`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| Before You Reach Out | [BeforeYouReachOut.tsx](components/BeforeYouReachOut.tsx) | Page-local |
| Contact Info Strip | [ContactInfoStrip.tsx](components/ContactInfoStrip.tsx) | Page-local |
| Find Your Next Step | [FindYourNextStep.tsx](components/FindYourNextStep.tsx) | [ContactForm.tsx](../../components/feature/ContactForm.tsx) |
| Get In Touch | [GetInTouch.tsx](components/GetInTouch.tsx) | [TestimonialSubmission.tsx](../../components/feature/TestimonialSubmission.tsx) |

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
