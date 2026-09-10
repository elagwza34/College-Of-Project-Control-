const workplaceOutputs = ['Integrated project plans', 'Controls dashboards', 'Risk registers', 'Change logs', 'Performance reports', 'Cost forecasts', 'Resource plans', 'Governance packs', 'Schedule updates', 'Earned value analysis', 'Assurance reports', 'Professional portfolios'];

export default function WorkplaceOutputs() {
  return (
<section className="bg-white py-16 md:py-24"><div className="container-site grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div><span className="text-xs font-semibold uppercase tracking-[.18em] text-accent-700">Learning applied at work</span><h2 className="mt-3 text-3xl md:text-4xl">Turn development into something the business can use.</h2><p className="mt-4 text-foreground-600">Work-based learning is strongest when employees can connect new knowledge with real organisational challenges.</p></div><ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">{workplaceOutputs.map(x => <li key={x} className="flex items-center gap-2 rounded-lg border border-background-200 bg-background-50 p-3 text-sm font-semibold"><i className="ri-checkbox-circle-line text-accent-700" />{x}</li>)}</ul></div></section>
  );
}
