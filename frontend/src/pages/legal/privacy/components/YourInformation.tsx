import PageIntroduction from '../../components/PageIntroduction';
import { pages } from '../../LegalPageData';

/** Section: Your information. */
export default function YourInformation() {
  return <PageIntroduction content={pages.privacy} />;
}
