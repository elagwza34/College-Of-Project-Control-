import PolicyClause from '../../components/PolicyClause';
import { pages } from '../../LegalPageData';

/** How we use it. Edit this policy's copy in LegalPageData.ts. */
export default function HowWeUseIt() {
  return <PolicyClause section={pages.privacy.sections[1]} index={1} />;
}
