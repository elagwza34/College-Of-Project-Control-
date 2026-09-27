import { useCallback, useEffect, useRef, useState } from 'react';
import { cmsApi } from '../api/client';
interface Field {key:string;kind:string;default:string;label:string;linkField?:string}
interface Section {key:string;page:string;label:string;fields:Field[];url?:string}
interface Revision {draft:Record<string,string>;published:Record<string,string>;version:number;history:{version:number;at:string;by:string;values:Record<string,string>}[];updated_at:string|null;updated_by:string|null;is_hidden:boolean}
type Values=Record<string,Record<string,string>>;
const fieldClass='mt-2 w-full min-w-0 rounded-lg border border-background-200 bg-white p-3 text-sm';
function Workspace({sections,onDirty}:{sections:Section[];onDirty:(dirty:boolean)=>void}) {
  const iframe=useRef<HTMLIFrameElement>(null);
  const [revisions,setRevisions]=useState<Record<string,Revision>>({});
  const [drafts,setDrafts]=useState<Values>({});
  const [hidden,setHidden]=useState<Record<string,boolean>>({});
  const [selected,setSelected]=useState('');
  const [selectedField,setSelectedField]=useState('');
  const [ready,setReady]=useState(0);
  const [loading,setLoading]=useState(true);
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState('');
  const [notice,setNotice]=useState('');
  const [width,setWidth]=useState('100%');
  const [loadVersion,setLoadVersion]=useState(0);
  const section=sections.find(s=>s.key===selected);
  const field=section?.fields.find(f=>f.key===selectedField);
  const revision=revisions[selected];
  const contentDirtyKeys=Object.keys(drafts).filter(key=>JSON.stringify(drafts[key])!==JSON.stringify(revisions[key]?.draft||{}));
  const hiddenDirtyKeys=Object.keys(hidden).filter(key=>hidden[key]!==Boolean(revisions[key]?.is_hidden));
  const dirtyKeys=[...new Set([...contentDirtyKeys,...hiddenDirtyKeys])];
  const dirty=dirtyKeys.length>0;
  const sectionDirty=dirtyKeys.includes(selected);
  const selectedContentDirty=contentDirtyKeys.includes(selected);
  const selectedDraftDiffers=revision?JSON.stringify(revision.draft)!==JSON.stringify(revision.published):false;
  const url=sections.find(s=>s.url&&!s.url.includes(':')&&s.url!=='*')?.url;
  const source=url ? `${url}${url.includes('?')?'&':'?'}cms-preview=1` : undefined;
  useEffect(()=>{onDirty(dirty);},[dirty,onDirty]);
  useEffect(()=>{if(!dirty)return;const warn=(event:BeforeUnloadEvent)=>event.preventDefault();window.addEventListener('beforeunload',warn);return()=>window.removeEventListener('beforeunload',warn);},[dirty]);
  useEffect(()=>{
    let active=true;setLoading(true);setError('');
    Promise.all(sections.map(async s=>[s.key,await cmsApi.get<Revision>(`/page-content/${s.key}/`)] as const))
      .then(entries=>{if(active){setRevisions(Object.fromEntries(entries));setDrafts(Object.fromEntries(entries.map(([key,r])=>[key,r.draft])));setHidden(Object.fromEntries(entries.map(([key,r])=>[key,Boolean(r.is_hidden)])));}})
      .catch(()=>{if(active)setError('Could not load page drafts. Retry to open the editor.');})
      .finally(()=>{if(active)setLoading(false);});
    return()=>{active=false;};
  },[sections,loadVersion]);
  const send=useCallback((data:object)=>iframe.current?.contentWindow?.postMessage(data,window.location.origin),[]);
  useEffect(()=>{
    const receive=(event:MessageEvent)=>{
      if(event.origin!==window.location.origin||event.source!==iframe.current?.contentWindow)return;
      if(event.data?.type==='cpcm-preview-ready')setReady(v=>v+1);
      if(event.data?.type==='cpcm-preview-select'){
        const match=sections.find(s=>s.key===event.data.section);
        if(match?.fields.some(f=>f.key===event.data.field)){setSelected(match.key);setSelectedField(event.data.field);setNotice('');}
      }
    };
    window.addEventListener('message',receive);return()=>window.removeEventListener('message',receive);
  },[sections]);
  useEffect(()=>{send({type:'cpcm-preview-values',values:drafts});},[drafts,ready,send]);
  useEffect(()=>{send({type:'cpcm-preview-hidden',hidden:Object.keys(hidden).filter(key=>hidden[key])});},[hidden,ready,send]);
  function focusSection(key:string){const s=sections.find(item=>item.key===key);setSelected(key);setSelectedField(s?.fields[0]?.key||'');setNotice('');send({type:'cpcm-preview-focus',section:key});}
  function change(value:string){if(!field)return;setDrafts(prev=>({...prev,[selected]:{...prev[selected],[field.key]:value}}));setNotice('');}
  async function save(action:'save'|'publish'|'restore',restore_version?:number){
    if(!revision)return;setBusy(true);setError('');setNotice('');
    try{const next=await cmsApi.post<Revision>(`/page-content/${selected}/`,{action,version:revision.version,values:drafts[selected],restore_version});setRevisions(prev=>({...prev,[selected]:next}));setDrafts(prev=>({...prev,[selected]:next.draft}));setHidden(prev=>({...prev,[selected]:Boolean(next.is_hidden)}));setNotice(action==='publish'?'Section published.':action==='restore'?'Version restored to draft. Review before publishing.':'Section draft saved.');}
    catch(e){setError(e instanceof Error?e.message:'Could not save. Your changes are still here.');}finally{setBusy(false);}
  }
  async function saveAndPublish(){
    if(!revision)return;setBusy(true);setError('');setNotice('');
    try{
      let current=revision;
      if(selectedContentDirty)current=await cmsApi.post<Revision>(`/page-content/${selected}/`,{action:'save',version:current.version,values:drafts[selected]});
      const next=await cmsApi.post<Revision>(`/page-content/${selected}/`,{action:'publish',version:current.version});
      setRevisions(prev=>({...prev,[selected]:next}));setDrafts(prev=>({...prev,[selected]:next.draft}));setHidden(prev=>({...prev,[selected]:Boolean(next.is_hidden)}));setNotice('Section saved and published.');
    }
    catch(e){setError(e instanceof Error?e.message:'Could not save and publish. Your changes are still here.');}finally{setBusy(false);}
  }
  async function setVisibility(nextHidden:boolean){
    if(!revision)return;setBusy(true);setError('');setNotice('');
    const action=nextHidden?'hide':'show';
    setHidden(prev=>({...prev,[selected]:nextHidden}));
    try{const next=await cmsApi.post<Revision>(`/page-content/${selected}/`,{action,version:revision.version});setRevisions(prev=>({...prev,[selected]:next}));setDrafts(prev=>({...prev,[selected]:next.draft}));setHidden(prev=>({...prev,[selected]:Boolean(next.is_hidden)}));setNotice(nextHidden?'Section hidden from the public site.':'Section shown on the public site.');}
    catch(e){setHidden(prev=>({...prev,[selected]:Boolean(revision.is_hidden)}));setError(e instanceof Error?e.message:'Could not update visibility.');}finally{setBusy(false);}
  }
  return <div className="mt-6">
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-t-xl border bg-white p-3"><p className="text-sm font-semibold">Live page preview <span className="ml-2 font-normal text-foreground-500">{dirtyKeys.length?`${dirtyKeys.length} unsaved sections`:'Changes stay in draft until published'}</span></p><label className="flex items-center gap-2 text-sm">View<select aria-label="Preview screen size" value={width} onChange={e=>setWidth(e.target.value)} className="rounded-lg border p-2"><option value="100%">Fit workspace</option><option value="1280px">Desktop</option><option value="768px">Tablet</option><option value="390px">Mobile</option></select></label></div>
    {error&&<div role="alert" className="border-x bg-red-50 p-3 text-sm text-red-700"><p className="break-words">{error}</p>{Object.keys(revisions).length===0&&<button className="mt-2 underline" onClick={()=>setLoadVersion(v=>v+1)}>Retry</button>}</div>}
    {loading?<div role="status" className="rounded-b-xl border bg-white p-8">Loading page editor…</div>:<div className="grid min-w-0 gap-0 rounded-b-xl border border-t-0 bg-background-100 xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0 overflow-x-auto p-2 md:p-3">{source?<iframe ref={iframe} title="Editable page preview" src={source} onLoad={()=>setReady(v=>v+1)} sandbox="allow-scripts allow-same-origin" style={{width,height:'75vh',minHeight:420}} className="mx-auto block border-0 bg-white shadow-sm"/>:<p className="p-6">This section belongs to a dynamic page. Its fields can be edited using the panel.</p>}</div>
      <aside aria-label="Section editor" className="min-w-0 border-t bg-white p-4 xl:max-h-[calc(75vh+24px)] xl:overflow-y-auto xl:border-l xl:border-t-0">
        <h2 className="text-lg font-bold">Edit content</h2><p className="mt-2 text-sm text-foreground-600">Click highlighted text, an image or a button in the preview, or choose a section below. Edit the selected content and any connected link in the panel.</p>
        <label className="mt-5 block text-sm font-semibold">Section<select className={fieldClass} value={selected} onChange={e=>focusSection(e.target.value)}><option value="">Select a section</option>{sections.map(s=><option key={s.key} value={s.key}>{s.label}{hidden[s.key]?' (hidden)':''}{dirtyKeys.includes(s.key)?' •':''}</option>)}</select></label>
        {section&&revision&&<><label className="mt-4 block text-sm font-semibold">Field<select className={fieldClass} value={selectedField} onChange={e=>{setSelectedField(e.target.value);send({type:'cpcm-preview-focus',section:selected,field:e.target.value});}}>{section.fields.map((f,i)=><option key={f.key} value={f.key}>{f.label} {i+1}: {f.default.slice(0,55)}</option>)}</select></label>
        {field&&<div className="mt-4"><label className="block text-sm font-semibold">{field.kind==='image'?'Image URL':field.kind==='link'?'Button/link URL':'Text'}{field.kind!=='text'?<input data-editor-input className={fieldClass} value={drafts[selected]?.[field.key]??field.default} onChange={e=>change(e.target.value)}/>:<textarea data-editor-input rows={7} maxLength={10000} className={fieldClass} value={drafts[selected]?.[field.key]??field.default} onChange={e=>change(e.target.value)}/>}</label>{field.linkField&&<label className="mt-4 block text-sm font-semibold">Button/link URL<input data-editor-link className={fieldClass} value={drafts[selected]?.[field.linkField]??section.fields.find(f=>f.key===field.linkField)?.default??''} onChange={e=>{const key=field.linkField!;setDrafts(prev=>({...prev,[selected]:{...prev[selected],[key]:e.target.value}}));setNotice('');}}/><span className="mt-1 block text-xs font-normal text-foreground-500">Page path, section anchor or full website URL.</span></label>}{field.kind==='image'&&<img src={drafts[selected]?.[field.key]??field.default} alt="Selected draft image" className="mt-3 max-h-32 w-full rounded-lg object-contain"/>}<button className="mt-2 min-h-10 text-xs underline" onClick={()=>{setDrafts(prev=>{const next={...prev[selected]};delete next[field.key];return {...prev,[selected]:next};});}}>Reset field to website default</button></div>}
        <div className="mt-5 flex flex-wrap gap-2 border-t pt-4"><button disabled={busy||(!selectedContentDirty&&!selectedDraftDiffers)} className="btn-primary w-full" onClick={()=>void saveAndPublish()}>{busy?'Working…':'Save & publish'}</button><button disabled={busy||!selectedContentDirty} className="btn-secondary w-full" onClick={()=>void save('save')}>Save section draft</button><button disabled={busy||selectedContentDirty||!selectedDraftDiffers} className="btn-secondary w-full" onClick={()=>void save('publish')}>Publish saved draft</button><button disabled={busy} className="btn-secondary w-full" onClick={()=>void setVisibility(!hidden[selected])}>{hidden[selected]?'Show section':'Hide section'}</button></div>{selectedContentDirty&&<p className="mt-2 text-xs text-foreground-500">Use Save & publish to make this edit live now, or save it as a draft for review.</p>}{hidden[selected]&&<p className="mt-2 text-xs font-semibold text-foreground-600">This section is hidden from the public site.</p>}{notice&&<p role="status" className="mt-3 text-sm text-primary-700">{notice}</p>}
        {!!revision.history.length&&<details className="mt-5"><summary className="cursor-pointer text-sm font-semibold">Previous versions</summary>{revision.history.map(h=><div key={h.version} className="mt-3 border-t pt-3 text-xs"><p>{new Date(h.at).toLocaleString()} · {h.by}</p><button disabled={busy||sectionDirty} className="min-h-10 underline" onClick={()=>void save('restore',h.version)}>Restore to draft</button></div>)}</details>}</>}
        {url&&<a href={url} target="_blank" rel="noreferrer" className="mt-5 inline-block text-sm underline">Open public page</a>}
      </aside>
    </div>}
  </div>;
}
export default function PagesPage(){
  const [sections,setSections]=useState<Section[]>([]),[page,setPage]=useState(''),[dirty,setDirty]=useState(false),[error,setError]=useState('');
  const [pageSections,setPageSections]=useState<Section[]>([]);
  useEffect(()=>{cmsApi.get<Section[]>('/page-content/').then(setSections).catch(()=>setError('Could not load editable sections.'));},[]);
  const pages=[...new Set(sections.map(s=>s.page))].sort();
  return <div><h1 className="text-2xl font-bold">Pages & sections</h1><p className="mt-2 text-foreground-600">Edit page text, images and button links from a preview of the real page.</p>{error&&<p role="alert" className="mt-4 text-red-700">{error}</p>}
    <label className="mt-5 block max-w-lg text-sm font-semibold">Page<select className={fieldClass} value={page} onChange={e=>{if(dirty&&!window.confirm('Discard unsaved changes on this page?'))return;setDirty(false);setPage(e.target.value);setPageSections(sections.filter(s=>s.page===e.target.value));}}><option value="">Choose a page</option>{pages.map(p=><option key={p} value={p}>{p.replaceAll('-',' ')}</option>)}</select></label>
    {page&&<Workspace key={page} sections={pageSections} onDirty={setDirty}/>}
  </div>;
}
