import Footer from '@/components/feature/Footer';
import ProgrammesHero from './components/ProgrammesHero';
import ProgrammeFeatures from './components/ProgrammeFeatures';
import ProgrammeComparison from './components/ProgrammeComparison';
import ProgrammeVsModule from './components/ProgrammeVsModule';
import HowToChoose from './components/HowToChoose';
import EmployerSection from './components/EmployerSection';
import ProfessionalRecognitionSection from '@/components/feature/ProfessionalRecognitionSection';
import MeetMentors from '@/components/feature/MeetMentors';
import EventsSection from '@/components/feature/EventsTeaser';
import ProgrammesFaq from './components/ProgrammesFaq';

export default function Programmes() {
  return (
    <div className="min-h-screen bg-background-50">
      <main>
        <ProgrammesHero />
        <ProgrammeFeatures />
        <ProgrammeComparison />
        <div className="section-divider" />
        <ProgrammeVsModule />
        <HowToChoose />
        
        <EmployerSection />
        <ProfessionalRecognitionSection />
        <div className="section-divider" />
        <MeetMentors />
        <EventsSection />
        
        <ProgrammesFaq />
      </main>
      <Footer />
    </div>
  );
}
