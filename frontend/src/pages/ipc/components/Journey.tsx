const journey = [
  ['01', 'Discover', 'Understand the capability standard and identify the professional route that fits your responsibilities.'],
  ['02', 'Develop', 'Build knowledge through structured learning, expert guidance and relevant professional activity.'],
  ['03', 'Apply', 'Turn learning into workplace outputs, decisions, systems and evidence of professional practice.'],
  ['04', 'Evidence', 'Organise a clear record of capability, reflection, impact and continued professional development.'],
  ['05', 'Progress', 'Use your evidence to support the next stage of membership or professional recognition, subject to the applicable requirements.'],
];

export default function Journey() {
  return (
<section className="bg-white py-16 md:py-24"><div className="container-site"><div className="mx-auto max-w-3xl text-center"><p className="text-xs font-bold uppercase tracking-[.18em] text-ipc-ink">Professional journey</p><h2 className="mt-4 text-3xl md:text-4xl">From learning to recognised practice</h2></div><ol className="mt-12 grid gap-4 md:grid-cols-5">{journey.map(([number, title, copy]) => <li key={title} className="rounded-xl border border-background-200 bg-background-50 p-5"><span className="text-xs font-bold text-ipc-ink">{number}</span><h3 className="mt-3 text-lg">{title}</h3><p className="mt-2 text-xs leading-relaxed text-foreground-600">{copy}</p></li>)}</ol></div></section>
  );
}
