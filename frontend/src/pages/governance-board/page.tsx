import Footer from '@/components/feature/Footer';
import SchemaOrg, { breadcrumbListSchema } from '@/components/feature/SchemaOrg';

import GovernanceBoard from './components/GovernanceBoard';
import About from './components/About';
import WhyJoin from './components/WhyJoin';
import Responsibilities from './components/Responsibilities';
import Commitment from './components/Commitment';
import Expertise from './components/Expertise';
import Profile from './components/Profile';
import Principles from './components/Principles';
import EoiForm from './components/EoiForm';
import ClosingCta from './components/ClosingCta';

export default function GovernanceBoardPage() {
  return (
    <div className="min-h-screen bg-background-50">
      <SchemaOrg type="WebPage" data={breadcrumbListSchema([{ name: 'Home', item: '/' }, { name: 'Governance Board' }])} />

      <main>
        <GovernanceBoard />

        {/* 2 — About the Governance Board */}
        <About />

        {/* 3 — Why join the Governance Board */}
        <WhyJoin />

        {/* 4 — Board responsibilities */}
        <Responsibilities />

        {/* 5 — Expected commitment */}
        <Commitment />

        {/* 6 — Areas of expertise sought */}
        <Expertise />

        {/* 7 — Ideal candidate profile */}
        <Profile />

        {/* 8 — Governance principles */}
        <Principles />

        {/* 9 — Expression of Interest form */}
        <EoiForm />

        {/* 10 — Final CTA */}
        <ClosingCta />
      </main>

      <Footer />
    </div>
  );
}
