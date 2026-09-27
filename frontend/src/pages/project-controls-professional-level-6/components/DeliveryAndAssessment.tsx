import SectionHeading from '@/components/base/SectionHeading';
import { assessmentItems,employerInvolvement,learningCycle } from '../programmeData';
import Bullets from './Bullets';

export default function DeliveryAndAssessment() {
  return (
<section id="delivery" className="bg-white py-16 md:py-24"><div className="container-site"><SectionHeading tag="Delivery and assessment" title="Live, applied and work-based" subtitle="Prepare before class, explore concepts with tutors, apply techniques in context and reflect on evidence, impact and professional judgement." className="mb-12" /><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{learningCycle.map((stage, i) => <article key={stage.title} className="card-premium p-6"><span className="text-sm font-bold text-accent-700">0{i + 1}</span><h3 className="mt-3 text-xl">{stage.title}</h3><div className="mt-4"><Bullets items={stage.items} /></div></article>)}</div><div className="mt-10 grid gap-5 lg:grid-cols-2"><article className="rounded-xl bg-background-100 p-6"><h3 className="text-xl">Assessment approach</h3><div className="mt-5 columns-1 sm:columns-2"><Bullets items={assessmentItems} /></div></article><article className="rounded-xl bg-background-100 p-6"><h3 className="text-xl">Employer involvement</h3><div className="mt-5 columns-1 sm:columns-2"><Bullets items={employerInvolvement} /></div></article></div></div></section>
  );
}
