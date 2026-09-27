import Footer from '@/components/feature/Footer';
import PageSectionNav from '@/components/feature/PageSectionNav';
import CapabilityThemes from "./components/CapabilityThemes";
import EligibilityCriteria from "./components/EligibilityCriteria";
import EmployerResponsibilities from "./components/EmployerResponsibilities";
import FundingScenariosFor202627Starts from "./components/FundingScenariosFor202627Starts";
import GatewayAndEPA from "./components/GatewayAndEPA";
import OperationalPathwayQuickEnquiry from './components/OperationalPathwayQuickEnquiry';
import ProfessionalArtefacts from "./components/ProfessionalArtefacts";
import Section202627LearnerAndEmployerPathway from "./components/Section202627LearnerAndEmployerPathway";
import SelectSixCredits from "./components/SelectSixCredits";
import TakeTheNextStep from "./components/TakeTheNextStep";
import TheOperationalRoute from "./components/TheOperationalRoute";
import WhoItIsFor from "./components/WhoItIsFor";
// Approved copy: Operational Pathway.txt. Uses the site's existing design tokens and components.
const sectionLinks = [
  {
    "label": "Overview",
    "href": "#operational-overview"
  },
  {
    "label": "Structure",
    "href": "#operational-structure"
  },
  {
    "label": "Roles",
    "href": "#operational-roles"
  },
  {
    "label": "Capability",
    "href": "#operational-capability"
  },
  {
    "label": "Evidence",
    "href": "#operational-evidence"
  },
  {
    "label": "Eligibility",
    "href": "#operational-eligibility"
  },
  {
    "label": "Employer",
    "href": "#operational-employer"
  },
  {
    "label": "Funding",
    "href": "#operational-funding"
  },
  {
    "label": "Assessment",
    "href": "#operational-assessment"
  },
  {
    "label": "Contact",
    "href": "#operational-contact"
  }
];
export default function OperationalPcp() {
  return <div className="min-h-screen bg-background-50 pb-24">
    <main id="hero">
      <Section202627LearnerAndEmployerPathway />
      <PageSectionNav pageLabel="Operational Pathway" links={sectionLinks} showCta={false} />
      <TheOperationalRoute />
      <SelectSixCredits />
      <WhoItIsFor />
      <CapabilityThemes />
      <ProfessionalArtefacts />
      <EligibilityCriteria />
      <EmployerResponsibilities />
      <FundingScenariosFor202627Starts />
      <GatewayAndEPA />
      <TakeTheNextStep />
    </main>
    <Footer />
    <OperationalPathwayQuickEnquiry />
  </div>;
}
