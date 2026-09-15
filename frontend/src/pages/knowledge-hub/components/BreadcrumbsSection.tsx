import Breadcrumbs from '@/components/feature/Breadcrumbs';

/** Section: Breadcrumbs. */
export default function BreadcrumbsSection() {
  return (
    <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Knowledge Hub' },
          ]}
        />
  );
}
