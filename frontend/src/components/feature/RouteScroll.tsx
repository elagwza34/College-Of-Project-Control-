import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
export default function RouteScroll() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    let observer: MutationObserver | undefined;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const focusTarget = () => {
      if (document.querySelector('.page-loader')) return false;
      // A visitor may open the assistant while the lazy page is still loading.
      if (document.activeElement?.closest('[role="dialog"], dialog[open]')) return true;
      let id = 'main-content';
      try { if (hash) id = decodeURIComponent(hash.slice(1)); } catch { return true; }
      const target = document.getElementById(id);
      if (!target) return false;
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      if (hash) target.scrollIntoView({ block: 'start', behavior: 'instant' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
      return true;
    };
    if (!focusTarget()) {
      observer = new MutationObserver(() => { if (focusTarget()) observer?.disconnect(); });
      observer.observe(document.body, { childList: true, subtree: true });
      timeout = setTimeout(() => observer?.disconnect(), 10000);
    }
    return () => { observer?.disconnect(); clearTimeout(timeout); };
  }, [pathname, hash, key]);
  return null;
}
