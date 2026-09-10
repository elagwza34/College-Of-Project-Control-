import json,re
from pathlib import Path

def walk(n):
 if isinstance(n,dict):
  yield n
  for c in n['children']:yield from walk(c)
def plain(n):
 if isinstance(n,str):return n
 if n['tag'] in ['style','script','svg']:return ''
 return ' '.join(plain(c) for c in n['children'])
def adapt(s):
 s=' '.join(s.split())
 replacements={
 'with an APM-recognised technical-knowledge route supporting eligible professionals towards ChPP.':'with technical-knowledge development and professional evidence preparation supporting a future independent ChPP application.',
 'A 16-month, four-module KBC programme recognised by APM as technical-knowledge evidence for ChPP Pathway 2.':'An indicative 16-month, four-module professional-development programme. Any recognised-assessment route and its eligibility must be confirmed with the awarding body before enrolment.',
 'APM Recognised Assessment for the ChPP standard':'Professional preparation for an independent ChPP application',
 'APM recognised assessment':'ChPP preparation',
 'Recognised Assessment for the ChPP standard':'Independent professional application',
 'The recognised technical-knowledge component':'The technical-knowledge development component',
 'ChPP Pathway 2 technical-knowledge recognition.':'ChPP Technical-knowledge preparation; recognised-assessment eligibility is confirmed separately.',
 'Pathway 2 technical-knowledge recognition.':'Technical-knowledge preparation; recognised-assessment eligibility is confirmed separately.',
 'Successful completion can provide recognised technical-knowledge evidence for an eligible APM Pathway 2 application.':'An APM Pathway 2 application requires an assessment recognised by APM. Confirm the exact assessment and its current status separately; completion of this pathway alone does not establish that eligibility.',
 'Certified PMO provides recognised technical-knowledge evidence.':'The PMO modules develop technical knowledge and workplace evidence. Any APM-recognised assessment is confirmed separately.',
 'Certified PMO addresses recognised technical knowledge.':'The PMO modules develop technical knowledge. Recognition of a specific assessment must be confirmed separately.',
 'What the recognition means':'Professional application requirements',
 'Recognition boundary':'Professional award boundary',
 'Could this fully funded apprenticeship be right for you?':'Could this apprenticeship pathway be right for you?',
 'The source pathway uses the term':'Our pathway uses the term',
 'This is a Kent Business College certificate.':'This is College of Project Controls professional development. Any completion certificate and its scope are confirmed in the learner offer.',
 'A KBC certificate':'College professional development',
 'AI in Project Controls Certificate':'AI in Project Controls',
 'Certified PMO Professional Level 6':'PMO Professional Development at Level 6',
 'Certified PMO Professional':'PMO Professional Development',
 'Certified PMO core':'PMO development core',
 'Certified PMO':'PMO development',
 'KBC must never request the employer\'s login credentials.':'Our team will not ask for the employer\'s login credentials.',
 'book an information session':'Book an information session',
 'office@kentbusinesscollege.org':'info@collegeofprojectcontrols.com',
 'office@kentbusinesscollege.com':'info@collegeofprojectcontrols.com',
 'kentbusinesscollege.com':'collegeofprojectcontrols.com',
 'Kent Business College':'College of Project Controls',
 'KBC\'s':'the College\'s',
 'KBC':'College',
 'Publication review - July 2026':'Programme information and next steps',
 'Information reviewed: 25 July 2026.':'',
 }
 for a,b in replacements.items():s=s.replace(a,b)
 return s
base={'h2':'text-3xl font-bold leading-tight md:text-4xl','h3':'text-xl font-bold leading-snug','h4':'text-base font-bold','p':'text-base leading-relaxed','ul':'list-disc space-y-2 pl-5','ol':'list-decimal space-y-2 pl-5','li':'leading-relaxed','details':'group rounded-xl border border-background-200 bg-white text-foreground-800','summary':'cursor-pointer p-5 font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600','strong':'font-bold','table':'w-full text-left text-sm','th':'p-3 font-bold','td':'border-t border-background-200 p-3'}
mapclasses={}
def add(names,css):
 for name in names.split():mapclasses['kbc-'+name]=css
add('container','container-site space-y-8')
add('section-heading section-head eligibility-heading eligibility-head','max-w-3xl space-y-4')
add('eyebrow expert-role essential-kicker pmo-kicker','text-xs font-bold uppercase tracking-[.14em] text-accent-700')
add('grid--2 grid-2 split module-layout credit-layout credit-feature-grid two-stage-grid overview-layout eligibility-layout funding-layout final-grid story-grid pmo-focus completion-grid','grid min-w-0 gap-6 lg:grid-cols-2')
add('grid--3 grid-3 capability-grid','grid min-w-0 gap-5 md:grid-cols-2 lg:grid-cols-3')
add('grid-4 expert-grid essential-grid stat-grid pmo-metrics pmo-pillars step-grid hero-metrics','grid min-w-0 gap-5 sm:grid-cols-2 lg:grid-cols-4')
add('cycle','grid gap-4 sm:grid-cols-2 lg:grid-cols-5')
add('card stage-card credit-main-card visual-panel overview-summary overview-item story-outcome decision-input decision-output pmo-level expert-card funding-card cycle-step essential pmo-snapshot pmo-recognition pmo-pillar step stat hero-metric','min-w-0 space-y-4 rounded-2xl border border-background-200 bg-white p-6 text-foreground-800 shadow-sm')
add('card--dark dark-surface credit-feature story-banner final-cta','bg-primary-950 text-white [&_h2]:text-white [&_h3]:text-white [&_h4]:text-white [&_.text-accent-700]:text-signal-300')
add('card--soft','bg-background-100')
add('stack overview-list credit-content credit-intro more-inner essential-inner expert-body credit-main-card pmo-primary','space-y-5')
add('more-content essential-content','px-5 pb-5')
add('button-row actions credit-actions contact-actions','flex flex-wrap items-center gap-3 pt-4')
add('button btn','inline-flex min-h-12 items-center justify-center rounded-md px-5 py-3 text-sm font-bold')
add('button--primary btn--primary','btn-primary')
add('button--dark-secondary btn--secondary','border border-current')
add('workplace-output note info pmo-assessment eligibility-note','rounded-xl border border-accent-200 bg-accent-50 p-5 text-primary-950 space-y-3')
add('credit-shell','space-y-7')
add('credit-marker credit-feature-number','inline-flex items-center gap-4 rounded-xl bg-primary-950 px-6 py-4 font-bold text-white')
add('overview-item-number stage-number cycle-number criterion-number eligibility-number capability-number letter','inline-flex h-10 min-w-10 items-center justify-center rounded-full bg-signal-100 px-2 font-bold text-primary-950')
add('eligibility-item criterion','flex items-start gap-4 rounded-xl border border-background-200 bg-white p-5')
add('eligibility-copy criterion-copy capability-body','min-w-0 space-y-2')
add('eligibility-list criteria-list story-outcomes flow pmo-stack','space-y-4')
add('flow-step','rounded-xl border border-background-200 bg-background-100 p-4 font-semibold text-primary-950')
add('module-banner','space-y-4 rounded-2xl bg-primary-950 p-6 text-white md:p-8 [&_h2]:text-white [&_.text-accent-700]:text-signal-300')
add('duration badge credit-meta overview-duration','inline-block rounded-full bg-signal-100 px-3 py-1 text-sm font-semibold text-primary-950')
add('capability-visual','mb-4')
add('pmo-metric','space-y-2 rounded-xl bg-background-100 p-4')
add('pmo-recognition-mark logo-box','rounded-xl bg-accent-50 p-4 text-sm font-semibold text-primary-950')
add('funding-highlight-number overview-score','block text-4xl font-bold')
add('expert-image','aspect-[4/5] w-full rounded-xl object-cover')
add('eligibility-image completion-image','aspect-[4/3] w-full rounded-2xl object-cover')


# Keep card text readable within nested panels; dark accents are confined to module banners.
add('card--dark dark-surface story-banner final-cta','bg-background-100 text-foreground-800')
add('credit-feature','space-y-6 rounded-2xl border border-background-200 bg-white p-6 md:p-8')
add('credit-feature-grid','grid items-start gap-6 lg:grid-cols-[180px_minmax(0,1fr)]')
add('credit-marker credit-feature-number','inline-flex self-start items-center gap-3 rounded-xl bg-primary-950 px-5 py-4 font-bold text-white')

def render(n,depth=0):
 if isinstance(n,str):
  s=adapt(n)
  return '{'+json.dumps(s+' ',ensure_ascii=False)+'}' if s else ''
 t=n['tag'];a=n['attrs'];cl=a.get('class','').split()
 if t in ['script','style','svg','link','nav'] or any(x in cl for x in ['kbc-floating-cta','kbc-floating-bar','kbc-nav-shell']):return ''
 # Editorial catalogue instructions belong in adoption notes, not the learner journey.
 if t in ['p','li'] and ('Catalogue control:' in plain(n) or 'KBC Certified PMO Professional Level 6 catalogue:' in plain(n) or 'Information reviewed:' in plain(n)):return ''
 if t=='img':
  src=a.get('src','')
  if 'kentbusinesscollege' in src:return ''
  return '<img src="/images/employer-capability-team.webp" alt="Professional learning and collaboration" loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover" />'
 props=[]
 for key in ['id','aria-label','aria-labelledby','colspan','rowspan']:
  if key in a:
   val=adapt(a[key]).replace('kbc-','pathway-');props.append(({'colspan':'colSpan','rowspan':'rowSpan'}.get(key,key),val))
 css=[]
 if t in base:css.append(base[t])
 for c in cl:
  if c in mapclasses:css.append(mapclasses[c])
 if t=='section':css=['scroll-mt-44 py-16 md:py-20 '+('bg-white' if section_index[0]%2==0 else 'bg-background-100')];section_index[0]+=1
 if t=='div' and not css:css=['space-y-3']
 if t=='a':
  t='SiteLink';href=a.get('href','/contact')
  if 'kentbusinesscollege' in href:href='/book-a-session' if 'book-information' in href else ('mailto:info@collegeofprojectcontrols.com' if href.startswith('mailto:') and '?' not in href else '/contact')
  props.append(('href',href.replace('#kbc-','#pathway-')))
  if not any('button' in c or 'btn' in c for c in cl):css.append('font-semibold text-accent-700 underline underline-offset-4')
 if css:props.append(('className',' '.join(dict.fromkeys(css))))
 attr=''.join(' '+k+'='+json.dumps(v,ensure_ascii=False) for k,v in props)
 if t in ['br','hr']:return '<'+t+attr+' />'
 children='\n'.join(filter(None,(render(c,depth+1) for c in n['children'])))
 if t=='section' and a.get('id')=='eligibility':children += '<div className="container-site mt-8"><SiteLink href="/apprenticeship-eligibility-checker" className="btn-primary inline-flex min-h-12 items-center px-6 font-bold">Check your eligibility</SiteLink></div>'
 return '<'+t+attr+'>\n'+children+'\n</'+t+'>'
for name,folder in [('strategic','strategic-pcp'),('chartered','chartered-pmo-pathway')]:
 root=json.loads(Path('docs/'+name+'-source-tree.json').read_text(encoding='utf-8'));nodes=list(walk(root));sections=[n for n in nodes if n['tag']=='section'];section_index=[0]
 links=[]
 for n in nodes:
  if n['tag']=='nav':
   links=[{'label':adapt(plain(x)), 'href':x['attrs']['href']} for x in walk(n) if x['tag']=='a'];break
 if not links:links=[{'label':n['attrs'].get('id','').replace('-',' ').title(),'href':'#'+n['attrs']['id']} for n in sections if 'id' in n['attrs']]
 title=name.title()+' Pathway'
 intro='Build strategic project-controls capability through six pathway credits, from project leadership to programme, portfolio and PMO decision-making.' if name=='strategic' else 'Develop PMO leadership, integrated controls, risk, portfolio and earned-value capability, with a professional evidence base for a future independent ChPP application.'
 badges=['6 pathway credits','27-month indicative schedule','Workplace evidence'] if name=='strategic' else ['4 PMO modules','3 specialist components','Independent ChPP application']
 hero=f'''<header className="relative isolate flex min-h-[80vh] items-center overflow-hidden bg-primary-950 py-16 pt-36 text-white lg:h-[80vh] lg:min-h-[640px] lg:pt-28">
<img src="/images/{name}-pathway-hero.jpg" alt="" aria-hidden="true" fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover" />
<div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary-950/95 via-primary-950/85 to-primary-950/40" />
<div className="container-site w-full"><div className="max-w-3xl space-y-6">
<p className="text-sm font-bold uppercase tracking-[.16em] text-signal-300">Project Controls Professional Level 6</p>
<h1 className="text-4xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl">{title}</h1>
<p className="max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">{intro}</p>
<div className="flex flex-wrap gap-3">{''.join('<span className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm">'+b+'</span>' for b in badges)}</div>
<div className="flex flex-wrap gap-3 pt-2"><SiteLink href="/book-a-session" className="btn-primary inline-flex min-h-12 items-center justify-center px-6 font-bold">Book an information session</SiteLink><SiteLink href="{links[0]['href']}" className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/50 px-6 font-semibold text-white">Explore the pathway</SiteLink></div>
</div></div></header>'''
 def expected(n):
  if isinstance(n,str):return adapt(n)
  if n['tag'] in ['script','style','svg','link','nav','img']:return ''
  if n['tag'] in ['p','li'] and any(x in plain(n) for x in ['Catalogue control:', 'KBC Certified PMO Professional Level 6 catalogue:', 'Information reviewed:']):return ''
  result=' '.join(expected(c) for c in n['children'])
  if n['tag']=='section' and n['attrs'].get('id')=='eligibility':result+=' Check your eligibility'
  return ' '.join(result.split())
 Path('docs/'+name+'-adapted-content.json').write_text(json.dumps([{'id':n['attrs'].get('id'), 'text':expected(n)} for n in sections],ensure_ascii=False,indent=2),encoding='utf-8')
 body='\n'.join(render(n) for n in sections)
 out="import SiteLink from '@/components/base/SiteLink';\nimport Footer from '@/components/feature/Footer';\nimport PageSectionNav from '@/components/feature/PageSectionNav';\n\nconst sectionLinks = "+json.dumps(links,ensure_ascii=False,indent=2)+";\n\nexport default function "+name.title()+"Pathway() {\nreturn <div className=\"min-h-screen bg-background-50\"><main id=\"hero\">\n"+hero+'\n<PageSectionNav pageLabel="'+title+'" links={sectionLinks} />\n'+body+'\n</main><Footer /></div>;\n}\n'
 Path('frontend/src/pages/'+folder+'/page.tsx').write_text(out,encoding='utf-8')
 print(name,len(sections),'sections',len(out),'bytes')
