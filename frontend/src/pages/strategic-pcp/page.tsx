import Footer from '@/components/feature/Footer';
import PageSectionNav from '@/components/feature/PageSectionNav';
import Hero from './components/Hero';
import CreditOverview from './components/CreditOverview';
import Credit12 from './components/Credit12';
import Credit3 from './components/Credit3';
import EvidenceToAction from './components/EvidenceToAction';
import Credit4 from './components/Credit4';
import Credit5 from './components/Credit5';
import Credit6 from './components/Credit6';
import Experts from './components/Experts';
import WhoShouldApply from './components/WhoShouldApply';
import Eligibility from './components/Eligibility';
import Funding from './components/Funding';
import Delivery from './components/Delivery';
import Completion from './components/Completion';
import ProgrammeEssentials from './components/ProgrammeEssentials';
import Apply from './components/Apply';

const sectionLinks = [
  {
    "label": "Credit Overview",
    "href": "#credit-overview"
  },
  {
    "label": "Credit 1 2",
    "href": "#credit-1-2"
  },
  {
    "label": "Credit 3",
    "href": "#credit-3"
  },
  {
    "label": "Credit 4",
    "href": "#credit-4"
  },
  {
    "label": "Credit 5",
    "href": "#credit-5"
  },
  {
    "label": "Credit 6",
    "href": "#credit-6"
  },
  {
    "label": "Experts",
    "href": "#experts"
  },
  {
    "label": "Who Should Apply",
    "href": "#who-should-apply"
  },
  {
    "label": "Eligibility",
    "href": "#eligibility"
  },
  {
    "label": "Funding",
    "href": "#funding"
  },
  {
    "label": "Delivery",
    "href": "#delivery"
  },
  {
    "label": "Completion",
    "href": "#completion"
  },
  {
    "label": "Programme Essentials",
    "href": "#programme-essentials"
  },
  {
    "label": "Apply",
    "href": "#apply"
  }
];

export default function StrategicPathway() {
return <div className="min-h-screen bg-background-50"><main id="hero">
<Hero />
<PageSectionNav pageLabel="Strategic Pathway" links={sectionLinks} />
<CreditOverview />
<Credit12 />
<Credit3 />
<EvidenceToAction />
<Credit4 />
<Credit5 />
<Credit6 />
<Experts />
<WhoShouldApply />
<Eligibility />
<Funding />
<Delivery />
<Completion />
<ProgrammeEssentials />
<Apply />

</main><Footer /></div>;
}
