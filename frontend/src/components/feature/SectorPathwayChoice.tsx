import { useState } from 'react';
import SiteLink from '@/components/base/SiteLink';

const routes = [
  { name: 'Operational Pathway', href: '/project-controls-professional/operational-route', audience: 'Planning, cost, risk and controls professionals close to delivery.', modules: ['PMP preparation and project leadership â€” 2 credits', 'AI in Project Controls â€” 1 credit', 'Planning and Control â€” 2 credits', 'One specialist elective: risk, EVM or scheduling â€” 1 credit'], note: 'Six internal pathway credits, applied to your workplace responsibilities.' },
  { name: 'Strategic Pathway', href: '/project-controls-professional/strategic-route', audience: 'Senior controls, programme, portfolio and PMO leaders.', modules: ['PMP strategic project leadership â€” 2 credits', 'AI in Project Controls â€” 1 credit', 'Programme Management â€” 1 credit', 'Portfolio Management â€” 1 credit', 'PMO Leadership â€” 1 credit'], note: 'Six internal pathway credits connecting controls evidence to strategic decisions.' },
  { name: 'Chartered Pathway', href: '/project-controls-professional/chartered-pmo-pathway', audience: 'Experienced practitioners developing senior professional evidence.', modules: ['Four PMO modules: governance, integrated controls, risk and quality, stakeholders and reporting', 'AI in Project Controls', 'Portfolio Management', 'Earned Value Management'], note: 'Four PMO modules and three specialist components. ChPP eligibility and assessment remain independent.' },
  { name: 'PMO Development', href: '/project-controls-professional/pmo-governance-route', audience: 'Professionals establishing or improving PMO governance and operating models.', modules: ['PMO mandate and governance', 'Standards, reporting and assurance', 'Services, operating model and maturity', 'Workplace evidence and professional practice'], note: 'Confirm programme scope, access terms and any included external assessment during consultation.' },
];

export default function SectorPathwayChoice() {
  const [selected, setSelected] = useState(0);
  const route = routes[selected];
  return <section id="pathways" className="scroll-mt-44 bg-background-100 py-16 md:py-20"><div className="container-site space-y-8">
    <div className="max-w-3xl space-y-4"><p className="text-xs font-bold uppercase tracking-[.16em] text-accent-700">Choose your professional direction</p><h2 className="text-3xl md:text-4xl">Match the pathway to your responsibilities.</h2><p className="text-foreground-600">Compare the current programme structures, then discuss role fit, prior learning, employer support and workplace evidence with our team.</p></div>
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Choose a professional pathway">{routes.map((item, index) => <button key={item.name} type="button" aria-pressed={selected === index} aria-controls="sector-pathway-detail" onClick={() => setSelected(index)} className={`min-h-14 rounded-xl border p-4 text-left font-bold transition-colors ${selected === index ? 'border-primary-950 bg-primary-950 text-white' : 'border-background-200 bg-white text-primary-950 hover:border-accent-600'}`}>{item.name}</button>)}</div>
    <div id="sector-pathway-detail" aria-live="polite" className="grid gap-8 rounded-2xl border border-background-200 bg-white p-6 md:p-8 lg:grid-cols-2"><div className="space-y-4"><h3 className="text-2xl">{route.name}</h3><p className="text-foreground-600">{route.audience}</p><p className="text-sm text-foreground-600">{route.note}</p><SiteLink href={route.href} className="btn-primary inline-flex min-h-12 items-center px-6 font-bold">Explore this pathway</SiteLink></div><ul className="list-disc space-y-3 pl-5 text-foreground-700">{route.modules.map(module => <li key={module}>{module}</li>)}</ul></div>
    <p className="text-sm text-foreground-600">Internal pathway credits are not transferable academic credits. Final sequencing and support are agreed in the written training plan. Apprenticeship funding and IPC bursary support are subject to eligibility, availability and written confirmation.</p>
  </div></section>;
}

