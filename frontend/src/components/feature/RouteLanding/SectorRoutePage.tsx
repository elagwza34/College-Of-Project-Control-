import { useEffect, useState, type ComponentProps } from 'react';
import Footer from '../Footer';
import StickyCta from '../StickyCta';
import EventsTeaser from '../EventsTeaser';
import SchemaOrg, { courseSchema } from '../SchemaOrg';
import RouteNavbar from './RouteNavbar';
import SectorHero from './SectorHero';
import RouteCapability from './RouteCapability';
import RouteProblems from './RouteProblems';
import RouteProcess from './RouteProcess';
import RouteStats from './RouteStats';
import RouteChoose from './RouteChoose';
import RouteWhoFor from './RouteWhoFor';
import RouteDevelop from './RouteDevelop';
import RouteTestimonials from './RouteTestimonials';
import RouteFinalCta from './RouteFinalCta';
import { fetchSector } from '@/services/sectorsApi';
export interface SectorRouteConfig {
 slug: string; label: string; hero: ComponentProps<typeof SectorHero>; navLinks: ComponentProps<typeof RouteNavbar>['navLinks'];
 capability: ComponentProps<typeof RouteCapability>; problems: ComponentProps<typeof RouteProblems>; process: ComponentProps<typeof RouteProcess>;
 stats: ComponentProps<typeof RouteStats>; choose: ComponentProps<typeof RouteChoose>; whoFor: ComponentProps<typeof RouteWhoFor>;
 develop: ComponentProps<typeof RouteDevelop>; finalCta: ComponentProps<typeof RouteFinalCta>; faq: { heading: string; faqs: { q: string; a: string }[] };
}
export default function SectorRoutePage({ config }: { config: SectorRouteConfig }) {
 const [image, setImage] = useState('');
 // Only imagery is CMS-owned here; route copy belongs to config. A failed optional
 // image request leaves the branded fallback, not a second source of route facts.
 useEffect(() => { let active = true; setImage(''); fetchSector(config.slug).then(item => { if (active) setImage(item.imageUrl); }).catch(() => {}); return () => { active = false; }; }, [config.slug]);
 return <><SchemaOrg type="EducationalOccupationalProgram" data={courseSchema({ name: `${config.label} Project Controls Professional Level 6`, description: config.hero.subheadline, timeToComplete: 'P27M' })} />
 <main><SectorHero {...config.hero} sectorImage={image || '/images/hero-professional.webp'} /><RouteNavbar pageLabel={config.label} navLinks={config.navLinks} />
 <RouteCapability {...config.capability} /><RouteProblems {...config.problems} /><RouteProcess {...config.process} /><RouteStats {...config.stats} /><RouteChoose {...config.choose} /><RouteWhoFor {...config.whoFor} /><RouteDevelop {...config.develop} /><RouteTestimonials /><EventsTeaser /><RouteFinalCta {...config.finalCta} />
 <p className="container-site py-8 text-sm text-foreground-600">Funding and support are subject to eligibility and applicable programme terms. Professional bodies independently determine membership and award requirements; programme completion does not guarantee Chartered status.</p></main><Footer /><StickyCta /></>;
}
