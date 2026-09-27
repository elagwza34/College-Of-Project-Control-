export default function EmployerPartnershipsAcrossProjectDrivenSectors() {
  return (
<section className="py-14" aria-labelledby="partners-title"><div className="container-site text-center"><h2 id="partners-title" className="text-2xl">Employer partnerships across project-driven sectors</h2><div className="mt-7 flex flex-wrap justify-center gap-3">{['Infrastructure and construction', 'Councils and public sector', 'Healthcare and pharmaceutical', 'Business and engineering consultancy', 'University and education', 'Aerospace, defence, oil and gas'].map(item => <span key={item} className="rounded-full border border-background-200 bg-white px-4 py-2 text-xs font-semibold text-foreground-700">{item}</span>)}</div></div></section>
  );
}
