import PolicyClause from '../../components/PolicyClause';
import { pages } from '../../LegalPageData';

/** Sharing and retention. Edit this policy's copy in LegalPageData.ts. */
export default function SharingAndRetention() {
  return <PolicyClause section={pages.privacy.sections[3]} index={3} />;
}
