import Footer from '@/components/feature/Footer';
import CapabilityStrip from '@/components/feature/CapabilityStrip';


import Hero from './components/Hero';
import Identity from './components/Identity';
import Principles from './components/Principles';
import Capability from './components/Capability';
import LearningModel from './components/LearningModel';
import Audiences from './components/Audiences';
import ClosingCta from './components/ClosingCta';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background-50">
      <main>
        <Hero />

        <CapabilityStrip />

        <Identity />

        <Principles />

        <Capability />

        <LearningModel />

        <Audiences />

        <ClosingCta />
      </main>
      <Footer />
    </div>
  );
}
