import PageIntroduction from '../../components/PageIntroduction';
import { pages } from '../../LegalPageData';

/** Section: Website use. */
export default function WebsiteUse() {
  return <PageIntroduction content={pages.terms} />;
}
