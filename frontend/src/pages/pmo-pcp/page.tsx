import Footer from '@/components/feature/Footer';
import SchemaOrg, { courseSchema, faqPageSchema } from '@/components/feature/SchemaOrg';
import ApmRecognition from './components/ApmRecognition';
import ApplyStrongerPMOPractice from "./components/ApplyStrongerPMOPractice";
import ApprenticeshipRoute from "./components/ApprenticeshipRoute";
import AWorkplaceDevelopmentJourneyNotJustACourse from "./components/AWorkplaceDevelopmentJourneyNotJustACourse";
import DevelopPMOCapabilityInsideYourOrganisation from "./components/DevelopPMOCapabilityInsideYourOrganisation";
import DiscussThePMOCapabilityYourTeamNeeds from "./components/DiscussThePMOCapabilityYourTeamNeeds";
import FooterLandscape from './components/FooterLandscape';
import FourCapabilitiesOneRouteToAPMOThatLeadersTrust from "./components/FourCapabilitiesOneRouteToAPMOThatLeadersTrust";
import FourCapabilitiesToHelpYourPMOBecomeTrusted from "./components/FourCapabilitiesToHelpYourPMOBecomeTrusted";
import FundingEligibilityAndIPCSupport from "./components/FundingEligibilityAndIPCSupport";
import GetDirectionForStrongerPMOCapability from "./components/GetDirectionForStrongerPMOCapability";
import ItIsTimeToStopAskingPMOsOnlyForReports from "./components/ItIsTimeToStopAskingPMOsOnlyForReports";
import LearnFromPractitioners from "./components/LearnFromPractitioners";
import LearnTogether from "./components/LearnTogether";
import PmoEditorialNavbar from './components/PmoEditorialNavbar';
import PMOINSIGHTS from "./components/PMOINSIGHTS";
import ProjectControlsProfessionalLevel6 from "./components/ProjectControlsProfessionalLevel6";
import RequestConsultationCta from './components/RequestConsultationCta';
import RouteFaqSection from "./components/RouteFaqSection";
import StickyCta from './components/StickyCta';
import TrustStrip from './components/TrustStrip';
import WantThePMORouteWithoutApprenticeshipPaperwork from "./components/WantThePMORouteWithoutApprenticeshipPaperwork";
import { faqs } from "./sectionData";
/* ── Data ─────────────────────────────────────────────────────── */
/* ── Page ─────────────────────────────────────────────────────── */
export default function PmoPcp() {
  return (<>
    <SchemaOrg type="EducationalOccupationalProgram" data={courseSchema({
      name: 'PMO Route — Project Controls Professional Level 6 Apprenticeship',
      description: 'Build a PMO that leaders trust. A Project Controls Professional Level 6 apprenticeship route for PMO, governance and reporting professionals.',
      occupationalCategory: 'PMO and Governance Project Controls Professional',
    })} />
    <SchemaOrg type="FAQPage" data={faqPageSchema(faqs)} />

    <div className="min-h-screen bg-canvas">
      <main>
        {/* Section 1 — Hero */}
        <ProjectControlsProfessionalLevel6 />

        <PmoEditorialNavbar />

        {/* Section 2 — Trust Strip */}
        <TrustStrip />

        {/* Section 3 — Introduction */}
        <GetDirectionForStrongerPMOCapability />

        {/* Section 4 — Testimonials */}
        <ApplyStrongerPMOPractice />

        {/* Events & Masterclasses */}
        <LearnTogether />

        {/* Section 5 — PMO Journey */}
        <FourCapabilitiesToHelpYourPMOBecomeTrusted />

        {/* Section 6 — Pathway CTA */}
        <FourCapabilitiesOneRouteToAPMOThatLeadersTrust />

        {/* Section 7 — Problem Section */}
        <ItIsTimeToStopAskingPMOsOnlyForReports />

        {/* Section 8 — APM Recognition */}
        <ApmRecognition />

        {/* Shared instructor section */}
        <LearnFromPractitioners />

        {/* Section 10 — Employer Value */}
        <DevelopPMOCapabilityInsideYourOrganisation />

        {/* Section 11 — Apprenticeship Experience */}
        <AWorkplaceDevelopmentJourneyNotJustACourse />

        <FundingEligibilityAndIPCSupport />

        {/* Section 12 — Commercial Teaser */}
        <WantThePMORouteWithoutApprenticeshipPaperwork />

        {/* Section 13 — Insights */}
        <PMOINSIGHTS />

        {/* Section 14 — Two Route Cards */}
        <ApprenticeshipRoute />

        {/* Section 15 — Frequently Asked Questions */}
        <RouteFaqSection />

        {/* Section 16 — Request a consultation CTA */}
        <RequestConsultationCta />

        {/* Section 17 — Closing Hero */}
        <DiscussThePMOCapabilityYourTeamNeeds />

        {/* Section 18 — Footer Landscape + Footer */}
        <FooterLandscape />
      </main>

      <Footer />

      {/* Sticky CTA */}
      <StickyCta />
    </div>
  </>);
}
