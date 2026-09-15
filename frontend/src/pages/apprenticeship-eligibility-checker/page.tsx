import Footer from '@/components/feature/Footer';
import ApprenticeshipEligibilityCheckerSection from "./components/ApprenticeshipEligibilityCheckerSection";
import FrequentlyAskedQuestions from "./components/FrequentlyAskedQuestions";
export default function ApprenticeshipEligibilityCheckerPage() {
  return (<div className="min-h-screen bg-background-50">
    <main>
      <ApprenticeshipEligibilityCheckerSection />

      <FrequentlyAskedQuestions />

    </main>
    <Footer />
  </div>);
}
