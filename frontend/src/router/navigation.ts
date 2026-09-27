export const destinations = {
  consultation: '/book-a-session', eligibility: '/apprenticeship-eligibility-checker',
  programmes: '/programmes', articles: '/articles', events: '/events',
} as const;
const legacyTargets: Record<string, string> = {
  '/apprenticeship-eligibility-checker/': destinations.eligibility,
  '#consultation': destinations.consultation, '#eligibility': destinations.eligibility,
  '#routes': destinations.programmes, '/employers#process': '/employers#how-it-works',
  '/project-controls-professional-level-6#consultation': destinations.consultation,
  '/project-controls-professional-level-6#routes': '/project-controls-professional-level-6#pathways',
  '/project-controls-professional-level-6#proof': '/testimonials',
};
export function resolveDestination(href: string): string {
  href = href.trim();
  if (legacyTargets[href]) return legacyTargets[href];
  if (!href || href === '#') return '/contact';
  const hasControlCharacters = Array.from(href).some(character => character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127);
  if (hasControlCharacters || !/^(?:[\/#?]|https?:|mailto:|tel:)/i.test(href)) return '/contact';
  return href;
}
