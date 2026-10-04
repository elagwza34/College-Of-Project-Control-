import SiteLink from '@/components/base/SiteLink';
import { useEffect, useState } from 'react';
import { fetchSectors, type Sector } from '@/services/sectorsApi';

/** Section: Sector directory. */
export default function SectorDirectory() {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    const controller = new AbortController();
    fetchSectors()
      .then((data) => {
        setSectors(data);
        setStatus('ready');
      })
      .catch(() => {
        if (!controller.signal.aborted) setStatus('error');
      });
    return () => controller.abort();
  }, []);

  return (
    <section className="bg-background-50 py-16 md:py-24" aria-labelledby="sector-directory-heading">
      <div className="container-site">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="sector-directory-heading"
            className="font-heading text-3xl font-bold leading-tight text-foreground-950 md:text-4xl"
          >
            Choose your sector
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground-600">
            Every sector route is delivered against the same occupational standard, so the
            qualification is portable between employers and industries.
          </p>
        </div>

        {status === 'loading' && <p className="mt-10 text-center text-foreground-600">Loading sectors...</p>}

        {status === 'error' && (
          <p className="mt-10 text-center text-foreground-600">
            The sector directory could not be loaded. Please use the main navigation or contact us.
          </p>
        )}

        {status === 'ready' && (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {sectors.map((sector) => (
              <article
                key={sector.id}
                className="interactive-surface group relative flex h-full flex-col overflow-hidden rounded-xl border border-background-200 bg-white shadow-sm hover:border-primary-200 hover:shadow-lg focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-300"
              >
                <img
                  src={sector.imageUrl}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-heading text-lg font-bold leading-tight text-foreground-950">
                    <SiteLink
                      href={sector.linkUrl}
                      className="after:absolute after:inset-0 after:content-[''] after:rounded-xl"
                    >
                      {sector.title}
                    </SiteLink>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-600">
                    {sector.description}
                  </p>
                  <span className="interactive-arrow pointer-events-none mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-primary-700 group-hover:text-primary-800">
                    View sector route
                    <i className="ri-arrow-right-line" aria-hidden="true" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
