from pathlib import Path
import re
root=Path('frontend')
def edit(path,fn):
 p=root/path;p.write_text(fn(p.read_text(encoding='utf-8')),encoding='utf-8')
# One metadata owner. Route-specific structured data remains alongside content.
for p in (root/'src').rglob('*.tsx'):
 if 'dashboard' in p.parts or p.name=='SeoManager.tsx': continue
 s=p.read_text(encoding='utf-8')
 s=re.sub(r'<title>.*?</title>','',s,flags=re.S)
 s=re.sub(r'<meta\s[^>]*?/>','',s,flags=re.S)
 s=re.sub(r'<link\s+rel=[\'"]canonical[\'"][^>]*?/>','',s,flags=re.S)
 p.write_text(s,encoding='utf-8')
edit('src/components/feature/SeoManager.tsx',lambda s:s.replace("!knownPaths.has(pathname)","(!knownPaths.has(pathname) && !/^\\/mentors\\/\\d+$/.test(pathname))").replace('Learner & Employer Stories','Workplace Outcome Examples').replace('Testimonials','Workplace Outcome Examples'))
edit('src/components/feature/Footer.tsx',lambda s:s.replace('Learner & Employer Stories','Workplace outcome examples'))
edit('src/pages/employers/page.tsx',lambda s:s.replace('Employer stories','Example scenarios').replace('Our evidence hub explains the workplace changes KBC looks for and only publishes outcomes when they are consented, attributable and verifiable.','Explore illustrative workplace tasks and the capabilities programmes aim to develop. These examples are not measured employer results.').replace('View Case Studies','Explore workplace examples'))
# Give multistep transitions and validation errors a predictable focus target.
def eligibility(s):
 s=s.replace('useId, useState','useId, useState, useEffect')
 s=s.replace('type="radio" name={question.id}', 'type="radio" required={question.required} aria-invalid={hasError} aria-describedby={hasError ? errorId : helpId} name={question.id}')
 s=s.replace('id={fieldId} value=', 'id={fieldId} required={question.required} value=').replace('id={fieldId} type="text"','id={fieldId} required={question.required} type="text"').replace('id={fieldId} rows=', 'id={fieldId} required={question.required} rows=')
 marker='  const totalSteps = checkerSteps.length;'
 s=s.replace(marker,'''  useEffect(() => {
    if (phase === 'intro') return;
    const target = document.querySelector<HTMLElement>('#eligibility-checker h2');
    target?.setAttribute('tabindex', '-1'); target?.focus({ preventScroll: true });
  }, [phase, stepIndex]);
  useEffect(() => {
    if (errorFields.size) document.querySelector<HTMLElement>('#eligibility-checker [aria-invalid="true"]')?.focus();
  }, [errorFields]);
'''+marker)
 return s
edit('src/pages/apprenticeship-eligibility-checker/components/EligibilityCheckerFlow.tsx',eligibility)
# Bound network waits; never turn failed POSTs into local success.
for p in (root/'src/services').glob('*Api.ts'):
 s=p.read_text(encoding='utf-8')
 s=re.sub(r'fetch\((`[^`]+`)\)',r'fetch(\1, { signal: AbortSignal.timeout(20000) })',s)
 s=s.replace("method: 'POST',", "method: 'POST',\n    signal: AbortSignal.timeout(20000),")
 p.write_text(s,encoding='utf-8')
edit('src/dashboard/api/client.ts',lambda s:s.replace('{ ...options, headers }','{ ...options, headers, signal: AbortSignal.timeout(20000) }').replace("method: 'POST',\n    headers:","method: 'POST',\n    signal: AbortSignal.timeout(20000),\n    headers:"))
# Remove legacy testimonial payloads from active route contracts.
edit('src/components/feature/RouteLanding/RouteTestimonials.tsx',lambda s:'''import OutcomeExamples from '../OutcomeExamples';
export default function RouteTestimonials() { return <OutcomeExamples />; }
''')
edit('src/components/feature/RouteLanding/SectorRoutePage.tsx',lambda s:s.replace(' testimonials: ComponentProps<typeof RouteTestimonials>;','').replace('<RouteTestimonials {...config.testimonials} />','<RouteTestimonials />'))
for p in list((root/'src/pages').rglob('sectorData.ts'))+list((root/'src/pages/strategic-operational-pcp').glob('page.tsx')):
 s=p.read_text(encoding='utf-8')
 s=re.sub(r'const testimonialsData = \{.*?\n\};\n', '',s,flags=re.S)
 s=s.replace('testimonials: testimonialsData,','').replace('<RouteTestimonials {...testimonialsData} />','<RouteTestimonials />')
 p.write_text(s,encoding='utf-8')
edit('src/pages/apprentices/page.tsx',lambda s:re.sub(r'const testimonials = \[.*?\n\];\n','',s,flags=re.S).replace('  const testimonialsSection = useReveal(0.05);\n',''))
# Keep CMS resource labels aligned with public rendering.
for p in (root/'src/dashboard').rglob('*.tsx'):
 s=p.read_text(encoding='utf-8').replace('min-w-[280px]','min-w-0').replace('Trusted Partners','Partner logos').replace('scrolling &quot;Trusted professional pathways&quot; strip','partner logo grid').replace('Certificates','Professional credentials')
 p.write_text(s,encoding='utf-8')
print('Phase 7 applied')
