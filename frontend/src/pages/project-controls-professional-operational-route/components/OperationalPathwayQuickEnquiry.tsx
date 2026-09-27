import SiteLink from '@/components/base/SiteLink';
import { useEffect,useState } from 'react';

export default function OperationalPathwayQuickEnquiry() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const update = () => setVisible(window.scrollY > 600);
    update(); window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  if (!visible) return null;
  return <aside aria-label="Operational Pathway quick enquiry" className="fixed inset-x-0 bottom-0 z-40 border-t border-white/15 bg-primary-950 px-4 py-3 text-white"><div className="container-site flex flex-wrap items-center justify-between gap-3"><div className="hidden lg:block"><strong className="block text-sm">Operational Pathway enquiries</strong><p className="mt-1 text-xs text-white/75">Review your role, funding and pathway suitability with the admissions team.</p></div><div className="flex w-full items-center justify-center gap-4 lg:w-auto"><SiteLink href="#operational-structure" className="text-sm text-white underline underline-offset-4">View structure</SiteLink><SiteLink href="/book-a-session" className="btn-primary inline-flex min-h-11 items-center justify-center px-4 py-2 text-center text-sm font-bold">Request a consultation</SiteLink></div></div></aside>;
}
