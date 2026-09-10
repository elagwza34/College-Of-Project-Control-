import SiteLink from '@/components/base/SiteLink';
import Footer from '@/components/feature/Footer';
import PageSectionNav from '@/components/feature/PageSectionNav';
import SectorPathwayChoice from '@/components/feature/SectorPathwayChoice';
import Hero from './components/Hero';
import Value from './components/Value';
import Applications from './components/Applications';
import Outputs from './components/Outputs';
import Roles from './components/Roles';
import Learning from './components/Learning';
import Experts from './components/Experts';
import Access from './components/Access';
import Eligibility from './components/Eligibility';
import Faq from './components/Faq';
import NextStep from './components/NextStep';

const links = [{"label": "Value", "href": "#value"}, {"label": "Applications", "href": "#applications"}, {"label": "Pathways", "href": "#pathways"}, {"label": "Outputs", "href": "#outputs"}, {"label": "Roles", "href": "#roles"}, {"label": "Learning", "href": "#learning"}, {"label": "Experts", "href": "#experts"}, {"label": "Access", "href": "#access"}, {"label": "Eligibility", "href": "#eligibility"}, {"label": "Faq", "href": "#faq"}];
export default function Page() { return <div className="min-h-screen bg-background-50"><main id="hero"><Hero /><PageSectionNav pageLabel="Engineering & Advanced Manufacturing" links={links} /><Value /><Applications /><SectorPathwayChoice /><Outputs /><Roles /><Learning /><Experts /><Access /><Eligibility /><Faq /><NextStep /></main><Footer /></div>; }
