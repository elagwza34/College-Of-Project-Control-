import PolicyClause from '../../components/PolicyClause';
import { pages } from '../../LegalPageData';

/** Known limitations. Edit this policy's copy in LegalPageData.ts. */
export default function KnownLimitations() {
  return <PolicyClause section={pages.accessibility.sections[2]} index={2} />;
}
