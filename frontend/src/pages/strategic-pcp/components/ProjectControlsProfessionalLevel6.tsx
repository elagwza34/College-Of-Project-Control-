import SiteLink from '@/components/base/SiteLink';

export default function ProjectControlsProfessionalLevel6() {
  return (
<header className="relative isolate flex min-h-[80vh] items-center overflow-hidden bg-primary-950 py-16 pt-36 text-white lg:h-[80vh] lg:min-h-[640px] lg:pt-28">
<img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2200&q=85" alt="" aria-hidden="true" fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
<div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary-950/95 via-primary-950/70 to-primary-950/30" />
<div className="container-site w-full"><div className="max-w-3xl space-y-6">
<p className="text-sm font-bold uppercase tracking-[.16em] text-signal-300">Project Controls Professional Level 6</p>
<h1 className="text-4xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl">Strategic Pathway</h1>
<p className="max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">Build strategic project-controls capability through six pathway credits, from project leadership to programme, portfolio and PMO decision-making.</p>
<div className="flex flex-wrap gap-3"><span className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm">6 pathway credits</span><span className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm">27-month indicative schedule</span><span className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm">Workplace evidence</span></div>
<div className="flex flex-wrap gap-3 pt-2"><SiteLink href="/book-a-session" className="btn-primary inline-flex min-h-12 items-center justify-center px-6 font-bold">Request a consultation</SiteLink><SiteLink href="#credit-overview" className="cta-button inline-flex min-h-12 items-center justify-center rounded-md border border-white/50 px-6 font-semibold text-white">Explore the pathway</SiteLink></div>
</div></div></header>
  );
}
