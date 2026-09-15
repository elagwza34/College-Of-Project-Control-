import SiteLink from '@/components/base/SiteLink';
import { useEffect,useRef,useState } from 'react';

const capabilities = [
  { name: 'Project Management Professional (PMP)', icon: 'ri-briefcase-4-line' },
  { name: 'AI in Project Controls', icon: 'ri-cpu-line' },
  { name: 'Risk Management', icon: 'ri-alert-line' },
  { name: 'Scheduling Professional (SP)', icon: 'ri-calendar-schedule-line' },
  { name: 'Earned Value Management (EVM)', icon: 'ri-line-chart-line' },
  { name: 'Project Planning and Controls (PPC)', icon: 'ri-map-pin-time-line' },
  { name: 'Managing Successful Programmes (MSP)', icon: 'ri-stack-line' },
  { name: 'Management of Portfolios', icon: 'ri-layout-grid-line' },
  { name: 'Project Management Office (PMO)', icon: 'ri-organization-chart' },
];

export default function SpecialistModules() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="specialist-modules" className="relative overflow-hidden bg-white py-16 md:py-24">
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, oklch(var(--background-300) / 0.34) 1px, transparent 0)',
          backgroundSize: '20px 20px',
        }}
      ></div>

      <div className="container-site relative z-10">
        {/* Header */}
        <div className="reveal-blur-in is-visible mx-auto mb-10 max-w-3xl text-center md:mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-label font-semibold uppercase tracking-wider border border-accent-500 text-accent-600 mb-4">
            Specialist Modules
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground-950 leading-tight">
            Choose the specialist capability you want to build
          </h2>
          <p className="mt-3 text-sm md:text-base text-foreground-600 leading-relaxed">
            Explore the core project controls and management modules available through our professional development pathways.
          </p>
        </div>

        {/* Capability grid */}
        <div
          ref={ref}
          className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 550ms cubic-bezier(0.22, 1, 0.36, 1), transform 550ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {capabilities.map((cap, i) => (
            <SiteLink
              key={cap.name}
              href="/contact"
              className="group flex min-h-28 flex-col items-center justify-center rounded-xl border border-background-300/70 bg-white px-5 py-5 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'scale(1) translateY(0)' : 'scale(0.94) translateY(12px)',
                transition: `opacity 450ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 40}ms, transform 450ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 40}ms, box-shadow 300ms, border-color 300ms`,
              }}
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-100 text-primary-600 transition-colors duration-300 group-hover:bg-primary-500 group-hover:text-white">
                <i className={`${cap.icon} text-lg`} aria-hidden="true" />
              </div>
              <span className="text-sm font-semibold leading-snug text-foreground-950">{cap.name}</span>
            </SiteLink>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <SiteLink
            href="/contact"
            className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 font-semibold text-sm cursor-pointer transition-all duration-300 whitespace-nowrap lift-hover"
          >
            Explore Specialist Modules
            <i className="ri-arrow-right-line text-sm"></i>
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
