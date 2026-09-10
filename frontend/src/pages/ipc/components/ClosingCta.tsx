import SiteLink from '@/components/base/SiteLink';

export default function ClosingCta() {
  return (
<section className="bg-ipc-surface py-16 text-center text-white md:py-20"><div className="container-site"><p className="text-xs font-bold uppercase tracking-[.18em] text-ipc-gold">Build your professional direction</p><h2 className="mx-auto mt-4 max-w-3xl text-3xl text-white md:text-4xl">Connect learning, workplace impact and professional recognition</h2><p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/65">Speak with the College about a programme and IPC development route aligned with your current responsibilities.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><SiteLink href="/programmes" className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#C6953B] px-6 text-sm font-bold text-[#1A1204]">Explore programmes</SiteLink><SiteLink href="/book-a-session" className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/25 px-6 text-sm font-semibold text-white">Request a consultation</SiteLink></div></div></section>
  );
}
