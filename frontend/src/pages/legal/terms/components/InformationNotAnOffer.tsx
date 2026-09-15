import PolicyClause from '../../components/PolicyClause';
import { pages } from '../../LegalPageData';

/** Information, not an offer. Edit this policy's copy in LegalPageData.ts. */
export default function InformationNotAnOffer() {
  return <PolicyClause section={pages.terms.sections[0]} index={0} />;
}
