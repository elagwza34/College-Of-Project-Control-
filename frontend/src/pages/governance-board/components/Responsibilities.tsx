const responsibilities = [
  { icon: 'ri-eye-line', title: 'Strategic Oversight', description: 'Provide independent guidance on institutional strategy and priorities.' },
  { icon: 'ri-file-shield-2-line', title: 'Policy Approval', description: 'Support the review and approval of key institutional policies.' },
  { icon: 'ri-money-pound-circle-line', title: 'Financial Stewardship', description: 'Provide oversight and challenge around financial sustainability.' },
  { icon: 'ri-shield-flash-line', title: 'Risk Management', description: 'Support identification and management of strategic risks.' },
  { icon: 'ri-scales-3-line', title: 'Regulatory Compliance', description: 'Help ensure the institution maintains appropriate governance standards.' },
  { icon: 'ri-building-2-line', title: 'Institutional Development', description: 'Contribute to long-term planning and continuous improvement.' },
];

export default function Responsibilities() {
  return (
<section id="responsibilities" className="bg-white py-16 md:py-24" aria-labelledby="responsibilities-title">
          <div className="container-site">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-700">Responsibilities</span>
              <h2 id="responsibilities-title" className="mt-3 text-3xl font-bold text-foreground-900 md:text-4xl">Responsibilities of Governance Board members</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {responsibilities.map((item) => (
                <article key={item.title} className="rounded-xl border border-background-200 bg-background-50 p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-100 text-primary-700" aria-hidden="true">
                    <i className={`${item.icon} text-lg`} />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-foreground-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-600">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
  );
}
