# apprenticeship-eligibility-checker sections

Composition: [page.tsx](page.tsx). Routes: `/apprenticeship-eligibility-checker`.

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| Apprenticeship Eligibility Checker | [ApprenticeshipEligibilityCheckerSection.tsx](components/ApprenticeshipEligibilityCheckerSection.tsx) | Page-local |
| Apprenticeship Eligibility Checker | [ApprenticeshipEligibilityChecker.tsx](components/ApprenticeshipEligibilityChecker.tsx) | Page-local |
| Frequently Asked Questions | [FrequentlyAskedQuestions.tsx](components/FrequentlyAskedQuestions.tsx) | [PcpFaqSection.tsx](../../components/feature/PcpFaqSection.tsx) |

Section copy, repeated items and configuration:

- [checkerData.ts](checkerData.ts)

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
