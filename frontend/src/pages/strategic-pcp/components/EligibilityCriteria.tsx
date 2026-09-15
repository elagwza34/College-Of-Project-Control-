import SiteLink from '@/components/base/SiteLink';

export default function EligibilityCriteria() {
  return (
<section id="eligibility" className="scroll-mt-44 py-16 md:py-20 bg-background-100">
<div className="container-site space-y-8">
<div className="max-w-3xl space-y-4">
<div className="text-xs font-bold uppercase tracking-[.14em] text-accent-700">
{"Eligibility criteria "}
</div>
<h2 className="text-3xl font-bold leading-tight md:text-4xl">
{"Could this apprenticeship pathway be right "}
<span>
{"for you? "}
</span>
</h2>
<p className="text-base leading-relaxed">
{"College of Project Controls completes a role, suitability, prior-learning and funding review before enrolment. Use this guide and quick check as an initial indication only. "}
</p>
</div>
<div className="grid min-w-0 gap-6 lg:grid-cols-2">
<div aria-label="Strategic Pathway eligibility criteria" className="space-y-4">
<article className="flex items-start gap-4 rounded-xl border border-background-200 bg-white p-5">
<span>

</span>
<span className="inline-flex h-10 min-w-10 items-center justify-center rounded-full bg-signal-100 px-2 font-bold text-primary-950">
{"1 "}
</span>
<div className="min-w-0 space-y-2">
<h3 className="text-xl font-bold leading-snug">
{"UK resident for the past 3 years "}
</h3>
<p className="text-base leading-relaxed">
{"You must have lived in the UK for the past 3 years. "}
</p>
</div>
</article>
<article className="flex items-start gap-4 rounded-xl border border-background-200 bg-white p-5">
<span>

</span>
<span className="inline-flex h-10 min-w-10 items-center justify-center rounded-full bg-signal-100 px-2 font-bold text-primary-950">
{"2 "}
</span>
<div className="min-w-0 space-y-2">
<h3 className="text-xl font-bold leading-snug">
{"Must not require sponsorship to work "}
</h3>
<p className="text-base leading-relaxed">
{"You must hold a British Passport, Indefinite Leave to Remain, or a Tier 2 visa with at least three years of UK residency. "}
</p>
</div>
</article>
<article className="flex items-start gap-4 rounded-xl border border-background-200 bg-white p-5">
<span>

</span>
<span className="inline-flex h-10 min-w-10 items-center justify-center rounded-full bg-signal-100 px-2 font-bold text-primary-950">
{"3 "}
</span>
<div className="min-w-0 space-y-2">
<h3 className="text-xl font-bold leading-snug">
{"Not enrolled in other government-funded training "}
</h3>
<p className="text-base leading-relaxed">
{"You must not be enrolled in other government-funded training at the time of this programme. "}
</p>
</div>
</article>
<article className="flex items-start gap-4 rounded-xl border border-background-200 bg-white p-5">
<span>

</span>
<span className="inline-flex h-10 min-w-10 items-center justify-center rounded-full bg-signal-100 px-2 font-bold text-primary-950">
{"4 "}
</span>
<div className="min-w-0 space-y-2">
<h3 className="text-xl font-bold leading-snug">
{"Self-employed individuals are not eligible "}
</h3>
<p className="text-base leading-relaxed">
{"Self-employed individuals are not eligible for DfE funding. "}
</p>
</div>
</article>
<article className="flex items-start gap-4 rounded-xl border border-background-200 bg-white p-5">
<span>

</span>
<span className="inline-flex h-10 min-w-10 items-center justify-center rounded-full bg-signal-100 px-2 font-bold text-primary-950">
{"5 "}
</span>
<div className="min-w-0 space-y-2">
<h3 className="text-xl font-bold leading-snug">
{"Paid employment in England "}
</h3>
<p className="text-base leading-relaxed">
{"You must be in paid employment in England, normally 30+ hours per week, with a minimum of 16 hours. "}
</p>
</div>
</article>
<article className="flex items-start gap-4 rounded-xl border border-background-200 bg-white p-5">
<span>

</span>
<span className="inline-flex h-10 min-w-10 items-center justify-center rounded-full bg-signal-100 px-2 font-bold text-primary-950">
{"6 "}
</span>
<div className="min-w-0 space-y-2">
<h3 className="text-xl font-bold leading-snug">
{"Employer based in England "}
</h3>
<p className="text-base leading-relaxed">
{"Your employer must be based in England and registered with the Apprenticeship Service. "}
</p>
</div>
</article>
<article className="flex items-start gap-4 rounded-xl border border-background-200 bg-white p-5">
<span>

</span>
<span className="inline-flex h-10 min-w-10 items-center justify-center rounded-full bg-signal-100 px-2 font-bold text-primary-950">
{"7 "}
</span>
<div className="min-w-0 space-y-2">
<h3 className="text-xl font-bold leading-snug">
{"Spend at least 50% of working hours in England "}
</h3>
<p className="text-base leading-relaxed">
{"You must spend at least 50% of your working hours within England. "}
</p>
</div>
</article>
</div>
<aside>
<figure>
<img src="/images/employer-capability-team.webp" alt="Professional learning and collaboration" loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover" />
</figure>
<div className="space-y-3">
<div className="rounded-xl border border-accent-200 bg-accent-50 p-5 text-primary-950 space-y-3">
<span>

</span>
<p className="text-base leading-relaxed">
{"This is an indication only and does not guarantee eligibility, funding or enrolment. Final suitability is confirmed after the College's full role, prior-learning, employer-support and funding review. "}
</p>
</div>
</div>
</aside>
</div>
</div><div className="container-site mt-8"><SiteLink href="/apprenticeship-eligibility-checker" className="btn-primary inline-flex min-h-12 items-center px-6 font-bold">Check your eligibility</SiteLink></div>
</section>
  );
}
