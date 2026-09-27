import SiteLink from '@/components/base/SiteLink';
import { createContext, useContext, useEffect, useState, type AnchorHTMLAttributes, type ImgHTMLAttributes, type ReactNode } from 'react';

type ContentValues = Record<string, Record<string, string>>;

const ContentContext = createContext<{values: ContentValues; hidden: Set<string>; editing: boolean}>({values: {}, hidden: new Set(), editing: false});

export function PageContentProvider({children}: {children: ReactNode}) {
  const [published, setPublished] = useState<ContentValues>({});
  const [drafts, setDrafts] = useState<ContentValues>({});
  const [publishedHidden, setPublishedHidden] = useState<Set<string>>(new Set());
  const [draftHidden, setDraftHidden] = useState<Set<string> | null>(null);
  const editing = window.parent !== window && new URLSearchParams(window.location.search).get('cms-preview') === '1';

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${(import.meta.env.VITE_API_BASE_URL || '/api/v1').replace(/\/$/, '')}/page-content/`, {signal: controller.signal})
      .then(r => r.ok ? r.json() : {values: {}, hidden: []})
      .then((data: {values?: ContentValues; hidden?: string[]}) => {
        setPublished(data.values || {});
        setPublishedHidden(new Set(data.hidden || []));
      }).catch(() => {});
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!editing) return;
    const receive = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== window.parent) return;
      if (event.data?.type === 'cpcm-preview-values') setDrafts(event.data.values || {});
      if (event.data?.type === 'cpcm-preview-hidden') setDraftHidden(new Set(event.data.hidden || []));
      if (event.data?.type === 'cpcm-preview-focus') {
        const {section, field} = event.data;
        document.querySelectorAll<HTMLElement>('[data-cms-section]').forEach(el => {
          const selected = el.dataset.cmsSection === section && (!field || el.dataset.cmsField === field);
          el.toggleAttribute('data-cms-selected', selected);
        });
        document.querySelector('[data-cms-selected]')?.scrollIntoView({behavior: 'smooth', block: 'center'});
      }
    };
    const pick = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent && !['Enter', ' '].includes(event.key)) return;
      const target = event.target instanceof Element ? event.target : null;
      const field = target?.closest<HTMLElement>('[data-cms-section]');
      if (field) {
        event.preventDefault(); event.stopPropagation();
        document.querySelectorAll('[data-cms-selected]').forEach(el => el.removeAttribute('data-cms-selected'));
        field.setAttribute('data-cms-selected', '');
        window.parent.postMessage({type: 'cpcm-preview-select', section: field.dataset.cmsSection, field: field.dataset.cmsField}, window.location.origin);
      } else if (target?.closest('a')) event.preventDefault();
    };
    const preventSubmit = (event: Event) => {event.preventDefault(); event.stopPropagation();};
    window.addEventListener('message', receive);
    document.addEventListener('click', pick, true);
    document.addEventListener('keydown', pick, true);
    document.addEventListener('submit', preventSubmit, true);
    window.parent.postMessage({type: 'cpcm-preview-ready'}, window.location.origin);
    return () => {
      window.removeEventListener('message', receive);
      document.removeEventListener('click', pick, true);
      document.removeEventListener('keydown', pick, true);
      document.removeEventListener('submit', preventSubmit, true);
    };
  }, [editing]);

  const hidden = draftHidden ?? publishedHidden;
  const hiddenSectionCss = Array.from(hidden).map(key => editing
    ? `[data-cms-section-root="${key}"], section:has([data-cms-section="${key}"]), header:has([data-cms-section="${key}"]) { opacity: .45; filter: grayscale(.35); position: relative; } [data-cms-section-root="${key}"]::before, section:has([data-cms-section="${key}"])::before, header:has([data-cms-section="${key}"])::before { content: "Hidden from public site"; position: absolute; z-index: 20; top: .75rem; right: .75rem; padding: .35rem .6rem; border-radius: .35rem; background: #001714; color: white; font: 700 .75rem/1 system-ui, sans-serif; letter-spacing: 0; }`
    : `[data-cms-section-root="${key}"], section:has([data-cms-section="${key}"]), header:has([data-cms-section="${key}"]) { display: none !important; }`
  ).join('\n');

  return <ContentContext.Provider value={{values: {...published, ...drafts}, hidden, editing}}>
    {hiddenSectionCss && <style>{hiddenSectionCss}</style>}
    {editing && <style>{`[data-cms-section] { cursor: text; } img[data-cms-section] { cursor: pointer; } [data-cms-section]:hover, [data-cms-section]:focus-visible { outline: 2px dashed #ffa953; outline-offset: 3px; } [data-cms-selected] { outline: 3px solid #ffa953 !important; outline-offset: 3px; } .programme-assistant { display: none !important; }`}</style>}
    {children}
  </ContentContext.Provider>;
}

export function CmsText({section, field, fallback}: {section: string; field: string; fallback: string}) {
  const {values, editing} = useContext(ContentContext);
  const text = values[section]?.[field] ?? fallback;
  return editing ? <span data-cms-section={section} data-cms-field={field} tabIndex={0}>{text}</span> : <>{text}</>;
}

export function CmsImage({section, field, ...props}: ImgHTMLAttributes<HTMLImageElement> & {section: string; field: string}) {
  const {values, editing} = useContext(ContentContext);
  return <img {...props} src={values[section]?.[field] ?? props.src} {...(editing ? {'data-cms-section': section, 'data-cms-field': field, tabIndex: 0} : {})}/>;
}

export function CmsLink({section, field, native = false, ...props}: AnchorHTMLAttributes<HTMLAnchorElement> & {section: string; field: string; native?: boolean}) {
  const {values, editing} = useContext(ContentContext);
  const href = values[section]?.[field] ?? props.href;
  const attributes = editing ? {'data-cms-section': section, 'data-cms-field': field} : {};
  return native ? <a {...props} {...attributes} href={href}/> : <SiteLink {...props} {...attributes} href={href}/>;
}
