import PolicyClause from '../../components/PolicyClause';
import { pages } from '../../LegalPageData';

/** Managing storage. Edit this policy's copy in LegalPageData.ts. */
export default function ManagingStorage() {
  return <PolicyClause section={pages.cookies.sections[3]} index={3} />;
}
