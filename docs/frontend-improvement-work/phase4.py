from pathlib import Path
import re
ROOT=Path(__file__).resolve().parents[2]/'frontend'
def write(name,text):
 p=ROOT/name;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(text.strip()+'\n',encoding='utf-8')
p=ROOT/'src/index.css';s=p.read_text(encoding='utf-8')
a=s.index(':root {');b=s.index('@layer base',a)
palette=s[a:b];palette=palette[:palette.index('.dark {')]
palette+='''
:root {
  --color-canvas: #F5F8F9;
  --color-surface: #FFFFFF;
  --color-ink: #1F2933;
  --color-muted: #4B606E;
  --color-border: #DCE5E8;
  --color-primary: #123B4A;
  --color-secondary: #1F5F73;
  --color-accent: #3FA7A3;
  --color-action: #FFA953;
  --color-ipc-surface: #080D10;
  --color-ipc-gold: #D8B36E;
  --color-ipc-ink: #9C6813;
  --color-error: #B91C1C;
  --color-success: #15803D;
  --color-warning: #92400E;
  --radius-control: 6px;
  --radius-card: 12px;
  --radius-panel: 16px;
  --shadow-card: 0 8px 24px -16px rgb(18 59 74 / .2);
  --shadow-overlay: 0 24px 64px -16px rgb(18 59 74 / .24);
  --header-height: 112px;
  --section-nav-height: 56px;
  --section-space: 4rem;
  --page-gutter: 1rem;
}
@media (min-width: 768px) { :root { --section-space: 6rem; --page-gutter: 1.5rem; } }
'''
write('src/styles/tokens.css',palette)
s="@import './styles/tokens.css';\n"+s[:a]+s[b:]
a=s.index('/* Unified CTA identity:');b=s.index('/* Shared hero treatment:',a);s=s[:a]+s[b:]
a=s.index('/* Guarantees a temporary image');b=s.index('@layer components {',a);s=s[:a]+s[b:]
s=s.replace('scroll-margin-top: 144px;', 'scroll-margin-top: calc(var(--header-height) + var(--section-nav-height) + 16px);')
s=s.replace('scroll-behavior: smooth;', 'scroll-behavior: auto;')
s=s.replace('rounded-xl border border-background-200/80 shadow-[0_18px_50px_-32px_rgba(15,23,42,0.35)]','rounded-xl border border-background-200/80 shadow-card')
s+='''
@layer components {
  .section-space { padding-block: var(--section-space); }
  .btn-secondary { @apply inline-flex min-h-12 items-center justify-center rounded-md border border-current px-6 py-3 text-sm font-semibold; }
  .card-editorial { border-radius: var(--radius-card); }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; scroll-behavior: auto !important; }
  .reveal-fade-up, .reveal-blur-in, .reveal-scale-in { opacity: 1; transform: none; filter: none; }
}
'''
p.write_text(s,encoding='utf-8')
p=ROOT/'tailwind.config.ts';s=p.read_text(encoding='utf-8')
s=re.sub(r'oklch\(var\(--highlight-(\d+)\) / <alpha-value>\)',r'rgb(var(--signal-\1) / <alpha-value>)',s)
s=s.replace('colors: {', '''colors: {
          surface: 'var(--color-surface)', canvas: 'var(--color-canvas)', ink: 'var(--color-ink)', muted: 'var(--color-muted)',
          'ipc-gold': 'var(--color-ipc-gold)', 'ipc-surface': 'var(--color-ipc-surface)', 'ipc-ink': 'var(--color-ipc-ink)',
          status: { error: 'var(--color-error)', success: 'var(--color-success)', warning: 'var(--color-warning)' },''',1)
s=s.replace('fontSize: {', '''borderRadius: { md: 'var(--radius-control)', xl: 'var(--radius-card)', '2xl': 'var(--radius-panel)' },
        boxShadow: { card: 'var(--shadow-card)', overlay: 'var(--shadow-overlay)' },
        fontSize: {
          display: ['clamp(2.25rem, 1.5rem + 3vw, 4rem)', { lineHeight: '1.08', fontWeight: '700' }],''',1)
p.write_text(s,encoding='utf-8')
# Consolidate static utility usages at their components, instead of global class-substring overrides.
colors={'#1F2933':'ink','#F5F8F9':'canvas','#FFFFFF':'surface','#123B4A':'primary-500','#1F5F73':'secondary-500','#D6A85F':'ipc-gold','#D8B36E':'ipc-gold','#9C6813':'ipc-ink','#080D10':'ipc-surface','#DCE5E8':'background-200'}
for p in (ROOT/'src').rglob('*.tsx'):
 s=p.read_text(encoding='utf-8')
 for color,token in colors.items():s=s.replace('['+color+']',token)
 for size in ['9px','10px','11px','14px']:s=s.replace('text-['+size+']','text-xs')
 for size in ['15px','0.9375rem']:s=s.replace('text-['+size+']','text-sm')
 for size in ['34px','42px','44px','2.75rem']:s=s.replace('text-['+size+']','text-4xl')
 s=s.replace('text-[64px]','text-display').replace('text-[56px]','text-5xl').replace('text-[16px]','text-base')
 s=s.replace('text-foreground-500','text-foreground-600').replace('md:mb-18','md:mb-16')
 # Explicit static filled actions. Dynamic selected-state classes remain state-specific.
 def action(m):
  prefix,classes=m.groups();words=classes.split()
  if not any(x in words for x in ['bg-primary-500','bg-signal-500','bg-highlight-500']):return m[0]
  words=[x for x in words if not re.match(r'^(?:bg-(?:primary|signal|highlight)-500|hover:bg-\S+|text-(?:white|background-50|primary-950)|rounded-(?:full|lg|xl|md)|shadow-\S+)$',x)]
  return prefix+'btn-primary '+' '.join(words)+'"'
 s=re.sub(r'(<(?:SiteLink|button)\b[^>]*?className=")([^"\n]*)"',action,s)
 s=re.sub(r'shadow-\[[^\]]+\]','shadow-card',s)
 # Actual lower-page media should not compete with hero requests.
 def lazy(m):
  tag=m[0]
  return tag if 'loading=' in tag or 'fetchPriority=' in tag else tag.replace('<img','<img loading="lazy" decoding="async"',1)
 s=re.sub(r'<img\b[^>]*?/?>',lazy,s)
 p.write_text(s,encoding='utf-8')
write('src/components/feature/EventsTeaser.tsx', '''
import SiteLink from '@/components/base/SiteLink';
export default function EventsTeaser({ ctaHref = '/book-a-session' }: { ctaHref?: string }) {
 return <section id="events" className="section-space bg-background-100"><div className="container-site"><h2 className="text-3xl">Meet the people behind the programmes</h2><p className="mt-4 max-w-2xl text-foreground-600">Explore professional events or discuss the learning that suits your responsibilities.</p><div className="mt-8 grid gap-6 md:grid-cols-2">
 <article className="card-premium p-6 md:p-8"><h3 className="text-xl">Events and masterclasses</h3><p className="mt-4 text-foreground-600">Find topics, formats and registration information in the College's event listing.</p><SiteLink href="/events" className="btn-primary mt-6">Explore events</SiteLink></article>
 <article className="rounded-xl bg-primary-700 p-6 text-white md:p-8"><h3 className="text-xl text-white">Discuss your programme options</h3><p className="mt-4">Tell us about your role, your organisation and the capability you want to develop.</p><SiteLink href={ctaHref} className="btn-primary mt-6">Request a consultation</SiteLink></article>
 </div></div></section>;
}
''')
# Call sites now import the shared component directly (old files are removed only in cleanup).
for p in (ROOT/'src').rglob('*.tsx'):
 s=p.read_text(encoding='utf-8')
 s=re.sub(r"import (EventsSection|EventsConsultation) from ['\"][^'\"]*(?:/EventsSection|/EventsConsultation)['\"];",r"import \1 from '@/components/feature/EventsTeaser';",s)
 p.write_text(s,encoding='utf-8')
write('src/components/feature/RouteLanding/SectorRoutePage.tsx', '''
import { useEffect, useState, type ComponentProps } from 'react';
import Footer from '../Footer';
import StickyCta from '../StickyCta';
import EventsTeaser from '../EventsTeaser';
import SchemaOrg, { courseSchema, faqPageSchema } from '../SchemaOrg';
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
import RouteFaq from './RouteFaq';
import { fetchSector } from '@/services/sectorsApi';
export interface SectorRouteConfig {
 slug: string; label: string; hero: ComponentProps<typeof SectorHero>; navLinks: ComponentProps<typeof RouteNavbar>['navLinks'];
 capability: ComponentProps<typeof RouteCapability>; problems: ComponentProps<typeof RouteProblems>; process: ComponentProps<typeof RouteProcess>;
 stats: ComponentProps<typeof RouteStats>; choose: ComponentProps<typeof RouteChoose>; whoFor: ComponentProps<typeof RouteWhoFor>;
 develop: ComponentProps<typeof RouteDevelop>; testimonials: ComponentProps<typeof RouteTestimonials>; finalCta: ComponentProps<typeof RouteFinalCta>; faq: ComponentProps<typeof RouteFaq>;
}
export default function SectorRoutePage({ config }: { config: SectorRouteConfig }) {
 const [image, setImage] = useState('');
 // Only imagery is CMS-owned here; route copy belongs to config. A failed optional
 // image request leaves the branded fallback, not a second source of route facts.
 useEffect(() => { let active = true; setImage(''); fetchSector(config.slug).then(item => { if (active) setImage(item.imageUrl); }).catch(() => {}); return () => { active = false; }; }, [config.slug]);
 return <><SchemaOrg type="EducationalOccupationalProgram" data={courseSchema({ name: `${config.label} Project Controls Professional Level 6`, description: config.hero.subheadline, timeToComplete: 'P27M' })} /><SchemaOrg type="FAQPage" data={faqPageSchema(config.faq.faqs)} />
 <main><SectorHero {...config.hero} sectorImage={image || '/images/hero-professional.webp'} /><RouteNavbar pageLabel={config.label} navLinks={config.navLinks} />
 <RouteCapability {...config.capability} /><RouteProblems {...config.problems} /><RouteProcess {...config.process} /><RouteStats {...config.stats} /><RouteChoose {...config.choose} /><RouteWhoFor {...config.whoFor} /><RouteDevelop {...config.develop} /><RouteTestimonials {...config.testimonials} /><EventsTeaser /><RouteFinalCta {...config.finalCta} /><RouteFaq {...config.faq} />
 <p className="container-site py-8 text-sm text-foreground-600">Funding and support are subject to eligibility and applicable programme terms. Professional bodies independently determine membership and award requirements; programme completion does not guarantee Chartered status.</p></main><Footer /><StickyCta /></>;
}
''')
for dirname in ['operational-pcp-construction','operational-pcp-engineering','operational-pcp-public-sector','operational-pcp-energy']:
 p=ROOT/f'src/pages/{dirname}/page.tsx';s=p.read_text(encoding='utf-8')
 slug=re.search(r"fetchSector\('([^']+)'\)",s)[1];label=re.search(r'<RouteNavbar pageLabel="([^"]+)"',s)[1]
 data=s[s.index('const navLinks ='):s.index('export default function')]
 keys={'hero':'heroData','capability':'capabilityData','problems':'problemsData','process':'processData','stats':'statsData','choose':'chooseData','whoFor':'whoForData','develop':'developData','testimonials':'testimonialsData','finalCta':'finalCtaData','faq':'faqData'}
 config="export const sectorConfig = { slug: '"+slug+"', label: '"+label+"', navLinks, "+', '.join(k+': '+v for k,v in keys.items())+' } satisfies SectorRouteConfig;'
 write(f'src/pages/{dirname}/sectorData.ts',"import type { SectorRouteConfig } from '@/components/feature/RouteLanding/SectorRoutePage';\n"+data+config)
 write(f'src/pages/{dirname}/page.tsx',"import SectorRoutePage from '@/components/feature/RouteLanding/SectorRoutePage';\nimport { sectorConfig } from './sectorData';\nexport default function Page() { return <SectorRoutePage config={sectorConfig} />; }")
print('Phase 4: tokens, explicit actions, typography, event and sector consolidation implemented.')
