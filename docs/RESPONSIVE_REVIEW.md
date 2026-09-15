# Responsive review — 14 September 2026

Reviewed 70 public routes (including aliases and sample article, event and mentor detail pages) at 320, 390, 640, 768, 1024, 1440 and 1920 CSS pixels. All 490 final viewport checks passed: no detected document overflow, uncontained elements or clipped CTA/heading text. Sections were scrolled into view to activate reveal effects.

## Changes

- Constrained the funding image header to its container; its aspect ratio and minimum height previously expanded tablet pages to 960px.
- Allowed responsive display utilities to hide CTAs correctly. The shared capsule style previously overrode `hidden`.
- Prevented CTA flex shrinking and enabled wrapping in crowded groups, while preserving the branded background and arrow.
- Stacked home programme cards until desktop width and wrapped long headings on narrow screens.
- Adjusted learner journey connectors, the weekly learning testimonial and the funding CTA layout for mobile/tablet.
- Kept the chat composer accessible on short screens, including landscape, and used 16px mobile input text to avoid focus zoom.

## Verification

- Public page geometry: 490 checks passed.
- Navigation and chat panels: bounds checked at 320×568, 390×844, 768×1024, 1024×768, 1440×900 and 667×375; composer remained inside the panel.
- Visual samples: home, engineering hero/sections, consultation form, navigation and chat.
- Production build, TypeScript and ESLint passed.

This used desktop Chromium viewport emulation, not physical iOS/Android devices. Public CMS content came from the existing local snapshot; no real enquiry, booking or AI request was sent. Authenticated dashboard screens are outside this public-site review.

## Re-run

From `frontend`, run `npm run build` then `npm run test:responsive`. Chrome or Edge must be installed. The script serves the build locally and uses `.section-refactor/api-baseline.json` when present, otherwise the API-unavailable state. Reports and screenshots are written to `.section-refactor/responsive/`.

Set `INTERACTIONS=1` to include navigation/chat checks and visual samples. Optionally set `ROUTES` to comma-separated public paths to narrow the geometry checks.
