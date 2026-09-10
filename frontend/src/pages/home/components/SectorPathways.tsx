import useCollection from '@/hooks/useCollection';
import CollectionState from '@/components/base/CollectionState';
import SiteLink from '@/components/base/SiteLink';
import { useState, useRef, useEffect } from 'react';
import { fetchSectors, type Sector } from '@/services/sectorsApi';

function SectorCard({ sector, visible, delay }: { sector: Sector; visible: boolean; delay: number }) {
  return (
    <SiteLink
      href={sector.linkUrl || '/programmes'}
      className="group relative flex h-full min-h-[360px] md:min-h-[400px] flex-col justify-end overflow-hidden rounded-xl border border-background-200/80 bg-primary-950 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary-400 card-scale-hover"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1) translateY(0)' : 'scale(0.94) translateY(12px)',
        transition: `opacity 450ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 450ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
      }}
      data-gtm-event="explore_sector_development"
      data-gtm-location="sector-pathways"
    >
      {sector.imageUrl ? (
        <img loading="lazy" decoding="async"
          src={sector.imageUrl}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700 to-primary-900" />
      )}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(to top, #001714 0%, rgba(0, 23, 20, 0.96) 38%, rgba(0, 23, 20, 0.78) 62%, rgba(0, 23, 20, 0.12) 100%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        {sector.icon && (
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-white/25 bg-white/15 backdrop-blur-sm">
            <i className={`${sector.icon} text-xl text-white`}></i>
          </div>
        )}
        <h3 className="text-2xl font-heading font-bold leading-tight text-white">
          {sector.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/95">
          {sector.description}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-signal-300">
          Explore this sector
          <i className="ri-arrow-right-line" />
        </span>
      </div>
    </SiteLink>
  );
}

export default function SectorPathways() {
  const [visible, setVisible] = useState(false);
  const { items: sectors, loading, error, retry } = useCollection(fetchSectors);
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
  }, [sectors]);

  if (loading || error || sectors.length === 0) return <CollectionState id="sectors" label="Sectors" loading={loading} error={error} retry={retry} />;

  return (
    <section id="sectors" className="py-16 md:py-20 relative overflow-hidden" style={{ backgroundColor: '#F5F8F9' }}>
      {/* Faint glow */}
      <div className="absolute top-1/3 right-[15%] w-[400px] h-[400px] rounded-full pointer-events-none lavender-glow" style={{ background: 'radial-gradient(circle, oklch(var(--primary-300) / 0.05), transparent 70%)', animationDelay: '-4s' }}></div>

      {/* Decorative curved lines */}
      <svg className="absolute top-0 right-0 w-[400px] h-[400px] opacity-[0.05] pointer-events-none" viewBox="0 0 400 400" fill="none">
        <circle cx="400" cy="0" r="320" stroke="oklch(var(--primary-400))" strokeWidth="1.5" />
        <circle cx="400" cy="0" r="240" stroke="oklch(var(--primary-400))" strokeWidth="1" />
      </svg>
      <svg className="absolute bottom-0 left-0 w-[350px] h-[350px] opacity-[0.04] pointer-events-none" viewBox="0 0 350 350" fill="none">
        <circle cx="0" cy="350" r="260" stroke="oklch(var(--primary-400))" strokeWidth="1.5" />
        <circle cx="0" cy="350" r="180" stroke="oklch(var(--primary-400))" strokeWidth="1" />
      </svg>

      <div className="container-site relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14 reveal-blur-in is-visible">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-label font-semibold uppercase tracking-[0.15em] border border-highlight-300/50 text-highlight-600 mb-6">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z" fill="currentColor" />
            </svg>
            Project-Driven Sectors
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z" fill="currentColor" />
            </svg>
          </span>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground-900 leading-tight">
            Built for complex project environments
          </h2>
          <p className="mt-4 text-sm md:text-sm text-foreground-600 leading-relaxed max-w-2xl mx-auto">
            Apply specialist Project Controls capability where planning, cost, risk, governance and delivery performance matter most.
          </p>
        </div>

        <div
          ref={ref}
          className={
            sectors.length === 1
              ? 'flex justify-center'
              : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5'
          }
        >
          {sectors.map((sector, i) => (
            <div key={sector.id} className={sectors.length === 1 ? 'w-full max-w-sm' : undefined}>
              <SectorCard sector={sector} visible={visible} delay={i * 70} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
