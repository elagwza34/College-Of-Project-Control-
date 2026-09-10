import SiteLink from '@/components/base/SiteLink';

export default function Apply() {
  return (
<section id="apply" className="scroll-mt-44 py-16 md:py-20 bg-white">
<div className="container-site space-y-8">
<div className="bg-background-100 text-foreground-800">
<div className="grid min-w-0 gap-6 lg:grid-cols-2">
<div className="space-y-3">
<div className="text-xs font-bold uppercase tracking-[.14em] text-accent-700">
{"Take the next step "}
</div>
<h2 className="text-3xl font-bold leading-tight md:text-4xl">
{"Build your six-credit Strategic Pathway "}
</h2>
<p className="text-base leading-relaxed">
{"Speak with College of Project Controls to review your role, prior learning, employer support, funding eligibility and pathway suitability. "}
</p>
<div className="space-y-3">
<strong className="font-bold">
{"Admissions and employer enquiries "}
</strong>
<SiteLink href="mailto:info@collegeofprojectcontrols.com" className="font-semibold text-accent-700 underline underline-offset-4">
{"info@collegeofprojectcontrols.com "}
</SiteLink>
</div>
</div>
<div className="flex flex-wrap items-center gap-3 pt-4">
<SiteLink href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-md px-5 py-3 text-sm font-bold btn-primary">
{"Apply for the Strategic Pathway "}
</SiteLink>
</div>
</div>
</div>
</div>
</section>
  );
}
