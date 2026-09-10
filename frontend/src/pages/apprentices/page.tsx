import OutcomeExamples from '@/components/feature/OutcomeExamples';
import Footer from '@/components/feature/Footer';

import Hero from './components/Hero';
import CareerJourney from './components/CareerJourney';
import Benefits from './components/Benefits';
import WeeklyRhythm from './components/WeeklyRhythm';
import SupportStrip from './components/SupportStrip';
import ServiceCards from './components/ServiceCards';
import Faq from './components/Faq';
import FinalCta from './components/FinalCta';

export default function ApprenticesPage() {
  return (
    <div className="min-h-screen bg-background-50">
      <main>
        {/* ═══════════════ HERO — Full Background Image ═══════════════ */}
        <Hero />

        {/* ═══════════════ CAREER JOURNEY — Timeline ═══════════════ */}
        <CareerJourney />

        {/* ═══════════════ BENEFITS — 3-Column Grid ═══════════════ */}
        <Benefits />

        {/* ═══════════════ WEEKLY RHYTHM — What to Expect ═══════════════ */}
        <WeeklyRhythm />

        {/* ═══════════════ SUPPORT STRIP ═══════════════ */}
        <SupportStrip />

        {/* ═══════════════ SERVICE CARDS ═══════════════ */}
        <ServiceCards />

        {/* ═══════════════ TESTIMONIALS ═══════════════ */}
        <OutcomeExamples />

        {/* ═══════════════ FAQ ═══════════════ */}
        <Faq />

        {/* ═══════════════ FINAL CTA ═══════════════ */}
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
