import SiteLink from '@/components/base/SiteLink';
import type { ReactNode } from 'react';

export interface FundingOverviewCard { title: string; content: ReactNode; }
export interface FundingSupportCard { title: string; description: string; }
export interface FundingCtaContent { title: string; description: string; label: string; href: string; }

interface FundingOptionsSectionProps {
  title?: string;
  description?: string;
  overviewCards?: FundingOverviewCard[];
  includedBenefits?: string[];
  supportCards?: FundingSupportCard[];
  ctaContent?: FundingCtaContent;
  imageSrc?: string;
  imageAlt?: string;
}

const defaultOverviewCards: FundingOverviewCard[] = [
  { title: 'Commercial credit value', content: <><span>Each four-credit course has a commercial tuition value of <strong className="font-bold text-primary-800">£4,000 GBP</strong>.</span><span className="mt-3 block">The Project Management Professional or Certified Associate in Project Management route is treated as a <strong className="font-bold text-primary-800">two-credit course</strong>. Most other listed courses are one credit.</span></> },
  { title: 'Apprenticeship route', content: <><span>Eligible apprenticeship programmes may be fully funded through Department for Education apprenticeship funding arrangements where learner, employer and programme conditions are met.</span><span className="mt-3 flex items-start gap-2 rounded-lg bg-highlight-50 p-3 text-xs font-semibold text-foreground-700"><i className="ri-information-line mt-0.5 shrink-0 text-highlight-700" aria-hidden="true" />Funding is assessed individually and is not guaranteed.</span></> },
];

const defaultIncludedBenefits = [
  'London Masterclass', 'Professional memberships', 'Professional clubs',
  'Institute of Project Controls membership for two years',
  'Private healthcare insurance during the programme', 'Access to our mental wellbeing system',
  'Inclusiveness assessments', 'Optional non-diagnostic education-barrier assessment',
  'Optional personality traits assessment', 'Job and career fitness psychological tests',
];

const defaultSupportCards: FundingSupportCard[] = [
  { title: 'Institute of Project Controls Fund', description: 'The Institute of Project Controls Fund may support eligible applicants by contributing towards tuition fees, subject to pathway, evidence and approval criteria.' },
  { title: 'Institute of Project Controls: up to 75% support', description: 'For eligible unemployed or self-employed learners, the Institute of Project Controls Fund may cover up to 75% of tuition fees, subject to approval.' },
  { title: 'Institute of Project Controls: up to 50% support', description: 'For eligible employed learners, the Institute of Project Controls Fund may cover up to 50% of tuition fees, with the employer contributing the remaining share, subject to approval.' },
];

const defaultCta: FundingCtaContent = {
  title: 'Discuss the funding route for your circumstances',
  description: 'Confirm programme fit, funding conditions and the next available start date with the Kent Business College team.',
  label: 'Discuss Your Funding Options', href: '/book-a-session',
};

export default function FundingOptionsSection({
  title = 'Funding options after we confirm fit',
  description = 'The right funding route depends on programme fit, learner status and employer eligibility.',
  overviewCards = defaultOverviewCards,
  includedBenefits = defaultIncludedBenefits,
  supportCards = defaultSupportCards,
  ctaContent = defaultCta,
  imageSrc = '/images/hero-professional.webp',
  imageAlt = 'Professionals developing project management and project controls capability',
}: FundingOptionsSectionProps) {
  return (
    <section className="relative overflow-hidden bg-background-50 py-16 md:py-24" aria-labelledby="funding-options-title">
      <div className="container-site relative">
        <header className="max-w-3xl">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-accent-700"><span className="h-2 w-2 rounded-full bg-highlight-500" aria-hidden="true" />Funding and costs</p>
          <h2 id="funding-options-title" className="mt-4 text-3xl font-bold leading-tight text-foreground-950 md:text-4xl lg:text-5xl">{title}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground-600 md:text-base">{description}</p>
        </header>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {overviewCards.map(card => <article key={card.title} className="flex h-full flex-col rounded-2xl border border-background-200 bg-white p-6 shadow-card md:p-8"><span className="mb-5 h-1 w-12 rounded-full bg-highlight-500" aria-hidden="true" /><h3 className="text-xl font-bold text-foreground-950 md:text-2xl">{card.title}</h3><div className="mt-4 text-sm leading-relaxed text-foreground-600 md:text-base">{card.content}</div></article>)}
        </div>

        <article className="mt-6 overflow-hidden rounded-2xl border border-background-200 bg-white shadow-card">
          <div className="aspect-[16/7] min-h-[220px] overflow-hidden bg-primary-100 sm:aspect-[16/6]"><img src={imageSrc} alt={imageAlt} className="h-full w-full object-cover object-center" loading="lazy" /></div>
          <div className="p-6 md:p-8 lg:p-10"><p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-700">Included professional support</p><h3 className="mt-3 max-w-3xl text-2xl font-bold text-foreground-950 md:text-3xl">What the course and programme package is designed to include</h3><div className="mt-7 flex flex-wrap gap-2.5">{includedBenefits.map(benefit => <span key={benefit} className="rounded-full border border-accent-200 bg-accent-50 px-3.5 py-2 text-xs font-semibold leading-snug text-primary-800">{benefit}</span>)}</div></div>
        </article>

        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {supportCards.map((card, index) => <article key={card.title} className="flex h-full flex-col rounded-2xl border border-background-200 bg-white p-6 shadow-card md:p-7"><div className="flex items-center justify-between gap-4"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-700"><i className={index === 0 ? 'ri-shield-star-line' : 'ri-funds-line'} aria-hidden="true" /></span><span className="text-xs font-bold text-background-400">0{index + 1}</span></div><h3 className="mt-5 text-lg font-bold leading-snug text-foreground-950">{card.title}</h3><p className="mt-3 text-sm leading-relaxed text-foreground-600">{card.description}</p></article>)}
        </div>

        <aside className="mt-6 rounded-xl border border-background-200 border-l-4 border-l-accent-500 bg-white p-5" aria-label="Funding eligibility information"><div className="flex items-start gap-3"><i className="ri-information-line mt-0.5 shrink-0 text-lg text-accent-700" aria-hidden="true" /><p className="text-sm leading-relaxed text-foreground-600">Funding eligibility can vary. You can visit the <SiteLink href="/institute-of-project-controls" className="font-semibold text-primary-700 underline decoration-primary-300 underline-offset-2 hover:text-primary-900">Institute of Project Controls</SiteLink> website or speak to the Kent Business College team to discuss the most appropriate funding option.</p></div></aside>

        <div className="mt-6 rounded-2xl bg-primary-800 p-6 text-white md:flex md:items-center md:justify-between md:gap-10 md:p-8"><div><h3 className="text-2xl font-bold text-white">{ctaContent.title}</h3><p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">{ctaContent.description}</p></div><SiteLink href={ctaContent.href} className="btn-primary mt-6 inline-flex min-h-12 w-full shrink-0 items-center justify-center px-6 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:mt-0 md:w-auto">{ctaContent.label}<i className="ri-arrow-right-line ml-2" aria-hidden="true" /></SiteLink></div>
      </div>
    </section>
  );
}
