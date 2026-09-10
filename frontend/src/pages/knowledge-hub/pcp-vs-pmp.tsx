import SiteLink from '@/components/base/SiteLink';
import ArticleLayout from '@/components/feature/ArticleLayout';
import ArticleCta from '@/components/feature/ArticleCta';
import RelatedArticles from '@/components/feature/RelatedArticles';
import PcpFaqSection from '@/components/feature/PcpFaqSection';
import Footer from '@/components/feature/Footer';

const articleFaqs = [
  {
    q: 'Is PMP better than PCP for my career?',
    a: '"Better" depends on where you are in your career and what you need. PMP is a well-recognised international certification that validates existing project management knowledge through an exam. The PCP Level 6 is a structured professional development pathway that builds capability over time with workplace evidence, tutoring, professional recognition support and sector-specific learning. For professionals who need structured development and employer-funded progression, the PCP pathway often provides stronger long-term value. For experienced project managers seeking a standalone credential to validate existing knowledge, PMP may be more appropriate.',
  },
  {
    q: 'Can I do both PCP and PMP?',
    a: 'Yes, these qualifications serve different purposes and are not mutually exclusive. The PCP Level 6 builds capability through structured learning and workplace evidence. PMP validates existing knowledge through an exam. Some professionals complete the PCP pathway and later pursue PMP certification. Others already hold PMP and use the PCP programme to build practical project controls capability beyond general project management knowledge.',
  },
  {
    q: 'Which is more recognised by UK employers?',
    a: 'Both have recognition in the UK market, but for different reasons. PMP is widely recognised internationally and valued by employers seeking a standardised baseline of project management knowledge. The PCP Level 6 is gaining recognition specifically among employers who value practical project controls capability — planning, cost, risk, reporting and governance — developed through structured workplace application. For UK employers using apprenticeship funding, the PCP route offers a funded pathway where eligible.',
  },
  {
    q: 'What does PCP cost compared to PMP?',
    a: 'PMP certification costs typically range from £500-£2,000 for exam fees, preparation courses and study materials, paid by the individual or employer. The PCP Level 6 apprenticeship has a funding cap of up to £27,000 but is funding subject to eligibility for employers in England through Department for Education apprenticeship funding. For eligible employers, the PCP route involves minimal direct cost. For self-employed or non-eligible learners, the commercial route offers a paid pathway.',
  },
  {
    q: 'Does the PCP include professional recognition?',
    a: 'The PCP programme includes APM ChPP readiness support, helping learners prepare professional evidence and reflective practice for future APM Chartered Project Professional pathway progression. It does not guarantee ChPP — that is awarded independently by the Association for Project Management. PMP does not include APM recognition.',
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
    title: 'APM ChPP Readiness Support: What It Means and What It Does Not Guarantee',
    description: 'Clear explanation of how ChPP pathway support works within the PCP programme.',
    href: '/knowledge-hub/apm-chpp-readiness',
    category: 'APM ChPP Readiness',
    readTime: '7 min read',
    tracking: 'related_article_chpp_readiness',
  },
];

export default function ArticlePcpVsPmp() {
  return (
    <>
      <ArticleLayout
        meta={{
          title: 'Project Controls Professional Level 6 vs PMP: Which Route Fits Your Career? | College of Project Controls',
          description: 'Honest comparison of the Level 6 Project Controls Professional apprenticeship and PMP certification. Compare structure, cost, funding, recognition, career outcomes, sector focus and professional progression for UK project professionals choosing between PCP and PMP.',
          category: 'Route Comparisons',
          readTime: '9 min read',
        }}
        heroImageUrl="https://readdy.ai/api/search-image?query=Professional%20British%20college%20study%20room%20with%20deep%20navy%20walls%2C%20warm%20gold%20desk%20lamp%2C%20two%20open%20leather%20bound%20books%20side%20by%20side%20on%20a%20mahogany%20desk%2C%20fountain%20pen%2C%20executive%20serious%20study%20atmosphere%2C%20soft%20dramatic%20light%2C%20no%20people%2C%20quiet%20premium%20environment%2C%20comparison%20concept&width=1600&height=900&seq=article-pcp-vs-pmp-2026&orientation=landscape"
        heroHeadline="Project Controls Professional Level 6 vs PMP: Which Route Fits Your Career?"
        heroSubheadline="An honest, practical comparison of the UK Level 6 Project Controls Professional apprenticeship and the PMP certification, covering structure, cost, funding, professional recognition, employer value and career outcomes."
        quickSummary={[
          'PMP is a globally recognised certification that validates existing project management knowledge through an exam',
          'The PCP Level 6 is a structured professional development pathway building project controls capability through workplace evidence, tutoring and sector-specific learning',
          'PCP is funding subject to eligibility for employers in England; PMP is typically self-funded or employer-sponsored at lower cost',
          'PCP includes APM ChPP readiness support; PMP does not include APM recognition',
          'Your choice depends on whether you need structured capability development (PCP) or a standalone credential to validate existing knowledge (PMP)',
        ]}
        ctaSection={
          <ArticleCta
            title="Not Sure Which Route Fits You?"
            body="Speak to an adviser about your career goals, current experience and sector. We will help you understand which pathway gives you the strongest professional return."
            primaryCta={{ label: 'Find Your Best Route', href: '/pcp-master#routes', tracking: 'article_find_route_click' }}
            secondaryCta={{ label: 'Request a consultation', href: '/pcp-master#consultation', tracking: 'book_consultation_click' }}
          />
        }
        faqSection={<PcpFaqSection title="PCP vs PMP: Common Questions" faqs={articleFaqs} />}
        relatedArticles={<RelatedArticles articles={relatedArticles} />}
      >
        <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950 mt-0 mb-4">Two Different Paths. Two Different Purposes.</h2>
        <p className="mb-4">
          If you are a project professional in the UK trying to decide between the Level 6 Project Controls Professional apprenticeship and the PMP certification, the honest answer is: they serve different purposes and suit different career stages. <strong>Project controls capability is cheaper to build than project failure is to fix</strong> — but which route helps you build it depends on where you are now and where you want to go.
        </p>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">Side-by-Side Comparison</h3>

        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-background-200">
                <th className="text-left py-3 px-4 font-heading font-semibold text-foreground-900">Factor</th>
                <th className="text-left py-3 px-4 font-heading font-semibold text-foreground-900 bg-primary-50/50">PCP Level 6</th>
                <th className="text-left py-3 px-4 font-heading font-semibold text-foreground-900">PMP Certification</th>
              </tr>
            </thead>
            <tbody className="text-foreground-700">
              <tr className="border-b border-background-200/70">
                <td className="py-3 px-4 font-medium text-foreground-900">Type</td>
                <td className="py-3 px-4 bg-primary-50/30">Structured professional development pathway (apprenticeship)</td>
                <td className="py-3 px-4">Standalone certification exam</td>
              </tr>
              <tr className="border-b border-background-200/70">
                <td className="py-3 px-4 font-medium text-foreground-900">Duration</td>
                <td className="py-3 px-4 bg-primary-50/30">24-36 months</td>
                <td className="py-3 px-4">Self-paced; typically 3-6 months preparation</td>
              </tr>
              <tr className="border-b border-background-200/70">
                <td className="py-3 px-4 font-medium text-foreground-900">Funding (UK)</td>
                <td className="py-3 px-4 bg-primary-50/30">Funding subject to eligibility for employers in England via apprenticeship funding</td>
                <td className="py-3 px-4">Self-funded or employer-sponsored (typically £500-£2,000)</td>
              </tr>
              <tr className="border-b border-background-200/70">
                <td className="py-3 px-4 font-medium text-foreground-900">Assessment</td>
                <td className="py-3 px-4 bg-primary-50/30">Workplace evidence portfolio, professional discussion, end-point assessment</td>
                <td className="py-3 px-4">180-question multiple-choice exam</td>
              </tr>
              <tr className="border-b border-background-200/70">
                <td className="py-3 px-4 font-medium text-foreground-900">Focus</td>
                <td className="py-3 px-4 bg-primary-50/30">Project controls: planning, cost, risk, reporting, governance</td>
                <td className="py-3 px-4">General project management knowledge areas</td>
              </tr>
              <tr className="border-b border-background-200/70">
                <td className="py-3 px-4 font-medium text-foreground-900">Workplace evidence</td>
                <td className="py-3 px-4 bg-primary-50/30">Required — you prove capability through real work</td>
                <td className="py-3 px-4">Experience hours required but not formally assessed as evidence</td>
              </tr>
              <tr className="border-b border-background-200/70">
                <td className="py-3 px-4 font-medium text-foreground-900">APM recognition</td>
                <td className="py-3 px-4 bg-primary-50/30">APM ChPP readiness support included</td>
                <td className="py-3 px-4">No APM recognition pathway</td>
              </tr>
              <tr className="border-b border-background-200/70">
                <td className="py-3 px-4 font-medium text-foreground-900">Sector focus</td>
                <td className="py-3 px-4 bg-primary-50/30">Sector-specific routes available</td>
                <td className="py-3 px-4">Generic; not sector-specific</td>
              </tr>
              <tr className="border-b border-background-200/70">
                <td className="py-3 px-4 font-medium text-foreground-900">Tutoring</td>
                <td className="py-3 px-4 bg-primary-50/30">One-to-one tutoring included</td>
                <td className="py-3 px-4">Self-study or optional paid courses</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-foreground-900">Global recognition</td>
                <td className="py-3 px-4 bg-primary-50/30">UK apprenticeship standard; growing employer recognition</td>
                <td className="py-3 px-4">Widely recognised internationally</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">When the PCP Level 6 Is the Better Choice</h3>
        <p className="mb-4">
          The PCP Level 6 is likely the stronger route for you if:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4 text-foreground-700">
          <li>You are employed in England and your employer is willing to support your development through apprenticeship funding</li>
          <li>You need structured development, not just a certification exam — building capability takes time and practice</li>
          <li>You work in project controls specifically (planning, cost, risk, reporting, governance) rather than general project management</li>
          <li>You want APM ChPP readiness support as part of your professional development pathway</li>
          <li>You work in a specific sector — construction, energy, public sector, engineering — and want sector-specific learning</li>
          <li>You value workplace evidence over exam performance as proof of your capability</li>
        </ul>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">When PMP May Be the Better Choice</h3>
        <p className="mb-4">
          PMP may suit you better if:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4 text-foreground-700">
          <li>You already have significant project controls experience and just need a credential to validate your knowledge</li>
          <li>You work internationally or for an employer that specifically values PMP certification</li>
          <li>You need a qualification quickly and can prepare intensively for an exam</li>
          <li>You are a general project manager rather than a project controls specialist</li>
          <li>Your employer will sponsor PMP but cannot or will not support a longer apprenticeship programme</li>
        </ul>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">What About the Commercial PCP Route?</h3>
        <p className="mb-4">
          If apprenticeship funding is not available — for example, you are self-employed, a career changer or employed outside England — the{' '}
          <SiteLink href="/campaign/commercial-route" className="text-primary-600 hover:text-primary-700 underline">commercial PCP route</SiteLink>{' '}
          still gives access to professional project controls development. This includes flexible payment options, discretionary KBC bursary options and interest-free instalments where available.
        </p>

        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground-900 mt-8 mb-3">The Bottom Line</h3>
        <p className="mb-4">
          <strong>Stop reporting project problems after they happen. Build the capability to see them earlier.</strong> Whether you choose PCP, PMP or both, the goal is the same: stronger project controls capability that gives senior leaders decisions they can trust. Your choice of route should reflect where you are in your career, what your employer can support and which professional outcome matters most to you.
        </p>
        <p className="mb-4">
          For most UK-based project controls professionals who are employed, seeking structured development and wanting APM recognition support, the PCP Level 6 offers a more comprehensive, funded pathway where eligible. For experienced project managers needing a standalone international credential, PMP remains a strong option.
        </p>
      </ArticleLayout>
      <Footer />
    </>
  );
}