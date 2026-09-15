import PolicyClause from '../../components/PolicyClause';
import { pages } from '../../LegalPageData';

/** Essential storage. Edit this policy's copy in LegalPageData.ts. */
export default function EssentialStorage() {
  return <PolicyClause section={pages.cookies.sections[0]} index={0} />;
}
