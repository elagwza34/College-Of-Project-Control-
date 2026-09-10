from pathlib import Path
import re
ROOT=Path(__file__).resolve().parents[2]/'frontend'
def write(name,text):
 p=ROOT/name;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(text.strip()+'\n',encoding='utf-8')
write('src/components/feature/OutcomeExamples.tsx', '''
import SiteLink from '@/components/base/SiteLink';
const examples = [
 ['Planning and forecasting', 'Compare the current schedule with its baseline, explain the causes of variance and propose a recovery action.'],
 ['Cost and risk visibility', 'Connect changes in cost forecasts with risk ownership, assumptions and the evidence behind an escalation.'],
 ['Decision support', 'Prepare a short governance brief that describes the issue, available options and the decision required.'],
];
export default function OutcomeExamples({ title = 'What you could apply at work' }: { title?: string }) {
 return <section id="outcome-examples" className="section-space bg-background-100"><div className="container-site"><p className="text-sm font-semibold text-primary-700">Example scenarios</p><h2 className="mt-3 text-3xl">{title}</h2><p className="mt-4 max-w-3xl text-foreground-600">These illustrative workplace tasks explain the capability programmes aim to develop. They are not learner testimonials, measured results or guaranteed outcomes.</p><div className="mt-8 grid gap-6 md:grid-cols-3">{examples.map(([heading, copy]) => <article key={heading} className="card-premium p-6"><h3 className="text-xl">{heading}</h3><p className="mt-4 text-foreground-600">{copy}</p></article>)}</div><SiteLink href="/book-a-session" className="btn-primary mt-8">Discuss your development goals</SiteLink></div></section>;
}
''')
write('src/components/feature/RouteLanding/RouteTestimonials.tsx', '''
// Legacy props are accepted while existing route content migrates. Unverified
// names, stars, quotations and case-study figures are deliberately not rendered.
import OutcomeExamples from '../OutcomeExamples';
interface Props { heading: string; testimonials: { quote: string; name: string; sector: string; stars: number }[]; caseStudy: { title: string; description: string; cta: string; ctaHref: string }; }
export default function RouteOutcomeExamples(_props: Props) { return <OutcomeExamples />; }
''')
write('src/pages/pmo-pcp/components/PmoTestimonials.tsx', '''
import OutcomeExamples from '@/components/feature/OutcomeExamples';
export default function PmoOutcomeExamples() { return <OutcomeExamples title="Apply stronger PMO practice" />; }
''')
write('src/pages/pmo-pcp/components/PmoClosingHero.tsx', '''
import SiteLink from '@/components/base/SiteLink';
export default function PmoClosingCta() { return <section className="section-space bg-primary-700 text-white"><div className="container-site"><h2 className="text-3xl text-white">Discuss the PMO capability your team needs</h2><p className="mt-4 max-w-2xl">Tell us about your responsibilities and the decisions you want your PMO to support.</p><SiteLink href="/book-a-session" className="btn-primary mt-6">Request a consultation</SiteLink></div></section>; }
''')
# Merge home purpose first, then remove unused implementations in the cleanup phase.
p=ROOT/'src/pages/home/page.tsx';s=p.read_text(encoding='utf-8')
for name in ['ProfessionalDirection','ExperienceDifferent','ProfessionalOutcomes','Testimonials']:
 s=re.sub(rf'import {name} from .*?;\n','',s).replace(f'<{name} />','')
s="import OutcomeExamples from '@/components/feature/OutcomeExamples';\n"+s
s=s.replace('{/* Reviews */}','{/* Illustrative workplace outcomes */}\n        <OutcomeExamples />')
p.write_text(s,encoding='utf-8')
p=ROOT/'src/components/feature/ProfessionalPathwaysSection.tsx';s=p.read_text(encoding='utf-8').replace('Compare the responsibilities, capability focus and professional direction of each Project Controls Professional Level 6 pathway.', 'Compare each pathway against your current responsibilities: hands-on planning and controls, programme and portfolio decisions, or professional evidence development. Progression depends on your role, experience and the requirements of any external award.');p.write_text(s,encoding='utf-8')
p=ROOT/'src/components/feature/CoachingSupport.tsx';s=p.read_text(encoding='utf-8').replace('Your coach helps turn programme learning into evidence of professional growth.', 'Coaching connects programme learning, portfolio evidence and career direction. Ask about available academic, wellbeing and professional-community support; inclusions depend on your agreed programme.');p.write_text(s,encoding='utf-8')
p=ROOT/'src/pages/programmes/page.tsx';s=p.read_text(encoding='utf-8')
for name in ['WhyCollege','ProfessionalOutcomes']:
 s=re.sub(rf'import {name} from .*?;\n','',s).replace(f'<{name} />','')
p.write_text(s,encoding='utf-8')
write('src/pages/testimonials/page.tsx', '''
import OutcomeExamples from '@/components/feature/OutcomeExamples';
import Footer from '@/components/feature/Footer';
export default function OutcomesPage() { return <><main><header className="bg-primary-700 pb-12 pt-36"><div className="container-site"><h1 className="text-4xl text-white">Workplace outcomes and examples</h1></div></header><OutcomeExamples /></main><Footer /></>; }
''')
# Preserve subject-specific transformation content; remove duplicate generic benefits
# and replace unverifiable named quote sections with explicit scenarios.
for p in (ROOT/'src/pages/campaign').glob('*/page.tsx'):
 s=p.read_text(encoding='utf-8')
 s=re.sub(r'<section\b(?:(?!</section>).)*ri-star-fill(?:(?!</section>).)*</section>', '<OutcomeExamples />',s,flags=re.S)
 if '<OutcomeExamples' in s:s="import OutcomeExamples from '@/components/feature/OutcomeExamples';\n"+s
 s=re.sub(r'<section\b(?:(?!</section>).)*<BenefitCard\b(?:(?!</section>).)*</section>','',s,flags=re.S)
 s=s.replace('September, January & May intakes','Intake availability confirmed on enquiry')
 s=s.replace('Employers typically report improved schedule discipline, better progress reporting and stronger change control within the first few months.', 'The intended application includes schedule review, progress reporting and change control. Outcomes depend on the learner, role and employer support.')
 s=s.replace('Measurable improvements','Practical development goals').replace('Tangible outcomes that transform PMO from cost centre to strategic partner.','Practical ways to connect PMO information with decisions.')
 p.write_text(s,encoding='utf-8')
# Remove unrelated portrait placeholders and unsupported accreditation language,
# retaining the intentional IPC brand and route to authoritative information.
write('src/components/feature/IpcAuthority.tsx', '''
import SiteLink from '@/components/base/SiteLink';
export default function IpcAuthority() {
 return <section id="ipc-authority" className="section-space bg-ipc-surface text-white"><div className="container-site grid gap-8 md:grid-cols-[auto_1fr]"><img src="/images/ipc-logo.png" alt="Institute of Project Controls" loading="lazy" width={128} height={128} className="h-28 w-28 object-contain" /><div><p className="text-sm font-semibold text-ipc-gold">Institute of Project Controls</p><h2 className="mt-3 text-3xl text-white">Connect learning with professional practice</h2><p className="mt-4 max-w-3xl">Explore professional development, membership and recognition information from the Institute. Eligibility, support and any external award remain subject to the relevant organisation's requirements.</p><SiteLink className="btn-secondary mt-6 text-ipc-gold" href="https://instituteofprojectcontrols.com">Explore the Institute</SiteLink></div></div></section>;
}
''')
# One discovery system: preserve the public articles URL as a redirect to the hub.
write('src/pages/articles/page.tsx', '''
import { Navigate, useLocation } from 'react-router-dom';
export default function ArticlesRedirect() { const { search, hash } = useLocation(); return <Navigate to={`/knowledge-hub${search}${hash}`} replace />; }
''')
p=ROOT/'src/pages/knowledge-hub/page.tsx';s=p.read_text(encoding='utf-8');s=re.sub(r'  const \[loading, setLoading\].*?\n  \}, \[\]\);','  const loading = false;',s,flags=re.S);p.write_text(s,encoding='utf-8')
for p in (ROOT/'src').rglob('*.tsx'):
 s=p.read_text(encoding='utf-8').replace("{ label: 'Articles', href: '/articles', icon: 'ri-article-line' },",'').replace("{ label: 'Articles', href: '/articles' },",'').replace("label: 'Testimonials'","label: 'Outcome examples'")
 if any(x in str(p) for x in ['pages/legal/','pages/employer-agreement/','components/feature/ArticleLayout']):s=s.replace('min-h-[90vh]','min-h-0')
 p.write_text(s,encoding='utf-8')
print('Phase 5: sections merged; placeholder media and unverified proof replaced with explicit scenarios.')
