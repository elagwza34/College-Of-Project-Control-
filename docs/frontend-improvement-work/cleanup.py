from pathlib import Path
import re,json
from PIL import Image
root=Path('frontend').resolve()
def edit(path,fn):
 p=root/path;p.write_text(fn(p.read_text(encoding='utf-8')),encoding='utf-8')
edit('src/main.tsx',lambda s:s.replace("import './i18n'",''))
edit('vite.config.ts',lambda s:re.sub(r'\s*// React i18n\s*\{\s*"react-i18next": \["useTranslation", "Trans"\],\s*\},','',s))
edit('src/pages/apprenticeship-eligibility-checker/components/EligibilityCheckerFlow.tsx',lambda s:s.replace('#eligibility-checker h2','#checker h3').replace('#eligibility-checker [','#checker ['))
edit('src/dashboard/pages/EnquiriesPage.tsx',lambda s:s.replace('} catch {\n      load();','} catch (error) {\n      reportCmsError(error);\n      load();').replace('{error && <p className="mt-4 text-sm text-red-600">','{error && <p role="alert" className="mt-4 text-sm text-red-600">'))
edit('src/components/feature/RouteLanding/RouteHero.tsx',lambda s:s.replace('{/* Right Column: Dashboard Mockup */}', '{/* Right Column: Dashboard Mockup */}\n          <p className="text-sm text-white/80 lg:col-start-2">Illustrative controls view — sample data, not measured programme results.</p>'))
edit('public/robots.txt',lambda s:s.replace('Disallow: /thank-you/\n','').replace('Disallow: /campaign/\n',''))
for name in ['employer-capability-team','ipc-logo']:
 p=root/f'public/images/{name}.png';im=Image.open(p);im.thumbnail((1200,900) if name.startswith('employer') else (256,256));im.save(p.with_suffix('.webp'),quality=85,method=6)
 for target in (root/'src').rglob('*.tsx'):
  s=target.read_text(encoding='utf-8');target.write_text(s.replace(f'{name}.png',f'{name}.webp'),encoding='utf-8')
# Exact-file deletions only, after proving no imports remain. Preserve original
# public image URLs for external users.
names=['CampaignLeadForm','RouteConsultationForm','RouteEligibilityForm','RegisterInterestForm','PmoEnquiryForm','HomeFaq','CroUrgencyStrip','ProgrammeIntroduction','ProfessionalDirection','ExperienceDifferent','ProfessionalOutcomes','Testimonials','WhyCollege','EventsSection','EventsConsultation','ProgrammeEvents','PagesListPage','PageEditorPage','NavigationPage','useLeadScoring','useCROTest']
removed=[]
for iteration in range(4):
 for p in list((root/'src').rglob('*')):
  if not p.is_file() or (p.stem not in names and 'i18n' not in p.parts):continue
  if p.suffix not in ['.ts','.tsx','.json']:continue
  refs=[]
  for other in (root/'src').rglob('*'):
   if other==p or other.suffix not in ['.ts','.tsx']:continue
   if re.search(r"(?:from\s*|import\s*\(?)['\"][^'\"]*\b"+re.escape(p.stem)+r"['\"]",other.read_text(encoding='utf-8')):refs.append(other)
  if refs and 'i18n' not in p.parts:continue
  assert p.resolve().is_relative_to(root/'src')
  p.unlink();removed.append(str(p.relative_to(root)))
(Path('docs/frontend-improvement-work')/'removed-files.json').write_text(json.dumps(removed,indent=2),encoding='utf-8')
print(json.dumps(removed,indent=2))
