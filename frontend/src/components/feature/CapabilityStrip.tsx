const capabilities = [
  { icon: 'ri-calendar-check-line', label: 'Planning & Scheduling' },
  { icon: 'ri-money-pound-circle-line', label: 'Cost Control' },
  { icon: 'ri-shield-check-line', label: 'Risk & Assurance' },
  { icon: 'ri-git-merge-line', label: 'Change Control' },
  { icon: 'ri-dashboard-3-line', label: 'PMO Governance' },
  { icon: 'ri-line-chart-line', label: 'Decision-ready Reporting' },
];

export default function CapabilityStrip() {
  return (
    <section className="border-y border-background-200 bg-white" aria-labelledby="capability-strip-title">
      <div className="container-site py-5 md:py-6">
        <p
          id="capability-strip-title"
          className="mb-5 text-center font-label text-sm font-bold uppercase tracking-[0.16em] text-primary-800"
        >
          Specialist capability for project-driven organisations
        </p>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {capabilities.map((capability) => (
            <li
              key={capability.label}
              className="group flex min-h-20 items-center gap-3 rounded-xl border border-background-200 bg-background-50 px-4 py-4 text-base font-bold leading-snug text-primary-800 transition-all hover:-translate-y-0.5 hover:border-signal-300 hover:bg-white hover:shadow-sm"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-signal-50 text-signal-700 transition-colors group-hover:bg-signal-500 group-hover:text-primary-950" aria-hidden="true">
                <i className={`${capability.icon} text-base`} />
              </span>
              <span>{capability.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
