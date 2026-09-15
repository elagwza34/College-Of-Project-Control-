import Footer from '@/components/feature/Footer';
import PageSectionNav from '@/components/feature/PageSectionNav';
import APMGInternationalCertificationContext from "./components/APMGInternationalCertificationContext";
import CatalogueNavigation from './components/CatalogueNavigation';
import CollegeSpecialistDevelopment from "./components/CollegeSpecialistDevelopment";
import EligibilityCriteria from "./components/EligibilityCriteria";
import IndependentProfessionalDevelopmentRoute from "./components/IndependentProfessionalDevelopmentRoute";
import LiveTeachingCoachingAndWorkplaceApplication from "./components/LiveTeachingCoachingAndWorkplaceApplication";
import OccupationalAssessmentAndFutureChPPApplication from "./components/OccupationalAssessmentAndFutureChPPApplication";
import PMOProfessionalDevelopmentModule1 from "./components/PMOProfessionalDevelopmentModule1";
import PMOProfessionalDevelopmentModule2 from "./components/PMOProfessionalDevelopmentModule2";
import PMOProfessionalDevelopmentModule3 from "./components/PMOProfessionalDevelopmentModule3";
import PMOProfessionalDevelopmentModule4 from "./components/PMOProfessionalDevelopmentModule4";
import ProgrammeInformationAndNextSteps from "./components/ProgrammeInformationAndNextSteps";
import ProjectControlsProfessionalLevel6 from "./components/ProjectControlsProfessionalLevel6";
import TechnicalKnowledgeProfessionalPracticeCharteredAmbition from "./components/TechnicalKnowledgeProfessionalPracticeCharteredAmbition";
import TheCompleteST0845CapabilityRemainsMandatory from "./components/TheCompleteST0845CapabilityRemainsMandatory";
import TheProfessionalDevelopmentArchitecture from "./components/TheProfessionalDevelopmentArchitecture";
import TheTechnicalKnowledgeDevelopmentComponent from "./components/TheTechnicalKnowledgeDevelopmentComponent";
import WhoShouldChooseTheCharteredPathway from "./components/WhoShouldChooseTheCharteredPathway";
const sectionLinks = [
  {
    "label": "Role fit",
    "href": "#role-fit"
  },
  {
    "label": "Structure",
    "href": "#pathway-structure"
  },
  {
    "label": "Capability",
    "href": "#occupational-standard"
  },
  {
    "label": "PMO development",
    "href": "#certified-pmo-core"
  },
  {
    "label": "Module 1",
    "href": "#module-1"
  },
  {
    "label": "Module 2",
    "href": "#module-2"
  },
  {
    "label": "Module 3",
    "href": "#module-3"
  },
  {
    "label": "Module 4",
    "href": "#module-4"
  },
  {
    "label": "AI",
    "href": "#ai-project-controls"
  },
  {
    "label": "Portfolio",
    "href": "#portfolio-management"
  },
  {
    "label": "EVM",
    "href": "#earned-value-management"
  },
  {
    "label": "Evidence",
    "href": "#professional-evidence"
  },
  {
    "label": "Delivery",
    "href": "#delivery"
  },
  {
    "label": "Eligibility",
    "href": "#eligibility"
  },
  {
    "label": "Contact",
    "href": "#sources-contact"
  }
];
export default function CharteredPathway() {
  return <div className="min-h-screen bg-background-50"><main id="hero">
    <ProjectControlsProfessionalLevel6 />
    <PageSectionNav pageLabel="Chartered Pathway" links={sectionLinks} showCta={false} />
    <TechnicalKnowledgeProfessionalPracticeCharteredAmbition />
    <CatalogueNavigation />
    <WhoShouldChooseTheCharteredPathway />
    <TheProfessionalDevelopmentArchitecture />
    <TheCompleteST0845CapabilityRemainsMandatory />
    <TheTechnicalKnowledgeDevelopmentComponent />
    <PMOProfessionalDevelopmentModule1 />
    <PMOProfessionalDevelopmentModule2 />
    <PMOProfessionalDevelopmentModule3 />
    <PMOProfessionalDevelopmentModule4 />
    <CollegeSpecialistDevelopment />
    <IndependentProfessionalDevelopmentRoute />
    <APMGInternationalCertificationContext />
    <OccupationalAssessmentAndFutureChPPApplication />
    <LiveTeachingCoachingAndWorkplaceApplication />
    <EligibilityCriteria />
    <ProgrammeInformationAndNextSteps />

  </main><Footer /></div>;
}
