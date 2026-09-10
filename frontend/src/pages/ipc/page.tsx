import Footer from '@/components/feature/Footer';
import SchemaOrg, { breadcrumbListSchema, organizationSchema } from '@/components/feature/SchemaOrg';

import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import WhyItMatters from './components/WhyItMatters';
import Framework from './components/Framework';
import Journey from './components/Journey';
import Membership from './components/Membership';
import Faq from './components/Faq';
import ClosingCta from './components/ClosingCta';

export default function IpcPage() {
  return (
    <>
      <SchemaOrg type="Organization" data={organizationSchema()} />
      <SchemaOrg type="WebPage" data={breadcrumbListSchema([{ name: 'Home', item: '/' }, { name: 'Institute of Project Controls' }])} />
      <div className="min-h-screen bg-background-50">
        <main>
          <Hero />

          <TrustBar />

          <WhyItMatters />

          <Framework />

          <Journey />

          <Membership />

          <Faq />

          <ClosingCta />
        </main>
        <Footer />
      </div>
    </>
  );
}
