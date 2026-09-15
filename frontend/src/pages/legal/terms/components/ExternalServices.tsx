import PolicyClause from '../../components/PolicyClause';
import { pages } from '../../LegalPageData';

/** External services. Edit this policy's copy in LegalPageData.ts. */
export default function ExternalServices() {
  return <PolicyClause section={pages.terms.sections[3]} index={3} />;
}
