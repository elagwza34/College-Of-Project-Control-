import { outputs } from '../programmeData';

export default function Outputs() {
  return (
<section id="outputs" className="bg-secondary-600 py-16 text-white md:py-24"><div className="container-site grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-center"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-signal-300">Learn by building</p><h2 className="mt-4 text-3xl text-white md:text-4xl">Create project management outputs you can use in professional practice</h2><p className="mt-4 text-sm leading-relaxed text-white/70">The programme is built around application, not passive learning. Create professional outputs and evidence connected to realistic project responsibilities.</p></div><ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">{outputs.map(item => <li key={item} className="flex min-h-16 items-center gap-2 rounded-lg border border-white/15 bg-white/10 p-3 text-xs font-semibold text-white/85"><i className="ri-file-check-line shrink-0 text-signal-300" aria-hidden="true" />{item}</li>)}</ul></div></section>
  );
}
