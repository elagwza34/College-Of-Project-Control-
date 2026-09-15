import Footer from '@/components/feature/Footer';
import PageSectionNav from '@/components/feature/PageSectionNav';
import AIInProjectControls from "./components/AIInProjectControls";
import EligibilityCriteria from "./components/EligibilityCriteria";
import ExpertLedLearning from "./components/ExpertLedLearning";
import FromEvidenceToAction from "./components/FromEvidenceToAction";
import FundingScenariosForStartsFrom1August2026 from "./components/FundingScenariosForStartsFrom1August2026";
import HowYouStudy from "./components/HowYouStudy";
import PMIPMOCPPreparationAndPMOLeadership from "./components/PMIPMOCPPreparationAndPMOLeadership";
import PMPExamPreparationAndStrategicProjectLeadership from "./components/PMPExamPreparationAndStrategicProjectLeadership";
import PRINCE2PortfolioManagement from "./components/PRINCE2PortfolioManagement";
import PRINCE2ProgrammeManagement from "./components/PRINCE2ProgrammeManagement";
import ProgrammeEssentials from './components/ProgrammeEssentials';
import ProjectControlsProfessionalLevel6 from "./components/ProjectControlsProfessionalLevel6";
import StrategicPathwayComplete from "./components/StrategicPathwayComplete";
import TakeTheNextStep from "./components/TakeTheNextStep";
import WhoShouldApply from './components/WhoShouldApply';
import YourCreditJourney from "./components/YourCreditJourney";
const sectionLinks = [
  {
    "label": "Credit Overview",
    "href": "#credit-overview"
  },
  {
    "label": "Credit 1 2",
    "href": "#credit-1-2"
  },
  {
    "label": "Credit 3",
    "href": "#credit-3"
  },
  {
    "label": "Credit 4",
    "href": "#credit-4"
  },
  {
    "label": "Credit 5",
    "href": "#credit-5"
  },
  {
    "label": "Credit 6",
    "href": "#credit-6"
  },
  {
    "label": "Experts",
    "href": "#experts"
  },
  {
    "label": "Who Should Apply",
    "href": "#who-should-apply"
  },
  {
    "label": "Eligibility",
    "href": "#eligibility"
  },
  {
    "label": "Funding",
    "href": "#funding"
  },
  {
    "label": "Delivery",
    "href": "#delivery"
  },
  {
    "label": "Completion",
    "href": "#completion"
  },
  {
    "label": "Programme Essentials",
    "href": "#programme-essentials"
  },
  {
    "label": "Apply",
    "href": "#apply"
  }
];
export default function StrategicPathway() {
  return <div className="min-h-screen bg-background-50"><main id="hero">
    <ProjectControlsProfessionalLevel6 />
    <PageSectionNav pageLabel="Strategic Pathway" links={sectionLinks} showCta={false} />
    <YourCreditJourney />
    <PMPExamPreparationAndStrategicProjectLeadership />
    <AIInProjectControls />
    <FromEvidenceToAction />
    <PRINCE2ProgrammeManagement />
    <PRINCE2PortfolioManagement />
    <PMIPMOCPPreparationAndPMOLeadership />
    <ExpertLedLearning />
    <WhoShouldApply />
    <EligibilityCriteria />
    <FundingScenariosForStartsFrom1August2026 />
    <HowYouStudy />
    <StrategicPathwayComplete />
    <ProgrammeEssentials />
    <TakeTheNextStep />

  </main><Footer /></div>;
}
