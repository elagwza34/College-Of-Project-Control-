import SiteLink from '@/components/base/SiteLink';
import { useEffect,useState } from 'react';

export default function StickyProgrammeCta() {
  const [stickyVisible, setStickyVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 800);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
<div
          data-programme-sticky
          inert={!stickyVisible}
          className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ${
            stickyVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
          }`}
        >
          <div className="bg-canvas/95 backdrop-blur-md border-t border-ink/10 py-3 px-4">
            <div className="container-site flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <SiteLink
                href="/apprenticeship-eligibility-checker"
                className="cta-button w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-label font-semibold text-white bg-secondary-500 rounded-full hover:bg-primary-500 transition-colors whitespace-nowrap"
              >
                <i className="ri-shield-check-line"></i>
                Check Eligibility
              </SiteLink>
              <SiteLink
                href="/commercial-project-controls-route"
                className="w-full sm:w-auto min-h-[3.25rem] inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-label font-semibold text-primary-500 border border-primary-500 rounded-full bg-transparent hover:bg-primary-500/5 transition-colors whitespace-nowrap"
              >
                Commercial PMO
                <i className="ri-arrow-right-line" aria-hidden="true"></i>
              </SiteLink>
            </div>
          </div>
        </div>
  );
}
