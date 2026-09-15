import PageIntroduction from '../../components/PageIntroduction';
import { pages } from '../../LegalPageData';

/** Section: Inclusive access. */
export default function InclusiveAccess() {
  return <PageIntroduction content={pages.accessibility} />;
}
