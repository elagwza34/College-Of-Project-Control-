import Footer from '@/components/feature/Footer';
import PageSectionNav from '@/components/feature/PageSectionNav';
import CheckTheRightAccessRouteForYou from "./components/CheckTheRightAccessRouteForYou";
import ChooseYourProfessionalDirection from "./components/ChooseYourProfessionalDirection";
import EngineeringAdvancedManufacturing from "./components/EngineeringAdvancedManufacturing";
import EngineeringProjectControlsEvidence from "./components/EngineeringProjectControlsEvidence";
import FundingAndBursaryAccess from "./components/FundingAndBursaryAccess";
import LearnApplyTestAndEvidence from "./components/LearnApplyTestAndEvidence";
import OneProfessionalFoundationAcrossComplexEngineeringEnvironments from "./components/OneProfessionalFoundationAcrossComplexEngineeringEnvironments";
import ProfessionalInsight from "./components/ProfessionalInsight";
import ProjectControlsThatProtectEngineeringValue from "./components/ProjectControlsThatProtectEngineeringValue";
import QuestionsBeforeYouEnquire from "./components/QuestionsBeforeYouEnquire";
import ReadyToTakeControl from "./components/ReadyToTakeControl";
import SupportEngineeringDeliveryRoles from "./components/SupportEngineeringDeliveryRoles";
import { links } from "./sectionData";
export default function Page() { return <div className="min-h-screen bg-background-50"><main id="hero"><EngineeringAdvancedManufacturing /><PageSectionNav pageLabel="Engineering & Advanced Manufacturing" links={links} showCta={false} /><ProjectControlsThatProtectEngineeringValue /><OneProfessionalFoundationAcrossComplexEngineeringEnvironments /><ChooseYourProfessionalDirection /><EngineeringProjectControlsEvidence /><SupportEngineeringDeliveryRoles /><LearnApplyTestAndEvidence /><ProfessionalInsight /><FundingAndBursaryAccess /><CheckTheRightAccessRouteForYou /><QuestionsBeforeYouEnquire /><ReadyToTakeControl /></main><Footer /></div>; }
