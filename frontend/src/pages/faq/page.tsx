import Footer from '@/components/feature/Footer';
import HelpCentre from './components/HelpCentre';
import CategoryBrowser from './components/CategoryBrowser';
import ClosingCta from './components/ClosingCta';

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-background-50">
      <main>
        <HelpCentre />

        <CategoryBrowser />

        <ClosingCta />
      </main>
      <Footer />
    </div>
  );
}
