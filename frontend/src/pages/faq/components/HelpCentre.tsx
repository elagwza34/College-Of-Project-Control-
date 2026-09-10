import EditorialPageHero from '@/components/feature/EditorialPageHero';

export default function HelpCentre() {
  return (
    <EditorialPageHero eyebrow="Help Centre" icon="ri-question-answer-line" title={<>Frequently asked <span className="text-signal-400">questions</span></>} description="Clear answers about the College, programmes, apprenticeships, funding, professional recognition and employer development." />
  );
}
