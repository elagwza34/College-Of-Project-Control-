import SiteLink from '@/components/base/SiteLink';
import ArticleLayout from '@/components/feature/ArticleLayout';
import ArticleCta from '@/components/feature/ArticleCta';
import RelatedArticles from '@/components/feature/RelatedArticles';
import PcpFaqSection from '@/components/feature/PcpFaqSection';
import Footer from '@/components/feature/Footer';

const articleFaqs = [
  {
    q: 'Does this cover outage planning and commissioning milestones?',
    a: 'Yes. The energy PCP route addresses the specific project controls challenges of outage planning, commissioning milestones, regulatory deadlines and capital programme governance. Learners develop the capability to control complex energy project schedules where downtime, regulatory compliance and asset integrity are critical.',
  },
  {
    q: 'Is this relevant for renewable energy and net zero projects?',
    a: 'Absolutely. The energy route covers conventional oil and gas, utilities, renewable energy, nuclear decommissioning, carbon capture and net zero infrastructure programmes. The project controls discipline — baseline control, cost assurance, risk visibility and governance confidence — applies across all energy sub-sectors.',
  },
  {
    q: 'Can we enrol our capital programme controls team?',
    a: 'Yes. Many energy organisations enrol capital programme controls teams as cohorts. This builds consistent project controls capability across the programme, strengthening governance, cost assurance and schedule confidence across multiple projects simultaneously.',
  },
  {
    q: 'What about regulatory and CDM compliance?',
    a: 'The energy route develops project controls capability that supports regulatory compliance and CDM requirements. Stronger project controls means stronger evidence for regulators, better audit readiness and more defensible decision-making in high-scrutiny energy environments.',
  },
];

const relatedArticles = [
  {
    title: 'What Is a Project Controls Professional Apprenticeship?',
    description: 'Everything you need to know about the Level 6 PCP apprenticeship.',
    href: '/knowledge-hub/what-is-pcp-apprenticeship',
    category: 'Funding Guides',
    readTime: '8 min read',
    tracking: 'related_article_what_is_pcp',
  },
  {
    title: 'Project Controls Training for Construction Teams in the UK',
    description: 'Sector-specific guidance for construction employers and project teams.',
    href: '/knowledge-hub/construction-training',
    category: 'Sector Guides',
    readTime: '8 min read',
    tracking: 'related_article_construction_training',
  },
  {
    title: 'Project Controls Apprenticeship Funding: Employer Guide',
    description: 'A practical guide for employers on funding eligibility, levy rules and employer value.',
    href: '/knowledge-hub/funded-pcp-employer-guide',
    category: 'Funding Guides',
    readTime: '10 min read',
    tracking: 'related_article_funded_employer_guide',
  },
];

export default function ArticleEnergyTraining() {
  return (
    <>
      <ArticleLayout
        meta={{
          title: 'Project Controls Training for Energy, Oil, Gas and Utilities Teams | College of Project Controls',
          description: 'Sector-specific project controls training for UK energy, oil and gas, utilities and capital programme teams. Build baseline control, cost assurance, risk visibility, outage planning and governance confidence. Funding subject to eligibility.',
          category: 'Sector Guides',
          readTime: '8 min read',
        }}
        heroImageUrl="https://readdy.ai/api/search-image?query=Premium%20British%20college%20study%20room%20with%20deep%20navy%20walls%2C%20warm%20gold%20lighting%2C%20industrial%20engineering%20diagrams%20and%20project%20schedule%20documents%20on%20a%20mahogany%20desk%2C%20executive%20serious%20atmosphere%2C%20soft%20dramatic%20light%2C%20no%20people%2C%20energy%20sector%20professional%20aesthetic&width=1600&height=900&seq=article-energy-training-2026&orientation=landscape"
        heroHeadline="Project Controls Training for Energy, Oil, Gas and Utilities Teams"
        heroSubheadline="Sector-specific guidance for energy, oil and gas, utilities and capital programme teams who need stronger baseline control, risk visibility, cost assurance, outage planning and governance confidence for complex delivery environments."
        quickSummary={[
          'Sector-specific project controls training for energy, oil and gas, utilities and net zero infrastructure programmes',
          'Covers outage planning, commissioning milestones, regulatory compliance and capital programme governance',
          'Funding subject to eligibility for energy employers in England through apprenticeship funding',
          'Develops baseline control, cost assurance, risk visibility and governance confidence for high-scrutiny environments',
          'Designed for capital programme teams, asset owners, operators and energy consultancy professionals',
        ]}
        ctaSection={
          <ArticleCta
            title="Explore the Energy Project Controls Route"
            body="Complete the form and an adviser will help you understand funding eligibility and how the energy PCP route builds the project controls capability your capital programmes need."
            primaryCta={{ label: 'Explore Energy PCP Route', href: '/operational-pcp-energy', tracking: 'energy_route_click' }}
            secondaryCta={{ label: 'Check Funding Availability', href: '/pcp-master#eligibility', tracking: 'eligibility_check_click' }}
            formFields={['name', 'email', 'phone', 'employer', 'job_title', 'learner_count', 'message']}
          />
        }
        faqSection={<PcpFaqSection title="Energy Project Controls: Common Questions" faqs={articleFaqs} />}
        relatedArticles={<RelatedArticles articles={relatedArticles} />}
      >
        <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mt-0 mb-4">For Capital Programmes Where Weak Controls Are Too Expensive to Ignore</h2>
        <p className="mb-4">
          In energy, oil and gas, utilities and net zero infrastructure, the cost of weak project controls is measured in millions. A single uncontrolled scope change, a missed regulatory deadline or a late-reported schedule delay can trigger contractual penalties, regulatory intervention, reputational damage and shareholder concern. <strong>Project controls capability is cheaper to build than project failure is to fix.</strong>
        </p>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Why Energy and Capital Programmes Need Stronger Controls</h3>
        <p className="mb-4">
          Energy project environments are uniquely demanding. They combine technical complexity, regulatory scrutiny, capital intensity, safety-critical operations and long investment horizons. In this context, project controls is not a support function. It is the discipline that protects the investment case.
        </p>
        <p className="mb-4">
          <strong>For teams where delay, cost drift and weak governance are no longer acceptable,</strong> the energy PCP route develops:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4 text-foreground-700">
          <li><strong>Baseline Control</strong> — Maintaining credible, controlled baselines across complex capital programmes where scope, cost and schedule must remain visible and governed.</li>
          <li><strong>Cost Assurance</strong> — Producing cost forecasts, variance analysis and estimate-at-completion data that finance directors, regulators and investors can trust.</li>
          <li><strong>Risk Visibility</strong> — Identifying, quantifying and escalating programme risks before they become cost and schedule crises — not after the quarterly review.</li>
          <li><strong>Outage Planning & Commissioning</strong> — Controlling complex outage schedules, commissioning milestones and regulatory deadlines where downtime carries commercial and safety consequences.</li>
          <li><strong>Governance Confidence</strong> — Building audit-ready evidence, decision-ready reporting and defensible governance frameworks for high-scrutiny energy environments.</li>
        </ul>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Who This Is For</h3>
        <p className="mb-4">
          The energy PCP route serves professionals across the energy and capital programme sector:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4 text-foreground-700">
          <li><strong>Capital Programme Controls Managers</strong> — Leading project controls functions on major energy capital programmes</li>
          <li><strong>Cost Engineers and Estimators</strong> — Strengthening cost forecasting, variance analysis and estimate confidence</li>
          <li><strong>Planners and Schedulers</strong> — Managing complex outage and commissioning schedules across multiple assets</li>
          <li><strong>Risk Managers</strong> — Building programme-level risk visibility that influences investment and delivery decisions</li>
          <li><strong>Governance and Assurance Leads</strong> — Developing the frameworks that give boards and regulators confidence in programme delivery</li>
        </ul>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">The Net Zero Dimension</h3>
        <p className="mb-4">
          The UK's net zero transition is one of the largest capital programme undertakings in generations. It demands project controls capability at scale: carbon capture, hydrogen infrastructure, offshore wind, nuclear new build and decommissioning, grid modernisation and energy storage. The professionals who control these programmes need sector-specific project controls capability — not generic project management training.
        </p>
        <p className="mb-4">
          <strong>Build the project controls capability your organisation cannot afford to be without.</strong> The energy PCP route develops professionals who can control the cost, time, risk and governance of net zero delivery with the rigour these programmes demand.
        </p>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Funding: Funding Subject to Eligibility</h3>
        <p className="mb-4">
          <strong>Apprenticeship funding may be available, subject to learner, employer and current funding-rule eligibility.</strong> Energy employers can access apprenticeship funding through the Department for Education framework. This makes the energy PCP route a strategically important investment in the project controls capability that protects capital programme value.
        </p>
        <p className="mb-4">
          <SiteLink href="/operational-pcp-energy" className="text-primary-600 hover:text-primary-700 underline font-semibold">Explore the Energy & Net Zero PCP Route →</SiteLink>
        </p>
      </ArticleLayout>
      <Footer />
    </>
  );
}