import Footer from '@/components/feature/Footer';
import SchemaOrg, { breadcrumbListSchema } from '@/components/feature/SchemaOrg';
import AboutTheBoard from "./components/AboutTheBoard";
import CandidateProfile from "./components/CandidateProfile";
import ExpertiseSought from "./components/ExpertiseSought";
import ExpressionOfInterest from "./components/ExpressionOfInterest";
import GovernanceBoard from './components/GovernanceBoard';
import HelpShapeTheFutureOfProfessionalEducation from "./components/HelpShapeTheFutureOfProfessionalEducation";
import OurApproach from "./components/OurApproach";
import Responsibilities from './components/Responsibilities';
import TimeCommitment from "./components/TimeCommitment";
import WhyJoin from './components/WhyJoin';
export default function GovernanceBoardPage() {
  return (<div className="min-h-screen bg-background-50">
    <SchemaOrg type="WebPage" data={breadcrumbListSchema([{ name: 'Home', item: '/' }, { name: 'Governance Board' }])} />

    <main>
      <GovernanceBoard />

      {/* 2 — About the Governance Board */}
      <AboutTheBoard />

      {/* 3 — Why join the Governance Board */}
      <WhyJoin />

      {/* 4 — Board responsibilities */}
      <Responsibilities />

      {/* 5 — Expected commitment */}
      <TimeCommitment />

      {/* 6 — Areas of expertise sought */}
      <ExpertiseSought />

      {/* 7 — Ideal candidate profile */}
      <CandidateProfile />

      {/* 8 — Governance principles */}
      <OurApproach />

      {/* 9 — Expression of Interest form */}
      <ExpressionOfInterest />

      {/* 10 — Final CTA */}
      <HelpShapeTheFutureOfProfessionalEducation />
    </main>

    <Footer />
  </div>);
}
