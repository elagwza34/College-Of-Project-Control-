import SiteLink from '@/components/base/SiteLink';
import EditorialPageHero from '@/components/feature/EditorialPageHero';

export default function GovernanceBoard() {
  return (
<EditorialPageHero
          eyebrow="Governance Board"
          icon="ri-government-line"
          title={<>Independent insight. <span className="text-signal-400">Stronger governance.</span></>}
          description="Experienced leaders contribute independent expertise, strategic perspective and oversight to support the College’s long-term direction."
          actions={<>
                <SiteLink href="#eoi-form" className="btn-primary inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold transition-colors">
                  Submit Expression of Interest
                  <i className="ri-arrow-right-line" aria-hidden="true" />
                </SiteLink>
                <SiteLink href="#about" className="inline-flex items-center justify-center rounded-lg border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                  Learn About the Board
                </SiteLink>
          </>}
        />
  );
}
