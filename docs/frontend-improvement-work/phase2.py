from pathlib import Path
import re
ROOT=Path(__file__).resolve().parents[2]/'frontend'
def write(name,text):
 p=ROOT/name;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(text.strip()+'\n',encoding='utf-8')
write('src/router/navigation.ts', '''
export const destinations = {
  consultation: '/book-a-session', eligibility: '/apprenticeship-eligibility-checker',
  programmes: '/programmes', articles: '/knowledge-hub', events: '/events',
} as const;
const legacyTargets: Record<string, string> = {
  '#consultation': destinations.consultation, '#eligibility': destinations.eligibility,
  '#routes': destinations.programmes, '/employers#process': '/employers#how-it-works',
  '/pcp-master#lead-magnet': '/contact?context=Employer%20guide',
  '/project-controls-professional-level-6#consultation': destinations.consultation,
  '/project-controls-professional-level-6#routes': '/project-controls-professional-level-6#pathways',
  '/project-controls-professional-level-6#proof': '/testimonials',
};
export function resolveDestination(href: string): string {
  if (legacyTargets[href]) return legacyTargets[href];
  if (!href || href === '#') return '/contact';
  if (/^(?:javascript|data|vbscript):/i.test(href.trim())) return '/contact';
  return href;
}
''')
write('src/components/base/SiteLink.tsx', '''
import { forwardRef, type AnchorHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { resolveDestination } from '@/router/navigation';
const SiteLink = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(function SiteLink({ href = '/contact', children, ...props }, ref) {
  const destination = resolveDestination(href);
  const internal = (destination.startsWith('/') && !destination.startsWith('//')) || destination.startsWith('#');
  if (internal && !props.download && !/\\.[a-z0-9]{2,5}(?:[?#]|$)/i.test(destination.split('#')[0])) {
    return <Link ref={ref} to={destination} {...props}>{children}</Link>;
  }
  return <a ref={ref} href={destination} {...props}>{children}</a>;
});
export default SiteLink;
''')
write('src/components/feature/RouteScroll.tsx', '''
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
export default function RouteScroll() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    let observer: MutationObserver | undefined;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const focusTarget = () => {
      if (document.querySelector('.page-loader')) return false;
      let id = 'main-content';
      try { if (hash) id = decodeURIComponent(hash.slice(1)); } catch { return true; }
      const target = document.getElementById(id);
      if (!target) return false;
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      if (hash) target.scrollIntoView({ block: 'start', behavior: 'instant' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
      return true;
    };
    if (!focusTarget()) {
      observer = new MutationObserver(() => { if (focusTarget()) observer?.disconnect(); });
      observer.observe(document.body, { childList: true, subtree: true });
      timeout = setTimeout(() => observer?.disconnect(), 10000);
    }
    return () => { observer?.disconnect(); clearTimeout(timeout); };
  }, [pathname, hash, key]);
  return null;
}
''')
# Repair known obsolete literals in both data and markup; preserve valid local sections.
replacements={'/employers#process':'/employers#how-it-works','/pcp-master#lead-magnet':'/contact?context=Employer%20guide','/project-controls-professional-level-6#consultation':'/book-a-session','/project-controls-professional-level-6#routes':'/project-controls-professional-level-6#pathways','/project-controls-professional-level-6#proof':'/testimonials'}
for p in (ROOT/'src').rglob('*.tsx'):
 if p.name=='SiteLink.tsx':continue
 s=p.read_text(encoding='utf-8')
 for a,b in replacements.items():s=s.replace(a,b)
 for anchor,path in {'#consultation':'/book-a-session','#eligibility':'/apprenticeship-eligibility-checker','#routes':'/programmes'}.items():
  s=s.replace('"'+anchor+'"','"'+path+'"').replace("'"+anchor+"'","'"+path+"'")
 # Public navigation uses one link adapter; dashboard already uses router links.
 if 'dashboard' not in p.parts and re.search(r'<a\b',s):
  s=re.sub(r'<a\b','<SiteLink',s).replace('</a>','</SiteLink>')
  s="import SiteLink from '@/components/base/SiteLink';\n"+s
 p.write_text(s,encoding='utf-8')
p=ROOT/'src/router/index.tsx';s=p.read_text(encoding='utf-8');s="import RouteScroll from '@/components/feature/RouteScroll';\n"+s
s=re.sub(r"  useEffect\(\(\) => \{\s*window.scrollTo\(.*?\n  \}, \[location.pathname\]\);",'',s,flags=re.S)
s=s.replace('<SeoManager />','<SeoManager /><RouteScroll />')
p.write_text(s,encoding='utf-8')
write('src/dashboard/pages/ContentOwnershipPage.tsx', '''
import { Link } from 'react-router-dom';
const resources = [
 ['Mentors', 'mentors', 'Mentor cards and individual public profiles'],
 ['Coaching and support', 'coaches', 'Coach profiles in the shared support section'],
 ['Partners', 'partners', 'Approved partner logos on the home page'],
 ['Sectors', 'sectors', 'Home/PCP sector cards and sector-page photography'],
 ['Certificates', 'professional-credentials', 'Shared professional recognition section'],
 ['Events', 'events', 'Public event listing'],
 ['Media', 'media', 'Assets referenced by the CMS-managed records above'],
];
export default function ContentOwnershipPage() {
 return <div><h1 className="text-3xl">Content ownership</h1><p className="mt-4 max-w-3xl">The public site combines code-managed programme information with the CMS-managed collections listed below. Each has a single editing source.</p>
 <h2 className="mt-8 text-2xl">Managed in this dashboard</h2><div className="mt-4 grid gap-4 md:grid-cols-2">{resources.map(([name, path, scope]) => <Link key={path} to={`/dashboard/${path}`} className="card-premium p-5"><h3 className="text-lg">{name}</h3><p className="mt-2 text-sm text-foreground-600">{scope}</p></Link>)}</div>
 <h2 className="mt-8 text-2xl">Managed in application code</h2><p className="mt-4 max-w-3xl">All other blocks: page layouts, programme facts, pathway and campaign copy, navigation, SEO, FAQs, funding explanations, article content, example scenarios, and legal notices. Ask the website maintainer to update these. Publishing legacy page or navigation records does not update this application, so those editing controls are no longer exposed here.</p>
 <p className="mt-5 max-w-3xl">Before activating partner or credential records, confirm the description, permission to display the image, and the relationship or recognition being described. A displayed logo must not imply an unapproved endorsement or guaranteed award.</p></div>;
}
''')
p=ROOT/'src/dashboard/DashboardApp.tsx';s=p.read_text(encoding='utf-8')
for name in ['PageEditorPage','PagesListPage','NavigationPage']:s=re.sub(rf"import {name} from .*?;\n",'',s)
s="import ContentOwnershipPage from './pages/ContentOwnershipPage';\n"+s
for path in ['pages','pages/:id','home','navigation']:
 s=re.sub(r'<Route path="'+path+r'" element=\{.*?\} />',f'<Route path="{path}" element={{<ContentOwnershipPage />}} />',s)
s=s.replace('<Route path="media"','<Route path="content" element={<ContentOwnershipPage />} />\n        <Route path="media"')
p.write_text(s,encoding='utf-8')
p=ROOT/'src/dashboard/layout/DashboardLayout.tsx';s=p.read_text(encoding='utf-8')
s=s.replace("{ to: '/dashboard/pages', label: 'Pages'", "{ to: '/dashboard/content', label: 'Content ownership'")
s=re.sub(r"  \{ to: '/dashboard/navigation'.*?\n",'',s)
p.write_text(s,encoding='utf-8')
print('Phase 2: shared links, anchor lifecycle and CMS ownership controls implemented.')
