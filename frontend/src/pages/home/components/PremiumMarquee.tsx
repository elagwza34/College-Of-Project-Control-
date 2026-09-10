import type { CSSProperties } from 'react';
import useCollection from '@/hooks/useCollection';
import CollectionState from '@/components/base/CollectionState';
import SiteLink from '@/components/base/SiteLink';
import { fetchPartners } from '@/services/partnersApi';

export default function PartnerLogos() {
  const { items, loading, error, retry } = useCollection(fetchPartners);
  if (loading || error || !items.length) return <CollectionState label="Partner profiles" loading={loading} error={error} retry={retry} />;
  const partners = items.filter((item, index) => item.imageUrl && items.findIndex(other => other.imageUrl === item.imageUrl) === index);
  if (!partners.length) return null;
  // Each half covers a wide viewport even with only one CMS logo.
  const logos = Array.from({ length: Math.ceil(16 / partners.length) }, () => partners).flat();
  return (
    <section className="trusted-logos" aria-label="Trusted by">
      <div className="container-site flex items-center gap-4 sm:gap-8">
        <h2 className="shrink-0 border-r border-black/20 pr-4 text-[10px] font-semibold uppercase tracking-[0.2em] sm:pr-8 sm:text-xs">Trusted by</h2>
        <div className="trusted-logos-window">
          <div className="trusted-logos-track" style={{ '--logos-duration': `${logos.length * 4.5}s` } as CSSProperties}>
            {[0, 1].map(group => (
              <div className="trusted-logos-group" key={group} aria-hidden={group === 1 ? true : undefined}>
                {logos.map((partner, index) => {
                  const duplicate = group === 1 || index >= partners.length;
                  const logo = <img
                    src={partner.imageUrl}
                    alt={duplicate ? '' : partner.name}
                    decoding="async"
                    width={144}
                    height={64}
                    className="trusted-logo-image"
                    onLoad={({ currentTarget: image }) => {
                      // Balance square and wide logos by area while preserving their proportions.
                      const ratio = image.naturalWidth / image.naturalHeight;
                      const width = Math.min(144, 64 * ratio, Math.sqrt(4800 * ratio));
                      image.style.width = `${width}px`;
                      image.style.height = `${width / ratio}px`;
                    }}
                  />;
                  return !duplicate && partner.linkUrl ? (
                    <SiteLink className="trusted-logo" key={`${partner.id}-${index}`} href={partner.linkUrl} aria-label={partner.name}>{logo}</SiteLink>
                  ) : (
                    <span className="trusted-logo" key={`${partner.id}-${index}`} aria-hidden={duplicate ? true : undefined}>{logo}</span>
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
