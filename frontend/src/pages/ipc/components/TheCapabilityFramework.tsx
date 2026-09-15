const capabilities = ['Planning and scheduling', 'Cost and commercial control', 'Risk and opportunity', 'Earned value management', 'Governance and assurance', 'PMO and portfolio controls', 'Data, reporting and AI', 'Professional ethics and judgement'];

export default function TheCapabilityFramework() {
  return (
<section id="framework" className="bg-primary-950 py-16 text-white md:py-24"><div className="container-site grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-ipc-gold">The capability framework</p><h2 className="mt-4 text-3xl text-white md:text-4xl">One connected view of project controls</h2><p className="mt-4 text-sm leading-relaxed text-white/65">Strong controls are not isolated techniques. They form an integrated system that connects scope, time, cost, risk, change, data and governance to better decisions.</p></div><div className="grid gap-3 sm:grid-cols-2">{capabilities.map((item, index) => <div key={item} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[.06] p-4"><span className="text-xs font-bold text-ipc-gold">{String(index + 1).padStart(2, '0')}</span><p className="text-sm font-semibold text-white/85">{item}</p></div>)}</div></div></section>
  );
}
