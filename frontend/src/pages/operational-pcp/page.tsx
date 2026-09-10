import SiteLink from '@/components/base/SiteLink';
import Footer from '@/components/feature/Footer';
import PageSectionNav from '@/components/feature/PageSectionNav';
import OperationalEnquiryBar from './OperationalEnquiryBar';

import Hero from './components/Hero';
import Overview from './components/Overview';
import Structure from './components/Structure';
import Modules from './components/Modules';
import Roles from './components/Roles';
import Capability from './components/Capability';
import Evidence from './components/Evidence';
import Eligibility from './components/Eligibility';
import Employer from './components/Employer';
import Funding from './components/Funding';
import Assessment from './components/Assessment';
import Contact from './components/Contact';

// Approved copy: Operational Pathway.txt. Uses the site's existing design tokens and components.
const sectionLinks = [
  {
    "label": "Overview",
    "href": "#operational-overview"
  },
  {
    "label": "Structure",
    "href": "#operational-structure"
  },
  {
    "label": "Modules",
    "href": "#operational-modules"
  },
  {
    "label": "Roles",
    "href": "#operational-roles"
  },
  {
    "label": "Capability",
    "href": "#operational-capability"
  },
  {
    "label": "Evidence",
    "href": "#operational-evidence"
  },
  {
    "label": "Eligibility",
    "href": "#operational-eligibility"
  },
  {
    "label": "Employer",
    "href": "#operational-employer"
  },
  {
    "label": "Funding",
    "href": "#operational-funding"
  },
  {
    "label": "Assessment",
    "href": "#operational-assessment"
  },
  {
    "label": "Contact",
    "href": "#operational-contact"
  }
];

export default function OperationalPcp() {
  return <div className="min-h-screen bg-background-50 pb-24">
    <main id="hero">
      <Hero />
      <PageSectionNav pageLabel="Operational Pathway" links={sectionLinks} ctaLabel="Book an information session" />
      <Overview />
      <Structure />
      <Modules />
      <Roles />
      <Capability />
      <Evidence />
      <Eligibility />
      <Employer />
      <Funding />
      <Assessment />
      <Contact />
    </main>
    <Footer />
    <OperationalEnquiryBar />
  </div>;
}
