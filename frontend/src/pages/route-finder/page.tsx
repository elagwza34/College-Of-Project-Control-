import Footer from '@/components/feature/Footer';
import RouteFinder from './components/RouteFinder';

export default function RouteFinderPage() {
  return (
    <div className="min-h-screen bg-background-50">
      <main>
        <RouteFinder />
      </main>
      <Footer />
    </div>
  );
}
