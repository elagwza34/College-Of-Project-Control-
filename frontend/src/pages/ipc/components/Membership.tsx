import SiteLink from '@/components/base/SiteLink';

const membershipGrades = [
  { icon: 'ri-user-line', grade: 'Student Member', copy: 'For learners actively developing project controls capability through structured study or workplace application.' },
  { icon: 'ri-user-star-line', grade: 'Associate Member', copy: 'For professionals building applied experience across planning, cost, risk or controls disciplines.' },
  { icon: 'ri-award-line', grade: 'Member (MIPC)', copy: 'For practitioners who have demonstrated sustained professional competence and workplace impact.' },
  { icon: 'ri-medal-line', grade: 'Fellow (FIPC)', copy: 'For senior professionals recognised for strategic leadership and long-term contribution to the profession.' },
];

export default function Membership() {
  return (
<section id="membership" className="py-16 md:py-24"><div className="container-site"><div className="mx-auto max-w-3xl text-center"><p className="text-xs font-bold uppercase tracking-[.18em] text-ipc-ink">Membership</p><h2 className="mt-4 text-3xl md:text-4xl">A profession with clear levels of recognition</h2><p className="mt-4 text-foreground-600">IPC membership recognises professional capability at different stages of a project controls career, from early development through to senior strategic leadership. Membership criteria, assessment and fees are set and administered by the Institute of Project Controls.</p></div><div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{membershipGrades.map(item => <article key={item.grade} className="rounded-2xl border border-background-200 bg-white p-6 shadow-sm"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ipc-gold/15 text-ipc-ink"><i className={`${item.icon} text-xl`} /></span><h3 className="mt-5 text-lg">{item.grade}</h3><p className="mt-3 text-sm leading-relaxed text-foreground-600">{item.copy}</p></article>)}</div><div className="mt-10 text-center"><SiteLink href="https://instituteofprojectcontrols.com" target="_blank" rel="noreferrer" className="cta-button inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-gradient-to-r from-ipc-ink to-[#C6953B] px-6 text-sm font-bold text-[#1A1204]">Explore IPC Membership <i className="ri-external-link-line" aria-hidden="true" /></SiteLink><p className="mx-auto mt-4 max-w-2xl text-xs leading-relaxed text-foreground-600">Membership grades, eligibility criteria and applications are managed directly by the Institute of Project Controls.</p></div></div></section>
  );
}
