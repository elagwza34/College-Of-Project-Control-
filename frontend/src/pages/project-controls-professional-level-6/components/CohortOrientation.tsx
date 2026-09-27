import SectionHeading from '@/components/base/SectionHeading';
import { orientations } from '../programmeData';

export default function CohortOrientation() {
  return (
<section id="cohorts" className="py-16 md:py-24"><div className="container-site"><SectionHeading tag="Cohort orientation" title="Case studies and study materials can be tailored to your sector" className="mb-12" /><div className="grid gap-5 md:grid-cols-2">{orientations.map(item => <article key={item.title} className="card-premium p-7"><h3 className="text-xl">{item.title}</h3><p className="mt-3 text-sm text-foreground-600">{item.description}</p><div className="mt-5 flex flex-wrap gap-2">{item.tags.map(tag => <span key={tag} className="rounded-full bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-700">{tag}</span>)}</div></article>)}</div></div></section>
  );
}
