import Footer from '@/components/feature/Footer';

type LegalPageKey = 'privacy' | 'terms' | 'accessibility' | 'cookies';

interface LegalSection {
  heading: string;
  body: string;
}

const pages: Record<LegalPageKey, { eyebrow: string; title: string; intro: string; sections: LegalSection[] }> = {
  privacy: {
    eyebrow: 'Your information',
    title: 'Privacy notice',
    intro: 'This notice explains the information we collect through this website, why we use it and the choices available to you.',
    sections: [
      { heading: 'Information we collect', body: 'When you submit an enquiry, eligibility check or newsletter form, we may collect your name, contact details, organisation, role and the information you choose to provide about your development needs.' },
      { heading: 'How we use it', body: 'We use this information to respond to your request, provide relevant programme or funding guidance, improve our services and maintain appropriate records of enquiries.' },
      { heading: 'Programme reviews', body: 'When you submit a review, we collect your name, photo, completed programme, reviewer type and comments. These are available to our review team while awaiting approval. With your publication consent, approved reviews and photos appear on the website. You can contact us to request that your review be removed.' },
      { heading: 'Sharing and retention', body: 'Apart from reviews you agree to publish, information is shared only with authorised staff or service providers needed to deliver and administer the requested service. We retain personal data only for as long as it is needed for those purposes and any applicable legal obligations.' },
      { heading: 'Your choices', body: 'You may ask us to provide, correct or delete personal information we hold about you, or object to certain uses. Some requests may be subject to legal or operational exceptions.' },
      { heading: 'Contact', body: 'For privacy questions or requests, email info@collegeofprojectcontrols.com and include “Privacy” in the subject line.' },
    ],
  },
  terms: {
    eyebrow: 'Website use',
    title: 'Terms of use',
    intro: 'These terms explain the basis on which information and interactive tools on this website are provided.',
    sections: [
      { heading: 'Information, not an offer', body: 'Programme, route, funding and progression information is provided for general guidance. Availability, eligibility, content, schedules and fees are confirmed during the formal enquiry and enrolment process.' },
      { heading: 'Funding statements', body: 'References to funded or co-funded development are conditional. Applicable government rules, employer status, learner circumstances, prior learning and programme availability must be assessed before funding can be confirmed.' },
      { heading: 'Intellectual property', body: 'Website copy, design, graphics and learning-related materials may not be reproduced or used commercially without written permission from the relevant rights holder.' },
      { heading: 'External services', body: 'Links to external websites and services are provided for convenience. We are not responsible for external content, availability or privacy practices.' },
      { heading: 'Contact', body: 'If you have a question about these terms or need clarification before relying on website information, contact info@collegeofprojectcontrols.com.' },
    ],
  },
  accessibility: {
    eyebrow: 'Inclusive access',
    title: 'Accessibility statement',
    intro: 'We want professionals, employers and prospective learners to be able to understand and use this website with confidence.',
    sections: [
      { heading: 'Our approach', body: 'The site is designed with keyboard access, visible focus states, responsive layouts, meaningful headings, form labels and reduced-motion preferences in mind.' },
      { heading: 'Supported use', body: 'Content is intended to work with current browsers, screen magnification and common assistive technologies. Text can be resized and the website can be navigated without a mouse.' },
      { heading: 'Known limitations', body: 'Some externally supplied imagery, embeds or third-party services may not provide the same level of accessibility as the core website. We review these areas as the service develops.' },
      { heading: 'Request an alternative', body: 'If you need programme information or application guidance in another format, email info@collegeofprojectcontrols.com and tell us what format would help.' },
      { heading: 'Report a problem', body: 'Please contact us if you encounter an accessibility barrier. Include the page address and a short description so we can investigate it efficiently.' },
    ],
  },
  cookies: {
    eyebrow: 'Website preferences',
    title: 'Cookies and local storage',
    intro: 'This page explains how browser storage may be used to operate, measure and improve the website.',
    sections: [
      { heading: 'Essential storage', body: 'The website may use essential browser storage to remember interface state, protect forms and support navigation. These functions are required for the service to work as expected.' },
      { heading: 'Measurement', body: 'Where analytics is enabled, measurement data may be used to understand page performance, navigation and enquiry journeys. Analytics should be configured with an appropriate consent mechanism before production use.' },
      { heading: 'Third-party services', body: 'Forms, media or other external services may set their own cookies or receive technical request data. Their use is governed by the relevant provider’s terms and privacy notice.' },
      { heading: 'Managing storage', body: 'You can remove or block cookies and local storage through your browser settings. Blocking essential storage may affect some website functions.' },
      { heading: 'Contact', body: 'For questions about website measurement or storage, email info@collegeofprojectcontrols.com.' },
    ],
  },
};

export default function LegalPage({ page }: { page: LegalPageKey }) {
  const content = pages[page];

  return (
    <div className="min-h-screen bg-background-50">
      <main>
        <header className="hero-image-documents relative flex min-h-[90vh] items-center overflow-hidden bg-secondary-950 px-4 pb-16 pt-32 text-white md:pb-20 md:pt-40">
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_top_right,oklch(var(--primary-500)),transparent_45%)]" />
          <div className="container-site relative z-10 max-w-4xl">
            <p className="font-label text-xs font-bold uppercase tracking-[0.16em] text-signal-400">{content.eyebrow}</p>
            <h1 className="mt-4 text-display font-bold leading-tight text-white">{content.title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/70 md:text-lg">{content.intro}</p>
          </div>
        </header>
        <section className="container-site max-w-4xl py-16 md:py-24">
          <p className="mb-10 text-xs font-semibold uppercase tracking-[0.14em] text-foreground-400">Last reviewed: 31 August 2026</p>
          <div className="space-y-5">
            {content.sections.map((section, index) => (
              <article key={section.heading} className="rounded-2xl border border-background-200 bg-white p-6 shadow-card md:p-8">
                <div className="flex gap-5">
                  <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-primary-50 text-xs font-bold text-primary-700">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground-950">{section.heading}</h2>
                    <p className="mt-3 text-sm leading-7 text-foreground-600 md:text-base">{section.body}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
