import SiteLink from '@/components/base/SiteLink';
import ArticleLayout from '@/components/feature/ArticleLayout';
import ArticleCta from '@/components/feature/ArticleCta';
import RelatedArticles from '@/components/feature/RelatedArticles';
import PcpFaqSection from '@/components/feature/PcpFaqSection';
import Footer from '@/components/feature/Footer';

const articleFaqs = [
  {
    q: 'How is apprenticeship funding assessed?',
    a: 'Apprenticeship funding may be available in England. Levy-paying employers may use available levy funds; other government support and any employer contribution depend on learner age, employer status and the rules in force on the start date. This is not "free for everyone", so we confirm eligibility before enrolment.',
  },
  {
    q: 'What is the difference between levy and non-levy employers?',
    a: 'Levy-paying employers manage apprenticeship funds through their digital apprenticeship service account. Non-levy employers may access government co-investment. The amount available and any employer contribution depend on learner age, employer circumstances and the rules in force on the apprenticeship start date.',
  },
  {
    q: 'What does KBC added-value support include?',
    a: 'KBC added-value support includes professional exams and membership fees covered where applicable, London Master Class Events, private healthcare during the programme, one-to-one tutoring and workplace evidence support. KBC is not the government funder. KBC added-value support describes the additional learner and employer support Kent Business College provides beyond the funded apprenticeship standard.',
  },
  {
    q: 'Can my organisation enrol multiple learners?',
    a: 'Yes. Employers can enrol multiple learners across different cohorts and sectors. The programme is designed to support team-level capability building, not just individual development. Many employers enrol cohorts of planners, cost engineers and PMO professionals simultaneously to build organisational project controls maturity.',
  },
  {
    q: 'What if my organisation is not based in England?',
    a: 'Government apprenticeship funding is available for employers and learners with a main place of work in England. Employers based in Scotland, Wales or Northern Ireland operate under different apprenticeship funding rules. The commercial route is available for learners who do not qualify for English apprenticeship funding.',
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
    title: 'How Employers Can Use Apprenticeship Funding to Build Project Controls Capability',
    description: 'Practical steps for HR and L&D leaders to leverage apprenticeship funding.',
    href: '/knowledge-hub/employer-apprenticeship-funding',
    category: 'Employer Decision Guides',
    readTime: '9 min read',
    tracking: 'related_article_employer_funding',
  },
  {
    title: 'Not Eligible for Apprenticeship Funding? Commercial Project Controls Routes Explained',
    description: 'Clear guidance for self-employed professionals and career changers outside funding eligibility.',
    href: '/knowledge-hub/commercial-routes-explained',
    category: 'Funding Guides',
    readTime: '7 min read',
    tracking: 'related_article_commercial_routes',
  },
];

export default function ArticleFundedEmployerGuide() {
  return (
    <>
      <ArticleLayout
        meta={{
          title: 'Project Controls Apprenticeship Funding: Employer Guide | College of Project Controls',
          description: 'Practical employer guide to project controls apprenticeship funding apprenticeships. Covers levy and non-levy funding, eligibility, employer value, ROI, five capability tracks and APM ChPP readiness support for UK organisations building project controls capability.',
          category: 'Funding Guides',
          readTime: '10 min read',
        }}
        heroImageUrl="https://readdy.ai/api/search-image?query=Premium%20British%20college%20boardroom%20with%20deep%20navy%20walls%2C%20large%20mahogany%20table%2C%20warm%20gold%20lighting%2C%20leather%20executive%20chairs%2C%20framed%20professional%20certificates%20on%20walls%2C%20serious%20corporate%20atmosphere%2C%20soft%20dramatic%20light%2C%20no%20people%2C%20premium%20business%20environment&width=1600&height=900&seq=article-funded-employer-2026&orientation=landscape"
        heroHeadline="Project Controls Apprenticeship Funding: Employer Guide"
        heroSubheadline="A practical guide for HR Directors, L&D Managers, Heads of PMO and senior leaders who want to understand funding eligibility, levy rules, employer value and the measurable capability benefits of the Level 6 Project Controls Professional apprenticeship."
        quickSummary={[
          'Apprenticeship funding may be available for eligible employers and learners in England',
          'Contribution rates depend on learner age, employer circumstances and the rules in force on the start date',
          'The Level 6 PCP apprenticeship sits in Funding Band 11 with a cap of up to £27,000 per learner',
          'KBC added-value support includes professional exams, memberships, London Master Class Events, private healthcare and one-to-one tutoring, where applicable',
          'Funding and support are subject to employer eligibility, learner suitability, funding rules and availability',
        ]}
        ctaSection={
          <ArticleCta
            title="Check Your Organisation's Funding Eligibility"
            body="Complete the short form and an adviser will help you understand your funding options, eligibility criteria and the best route for your team."
            primaryCta={{ label: 'Check Funding Availability', href: '/pcp-master#eligibility', tracking: 'eligibility_check_click' }}
            secondaryCta={{ label: 'Request an employer consultation', href: '/pcp-master#consultation', tracking: 'book_consultation_click' }}
            formFields={['name', 'email', 'phone', 'employer', 'job_title', 'learner_count', 'sector', 'message']}
          />
        }
        faqSection={<PcpFaqSection title="Funding Questions Employers Ask" faqs={articleFaqs} />}
        relatedArticles={<RelatedArticles articles={relatedArticles} />}
      >
        <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mt-0 mb-4">Use Apprenticeship Funding to Build Project Controls Capability Your Business Can Actually Measure</h2>
        <p className="mb-4">
          <strong>Project controls capability is cheaper to build than project failure is to fix.</strong> For organisations where delay, cost drift, weak governance and late risk escalation are no longer acceptable, the Level 6 Project Controls Professional apprenticeship offers an apprenticeship pathway, subject to funding eligibility, to build the capability your business cannot afford to be without.
        </p>
        <p className="mb-4">
          This guide explains how apprenticeship funding works for employers, what it covers, who qualifies and how to make the strongest business case for investing in project controls capability.
        </p>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">How Apprenticeship Funding Works</h3>
        <p className="mb-4">
          The Level 6 Project Controls Professional apprenticeship sits within Funding Band 11 of the Department for Education apprenticeship framework, with a maximum funding cap of up to £27,000 per learner. Funding is accessed differently depending on whether your organisation is a levy-paying or non-levy employer.
        </p>

        <h4 className="text-base font-heading font-semibold text-foreground-900 mt-6 mb-2">Levy-Paying Employers</h4>
        <p className="mb-4">
          Organisations with an annual pay bill over £3 million pay the apprenticeship levy at 0.5%. These funds accumulate in a digital apprenticeship service account and can be used to fully fund apprenticeship training costs. Levy funds not used within 24 months expire, so using them for project controls capability development is a commercially responsible decision.
        </p>

        <h4 className="text-base font-heading font-semibold text-foreground-900 mt-6 mb-2">Non-Levy Employers</h4>
        <p className="mb-4">
          Non-levy employers may access government co-investment. For the PCP Level 6 apprenticeship, the government contribution and any employer payment depend on learner age, employer circumstances and the funding rules in force on the apprenticeship start date. We assess the position before presenting a costed proposal.
        </p>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">What the Funding Covers</h3>
        <p className="mb-4">
          The apprenticeship funding covers the core training and assessment costs of the Level 6 Project Controls Professional standard. In addition, KBC added-value support — subject to eligibility and availability — provides:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4 text-foreground-700">
          <li>Professional exams and membership fees covered where applicable</li>
          <li>London Master Class Events for in-person learning and networking</li>
          <li>Private healthcare during the programme</li>
          <li>One-to-one tutoring from experienced project controls practitioners</li>
          <li>Workplace evidence support for portfolio building</li>
          <li>APM ChPP readiness support, helping learners prepare professional evidence</li>
        </ul>
        <p className="mb-4">
          <strong className="text-foreground-900">Important:</strong> KBC is not the government funder. KBC added-value support describes the additional learner and employer support Kent Business College provides beyond the funded apprenticeship standard. Funding, support packages, exams, memberships and professional progression support are subject to eligibility, availability and applicable rules.
        </p>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Employer Eligibility</h3>
        <p className="mb-4">
          To access apprenticeship funding, employers and learners must meet the following criteria:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4 text-foreground-700">
          <li>The employer's main place of business and the learner's main place of work must be in England</li>
          <li>The learner must be in suitable employment with project controls responsibilities</li>
          <li>The learner must meet the entry requirements, including Level 2 English and Maths</li>
          <li>The learner must not be enrolled in another government-funded programme at the same level</li>
          <li>The role must provide genuine opportunity to develop and apply project controls capability</li>
        </ul>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">The Employer Value: What Better Project Controls Capability Saves Your Organisation</h3>
        <p className="mb-4">
          <strong>The most expensive project controls problem is not the one you can see. It is the one your team reports too late.</strong> When your teams develop stronger project controls capability, your organisation gains:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4 text-foreground-700">
          <li><strong>Earlier risk visibility</strong> — Problems identified and escalated before they become crises, not after the quarterly review.</li>
          <li><strong>Credible schedules</strong> — Plans that drive delivery decisions, not documents that decorate steering committee papers.</li>
          <li><strong>Reliable cost forecasting</strong> — Numbers senior leaders and finance directors can trust for investment decisions.</li>
          <li><strong>Stronger governance confidence</strong> — Audit-ready evidence and decision-ready reporting that withstands scrutiny.</li>
          <li><strong>Reduced cost drift</strong> — Controlled changes, visible baselines and disciplined commercial controls.</li>
        </ul>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Making the Business Case</h3>
        <p className="mb-4">
          When presenting the investment case to your board or senior leadership team, frame the conversation around measurable capability outcomes, not training spend. The question is not "How much does this cost?" — for eligible employers it costs very little. The real question is: <strong>"What does weak project controls capability cost us right now?"</strong>
        </p>
        <p className="mb-4">
          One delayed milestone, one uncontrolled scope change or one late risk escalation can cost more than the entire apprenticeship investment for a cohort of learners. The ROI case builds itself when framed correctly.
        </p>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Download the Employer Guide</h3>
        <p className="mb-4">
          For a detailed, practical guide covering funding eligibility, route selection, learner support and employer value,{' '}
          <SiteLink href="/contact?context=Employer%20guide" className="text-primary-600 hover:text-primary-700 underline">download the Employer Guide to Project Controls Funding</SiteLink>.
        </p>
      </ArticleLayout>
      <Footer />
    </>
  );
}
