import PolicyClause from '../../components/PolicyClause';
import { pages } from '../../LegalPageData';

/** Information we collect. Edit this policy's copy in LegalPageData.ts. */
export default function InformationWeCollect() {
  return <PolicyClause section={pages.privacy.sections[0]} index={0} />;
}
