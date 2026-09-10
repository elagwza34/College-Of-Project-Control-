import SiteLink from '@/components/base/SiteLink';

export default function NextStep() {
  return (
<section id="sector-section-12" className="scroll-mt-44 py-16 md:py-20 bg-background-100">
<div className="min-w-0 space-y-4 container-site space-y-8">
<span className="text-xs font-bold uppercase tracking-[.15em] text-accent-700">
{"Ready to take control "}
</span>
<h2 className="text-3xl font-bold leading-tight md:text-4xl">
{"Build the capability to deliver complex engineering programmes with confidence. "}
</h2>
<p className="text-base leading-relaxed text-foreground-600">
{"Compare the pathways, complete an initial eligibility check or book a conversation about your organisation’s engineering project-controls needs. "}
</p>
<div className="min-w-0 space-y-4 flex flex-wrap items-center gap-3">
<SiteLink href="#eligibility" className="inline-flex min-h-12 items-center justify-center rounded-md px-6 py-3 text-sm font-bold btn-primary">
{"Check eligibility "}
</SiteLink>
<SiteLink href="#pathways" className="inline-flex min-h-12 items-center justify-center rounded-md px-6 py-3 text-sm font-bold border border-primary-700 text-primary-950">
{"Compare pathways "}
</SiteLink>
</div>
</div>
</section>
  );
}
