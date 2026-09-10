import SiteLink from '@/components/base/SiteLink';

export default function NextStep() {
  return (
<section id="sector-section-16" className="scroll-mt-44 py-16 md:py-20 bg-white">
<div className="min-w-0 space-y-4 container-site space-y-8">
<div className="min-w-0 space-y-4">
<small>
{"Next step "}
</small>
<h2 className="text-3xl font-bold leading-tight md:text-4xl">
{"Choose your pathway. Check your access route. "}
</h2>
<p className="text-base leading-relaxed text-foreground-600">
{"Complete a short assessment to identify the most suitable professional pathway and determine whether the Department for Education Funded Route or IPC Bursary Route may fit your circumstances. "}
</p>
</div>
<div className="min-w-0 space-y-4 flex flex-wrap items-center gap-3">
<SiteLink href="#eligibility" className="inline-flex min-h-12 items-center justify-center rounded-md px-6 py-3 text-sm font-bold btn-primary">
{"Check my eligibility "}
</SiteLink>
<SiteLink href="/book-a-session" className="inline-flex min-h-12 items-center justify-center rounded-md px-6 py-3 text-sm font-bold border border-primary-700 text-primary-950">
{"Book an information session "}
</SiteLink>
</div>
</div>
</section>
  );
}
