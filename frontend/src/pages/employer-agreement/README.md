# employer-agreement sections

Composition: [page.tsx](page.tsx). Routes: `/employer-agreement`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| Employer Agreement Form | [EmployerAgreementForm.tsx](components/EmployerAgreementForm.tsx) | Page-local |
| For Employers | [ForEmployers.tsx](components/ForEmployers.tsx) | Page-local |

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
