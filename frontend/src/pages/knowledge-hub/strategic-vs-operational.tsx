import SiteLink from '@/components/base/SiteLink';
import ArticleLayout from '@/components/feature/ArticleLayout';
import ArticleCta from '@/components/feature/ArticleCta';
import RelatedArticles from '@/components/feature/RelatedArticles';
import PcpFaqSection from '@/components/feature/PcpFaqSection';
import Footer from '@/components/feature/Footer';

const articleFaqs = [
  {
    q: 'Can I switch from operational to strategic later?',
    a: 'Yes, the PCP programme is designed with progression in mind. Many professionals start on the operational route to build delivery-level capability and later progress to the strategic route for leadership-grade project controls. The routes are complementary, not mutually exclusive. Some learners choose the combined strategic + operational route from the start for the strongest development pathway.',
  },
  {
    q: 'Which route is better for career progression?',
    a: 'Both routes strengthen career progression, but in different directions. The strategic route positions you for senior project controls, PMO leadership, programme controls and governance roles. The operational route positions you for planning, cost, risk and reporting roles with deep technical credibility. Your choice should reflect where you want your career to go, not which route sounds more impressive.',
  },
  {
    q: 'Do I need operational experience before going strategic?',
    a: 'Not necessarily, but it helps. Some professionals move directly into strategic project controls roles because their responsibilities already include governance, portfolio-level reporting and senior stakeholder engagement. Others benefit from building operational credibility first. An eligibility discussion will help determine which starting point fits your experience.',
  },
  {
    q: 'Is the combined route too much workload?',
    a: 'The combined Strategic + Operational route is the most comprehensive pathway and requires commitment. However, it is structured to manage workload sensibly over the programme duration. Learners who choose this route typically want the strongest possible professional development outcome and are prepared for the investment. One-to-one tutoring helps manage the learning load.',
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
    title: 'Project Controls Professional Level 6 vs PMP: Which Route Fits Your Career?',
    description: 'Honest comparison of the Level 6 PCP apprenticeship and PMP certification.',
    href: '/knowledge-hub/pcp-vs-pmp',
    category: 'Route Comparisons',
    readTime: '9 min read',
    tracking: 'related_article_pcp_vs_pmp',
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

export default function ArticleStrategicVsOperational() {
  return (
    <>
      <ArticleLayout
        meta={{
          title: 'Strategic vs Operational Project Controls: Which Pathway Is Right for You? | College of Project Controls',
          description: 'Understand the difference between strategic and operational project controls routes. Compare career outcomes, responsibilities, sector focus and employer value of each PCP pathway to choose the right professional development route.',
          category: 'Route Comparisons',
          readTime: '8 min read',
        }}
        heroImageUrl="https://readdy.ai/api/search-image?query=Professional%20British%20college%20library%20with%20deep%20navy%20walls%2C%20warm%20gold%20reading%20lamps%2C%20two%20distinct%20leather%20bound%20books%20on%20a%20mahogany%20desk%20representing%20two%20different%20paths%2C%20executive%20serious%20atmosphere%2C%20soft%20dramatic%20light%2C%20no%20people%2C%20quiet%20premium%20environment%2C%20decision%20concept&width=1600&height=900&seq=article-strat-vs-op-2026&orientation=landscape"
        heroHeadline="Strategic vs Operational Project Controls: Which Pathway Is Right for You?"
        heroSubheadline="Understand the difference between strategic and operational project controls — two distinct but complementary professional pathways. Choose the route that fits your current role, your sector and your next career move."
        quickSummary={[
          'Strategic PCP focuses on leadership-grade project controls: governance, decision confidence, portfolio-level reporting and senior stakeholder engagement',
          'Operational PCP focuses on delivery-grade project controls: planning, cost, risk, scheduling and performance reporting on live projects',
          'The combined Strategic + Operational route develops both — technical depth and leadership capability',
          'Your choice depends on your current responsibilities, career ambitions and the kind of professional impact you want to make',
          'All routes are funding subject to eligibility for employers in England and include APM ChPP readiness support',
        ]}
        ctaSection={
          <ArticleCta
            title="Find Your Best Route"
            body="Not sure whether strategic, operational or the combined route fits your career? Speak to an adviser who understands both pathways and can help you choose with confidence."
            primaryCta={{ label: 'Find Your Best Route', href: '/pcp-master#routes', tracking: 'article_find_route_click' }}
            secondaryCta={{ label: 'Request a consultation', href: '/pcp-master#consultation', tracking: 'book_consultation_click' }}
          />
        }
        faqSection={<PcpFaqSection title="Strategic vs Operational: Common Questions" faqs={articleFaqs} />}
        relatedArticles={<RelatedArticles articles={relatedArticles} />}
      >
        <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mt-0 mb-4">Two Pathways. One Professional Standard. Different Career Outcomes.</h2>
        <p className="mb-4">
          <strong>Project controls is not admin. It is the discipline that protects cost, time, risk and decision confidence.</strong> But the way you apply that discipline depends on where you sit in your organisation. Some professionals need to control the detail of live projects — schedules, costs, risks and changes. Others need to give senior leaders the decision confidence that comes from seeing across the portfolio. Both matter. Both are project controls. But they are different pathways.
        </p>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Strategic Project Controls: Leadership-Grade Capability</h3>
        <p className="mb-4">
          The strategic route is for professionals whose project controls responsibility sits at portfolio, programme or enterprise level. This is not about running individual project schedules. It is about building the governance frameworks, reporting structures and decision-support capability that senior leaders rely on.
        </p>
        <div className="bg-background-100 border border-background-200/70 rounded-lg p-5 my-6">
          <h4 className="text-base font-heading font-semibold text-foreground-900 mb-3">Strategic PCP — Best For:</h4>
          <ul className="space-y-2 text-sm text-foreground-700">
            <li className="flex items-start gap-2"><i className="ri-check-line text-primary-500 mt-0.5 flex-shrink-0"></i><span><strong>Roles:</strong> Heads of PMO, Programme Directors, Portfolio Managers, Governance Leads, Senior Project Controls Managers</span></li>
            <li className="flex items-start gap-2"><i className="ri-check-line text-primary-500 mt-0.5 flex-shrink-0"></i><span><strong>Sectors:</strong> Cross-sector — construction, energy, public sector, engineering, aerospace, regulated delivery</span></li>
            <li className="flex items-start gap-2"><i className="ri-check-line text-primary-500 mt-0.5 flex-shrink-0"></i><span><strong>Pain point:</strong> "Senior leaders get reports. They do not get decisions they can trust."</span></li>
          </ul>
        </div>
        <p className="mb-4">
          Strategic project controls capability means you can answer the questions that boards and steering committees actually ask: "Are we confident in these numbers? Where are we most exposed? What should we stop, start or change?" If your work is about giving leaders that confidence, the strategic route is built for you.
        </p>
        <p className="mb-4">
          <SiteLink href="/strategic-pcp" className="text-primary-600 hover:text-primary-700 underline font-semibold">Explore the Strategic PCP Route →</SiteLink>
        </p>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Operational Project Controls: Delivery-Grade Capability</h3>
        <p className="mb-4">
          The operational route is for professionals who work on live projects every day — the planners, schedulers, cost engineers, risk managers and performance analysts who make sure projects stay on track. This is where project controls capability meets project reality.
        </p>
        <div className="bg-background-100 border border-background-200/70 rounded-lg p-5 my-6">
          <h4 className="text-base font-heading font-semibold text-foreground-900 mb-3">Operational PCP — Best For:</h4>
          <ul className="space-y-2 text-sm text-foreground-700">
            <li className="flex items-start gap-2"><i className="ri-check-line text-primary-500 mt-0.5 flex-shrink-0"></i><span><strong>Roles:</strong> Planners, Schedulers, Cost Engineers, Risk Managers, Project Controls Analysts, Performance Reporting Specialists</span></li>
            <li className="flex items-start gap-2"><i className="ri-check-line text-primary-500 mt-0.5 flex-shrink-0"></i><span><strong>Sectors:</strong> Construction, energy, public sector, engineering, manufacturing, aerospace, pharmaceuticals</span></li>
            <li className="flex items-start gap-2"><i className="ri-check-line text-primary-500 mt-0.5 flex-shrink-0"></i><span><strong>Pain point:</strong> "We report delays after they happen. We need to see them earlier."</span></li>
          </ul>
        </div>
        <p className="mb-4">
          <strong>Stop reporting project problems after they happen. Build the capability to see them earlier.</strong> Operational project controls capability means you produce schedules that drive delivery, cost forecasts that finance directors trust, risk registers that actually influence decisions and reports that tell the truth before it is too late to act.
        </p>
        <p className="mb-4">
          <SiteLink href="/operational-pcp" className="text-primary-600 hover:text-primary-700 underline font-semibold">Explore the Operational PCP Route →</SiteLink>
        </p>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Strategic + Operational: The Combined Route</h3>
        <p className="mb-4">
          For professionals who want the strongest possible development pathway, the combined route develops both technical delivery capability and strategic leadership skills. This is the recommended route for professionals who want to progress from delivery roles into senior project controls, PMO leadership or programme controls positions.
        </p>
        <p className="mb-4">
          <SiteLink href="/strategic-operational-pcp" className="text-primary-600 hover:text-primary-700 underline font-semibold">Explore the Strategic + Operational PCP Route →</SiteLink>
        </p>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Making Your Choice</h3>
        <p className="mb-4">
          <strong>Turn project controls data into decisions senior leaders can trust.</strong> The right route depends on where you are and where you want to go. Ask yourself:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4 text-foreground-700">
          <li>Do I spend most of my time on individual project controls deliverables, or on portfolio-level governance and decision support?</li>
          <li>Do I want to become the person who controls the detail, or the person who gives leaders confidence in the big picture?</li>
          <li>Is my next career move into deeper technical specialism, or into broader leadership responsibility?</li>
        </ul>
        <p className="mb-4">
          <strong>Choose the route built around your role, your sector and your next career move.</strong> If you are still unsure, the best next step is a one-to-one conversation with an adviser who understands both pathways.
        </p>
      </ArticleLayout>
      <Footer />
    </>
  );
}