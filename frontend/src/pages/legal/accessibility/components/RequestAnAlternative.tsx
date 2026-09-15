import PolicyClause from '../../components/PolicyClause';
import { pages } from '../../LegalPageData';

/** Request an alternative. Edit this policy's copy in LegalPageData.ts. */
export default function RequestAnAlternative() {
  return <PolicyClause section={pages.accessibility.sections[3]} index={3} />;
}
