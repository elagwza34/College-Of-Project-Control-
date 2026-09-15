import PolicyClause from '../../components/PolicyClause';
import { pages } from '../../LegalPageData';

/** Third-party services. Edit this policy's copy in LegalPageData.ts. */
export default function ThirdPartyServices() {
  return <PolicyClause section={pages.cookies.sections[2]} index={2} />;
}
