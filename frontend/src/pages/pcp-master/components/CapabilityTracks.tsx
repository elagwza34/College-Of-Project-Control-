import SectionHeading from '@/components/base/SectionHeading';

function CapabilityCard({ icon, title, description, light = false }: { icon: string; title: string; description?: string; light?: boolean }) {
  return (
    <div className={`group p-5 rounded-lg transition-all duration-400 cursor-default card-scale-hover ${light ? 'bg-secondary-600/60 hover:bg-primary-500' : 'bg-background-50 hover:bg-primary-500 border border-background-200/70'}`}>
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-100 group-hover:bg-background-50/20 transition-colors duration-400"><i className={`${icon} text-lg text-primary-600 group-hover:text-background-50 transition-colors duration-400`} /></div>
      <h4 className={`mt-3 text-sm md:text-base font-semibold font-heading transition-colors duration-400 ${light ? 'text-background-50' : 'text-foreground-900'} group-hover:text-background-50`}>{title}</h4>
      {description && <p className={`mt-1.5 text-xs md:text-sm leading-relaxed transition-colors duration-400 ${light ? 'text-background-50/70' : 'text-foreground-600'} group-hover:text-background-50/80`}>{description}</p>}
    </div>
  );
}

const capabilityTracks = [
  { icon: 'ri-bar-chart-grouped-line', title: 'Planning & Scheduling', description: 'Build structured, defendable project schedules and baseline management capability.' },
  { icon: 'ri-money-pound-circle-line', title: 'Cost Engineering & Forecasting', description: 'Develop cost estimation, budget control, earned value and forecasting competence.' },
  { icon: 'ri-alert-line', title: 'Risk & Change Control', description: 'Implement risk management frameworks, change control processes and mitigation strategies.' },
  { icon: 'ri-dashboard-line', title: 'Performance Reporting & Data Assurance', description: 'Create meaningful project dashboards, KPIs, progress reports and data-driven insights.' },
  { icon: 'ri-scales-line', title: 'Governance, Commercial Controls & Decision Support', description: 'Establish governance frameworks, commercial awareness and decision-support capability.' },
];

export default function CapabilityTracks() {
  return (
    <section className="py-16 md:py-20 bg-background-50">
      <div className="container-site">
        <SectionHeading
          tag="Professional Capability"
          title="Not Just a Qualification. A Capability Route Built Around Real Projects."
          subtitle="Each track builds a specific, measurable competence area within project controls. Develop planning, cost, risk, reporting and governance capability that your projects and organisation can see, measure and rely on every day."
        />
        <div className="mt-10 md:mt-14 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-5">
          {capabilityTracks.map((track) => <CapabilityCard key={track.title} icon={track.icon} title={track.title} description={track.description} />)}
        </div>
      </div>
    </section>
  );
}
