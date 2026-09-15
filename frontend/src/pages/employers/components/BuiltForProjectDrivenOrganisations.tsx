export default function BuiltForProjectDrivenOrganisations() {
  return (
<section className="bg-white py-14"><div className="container-site text-center"><h2 className="text-2xl">Built for project-driven organisations</h2><div className="mt-7 flex flex-wrap justify-center gap-3">{['Infrastructure and construction', 'Councils and public sector', 'Engineering and consultancy', 'Energy and utilities', 'Aerospace and defence', 'Complex programmes and PMOs'].map(x => <span key={x} className="rounded-full border border-background-200 bg-background-50 px-4 py-2 text-xs font-semibold">{x}</span>)}</div><p className="mt-5 text-xs text-foreground-600">Employer logos are shown only where explicit approval to present them as endorsements is available.</p></div></section>
  );
}
