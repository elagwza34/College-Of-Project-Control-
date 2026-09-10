import PageSectionNav from '@/components/feature/PageSectionNav';

interface RouteNavbarProps {
  pageLabel: string;
  navLinks: { label: string; href: string }[];
}

export default function RouteNavbar({ pageLabel, navLinks }: RouteNavbarProps) {
  return (
    <PageSectionNav
      pageLabel={`${pageLabel} route`}
      links={navLinks}
      ctaHref="/book-a-session"
      ctaLabel="Discuss this route"
    />
  );
}
