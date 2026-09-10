import OutcomeExamples from '@/components/feature/OutcomeExamples';
import Footer from '@/components/feature/Footer';
import PcpHero from '@/components/feature/PcpHero';
import PcpFundingStrip from '@/components/feature/PcpFundingStrip';
import PcpPainPointsGrid from '@/components/feature/PcpPainPointsGrid';
import PcpFaqSection from '@/components/feature/PcpFaqSection';
import PcpComplianceNote from '@/components/feature/PcpComplianceNote';
import StickyCta from '@/components/feature/StickyCta';
import CampaignTransformation from '@/components/feature/CampaignTransformation';
import CampaignRouteFit from '@/components/feature/CampaignRouteFit';
import CapabilityTracks from '@/pages/pcp-master/components/CapabilityTracks';
import EventsSection from '@/components/feature/EventsTeaser';

import KeyMessage from './components/KeyMessage';
import LeadForm from './components/LeadForm';

import { heroBadges, painPoints, beforeItems, afterItems, routeFitCards, employerBenefits, faqs } from './campaignData';

export default function CampaignHrEmployer() {
  return (
    <div className="min-h-screen bg-background-50">
      <main>
        <PcpHero
          tag="For HR Directors, L&amp;D Managers &amp; Employers"
          headline="Use Apprenticeship Funding to Build Project Controls Capability Your Business Can Actually Measure"
          subheadline="A Level 6 Project Controls Professional pathway where eligible, designed to help employers develop planning, cost, risk, reporting, governance and PMO capability across project-driven teams."
          description="Stop stretching training budgets for generic courses that do not produce workplace evidence. Build measurable project controls capability using Department for Education funding."
          fundingLine="Apprenticeship funding may be available, subject to current eligibility rules. Department for Education funding band up to £27,000 for eligible employers in England. Delivered by Kent Business College."
          heroImageUrl="https://readdy.ai/api/search-image?query=Modern%20professional%20corporate%20learning%20environment%20with%20warm%20lighting%2C%20navy%20and%20gold%20accents%2C%20abstract%20geometric%20architecture%2C%20executive%20meeting%20space%2C%20British%20B2B%20atmosphere%2C%20clean%20lines%2C%20sophisticated%20interior%20design%2C%20no%20people%2C%20editorial%20photography%20style&width=1920&height=1080&seq=campaign-hr-employer-hero&orientation=landscape"
          heroImageAlt="Use Apprenticeship Funding to Build Project Controls Capability"
          primaryCta={{ label: 'Check Funding Availability', href: '#lead-form' }}
          secondaryCta={{ label: 'Request an employer consultation', href: '#lead-form' }}
          badges={heroBadges}
          urgencyMessage="Limited KBC-funded support available — secure your place before the current support allocation closes."
          bestFor={['HR Directors', 'L&D Managers', 'Talent Development Managers', 'Operations Directors']}
          sectors={['Construction', 'Energy', 'Public Sector', 'Engineering', 'Aerospace', 'Infrastructure', 'Consultancy']}
        />

        <PcpFundingStrip />

        <PcpPainPointsGrid
          title="Common Employer Challenges"
          subtitle="The problems that drive HR and L&amp;D teams to look beyond traditional training."
          painPoints={painPoints}
        />

        <CampaignTransformation
          title="Traditional Training vs Funded Professional Development"
          subtitle="The difference between spending your training budget and building measurable organisational capability."
          beforeTitle="Traditional Training"
          afterTitle="College of Project Controls Pathway"
          beforeItems={beforeItems}
          afterItems={afterItems}
        />

        <CampaignRouteFit
          tag="Route Fit"
          title="Which Route Fits Your Team?"
          subtitle="Select the route that matches the roles, sectors and capability goals of your organisation."
          routes={routeFitCards}
        />

        {/* APM ChPP Readiness */}
        <KeyMessage />

        <CapabilityTracks />

        {/* Employer Benefit Cards */}
        

        {/* Testimonial */}
        <OutcomeExamples />

        <EventsSection ctaHref="#lead-form" />

        {/* Lead Form */}
        <LeadForm />

        <PcpFaqSection faqs={faqs} />

        <PcpComplianceNote />
      </main>
      <StickyCta />
      <Footer />
    </div>
  );
}
