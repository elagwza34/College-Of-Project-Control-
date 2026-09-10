import SiteLink from '@/components/base/SiteLink';
import ArticleLayout from '@/components/feature/ArticleLayout';
import ArticleCta from '@/components/feature/ArticleCta';
import RelatedArticles from '@/components/feature/RelatedArticles';
import PcpFaqSection from '@/components/feature/PcpFaqSection';
import Footer from '@/components/feature/Footer';

const articleFaqs = [
  {
    q: 'What does the commercial route cost?',
    a: 'The commercial route is a paid professional development pathway. Pricing depends on the specific route selected and the support package. KBC offers discretionary bursary options and interest-free instalments where available. Speak to an adviser for current pricing and payment options. The commercial route is designed to be accessible while reflecting the quality and depth of the professional development provided.',
  },
  {
    q: 'Am I eligible for a KBC discretionary bursary?',
    a: 'Discretionary bursaries are considered on a case-by-case basis. Factors include professional background, career goals, financial circumstances and commitment to project controls development. Bursaries are not guaranteed and are subject to availability. Asking about a bursary during your initial conversation with an adviser is the best way to understand your options.',
  },
  {
    q: 'Does the commercial route include the same content as the apprenticeship route?',
    a: 'The commercial route provides access to the same professional project controls development content, tutoring and support. The key differences are that the commercial route does not involve apprenticeship funding, does not require employer endorsement and does not follow the apprenticeship end-point assessment framework. It is designed for self-directed professional development outside the apprenticeship funding system.',
  },
  {
    q: 'Can I use the commercial route if I am looking for work?',
    a: 'Yes. The commercial route is open to career changers, job seekers and professionals between roles who want to build project controls capability. You do not need to be in employment to access the commercial route, though having a project environment to apply your learning is beneficial.',
  },
  {
    q: 'Does the commercial route include APM ChPP readiness support?',
    a: 'Yes. APM ChPP readiness support is included in the commercial route, helping learners prepare professional evidence and build confidence for future APM Chartered Project Professional pathway progression. As with all routes, ChPP readiness support does not guarantee Chartered status.',
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
    title: 'Project Controls Apprenticeship Funding: Employer Guide',
    description: 'A practical guide for employers on funding eligibility, levy rules and employer value.',
    href: '/knowledge-hub/funded-pcp-employer-guide',
    category: 'Funding Guides',
    readTime: '10 min read',
    tracking: 'related_article_funded_employer_guide',
  },
  {
    title: 'Project Controls Professional Level 6 vs PMP: Which Route Fits Your Career?',
    description: 'Honest comparison of the Level 6 PCP apprenticeship and PMP certification.',
    href: '/knowledge-hub/pcp-vs-pmp',
    category: 'Route Comparisons',
    readTime: '9 min read',
    tracking: 'related_article_pcp_vs_pmp',
  },
];

export default function ArticleCommercialRoutes() {
  return (
    <>
      <ArticleLayout
        meta={{
          title: 'Not Eligible for Apprenticeship Funding? Commercial Project Controls Routes Explained | College of Project Controls',
          description: 'Clear guidance for self-employed professionals, career changers, job seekers and learners outside English apprenticeship funding eligibility. Explore the commercial project controls pathway with discretionary KBC bursary options and flexible payment plans.',
          category: 'Funding Guides',
          readTime: '7 min read',
        }}
        heroImageUrl="https://readdy.ai/api/search-image?query=Premium%20British%20college%20library%20with%20deep%20navy%20walls%2C%20warm%20gold%20reading%20lamps%2C%20a%20single%20leather%20bound%20journal%20open%20on%20a%20mahogany%20desk%20with%20a%20fountain%20pen%2C%20executive%20serious%20study%20atmosphere%2C%20soft%20dramatic%20light%2C%20no%20people%2C%20independent%20professional%20development%20aesthetic&width=1600&height=900&seq=article-commercial-routes-2026&orientation=landscape"
        heroHeadline="Not Eligible for Apprenticeship Funding? Commercial Project Controls Routes Explained"
        heroSubheadline="If apprenticeship funding is not available for your situation, the commercial route still gives you access to professional project controls development, with discretionary KBC bursary options and interest-free instalments where available."
        quickSummary={[
          'The commercial route is for self-employed professionals, career changers, job seekers and learners outside England funding eligibility',
          'Access the same professional project controls development content, tutoring and support as the apprenticeship route',
          'Discretionary KBC bursary options and interest-free instalments available where applicable',
          'APM ChPP readiness support included — prepares, does not guarantee Chartered status',
          'Funding and support are subject to eligibility, availability and applicable rules — this is not "free for everyone"',
        ]}
        ctaSection={
          <ArticleCta
            title="Explore the Commercial Route"
            body="Complete the form and an adviser will discuss your situation, the commercial route options and whether a discretionary KBC bursary might be available to support your development."
            primaryCta={{ label: 'Speak to an Adviser', href: '/pcp-master#consultation', tracking: 'book_consultation_click' }}
            secondaryCta={{ label: 'Explore the Commercial Route', href: '/campaign/commercial-route', tracking: 'commercial_route_click' }}
            formFields={['name', 'email', 'phone', 'employment_status', 'route', 'message']}
          />
        }
        faqSection={<PcpFaqSection title="Commercial Route: Common Questions" faqs={articleFaqs} />}
        relatedArticles={<RelatedArticles articles={relatedArticles} />}
      >
        <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mt-0 mb-4">Not Eligible for Apprenticeship Funding? You Still Deserve Professional Project Controls Development.</h2>
        <p className="mb-4">
          Apprenticeship funding rules are specific. They require that your employer has a main place of business in England, that you are in suitable employment with project controls responsibilities, and that both employer and learner meet eligibility criteria. If any of these conditions do not apply — you are self-employed, working outside England, between roles, or your employer cannot or will not support an apprenticeship — the apprenticeship-funded route may not be available to you.
        </p>
        <p className="mb-4">
          <strong>That does not mean you cannot build serious project controls capability.</strong> The commercial route exists precisely for professionals in this situation. It gives you access to the same professional development, tutoring, support and professional recognition pathway — through a paid, self-directed route.
        </p>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Who the Commercial Route Is For</h3>
        <p className="mb-4">
          The commercial route is designed for professionals who are committed to building project controls capability but fall outside apprenticeship funding eligibility:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4 text-foreground-700">
          <li><strong>Self-Employed Professionals</strong> — Independent planners, schedulers, cost consultants and project controls contractors who want formal professional development and recognition.</li>
          <li><strong>Career Changers</strong> — Professionals moving into project controls from engineering, commercial management, data analysis, finance or PMO support roles.</li>
          <li><strong>Job Seekers</strong> — Professionals between roles who want to strengthen their project controls capability and employability.</li>
          <li><strong>Learners Outside England</strong> — Professionals in Scotland, Wales, Northern Ireland or internationally who fall outside English apprenticeship funding rules.</li>
          <li><strong>Non-Eligible Employers</strong> — Professionals whose employer cannot or will not support an apprenticeship but who want to invest in their own development.</li>
        </ul>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">What the Commercial Route Includes</h3>
        <p className="mb-4">
          The commercial route provides access to the same professional development experience that apprenticeship-funded learners receive:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4 text-foreground-700">
          <li>Live online delivery with experienced project controls practitioners</li>
          <li>One-to-one tutoring and professional development support</li>
          <li>London Master Class Events for in-person learning and networking</li>
          <li>APM ChPP readiness support — preparation for future Chartered status</li>
          <li>Professional development across the five capability tracks: Planning & Scheduling, Cost Engineering & Forecasting, Risk & Change Control, Performance Reporting & Data Assurance, and Governance, Commercial Controls & Decision Support</li>
          <li>Sector-specific learning relevant to construction, energy, public sector, engineering and more</li>
        </ul>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Payment Options: Making the Commercial Route Accessible</h3>
        <p className="mb-4">
          KBC offers flexible payment options to make the commercial route accessible:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4 text-foreground-700">
          <li><strong>Interest-Free Instalments</strong> — Spread the cost of your professional development over manageable monthly payments, where available.</li>
          <li><strong>Discretionary KBC Bursary</strong> — A needs-based bursary considered on a case-by-case basis for professionals who demonstrate strong commitment to project controls development. Bursaries are not guaranteed and are subject to availability.</li>
          <li><strong>Upfront Payment</strong> — Pay in full with a single payment.</li>
        </ul>
        <p className="mb-4">
          <strong className="text-foreground-900">Important:</strong> KBC added-value support, bursary options and payment plans are subject to eligibility, availability and applicable rules. This is not "free for everyone." An adviser will discuss your specific situation and the options available to you.
        </p>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Commercial Route vs Apprenticeship Route: Key Differences</h3>
        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-background-200">
                <th className="text-left py-3 px-4 font-heading font-semibold text-foreground-900">Factor</th>
                <th className="text-left py-3 px-4 font-heading font-semibold text-foreground-900 bg-primary-50/50">Apprenticeship Route</th>
                <th className="text-left py-3 px-4 font-heading font-semibold text-foreground-900">Commercial Route</th>
              </tr>
            </thead>
            <tbody className="text-foreground-700">
              <tr className="border-b border-background-200/70">
                <td className="py-3 px-4 font-medium text-foreground-900">Funding</td>
                <td className="py-3 px-4 bg-primary-50/30">Funding subject to eligibility via apprenticeship funding</td>
                <td className="py-3 px-4">Self-funded with flexible payment options available</td>
              </tr>
              <tr className="border-b border-background-200/70">
                <td className="py-3 px-4 font-medium text-foreground-900">Employer requirement</td>
                <td className="py-3 px-4 bg-primary-50/30">Must be employed in England with employer support</td>
                <td className="py-3 px-4">No employer requirement</td>
              </tr>
              <tr className="border-b border-background-200/70">
                <td className="py-3 px-4 font-medium text-foreground-900">Professional development</td>
                <td className="py-3 px-4 bg-primary-50/30">Full PCP programme content</td>
                <td className="py-3 px-4">Same professional development content</td>
              </tr>
              <tr className="border-b border-background-200/70">
                <td className="py-3 px-4 font-medium text-foreground-900">Tutoring</td>
                <td className="py-3 px-4 bg-primary-50/30">One-to-one tutoring included</td>
                <td className="py-3 px-4">One-to-one tutoring included</td>
              </tr>
              <tr className="border-b border-background-200/70">
                <td className="py-3 px-4 font-medium text-foreground-900">APM ChPP readiness</td>
                <td className="py-3 px-4 bg-primary-50/30">Included</td>
                <td className="py-3 px-4">Included</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-foreground-900">End-point assessment</td>
                <td className="py-3 px-4 bg-primary-50/30">Apprenticeship EPA framework</td>
                <td className="py-3 px-4">Alternative assessment pathway</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Taking the Next Step</h3>
        <p className="mb-4">
          <strong>Build the project controls capability your career cannot afford to be without.</strong> If apprenticeship funding is not available for your situation, the commercial route provides a serious, structured professional development pathway. The best next step is to speak to an adviser who understands your circumstances and can discuss the commercial route options, payment plans and any bursary support that may be available.
        </p>
        <p className="mb-4">
          <SiteLink href="/campaign/commercial-route" className="text-primary-600 hover:text-primary-700 underline font-semibold">Explore the Commercial Route Landing Page →</SiteLink>
        </p>
      </ArticleLayout>
      <Footer />
    </>
  );
}