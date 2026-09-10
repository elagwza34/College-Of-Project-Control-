import SiteLink from '@/components/base/SiteLink';
import { useState, useEffect } from 'react';
export default function StickyCta() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const update = () => setVisible(window.scrollY > 600);
    update(); window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  if (!visible) return null;
  return <aside id="sticky-actions" aria-label="Next steps" className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-secondary-900 p-3">
    <div className="container-site flex flex-wrap items-center justify-center gap-3">
      <SiteLink href="/book-a-session" className="btn-primary px-5 py-3 text-sm">Request a consultation</SiteLink>
      <SiteLink href="/apprenticeship-eligibility-checker" className="px-3 py-2 text-sm text-white underline underline-offset-4">Check eligibility</SiteLink>
    </div>
  </aside>;
}
