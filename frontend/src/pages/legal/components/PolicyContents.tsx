import AccessibilityKnownLimitations from '../accessibility/components/KnownLimitations';
import AccessibilityOurApproach from '../accessibility/components/OurApproach';
import AccessibilityReportAProblem from '../accessibility/components/ReportAProblem';
import AccessibilityRequestAnAlternative from '../accessibility/components/RequestAnAlternative';
import AccessibilitySupportedUse from '../accessibility/components/SupportedUse';
import CookiesContact from '../cookies/components/Contact';
import CookiesEssentialStorage from '../cookies/components/EssentialStorage';
import CookiesManagingStorage from '../cookies/components/ManagingStorage';
import CookiesMeasurement from '../cookies/components/Measurement';
import CookiesThirdPartyServices from '../cookies/components/ThirdPartyServices';
import type { LegalPageKey } from '../LegalPageData';
import PrivacyContact from '../privacy/components/Contact';
import PrivacyHowWeUseIt from '../privacy/components/HowWeUseIt';
import PrivacyInformationWeCollect from '../privacy/components/InformationWeCollect';
import PrivacyProgrammeReviews from '../privacy/components/ProgrammeReviews';
import PrivacySharingAndRetention from '../privacy/components/SharingAndRetention';
import PrivacyYourChoices from '../privacy/components/YourChoices';
import TermsContact from '../terms/components/Contact';
import TermsExternalServices from '../terms/components/ExternalServices';
import TermsFundingStatements from '../terms/components/FundingStatements';
import TermsInformationNotAnOffer from '../terms/components/InformationNotAnOffer';
import TermsIntellectualProperty from '../terms/components/IntellectualProperty';

const policySections = { privacy: [PrivacyInformationWeCollect, PrivacyHowWeUseIt, PrivacyProgrammeReviews, PrivacySharingAndRetention, PrivacyYourChoices, PrivacyContact], terms: [TermsInformationNotAnOffer, TermsFundingStatements, TermsIntellectualProperty, TermsExternalServices, TermsContact], accessibility: [AccessibilityOurApproach, AccessibilitySupportedUse, AccessibilityKnownLimitations, AccessibilityRequestAnAlternative, AccessibilityReportAProblem], cookies: [CookiesEssentialStorage, CookiesMeasurement, CookiesThirdPartyServices, CookiesManagingStorage, CookiesContact] };

export default function PolicyContents({ page }: { page: LegalPageKey }) {
  return <section className="container-site max-w-4xl py-16 md:py-24">
    <p className="mb-10 text-xs font-semibold uppercase tracking-[0.14em] text-foreground-400">Last reviewed: 31 August 2026</p>
    <div className="space-y-5">{policySections[page].map((Section, index) => <Section key={index} />)}</div>
  </section>;
}
