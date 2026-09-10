import Footer from '@/components/feature/Footer';
import StickyCta from '@/components/feature/StickyCta';
import SchemaOrg, { courseSchema, faqPageSchema } from '@/components/feature/SchemaOrg';
import RouteNavbar from '@/components/feature/RouteLanding/RouteNavbar';
import RouteHero from '@/components/feature/RouteLanding/RouteHero';
import RouteCapability from '@/components/feature/RouteLanding/RouteCapability';
import RouteProblems from '@/components/feature/RouteLanding/RouteProblems';
import RouteProcess from '@/components/feature/RouteLanding/RouteProcess';
import RouteStats from '@/components/feature/RouteLanding/RouteStats';
import RouteChoose from '@/components/feature/RouteLanding/RouteChoose';
import RouteWhoFor from '@/components/feature/RouteLanding/RouteWhoFor';
import RouteDevelop from '@/components/feature/RouteLanding/RouteDevelop';
import RouteTestimonials from '@/components/feature/RouteLanding/RouteTestimonials';
import RouteFinalCta from '@/components/feature/RouteLanding/RouteFinalCta';
import RouteFaq from '@/components/feature/RouteLanding/RouteFaq';
import EventsSection from '@/components/feature/EventsTeaser';

import RequestConsultationCta from './components/RequestConsultationCta';
import ComplianceNote from './components/ComplianceNote';
import { navLinks, heroData, capabilityData, problemsData, processData, statsData, chooseData, whoForData, developData, finalCtaData, faqData } from './routeData';

export default function StrategicOperationalPcp() {
  return (
    <>
      <SchemaOrg type="EducationalOccupationalProgram" data={courseSchema({
        name: 'Strategic + Operational Project Controls Professional Level 6 Route with OTHM Level 7 Diploma',
        description: 'A premium combined pathway combining Level 6 project controls capability with strategic leadership development and OTHM Level 7 Diploma progression. Funding subject to eligibility.',
        occupationalCategory: 'Strategic and Operational Project Controls Professional',
      })} />
      <SchemaOrg type="FAQPage" data={faqPageSchema(faqData.faqs)} />

      <div className="min-h-screen bg-background-50">
        <main>
          <RouteHero {...heroData} />
          <RouteNavbar pageLabel="Combined" navLinks={navLinks} />
          <RouteCapability {...capabilityData} />
          <RouteProblems {...problemsData} />
          <RouteProcess {...processData} />
          <RouteStats {...statsData} />
          <RouteChoose {...chooseData} />
          <RouteWhoFor {...whoForData} />
          <RouteDevelop {...developData} />
          <RouteTestimonials />
          <EventsSection />
          <RouteFinalCta {...finalCtaData} />
          <RequestConsultationCta />
          <RouteFaq {...faqData} />
          <ComplianceNote />
        </main>
        <Footer />
        <StickyCta />
      </div>
    </>
  );
}
