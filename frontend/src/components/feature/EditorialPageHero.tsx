import type { ReactNode } from 'react';

interface EditorialPageHeroProps {
  eyebrow: string;
  icon: string;
  title: ReactNode;
  description: string;
  actions?: ReactNode;
}

export default function EditorialPageHero({ eyebrow, icon, title, description, actions }: EditorialPageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-primary-950 pb-16 pt-32 text-white md:pb-20 md:pt-40">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_82%_28%,oklch(var(--accent-500)/0.16),transparent_28%)]" />
      <div className="signal-pattern absolute inset-0 -z-10 opacity-15" />
      <div className="absolute inset-y-0 right-[12%] -z-10 hidden w-px bg-gradient-to-b from-transparent via-white/15 to-transparent lg:block" />

      <div className="container-site">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,760px)_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-signal-300">
              <i className={`${icon} text-base`} aria-hidden="true" />
              {eyebrow}
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.06] tracking-tight text-white md:text-5xl lg:text-5xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              {description}
            </p>
            {actions && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{actions}</div>}
          </div>

          <div className="hidden justify-self-end lg:block" aria-hidden="true">
            <div className="flex items-center gap-3 text-signal-300/70">
              <span className="h-2 w-2 rounded-full bg-signal-400" />
              <span className="h-px w-28 bg-current" />
            </div>
            <p className="mt-4 font-heading text-7xl font-black text-white/[0.06]">CPCM</p>
          </div>
        </div>
      </div>
    </section>
  );
}
