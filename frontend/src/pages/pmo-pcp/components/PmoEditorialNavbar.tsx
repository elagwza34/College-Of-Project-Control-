import PageSectionNav from '@/components/feature/PageSectionNav';

const navItems = [
  { label: 'Overview', href: '#hero' },
  { label: 'PMO Journey', href: '#journey' },
  { label: 'Apprenticeship', href: '#apprenticeship' },
  { label: 'APM Recognition', href: '#apm' },
  { label: 'For Employers', href: '#employers' },
  { label: 'FAQs', href: '#faq' },
];

export default function PmoEditorialNavbar() {
  return (
    <PageSectionNav
      pageLabel="PMO & governance"
      links={navItems}
      showCta={false}
    />
  );
}
