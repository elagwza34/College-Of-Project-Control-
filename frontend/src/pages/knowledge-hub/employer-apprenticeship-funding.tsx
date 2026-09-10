import ArticleLayout from '@/components/feature/ArticleLayout';
import ArticleCta from '@/components/feature/ArticleCta';
import RelatedArticles from '@/components/feature/RelatedArticles';
import PcpFaqSection from '@/components/feature/PcpFaqSection';
import Footer from '@/components/feature/Footer';

const articleFaqs = [
  {
    q: 'How quickly can we get learners started once funding is confirmed?',
    a: 'The PCP programme has intakes in September, January and May. Once eligibility is confirmed and funding arrangements are in place, learners can join the next available intake. The enrolment process typically takes several weeks, so planning ahead is recommended. Speak to an adviser about cohort timing and enrolment windows.',
  },
  {
    q: 'Can we use apprenticeship funding for existing employees, not just new hires?',
    a: 'Yes. The Level 6 PCP apprenticeship is open to both new entrants and existing employees. Many organisations use it to develop current planners, cost engineers, risk managers and PMO professionals. The key requirement is that the role provides genuine opportunity to develop and apply project controls capability at the appropriate level.',
  },
  {
    q: 'What if we have unused levy funds expiring?',
    a: 'Apprenticeship levy funds expire after 24 months if not used. If your organisation has accumulated levy funds approaching expiry, using them for PCP apprenticeship enrolment is a commercially responsible way to convert expiring funds into lasting project controls capability. An eligibility discussion can help you assess how many learners your levy balance can support.',
  },
  {
    q: 'How do we measure ROI from the PCP investment?',
    a: 'ROI measurement focuses on capability outcomes, not training completion. Key indicators include: reduced schedule variance on projects with PCP-trained planners, improved cost forecast accuracy, fewer late-reported risks, stronger audit outcomes and improved governance confidence scores. Many employers also track retention and internal promotion rates for PCP learners.',
  },
  {
    q: 'What support does the employer receive during the programme?',
    a: 'Employers receive regular progress reporting, dedicated account management, support with apprenticeship funding administration through the digital apprenticeship service and guidance on maximising the workplace evidence component. KBC added-value support ensures employers are supported throughout the programme, not just at enrolment.',
  },
];

const relatedArticles = [
  {
    title: 'Project Controls Apprenticeship Funding: Employer Guide',
    description: 'Everything employers need to know about funding eligibility, levy rules and employer value.',
    href: '/knowledge-hub/funded-pcp-employer-guide',
    category: 'Funding Guides',
    readTime: '10 min read',
    tracking: 'related_article_funded_employer_guide',
  },
  {
    title: 'What Is a Project Controls Professional Apprenticeship?',
    description: 'Everything you need to know about the Level 6 PCP apprenticeship.',
    href: '/knowledge-hub/what-is-pcp-apprenticeship',
    category: 'Funding Guides',
    readTime: '8 min read',
    tracking: 'related_article_what_is_pcp',
  },
  {
    title: 'PMO Governance Training UK: Building Decision-Ready Reporting',
    description: 'How PMO teams can move from reporting what happened to providing decision confidence.',
    href: '/knowledge-hub/pmo-governance-training',
    category: 'Employer Decision Guides',
    readTime: '8 min read',
    tracking: 'related_article_pmo_governance',
  },
];

export default function ArticleEmployerFunding() {
  return (
    <>
      <ArticleLayout
        meta={{
          title: 'How Employers Can Use Apprenticeship Funding to Build Project Controls Capability | College of Project Controls',
          description: 'Practical guide for UK employers: how HR, L&D and senior leaders can use apprenticeship funding to build measurable project controls capability. Covers levy and non-levvy funding, ROI, cohort enrolment and employer value for construction, energy, public sector and PMO teams.',
          category: 'Employer Decision Guides',
          readTime: '9 min read',
        }}
        heroImageUrl="https://readdy.ai/api/search-image?query=Premium%20British%20college%20boardroom%20with%20deep%20navy%20walls%2C%20large%20mahogany%20conference%20table%2C%20executive%20presentation%20documents%20and%20business%20case%20papers%20laid%20out%2C%20warm%20gold%20lighting%2C%20serious%20corporate%20decision%20making%20atmosphere%2C%20soft%20dramatic%20light%2C%20no%20people%2C%20professional%20investment%20aesthetic&width=1600&height=900&seq=article-employer-funding-2026&orientation=landscape"
        heroHeadline="How Employers Can Use Apprenticeship Funding to Build Project Controls Capability"
        heroSubheadline="A practical guide for HR Directors, L&D Managers, Heads of PMO and senior leaders who want to leverage apprenticeship funding to develop measurable project controls capability across their organisation."
        quickSummary={[
          'UK employers can use apprenticeship funding to build project controls capability with minimal direct cost where eligible',
          'Levy-paying employers may use available levy funds; other contribution rates depend on learner age and current rules',
          'The Level 6 PCP apprenticeship is open to both new hires and existing employees — it is professional development, not just an entry route',
          'Multiple learners can be enrolled as cohorts to build consistent organisational project controls capability',
          'Funding and support are subject to employer eligibility, learner suitability, funding rules and availability',
        ]}
        ctaSection={
          <ArticleCta
            title="Check Your Organisation's Funding Eligibility"
            body="Complete the form and an adviser will help you understand your funding position, how many learners you can support and the best route for your team."
            primaryCta={{ label: 'Check Funding Availability', href: '/pcp-master#eligibility', tracking: 'eligibility_check_click' }}
            secondaryCta={{ label: 'Request an employer consultation', href: '/pcp-master#consultation', tracking: 'book_consultation_click' }}
            formFields={['name', 'email', 'phone', 'employer', 'job_title', 'learner_count', 'sector', 'message']}
          />
        }
        faqSection={<PcpFaqSection title="Employer Funding: Common Questions" faqs={articleFaqs} />}
        relatedArticles={<RelatedArticles articles={relatedArticles} />}
      >
        <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mt-0 mb-4">Use Apprenticeship Funding to Build Project Controls Capability Your Business Can Actually Measure</h2>
        <p className="mb-4">
          <strong>Project controls capability is cheaper to build than project failure is to fix.</strong> For UK employers who manage projects, programmes, capital investments or operational delivery, this statement is not a slogan. It is a financial reality. One delayed milestone, one uncontrolled scope change or one late risk escalation can cost more than developing an entire cohort of project controls professionals through apprenticeship funding.
        </p>
        <p className="mb-4">
          This guide explains, in practical terms, how HR, L&D and senior leaders can use apprenticeship funding to build measurable project controls capability across their organisation.
        </p>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Step 1: Understand Your Funding Position</h3>
        <p className="mb-4">
          The first step is understanding what funding is available to your organisation:
        </p>
        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-background-200">
                <th className="text-left py-3 px-4 font-heading font-semibold text-foreground-900">Organisation Type</th>
                <th className="text-left py-3 px-4 font-heading font-semibold text-foreground-900">Funding Mechanism</th>
                <th className="text-left py-3 px-4 font-heading font-semibold text-foreground-900">Employer Contribution</th>
              </tr>
            </thead>
            <tbody className="text-foreground-700">
              <tr className="border-b border-background-200/70">
                <td className="py-3 px-4 font-medium text-foreground-900">Levy-Paying (pay bill {'>'} £3M)</td>
                <td className="py-3 px-4">Apprenticeship levy funds via digital account</td>
                <td className="py-3 px-4">£0 (levy funds cover full cost up to band cap)</td>
              </tr>
              <tr className="border-b border-background-200/70">
                <td className="py-3 px-4 font-medium text-foreground-900">Non-Levy (pay bill {'<'} £3M)</td>
                <td className="py-3 px-4">Government co-investment</td>
                <td className="py-3 px-4">5% of training cost (~£1,350 per learner)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-foreground-900">Non-Levy, fewer than 50 employees</td>
                <td className="py-3 px-4">Government co-investment + small employer waiver</td>
                <td className="py-3 px-4">£0 (government funds 100%)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mb-4">
          <strong>Apprenticeship funding may be available, subject to learner, employer and current funding-rule eligibility.</strong> If your organisation is not based in England, different apprenticeship funding rules apply. The commercial route is available for organisations and learners outside English funding eligibility.
        </p>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Step 2: Identify Where Project Controls Capability Matters Most</h3>
        <p className="mb-4">
          <strong>Stop reporting project problems after they happen. Build the capability to see them earlier.</strong> Before enrolling learners, identify where in your organisation stronger project controls capability would deliver the greatest return. Common high-impact areas include:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4 text-foreground-700">
          <li><strong>Planning & Scheduling</strong> — Teams whose programme credibility directly affects commercial and contractual outcomes</li>
          <li><strong>Cost Engineering</strong> — Teams whose cost forecasts and estimates inform investment and pricing decisions</li>
          <li><strong>Risk Management</strong> — Teams whose risk identification and escalation capability affects project and programme outcomes</li>
          <li><strong>PMO & Governance</strong> — Teams whose reporting and decision-support capability affects board and stakeholder confidence</li>
          <li><strong>Commercial Controls</strong> — Teams managing NEC contracts, compensation events, variations and change control</li>
        </ul>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Step 3: Choose the Right PCP Route for Your Team</h3>
        <p className="mb-4">
          <strong>One funded pathway. Five professional capability tracks.</strong> The PCP programme offers multiple routes, each designed for specific roles, sectors and capability needs:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4 text-foreground-700">
          <li><strong>Strategic PCP</strong> — For Heads of PMO, Programme Directors and senior project controls leaders</li>
          <li><strong>Operational PCP</strong> — For planners, schedulers, cost engineers and risk managers</li>
          <li><strong>Strategic + Operational</strong> — For professionals who need both technical depth and leadership capability</li>
          <li><strong>PMO & Governance PCP</strong> — For PMO professionals building decision-ready reporting and governance frameworks</li>
          <li><strong>Sector-Specific Routes</strong> — Construction, Energy, Engineering, Public Sector routes tailored to sector project controls challenges</li>
        </ul>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Step 4: Plan Your Cohort</h3>
        <p className="mb-4">
          Many employers enrol multiple learners simultaneously to build consistent project controls capability across teams. Cohort enrolment creates peer support, shared learning and consistent capability standards. Intakes run in September, January and May.
        </p>
        <p className="mb-4">
          When planning your cohort, consider the mix of roles that would most strengthen your organisation's project controls maturity. A construction employer might enrol planners, cost engineers and a PMO lead together. An energy employer might enrol capital programme controls managers and risk specialists as a cohort.
        </p>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Step 5: Make the Business Case</h3>
        <p className="mb-4">
          When presenting the investment case internally, frame the conversation around capability outcomes, not training spend. The question is not "Can we afford this?" — for eligible employers it costs very little. The real question is: <strong>"What is weak project controls capability costing us right now, and what would stronger capability be worth?"</strong>
        </p>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Take the Next Step</h3>
        <p className="mb-4">
          The best way to understand your funding position and which routes fit your team is to speak to an adviser. Check funding availability, explore route options and plan your cohort with someone who understands the programme and the funding rules.
        </p>
      </ArticleLayout>
      <Footer />
    </>
  );
}
