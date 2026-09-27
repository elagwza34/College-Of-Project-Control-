import Footer from '@/components/feature/Footer';
import PageSectionNav from '@/components/feature/PageSectionNav';
import StickyCta from './components/StickyCta';
import SchemaOrg, { courseSchema, organizationSchema } from '@/components/feature/SchemaOrg';
import CapabilityAndWorkplaceOutputs from "./components/CapabilityAndWorkplaceOutputs";
import CoachingAndSupport from "./components/CoachingAndSupport";
import CohortOrientation from './components/CohortOrientation';
import CollegeOfProjectControlsAndProjectManagement from "./components/CollegeOfProjectControlsAndProjectManagement";
import CourseAtAGlance from "./components/CourseAtAGlance";
import DeliveryAndAssessment from './components/DeliveryAndAssessment';
import EmployerPartnershipsAcrossProjectDrivenSectors from "./components/EmployerPartnershipsAcrossProjectDrivenSectors";
import ExpectedWorkload from './components/ExpectedWorkload';
import FundingEligibilityAndIPCSupport from "./components/FundingEligibilityAndIPCSupport";
import LearnFromPractitioners from "./components/LearnFromPractitioners";
import NextStep from './components/NextStep';
import ProfessionalPathways from "./components/ProfessionalPathways";
import ProgrammeBenefits from './components/ProgrammeBenefits';
import ProgrammeEventsMasterclasses from "./components/ProgrammeEventsMasterclasses";
import ProgrammeOverview from './components/ProgrammeOverview';
import ProgrammeStructure from './components/ProgrammeStructure';
import ProjectDrivenSectorsSection from "./components/ProjectDrivenSectorsSection";
import RegisterYourInterest from "./components/RegisterYourInterest";
import WhoShouldApply from './components/WhoShouldApply';
import { navLinks } from "./sectionData";
export default function PcpMaster() {
  return <>


    <SchemaOrg type="Organization" data={organizationSchema()} />
    <SchemaOrg type="EducationalOccupationalProgram" data={courseSchema({ name: 'Project Controls Professional Level 6', description: 'A work-based Level 6 pathway for professionals responsible for planning, controlling, forecasting and governing complex projects.', timeToComplete: 'P27M' })} />

    <div className="min-h-screen overflow-x-clip bg-background-50"><main>
      <CollegeOfProjectControlsAndProjectManagement />
      <PageSectionNav pageLabel="PCP Level 6" links={navLinks} showCta={false} />

      <CourseAtAGlance />

      <RegisterYourInterest />

      <ProgrammeOverview />

      <WhoShouldApply />

      <ProgrammeStructure />

      <ProfessionalPathways />

      <ProjectDrivenSectorsSection />

      <CohortOrientation />

      <CapabilityAndWorkplaceOutputs />

      <DeliveryAndAssessment />

      <ExpectedWorkload />

      <div id="teachers"><LearnFromPractitioners /></div>

      <CoachingAndSupport />

      <ProgrammeBenefits />

      <FundingEligibilityAndIPCSupport />

      <EmployerPartnershipsAcrossProjectDrivenSectors />

      <ProgrammeEventsMasterclasses />

      <NextStep />
    </main><Footer /><StickyCta /></div>
  </>;
}
