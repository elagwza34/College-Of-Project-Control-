import PolicyClause from '../../components/PolicyClause';
import { pages } from '../../LegalPageData';

/** Measurement. Edit this policy's copy in LegalPageData.ts. */
export default function Measurement() {
  return <PolicyClause section={pages.cookies.sections[1]} index={1} />;
}
