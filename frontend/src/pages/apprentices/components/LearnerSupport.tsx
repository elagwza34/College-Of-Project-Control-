import { useReveal } from '@/hooks/useReveal';

const services = [
  { icon: 'ri-award-line', title: 'Certification Ready', desc: 'Structured pathways towards APM, PMI and professional certification — with exam prep built in.' },
  { icon: 'ri-user-voice-line', title: 'One-to-One Tutoring', desc: 'Personal coaching from industry experts actively working in planning, cost, and risk roles today.' },
  { icon: 'ri-calendar-event-line', title: 'Master Classes', desc: 'Exclusive in-person London events: live case studies, peer networking, and senior practitioner insight.' },
  { icon: 'ri-route-line', title: 'Route Guidance', desc: 'Clarify the programme, funding route and professional direction that best fits your current responsibilities.' },
];

export default function LearnerSupport() {
  const cards = useReveal(0.05);
  return (
<div className="bg-background-50 py-16 md:py-24">
          <div className="container-site" ref={cards.ref}>
            <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-label font-semibold uppercase tracking-wider border border-highlight-500/40 text-highlight-700 mb-5">
                <i className="ri-award-line text-sm" />
                Learner Support
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground-950 leading-tight">
                Everything You Need to Succeed
              </h2>
              <p className="mt-3 text-sm md:text-base text-foreground-600 leading-relaxed">
                Four pillars of support — from certification to wellbeing. Every one designed to keep you on track.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {services.map((card, i) => (
                <div
                  key={card.title}
                  className="group p-6 md:p-7 bg-white rounded-2xl border border-background-200/70 hover:border-highlight-300 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
                  style={{
                    opacity: cards.visible ? 1 : 0,
                    transform: cards.visible ? 'translateY(0)' : 'translateY(24px)',
                    transition: `opacity 600ms cubic-bezier(0.22,1,0.36,1) ${200 + i * 120}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${200 + i * 120}ms, border-color 300ms, translateY 300ms`,
                  }}
                >
                  {/* Subtle background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-highlight-500/[0.02] to-highlight-500/[0.06] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-highlight-50 text-highlight-600 mb-5 group-hover:bg-highlight-500 group-hover:text-white transition-all duration-300">
                      <i className={`${card.icon} text-2xl`} />
                    </div>
                    <h3 className="text-base font-semibold text-foreground-900 mb-2">{card.title}</h3>
                    <p className="text-xs text-foreground-600 leading-relaxed mb-4">{card.desc}</p>
                    <div className="w-8 h-0.5 rounded-full bg-highlight-200/50 transition-all duration-300 group-hover:w-12 group-hover:bg-highlight-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
  );
}
