import SiteLink from '@/components/base/SiteLink';
import ProgrammeTestimonials from './ProgrammeTestimonials';
import useEnquirySubmission from '@/hooks/useEnquirySubmission';


const linkColumns = [
  {
    icon: 'ri-graduation-cap-line',
    title: 'Programmes',
    links: [
      { label: 'Associate Project Manager Level 4', href: '/associate-project-manager-level-4' },
      { label: 'Project Controls Professional Level 6', href: '/project-controls-professional-level-6' },
      { label: 'Commercial Routes', href: '/commercial-project-controls-route' },
      { label: 'View All Programmes', href: '/programmes' },
    ],
  },
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
      <section aria-labelledby="newsletter-heading" className="relative w-full overflow-hidden border-y border-background-200 bg-white">
        <div className="pattern-cubes-overlay pattern-cubes-overlay-light" style={{ opacity: 0.045 }} />
        <div className="container-site relative z-10 py-10 md:py-12">
          <div className="max-w-lg">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-700">
                <i className="ri-mail-line text-xl" aria-hidden="true" />
              </span>
              <h2 id="newsletter-heading" className="text-xl font-bold text-foreground-950 md:text-2xl">Stay Ahead in Project Controls</h2>
            </div>
            <p className="max-w-lg text-sm leading-relaxed text-foreground-600 md:text-base">
              Request information about programme updates and upcoming events. The College will review your request; this does not activate an automated mailing-list subscription.
            </p>
          </div>

          <div className="mt-8 w-full">
            {receipt ? <p role="status" className="text-sm font-semibold text-primary-700">Your update request has been received. Reference {receipt.id}. This records your interest; it does not confirm a mailing-list subscription.</p> : <form id="newsletter-form" onSubmit={handleSubmit} aria-busy={pending} className="flex w-full flex-col gap-3 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">Email address (required)</label>
              <input id="newsletter-email" type="email" name="email" autoComplete="email" placeholder="Enter your email address" className="form-control min-w-0 flex-1" required aria-describedby="newsletter-notice" />
              <input type="hidden" name="name" value="Programme updates enquiry" />
              <button type="submit" disabled={pending} className="btn-primary shrink-0">{pending ? 'Sending request…' : 'Request updates'}</button>
              <input type="text" name="phone_alt" tabIndex={-1} autoComplete="off" aria-hidden="true" className="honeypot-field" />
            </form>}


            <div className="mt-3 min-h-6">
              {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
              <p id="newsletter-notice" className="text-sm text-foreground-600">We use your email to respond to this request. <SiteLink href="/privacy" className="underline">Privacy notice</SiteLink></p>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative overflow-hidden bg-secondary-950 text-background-50">
        <div className="absolute inset-x-0 top-0 z-20 h-1 bg-[linear-gradient(90deg,#3FA7A3_0%,#3FA7A3_70%,#FFA953_70%,#FFA953_100%)]" aria-hidden="true" />
        <div className="pattern-cubes-overlay pattern-cubes-overlay-dark" style={{ opacity: 0.045 }} />

        <div className="container-site relative z-10 py-12 md:py-16">
          <div className="grid items-start gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(190px,1.1fr)_repeat(4,minmax(150px,1fr))] lg:gap-7 xl:gap-10">
            <div className="w-full max-w-[240px] sm:col-span-2 lg:col-span-1">
              <SiteLink href="/" className="inline-flex" aria-label="College of Project Controls home">
                <img loading="lazy" decoding="async" src="/images/cpcm-logo-light.webp" alt="College of Project Controls" className="h-auto w-[138px] object-contain" />
              </SiteLink>
              <p className="mt-4 text-sm leading-relaxed text-background-50/65">
                Professional project controls and project management pathways for learners and employers.
              </p>



              <SiteLink href="mailto:info@collegeofprojectcontrols.com" className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-highlight-400 transition-colors hover:text-highlight-300">
                <i className="ri-mail-line" aria-hidden="true" />
                info@collegeofprojectcontrols.com
              </SiteLink>
            </div>

            {linkColumns.map((column) => (
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
