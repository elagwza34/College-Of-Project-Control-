import SiteLink from '@/components/base/SiteLink';
import ArticleLayout from '@/components/feature/ArticleLayout';
import ArticleCta from '@/components/feature/ArticleCta';
import RelatedArticles from '@/components/feature/RelatedArticles';
import PcpFaqSection from '@/components/feature/PcpFaqSection';
import Footer from '@/components/feature/Footer';

const articleFaqs = [
  {
    q: 'How is apprenticeship funding assessed?',
    a: 'Apprenticeship funding may be available in England. Levy-paying employers may use available levy funds; other government support and any employer contribution depend on learner age, employer status and the rules in force on the start date. We confirm eligibility before enrolment.',
  },
  {
    q: 'Is this only for apprentices?',
    a: 'The Level 6 Project Controls Professional apprenticeship is open to both new entrants and existing employees. Many learners are experienced professionals already working in project environments who use the programme to gain formal recognition, build capability and strengthen their professional standing. It is a professional development pathway, not just an entry route.',
  },
  {
    q: 'What qualifications do I need to start?',
    a: 'Entry requirements include Level 2 English and Maths (GCSE or equivalent). You also need to be in suitable employment in England with project controls responsibilities. Specific entry criteria are assessed during eligibility review. The programme is designed to accommodate learners from diverse educational and professional backgrounds.',
  },
  {
    q: 'Does this guarantee APM ChPP?',
    a: 'APM ChPP readiness support helps learners prepare evidence and professional practice. It does not guarantee Chartered status. ChPP is awarded independently by the Association for Project Management following a separate assessment process. The programme provides structured preparation but Chartered status is not automatic.',
  },
  {
    q: 'What sectors does this cover?',
    a: 'The PCP programme supports construction, energy, oil and gas, utilities, public sector, councils, engineering, manufacturing, aerospace, pharmaceuticals, medicals and digital transformation sectors. Sector-specific routes allow learners to apply project controls capability in their own professional context.',
  },
];

const relatedArticles = [
  {
    title: 'Project Controls Apprenticeship Funding: Employer Guide',
    description: 'A practical guide for employers on funding eligibility, levy rules and employer value.',
    href: '/knowledge-hub/funded-pcp-employer-guide',
    category: 'Funding Guides',
    readTime: '10 min read',
    tracking: 'related_article_funded_employer_guide',
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
    title: 'APM ChPP Readiness Support: What It Means and What It Does Not Guarantee',
    description: 'Clear explanation of how ChPP pathway support works within the PCP programme.',
    href: '/knowledge-hub/apm-chpp-readiness',
    category: 'APM ChPP Readiness',
    readTime: '7 min read',
    tracking: 'related_article_chpp_readiness',
  },
];

export default function ArticleWhatIsPcp() {
  return (
    <>
      <ArticleLayout
        meta={{
          title: 'What Is a Project Controls Professional Apprenticeship? | College of Project Controls',
          description: 'Everything you need to know about the Level 6 Project Controls Professional apprenticeship. Learn about programme structure, eligibility, funding, career outcomes, five capability tracks and APM ChPP readiness support for UK employers and professionals.',
          category: 'Funding Guides',
          readTime: '8 min read',
        }}
        heroImageUrl="https://readdy.ai/api/search-image?query=Professional%20British%20college%20library%20with%20deep%20navy%20walls%2C%20warm%20gold%20reading%20lamps%2C%20leather%20armchairs%2C%20mahogany%20shelves%20filled%20with%20leather%20bound%20books%20on%20project%20management%2C%20executive%20serious%20study%20atmosphere%2C%20soft%20dramatic%20light%20from%20tall%20windows%2C%20no%20people%2C%20dark%20academic%20aesthetic%2C%20quiet%20premium%20professional%20environment&width=1600&height=900&seq=article-pcp-what-is-2026&orientation=landscape"
        heroHeadline="What Is a Project Controls Professional Apprenticeship?"
        heroSubheadline="Everything employers and professionals need to know about the Level 6 Project Controls Professional apprenticeship, including programme structure, eligibility, funding, career outcomes and professional recognition support."
        quickSummary={[
          'The Level 6 Project Controls Professional apprenticeship is a professional development pathway with apprenticeship funding subject to eligibility',
          'It combines workplace evidence, one-to-one tutoring, professional exams and APM ChPP readiness support',
          'Five professional capability tracks: Planning & Scheduling, Cost Engineering & Forecasting, Risk & Change Control, Performance Reporting & Data Assurance, and Governance, Commercial Controls & Decision Support',
          'Available for both new entrants and experienced professionals already working in project controls roles',
          'Designed for employers who want to build measurable project controls capability, not just tick a training box',
        ]}
        ctaSection={
          <ArticleCta
            title="Ready to Explore the PCP Route?"
            body="Check your eligibility and speak to an adviser about how the Level 6 Project Controls Professional apprenticeship fits your career goals or your organisation's capability needs."
            primaryCta={{ label: 'Check Eligibility', href: '/pcp-master#eligibility', tracking: 'eligibility_check_click' }}
            secondaryCta={{ label: 'Find Your Best Route', href: '/pcp-master#routes', tracking: 'article_find_route_click' }}
          />
        }
        faqSection={<PcpFaqSection title="Common Questions About the PCP Apprenticeship" faqs={articleFaqs} />}
        relatedArticles={<RelatedArticles articles={relatedArticles} />}
      >
        <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mt-0 mb-4">What Is the Level 6 Project Controls Professional Apprenticeship?</h2>
        <p className="mb-4">
          The Level 6 Project Controls Professional apprenticeship is a degree-level professional development pathway designed to build serious project controls capability in real workplace environments. It is not a short course, not a basic certificate and not a generic project management qualification. It is a structured programme that develops the planning, cost, risk, reporting and governance skills that project-driven organisations need to deliver with confidence.
        </p>
        <p className="mb-4">
          <strong>Project controls capability is cheaper to build than project failure is to fix.</strong> That is the principle behind this apprenticeship. Organisations that invest in project controls capability develop teams who can see problems earlier, control them faster and give senior leaders decisions they can trust.
        </p>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Programme Structure</h3>
        <p className="mb-4">
          The programme typically runs over 24 to 36 months, depending on learner pace and employer requirements. It is delivered through live online sessions, workplace evidence collection, one-to-one tutoring and London Master Class Events. Learners remain in employment throughout, applying their learning directly to real project environments.
        </p>
        <p className="mb-4">
          <strong>One funded pathway. Five professional capability tracks.</strong> Learners develop capability across:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4 text-foreground-700">
          <li><strong>Planning & Scheduling</strong> — Building and maintaining credible project schedules that drive delivery, not just decorate reports.</li>
          <li><strong>Cost Engineering & Forecasting</strong> — Developing cost estimates, budgets and forecasts that senior leaders can rely on.</li>
          <li><strong>Risk & Change Control</strong> — Identifying, assessing and managing project risks and changes with rigour and transparency.</li>
          <li><strong>Performance Reporting & Data Assurance</strong> — Producing decision-ready reports that turn project data into governance insight.</li>
          <li><strong>Governance, Commercial Controls & Decision Support</strong> — Strengthening the frameworks that protect project investment, time and quality.</li>
        </ul>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Who Is This For?</h3>
        <p className="mb-4">
          The PCP apprenticeship is suitable for a wide range of professionals and employers:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4 text-foreground-700">
          <li><strong>Employers</strong> — HR Directors, L&D Managers, Heads of PMO and Operations Directors who want to build project controls capability using apprenticeship funding where eligible.</li>
          <li><strong>Existing professionals</strong> — Planners, schedulers, cost engineers, risk managers and project controls specialists who want formal recognition, career progression and APM ChPP readiness support.</li>
          <li><strong>Career changers</strong> — Professionals moving into project controls from related disciplines such as engineering, commercial management, data analysis or PMO support.</li>
          <li><strong>New entrants</strong> — Graduates and early-career professionals starting their project controls career with a structured, employer-funded pathway.</li>
        </ul>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Funding: Funding Subject to Eligibility</h3>
        <p className="mb-4">
          <strong>Apprenticeship funding may be available, subject to learner, employer and current funding-rule eligibility.</strong> The programme sits within Funding Band 11 of the Department for Education apprenticeship framework, with a funding cap of up to £27,000. Levy-paying employers can use their apprenticeship levy funds. Government support and any employer contribution depend on learner age, employer status and the funding rules in force on the start date.
        </p>
        <p className="mb-4">
          <strong className="text-foreground-900">Important:</strong> Funding and support are subject to employer eligibility, learner suitability, funding rules and availability. This is not "free for everyone." KBC added-value support includes professional exams, memberships, London Master Class Events, private healthcare during the programme and one-to-one tutoring, subject to eligibility and availability.
        </p>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Professional Recognition and APM ChPP Readiness</h3>
        <p className="mb-4">
          The programme includes APM ChPP readiness support, helping learners prepare professional evidence, reflect on practice and build confidence for future APM Chartered Project Professional pathway progression. <strong>APM ChPP readiness support does not guarantee Chartered status.</strong> ChPP is awarded independently by the Association for Project Management following a separate assessment process.
        </p>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">What Makes This Different from a Normal Project Management Qualification?</h3>
        <p className="mb-4">
          This is more than a qualification. It is a structured professional development pathway that combines:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4 text-foreground-700">
          <li>Workplace evidence — you prove capability, not just knowledge</li>
          <li>One-to-one tutoring — not just online modules</li>
          <li>Professional recognition support — APM ChPP readiness included</li>
          <li>Masterclass events — in-person learning with peers and practitioners</li>
          <li>Employer-focused learning — applied to your real projects and sector</li>
          <li>Sector-specific routes — construction, energy, public sector, engineering and more</li>
          <li>Clear progression pathways — from operational capability to strategic leadership</li>
        </ul>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Employer Value</h3>
        <p className="mb-4">
          <strong>Turn project controls data into decisions senior leaders can trust.</strong> For employers, the PCP apprenticeship delivers measurable capability improvement. Teams develop the skills to stop reporting problems after they happen and start building the capability to see them earlier. For teams where delay, cost drift and weak governance are no longer acceptable, this is the pathway that builds the capability your organisation cannot afford to be without.
        </p>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Next Steps</h3>
        <p className="mb-4">
          The best way to understand if this is right for you or your team is to explore the routes, check eligibility and speak to an adviser. Visit the{' '}
          <SiteLink href="/pcp-master" className="text-primary-600 hover:text-primary-700 underline">PCP Master Page</SiteLink>{' '}
          for the full programme overview, or explore specific routes:
        </p>
        <ul className="list-disc pl-5 space-y-1 mb-4 text-foreground-700">
          <li><SiteLink href="/strategic-pcp" className="text-primary-600 hover:text-primary-700 underline">Strategic PCP Route</SiteLink> — Leadership-grade project controls</li>
          <li><SiteLink href="/operational-pcp" className="text-primary-600 hover:text-primary-700 underline">Operational PCP Route</SiteLink> — Real delivery confidence</li>
          <li><SiteLink href="/strategic-operational-pcp" className="text-primary-600 hover:text-primary-700 underline">Strategic + Operational PCP</SiteLink> — Technical depth meets leadership</li>
          <li><SiteLink href="/pmo-pcp" className="text-primary-600 hover:text-primary-700 underline">PMO & Governance PCP</SiteLink> — Decision-ready reporting and governance</li>
          <li><SiteLink href="/operational-pcp-construction" className="text-primary-600 hover:text-primary-700 underline">Construction & Urban PCP</SiteLink> — Built for construction reality</li>
          <li><SiteLink href="/operational-pcp-energy" className="text-primary-600 hover:text-primary-700 underline">Energy & Net Zero PCP</SiteLink> — Capital programme control</li>
          <li><SiteLink href="/operational-pcp-public-sector" className="text-primary-600 hover:text-primary-700 underline">Public Sector & Councils PCP</SiteLink> — Public accountability, private rigour</li>
          <li><SiteLink href="/campaign/commercial-route" className="text-primary-600 hover:text-primary-700 underline">Commercial Route</SiteLink> — For self-employed and non-eligible learners</li>
        </ul>
      </ArticleLayout>
      <Footer />
    </>
  );
}
