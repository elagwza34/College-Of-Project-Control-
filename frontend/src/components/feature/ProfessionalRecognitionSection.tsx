import { useLayoutEffect, useRef, useState } from 'react';
import useCollection from '@/hooks/useCollection';
import CollectionState from '@/components/base/CollectionState';
import SiteLink from '@/components/base/SiteLink';
import { fetchProfessionalCredentials } from '@/services/professionalCredentialsApi';

const DESKTOP_BREAKPOINT = 1024;
const ITEMS_PER_VIEW_DESKTOP = 5;
const ITEMS_PER_VIEW_MOBILE = 3;

export default function ProfessionalRecognitionSection() {
  const { items, loading, error, retry } = useCollection(fetchProfessionalCredentials);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(0);

  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const update = () => {
      const perView = window.innerWidth >= DESKTOP_BREAKPOINT ? ITEMS_PER_VIEW_DESKTOP : ITEMS_PER_VIEW_MOBILE;
      setItemWidth(el.clientWidth / perView);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener('resize', update);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  if (loading || error || !items.length) return <CollectionState label="Professional recognition records" loading={loading} error={error} retry={retry} />;

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container-site">
        <h2 className="text-3xl">Professional development and recognition</h2>
        <p className="mt-4 max-w-3xl text-foreground-600">Programme learning and support are distinct from external awards. Membership, examinations and Chartered status remain subject to each professional body's eligibility and assessment.</p>
        <div
          ref={viewportRef}
          className="pause-on-hover relative mt-10 overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent, #000 4%, #000 96%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, #000 4%, #000 96%, transparent)',
          }}
        >
          <div className="animate-marquee flex w-max" style={{ animationDuration: `${items.length * 4}s` }}>
            {[0, 1].map(group => (
              <div className="flex" key={group} aria-hidden={group === 1 ? true : undefined}>
                {items.map(item => {
                  if (!item.imageUrl) return null;
                  const logo = (
                    <img
                      src={item.imageUrl}
                      alt={group === 0 ? item.name || '' : ''}
                      loading="lazy"
                      decoding="async"
                      width={240}
                      height={140}
                      className="h-32 w-full object-contain"
                    />
                  );
                  return (
                    <div
                      key={`${item.id}-${group}`}
                      className="flex shrink-0 items-center justify-center px-4"
                      style={{ width: itemWidth ? `${itemWidth}px` : undefined }}
                    >
                      {group === 0 && item.linkUrl ? <SiteLink href={item.linkUrl} aria-label={item.name || undefined}>{logo}</SiteLink> : logo}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
