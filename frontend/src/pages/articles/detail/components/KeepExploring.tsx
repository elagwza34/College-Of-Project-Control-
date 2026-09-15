import ArticlesSection from '@/components/feature/ArticlesSection';
import { type ArticleDetail } from '@/services/articlesApi';

/** Section: Keep exploring. */
interface KeepExploringProps {
  article: ArticleDetail;
}

export default function KeepExploring({ article }: KeepExploringProps) {
  return (
    <ArticlesSection title="Keep exploring" excludeSlug={article.slug} />
  );
}
