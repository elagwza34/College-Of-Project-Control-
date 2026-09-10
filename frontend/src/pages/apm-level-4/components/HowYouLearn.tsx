import SectionHeading from '@/components/base/SectionHeading';
import { learningSteps } from '../programmeData';

export default function HowYouLearn() {
  return (
<section id="learning" className="py-16 md:py-24"><div className="container-site"><SectionHeading tag="How you learn" title="Live teaching, practical application and continuous professional support" className="mb-12" /><ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{learningSteps.map(([title, copy], index) => <li key={title} className="relative rounded-xl bg-white p-6 shadow-sm"><span className="text-xs font-bold text-accent-700">0{index + 1}</span><h3 className="mt-3 text-xl">{title}</h3><p className="mt-2 text-sm leading-relaxed text-foreground-600">{copy}</p></li>)}</ol></div></section>
  );
}
