import Footer from '@/components/feature/Footer';
import PageSectionNav from '@/components/feature/PageSectionNav';
import StickyCta from './components/StickyCta';
import SchemaOrg, { breadcrumbListSchema, courseSchema, organizationSchema } from '@/components/feature/SchemaOrg';
import BuildCapabilityThatTransfersDirectlyToYourRole from './components/BuildCapabilityThatTransfersDirectlyToYourRole';
import CoachingAndSupport from "./components/CoachingAndSupport";
import ForEmployers from './components/ForEmployers';
import FundingEligibilityAndIPCSupport from "./components/FundingEligibilityAndIPCSupport";
import HowYouLearn from './components/HowYouLearn';
import KeyProgrammeFacts from "./components/KeyProgrammeFacts";
import LearnByBuilding from "./components/LearnByBuilding";
import LearnFromPractitioners from "./components/LearnFromPractitioners";
import Level4WorkBasedApprenticeship from "./components/Level4WorkBasedApprenticeship";
import ProfessionalDevelopment from "./components/ProfessionalDevelopment";
import TrustAndRelevance from './components/TrustAndRelevance';
import WeeklyCommitment from './components/WeeklyCommitment';
import WhatYouWillLearn from './components/WhatYouWillLearn';
import WhoShouldApply from './components/WhoShouldApply';
import Your12MonthDevelopmentJourney from './components/Your12MonthDevelopmentJourney';
import YourNextStep from "./components/YourNextStep";
import { navLinks } from "./sectionData";
export default function ApmLevel4() {
  return <>
    <SchemaOrg type="Organization" data={organizationSchema()} />
    <SchemaOrg type="Course" data={courseSchema({ name: 'Associate Project Manager Level 4', description: 'A 12-month work-based apprenticeship combining professional project management preparation, workplace application and applied AI in project controls.', provider: 'Kent Business College', educationalLevel: 'Level 4', occupationalCategory: 'Associate Project Manager', timeToComplete: 'P12M' })} />
    <SchemaOrg type="WebPage" data={breadcrumbListSchema([{ name: 'Home', item: '/' }, { name: 'Programmes', item: '/programmes' }, { name: 'Associate Project Manager Level 4' }])} />
    <div className="min-h-screen bg-background-50"><main>
      <Level4WorkBasedApprenticeship />

      <KeyProgrammeFacts />
      <PageSectionNav pageLabel="Level 4" links={navLinks} showCta={false} />

      <BuildCapabilityThatTransfersDirectlyToYourRole />

      <Your12MonthDevelopmentJourney />

      <WhatYouWillLearn />

      <LearnByBuilding />

      <WhoShouldApply />

      <HowYouLearn />

      <WeeklyCommitment />

      <div id="experts"><LearnFromPractitioners /></div>

      <CoachingAndSupport />

      <FundingEligibilityAndIPCSupport />

      <ForEmployers />

      <ProfessionalDevelopment />

      <TrustAndRelevance />

      <YourNextStep />
    </main><Footer /><StickyCta /></div>
  </>;
}
