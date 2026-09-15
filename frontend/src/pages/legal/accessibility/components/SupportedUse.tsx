import PolicyClause from '../../components/PolicyClause';
import { pages } from '../../LegalPageData';

/** Supported use. Edit this policy's copy in LegalPageData.ts. */
export default function SupportedUse() {
  return <PolicyClause section={pages.accessibility.sections[1]} index={1} />;
}
