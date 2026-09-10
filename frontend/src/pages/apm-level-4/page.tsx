import Footer from '@/components/feature/Footer';
import PageSectionNav from '@/components/feature/PageSectionNav';
import SchemaOrg, { breadcrumbListSchema, courseSchema, faqPageSchema, organizationSchema } from '@/components/feature/SchemaOrg';
import MeetMentors from '@/components/feature/MeetMentors';
import ProgrammeAccessSections from '@/components/feature/ProgrammeAccessSections';
import CoachingSupport from '@/components/feature/CoachingSupport';
import { faqs } from './programmeData';

import Hero from './components/Hero';
import Facts from './components/Facts';
import BuildCapabilityThatTransfersDirectlyToYourRole from './components/BuildCapabilityThatTransfersDirectlyToYourRole';
import Your12MonthDevelopmentJourney from './components/Your12MonthDevelopmentJourney';
import WhatYouWillLearn from './components/WhatYouWillLearn';
import Outputs from './components/Outputs';
import WhoShouldApply from './components/WhoShouldApply';
import HowYouLearn from './components/HowYouLearn';
import WeeklyCommitment from './components/WeeklyCommitment';
import ForEmployers from './components/ForEmployers';
import BeyondApprenticeship from './components/BeyondApprenticeship';
import TrustAndRelevance from './components/TrustAndRelevance';
import FrequentlyAskedQuestions from './components/FrequentlyAskedQuestions';
import NextStepCta from './components/NextStepCta';

const navLinks = [
  { label: 'Overview', href: '#overview' }, { label: 'Pathway', href: '#pathway' },
  { label: 'Curriculum', href: '#curriculum' }, { label: 'Learning', href: '#learning' },
  { label: 'Experts', href: '#experts' }, { label: 'Funding', href: '#funding' }, { label: 'FAQ', href: '#faq' },
];

export default function ApmLevel4() {
  return <>
    <SchemaOrg type="Organization" data={organizationSchema()} />
    <SchemaOrg type="Course" data={courseSchema({ name: 'Associate Project Manager Level 4', description: 'A 12-month work-based apprenticeship combining professional project management preparation, workplace application and applied AI in project controls.', provider: 'Kent Business College', educationalLevel: 'Level 4', occupationalCategory: 'Associate Project Manager', timeToComplete: 'P12M' })} />
    <SchemaOrg type="WebPage" data={breadcrumbListSchema([{ name: 'Home', item: '/' }, { name: 'Programmes', item: '/programmes' }, { name: 'Associate Project Manager Level 4' }])} />
    <SchemaOrg type="FAQPage" data={faqPageSchema(faqs)} />
    <div className="min-h-screen bg-background-50"><main>
      <Hero />

      <Facts />
      <PageSectionNav pageLabel="Level 4" links={navLinks} ctaHref="/book-a-session" ctaLabel="Request a consultation" />

      <BuildCapabilityThatTransfersDirectlyToYourRole />

      <Your12MonthDevelopmentJourney />

      <WhatYouWillLearn />

      <Outputs />

      <WhoShouldApply />

      <HowYouLearn />

      <WeeklyCommitment />

      <div id="experts"><MeetMentors /></div>

      <CoachingSupport />

      <ProgrammeAccessSections programmeName="Associate Project Manager Level 4" />

      <ForEmployers />

      <BeyondApprenticeship />

      <TrustAndRelevance />

      <FrequentlyAskedQuestions />

      <NextStepCta />
    </main><Footer /></div>
  </>;
}
