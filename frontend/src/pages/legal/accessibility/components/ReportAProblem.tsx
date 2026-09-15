import PolicyClause from '../../components/PolicyClause';
import { pages } from '../../LegalPageData';

/** Report a problem. Edit this policy's copy in LegalPageData.ts. */
export default function ReportAProblem() {
  return <PolicyClause section={pages.accessibility.sections[4]} index={4} />;
}
