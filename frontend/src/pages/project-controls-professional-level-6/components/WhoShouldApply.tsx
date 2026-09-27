import SectionHeading from '@/components/base/SectionHeading';
import { audienceGroups } from '../programmeData';
import Bullets from './Bullets';

export default function WhoShouldApply() {
  return (
<section id="audience" className="py-16 md:py-24"><div className="container-site"><SectionHeading tag="Who should apply" title="For professionals who plan, control, analyse, govern and deliver projects" subtitle="Relevant across engineering, infrastructure, construction, consultancy, digital transformation, marketing, business services and other project-driven organisations." className="mb-12" /><div className="grid gap-5 lg:grid-cols-3">{audienceGroups.map(group => <article key={group.title} className="card-premium p-6"><h3 className="text-xl">{group.title}</h3><div className="mt-5"><Bullets items={group.roles} /></div></article>)}</div></div></section>
  );
}
