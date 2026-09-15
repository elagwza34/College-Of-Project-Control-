import PolicyClause from '../../components/PolicyClause';
import { pages } from '../../LegalPageData';

/** Your choices. Edit this policy's copy in LegalPageData.ts. */
export default function YourChoices() {
  return <PolicyClause section={pages.privacy.sections[4]} index={4} />;
}
