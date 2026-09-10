import { type ReactNode } from 'react';
import PcpComplianceNote from './PcpComplianceNote';
import StickyCta from './StickyCta';

interface ArticleLayoutProps {
  meta: {
    title: string;
    description: string;
    category: string;
    readTime: string;
  };
  heroImageUrl: string;
  heroHeadline: string;
  heroSubheadline: string;
  quickSummary: string[];
  children: ReactNode;
  ctaSection: ReactNode;
  faqSection: ReactNode;
  relatedArticles: ReactNode;
}

export default function ArticleLayout({
  meta,
  heroImageUrl,
  heroHeadline,
  heroSubheadline,
  quickSummary,
  children,
  ctaSection,
  faqSection,
  relatedArticles,
}: ArticleLayoutProps) {
  return (
    <>
      
      
      
      
      
      
      
      
      
      

      <article>
        {/* Hero */}
        <section className="hero-align-left relative w-full min-h-[90vh] flex items-center overflow-hidden">
          <img
            src={heroImageUrl}
            alt=""
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover object-top"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = '/images/hero-professional.webp';
            }}
          />
          <div className="hero-contrast-overlay absolute inset-0"></div>
          <div className="relative w-full container-site py-16 md:py-20">
            <span className="mb-4 inline-block rounded-full border border-signal-400/55 bg-signal-500/10 px-3 py-1 text-xs font-label font-semibold uppercase tracking-wider text-signal-300">
              {meta.category}
            </span>
            <h1 className="text-display font-heading font-bold text-background-50 leading-tight max-w-4xl">
              {heroHeadline}
            </h1>
            <p className="mt-4 md:mt-5 text-sm md:text-lg text-background-50/70 max-w-3xl leading-relaxed">
              {heroSubheadline}
            </p>
            <div className="mt-6 flex items-center gap-4 text-xs text-background-50/70">
              <span className="flex items-center gap-1.5">
                <i className="ri-time-line"></i>
                {meta.readTime}
              </span>
              <span>·</span>
              <img loading="lazy" decoding="async"
                src="https://storage.readdy-site.link/project_files/2c065606-36c7-4cac-81e4-2edb67f93f84/d2ef7095-693a-4784-87e8-224835456a02_compressed_ChatGPT-Image-Jun-25-2026-07_04_12-PM.webp"
                alt="College of Project Controls"
                className="h-4 w-auto object-contain"
              />
            </div>
          </div>
        </section>

        {/* Quick Summary Box */}
        <section className="py-8 md:py-10 bg-background-50">
          <div className="container-site max-w-3xl">
            <div className="bg-background-100 border border-background-200/70 rounded-lg p-5 md:p-6">
              <p className="text-xs font-label font-semibold uppercase tracking-wider text-foreground-600 mb-3">Quick Summary</p>
              <ul className="space-y-2">
                {quickSummary.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-foreground-700">
                    <i className="ri-checkbox-circle-fill text-primary-500 mt-0.5 flex-shrink-0"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Article Body */}
        <section className="py-10 md:py-14 bg-background-50">
          <div className="container-site max-w-3xl">
            <div className="prose-custom text-foreground-800 leading-relaxed">
              {children}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {ctaSection}

        {/* FAQ Section */}
        {faqSection}

        {/* Related Articles */}
        {relatedArticles}

        <PcpComplianceNote />
      </article>

      <StickyCta />
    </>
  );
}
