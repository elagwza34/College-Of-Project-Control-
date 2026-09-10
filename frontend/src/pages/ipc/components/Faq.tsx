const faqs = [
  ['What is the Institute of Project Controls?', 'IPC is a professional body focused on advancing project controls capability, standards, professional development and recognition.'],
  ['How does IPC connect with College programmes?', 'Relevant College programmes combine structured learning and workplace application with IPC-aligned professional development. The exact support and recognition route is confirmed for each programme and learner.'],
  ['Does completing a programme guarantee professional status?', 'No. Membership, awards and professional recognition remain subject to the Institute’s current criteria, assessment and approval requirements.'],
  ['Which disciplines sit within project controls?', 'Project controls commonly connects planning, scheduling, cost, risk, change, earned value, reporting, governance, PMO and data-informed decision support.'],
];

export default function Faq() {
  return (
<section className="py-16 md:py-24"><div className="container-site max-w-4xl"><div className="text-center"><p className="text-xs font-bold uppercase tracking-[.18em] text-ipc-ink">IPC explained</p><h2 className="mt-4 text-3xl md:text-4xl">Frequently asked questions</h2></div><div className="mt-10 space-y-3">{faqs.map(([q, a]) => <details key={q} className="group rounded-xl border border-background-200 bg-white"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5"><h3 className="text-base">{q}</h3><i className="ri-add-line text-xl text-ipc-ink transition-transform group-open:rotate-45" /></summary><p className="border-t border-background-200 px-5 py-4 text-sm leading-relaxed text-foreground-600">{a}</p></details>)}</div></div></section>
  );
}
