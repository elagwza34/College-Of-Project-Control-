const pillars = [
  { icon: 'ri-shield-check-line', title: 'Standards and quality', copy: 'A clear professional framework that connects project controls knowledge, applied practice and credible evidence.' },
  { icon: 'ri-award-line', title: 'Professional recognition', copy: 'Structured development routes that help professionals demonstrate growing capability at the appropriate level.' },
  { icon: 'ri-global-line', title: 'A connected profession', copy: 'A shared identity for people working across planning, cost, risk, controls, PMO and complex project delivery.' },
];

export default function WhyItMatters() {
  return (
<section className="py-16 md:py-24"><div className="container-site"><div className="mx-auto max-w-3xl text-center"><p className="text-xs font-bold uppercase tracking-[.18em] text-ipc-ink">Why IPC matters</p><h2 className="mt-4 text-3xl md:text-4xl">Professional confidence for a discipline that shapes delivery</h2><p className="mt-4 text-foreground-600">Project controls professionals translate complexity into reliable plans, early warnings, informed choices and accountable delivery. IPC gives that work a clearer professional framework.</p></div><div className="mt-12 grid gap-5 md:grid-cols-3">{pillars.map(item => <article key={item.title} className="rounded-2xl border border-background-200 bg-white p-7 shadow-sm"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ipc-gold/15 text-ipc-ink"><i className={`${item.icon} text-xl`} /></span><h3 className="mt-5 text-xl">{item.title}</h3><p className="mt-3 text-sm leading-relaxed text-foreground-600">{item.copy}</p></article>)}</div></div></section>
  );
}
