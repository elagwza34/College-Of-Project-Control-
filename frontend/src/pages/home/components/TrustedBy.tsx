import CollectionState from '@/components/base/CollectionState';
import SiteLink from '@/components/base/SiteLink';
import useCollection from '@/hooks/useCollection';
import { fetchPartners } from '@/services/partnersApi';

const MAX_VISIBLE_LOGOS = 8;

export default function TrustedBy() {
  const { items, loading, error, retry } = useCollection(fetchPartners);
  if (loading || error || !items.length) {
    return <CollectionState label="Organisation profiles" loading={loading} error={error} retry={retry} />;
  }

  const partners = items
    .filter((item, index) => item.imageUrl && items.findIndex((other) => other.imageUrl === item.imageUrl) === index)
    .slice(0, MAX_VISIBLE_LOGOS);

  if (!partners.length) return null;

  return (
    <section className="border-b border-background-200 bg-background-50 py-6" aria-labelledby="organisation-proof-heading">
      <div className="container-site">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
          <h2 id="organisation-proof-heading" className="max-w-xs text-xs font-label font-bold uppercase tracking-[0.18em] text-primary-700">
            Professionals from organisations including
          </h2>
          <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {partners.map((partner) => {
              const logo = (
                <img
                  src={partner.imageUrl}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  width={144}
                  height={64}
                  className="max-h-12 w-full max-w-[132px] object-contain"
                />
              );

              return partner.linkUrl ? (
                <SiteLink
                  key={partner.id}
                  href={partner.linkUrl}
                  className="flex min-h-20 items-center justify-center rounded-lg border border-background-200 bg-white px-4 py-3 transition hover:border-primary-200 hover:shadow-sm"
                  aria-label={partner.name}
                >
                  {logo}
                </SiteLink>
              ) : (
                <div
                  key={partner.id}
                  className="flex min-h-20 items-center justify-center rounded-lg border border-background-200 bg-white px-4 py-3"
                  aria-label={partner.name}
                  role="img"
                >
                  {logo}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
