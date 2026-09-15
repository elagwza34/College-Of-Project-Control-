import PcpHero from '@/components/feature/PcpHero';
import { heroBadges } from "../campaignData";

/** Section: Commercial access for non-eligible learners. */
export default function CommercialAccessForNonEligibleLearners() {
  return (
    <PcpHero
          tag="Commercial access for non-eligible learners"
          headline="Build Your Project Controls Career Through the Commercial Route"
          headlineHighlight="Commercial Route"
          subheadline="Not eligible for apprenticeship funding? Access structured Level 6 development, expert tutoring and professional progression support through our commercial pathway."
          compactDetails
          contentPosition="lower"
          heroImageUrl="https://readdy.ai/api/search-image?query=Modern%20professional%20workspace%20with%20laptop%2C%20project%20planning%20documents%2C%20digital%20displays%20showing%20Gantt%20charts%2C%20navy%20and%20cream%20interior%2C%20warm%20natural%20lighting%2C%20sophisticated%20home%20office%20meets%20professional%20environment%2C%20clean%20design%2C%20British%20atmosphere%2C%20no%20people%2C%20editorial%20photography%20style&width=1920&height=1080&seq=campaign-commercial-hero&orientation=landscape"
          heroImageAlt="Commercial Route for Project Controls Career"
          primaryCta={{ label: 'Explore the Commercial Route', href: '#commercial-route' }}
          secondaryCta={{ label: 'Speak to an Adviser', href: '/book-a-session' }}
          badges={heroBadges}
          bestFor={['Self-Employed Professionals', 'Career Changers', 'Learners Outside England']}
        />
  );
}
