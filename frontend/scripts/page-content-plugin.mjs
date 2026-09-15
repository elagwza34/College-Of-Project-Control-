import ts from 'typescript';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { resolve, relative, join } from 'node:path';
const root=resolve('.');
const hash=s=>createHash('sha256').update(s).digest('hex').slice(0,16);
const clean=s=>s.split(/\r?\n/).map((line,i,lines)=>{let value=line.replace(/\t/g,' ');if(i>0)value=value.trimStart();if(i<lines.length-1)value=value.trimEnd();return value;}).filter(Boolean).join(' ');
const decode=s=>s.replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos|nbsp|rsquo|lsquo|rdquo|ldquo|middot|mdash|ndash|hellip|copy|reg);/gi,(_,key)=>key[0]==='#'?String.fromCodePoint(parseInt(key.slice(key[1].toLowerCase()==='x'?2:1),key[1].toLowerCase()==='x'?16:10)):({amp:'&',lt:'<',gt:'>',quot:'"',apos:"'",nbsp:'\u00a0',rsquo:'\u2019',lsquo:'\u2018',rdquo:'\u201d',ldquo:'\u201c',middot:'\u00b7',mdash:'\u2014',ndash:'\u2013',hellip:'\u2026',copy:'\u00a9',reg:'\u00ae'})[key]);
export function extract(code,id){
 const path=relative(join(root,'src/pages'),id).replaceAll('\\','/');
 if(!path.includes('/components/')||path.startsWith('../')||!id.endsWith('.tsx'))return null;
 const sf=ts.createSourceFile(id,code,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX),fields=[],edits=[];
 const section=hash(path), counts=new Map(), linkFields=new Map();
 function register(kind,value,label){const signature=kind+':'+value;const count=counts.get(signature)||0;counts.set(signature,count+1);const key=hash(signature+':'+count);fields.push({key,kind,default:value,label});return key;}
 function visit(n){
  if(ts.isJsxOpeningElement(n)||ts.isJsxSelfClosingElement(n)){
   const tag=n.tagName.getText(sf), href=n.attributes.properties.find(p=>p.name?.getText(sf)==='href');
   if(['SiteLink','a'].includes(tag)&&href?.initializer&&ts.isStringLiteral(href.initializer)){
    const key=register('link',decode(href.initializer.text),'Button/link URL');
    linkFields.set(n.parent,key);
    edits.push([n.tagName.getStart(sf),n.tagName.end,'CmsLink']);
    if(ts.isJsxOpeningElement(n)&&ts.isJsxElement(n.parent))edits.push([n.parent.closingElement.tagName.getStart(sf),n.parent.closingElement.tagName.end,'CmsLink']);
    edits.push([n.attributes.pos,n.attributes.pos,` section="${section}" field="${key}" ${tag==='a'?'native ':''}`]);
   }
  }
  if(ts.isJsxText(n)&&n.text.trim()){
   const tag=n.parent?.openingElement?.tagName?.getText(sf);
   if(['h1','h2','h3','h4','p','span','strong','em','li','a','SiteLink'].includes(tag)){
    const value=decode(clean(n.text));if(value.trim()&&!/&[a-z]+;/i.test(value)){
     const key=register('text',value,tag.startsWith('h')?'Heading':tag==='SiteLink'||tag==='a'?'Link text':'Text');
     let parent=n.parent;while(parent&&!linkFields.has(parent))parent=parent.parent;if(parent)fields.at(-1).linkField=linkFields.get(parent);
     edits.push([n.pos,n.end,`<CmsText section="${section}" field="${key}" fallback={${JSON.stringify(value)}} />`]);
    }
   }
  }
  if(ts.isJsxSelfClosingElement(n)&&n.tagName.getText(sf)==='img'){
   const src=n.attributes.properties.find(p=>p.name?.getText(sf)==='src');
   if(src?.initializer&&ts.isStringLiteral(src.initializer)){
    const key=register('image',src.initializer.text,'Image URL');
    edits.push([n.tagName.getStart(sf),n.tagName.end,'CmsImage']);
    edits.push([n.attributes.pos,n.attributes.pos,` section="${section}" field="${key}" `]);
   }
  }
  ts.forEachChild(n,visit);
 }
 visit(sf);if(!fields.length)return null;
 let result=code;for(const [start,end,value] of edits.sort((a,b)=>b[0]-a[0]))result=result.slice(0,start)+value+result.slice(end);
 const group=path.split('/components/')[0], name=path.split('/').at(-1).replace('.tsx','').replace(/([a-z0-9])([A-Z])/g,'$1 $2');
 let url;try{url=readFileSync(join(root,'src/pages',group,'README.md'),'utf8').match(/Routes: `([^`]+)`/)?.[1];}catch{}
 return {code:`import { CmsText, CmsImage, CmsLink } from '@/components/feature/PageContent';\n`+result,section:{key:section,page:group,label:name,fields,url}};
}
const walk=dir=>readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(join(dir,e.name)):[join(dir,e.name)]);
export default function pageContentPlugin(){
 function manifest(){const sections=walk(join(root,'src/pages')).filter(p=>p.endsWith('.tsx')).map(file=>extract(readFileSync(file,'utf8'),file)?.section).filter(Boolean);writeFileSync(resolve('../backend/apps/cms/page_content_catalogue.json'),JSON.stringify(sections,null,2)+'\n');}
 return {name:'page-content-fields',enforce:'pre',buildStart:manifest,transform(code,id){const result=extract(code,id.split('?')[0]);return result?{code:result.code,map:null}:null;},handleHotUpdate(ctx){if(ctx.file.includes('/pages/')||ctx.file.includes('\\pages\\'))manifest();}};
}
