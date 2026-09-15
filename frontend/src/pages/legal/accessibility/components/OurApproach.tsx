import PolicyClause from '../../components/PolicyClause';
import { pages } from '../../LegalPageData';

/** Our approach. Edit this policy's copy in LegalPageData.ts. */
export default function OurApproach() {
  return <PolicyClause section={pages.accessibility.sections[0]} index={0} />;
}
