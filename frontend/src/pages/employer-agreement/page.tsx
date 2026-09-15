import Footer from '@/components/feature/Footer';
import EmployerAgreementForm from './components/EmployerAgreementForm';
import ForEmployers from "./components/ForEmployers";
export default function EmployerAgreementPage() {
  return (<div className="min-h-screen bg-background-50">
    <main>
      <ForEmployers />
      <EmployerAgreementForm />
    </main>
    <Footer />
  </div>);
}
