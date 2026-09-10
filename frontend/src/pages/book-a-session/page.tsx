import Footer from '@/components/feature/Footer';
import EnquiryForm from '@/components/feature/EnquiryForm';
export default function ConsultationPage() {
  return <><main>
    <header className="bg-primary-700 pb-12 pt-36 text-white"><div className="container-site"><h1 className="text-4xl text-white">Request a programme consultation</h1><p className="mt-4 max-w-2xl">Discuss programme fit, employer support and funding options with the College. We will contact you to agree the next step.</p></div></header>
    <section id="consultation" className="container-site max-w-2xl py-12"><EnquiryForm enquiryType="Consultation request" /></section>
  </main><Footer /></>;
}
