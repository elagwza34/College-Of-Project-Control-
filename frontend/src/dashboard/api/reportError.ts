/** Editors keep their local draft after an API error; retry the original action. */
export function reportCmsError(error: unknown) {
  const message = error instanceof Error && error.name === 'TimeoutError'
    ? 'The request timed out. Its outcome could not be confirmed.'
    : 'The request could not be completed. Check your connection and try again.';
  window.dispatchEvent(new CustomEvent('cms-request-error', { detail: message }));
}
