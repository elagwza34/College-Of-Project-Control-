import ArticleIntroduction from './article/ArticleIntroduction';
import QuickSummary from './article/QuickSummary';
import { type ReactNode } from 'react';
import PcpComplianceNote from './PcpComplianceNote';
import StickyCta from './StickyCta';

export interface ArticleLayoutProps {
  heroSection?: ReactNode;
  summarySection?: ReactNode;
  meta?: {
    title: string;
    description: string;
    category: string;
    readTime: string;
  };
  heroImageUrl?: string;
  heroHeadline?: string;
  heroSubheadline?: string;
  quickSummary?: string[];
  children: ReactNode;
  ctaSection: ReactNode;
  faqSection?: ReactNode;
  relatedArticles: ReactNode;
}

export default function ArticleLayout({
  heroSection,
  summarySection,
  meta,
  heroImageUrl,
  heroHeadline,
  heroSubheadline,
  quickSummary,
  children,
  ctaSection,
  relatedArticles,
}: ArticleLayoutProps) {
  return (
    <>
      
      
      
      
      
      
      
      
      
      

      <article>
        {/* Hero */}
        {heroSection ?? <ArticleIntroduction meta={meta} heroImageUrl={heroImageUrl} heroHeadline={heroHeadline} heroSubheadline={heroSubheadline} />}

        {/* Quick Summary Box */}
        {summarySection ?? <QuickSummary quickSummary={quickSummary} />}

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

        {/* Related Articles */}
        {relatedArticles}

        <PcpComplianceNote />
      </article>

      <StickyCta />
    </>
  );
}
