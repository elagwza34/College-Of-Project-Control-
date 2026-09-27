import Footer from '@/components/feature/Footer';
import PageSectionNav from '@/components/feature/PageSectionNav';
import ChooseYourPathwayCheckYourAccessRoute from "./components/ChooseYourPathwayCheckYourAccessRoute";
import ChooseYourProfessionalDirection from "./components/ChooseYourProfessionalDirection";
import ConstructionInfrastructure from "./components/ConstructionInfrastructure";
import CoreProfessionalCapability from "./components/CoreProfessionalCapability";
import EmployerCapability from "./components/EmployerCapability";
import ExpertLedPerspectives from "./components/ExpertLedPerspectives";
import FundingBursaryAccess from "./components/FundingBursaryAccess";
import ProfessionalProgression from "./components/ProfessionalProgression";
import QuickAccessRouteCheck from "./components/QuickAccessRouteCheck";
import SectorApplication from "./components/SectorApplication";
import TheConstructionChallenge from "./components/TheConstructionChallenge";
import TheLearningExperience from "./components/TheLearningExperience";
import WorkplaceEvidence from "./components/WorkplaceEvidence";
import { links } from "./sectionData";
export default function Page() { return <div className="min-h-screen bg-background-50"><main id="hero"><ConstructionInfrastructure /><PageSectionNav pageLabel="Construction & Infrastructure" links={links} showCta={false} /><TheConstructionChallenge /><ChooseYourProfessionalDirection /><FundingBursaryAccess /><CoreProfessionalCapability /><SectorApplication /><WorkplaceEvidence /><ProfessionalProgression /><EmployerCapability /><ExpertLedPerspectives /><TheLearningExperience /><QuickAccessRouteCheck /><ChooseYourPathwayCheckYourAccessRoute /></main><Footer /></div>; }
