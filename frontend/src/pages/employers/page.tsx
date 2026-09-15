import Footer from '@/components/feature/Footer';
import PageSectionNav from '@/components/feature/PageSectionNav';
import ApprenticeshipFunding from './components/ApprenticeshipFunding';
import ARealPartnership from './components/ARealPartnership';
import BuiltForProjectDrivenOrganisations from "./components/BuiltForProjectDrivenOrganisations";
import CapabilityPlanning from './components/CapabilityPlanning';
import EmployerResources from './components/EmployerResources';
import ExampleScenarios from "./components/ExampleScenarios";
import HowThePartnershipWorks from './components/HowThePartnershipWorks';
import LearningAppliedAtWork from "./components/LearningAppliedAtWork";
import ProgressYouCanSee from './components/ProgressYouCanSee';
import ProjectControlsEmployerPartnerships from "./components/ProjectControlsEmployerPartnerships";
import ProjectControlsPathways from './components/ProjectControlsPathways';
import QuestionsEmployersUsuallyAskBeforeStarting from "./components/QuestionsEmployersUsuallyAskBeforeStarting";
import StartWithTheBusinessNeed from "./components/StartWithTheBusinessNeed";
import StartWithYourNeed from './components/StartWithYourNeed';
import WhyWorkWithKBC from './components/WhyWorkWithKBC';
const sectionLinks = [
  ['Overview', '#overview'], ['Employer Needs', '#employer-needs'], ['How It Works', '#how-it-works'], ['Programmes', '#programmes'], ['Progress', '#progress'], ['Funding', '#funding'], ['Responsibilities', '#responsibilities'], ['Services', '#workforce-services'], ['Stories', '#stories'], ['Resources', '#resources'], ['FAQ', '#faq'],
].map(([label, href]) => ({ label, href }));
export default function EmployersPage() {
  return <div className="min-h-screen overflow-x-clip bg-background-50"><main>
    <ProjectControlsEmployerPartnerships />
    <PageSectionNav pageLabel="Employer Hub" links={sectionLinks} ctaHref="/book-a-session" ctaLabel="Discuss your needs" />
    <WhyWorkWithKBC />
    <StartWithYourNeed />
    <HowThePartnershipWorks />
    <ProgressYouCanSee />
    <ProjectControlsPathways />
    <LearningAppliedAtWork />
    <ApprenticeshipFunding />
    <ARealPartnership />
    <CapabilityPlanning />
    <ExampleScenarios />
    <BuiltForProjectDrivenOrganisations />
    <EmployerResources />
    <QuestionsEmployersUsuallyAskBeforeStarting />
    <StartWithTheBusinessNeed />
  </main><Footer /></div>;
}
