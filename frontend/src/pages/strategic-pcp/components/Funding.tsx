import SiteLink from '@/components/base/SiteLink';

export default function Funding() {
  return (
<section id="funding" className="scroll-mt-44 py-16 md:py-20 bg-white">
<div className="container-site space-y-8">
<div className="max-w-3xl space-y-4">
<div className="text-xs font-bold uppercase tracking-[.14em] text-accent-700">
{"Funding scenarios for starts from 1 August 2026 "}
</div>
<h2 className="text-3xl font-bold leading-tight md:text-4xl">
{"How the apprenticeship may be funded "}
</h2>
<p className="text-base leading-relaxed">
{"The actual funding position depends on the employer, available funds, apprentice age and the agreed training price. "}
</p>
</div>
<div className="grid min-w-0 gap-6 lg:grid-cols-2">
<div className="space-y-3">
<article className="min-w-0 space-y-4 rounded-2xl border border-background-200 bg-white p-6 text-foreground-800 shadow-sm">
<strong className="font-bold">
{"Account "}
</strong>
<h3 className="text-xl font-bold leading-snug">
{"Levy account funds "}
</h3>
<p className="text-base leading-relaxed">
{"Levy account funds can be used where sufficient funds are available. "}
</p>
</article>
<article className="min-w-0 space-y-4 rounded-2xl border border-background-200 bg-white p-6 text-foreground-800 shadow-sm">
<strong className="font-bold">
{"75% "}
</strong>
<h3 className="text-xl font-bold leading-snug">
{"Levy shortfall "}
</h3>
<p className="text-base leading-relaxed">
{"Government contribution for levy employers with insufficient funds; employer contribution 25%. "}
</p>
</article>
<article className="min-w-0 space-y-4 rounded-2xl border border-background-200 bg-white p-6 text-foreground-800 shadow-sm">
<strong className="font-bold">
{"100% "}
</strong>
<h3 className="text-xl font-bold leading-snug">
{"Eligible non-levy starts aged 16–24 "}
</h3>
<p className="text-base leading-relaxed">
{"Government contribution for eligible non-levy employers where the apprentice meets the applicable age requirements. "}
</p>
</article>
<article className="min-w-0 space-y-4 rounded-2xl border border-background-200 bg-white p-6 text-foreground-800 shadow-sm">
<strong className="font-bold">
{"95% "}
</strong>
<h3 className="text-xl font-bold leading-snug">
{"Eligible non-levy starts aged 25+ "}
</h3>
<p className="text-base leading-relaxed">
{"Government contribution for eligible non-levy employers; employer contribution 5%. "}
</p>
</article>
</div>
<article className="min-w-0 space-y-4 rounded-2xl border border-background-200 bg-white p-6 text-foreground-800 shadow-sm bg-background-100 text-foreground-800">
<span className="block text-4xl font-bold">
{"£27,000 "}
</span>
<h3 className="text-xl font-bold leading-snug">
{"Maximum funding band "}
</h3>
<p className="text-base leading-relaxed">
{"The final price must reflect prior learning and be agreed with the employer. "}
</p>
<ul className="list-disc space-y-2 pl-5">
<li className="leading-relaxed">
{"No apprentice contribution to eligible costs "}
</li>
<li className="leading-relaxed">
{"Employers pay costs above the funding-band maximum "}
</li>
<li className="leading-relaxed">
{"Exam costs are included only when confirmed in writing "}
</li>
</ul>
<div className="flex flex-wrap items-center gap-3 pt-4">
<SiteLink href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-md px-5 py-3 text-sm font-bold btn-primary">
{"Discuss funding "}
</SiteLink>
</div>
</article>
</div>
<div className="rounded-xl border border-accent-200 bg-accent-50 p-5 text-primary-950 space-y-3">
<p className="text-base leading-relaxed">
{"Funding rules, standards, certification names and included benefits may change. The signed apprenticeship agreement, training plan, employer contract and learner offer take precedence over promotional material. "}
</p>
</div>
</div>
</section>
  );
}
