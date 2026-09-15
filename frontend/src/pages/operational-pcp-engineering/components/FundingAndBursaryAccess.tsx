import SiteLink from '@/components/base/SiteLink';

export default function FundingAndBursaryAccess() {
  return (
<section id="access" className="scroll-mt-44 py-16 md:py-20 bg-background-100">
<div className="min-w-0 space-y-4 container-site space-y-8">
<div className="min-w-0 space-y-4 max-w-3xl space-y-4">
<div className="min-w-0 space-y-4">
<span className="text-xs font-bold uppercase tracking-[.15em] text-accent-700">
{"Funding and bursary access "}
</span>
<h2 className="text-3xl font-bold leading-tight md:text-4xl">
{"One professional pathway. Two access routes. "}
</h2>
</div>
<p className="text-base leading-relaxed text-foreground-600">
{"Choose the professional pathway that reflects your responsibilities. College can then assess whether the Department for Education Funded Route or the IPC Bursary Route is more appropriate. "}
</p>
</div>
<div className="min-w-0 grid min-w-0 items-start gap-6 lg:grid-cols-2">
<article className="min-w-0 space-y-4 min-w-0 space-y-4 rounded-2xl border border-background-200 bg-white p-6 text-foreground-800 shadow-sm">
<span className="inline-block rounded-full bg-accent-50 px-3 py-2 text-sm font-semibold text-primary-950">
{"Department for Education "}
</span>
<h3 className="text-xl font-bold leading-snug">
{"DfE Funded Route "}
</h3>
<p className="text-base leading-relaxed text-foreground-600">
{"Eligible employees may be able to access a apprenticeship pathway on a fully funded basis, subject to the applicable rules and written confirmation. "}
</p>
<ul className="list-disc space-y-2 pl-5">
<li className="leading-relaxed">
{"Paid employment in England "}
</li>
<li className="leading-relaxed">
{"Employer participation and approval "}
</li>
<li className="leading-relaxed">
{"Relevant workplace activity "}
</li>
<li className="leading-relaxed">
{"Paid learning time agreed "}
</li>
<li className="leading-relaxed">
{"Residency, prior-learning and funding assessment "}
</li>
</ul>
<SiteLink href="#eligibility" className="inline-flex min-h-12 items-center justify-center rounded-md px-6 py-3 text-sm font-bold btn-primary">
{"Check funded-route eligibility "}
</SiteLink>
</article>
<article className="min-w-0 space-y-4 min-w-0 space-y-4 rounded-2xl border border-background-200 bg-white p-6 text-foreground-800 shadow-sm">
<span className="inline-block rounded-full bg-accent-50 px-3 py-2 text-sm font-semibold text-primary-950">
{"Institute of Project Controls "}
</span>
<h3 className="text-xl font-bold leading-snug">
{"IPC Bursary Route "}
</h3>
<p className="text-base leading-relaxed text-foreground-600">
{"For suitable applicants who cannot access the Funded Route, IPC bursary support can reduce the cost of selected pathways delivered through the College. "}
</p>
<ul className="list-disc space-y-2 pl-5">
<li className="leading-relaxed">
{"50% bursary — Operational Pathway "}
</li>
<li className="leading-relaxed">
{"50% bursary — Strategic Pathway "}
</li>
<li className="leading-relaxed">
{"75% bursary — Chartered Pathway "}
</li>
<li className="leading-relaxed">
{"Flexible instalments up to 36 months "}
</li>
<li className="leading-relaxed">
{"Subject to approval, suitability and availability "}
</li>
</ul>
<SiteLink href="#eligibility" className="inline-flex min-h-12 items-center justify-center rounded-md px-6 py-3 text-sm font-bold btn-primary">
{"Apply for IPC bursary support "}
</SiteLink>
</article>
</div>
<div className="min-w-0 space-y-4 space-y-3 rounded-xl border border-accent-200 bg-accent-50 p-5 text-primary-950">
<strong className="font-bold">
{"Limited places: "}
</strong>
{"Funded and IPC bursary places are limited and offered on a "}
<strong className="font-bold">
{"first-come, first-served basis "}
</strong>
{", subject to eligibility, pathway suitability, employer participation where required and written confirmation. "}
</div>
</div>
</section>
  );
}
