from pathlib import Path
import re
ROOT=Path(__file__).resolve().parents[2]/'frontend'
def write(name,text):
 p=ROOT/name;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(text.strip()+'\n',encoding='utf-8')
write('src/hooks/useCollection.ts', '''
import { useCallback, useEffect, useState } from 'react';
export default function useCollection<T>(fetchItems: () => Promise<T[]>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [revision, setRevision] = useState(0);
  const retry = useCallback(() => setRevision(value => value + 1), []);
  useEffect(() => {
    let current = true;
    setLoading(true); setError('');
    fetchItems().then(data => {
      if (!Array.isArray(data)) throw new Error('Invalid collection response');
      if (current) setItems(data);
    }).catch(() => { if (current) setError('This information could not be loaded.'); })
      .finally(() => { if (current) setLoading(false); });
    return () => { current = false; };
  }, [fetchItems, revision]);
  return { items, loading, error, retry };
}
''')
write('src/components/base/CollectionState.tsx', '''
export default function CollectionState({ label, id, loading, error, retry }: { label: string; id?: string; loading: boolean; error: string; retry: () => void }) {
 return <section id={id} className="container-site py-10" aria-label={label}>
 <p role={error ? 'alert' : 'status'}>{loading ? `Loading ${label.toLowerCase()}…` : error || `No ${label.toLowerCase()} are currently listed.`}</p>
 {error && <button type="button" onClick={retry} className="btn-primary mt-4">Try again</button>}</section>;
}
''')
configs=[('components/feature/MeetMentors.tsx','mentors','Mentor','fetchMentors','Mentors','mentors'),('components/feature/CoachingSupport.tsx','coaches','Coach','fetchCoaches','Coaches','coaching-support'),('pages/home/components/SectorPathways.tsx','sectors','Sector','fetchSectors','Sectors','sectors')]
for file,var,typ,fetch,label,anchor in configs:
 p=ROOT/'src'/file;s=p.read_text(encoding='utf-8')
 s=f"import useCollection from '@/hooks/useCollection';\nimport CollectionState from '@/components/base/CollectionState';\n"+s
 s=re.sub(rf'  const \[{var}, set\w+\] = useState<{typ}\[\]>\(\[\]\);',f'  const {{ items: {var}, loading, error, retry }} = useCollection({fetch});',s)
 s=re.sub(rf'  useEffect\(\(\) => \{{\s*{fetch}\(\).*?\n  \}}, \[\]\);','',s,flags=re.S)
 s=s.replace(f'if ({var}.length === 0) return null;',f'if (loading || error || {var}.length === 0) return <CollectionState id="{anchor}" label="{label}" loading={{loading}} error={{error}} retry={{retry}} />;')
 if var=='mentors':
  a=s.index('        {/* Auto-scrolling carousel */}');b=s.index('        {/* Bottom CTA */}',a)
  s=s[:a]+'''        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{mentors.map(mentor => <MentorCard key={mentor.id} mentor={mentor} />)}</div>\n'''+s[b:]
  s=s.replace('w-[300px] shrink-0 sm:w-[340px]','w-full min-w-0')
  s=re.sub(r'function MentorSet\(.*?\n}\n','',s,flags=re.S)
 if var=='sectors':s=s.replace("sector.linkUrl || '#'","sector.linkUrl || '/programmes'")
 p.write_text(s,encoding='utf-8')
write('src/pages/home/components/PremiumMarquee.tsx', '''
import useCollection from '@/hooks/useCollection';
import CollectionState from '@/components/base/CollectionState';
import SiteLink from '@/components/base/SiteLink';
import { fetchPartners } from '@/services/partnersApi';
export default function PartnerLogos() {
 const { items, loading, error, retry } = useCollection(fetchPartners);
 if (loading || error || !items.length) return <CollectionState label="Partner profiles" loading={loading} error={error} retry={retry} />;
 const partners = items.filter((item, index) => item.imageUrl && items.findIndex(other => other.imageUrl === item.imageUrl) === index);
 return <section className="border-y border-background-200 bg-white py-6" aria-label="Partner profiles"><div className="container-site"><h2 className="text-lg">Professional connections</h2><p className="mt-2 text-sm text-foreground-600">Explore the organisations listed by the College. Programme recognition and awards are subject to the relevant body's requirements.</p><div className="mt-5 flex flex-wrap gap-6">{partners.map(partner => {
 const logo = <img src={partner.imageUrl} alt={partner.name} loading="lazy" decoding="async" width={144} height={64} className="h-16 w-36 object-contain" />;
 return partner.linkUrl ? <SiteLink key={partner.id} href={partner.linkUrl} aria-label={partner.name}>{logo}</SiteLink> : <span key={partner.id}>{logo}</span>;
 })}</div></div></section>;
}
''')
write('src/components/feature/ProfessionalRecognitionSection.tsx', '''
import useCollection from '@/hooks/useCollection';
import CollectionState from '@/components/base/CollectionState';
import SiteLink from '@/components/base/SiteLink';
import { fetchProfessionalCredentials } from '@/services/professionalCredentialsApi';
export default function ProfessionalRecognitionSection() {
 const { items, loading, error, retry } = useCollection(fetchProfessionalCredentials);
 if (loading || error || !items.length) return <CollectionState label="Professional recognition records" loading={loading} error={error} retry={retry} />;
 return <section className="bg-white py-16 md:py-24"><div className="container-site"><h2 className="text-3xl">Professional development and recognition</h2><p className="mt-4 max-w-3xl text-foreground-600">Programme learning and support are distinct from external awards. Membership, examinations and Chartered status remain subject to each professional body's eligibility and assessment.</p><div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{items.map(item => <article key={item.id} className="card-premium p-6">{item.imageUrl && <img src={item.imageUrl} alt="" loading="lazy" decoding="async" width={240} height={140} className="h-32 w-full object-contain" />}<h3 className="mt-4 text-lg">{item.name}</h3><p className="mt-2 text-sm text-foreground-600">{item.role}</p>{item.linkUrl && <SiteLink className="mt-3 inline-block underline" href={item.linkUrl}>Explore {item.name}</SiteLink>}</article>)}</div></div></section>;
}
''')
p=ROOT/'src/pages/events/page.tsx';s=p.read_text(encoding='utf-8');a=s.index('  const [events,');b=s.index('\n  return (',a)
s=s[:a]+'''  const { items: events, loading, error, retry } = useCollection(fetchEvents);
'''+s[b:]
s="import useCollection from '@/hooks/useCollection';\nimport CollectionState from '@/components/base/CollectionState';\n"+s
s=s.replace('events === null','loading').replace('{events.length === 0','{events.length === 0')
s=s.replace('<main>','<main>')
s=s.replace('<EditorialPageHero','{error && <CollectionState label="Events" loading={loading} error={error} retry={retry} />}\n          <EditorialPageHero',1)
p.write_text(s,encoding='utf-8')
# Real counts only: do not turn failed requests into zeros, or count unused page records.
p=ROOT/'src/dashboard/pages/OverviewPage.tsx';s=p.read_text(encoding='utf-8').replace('  pages: number;','  events: number;').replace("('/pages/')","('/events/')").replace('([pages, enquiries, media])','([events, enquiries, media])').replace('pages: pages.length','events: events.length').replace(".catch(() => setCounts({ pages: 0, enquiries: 0, media: 0 }));",".catch(() => setError(true));").replace("{ label: 'Pages', value: counts?.pages, icon: 'ri-file-list-3-line', href: '/dashboard/pages' }","{ label: 'Events', value: counts?.events, icon: 'ri-calendar-line', href: '/dashboard/events' }")
s=s.replace('  const [counts,','  const [error, setError] = useState(false);\n  const [counts,').replace('<div className="mt-6 grid','{error && <p role="alert" className="mt-4 text-red-700">Counts could not be loaded. Refresh to try again.</p>}\n      <div className="mt-6 grid')
p.write_text(s,encoding='utf-8')
print('Phase 3: public CMS collections now have honest loading/error/empty states; placeholder credentials removed.')
