import PolicyClause from '../../components/PolicyClause';
import { pages } from '../../LegalPageData';

/** Programme reviews. Edit this policy's copy in LegalPageData.ts. */
export default function ProgrammeReviews() {
  return <PolicyClause section={pages.privacy.sections[2]} index={2} />;
}
