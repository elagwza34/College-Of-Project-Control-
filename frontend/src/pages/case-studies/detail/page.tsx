import Footer from '@/components/feature/Footer';
import CaseStudyDetailBody from './components/CaseStudyDetailBody';
import CaseStudyDetailHero from './components/CaseStudyDetailHero';
import CaseStudyDetailStatus from './components/CaseStudyDetailStatus';
import { fetchCaseStudy, type CaseStudyDetail } from '@/services/caseStudiesApi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function CaseStudyDetailPage() {
  const { slug = '' } = useParams();
  const [item, setItem] = useState<CaseStudyDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    fetchCaseStudy(slug, controller.signal)
      .then((result) => {
        if (!controller.signal.aborted) setItem(result);
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [slug]);

  return (
    <div className="min-h-screen bg-background-50">
      <main>
        {loading ? (
          <CaseStudyDetailStatus loading />
        ) : error || !item ? (
          <CaseStudyDetailStatus />
        ) : (
          <>
            <CaseStudyDetailHero item={item} />
            <CaseStudyDetailBody item={item} />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
