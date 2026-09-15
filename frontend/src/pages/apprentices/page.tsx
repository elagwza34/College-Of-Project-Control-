import Footer from '@/components/feature/Footer';
import CostForEligibleLearners from "./components/CostForEligibleLearners";
import ForApprenticesProfessionals from "./components/ForApprenticesProfessionals";
import LearnerSupport from "./components/LearnerSupport";
import QuickAnswers from "./components/QuickAnswers";
import ReadyToAdvanceYourCareerInProjectControls from "./components/ReadyToAdvanceYourCareerInProjectControls";
import WeeklyRhythm from './components/WeeklyRhythm';
import WhatYouCouldApplyAtWork from "./components/WhatYouCouldApplyAtWork";
import WhatYouWillGain from "./components/WhatYouWillGain";
import YourJourney from "./components/YourJourney";
export default function ApprenticesPage() {
  return (<div className="min-h-screen bg-background-50">
    <main>
      {/* ═══════════════ HERO — Full Background Image ═══════════════ */}
      <ForApprenticesProfessionals />

      {/* ═══════════════ CAREER JOURNEY — Timeline ═══════════════ */}
      <YourJourney />

      {/* ═══════════════ BENEFITS — 3-Column Grid ═══════════════ */}
      <WhatYouWillGain />

      {/* ═══════════════ WEEKLY RHYTHM — What to Expect ═══════════════ */}
      <WeeklyRhythm />

      {/* ═══════════════ SUPPORT STRIP ═══════════════ */}
      <CostForEligibleLearners />

      {/* ═══════════════ SERVICE CARDS ═══════════════ */}
      <LearnerSupport />

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <WhatYouCouldApplyAtWork />

      {/* ═══════════════ FAQ ═══════════════ */}
      <QuickAnswers />

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <ReadyToAdvanceYourCareerInProjectControls />
    </main>
    <Footer />
  </div>);
}
