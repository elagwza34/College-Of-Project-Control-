import EligibilityCheckerSection from '@/components/feature/EligibilityCheckerSection';
import Footer from '@/components/feature/Footer';
import MeetMentors from '@/components/feature/MeetMentors';
import PageSectionNav from '@/components/feature/PageSectionNav';
import ChooseYourProfessionalDirection from "./components/ChooseYourProfessionalDirection";
import EngineeringAdvancedManufacturing from "./components/EngineeringAdvancedManufacturing";
import EngineeringProjectControlsEvidence from "./components/EngineeringProjectControlsEvidence";
import FundingAndBursaryAccess from "./components/FundingAndBursaryAccess";
import OneProfessionalFoundationAcrossComplexEngineeringEnvironments from "./components/OneProfessionalFoundationAcrossComplexEngineeringEnvironments";
import ProjectControlsThatProtectEngineeringValue from "./components/ProjectControlsThatProtectEngineeringValue";
import { links } from "./sectionData";
export default function Page() { return <div className="min-h-screen bg-background-50"><main id="hero"><EngineeringAdvancedManufacturing /><PageSectionNav pageLabel="Engineering & Advanced Manufacturing" links={links} showCta={false} /><ProjectControlsThatProtectEngineeringValue /><OneProfessionalFoundationAcrossComplexEngineeringEnvironments /><ChooseYourProfessionalDirection /><EngineeringProjectControlsEvidence /><div id="experts" className="scroll-mt-44"><MeetMentors /></div><FundingAndBursaryAccess /><EligibilityCheckerSection /></main><Footer /></div>; }
