import Footer from '@/components/feature/Footer';
import PageSectionNav from '@/components/feature/PageSectionNav';
import ChooseYourProfessionalDirection from "./components/ChooseYourProfessionalDirection";
import EmployerCapability from "./components/EmployerCapability";
import EnergyUtilities from "./components/EnergyUtilities";
import ExpertLedPerspectives from "./components/ExpertLedPerspectives";
import FundingBursaryAccess from "./components/FundingBursaryAccess";
import OneFoundation from './components/OneFoundation';
import ProfessionalProgression from "./components/ProfessionalProgression";
import TheEnergyDeliveryChallenge from "./components/TheEnergyDeliveryChallenge";
import TheLearningExperience from "./components/TheLearningExperience";
import WorkplaceEvidence from "./components/WorkplaceEvidence";
import { links } from "./sectionData";
export default function Page() { return <div className="min-h-screen bg-background-50"><main id="hero"><EnergyUtilities /><PageSectionNav pageLabel="Energy & Utilities" links={links} showCta={false} /><OneFoundation /><TheEnergyDeliveryChallenge /><ChooseYourProfessionalDirection /><FundingBursaryAccess /><WorkplaceEvidence /><ProfessionalProgression /><EmployerCapability /><ExpertLedPerspectives /><TheLearningExperience /></main><Footer /></div>; }
