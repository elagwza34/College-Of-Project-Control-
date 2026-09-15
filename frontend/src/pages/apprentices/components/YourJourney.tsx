import { useReveal } from '@/hooks/useReveal';

const journey = [
  { icon: 'ri-user-add-line', title: 'Apply & Enrol', desc: 'Complete your eligibility check and select the right pathway for your career.' },
  { icon: 'ri-book-open-line', title: 'Learn & Practice', desc: 'Live online sessions plus workplace assignments that build real capability.' },
  { icon: 'ri-bar-chart-grouped-line', title: 'Apply at Work', desc: 'Every module maps directly to real project deliverables and evidence.' },
  { icon: 'ri-medal-line', title: 'Certify', desc: 'Progress towards APM, PMI and professional accreditation milestones.' },
  { icon: 'ri-rocket-line', title: 'Advance', desc: 'Step into senior cost, planning, PMO, or programme controls roles.' },
];

function JourneyStep({ step, i, total }: { step: typeof journey[0]; i: number; total: number }) {
  const { ref, visible } = useReveal(0.1);
  return (
    <div ref={ref} className="relative flex flex-col items-center text-center group">
      {/* Connector line */}
      {i < total - 1 && (
        <div className="absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 hidden lg:block" style={{ background: `linear-gradient(to right, oklch(var(--highlight-300) / 0.6), oklch(var(--highlight-300) / 0.1))` }} />
      )}
      <div
        className="relative z-10 w-16 h-16 rounded-2xl bg-white border-2 border-highlight-200 flex items-center justify-center mb-4 group-hover:border-highlight-500 group-hover:bg-highlight-500 group-hover:text-white transition-all duration-400"
        style={{ opacity: visible ? 1 : 0, transform: visible ? 'scale(1)' : 'scale(0.8)', transition: `opacity 500ms cubic-bezier(0.22,1,0.36,1) ${i * 120}ms, transform 500ms cubic-bezier(0.22,1,0.36,1) ${i * 120}ms, border-color 300ms, background-color 300ms, color 300ms` }}
      >
        <i className={`${step.icon} text-2xl text-highlight-600 group-hover:text-white transition-colors duration-300`} />
        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-highlight-500 text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
      </div>
      <h4 className="text-sm font-semibold text-foreground-900 mb-1">{step.title}</h4>
      <p className="text-xs text-foreground-600 leading-relaxed max-w-[180px]">{step.desc}</p>
    </div>
  );
}


export default function YourJourney() {
  const journeyRef = useReveal(0.05);
  return (
<div className="bg-white py-16 md:py-24 border-b border-background-200/40">
          <div className="container-site" ref={journeyRef.ref}>
            <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-label font-semibold uppercase tracking-wider border border-highlight-500/40 text-highlight-700 mb-5">
                <i className="ri-route-line text-sm" />
                Your Journey
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground-950 leading-tight">
                From Application to Career Progression
              </h2>
              <p className="mt-3 text-sm md:text-base text-foreground-600 leading-relaxed">
                A clear five-step pathway — every stage designed to build your confidence, capability, and career.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-6">
              {journey.map((step, i) => (
                <JourneyStep key={step.title} step={step} i={i} total={journey.length} />
              ))}
            </div>
          </div>
        </div>
  );
}
