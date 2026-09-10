from pathlib import Path
import json,re
exec(Path('docs/adopt-pathway-content.py').read_text(encoding='utf-8-sig').split('for name,folder in')[0])
old_adapt=adapt
def adapt(s):
 s=old_adapt(s)
 s=s.replace('PMO Certified','PMO Development').replace('KBC\u2019s','the College\u2019s').replace('College\u2019s wider professional community','the wider professional community')
 s=s.replace('Select a domain to see how the delivery focus changes.','Explore how the delivery focus changes across engineering domains.')
 s=s.replace('Download the career guide','Discuss your career development').replace('Download the Career Guide','Discuss your career development')
 s=s.replace('the six-credit Operational, Strategic and Chartered pathways','the Operational, Strategic and Chartered pathways')
 s=s.replace('six-credit professional pathways','apprenticeship pathways').replace('six-credit pathways','apprenticeship pathways').replace('six-credit pathway','apprenticeship pathway').replace('Six-credit pathway funding','Apprenticeship funding')
 s=s.replace('delivered through College.','delivered through the College.')
 if s.startswith('PMO Development is a focused four-credit route'):return 'PMO development focuses on governance, operating models and professional practice. Confirm the current programme structure and its funding or IPC bursary terms separately with the College.'
 s=s.replace('The landing page translates the Career Guide’s project-controls themes into a clear employer capability framework.','Use these project-controls themes as an employer capability framework.')
 s=s.replace('The Career Guide maps progression','Explore progression')
 s=s.replace('This is an illustrative scenario. Replace it with approved and verifiable employer evidence before publication.','Illustrative scenario, not a verified learner testimonial or a guaranteed outcome.')
 s=s.replace('It is positioned as a mandatory core component of the six-credit Operational, Strategic and Chartered pathways in this page structure.','AI is included in the Operational, Strategic and Chartered programme structures. See the current pathway page for its full scope.')
 if s.startswith('PMP carries two credits and AI in Project Controls'):return 'The Operational Pathway combines PMP (two credits), AI (one), Planning and Control (two) and a specialist elective in risk, EVM or scheduling (one).'
 if s.startswith('It is designed for senior responsibility and combines PMP'):return 'The Strategic Pathway combines PMP strategic leadership (two credits) with AI, Programme Management, Portfolio Management and PMO Leadership (one credit each).'
 if s.startswith('The pathway builder shows'):return 'Use the pathway comparison to review our current programme structures. The final learning plan is agreed against role responsibilities, employer priorities, evidence opportunities and funding requirements.'
 if s.startswith('No. Credits describe pathway weight'):return 'No. Credits describe internal pathway structure rather than academic credit or a fixed number of courses. Review the current programme page for the applicable module structure.'
 if 'specialist certificate is owned and strongly supported' in s:return 'AI learning develops governed workflows, validated information and human review. Any certificate, delivery partner or awarding arrangement is confirmed in the learner agreement.'
 return s
styles={}
def add2(names,css):
 for c in names.split():styles[c]=css
add2('container wrap','container-site space-y-8')
add2('section-heading section-head faq-intro section-intro','max-w-3xl space-y-4')
add2('eyebrow kicker eyebrow-light hero-eyebrow','text-xs font-bold uppercase tracking-[.15em] text-accent-700')
add2('challenge-grid panel-body module-columns route-grid access-grid application-panel ai-grid learning-grid learn-grid value-grid system-panel challenge-bento sector-display delivery-grid employer-grid guide-grid faq-grid','grid min-w-0 items-start gap-6 lg:grid-cols-2')
add2('evidence-grid output-grid expert-grid experts value-cards roles sector-grid','grid min-w-0 gap-5 md:grid-cols-2 lg:grid-cols-3')
add2('role-grid role-map maturity-grid learning-steps path-grid career-map delivery-steps engineering-strip','grid min-w-0 gap-5 md:grid-cols-2 lg:grid-cols-4')
add2('evidence-card output output-card expert-card expert role role-stage maturity-stage learning-step route-card mini-card challenge-card career-card path-card delivery-step impact-card sector-photo-card quote-card','min-w-0 space-y-4 rounded-2xl border border-background-200 bg-white p-6 text-foreground-800 shadow-sm')
add2('application-copy application-visual system-copy system-body learning-copy challenge-main challenge-side employer-card','min-w-0 space-y-4')
add2('application-points route-body module-group expert-body evidence-body disconnect-list faq-list rhythm','space-y-4')
add2('application-point disconnect-item route-item flow-step engineering-stat sector-outcome','space-y-2 rounded-xl border border-background-200 bg-white p-4')
add2('path-badges expert-tags strip-inner hero-actions route-actions actions final-actions','flex flex-wrap items-center gap-3')
add2('strip-item path-badge expert-tag pill credit-pill route-label tag','inline-block rounded-full bg-accent-50 px-3 py-2 text-sm font-semibold text-primary-950')
add2('btn','inline-flex min-h-12 items-center justify-center rounded-md px-6 py-3 text-sm font-bold')
add2('btn-primary btn-dark btn-purple btn-gold','btn-primary')
add2('btn-outline btn-outline-light btn-ghost btn-light','border border-primary-700 text-primary-950')
add2('route-highlight route-alert notice access-note evidence-note ai-note testimonial-note','space-y-3 rounded-xl border border-accent-200 bg-accent-50 p-5 text-primary-950')
add2('bursary-row module-item','flex flex-wrap justify-between gap-3 border-b border-background-200 py-3')
add2('number path-index career-code','inline-flex h-10 w-10 items-center justify-center rounded-full bg-signal-100 font-bold text-primary-950')
add2('faq-a faq-answer','space-y-3 px-5 pb-5 text-foreground-600')
# Exclude duplicated carousel decorations, source logos and nonfunctional source controls.
skipclasses=set('path-tabs application-tabs system-tabs sector-tabs builder-nav evidence-preview doc-sheet doc-lines mini-chart control-map ai-visual career-arrow career-meta path-icon output-icon quote-mark avatar impact-measure testimonial-controls sector-photo-grid rail-track capability-rail testimonial-item hero-statbar'.split())

def render2(n):
 if isinstance(n,str):
  s=adapt(n)
  return '{'+json.dumps(s+' ',ensure_ascii=False)+'}' if s and s not in ['+','→','←','◎','↗','◇','⌁'] else ''
 t=n['tag'];a=n['attrs'];cl=a.get('class','').split()
 if t in ['style','script','svg','img','input','select','nav','form','footer'] or set(cl)&skipclasses:return ''
 if 'style' in a and re.search(r'display\s*:\s*none',a['style']):return ''
 if t=='button' and 'faq-q' not in cl:return ''
 if t=='a' and not a.get('href'):return ''
 if 'faq-item' in cl:t='details'
 if 'faq-q' in cl:t='summary'
 css=[base[t]] if t in base else []
 if t in ['div','article','aside','header']:css=['min-w-0 space-y-4']
 if t=='p':css=['text-base leading-relaxed text-foreground-600']
 if t=='b':css=['font-bold']
 if t=='details':css=['rounded-xl border border-background-200 bg-white [&>p]:px-5 [&>p]:pb-5']
 for c in cl:
  if c in styles:css.append(styles[c])
 props=[]
 if a.get('id'):props.append(('id',a['id']))
 if t=='section':
  css=['scroll-mt-44 py-16 md:py-20 '+('bg-white' if index[0]%2==0 else 'bg-background-100')];index[0]+=1
 if t=='a':
  t='SiteLink';h=a['href'];
  if 'kentbusinesscollege' in h:
   h=('/associate-project-manager-level-4' if 'associate-project' in h else '/events' if '/events' in h else '/articles' if '/blog' in h else '/book-a-session' if 'book-' in h else '/contact')
  if h.endswith('.pdf'):h='/contact'
  if h=='#builder':h='#pathways'
  if h in ['#main','#overview']:h='#hero'
  props.append(('href',h))
  if 'btn' not in cl:css.append('font-semibold text-accent-700 underline underline-offset-4')
 children='\n'.join(filter(None,(render2(c) for c in n['children'])))
 if not children:return ''
 if any(x.startswith('grid ') or ' grid ' in x for x in css):css=[x.replace('space-y-4','').strip() for x in css]
 if css:props.append(('className',' '.join(css)))
 attrs=''.join(' '+k+'='+json.dumps(v,ensure_ascii=False) for k,v in props)
 return '<'+t+attrs+'>\n'+children+'\n</'+t+'>'

def section(id,title,copy):return f'<section id="{id}" className="scroll-mt-44 bg-background-100 py-16 md:py-20"><div className="container-site space-y-6"><h2 className="text-3xl md:text-4xl">{title}</h2><p className="max-w-3xl text-foreground-600">{copy}</p><div className="flex flex-wrap gap-3"><SiteLink href="/apprenticeship-eligibility-checker" className="btn-primary inline-flex min-h-12 items-center px-6 font-bold">Check your eligibility</SiteLink><SiteLink href="/book-a-session" className="inline-flex min-h-12 items-center rounded-md border border-primary-700 px-6 font-bold">Discuss your circumstances</SiteLink></div></div></section>'
for name,title,ext in [('construction','Construction & Infrastructure','webp'),('energy','Energy & Utilities','jpg'),('engineering','Engineering & Advanced Manufacturing','webp'),('public-sector','Public Sector','png')]:
 r=json.loads(Path('docs/'+name+'-source-tree.json').read_text(encoding='utf-8'));nodes=list(walk(r));sections=[n for n in nodes if n['tag']=='section'];hero=sections[0];hn=list(walk(hero));headline=adapt(plain(next(n for n in hn if n['tag']=='h1')));intro=adapt(plain(next(n for n in hn if n['tag']=='p')))
 index=[0];parts=[];nav=[]
 for num,n in enumerate(sections[1:]):
  a=n['attrs'];sid=a.get('id') or 'sector-section-'+str(num+1);a['id']=sid
  if sid=='builder':continue
  if name!='public-sector' and sid=='pathways':parts.append('<SectorPathwayChoice />');nav.append({'label':'Pathways','href':'#pathways'});continue
  if name!='public-sector' and sid=='eligibility':parts.append(section('eligibility','Check the right access route for you.','Use our apprenticeship eligibility checker for an initial indication. Our team then reviews role fit, prior learning, employer support and funding. IPC bursary support can be discussed where an apprenticeship route is unsuitable.'));nav.append({'label':'Eligibility','href':'#eligibility'});continue
  if name=='public-sector' and sid=='testimonials':continue # approved shared programme testimonials replace illustrative slider
  if name=='public-sector' and a.get('class')=='guide':
   parts.append('<section id="career-support" className="bg-background-100 py-16"><div className="container-site space-y-5"><h2 className="text-3xl">Plan your public-sector career development.</h2><p className="max-w-3xl text-foreground-600">Discuss role progression, planning, cost, risk, reporting, public-sector governance and preparation for senior responsibility.</p><SiteLink href="/contact" className="btn-primary inline-flex min-h-12 items-center px-6 font-bold">Discuss your career development</SiteLink></div></section>');continue
  if name=='public-sector' and sid=='eligibility':
   # Keep the six genuine employer FAQs; later template copies repeat other page sections.
   faq=next(x for x in walk(n) if 'faq-list' in x['attrs'].get('class','').split());faq['children']=[x for x in faq['children'] if isinstance(x,dict) and x['tag']=='details'][:6]
  if name=='engineering' and sid=='applications':
   raw=Path('docs/engineering-source.html').read_text(encoding='utf-8');data=raw[raw.index('const sectorData='):raw.index("document.querySelectorAll('.system-tabs")]
   cards=[]
   for m in re.finditer(r"(\w+):\{title:'([^']*)',subtitle:'([^']*)',copy:'([^']*)',checks:\[([^\]]*)\]",data):
    _,tt,sub,cp,checks=m.groups();items=re.findall(r"'([^']*)'",checks)
    cards.append('<article className="space-y-4 rounded-2xl border border-background-200 bg-white p-6"><h3 className="text-xl">'+tt+'</h3><p className="font-semibold">'+sub+'</p><p className="text-foreground-600">'+cp+'</p><ul className="list-disc space-y-2 pl-5">'+''.join('<li>'+v+'</li>' for v in items)+'</ul></article>')
   assert len(cards)==5
   parts.append('<section id="applications" className="scroll-mt-44 bg-background-100 py-16"><div className="container-site space-y-8"><h2 className="text-3xl md:text-4xl">One professional foundation across complex engineering environments.</h2><div className="grid gap-6 md:grid-cols-2">'+''.join(cards)+'</div></div></section>');nav.append({'label':'Applications','href':'#applications'});continue
  parts.append(render2(n))
  if sid in ['challenge','value','applications','outputs','roles','learning','experts','access','faq','sectors','pathways','careers','employers','eligibility']:nav.append({'label':sid.replace('-',' ').title(),'href':'#'+sid})
 herojsx=f'''<header className="relative isolate flex min-h-[80vh] items-center overflow-hidden bg-primary-950 pb-12 pt-36 text-white lg:h-[80vh] lg:min-h-[640px] lg:pt-28">
<img src="/images/{name}-sector-hero.{ext}" alt="" aria-hidden="true" fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover" />
<div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary-950/95 via-primary-950/85 to-primary-950/50" />
<div className="container-site w-full"><div className="max-w-4xl space-y-5"><p className="text-xs font-bold uppercase tracking-[.16em] text-signal-300">{title}</p><h1 className="max-w-4xl text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">{headline}</h1><p className="max-w-3xl text-lg leading-relaxed text-white/90">{intro}</p><div className="flex flex-wrap gap-3 pt-3"><SiteLink href="/book-a-session" className="btn-primary inline-flex min-h-12 items-center px-6 font-bold">Discuss your team’s capability</SiteLink><SiteLink href="#pathways" className="inline-flex min-h-12 items-center rounded-md border border-white/40 px-6 font-bold text-white">Compare pathways</SiteLink></div></div></div></header>'''
 code="import SiteLink from '@/components/base/SiteLink';\nimport Footer from '@/components/feature/Footer';\nimport PageSectionNav from '@/components/feature/PageSectionNav';\n"+("import SectorPathwayChoice from '@/components/feature/SectorPathwayChoice';\n" if name!='public-sector' else '')+'const links = '+json.dumps(nav)+';\nexport default function Page() { return <div className="min-h-screen bg-background-50"><main id="hero">'+herojsx+'<PageSectionNav pageLabel="'+title+'" links={links} />'+''.join(parts)+'</main><Footer /></div>; }\n'
 Path('frontend/src/pages/operational-pcp-'+name+'/page.tsx').write_text(code,encoding='utf-8');print(name,len(code))
