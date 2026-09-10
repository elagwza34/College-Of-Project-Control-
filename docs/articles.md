# Dynamic articles

- Public library: `/articles` — server-side keyword search and 12 results per page. Search and page are stored in the URL.
- Individual article: `/articles/{slug}` — published database content, cover image, author, publication date, reading time and article metadata.
- Management: `/dashboard/articles` or Django admin `/admin/content/article/`.

Editors can add, edit, delete, upload a cover, set its alt text, choose a category, change the author and reading time, and save drafts or publish. A future publication date schedules visibility; an empty date is set when first published. Drafts, future articles and undated records are excluded from both public endpoints. Lower display order appears first, then newest publication date.

Content supports paragraphs, `##` headings, `###` subheadings, `-` lists, `[label](/path)` links and pipe tables. The content preview uses the same renderer as the public page. HTML is displayed as text, never executed.

## Reusable section

```tsx
import ArticlesSection from '@/components/feature/ArticlesSection';

<ArticlesSection
  id="articles"
  title="Latest articles"
  description="Perspectives from the College."
/>
```

Optional `excludeSlug` omits the current article; `className` allows extra section styling. Each instance has independent state and a unique carousel ID. It fetches at most eight published articles, shows four at desktop widths, two on tablets and one on mobile. Arrows and keyboard navigation move one card; touch scrolling snaps to individual cards. Buttons disable at the ends and respect reduced motion. The section is included on the home page and individual article pages.

## Data and verification

Migration: `content.0013_article`. Public read endpoints: `/api/v1/articles/` and `/api/v1/articles/{slug}/`. Staff-only CRUD: `/api/v1/cms/articles/`.

The ten existing website articles were exported to `backend/apps/content/seed_data/articles.json` by `node scripts/export-articles.mjs` from the frontend directory. `python run_local.py seed_articles` imports them without overwriting existing slugs. This copies existing editorial content; it does not revalidate its factual claims. Existing Knowledge Hub routes retain their original code-managed content.

Checks:

- `python manage.py test apps.content.tests.test_articles` uses an isolated test database: visibility, scheduling, search, pagination, ordering, image upload/removal, CRUD, permissions, validation and safe repeat imports.
- `npm.cmd run type-check` and `npm.cmd run build`.
- `node scripts/articles-browser.mjs` checks the built interface against the local API using reads only. Covers search, empty/error/retry states, detail content and metadata, desktop/tablet/mobile layouts, and carousel geometry, step size and boundaries. External imagery and fonts are blocked during this deterministic check, so screenshots show local fallback images. Results and screenshots are in `docs/articles-validation/`.
