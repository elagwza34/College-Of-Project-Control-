# legal sections

Composition: [LegalPage.tsx](LegalPage.tsx).

Find the label on the page, then open its component below. Shared implementation links are provided where a section is reused. Data and API calls retain their existing ownership.

| Label / heading | Component | Shared implementation |
| --- | --- | --- |
| Policy Contents | [PolicyContents.tsx](components/PolicyContents.tsx) | Page-local |
| Known limitations | [KnownLimitations.tsx](accessibility/components/KnownLimitations.tsx) | Page-local |
| Policy Clause | [PolicyClause.tsx](components/PolicyClause.tsx) | Page-local |
| Our approach | [OurApproach.tsx](accessibility/components/OurApproach.tsx) | Page-local |
| Report a problem | [ReportAProblem.tsx](accessibility/components/ReportAProblem.tsx) | Page-local |
| Request an alternative | [RequestAnAlternative.tsx](accessibility/components/RequestAnAlternative.tsx) | Page-local |
| Supported use | [SupportedUse.tsx](accessibility/components/SupportedUse.tsx) | Page-local |
| Contact | [Contact.tsx](cookies/components/Contact.tsx) | Page-local |
| Essential storage | [EssentialStorage.tsx](cookies/components/EssentialStorage.tsx) | Page-local |
| Managing storage | [ManagingStorage.tsx](cookies/components/ManagingStorage.tsx) | Page-local |
| Measurement | [Measurement.tsx](cookies/components/Measurement.tsx) | Page-local |
| Third-party services | [ThirdPartyServices.tsx](cookies/components/ThirdPartyServices.tsx) | Page-local |
| Contact | [Contact.tsx](privacy/components/Contact.tsx) | Page-local |
| How we use it | [HowWeUseIt.tsx](privacy/components/HowWeUseIt.tsx) | Page-local |
| Information we collect | [InformationWeCollect.tsx](privacy/components/InformationWeCollect.tsx) | Page-local |
| Programme reviews | [ProgrammeReviews.tsx](privacy/components/ProgrammeReviews.tsx) | Page-local |
| Sharing and retention | [SharingAndRetention.tsx](privacy/components/SharingAndRetention.tsx) | Page-local |
| Your choices | [YourChoices.tsx](privacy/components/YourChoices.tsx) | Page-local |
| Contact | [Contact.tsx](terms/components/Contact.tsx) | Page-local |
| External services | [ExternalServices.tsx](terms/components/ExternalServices.tsx) | Page-local |
| Funding statements | [FundingStatements.tsx](terms/components/FundingStatements.tsx) | Page-local |
| Information, not an offer | [InformationNotAnOffer.tsx](terms/components/InformationNotAnOffer.tsx) | Page-local |
| Intellectual property | [IntellectualProperty.tsx](terms/components/IntellectualProperty.tsx) | Page-local |
| Policy Introduction | [PolicyIntroduction.tsx](components/PolicyIntroduction.tsx) | Page-local |
| Inclusive access | [InclusiveAccess.tsx](accessibility/components/InclusiveAccess.tsx) | Page-local |
| Page introduction | [PageIntroduction.tsx](components/PageIntroduction.tsx) | Page-local |
| Website preferences | [WebsitePreferences.tsx](cookies/components/WebsitePreferences.tsx) | Page-local |
| Your information | [YourInformation.tsx](privacy/components/YourInformation.tsx) | Page-local |
| Website use | [WebsiteUse.tsx](terms/components/WebsiteUse.tsx) | Page-local |

Section copy, repeated items and configuration:

- [LegalPageData.ts](LegalPageData.ts)

Keep `page.tsx` focused on section order and page state. Add new page-specific sections to `components/`, use the visible label for the filename, and update imports when renaming. Shared navigation and the footer remain in `src/components/feature/`.
