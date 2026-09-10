import SiteLink from '@/components/base/SiteLink';
import Footer from '@/components/feature/Footer';
import PageSectionNav from '@/components/feature/PageSectionNav';
import Hero from './components/Hero';
import Challenge from './components/Challenge';
import Pathways from './components/Pathways';
import Capability from './components/Capability';
import Governance from './components/Governance';
import Careers from './components/Careers';
import Delivery from './components/Delivery';
import WorkplaceEvidence from './components/WorkplaceEvidence';
import Employers from './components/Employers';
import CareerSupport from './components/CareerSupport';
import Eligibility from './components/Eligibility';
import NextStep from './components/NextStep';

const links = [{"label": "Challenge", "href": "#challenge"}, {"label": "Programmes", "href": "#pathways"}, {"label": "Capability", "href": "#capability"}, {"label": "Governance", "href": "#governance"}, {"label": "Careers", "href": "#careers"}, {"label": "Delivery", "href": "#delivery"}, {"label": "Funding", "href": "#employers"}, {"label": "FAQ", "href": "#eligibility"}];
export default function Page() { return <div className="min-h-screen bg-background-50"><main id="hero"><Hero /><PageSectionNav pageLabel="Public Sector" links={links} /><Challenge /><Pathways /><Capability /><Governance /><Careers /><Delivery /><WorkplaceEvidence /><Employers /><CareerSupport /><Eligibility /><NextStep /></main><Footer /></div>; }
