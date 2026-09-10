from pathlib import Path
import re
from PIL import Image
root=Path('frontend')
def edit(path,fn):
 p=root/path;p.write_text(fn(p.read_text(encoding='utf-8')),encoding='utf-8')
def write(path,s): (root/path).write_text(s,encoding='utf-8')
write('src/App.tsx','''import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes } from './router';
import SiteLink from './components/base/SiteLink';
import ErrorBoundary from './components/base/ErrorBoundary';
const DashboardApp = lazy(() => import('./dashboard/DashboardApp'));
export default function App() {
  return <BrowserRouter basename={__BASE_PATH__}>
    <SiteLink className="skip-link" href="#main-content">Skip to main content</SiteLink>
    <ErrorBoundary><Suspense fallback={<main id="main-content" className="page-loader" role="status">Loading page</main>}>
      <Routes><Route path="/dashboard/*" element={<DashboardApp />} /><Route path="*" element={<AppRoutes />} /></Routes>
    </Suspense></ErrorBoundary>
  </BrowserRouter>;
}
''')
def router(s):
 s=s.replace("import { AnimatePresence, motion } from 'framer-motion';\n",'')
 start=s.index('      <AnimatePresence'); end=s.index('          <Suspense',start)
 s=s[:start]+'      <div id="main-content" tabIndex={-1} key={location.pathname}>\n'+s[end:]
 return s.replace('        </motion.div>\n      </AnimatePresence>','      </div>')
edit('src/router/index.tsx',router)
def navbar(s):
 s="import Modal from '@/components/base/Modal';\n"+s
 start=s.index('  //',s.index('  }, [routesOpen]);'));end=s.index('  const handleRoutesEnter',start)
 s=s[:start]+'''  const triggerRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { setRoutesOpen(false); setMobileOpen(false); }, [pathname]);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && routesOpen) { setRoutesOpen(false); triggerRef.current?.focus(); }
    };
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, [routesOpen]);
  useEffect(() => {
    const resize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener('resize', resize);
    return () => { window.removeEventListener('resize', resize); if (routesTimeoutRef.current) clearTimeout(routesTimeoutRef.current); };
  }, []);
'''+s[end:]
 s=s.replace('window.scrollY > 60','window.scrollY > 60 || pathname.startsWith(\'/mentors/\')').replace("window.addEventListener('scroll', handleScroll", "handleScroll();\n    window.addEventListener('scroll', handleScroll",1).replace('  }, []);','  }, [pathname]);',1)
 s=s.replace('h-[72px] items-center px-4 md:px-6','h-[72px] items-center')
 start=s.index('            <img');end=s.index('          </SiteLink>',start)
 s=s[:start]+'''            <img decoding="async" width="148" height="64"
              src={scrolled ? '/images/cpcm-logo-dark.webp' : '/images/cpcm-logo-light.webp'}
              alt="College of Project Controls" className="h-full w-full object-contain" />
'''+s[end:]
 s=s.replace('aria-expanded={routesOpen}', 'ref={triggerRef}\n                    aria-expanded={routesOpen}')
 s=re.sub(r'^.*(?:ref=\{ctaRef\}|style=\{\{ transform: ctaTransform|onMouseMove=\{handleCtaMouseMove\}|onMouseLeave=\{handleCtaMouseLeave\}).*\n','',s,flags=re.M)
 s=s.replace('{mobileOpen && (\n        <div id="mobile-navigation" className="border-t border-background-200/70 bg-background-50 lg:hidden">','<Modal open={mobileOpen} onClose={() => setMobileOpen(false)} title="Site navigation" id="mobile-navigation">')
 s=s.replace('        </div>\n      )}\n\n      {/* Dropdown','      </Modal>\n\n      {/* Dropdown')
 return s
edit('src/components/feature/Navbar.tsx',navbar)
write('src/components/feature/FundingTicker.tsx','''import SiteLink from '@/components/base/SiteLink';
export default function FundingTicker() {
  return <div className="flex h-10 items-center justify-center bg-signal-500 px-4 text-center text-xs font-semibold text-primary-950">
    <SiteLink href="/apprenticeship-eligibility-checker" className="underline underline-offset-2">Apprenticeship funding is subject to eligibility</SiteLink>
  </div>;
}
''')
write('src/components/feature/StickyCta.tsx','''import SiteLink from '@/components/base/SiteLink';
import { useState, useEffect } from 'react';
export default function StickyCta() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const update = () => setVisible(window.scrollY > 600);
    update(); window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  if (!visible) return null;
  return <aside id="sticky-actions" aria-label="Next steps" className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-secondary-900 p-3">
    <div className="container-site flex flex-wrap items-center justify-center gap-3">
      <SiteLink href="/book-a-session" className="btn-primary px-5 py-3 text-sm">Request a consultation</SiteLink>
      <SiteLink href="/apprenticeship-eligibility-checker" className="px-3 py-2 text-sm text-white underline underline-offset-4">Check eligibility</SiteLink>
    </div>
  </aside>;
}
''')
def dashboard(s):
 s="import { useState } from 'react';\nimport Modal from '@/components/base/Modal';\nimport RouteScroll from '@/components/feature/RouteScroll';\n"+s
 s=s.replace('  const { logout }', '  const [menuOpen, setMenuOpen] = useState(false);\n  const { logout }')
 start=s.index('      <aside');end=s.index('      <main',start)
 sidebar=s[start:end].replace('<aside className="flex w-64 flex-shrink-0 flex-col bg-primary-950 text-white">','<div className="flex h-full flex-col bg-primary-950 text-white">').replace('</aside>','</div>')
 sidebar=sidebar.replace('to={item.to}', 'to={item.to}\n              onClick={() => setMenuOpen(false)}').replace('<nav className=', '<nav aria-label="Dashboard" className=')
 s=s[:start]+'''      <RouteScroll />
      <aside className="hidden w-64 shrink-0 lg:block">{navigation}</aside>
      <Modal open={menuOpen} onClose={() => setMenuOpen(false)} title="Dashboard navigation">{navigation}</Modal>
'''+s[end:]
 s=s.replace('  return (','  const navigation = (\n'+sidebar+'  );\n\n  return (',1)
 s=s.replace('<main className=', '<main id="main-content" tabIndex={-1} className=')
 s=s.replace('          <Outlet />','          <button type="button" onClick={() => setMenuOpen(true)} className="btn-secondary mb-6 px-4 py-2 lg:hidden">Dashboard menu</button>\n          <Outlet />')
 return s
edit('src/dashboard/layout/DashboardLayout.tsx',dashboard)
def dashboardapp(s):
 s="import { lazy, Suspense, useEffect } from 'react';\n"+s
 s=re.sub(r"import (\w+) from '(\./pages/[^']+)';",r"const \1 = lazy(() => import('\2'));",s)
 s=s.replace('  return (\n    <AuthProvider>', '''  useEffect(() => {
    document.title = 'CPCM Dashboard';
    const robots = document.querySelector('meta[name="robots"]') || document.head.appendChild(document.createElement('meta'));
    robots.setAttribute('name', 'robots'); robots.setAttribute('content', 'noindex, nofollow');
  }, []);
  return (
    <AuthProvider>''')
 return s.replace('<DashboardRoutes />','<Suspense fallback={<div className="page-loader" role="status">Loading dashboard</div>}><DashboardRoutes /></Suspense>')
edit('src/dashboard/DashboardApp.tsx',dashboardapp)
edit('src/dashboard/pages/LoginPage.tsx',lambda s:s.replace('<div className="flex min-h-screen','<div id="main-content" tabIndex={-1} className="flex min-h-screen'))
edit('src/index.css',lambda s:s+'\nbody:has(#sticky-actions) { padding-bottom: 132px; }\ndialog::backdrop { background: rgb(0 0 0 / .6); }\n')
# Resolve semantic alpha utility values from the same token definition.
tokens=(root/'src/styles/tokens.css').read_text(encoding='utf-8')
values=dict(re.findall(r'--color-([\w-]+):\s*(#[0-9A-Fa-f]{6});',tokens))
for name,value in values.items():
 rgb=' '.join(str(int(value[i:i+2],16)) for i in (1,3,5))
 tokens=tokens.replace(f'--color-{name}: {value};',f'--{name}-rgb: {rgb};\n  --color-{name}: rgb(var(--{name}-rgb));')
write('src/styles/tokens.css',tokens)
edit('tailwind.config.ts' if (root/'tailwind.config.ts').exists() else 'tailwind.config.js',lambda s:re.sub(r"var\(--color-([\w-]+)\)",r"rgb(var(--\1-rgb) / <alpha-value>)",s))
for name in ['cpcm-logo-light','cpcm-logo-dark']:
 p=root/f'public/images/{name}.png'
 im=Image.open(p);im.thumbnail((444,192));im.save(p.with_suffix('.webp'),lossless=True)
# Replace unsupported learner evidence without removing delivery content.
def apprentices(s):
 s="import OutcomeExamples from '@/components/feature/OutcomeExamples';\n"+s
 start=s.index('                  <div className="flex gap-0.5 mb-2">');end=s.index('                </div>',s.index('Current Learner',start))
 s=s[:start]+'''                  <p className="text-xs font-semibold text-primary-700">Example learning scenario</p>
                  <p className="mt-2 text-sm text-foreground-700">A learner reviews a workplace task with their mentor, then applies the feedback to their next project output.</p>
'''+s[end:]
 start=s.index('        <div className="bg-white py-16 md:py-24 border-t border-background-200/40">', s.index('Current Learner') if 'Current Learner' in s else s.index('Example learning scenario'))
 # This block is the outcomes grid, bounded by the next FAQ comment.
 end=s.index('        {/*',s.index('</div>\n        </div>',start)+len('</div>\n        </div>'))
 s=s[:start]+'        <OutcomeExamples />\n\n'+s[end:]
 return s
edit('src/pages/apprentices/page.tsx',apprentices)
print('Phase 6 applied')
