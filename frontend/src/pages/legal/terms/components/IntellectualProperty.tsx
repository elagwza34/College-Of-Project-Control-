import PolicyClause from '../../components/PolicyClause';
import { pages } from '../../LegalPageData';

/** Intellectual property. Edit this policy's copy in LegalPageData.ts. */
export default function IntellectualProperty() {
  return <PolicyClause section={pages.terms.sections[2]} index={2} />;
}
