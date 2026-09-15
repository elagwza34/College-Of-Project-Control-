import SectionHeading from '@/components/base/SectionHeading';
import { programmePhases } from '../programmeData';
import Bullets from './Bullets';

export default function ProgrammeStructure() {
  return (
<section id="structure" className="bg-primary-700 py-16 text-white md:py-24"><div className="container-site"><SectionHeading tag="Programme structure" title="A six-credit work-based programme over 27 months" subtitle="A standard credit is one four-month course. Project Management Professional is two credits over eight months." light className="mb-14" /><ol className="grid gap-5 md:grid-cols-3">{programmePhases.map((phase, index) => <li key={phase.title} className="rounded-xl border border-white/15 bg-white/10 p-6"><span className="text-xs font-bold uppercase tracking-wider text-signal-300">Phase {index + 1} · {phase.duration}</span><h3 className="mt-3 text-xl text-white">{phase.title}</h3><div className="mt-5"><Bullets items={phase.items} light /></div></li>)}</ol><div className="mt-8 rounded-xl bg-white p-6 text-foreground-900 md:flex md:items-center md:justify-between md:gap-8"><div><p className="text-xs font-bold uppercase tracking-wider text-accent-700">Additional professional development</p><h3 className="mt-2 text-xl">Diploma Level 7 in Strategy and Leadership</h3><p className="mt-2 text-sm text-foreground-600">Saturday, 9:00–11:00 · 6 modules · 3 months each · 18 months total</p></div><p className="mt-4 max-w-md text-xs leading-relaxed text-foreground-600 md:mt-0">This is additional access within the wider support package. It is not one of the six Level 6 credits and remains subject to confirmed programme terms.</p></div></div></section>
  );
}
