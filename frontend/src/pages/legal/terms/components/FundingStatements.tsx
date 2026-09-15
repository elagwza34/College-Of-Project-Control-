import PolicyClause from '../../components/PolicyClause';
import { pages } from '../../LegalPageData';

/** Funding statements. Edit this policy's copy in LegalPageData.ts. */
export default function FundingStatements() {
  return <PolicyClause section={pages.terms.sections[1]} index={1} />;
}
