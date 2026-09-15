import SiteLink from '@/components/base/SiteLink';

export default function TheProfessionalHomeOfProjectControls() {
  return (
<section className="hero-image-documents relative flex min-h-[90vh] items-center overflow-hidden bg-ipc-surface py-20 text-white md:py-28 lg:py-32">
            <div className="absolute inset-0" aria-hidden="true" style={{ background: 'radial-gradient(circle at 78% 30%, rgba(201,154,73,.18), transparent 28%), radial-gradient(circle at 15% 100%, rgba(201,154,73,.1), transparent 32%)' }} />
            <div className="container-site relative grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
              <div>
                <span className="inline-flex rounded-full border border-ipc-gold/35 bg-ipc-gold/10 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-ipc-gold">The professional home of project controls</span>
                <h1 className="mt-7 text-display font-extrabold leading-tight text-white">Institute of<br /><span className="text-ipc-gold">Project Controls</span></h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">Advancing the standards, capability and professional identity of people who bring clarity, confidence and control to complex project delivery.</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <SiteLink href="https://instituteofprojectcontrols.com" target="_blank" rel="noreferrer" className="cta-button inline-flex min-h-12 items-center justify-center rounded-md bg-gradient-to-r from-ipc-ink to-[#C6953B] px-6 text-sm font-bold text-[#1A1204]">Visit the IPC website <i className="ri-external-link-line ml-2" aria-hidden="true" /></SiteLink>
                  <SiteLink href="#framework" className="cta-button inline-flex min-h-12 items-center justify-center rounded-md border border-white/25 px-6 text-sm font-semibold text-white">Explore the framework</SiteLink>
                </div>
              </div>
              <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center">
                <span className="absolute inset-[5%] rounded-full border border-ipc-gold/10" aria-hidden="true" />
                <span className="absolute inset-[16%] rounded-full bg-ipc-gold/10 blur-2xl" aria-hidden="true" />
                <img loading="lazy" decoding="async" src="/images/ipc-logo.webp" alt="Institute of Project Controls" className="relative w-[82%] drop-shadow-2xl" />
              </div>
            </div>
          </section>
  );
}
