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

/** Audit P00.5 / P01.6 / P04.7 / P11.4 (funding gate): the two offers are priced
 *  and funded differently, so they are described separately and never implied to
 *  produce identical outcomes. Every figure below is conditional and must match
 *  the approved offer. */
const defaultOverviewCards: FundingOverviewCard[] = [
  {
    title: 'Apprenticeships: funding is assessed individually',
    content: (
      <>
        <span>
          Associate Project Manager Level 4 and Project Controls Professional Level 6 are delivered
          as apprenticeships. Where a learner, employer and programme all meet the conditions, the
          apprenticeship may be funded through Department for Education apprenticeship funding
          arrangements.
        </span>
        <span className="mt-3 flex items-start gap-2 rounded-lg bg-highlight-50 p-3 text-xs font-semibold text-foreground-700">
          <i className="ri-information-line mt-0.5 shrink-0 text-highlight-700" aria-hidden="true" />
          Funding is not guaranteed. It depends on your age band, employer levy status, the standard
          in effect on your start date and whether you are already funded elsewhere. Your written
          offer confirms the position for your circumstances.
        </span>
      </>
    ),
  },
  {
    title: 'Professional study: commercial fees and separate support',
    content: (
      <>
        <span>
          Our short courses and professional programmes are commercial study, not apprenticeships.
          Each four-credit course has a commercial tuition value of{' '}
          <strong className="font-bold text-primary-800">£4,000 GBP</strong>. The Project Management
          Professional or Certified Associate in Project Management route is treated as a two-credit
          course. Most other listed courses are one credit.
        </span>
        <span className="mt-3 block">
          Completing professional study does not by itself produce an apprenticeship certificate or
          an occupational standard award.
        </span>
      </>
    ),
  },
];

const defaultIncludedBenefits = [
  'London Masterclass', 'Professional memberships', 'Professional clubs',
  'Institute of Project Controls membership for two years',
  'Private healthcare insurance during the programme', 'Access to our mental wellbeing system',
  'Inclusiveness assessments', 'Optional non-diagnostic education-barrier assessment',
  'Optional personality traits assessment', 'Job and career fitness psychological tests',
];

/** Audit P00.5: these are Institute of Project Controls benefits offered against
 *  professional study only. They must not be presented as apprenticeship funding. */
const defaultSupportCards: FundingSupportCard[] = [
  {
    title: 'Institute of Project Controls Fund',
    description:
      'The Institute of Project Controls Fund may support eligible applicants towards professional-study tuition fees, subject to pathway, evidence and approval criteria.',
  },
  {
    title: 'Professional study: up to 75% support',
    description:
      'For eligible unemployed or self-employed learners taking professional study, the Institute of Project Controls Fund may cover up to 75% of tuition fees, subject to approval.',
  },
  {
    title: 'Professional study: up to 50% support',
    description:
      'For eligible employed learners taking professional study, the Institute of Project Controls Fund may cover up to 50% of tuition fees, with the employer contributing the remaining share, subject to approval.',
  },
];

const defaultCta: FundingCtaContent = {
  title: 'Discuss the funding route for your circumstances',
  description: 'Confirm programme fit, funding conditions and the next available start date with the Kent Business College team.',
  label: 'Discuss Your Funding Options', href: '/book-a-session',
};

export default function FundingOptionsSection({
  title = 'Funding options',
  description =
    'Apprenticeships and professional study are funded differently. The right route depends on programme fit, learner status and employer eligibility.',
  overviewCards = defaultOverviewCards,
  includedBenefits = defaultIncludedBenefits,
  supportCards = defaultSupportCards,
  ctaContent = defaultCta,
  imageSrc = 'https://jokdxsdbxorzciulkdyl.supabase.co/storage/v1/object/public/images/acf27d01133741779494ccc02a3edb89.png',
  imageAlt = 'Construction professional wearing a hard hat at a city building site',
}: FundingOptionsSectionProps) {
  return (
    <section className="bg-background-50 py-12 md:py-16" aria-labelledby="funding-options-title">
      <header className="relative isolate flex min-h-80 w-full min-w-0 items-end overflow-hidden bg-primary-950 md:aspect-[3/1]">
            <img src={imageSrc} alt={imageAlt} width={2172} height={724} className="absolute inset-0 -z-20 h-full w-full object-cover object-[65%_center] md:object-center" loading="lazy" decoding="async" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary-950/90 via-primary-950/55 to-primary-950/10 md:via-primary-950/20" aria-hidden="true" />
            <div className="container-site flex items-end justify-between gap-8 pb-24 pt-8 md:pb-28">
            <div className="max-w-md lg:max-w-lg">
              <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.24em] text-white/90"><span className="h-0.5 w-10 bg-highlight-400" aria-hidden="true" />Funding and costs</p>
              <h2 id="funding-options-title" className="mt-4 text-4xl font-bold leading-tight tracking-tight text-white lg:text-5xl">{title}</h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/90">{description}</p>
            </div>
            <div className="hidden shrink-0 text-xs font-semibold uppercase leading-7 tracking-[.22em] text-white lg:block" aria-hidden="true"><span className="mb-4 block h-0.5 w-10 bg-highlight-400" />People<br />Projects<br />Progress</div>
            </div>
          </header>

          <div className="container-site relative z-10 -mt-12 space-y-4">
            <div className="grid gap-3 md:grid-cols-2">
              {overviewCards.map((card, index) => (
                <article key={card.title} className="flex items-start gap-4 rounded-xl border border-background-200 bg-white p-5 shadow-card">
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-2xl ${index === 0 ? 'bg-highlight-50 text-highlight-700' : 'bg-accent-50 text-primary-800'}`}><i className={index === 0 ? 'ri-coins-line' : 'ri-team-line'} aria-hidden="true" /></span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-foreground-950 sm:text-base">{card.title}</h3>
                    <div className="mt-2 text-xs leading-relaxed text-foreground-600">{card.content}</div>
                  </div>
                  <SiteLink href={ctaContent.href} aria-label={`Discuss ${card.title.toLowerCase()}`} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-800 transition-colors hover:bg-primary-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"><i className="ri-arrow-right-s-line text-lg" aria-hidden="true" /></SiteLink>
                </article>
              ))}
            </div>

            <article className="flex items-start gap-4 rounded-xl border border-accent-100 bg-accent-50/50 p-5">
              <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-100 text-2xl text-primary-800 sm:flex"><i className="ri-box-3-line" aria-hidden="true" /></span>
              <div>
                <h3 className="text-sm font-bold text-primary-900 sm:text-base">Included professional support</h3>
                <p className="mt-1 text-xs text-foreground-600">Your course and programme package is designed to include:</p>
                <div className="mt-3 flex flex-wrap gap-2">{includedBenefits.map(benefit => <span key={benefit} className="rounded-full border border-accent-200 bg-white px-3 py-1 text-[11px] font-semibold leading-relaxed text-primary-800">{benefit}</span>)}</div>
              </div>
            </article>

            <div className="grid divide-y divide-accent-300/25 overflow-hidden rounded-xl bg-primary-900 text-white lg:grid-cols-3 lg:divide-x lg:divide-y-0">
              {supportCards.map((card, index) => (
                <article key={card.title} className="flex items-start gap-4 p-5 lg:p-6">
                  <i className={`${index === 0 ? 'ri-graduation-cap-line' : index === 1 ? 'ri-bar-chart-grouped-line' : 'ri-team-fill'} shrink-0 text-3xl text-accent-100`} aria-hidden="true" />
                  <div>
                    <h3 className="text-sm font-bold leading-snug text-white">{card.title.replace('Professional study: up to', 'Up to')}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-white/75">{card.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
              <aside className="flex flex-1 items-center gap-3 rounded-xl border border-background-200 bg-background-50 px-4 py-3" aria-label="Funding eligibility information">
                <i className="ri-information-line shrink-0 text-xl text-accent-700" aria-hidden="true" />
                <p className="text-xs leading-relaxed text-foreground-600">Funding eligibility can vary. Visit the <SiteLink href="/institute-of-project-controls" className="font-medium text-primary-700 underline underline-offset-2 hover:text-primary-900">Institute of Project Controls</SiteLink> or speak to the Kent Business College team.</p>
              </aside>
              <SiteLink href={ctaContent.href} className="btn-primary inline-flex min-h-12 shrink-0 items-center justify-center gap-3 px-5 py-3 text-xs font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700">{ctaContent.label}<i className="ri-arrow-right-line text-base" aria-hidden="true" /></SiteLink>
            </div>
          </div>
    </section>
  );
}
