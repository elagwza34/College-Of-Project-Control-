/**
 * Homepage event title presentation.
 *
 * Kept as a plain module (no JSX) so the transformation is directly unit
 * testable, and re-exported by EventsSection so the homepage presentation
 * logic and the helper stay together.
 */

/**
 * A LEADING funding/promotional prefix on an event title.
 *
 * These arrive from the upstream event feed, so the homepage must not rewrite
 * the stored record — only how the card presents it. Anchored at the start of
 * the string so an internal mention of funding (for example "Fully Funded
 * options explained") is never trimmed, and a title that is nothing but a
 * prefix is kept intact rather than rendering as an empty heading.
 */
const homepageFundingPrefix = /^(?:fully[\s-]+funded|100%\s+funded|dfe[\s-]+funded)\s*:?[ \t]*/i;

/**
 * Homepage presentation only: drop a leading promotional funding prefix and
 * collapse repeated whitespace (the upstream feed emits titles such as
 * "Fully Funded Project Control with  APM Chartered Project Professional").
 *
 * The event object is never mutated, so the API response, the source record and
 * the dedicated event detail page keep the original title. Callers opt in
 * explicitly, which keeps the events library and every non-homepage consumer
 * showing the exact source title.
 */
export function getHomepageEventDisplayTitle(title: string): string {
  const withoutPrefix = title.replace(homepageFundingPrefix, '').replace(/\s+/g, ' ').trim();
  return withoutPrefix || title.replace(/\s+/g, ' ').trim();
}