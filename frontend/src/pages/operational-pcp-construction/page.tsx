import SiteLink from '@/components/base/SiteLink';
import Footer from '@/components/feature/Footer';
import PageSectionNav from '@/components/feature/PageSectionNav';
import SectorPathwayChoice from '@/components/feature/SectorPathwayChoice';
import Hero from './components/Hero';
import OneFoundation from './components/OneFoundation';
import Challenge from './components/Challenge';
import Access from './components/Access';
import Ai from './components/Ai';
import Applications from './components/Applications';
import Outputs from './components/Outputs';
import Roles from './components/Roles';
import Maturity from './components/Maturity';
import Experts from './components/Experts';
import LearningApproach from './components/LearningApproach';
import Eligibility from './components/Eligibility';
import ApmCrossLink from './components/ApmCrossLink';
import Faq from './components/Faq';
import NextStep from './components/NextStep';

const links = [{"label": "Challenge", "href": "#challenge"}, {"label": "Pathways", "href": "#pathways"}, {"label": "Access", "href": "#access"}, {"label": "Applications", "href": "#applications"}, {"label": "Outputs", "href": "#outputs"}, {"label": "Roles", "href": "#roles"}, {"label": "Experts", "href": "#experts"}, {"label": "Eligibility", "href": "#eligibility"}, {"label": "Faq", "href": "#faq"}];
export default function Page() { return <div className="min-h-screen bg-background-50"><main id="hero"><Hero /><PageSectionNav pageLabel="Construction & Infrastructure" links={links} /><OneFoundation /><Challenge /><SectorPathwayChoice /><Access /><Ai /><Applications /><Outputs /><Roles /><Maturity /><Experts /><LearningApproach /><Eligibility /><ApmCrossLink /><Faq /><NextStep /></main><Footer /></div>; }
