import { useState, useRef, useEffect } from 'react';

const steps = [
  { number: '01', title: 'Your Role', desc: 'What are you responsible for today?', icon: 'ri-user-line' },
  { number: '02', title: 'Your Capability', desc: 'What do you need to strengthen?', icon: 'ri-bar-chart-line' },
  { number: '03', title: 'Your Level', desc: 'How advanced does the development need to be?', icon: 'ri-medal-line' },
  { number: '04', title: 'Your Format', desc: 'Do you need a complete programme or targeted modules?', icon: 'ri-list-check-2' },
  { number: '05', title: 'Your Direction', desc: 'What professional responsibility do you want to build towards?', icon: 'ri-road-map-line' },
];

export default function HowToChoose() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="how-to-choose" className="py-16 md:py-20 bg-background-50 relative overflow-hidden">
      <div className="container-site relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 reveal-blur-in is-visible">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-label font-semibold uppercase tracking-wider border border-highlight-500/40 text-highlight-600 mb-4">
            Find Your Fit
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground-950 leading-tight">
            Start with the work you are responsible for
          </h2>
        </div>

        <div ref={ref} className="relative">
          <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-background-300"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-4">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className="relative flex flex-col items-center text-center"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 450ms cubic-bezier(0.22, 1, 0.36, 1) ${150 + i * 80}ms, transform 450ms cubic-bezier(0.22, 1, 0.36, 1) ${150 + i * 80}ms`,
                }}
              >
                <div className="relative z-10 w-16 h-16 flex items-center justify-center rounded-full bg-white border-2 border-primary-300 mb-4 lift-hover">
                  <i className={`${step.icon} text-primary-500 text-xl`}></i>
                </div>
                <span className="text-xs font-label font-bold text-primary-400 mb-1">{step.number}</span>
                <h3 className="text-sm font-heading font-bold text-foreground-800 leading-snug max-w-[180px]">{step.title}</h3>
                <p className="text-xs text-foreground-600 leading-snug mt-1.5 max-w-[190px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}