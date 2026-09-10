import SiteLink from '@/components/base/SiteLink';
import ArticleLayout from '@/components/feature/ArticleLayout';
import ArticleCta from '@/components/feature/ArticleCta';
import RelatedArticles from '@/components/feature/RelatedArticles';
import PcpFaqSection from '@/components/feature/PcpFaqSection';
import Footer from '@/components/feature/Footer';

const articleFaqs = [
  {
    q: 'How is PMO governance training different from standard project management training?',
    a: 'Standard project management training focuses on delivering individual projects. PMO governance training focuses on building the frameworks, reporting structures and decision-support capability that enable an organisation to deliver multiple projects with consistent control. It is about portfolio-level confidence, not just project-level delivery.',
  },
  {
    q: 'Does this include APM PMO-specific qualifications?',
    a: 'The PMO & Governance PCP route includes APM ChPP readiness support and professional membership coverage where applicable. Learners develop the competence that supports APM recognition. The route is designed to build practical PMO governance capability that strengthens professional standing, including readiness for future APM assessment.',
  },
  {
    q: 'Is this for existing PMO professionals or those new to PMO?',
    a: 'Both. Existing PMO professionals use the route to strengthen governance capability, build professional recognition and progress into senior PMO leadership roles. Those new to PMO use it to develop structured PMO competence from a strong foundation. The programme adapts to your current experience level.',
  },
  {
    q: 'What kind of reporting capability does this develop?',
    a: 'The route develops decision-ready reporting — reports that tell senior leaders what they need to know to make confident decisions, not just summaries of what happened last month. This includes portfolio dashboards, exception reporting, trend analysis, forecast confidence and governance evidence that withstands scrutiny.',
  },
];

const relatedArticles = [
  {
    title: 'Strategic vs Operational Project Controls: Which Pathway Is Right for You?',
    description: 'Understand the difference between strategic and operational project controls routes.',
    href: '/knowledge-hub/strategic-vs-operational',
    category: 'Route Comparisons',
    readTime: '8 min read',
    tracking: 'related_article_strategic_vs_operational',
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
    title: 'How Employers Can Use Apprenticeship Funding to Build Project Controls Capability',
    description: 'Practical steps for HR and L&D leaders to leverage apprenticeship funding.',
    href: '/knowledge-hub/employer-apprenticeship-funding',
    category: 'Employer Decision Guides',
    readTime: '9 min read',
    tracking: 'related_article_employer_funding',
  },
];

export default function ArticlePmoGovernance() {
  return (
    <>
      <ArticleLayout
        meta={{
          title: 'PMO Governance Training UK: Building Decision-Ready Reporting | College of Project Controls',
          description: 'UK PMO governance training that builds decision-ready reporting capability. Move from reporting what happened to providing the governance insight and decision confidence senior leaders need. Funding subject to eligibility.',
          category: 'Employer Decision Guides',
          readTime: '8 min read',
        }}
        heroImageUrl="https://readdy.ai/api/search-image?query=Premium%20British%20college%20boardroom%20with%20deep%20navy%20walls%2C%20large%20mahogany%20table%2C%20portfolio%20dashboards%20and%20governance%20reports%20laid%20out%2C%20warm%20gold%20lighting%2C%20executive%20serious%20atmosphere%2C%20soft%20dramatic%20light%2C%20no%20people%2C%20corporate%20governance%20aesthetic&width=1600&height=900&seq=article-pmo-governance-2026&orientation=landscape"
        heroHeadline="PMO Governance Training UK: Building Decision-Ready Reporting"
        heroSubheadline="How PMO teams can move from reporting what happened to providing the governance insight, portfolio visibility and decision confidence that senior leaders, boards and regulators actually need."
        quickSummary={[
          'PMO governance training that develops decision-ready reporting for senior leaders, not just activity summaries',
          'Builds portfolio-level visibility, exception reporting, trend analysis and governance evidence capability',
          'Funding subject to eligibility for employers in England through apprenticeship funding',
          'Includes APM ChPP readiness support for PMO professionals seeking Chartered recognition',
          'Designed for Heads of PMO, PMO Leads, Programme Directors, Portfolio Managers and Governance Leads',
        ]}
        ctaSection={
          <ArticleCta
            title="Discuss the PMO Route"
            body="Speak to an adviser about how the PMO & Governance PCP route strengthens your team's decision-support and governance capability."
            primaryCta={{ label: 'Discuss the PMO Route', href: '/pcp-master#consultation', tracking: 'book_consultation_click' }}
            secondaryCta={{ label: 'Explore the PMO PCP Route', href: '/pmo-pcp', tracking: 'pmo_route_click' }}
          />
        }
        faqSection={<PcpFaqSection title="PMO Governance: Common Questions" faqs={articleFaqs} />}
        relatedArticles={<RelatedArticles articles={relatedArticles} />}
      >
        <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mt-0 mb-4">Your PMO Does Not Need More Reports. It Needs Stronger Decision Confidence.</h2>
        <p className="mb-4">
          Many PMOs produce excellent reports. Status updates. Milestone trackers. Risk registers. RAG ratings. But ask a senior leader what they actually get from the PMO, and the honest answer is often: "I know what happened last month. I still don't know what to decide this month." <strong>Turn project controls data into decisions senior leaders can trust.</strong> That is what stronger PMO governance capability delivers.
        </p>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">The PMO Reporting Problem</h3>
        <p className="mb-4">
          Most PMO reporting answers the wrong question. It answers "What happened?" when senior leaders need to know "What should we do now?" The gap between reporting activity and decision confidence is where PMO value is lost — and where governance maturity is measured.
        </p>
        <div className="bg-background-100 border border-background-200/70 rounded-lg p-5 my-6">
          <h4 className="text-base font-heading font-semibold text-foreground-900 mb-3">Before and After Stronger PMO Governance</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs font-label font-semibold uppercase tracking-wider text-foreground-600 mb-2">Before</p>
              <ul className="space-y-1.5 text-foreground-600">
                <li className="flex items-start gap-1.5"><i className="ri-close-circle-line text-red-500 mt-0.5 flex-shrink-0"></i><span>Reports describe what happened</span></li>
                <li className="flex items-start gap-1.5"><i className="ri-close-circle-line text-red-500 mt-0.5 flex-shrink-0"></i><span>Risks escalated after they become issues</span></li>
                <li className="flex items-start gap-1.5"><i className="ri-close-circle-line text-red-500 mt-0.5 flex-shrink-0"></i><span>Governance evidence assembled for audits, not used for decisions</span></li>
                <li className="flex items-start gap-1.5"><i className="ri-close-circle-line text-red-500 mt-0.5 flex-shrink-0"></i><span>Portfolio visibility is patchy and inconsistent</span></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-label font-semibold uppercase tracking-wider text-primary-600 mb-2">After</p>
              <ul className="space-y-1.5 text-foreground-700">
                <li className="flex items-start gap-1.5"><i className="ri-checkbox-circle-line text-primary-500 mt-0.5 flex-shrink-0"></i><span>Reports highlight decisions needed, not just activity completed</span></li>
                <li className="flex items-start gap-1.5"><i className="ri-checkbox-circle-line text-primary-500 mt-0.5 flex-shrink-0"></i><span>Risks identified early enough to act</span></li>
                <li className="flex items-start gap-1.5"><i className="ri-checkbox-circle-line text-primary-500 mt-0.5 flex-shrink-0"></i><span>Governance evidence drives decisions and satisfies audits</span></li>
                <li className="flex items-start gap-1.5"><i className="ri-checkbox-circle-line text-primary-500 mt-0.5 flex-shrink-0"></i><span>Portfolio visibility is consistent and decision-ready</span></li>
              </ul>
            </div>
          </div>
        </div>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">What the PMO & Governance PCP Route Develops</h3>
        <p className="mb-4">
          The PMO & Governance PCP route is not a generic PMO training course. It is a structured professional development pathway that builds the specific governance, reporting and decision-support capability that senior leaders value:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4 text-foreground-700">
          <li><strong>Portfolio-Level Reporting</strong> — Dashboards and reports that show portfolio health, not just project status. Leaders see where to focus attention, not just what is red, amber or green.</li>
          <li><strong>Exception Reporting</strong> — Identifying and escalating the exceptions that matter, not burying leaders in data they cannot act on.</li>
          <li><strong>Trend Analysis & Forecasting</strong> — Spotting patterns across the portfolio before they become portfolio-wide problems. One late project is a project issue. A pattern of late projects is a governance failure.</li>
          <li><strong>Governance Evidence & Assurance</strong> — Building the audit trail that proves decisions were informed, risks were considered and governance was applied — not assembled after the fact.</li>
          <li><strong>Decision-Support Capability</strong> — Presenting information in the format, language and confidence level that boards and steering committees need to make investment, priority and intervention decisions.</li>
        </ul>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Who This Is For</h3>
        <p className="mb-4">
          The PMO & Governance PCP route is designed for:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4 text-foreground-700">
          <li><strong>Heads of PMO</strong> — Leading PMO functions that need to deliver stronger governance confidence to boards and executives</li>
          <li><strong>PMO Leads and Managers</strong> — Building the capability to move from reporting to decision support</li>
          <li><strong>Programme Directors and Portfolio Managers</strong> — Strengthening the controls that protect programme investment and delivery confidence</li>
          <li><strong>Governance and Assurance Leads</strong> — Developing the frameworks and evidence that satisfy regulators, auditors and boards</li>
        </ul>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">APM Recognition</h3>
        <p className="mb-4">
          The PMO & Governance PCP route is delivered through an APM Recognised Assessment Centre. It includes APM ChPP readiness support, helping PMO professionals prepare evidence and professional practice for future Chartered status. APM ChPP readiness support helps learners prepare evidence and professional practice but does not guarantee Chartered status.
        </p>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">The Employer Case for PMO Capability Investment</h3>
        <p className="mb-4">
          <strong>Build the project controls capability your organisation cannot afford to be without.</strong> A PMO that produces reports is a cost centre. A PMO that produces decision confidence is a strategic asset. The difference is the capability of the people in it.
        </p>
        <p className="mb-4">
          <SiteLink href="/pmo-pcp" className="text-primary-600 hover:text-primary-700 underline font-semibold">Explore the PMO & Governance PCP Route →</SiteLink>
        </p>
      </ArticleLayout>
      <Footer />
    </>
  );
}