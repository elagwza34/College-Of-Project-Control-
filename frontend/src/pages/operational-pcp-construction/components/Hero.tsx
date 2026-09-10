import SiteLink from '@/components/base/SiteLink';

export default function Hero() {
  return (
<header className="relative isolate flex min-h-[80vh] items-center overflow-hidden bg-primary-950 pb-12 pt-36 text-white lg:h-[80vh] lg:min-h-[640px] lg:pt-28">
<img src="/images/construction-sector-hero.webp" alt="" aria-hidden="true" fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover" />
<div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary-950/95 via-primary-950/85 to-primary-950/50" />
<div className="container-site w-full"><div className="max-w-4xl space-y-5"><p className="text-xs font-bold uppercase tracking-[.16em] text-signal-300">Construction & Infrastructure</p><h1 className="max-w-4xl text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">Build the capability to control complex delivery.</h1><p className="max-w-3xl text-lg leading-relaxed text-white/90">Develop the project-controls capability your organisation needs across planning, scheduling, cost, risk, governance and decision support. Choose the pathway that matches the responsibility your people carry today—and the level they are preparing to reach next.</p><div className="flex flex-wrap gap-3 pt-3"><SiteLink href="/book-a-session" className="btn-primary inline-flex min-h-12 items-center px-6 font-bold">Discuss your team’s capability</SiteLink><SiteLink href="#pathways" className="inline-flex min-h-12 items-center rounded-md border border-white/40 px-6 font-bold text-white">Compare pathways</SiteLink></div></div></div></header>
  );
}
