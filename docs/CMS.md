# Content management

The project uses Django Admin as a private headless CMS. Editors manage content in Django; React remains responsible for presentation.

## Content model

- **Site settings**: site name, logo, announcement, header call-to-action and footer copy.
- **Navigation menu**: header, footer and legal menus. Each menu contains ordered items and optional child items.
- **Page**: URL slug, publication status, summary and SEO fields.
- **Page section**: an ordered, reusable section attached to a page. Its `section_type` selects the React component and its `content` stores the editable fields.

## Publishing a page

1. Open `/admin/` and select **Pages**.
2. Add a page and choose its slug, for example `about`.
3. Add sections in the same page screen and give each a unique order value such as 10, 20 and 30.
4. Enter JSON content matching the selected section type.
5. Save as Draft for review.
6. Change the status to Published.
7. The page is available at `/about` and its API record at `/api/v1/pages/about/`.

## Section content examples

### Hero

```json
{
  "eyebrow": "Project control education",
  "title": "Build confidence across every project",
  "body": "Practical learning for modern project teams.",
  "primaryCta": { "label": "View programmes", "url": "/programmes" },
  "secondaryCta": { "label": "Contact us", "url": "/contact" }
}
```

### Feature grid

```json
{
  "heading": "Why learn with us",
  "body": "Focused support at every stage.",
  "items": [
    { "id": "expert-led", "title": "Expert-led", "body": "Learn from experienced practitioners." },
    { "id": "flexible", "title": "Flexible", "body": "Study around your commitments." }
  ]
}
```

### Statistics

```json
{
  "items": [
    { "id": "learners", "value": "2,500+", "label": "Learners supported" },
    { "id": "partners", "value": "40", "label": "Industry partners" }
  ]
}
```

### FAQ

```json
{
  "heading": "Frequently asked questions",
  "items": [
    { "id": "entry", "question": "What are the entry requirements?", "answer": "Requirements vary by programme." }
  ]
}
```

## Adding a new section type

Adding a brand-new layout is a development task rather than an editor action:

1. Add the type to `PageSection.SectionType` in Django.
2. Define its required content fields in `PageSection.clean()`.
3. Add the corresponding React component to `SectionRenderer`.
4. Create and apply a migration.

Once registered, editors can reuse that section type on any page without further code changes.

