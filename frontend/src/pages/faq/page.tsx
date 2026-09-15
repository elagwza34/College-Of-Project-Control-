import Footer from '@/components/feature/Footer';
import BrowseByTopic from "./components/BrowseByTopic";
import HelpCentre from './components/HelpCentre';
import NeedASpecificAnswer from "./components/NeedASpecificAnswer";
export default function FaqPage() {
  return (<div className="min-h-screen bg-background-50">
    <main>
      <HelpCentre />

      <BrowseByTopic />

      <NeedASpecificAnswer />
    </main>
    <Footer />
  </div>);
}
