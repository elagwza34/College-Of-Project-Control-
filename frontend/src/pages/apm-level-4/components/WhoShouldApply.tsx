import SectionHeading from '@/components/base/SectionHeading';
import SiteLink from '@/components/base/SiteLink';
import { audiences } from '../programmeData';

function TickList({ items, light = false }: { items: string[]; light?: boolean }) {
  return <ul className="space-y-2.5">{items.map(item => <li key={item} className={`flex gap-2.5 text-sm leading-relaxed ${light ? 'text-white/80' : 'text-foreground-700'}`}><i className={`ri-check-line mt-0.5 shrink-0 ${light ? 'text-signal-300' : 'text-accent-700'}`} aria-hidden="true" /><span>{item}</span></li>)}</ul>;
}

export default function WhoShouldApply() {
  return (
<section className="bg-white py-16 md:py-24"><div className="container-site"><SectionHeading tag="Who should apply" title="Built for professionals delivering projects across multiple industries" className="mb-12" /><div className="grid gap-5 lg:grid-cols-3">{audiences.map(group => <article key={group.title} className="card-premium p-6"><h3 className="text-xl">{group.title}</h3><div className="mt-5"><TickList items={group.roles} /></div></article>)}</div><div className="mt-8 rounded-xl border-l-4 border-signal-500 bg-highlight-50 p-6 md:flex md:items-center md:justify-between md:gap-8"><div><h3 className="text-xl">You do not need “Project Manager” in your job title.</h3><p className="mt-2 max-w-3xl text-sm leading-relaxed text-foreground-600">If your role involves coordinating projects, managing stakeholders, planning delivery, reporting progress or supporting project decisions, the programme may be relevant to you.</p></div><SiteLink href="/book-a-session" className="mt-5 inline-flex shrink-0 text-sm font-bold text-primary-700 md:mt-0">Discuss Your Role <i className="ri-arrow-right-line ml-2" aria-hidden="true" /></SiteLink></div></div></section>
  );
}
