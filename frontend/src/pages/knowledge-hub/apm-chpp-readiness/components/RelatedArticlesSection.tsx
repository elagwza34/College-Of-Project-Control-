import RelatedArticles from '@/components/feature/RelatedArticles';
import { relatedArticles } from "../sectionData";

/** Section: Related Articles. */
export default function RelatedArticlesSection() {
  return (
    <RelatedArticles articles={relatedArticles} />
  );
}
