import SiteLink from '@/components/base/SiteLink';
import ArticleLayout from '@/components/feature/ArticleLayout';
import ArticleCta from '@/components/feature/ArticleCta';
import RelatedArticles from '@/components/feature/RelatedArticles';
import PcpFaqSection from '@/components/feature/PcpFaqSection';
import Footer from '@/components/feature/Footer';

const articleFaqs = [
  {
    q: 'Does this cover NEC contract project controls?',
    a: 'Yes. The construction PCP route addresses project controls in NEC contract environments, including change control, early warning systems, compensation event management and programme submissions. Learners develop the discipline to manage NEC project controls with the rigour that NEC contracts demand.',
  },
  {
    q: 'Is this relevant for both main contractors and clients?',
    a: 'Yes. The construction PCP route is designed for project controls professionals working across the supply chain — main contractors, subcontractors, client organisations, infrastructure owners and consultancy teams. The capability developed applies regardless of where you sit in the construction delivery structure.',
  },
  {
    q: 'Can my construction team enrol as a cohort?',
    a: 'Absolutely. Many construction employers enrol multiple learners — planners, cost engineers and project controls managers — as a cohort. This builds consistent capability across the team and strengthens organisational project controls maturity. Speak to an adviser about cohort enrolment and timing.',
  },
  {
    q: 'What about infrastructure and civil engineering?',
    a: 'The construction route covers building, infrastructure, civil engineering and urban programme environments. The project controls principles — planning discipline, cost visibility, change control and progress reporting — apply across all construction sub-sectors. Learners apply capability in their specific project context.',
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
    title: 'Strategic vs Operational Project Controls: Which Pathway Is Right for You?',
    description: 'Understand the difference between strategic and operational project controls routes.',
    href: '/knowledge-hub/strategic-vs-operational',
    category: 'Route Comparisons',
    readTime: '8 min read',
    tracking: 'related_article_strategic_vs_operational',
  },
  {
    title: 'Project Controls Training for Energy, Oil, Gas and Utilities Teams',
    description: 'Sector-specific guidance for energy and capital programme teams.',
    href: '/knowledge-hub/energy-training',
    category: 'Sector Guides',
    readTime: '8 min read',
    tracking: 'related_article_energy_training',
  },
];

export default function ArticleConstructionTraining() {
  return (
    <>
      <ArticleLayout
        meta={{
          title: 'Project Controls Training for Construction Teams in the UK | College of Project Controls',
          description: 'Sector-specific project controls training for UK construction employers, planners, schedulers and NEC project teams. Build planning discipline, cost visibility, change control and progress reporting capability. Funding subject to eligibility.',
          category: 'Sector Guides',
          readTime: '8 min read',
        }}
        heroImageUrl="https://readdy.ai/api/search-image?query=Premium%20British%20college%20study%20room%20with%20deep%20navy%20walls%2C%20warm%20gold%20lighting%2C%20architectural%20blueprint%20rolled%20on%20a%20mahogany%20desk%20next%20to%20a%20leather%20bound%20schedule%20book%2C%20executive%20serious%20atmosphere%2C%20soft%20dramatic%20light%2C%20no%20people%2C%20construction%20professional%20aesthetic&width=1600&height=900&seq=article-construction-2026&orientation=landscape"
        heroHeadline="Project Controls Training for Construction Teams in the UK"
        heroSubheadline="Sector-specific guidance for construction employers, planners, schedulers, commercial teams and NEC project professionals who need stronger planning discipline, cost visibility, change control and progress reporting capability."
        quickSummary={[
          'Sector-specific project controls training for UK construction, building and urban programme environments',
          'Covers NEC change control, programme submissions, compensation event management and early warning systems',
          'Funding subject to eligibility for construction employers in England through apprenticeship funding',
          'Develops planning discipline, cost forecasting, risk visibility and progress reporting capability that construction projects demand',
          'Designed for main contractors, subcontractors, client organisations and consultancy teams',
        ]}
        ctaSection={
          <ArticleCta
            title="Check Construction Route Eligibility"
            body="Complete the form and an adviser will help you understand funding eligibility and how the construction PCP route fits your team's capability needs."
            primaryCta={{ label: 'Check Construction Route Eligibility', href: '/pcp-master#eligibility', tracking: 'eligibility_check_click' }}
            secondaryCta={{ label: 'Request a consultation', href: '/pcp-master#consultation', tracking: 'book_consultation_click' }}
            formFields={['name', 'email', 'phone', 'employer', 'job_title', 'learner_count', 'message']}
          />
        }
        faqSection={<PcpFaqSection title="Construction Project Controls: Common Questions" faqs={articleFaqs} />}
        relatedArticles={<RelatedArticles articles={relatedArticles} />}
      >
        <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mt-0 mb-4">Stop Letting Schedule Delays and Cost Drift Become Normal</h2>
        <p className="mb-4">
          In construction, delay and cost overrun have become so common that many teams accept them as inevitable. They are not. <strong>The most expensive project controls problem is not the one you can see. It is the one your team reports too late.</strong> Stronger project controls capability in construction means seeing problems earlier, controlling change more rigorously and giving commercial and delivery leaders the data they need to make confident decisions.
        </p>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Why Construction Needs Stronger Project Controls</h3>
        <p className="mb-4">
          Construction projects operate under unique pressures: fixed-price contracts, liquidated damages, NEC compensation events, supply chain complexity, weather risk, resource availability and stakeholder scrutiny. In this environment, weak project controls are not just inconvenient — they are commercially dangerous.
        </p>
        <p className="mb-4">
          <strong>For teams where delay, cost drift and weak governance are no longer acceptable,</strong> the construction PCP route builds the specific capability that construction projects demand:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4 text-foreground-700">
          <li><strong>Planning & Scheduling discipline</strong> — Programmes that drive delivery, not documents that decorate progress meetings. Credible logic, realistic durations and visible critical paths.</li>
          <li><strong>Cost Engineering & Forecasting</strong> — Cost estimates, budgets and forecasts that commercial teams and project directors can trust for investment and variation decisions.</li>
          <li><strong>NEC Change Control</strong> — Early warning systems, compensation event management and programme submissions handled with the rigour NEC contracts demand.</li>
          <li><strong>Risk & Opportunity Management</strong> — Risk registers that actually influence decisions, not spreadsheets that get updated before audits and ignored the rest of the time.</li>
          <li><strong>Progress Reporting & Data Assurance</strong> — Decision-ready reports that tell the truth about where the project really is, not where everyone hopes it is.</li>
        </ul>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">What the Construction PCP Route Delivers</h3>
        <p className="mb-4">
          The construction sector route within the Level 6 Project Controls Professional programme is not a generic project management course with construction examples added. It is a structured professional development pathway built from the ground up for construction reality:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4 text-foreground-700">
          <li>Workplace evidence drawn directly from live construction projects — your schedules, your cost reports, your change registers</li>
          <li>One-to-one tutoring from practitioners who understand construction delivery, NEC contracts and the pressures of site-level project controls</li>
          <li>London Master Class Events with construction peers facing the same project controls challenges</li>
          <li>APM ChPP readiness support tailored to construction professional practice</li>
          <li>Professional exams and memberships covered where applicable</li>
        </ul>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Who This Is For</h3>
        <p className="mb-4">
          The construction PCP route is designed for professionals across the construction supply chain:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4 text-foreground-700">
          <li><strong>Planners and Schedulers</strong> — Building and maintaining credible programmes using Primavera P6, Asta Powerproject or MS Project</li>
          <li><strong>Cost Engineers and Quantity Surveyors</strong> — Strengthening cost control, forecasting and commercial reporting capability</li>
          <li><strong>Project Controls Managers</strong> — Leading project controls functions on major construction programmes</li>
          <li><strong>NEC Project Managers and Commercial Teams</strong> — Managing change, compensation events and programme submissions with confidence</li>
          <li><strong>Construction Employers</strong> — Building consistent project controls capability across project teams and frameworks</li>
        </ul>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Employer Value: Build Capability Your Construction Business Cannot Afford to Be Without</h3>
        <p className="mb-4">
          <strong>Build the project controls capability your organisation cannot afford to be without.</strong> For construction employers, the PCP apprenticeship delivers measurable returns:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4 text-foreground-700">
          <li>Fewer late-reported delays — problems identified and escalated before they become programme crises</li>
          <li>Stronger NEC compliance — change control and compensation events managed with the rigour contracts require</li>
          <li>More reliable cost forecasting — commercial teams and directors working from numbers they can trust</li>
          <li>Better governance evidence — audit-ready documentation that withstands client and stakeholder scrutiny</li>
          <li>Consistent capability across teams — not one strong planner carrying the project controls burden alone</li>
        </ul>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Funding: Funding Subject to Eligibility</h3>
        <p className="mb-4">
          <strong>Apprenticeship funding may be available, subject to learner, employer and current funding-rule eligibility.</strong> Construction employers can access apprenticeship funding through the Department for Education framework. Levy-paying employers use their levy funds. Government support and any employer contribution depend on learner age, employer status and the funding rules in force on the start date. This makes the construction PCP route exceptionally cost-effective for building sector-specific project controls capability.
        </p>
        <p className="mb-4">
          <SiteLink href="/operational-pcp-construction" className="text-primary-600 hover:text-primary-700 underline font-semibold">Explore the Construction & Urban PCP Route →</SiteLink>
        </p>
      </ArticleLayout>
      <Footer />
    </>
  );
}