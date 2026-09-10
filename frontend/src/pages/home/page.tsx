import ArticlesSection from '@/components/feature/ArticlesSection';
import TestimonialsSection from '@/components/feature/TestimonialsSection';
import Footer from '@/components/feature/Footer';
import ProgrammeAccessSections from '@/components/feature/ProgrammeAccessSections';
import CoachingSupport from '@/components/feature/CoachingSupport';
import CompactHero from './components/CompactHero';
import ProgrammeCards from './components/ProgrammeCards';
import MeetMentors from '@/components/feature/MeetMentors';
import ForEmployers from './components/ForEmployers';
import SpecialistModules from './components/SpecialistModules';
import ProfessionalPathwaysSection from '@/components/feature/ProfessionalPathwaysSection';
import SectorPathways from './components/SectorPathways';
import ProfessionalRecognitionSection from '@/components/feature/ProfessionalRecognitionSection';
import PremiumMarquee from './components/PremiumMarquee';
import EventsConsultation from '@/components/feature/EventsTeaser';

export default function Home() {
  return (
    <div className="min-h-screen bg-background-50">
      <main>
        {/* Hero */}
        <CompactHero />

        {/* Trusted */}
        <PremiumMarquee />

        {/* Programmes */}
        <ProgrammeCards />
        <div className="section-divider" />
        <SpecialistModules />
        

        {/* Professional Pathways */}
        <ProfessionalPathwaysSection />

        {/* Sectors */}
        <SectorPathways />

        

        {/* Funding + Eligibility + IPC: shared and always kept together */}
        <ProgrammeAccessSections programmeName="one of our professional programmes" />
        {/* For Employers */}
        <ForEmployers />

        {/* Our Experts */}
        <MeetMentors />
        <CoachingSupport />
        <EventsConsultation />

        <ArticlesSection id="articles" />
        <TestimonialsSection id="testimonials" />
        
        

        {/* Shared recognition section — immediately above the footer */}
        <ProfessionalRecognitionSection />
      </main>
      <Footer />
    </div>
  );
}
