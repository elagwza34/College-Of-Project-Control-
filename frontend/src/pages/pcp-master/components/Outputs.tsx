import { workplaceOutputs } from '../programmeData';

export default function Outputs() {
  return (
<section id="outputs" className="bg-secondary-500 py-16 text-white md:py-24"><div className="container-site grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-center"><div><span className="text-xs font-bold uppercase tracking-[.18em] text-highlight-300">Capability and workplace outputs</span><h2 className="mt-3 text-3xl text-white md:text-4xl">What learners can evidence at work</h2><p className="mt-4 text-white/70">Learning is designed to become visible project-controls evidence, stronger decisions and better workplace systems.</p></div><ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">{workplaceOutputs.map(item => <li key={item} className="flex gap-2 rounded-lg border border-white/15 bg-white/10 p-3 text-xs font-semibold text-white/85"><i className="ri-file-check-line shrink-0 text-highlight-300" />{item}</li>)}</ul></div></section>
  );
}
