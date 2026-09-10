export default function TrustBar() {
  return (
<section className="border-b border-background-200 bg-white py-7"><div className="container-site flex flex-wrap justify-center gap-x-10 gap-y-4">{['Professional standards', 'Applied capability', 'Ethical practice', 'Career progression', 'Global community'].map(item => <span key={item} className="flex items-center gap-2 text-sm font-semibold text-foreground-700"><i className="ri-checkbox-circle-fill text-[#B27715]" aria-hidden="true" />{item}</span>)}</div></section>
  );
}
