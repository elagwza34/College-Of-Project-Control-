import Footer from '@/components/feature/Footer';
import PageSectionNav from '@/components/feature/PageSectionNav';

import Hero from './components/Hero';
import WhyWorkWithKBC from './components/WhyWorkWithKBC';
import StartWithYourNeed from './components/StartWithYourNeed';
import HowThePartnershipWorks from './components/HowThePartnershipWorks';
import ProgressYouCanSee from './components/ProgressYouCanSee';
import ProjectControlsPathways from './components/ProjectControlsPathways';
import WorkplaceOutputs from './components/WorkplaceOutputs';
import ApprenticeshipFunding from './components/ApprenticeshipFunding';
import ARealPartnership from './components/ARealPartnership';
import CapabilityPlanning from './components/CapabilityPlanning';
import Stories from './components/Stories';
import BuiltFor from './components/BuiltFor';
import EmployerResources from './components/EmployerResources';
import Faq from './components/Faq';
import Consultation from './components/Consultation';

const sectionLinks = [
  ['Overview', '#overview'], ['Employer Needs', '#employer-needs'], ['How It Works', '#how-it-works'], ['Programmes', '#programmes'], ['Progress', '#progress'], ['Funding', '#funding'], ['Responsibilities', '#responsibilities'], ['Services', '#workforce-services'], ['Stories', '#stories'], ['Resources', '#resources'], ['FAQ', '#faq'],
].map(([label, href]) => ({ label, href }));

export default function EmployersPage() {
  return <div className="min-h-screen overflow-x-clip bg-background-50"><main>
    <Hero />
    <PageSectionNav pageLabel="Employer Hub" links={sectionLinks} ctaHref="/book-a-session" ctaLabel="Discuss your needs" />
    <WhyWorkWithKBC />
    <StartWithYourNeed />
    <HowThePartnershipWorks />
    <ProgressYouCanSee />
    <ProjectControlsPathways />
    <WorkplaceOutputs />
    <ApprenticeshipFunding />
    <ARealPartnership />
    <CapabilityPlanning />
    <Stories />
    <BuiltFor />
    <EmployerResources />
    <Faq />
    <Consultation />
  </main><Footer /></div>;
}
