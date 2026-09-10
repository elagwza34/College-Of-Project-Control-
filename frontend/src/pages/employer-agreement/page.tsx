import Footer from '@/components/feature/Footer';

import Hero from './components/Hero';
import Form from './components/Form';

export default function EmployerAgreementPage() {
  return (
    <div className="min-h-screen bg-background-50">
      <main>
        <Hero />
        <Form />
      </main>
      <Footer />
    </div>
  );
}
