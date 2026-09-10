import Footer from '@/components/feature/Footer';
import PageSectionNav from '@/components/feature/PageSectionNav';
import Hero from './components/Hero';
import PathwayOverview from './components/PathwayOverview';
import CatalogueNavigation from './components/CatalogueNavigation';
import RoleFit from './components/RoleFit';
import PathwayStructure from './components/PathwayStructure';
import OccupationalStandard from './components/OccupationalStandard';
import CertifiedPmoCore from './components/CertifiedPmoCore';
import Module1 from './components/Module1';
import Module2 from './components/Module2';
import Module3 from './components/Module3';
import Module4 from './components/Module4';
import AiProjectControls from './components/AiProjectControls';
import PortfolioManagement from './components/PortfolioManagement';
import EarnedValueManagement from './components/EarnedValueManagement';
import ProfessionalEvidence from './components/ProfessionalEvidence';
import Delivery from './components/Delivery';
import Eligibility from './components/Eligibility';
import SourcesContact from './components/SourcesContact';

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
<Hero />
<PageSectionNav pageLabel="Chartered Pathway" links={sectionLinks} />
<PathwayOverview />
<CatalogueNavigation />
<RoleFit />
<PathwayStructure />
<OccupationalStandard />
<CertifiedPmoCore />
<Module1 />
<Module2 />
<Module3 />
<Module4 />
<AiProjectControls />
<PortfolioManagement />
<EarnedValueManagement />
<ProfessionalEvidence />
<Delivery />
<Eligibility />
<SourcesContact />

</main><Footer /></div>;
}
