import SectionHeading from '@/components/base/SectionHeading';
import { benefitGroups } from '../programmeData';
import Bullets from './Bullets';

export default function ProgrammeBenefits() {
  return (
<section id="benefits" className="py-16 md:py-24"><div className="container-site"><SectionHeading tag="Programme benefits" title="More than a qualification" subtitle="A wider support package designed around wellbeing, career direction, professional recognition and connection." className="mb-12" /><div className="grid gap-5 lg:grid-cols-3">{benefitGroups.map(group => <article key={group.title} className="card-premium p-6"><h3 className="text-xl">{group.title}</h3><div className="mt-5"><Bullets items={group.items} /></div></article>)}</div><p className="mt-5 text-xs text-foreground-600">Support services and assessments are optional where stated and remain subject to confirmed programme terms and availability.</p></div></section>
  );
}
