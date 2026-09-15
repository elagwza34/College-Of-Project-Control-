import Footer from '@/components/feature/Footer';
import AboutCPCM from "./components/AboutCPCM";
import HowWeWork from "./components/HowWeWork";
import OurPointOfView from "./components/OurPointOfView";
import OurSpecialistFocus from "./components/OurSpecialistFocus";
import SpecialistCapabilityForProjectDrivenOrganisations from "./components/SpecialistCapabilityForProjectDrivenOrganisations";
import StartWithTheRightQuestion from "./components/StartWithTheRightQuestion";
import WhoCPCMSupports from "./components/WhoCPCMSupports";
import WhoWeAre from "./components/WhoWeAre";
export default function AboutPage() {
  return (<div className="min-h-screen bg-background-50">
    <main>
      <AboutCPCM />

      <SpecialistCapabilityForProjectDrivenOrganisations />

      <WhoWeAre />

      <OurPointOfView />

      <OurSpecialistFocus />

      <HowWeWork />

      <WhoCPCMSupports />

      <StartWithTheRightQuestion />
    </main>
    <Footer />
  </div>);
}
