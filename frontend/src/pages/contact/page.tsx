import Footer from '@/components/feature/Footer';


import Hero from './components/Hero';
import ContactInfoStrip from './components/ContactInfoStrip';
import EnquiryForm from './components/EnquiryForm';
import Faq from './components/Faq';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background-50">
      <main>
        <Hero />

        <ContactInfoStrip />

        <EnquiryForm />

        <Faq />
      </main>
      <Footer />
    </div>
  );
}
