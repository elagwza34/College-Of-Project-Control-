import { useReveal } from '@/hooks/useReveal';

import SiteLink from '@/components/base/SiteLink';

export default function ReadyToAdvanceYourCareerInProjectControls() {
  const cta = useReveal(0.1);
  return (
<div className="bg-highlight-500 py-16 md:py-24 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-8" style={{ background: 'radial-gradient(circle, oklch(var(--primary-500) / 0.25), transparent 70%)', transform: 'translate(30%, -30%)' }} />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-6" style={{ background: 'radial-gradient(circle, white, transparent 70%)', transform: 'translate(-20%, 30%)' }} />

          <div className="container-site relative z-10 text-center" ref={cta.ref}>
            <div style={{ opacity: cta.visible ? 1 : 0, transform: cta.visible ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1)' }}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-primary-950 leading-tight max-w-3xl mx-auto">
                Ready to advance your career in project controls?
              </h2>
              <p className="mt-5 text-base md:text-lg text-primary-800/60 max-w-xl mx-auto leading-relaxed">
                Check your eligibility, explore the right pathway, and start your application — all with no commitment and no cost to you.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <SiteLink href="/contact" className="btn-primary inline-flex items-center gap-3 px-8 py-4 font-semibold text-sm cursor-pointer transition-all duration-300 whitespace-nowrap lift-hover">
                  <i className="ri-rocket-line text-lg" />
                  Start your application
                </SiteLink>
                <SiteLink href="mailto:info@collegeofprojectcontrols.com" className="cta-button inline-flex items-center gap-2 px-6 py-4 border-2 border-primary-950/30 text-primary-950 font-semibold text-sm rounded-xl cursor-pointer hover:bg-primary-950/10 hover:border-primary-950/50 transition-all duration-300 whitespace-nowrap">
                  <i className="ri-mail-line text-sm" />
                  Email the College
                </SiteLink>
              </div>
              <p className="mt-5 text-xs text-primary-800/40 max-w-md mx-auto">
                Response within 24 hours. Free eligibility assessment included. No commitment.
              </p>
            </div>
          </div>
        </div>
  );
}
