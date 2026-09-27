import Footer from '@/components/feature/Footer';
import ChooseYourProgramme from "./components/ChooseYourProgramme";
import CompareProgrammes from "./components/CompareProgrammes";
import FindYourFit from "./components/FindYourFit";
import FlexibleProfessionalDevelopment from "./components/FlexibleProfessionalDevelopment";
import ForEmployers from "./components/ForEmployers";
import LearnFromPractitioners from "./components/LearnFromPractitioners";
import LearnTogether from "./components/LearnTogether";
import ProfessionalDevelopmentAndRecognition from "./components/ProfessionalDevelopmentAndRecognition";
import ProfessionalProgrammes from "./components/ProfessionalProgrammes";
export default function Programmes() {
  return (<div className="min-h-screen bg-background-50">
    <main>
      <ProfessionalProgrammes />
      <ChooseYourProgramme />
      <CompareProgrammes />
      <div className="section-divider" />
      <FlexibleProfessionalDevelopment />
      <FindYourFit />

      <ForEmployers />
      <ProfessionalDevelopmentAndRecognition />
      <div className="section-divider" />
      <LearnFromPractitioners />
      <LearnTogether />
    </main>
    <Footer />
  </div>);
}
