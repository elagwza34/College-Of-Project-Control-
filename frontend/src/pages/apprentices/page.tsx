import Footer from '@/components/feature/Footer';
import CostForEligibleLearners from './components/CostForEligibleLearners';
import ForApprenticesProfessionals from './components/ForApprenticesProfessionals';
import LearnerSupport from './components/LearnerSupport';
import ReadyToAdvanceYourCareerInProjectControls from './components/ReadyToAdvanceYourCareerInProjectControls';
import WeeklyRhythm from './components/WeeklyRhythm';
import WhatYouCouldApplyAtWork from './components/WhatYouCouldApplyAtWork';
import WhatYouWillGain from './components/WhatYouWillGain';
import YourJourney from './components/YourJourney';

export default function ApprenticesPage() {
  return (
    <div className="min-h-screen bg-background-50">
      <main>
        <ForApprenticesProfessionals />
        <YourJourney />
        <WhatYouWillGain />
        <WeeklyRhythm />
        <CostForEligibleLearners />
        <LearnerSupport />
        <WhatYouCouldApplyAtWork />
        <ReadyToAdvanceYourCareerInProjectControls />
      </main>
      <Footer />
    </div>
  );
}
