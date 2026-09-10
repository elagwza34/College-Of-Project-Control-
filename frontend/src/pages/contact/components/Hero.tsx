import SiteLink from '@/components/base/SiteLink';
import TestimonialSubmission from '@/components/feature/TestimonialSubmission';

export default function Hero() {
  return (
<section className="relative overflow-hidden bg-primary-950">
          <div className="pattern-cubes-overlay pattern-cubes-overlay-dark pattern-cubes-animate" style={{ opacity: 0.08 }} />
          <div className="absolute -top-24 right-[-10%] h-[420px] w-[420px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, oklch(var(--signal-500) / 0.18), transparent 70%)' }} />
          <div className="absolute bottom-[-15%] left-[-8%] h-[380px] w-[380px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, oklch(var(--primary-300) / 0.14), transparent 70%)' }} />

          <div className="container-site relative z-10 grid items-center gap-12 pb-16 pt-28 md:pb-20 md:pt-36 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-highlight-400/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-highlight-300">
                <i className="ri-chat-1-line text-sm" aria-hidden="true" />
                Get In Touch
              </span>
              <h1 className="text-4xl font-extrabold leading-tight text-white md:text-display">
                Let&rsquo;s find your <span className="text-signal-400">next step</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
                Tell us about your role, responsibilities or team capability needs and we&rsquo;ll help identify the most relevant professional-development option.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <SiteLink href="#enquiry-form" className="btn-primary inline-flex min-h-12 items-center justify-center gap-2 px-6 text-sm font-bold transition-colors">
                  Send an enquiry
                  <i className="ri-arrow-right-line" aria-hidden="true" />
                </SiteLink>
                <SiteLink href="/book-a-session" className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/35 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                  Request a consultation
                </SiteLink>
                <TestimonialSubmission />
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div className="overflow-hidden rounded-2xl border border-white/15 shadow-2xl">
                <img src="/images/hero-professional.webp" alt="A College of Project Controls adviser preparing for a consultation call" className="h-72 w-full object-cover" loading="eager" />
              </div>
              <div className="absolute -bottom-6 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-highlight-400 text-primary-950">
                    <i className="ri-timer-flash-line text-lg" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white">Average response time</p>
                    <p className="text-xs text-white/70">Under 24 hours, Monday to Friday</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  );
}
