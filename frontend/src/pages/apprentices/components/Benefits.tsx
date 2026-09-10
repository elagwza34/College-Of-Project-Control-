import { useReveal } from '@/hooks/useReveal';

const benefits = [
  { icon: 'ri-equalizer-line', title: 'Planning & Cost Skills', desc: 'Build hands-on capability in cost control, earned-value, planning and risk management that employers value.' },
  { icon: 'ri-folder-chart-line', title: 'Portfolio Evidence', desc: 'Every assignment maps to your real project portfolio — no fake case studies, real deliverables that count.' },
  { icon: 'ri-medal-line', title: 'Certification Pathways', desc: 'Structured progression towards APM PMQ, PMI CAPM, and full chartered status milestones.' },
  { icon: 'ri-user-heart-line', title: 'Dedicated Mentor', desc: 'One-to-one guidance from industry practitioners who have been programme controls directors.' },
  { icon: 'ri-calendar-event-line', title: 'Master Class Events', desc: 'Exclusive London in-person sessions with industry leaders, live case studies, and peer networking.' },
  { icon: 'ri-global-line', title: 'Flexible Live Delivery', desc: 'Study around your work schedule with interactive live online sessions, not pre-recorded videos.' },
];

function BenefitCard({ item, i }: { item: typeof benefits[0]; i: number }) {
  const { ref, visible } = useReveal(0.1);
  return (
    <div
      ref={ref}
      className="group p-6 rounded-2xl bg-white border border-background-200/60 hover:border-highlight-300 hover:shadow-lg transition-all duration-400"
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 600ms cubic-bezier(0.22,1,0.36,1) ${i * 80}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${i * 80}ms, border-color 300ms, box-shadow 300ms` }}
    >
      <div className="w-12 h-12 rounded-xl bg-highlight-50 flex items-center justify-center mb-4 group-hover:bg-highlight-500 transition-all duration-300">
        <i className={`${item.icon} text-xl text-highlight-600 group-hover:text-white transition-colors duration-300`} />
      </div>
      <h4 className="text-sm font-semibold text-foreground-900 mb-1.5">{item.title}</h4>
      <p className="text-xs text-foreground-600 leading-relaxed">{item.desc}</p>
    </div>
  );
}


export default function Benefits() {
  const benefitsRef = useReveal(0.05);
  return (
<div className="bg-background-50 py-16 md:py-24">
          <div className="container-site" ref={benefitsRef.ref}>
            <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-label font-semibold uppercase tracking-wider border border-highlight-500/40 text-highlight-700 mb-5">
                <i className="ri-star-line text-sm" />
                What You Will Gain
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground-950 leading-tight">
                Skills That Employers Value & Promote
              </h2>
              <p className="mt-3 text-sm md:text-base text-foreground-600 leading-relaxed">
                Six pillars of the programme — everything designed around real workplace impact, not theory.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {benefits.map((item, i) => (
                <BenefitCard key={item.title} item={item} i={i} />
              ))}
            </div>
          </div>
        </div>
  );
}
