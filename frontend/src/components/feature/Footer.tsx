import SiteLink from '@/components/base/SiteLink';
import ProgrammeTestimonials from './ProgrammeTestimonials';
import useEnquirySubmission from '@/hooks/useEnquirySubmission';


const linkColumns = [
  {
    icon: 'ri-team-line',
    title: 'For Employers',
    links: [
      { label: 'Employer Information', href: '/employers' },
      { label: 'Build Internal Capability', href: '/employers#how-it-works' },
      { label: 'Employer Agreement', href: '/employer-agreement' },
      { label: 'Request a consultation', href: '/contact' },
      { label: 'Apprenticeship Funding', href: '/knowledge-hub/employer-apprenticeship-funding' },
    ],
  },
  {
    icon: 'ri-user-3-line',
    title: 'For Learners',
    links: [
      { label: 'Professional Information', href: '/apprentices' },
      { label: 'Funding Eligibility', href: '/apprenticeship-eligibility-checker' },
      { label: 'Career Progression', href: '/programmes' },
    ],
  },
  {
    icon: 'ri-calendar-line',
    title: 'Connect',
    links: [
      { label: 'About CPCM', href: '/about' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Articles', href: '/articles' },
      { label: 'Case studies', href: '/case-studies' },
      
      { label: 'Events', href: '/events' },
      { label: 'Frequently Asked Questions', href: '/faq' },
      { label: 'Testimonials & reviews', href: '/testimonials' },
    ],
  },
];

export default function Footer() {
  const { receipt, pending, error, handleSubmit } = useEnquirySubmission('Programme update request');

  return (
    <>
      <ProgrammeTestimonials />
      <footer className="relative overflow-hidden bg-secondary-950 text-background-50">
        <div className="absolute inset-x-0 top-0 z-20 h-1 bg-[linear-gradient(90deg,#3FA7A3_0%,#3FA7A3_70%,#FFA953_70%,#FFA953_100%)]" aria-hidden="true" />
        <div className="pattern-cubes-overlay pattern-cubes-overlay-dark" style={{ opacity: 0.045 }} />

        <div className="container-site relative z-10 py-12 md:py-16">
          <div className="grid items-start gap-10 md:grid-cols-3 lg:gap-12">
            <div className="min-w-0 w-full max-w-sm md:justify-self-start">
              <SiteLink href="/" className="inline-flex" aria-label="College of Project Controls home">
                <img loading="lazy" decoding="async" src="/images/cpcm-logo-light.webp" alt="College of Project Controls" className="h-auto w-[138px] object-contain" />
              </SiteLink>
              <p className="mt-4 text-sm leading-relaxed text-background-50/65">
                Professional project controls and project management pathways for learners and employers.
              </p>



              <SiteLink href="mailto:info@collegeofprojectcontrols.com" className="mt-5 inline-flex max-w-full items-center gap-2 break-all text-xs font-semibold text-highlight-400 transition-colors hover:text-highlight-300">
                <i className="ri-mail-line" aria-hidden="true" />
                info@collegeofprojectcontrols.com
              </SiteLink>
              <section aria-labelledby="newsletter-heading" className="mt-6 max-w-sm border-t border-white/10 pt-5">
                <h2 id="newsletter-heading" className="text-sm font-semibold text-white">Programme &amp; event updates</h2>
                <p className="mt-2 text-xs leading-relaxed text-background-50/65">Request updates from our team. No automatic subscription.</p>
                {receipt ? (
                  <p role="status" className="mt-3 text-xs leading-relaxed text-accent-200">Request received. Reference {receipt.id}.</p>
                ) : (
                  <form id="newsletter-form" onSubmit={handleSubmit} aria-busy={pending} className="mt-3 flex flex-wrap gap-2">
                    <label htmlFor="newsletter-email" className="sr-only">Email address (required)</label>
                    <input id="newsletter-email" type="email" name="email" autoComplete="email" placeholder="Your email address" className="min-h-11 min-w-0 flex-[1_1_150px] rounded-md border border-white/25 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:border-accent-200 focus:outline-none focus:ring-2 focus:ring-accent-200/40" required aria-describedby="newsletter-notice" />
                    <input type="hidden" name="name" value="Programme updates enquiry" />
                    <button type="submit" disabled={pending} className="min-h-11 shrink-0 rounded-md bg-highlight-400 px-3 py-2 text-xs font-semibold text-secondary-950 transition-colors hover:bg-highlight-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight-300 disabled:cursor-wait disabled:opacity-60">{pending ? 'Sending?' : 'Request updates'}</button>
                    <input type="text" name="phone_alt" tabIndex={-1} autoComplete="off" aria-hidden="true" className="honeypot-field" />
                  </form>
                )}
                {error && <p role="alert" className="mt-2 text-xs text-red-300">{error}</p>}
                <p id="newsletter-notice" className="mt-2 text-xs leading-relaxed text-background-50/65">Email used to respond. <SiteLink href="/privacy" className="underline hover:text-white">Privacy notice</SiteLink></p>
              </section>
            </div>

            {[[linkColumns[0], linkColumns[1]], [linkColumns[2]]].map((columns, index) => (
              <div key={columns[0].title} className={`min-w-0 space-y-7 ${index === 0 ? 'md:justify-self-center' : 'md:justify-self-end'}`}>
                {columns.map((column) => (
                  <div key={column.title}>
                    <div className="mb-4 flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-accent-200">
                        <i className={`${column.icon} text-sm`} aria-hidden="true" />
                      </span>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-white xl:text-sm">{column.title}</h3>
                    </div>
                    <ul className="space-y-1">
                      {column.links.map((link) => (
                        <li key={link.label}>
                          <SiteLink href={link.href} className="group flex items-start gap-1.5 py-2 text-xs leading-snug text-background-50/65 transition-colors hover:text-highlight-300 xl:text-sm">
                            <i className="ri-arrow-right-s-line mt-0.5 shrink-0 text-accent-300/70 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                            <span>{link.label}</span>
                          </SiteLink>
                        </li>
                  ))}
                </ul>
              </div>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-12 border-t border-white/10 pt-6">
            <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
              <p className="text-xs text-background-50/45">
                &copy; {new Date().getFullYear()} College of Project Controls &amp; Management. All rights reserved.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                <SiteLink href="/privacy" className="text-xs text-background-50/55 transition-colors hover:text-white">Privacy</SiteLink>
                <SiteLink href="/terms" className="text-xs text-background-50/55 transition-colors hover:text-white">Terms</SiteLink>
                <SiteLink href="/accessibility" className="text-xs text-background-50/55 transition-colors hover:text-white">Accessibility</SiteLink>
                <SiteLink href="/cookies" className="text-xs text-background-50/55 transition-colors hover:text-white">Cookies</SiteLink>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
