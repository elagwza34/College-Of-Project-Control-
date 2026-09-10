import Footer from '@/components/feature/Footer';
import EventsSection from '@/components/feature/EventsSection';
import PageSectionNav from '@/components/feature/PageSectionNav';
import PcpFaqSection from '@/components/feature/PcpFaqSection';
import SchemaOrg, { organizationSchema, courseSchema, faqPageSchema } from '@/components/feature/SchemaOrg';
import MeetMentors from '@/components/feature/MeetMentors';
import ProgrammeAccessSections from '@/components/feature/ProgrammeAccessSections';
import CoachingSupport from '@/components/feature/CoachingSupport';
import ProfessionalPathwaysSection from '@/components/feature/ProfessionalPathwaysSection';
import SectorPathways from '@/pages/home/components/SectorPathways';
import { faqs } from './programmeData';

import Hero from './components/Hero';
import Glance from './components/Glance';
import Register from './components/Register';
import ProgrammeOverview from './components/ProgrammeOverview';
import WhoShouldApply from './components/WhoShouldApply';
import ProgrammeStructure from './components/ProgrammeStructure';
import CohortOrientation from './components/CohortOrientation';
import Outputs from './components/Outputs';
import DeliveryAndAssessment from './components/DeliveryAndAssessment';
import ExpectedWorkload from './components/ExpectedWorkload';
import ProgrammeBenefits from './components/ProgrammeBenefits';
import Partners from './components/Partners';
import NextStep from './components/NextStep';

const navLinks = [
  ['Overview', '#overview'], ['Who it is for', '#audience'], ['Structure', '#structure'],
  ['Pathways', '#pathways'], ['Sectors', '#sectors'], ['Outputs', '#outputs'], ['Delivery', '#delivery'],
  ['Workload', '#workload'], ['Teachers', '#teachers'], ['Benefits', '#benefits'],
  ['Funding', '#funding'], ['Events', '#events'], ['FAQ', '#faq'],
].map(([label, href]) => ({ label, href }));

export default function PcpMaster() {
  return <>
    
    
    <SchemaOrg type="Organization" data={organizationSchema()} />
    <SchemaOrg type="EducationalOccupationalProgram" data={courseSchema({ name: 'Project Controls Professional Level 6', description: 'A work-based Level 6 pathway for professionals responsible for planning, controlling, forecasting and governing complex projects.', timeToComplete: 'P27M' })} />
    <SchemaOrg type="FAQPage" data={faqPageSchema(faqs)} />

    <div className="min-h-screen overflow-x-clip bg-background-50"><main>
      <Hero />
      <PageSectionNav pageLabel="PCP Level 6" links={navLinks} ctaHref="#register" ctaLabel="Register your interest" />

      <Glance />

      <Register />

      <ProgrammeOverview />

      <WhoShouldApply />

      <ProgrammeStructure />

      <ProfessionalPathwaysSection />

      <SectorPathways />

      <CohortOrientation />

      <Outputs />

      <DeliveryAndAssessment />

      <ExpectedWorkload />

      <div id="teachers"><MeetMentors /></div>

      <CoachingSupport />

      <ProgrammeBenefits />

      <ProgrammeAccessSections programmeName="Project Controls Professional Level 6" />

      <Partners />

      <EventsSection id="events" programme="pcp-level-6" title="Programme events & masterclasses" />

      <NextStep />

      <div id="faq"><PcpFaqSection title="Project Controls Professional Level 6, clearly explained" faqs={faqs} /></div>
    </main><Footer /></div>
  </>;
}
