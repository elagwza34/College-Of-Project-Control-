import SiteLink from '@/components/base/SiteLink';
import { useLocation } from 'react-router-dom';

export default function NotFound() {
  const location = useLocation();

  return (
    <main className="hero-image-project relative isolate flex min-h-[90vh] items-center justify-center overflow-hidden bg-primary-950 px-4 pb-16 pt-28 text-center text-white">
      <div className="signal-pattern absolute inset-0 -z-10 opacity-25" />
      <div className="absolute -right-20 top-20 -z-10 h-80 w-80 rounded-full bg-signal-500/15 blur-3xl" />
      <span className="pointer-events-none absolute bottom-[-4rem] select-none font-heading text-[12rem] font-black leading-none text-white/[0.035] md:text-[20rem]">
        404
      </span>

      <div className="relative z-10 max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-signal-400">Page not found</p>
        <h1 className="mt-5 text-display font-extrabold text-white">Let&apos;s get you back to the right route.</h1>
        <p className="mt-5 text-base text-white/70">The address <span className="font-semibold text-white">{location.pathname}</span> does not match an active page.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <SiteLink href="/" className="btn-primary inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold transition-colors">
            Return home <i className="ri-home-4-line" />
          </SiteLink>
          <SiteLink href="/programmes" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/50 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-signal-400 hover:bg-white/10">
            Explore programmes <i className="ri-arrow-right-line" />
          </SiteLink>
        </div>
      </div>
    </main>
  );
}
