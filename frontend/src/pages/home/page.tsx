import Footer from '@/components/feature/Footer';
import CaseStudiesSection from '@/components/feature/CaseStudiesSection';
import CoachingAndSupport from "./components/CoachingAndSupport";
import CollegeOfProjectControlsAndManagement from "./components/CollegeOfProjectControlsAndManagement";
import ForEmployers from './components/ForEmployers';
import FromTheJournal from "./components/FromTheJournal";
import FundingEligibilityAndIPCSupport from "./components/FundingEligibilityAndIPCSupport";
import LearnFromPractitioners from "./components/LearnFromPractitioners";
import LearnTogether from "./components/LearnTogether";
import ProfessionalDevelopmentAndRecognition from "./components/ProfessionalDevelopmentAndRecognition";
import ProfessionalExperience from "./components/ProfessionalExperience";
import ProfessionalProgrammes from "./components/ProfessionalProgrammes";
import ProjectDrivenSectors from "./components/ProjectDrivenSectors";
import SpecialistModules from './components/SpecialistModules';
import ShortCoursesCarousel from './components/ShortCoursesCarousel';
import TrustedBy from "./components/TrustedBy";

export default function Home() {
  return (
    <div className="min-h-screen bg-background-50">
      <main>
        <CollegeOfProjectControlsAndManagement />
        <TrustedBy />
        <ProfessionalProgrammes />
        <div className="section-divider" />
        <SpecialistModules />
        <ProjectDrivenSectors />
        <FundingEligibilityAndIPCSupport />
        <ShortCoursesCarousel />
        <ForEmployers />
        <CaseStudiesSection />
        <LearnFromPractitioners />
        <CoachingAndSupport />
        <LearnTogether />
        <FromTheJournal />
        <ProfessionalExperience />
        <ProfessionalDevelopmentAndRecognition />
      </main>
      <Footer />
    </div>
  );
}
