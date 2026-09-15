import InclusiveAccess from '../accessibility/components/InclusiveAccess';
import WebsitePreferences from '../cookies/components/WebsitePreferences';
import type { LegalPageKey } from '../LegalPageData';
import YourInformation from '../privacy/components/YourInformation';
import WebsiteUse from '../terms/components/WebsiteUse';

const introductions = { privacy: YourInformation, terms: WebsiteUse, accessibility: InclusiveAccess, cookies: WebsitePreferences };

export default function PolicyIntroduction({ page }: { page: LegalPageKey }) {
  const Introduction = introductions[page];
  return <Introduction />;
}
