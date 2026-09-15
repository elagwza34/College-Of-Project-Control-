import Footer from '@/components/feature/Footer';
import PolicyContents from './components/PolicyContents';
import PolicyIntroduction from './components/PolicyIntroduction';
import { LegalPageKey } from "./LegalPageData";
export default function LegalPage({ page }: {
  page: LegalPageKey;
}) {
  return (<div className="min-h-screen bg-background-50">
    <main>
      <PolicyIntroduction page={page} />
      <PolicyContents page={page} />
    </main>
    <Footer />
  </div>);
}
