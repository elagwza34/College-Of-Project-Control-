import SchemaOrg, { courseSchema, faqPageSchema } from '@/components/feature/SchemaOrg';
import Footer from '@/components/feature/Footer';
import RouteFaq from '@/components/feature/RouteLanding/RouteFaq';
import PmoEditorialNavbar from './components/PmoEditorialNavbar';
import PmoEditorialHero from './components/PmoEditorialHero';
import PmoTestimonials from './components/PmoTestimonials';
import PmoJourney from './components/PmoJourney';
import PmoCommercialTeaser from './components/PmoCommercialTeaser';
import PmoClosingHero from './components/PmoClosingHero';
import EventsSection from '@/components/feature/EventsTeaser';
import MeetMentors from '@/components/feature/MeetMentors';
import ProgrammeAccessSections from '@/components/feature/ProgrammeAccessSections';

import TrustStrip from './components/TrustStrip';
import Introduction from './components/Introduction';
import PathwayCta from './components/PathwayCta';
import ProblemSection from './components/ProblemSection';
import ApmRecognition from './components/ApmRecognition';
import EmployerValue from './components/EmployerValue';
import ApprenticeshipExperience from './components/ApprenticeshipExperience';
import Insights from './components/Insights';
import TwoRouteCards from './components/TwoRouteCards';
import RequestConsultationCta from './components/RequestConsultationCta';
import FooterLandscape from './components/FooterLandscape';
import StickyCta from './components/StickyCta';

/* ── Data ─────────────────────────────────────────────────────── */






const faqs = [
  {
    q: 'What is the PMO Route?',
    a: 'The PMO Route is a Project Controls Professional Level 6 apprenticeship route focused on PMO, governance, reporting, assurance, integrated controls and professional standards. It is designed for employed learners with employer support.',
  },
  {
    q: 'Is this page for the apprenticeship route?',
    a: 'Yes. This page primarily describes the apprenticeship PMO Route. A separate Commercial PMO Route is also available for those who prefer direct access without apprenticeship paperwork.',
  },
  {
    q: 'Is apprenticeship funding available?',
    a: 'Apprenticeship funding may be available where employer eligibility, learner suitability and applicable funding rules are met. Funding is not guaranteed and is confirmed during consultation.',
  },
  {
    q: 'What does the apprenticeship route require?',
    a: 'The apprenticeship route requires workplace evidence, portfolio development, progress reviews, off-the-job learning records and employer engagement in the learning process.',
  },
  {
    q: 'What does the PMO Route cover?',
    a: 'The route covers Project Management Office, Project Planning and Control, Risk Quality and Issue Management, and Stakeholder Engagement and Communication.',
  },
  {
    q: 'Is this linked to APM recognition?',
    a: 'Yes. The relevant Level 6 PMO component supports an APM-recognised technical-knowledge route for the ChPP standard, subject to APM requirements.',
  },
  {
    q: 'Does this route automatically make me ChPP?',
    a: 'No. Chartered Project Professional status is awarded only by APM after the candidate meets all applicable professional practice, CPD, ethics and assessment requirements.',
  },
  {
    q: 'What is the difference between the PMO apprenticeship route and the Commercial PMO Route?',
    a: 'The apprenticeship route may be funded where eligible but requires workplace evidence, portfolio development, progress reviews and compliance. The Commercial PMO Route is paid directly and is more flexible with lower administration.',
  },
  {
    q: 'Can employers enrol PMO teams?',
    a: 'Yes. Employers can discuss group delivery for either the apprenticeship route where eligible, or the commercial route for direct purchase.',
  },
  {
    q: 'How do I start?',
    a: 'Book a PMO Route consultation. We will review your role, employer support, funding position and whether the apprenticeship or commercial route is the better fit.',
  },
];

/* ── Page ─────────────────────────────────────────────────────── */

export default function PmoPcp() {
  return (
    <>
      <SchemaOrg type="EducationalOccupationalProgram" data={courseSchema({
        name: 'PMO Route — Project Controls Professional Level 6 Apprenticeship',
        description: 'Build a PMO that leaders trust. A Project Controls Professional Level 6 apprenticeship route for PMO, governance and reporting professionals.',
        occupationalCategory: 'PMO and Governance Project Controls Professional',
      })} />
      <SchemaOrg type="FAQPage" data={faqPageSchema(faqs)} />

      <div className="min-h-screen bg-canvas">
        <main>
          {/* Section 1 — Hero */}
          <PmoEditorialHero />

          <PmoEditorialNavbar />

          {/* Section 2 — Trust Strip */}
          <TrustStrip />

          {/* Section 3 — Introduction */}
          <Introduction />

          {/* Section 4 — Testimonials */}
          <PmoTestimonials />

          {/* Events & Masterclasses */}
          <EventsSection />

          {/* Section 5 — PMO Journey */}
          <PmoJourney />

          {/* Section 6 — Pathway CTA */}
          <PathwayCta />

          {/* Section 7 — Problem Section */}
          <ProblemSection />

          {/* Section 8 — APM Recognition */}
          <ApmRecognition />

          {/* Shared instructor section */}
          <MeetMentors />

          {/* Section 10 — Employer Value */}
          <EmployerValue />

          {/* Section 11 — Apprenticeship Experience */}
          <ApprenticeshipExperience />

          <ProgrammeAccessSections programmeName="Certified PMO Professional Level 6" />

          {/* Section 12 — Commercial Teaser */}
          <PmoCommercialTeaser />

          {/* Section 13 — Insights */}
          <Insights />

          {/* Section 14 — Two Route Cards */}
          <TwoRouteCards />

          {/* Section 15 — Frequently Asked Questions */}
          <RouteFaq heading="PMO Route frequently asked questions" faqs={faqs} />

          {/* Section 16 — Request a consultation CTA */}
          <RequestConsultationCta />

          {/* Section 17 — Closing Hero */}
          <PmoClosingHero />

          {/* Section 18 — Footer Landscape + Footer */}
          <FooterLandscape />
        </main>

        <Footer />

        {/* Sticky CTA */}
        <StickyCta />
      </div>
    </>
  );
}
