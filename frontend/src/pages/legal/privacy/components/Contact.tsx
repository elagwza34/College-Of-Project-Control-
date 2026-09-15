import PolicyClause from '../../components/PolicyClause';
import { pages } from '../../LegalPageData';

/** Contact. Edit this policy's copy in LegalPageData.ts. */
export default function Contact() {
  return <PolicyClause section={pages.privacy.sections[5]} index={5} />;
}
