import Footer from '@/components/feature/Footer';
import BeforeYouReachOut from "./components/BeforeYouReachOut";
import ContactInfoStrip from './components/ContactInfoStrip';
import FindYourNextStep from "./components/FindYourNextStep";
import GetInTouch from "./components/GetInTouch";
export default function ContactPage() {
  return (<div className="min-h-screen bg-background-50">
    <main>
      <GetInTouch />

      <ContactInfoStrip />

      <FindYourNextStep />

      <BeforeYouReachOut />
    </main>
    <Footer />
  </div>);
}
