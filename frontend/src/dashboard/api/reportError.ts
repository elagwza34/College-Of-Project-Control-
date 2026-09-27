/** Editors keep their local draft after an API error; retry the original action. */
export function reportCmsError(error: unknown) {
  const message = error instanceof Error && error.name === 'TimeoutError'
    ? 'The request timed out. Your changes may not have been saved. Please refresh the list before trying again.'
    : 'Unable to complete the request. Check your connection and try again.';
  window.dispatchEvent(new CustomEvent('cms-request-error', { detail: message }));
}
