import Footer from '@/components/feature/Footer';
import SchemaOrg, { breadcrumbListSchema, organizationSchema } from '@/components/feature/SchemaOrg';
import BuildYourProfessionalDirection from "./components/BuildYourProfessionalDirection";
import IPCExplained from "./components/IPCExplained";
import Membership from './components/Membership';
import ProfessionalJourney from "./components/ProfessionalJourney";
import TheCapabilityFramework from "./components/TheCapabilityFramework";
import TheProfessionalHomeOfProjectControls from "./components/TheProfessionalHomeOfProjectControls";
import TrustBar from './components/TrustBar';
import WhyIPCMatters from "./components/WhyIPCMatters";
export default function IpcPage() {
  return (<>
    <SchemaOrg type="Organization" data={organizationSchema()} />
    <SchemaOrg type="WebPage" data={breadcrumbListSchema([{ name: 'Home', item: '/' }, { name: 'Institute of Project Controls' }])} />
    <div className="min-h-screen bg-background-50">
      <main>
        <TheProfessionalHomeOfProjectControls />

        <TrustBar />

        <WhyIPCMatters />

        <TheCapabilityFramework />

        <ProfessionalJourney />

        <Membership />

        <IPCExplained />

        <BuildYourProfessionalDirection />
      </main>
      <Footer />
    </div>
  </>);
}
