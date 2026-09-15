import PolicyClause from '../../components/PolicyClause';
import { pages } from '../../LegalPageData';

/** Contact. Edit this policy's copy in LegalPageData.ts. */
export default function Contact() {
  return <PolicyClause section={pages.cookies.sections[4]} index={4} />;
}
