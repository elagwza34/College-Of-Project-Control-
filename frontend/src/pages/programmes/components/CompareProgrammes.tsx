import SiteLink from '@/components/base/SiteLink';
import { useEffect,useRef,useState } from 'react';

export default function CompareProgrammes() {
  const [highlightedRow, setHighlightedRow] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const rows = [
    {
      id: 'focus',
      label: 'Primary Focus',
      pcp: 'Advanced Project Controls',
      apm: 'Project Management & Delivery',
      pmo: 'PMO Governance & Strategic Control',
      icon: 'ri-focus-3-line',
    },
    {
      id: 'bestFit',
      label: 'Best Suited To',
      pcp: 'Project Controls professionals, planners, schedulers, cost professionals, PMO and experienced project professionals.',
      apm: 'Professionals developing broader project-management and delivery responsibility.',
      pmo: 'Experienced PMO, Project Controls and project professionals developing strategic PMO capability.',
      icon: 'ri-user-star-line',
    },
    {
      id: 'capability',
      label: 'Core Capability',
      pcp: 'Planning, scheduling, cost, EVM, risk and controls.',
      apm: 'Governance, scope, schedule, cost, risk, stakeholders and delivery.',
      pmo: 'Governance, controls, assurance, risk, quality and reporting.',
      icon: 'ri-bar-chart-line',
    },
    {
      id: 'level',
      label: 'Level',
      pcp: 'Level 6',
      apm: 'Level 4',
      pmo: 'Level 6',
      icon: 'ri-medal-line',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-canvas relative overflow-hidden">
      <div className="container-site relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12 reveal-blur-in is-visible">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-label font-semibold uppercase tracking-wider border border-highlight-500/40 text-highlight-600 mb-4">
            Compare Programmes
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground-950 leading-tight">
            Which programme best fits your responsibilities?
          </h2>
          <p className="mt-3 text-sm md:text-base text-foreground-600 leading-relaxed">
            Compare each programme against the responsibilities it is best suited to.
          </p>
        </div>

        <div ref={ref} className="overflow-x-auto rounded-xl border border-background-300 bg-white">
          <table className="w-full min-w-[720px]">
            <thead>
              <tr className="bg-primary-500 border-b border-background-50/20">
                <th className="text-left px-4 py-4 text-xs font-label font-semibold uppercase tracking-wider text-background-50 w-44">
                  Programme
                </th>
                <th className="text-left px-4 py-4 text-xs font-label font-semibold uppercase tracking-wider text-background-50">
                  <span className="inline-flex items-center gap-1.5">
                    <i className="ri-fire-line text-xs text-highlight-300"></i>
                    Project Controls Professional Level 6
                  </span>
                </th>
                <th className="text-left px-4 py-4 text-xs font-label font-semibold uppercase tracking-wider text-background-50">
                  Associate Project Manager Level 4
                </th>
                <th className="text-left px-4 py-4 text-xs font-label font-semibold uppercase tracking-wider text-background-50">
                  Certified PMO Professional Level 6
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className={`border-b border-background-200 transition-colors duration-200 ${
                    highlightedRow === row.id ? 'bg-primary-50' : 'bg-white'
                  }`}
                  onMouseEnter={() => setHighlightedRow(row.id)}
                  onMouseLeave={() => setHighlightedRow(null)}
                >
                  <td className="px-4 py-4 align-top">
                    <div className="flex items-center gap-2 text-sm font-label font-semibold text-foreground-700">
                      <i className={`${row.icon} text-foreground-400 text-sm`}></i>
                      {row.label}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-highlight-700 font-medium align-top">{row.pcp}</td>
                  <td className="px-4 py-4 text-sm text-foreground-600 align-top">{row.apm}</td>
                  <td className="px-4 py-4 text-sm text-foreground-600 align-top">{row.pmo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <SiteLink
            href="#how-to-choose"
            className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 font-semibold text-sm cursor-pointer transition-all duration-300 whitespace-nowrap lift-hover"
          >
            Help Me Choose
            <i className="ri-arrow-right-line text-sm"></i>
          </SiteLink>
        </div>
      </div>
    </section>
  );
}