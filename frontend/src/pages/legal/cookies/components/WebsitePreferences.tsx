import PageIntroduction from '../../components/PageIntroduction';
import { pages } from '../../LegalPageData';

/** Section: Website preferences. */
export default function WebsitePreferences() {
  return <PageIntroduction content={pages.cookies} />;
}
