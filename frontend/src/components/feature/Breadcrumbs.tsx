import SiteLink from '@/components/base/SiteLink';
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const schemaItems = items.map((item, idx) => ({
    '@type': 'ListItem' as const,
    position: idx + 1,
    item: item.href
      ? { '@id': `https://collegeofprojectcontrols.com${item.href}`, name: item.label }
      : { name: item.label },
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: schemaItems,
          }),
        }}
      />
      <nav aria-label="Breadcrumb" className="py-3 border-b border-background-200/70 bg-background-50">
        <div className="container-site">
          <ol className="flex flex-wrap items-center gap-1 text-xs text-foreground-600">
            {items.map((item, idx) => {
              const isLast = idx === items.length - 1;
              return (
                <li key={idx} className="flex items-center gap-1">
                  {idx > 0 && (
                    <i className="ri-arrow-right-s-line text-foreground-300 text-xs"></i>
                  )}
                  {!isLast && item.href ? (
                    <SiteLink
                      href={item.href}
                      className="hover:text-primary-600 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {item.label}
                    </SiteLink>
                  ) : (
                    <span className={isLast ? 'text-foreground-800 font-medium whitespace-nowrap' : 'whitespace-nowrap'}>
                      {item.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
}