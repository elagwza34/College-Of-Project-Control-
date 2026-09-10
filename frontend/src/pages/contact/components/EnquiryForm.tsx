import SiteLink from '@/components/base/SiteLink';
import ContactForm from '@/components/feature/ContactForm';

const nextSteps = [
  { icon: 'ri-inbox-archive-line', title: 'We review your enquiry', detail: 'Usually within 24 hours' },
  { icon: 'ri-compass-3-line', title: 'Personalised guidance', detail: 'Programme and development advice' },
  { icon: 'ri-flag-line', title: 'Clear next steps', detail: 'Eligibility check or consultation booking' },
];

export default function EnquiryForm() {
  return (
<section id="enquiry-form" className="relative overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 py-16 md:py-24">
          <div className="pattern-cubes-overlay pattern-cubes-overlay-dark pattern-cubes-animate" style={{ opacity: 0.08 }} />
          <div className="absolute top-1/4 left-[-6%] h-[360px] w-[360px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, oklch(var(--signal-500) / 0.14), transparent 70%)' }} />
          <div className="absolute bottom-[-10%] right-[-6%] h-[420px] w-[420px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, oklch(var(--highlight-300) / 0.12), transparent 70%)' }} />

          <div className="container-site relative z-10">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <span className="mb-4 inline-block rounded-full border border-highlight-400/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-highlight-400">
                Find Your Next Step
              </span>
              <h2 className="text-2xl font-bold leading-tight text-background-50 md:text-3xl lg:text-4xl">
                Not sure which programme or specialist development fits?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-background-50/70 md:text-base">
                Complete the form and our team will respond with personalised guidance.
              </p>
            </div>

            <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] lg:gap-10">
              <ContactForm />

              <aside className="rounded-xl border border-white/15 bg-white/10 p-6 text-white backdrop-blur-sm md:p-8">
                <h2 className="text-xl font-bold text-white">What happens next?</h2>
                <div className="mt-6 space-y-5">
                  {nextSteps.map((step) => (
                    <div key={step.title} className="flex items-start gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-highlight-400 text-primary-950">
                        <i className={`${step.icon} text-base`} aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white">{step.title}</p>
                        <p className="mt-0.5 text-xs text-white/65">{step.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-7 border-t border-white/15 pt-6">
                  <p className="text-xs uppercase tracking-wider text-white/50">Prefer email?</p>
                  <SiteLink href="mailto:info@collegeofprojectcontrols.com" className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-highlight-300 hover:text-highlight-200">
                    <i className="ri-mail-line" aria-hidden="true" />
                    info@collegeofprojectcontrols.com
                  </SiteLink>
                </div>
              </aside>
            </div>
          </div>
        </section>
  );
}
