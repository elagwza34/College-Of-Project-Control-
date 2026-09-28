import SiteLink from '@/components/base/SiteLink';

interface CaseStudyDetailStatusProps {
  loading?: boolean;
}

export default function CaseStudyDetailStatus({ loading }: CaseStudyDetailStatusProps) {
  if (loading) {
    return (
      <section className="container-site py-40" role="status">
        Loading case study...
      </section>
    );
  }

  return (
    <section className="container-site py-40">
      <h1 className="font-heading text-4xl font-bold text-foreground-950">Case study not found</h1>
      <SiteLink href="/case-studies" className="btn-primary mt-6 inline-flex min-h-12 items-center px-5 text-sm font-bold">
        Back to case studies
      </SiteLink>
    </section>
  );
}
