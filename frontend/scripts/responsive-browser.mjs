import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, join, extname, sep } from 'node:path';
import { openBrowser, pause } from './lib/browser.mjs';
const root=resolve('out'), output=resolve('.section-refactor/responsive');
await mkdir(output,{recursive:true});
// Use a local content snapshot when available; never submit forms or call the AI provider.
const cache=JSON.parse(await readFile('.section-refactor/api-baseline.json','utf8').catch(()=>'{}'));
const server=createServer(async(req,res)=>{try{
 const url=new URL(req.url,'http://localhost');
 if(url.pathname.startsWith('/api/')) {const item=cache[url.pathname+url.search]||{status:503,body:'{}'};res.statusCode=item.status;res.setHeader('Content-Type','application/json');return res.end(item.body);}
 let file=resolve(root,'.'+decodeURIComponent(url.pathname));if(!file.startsWith(root+sep))file=join(root,'index.html');if(!extname(file))file=join(root,'index.html');
 res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.woff2':'font/woff2','.png':'image/png','.webp':'image/webp'})[extname(file)]||'application/octet-stream');res.end(await readFile(file));
}catch{res.statusCode=404;res.end('');}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin=`http://127.0.0.1:${server.address().port}`;
const browser=await openBrowser(); const {cdp,evaluate,waitFor}=browser; const results=[];
const source=await readFile('src/router/config.tsx','utf8');
const routes=[...new Set([...source.matchAll(/path:\s*["']([^"']+)["']/g)].map(m=>m[1]).filter(p=>p!=='*'&&!p.includes(':')))];
for(const [endpoint,prefix] of [['/api/v1/articles/?page=1&page_size=12','/articles/'],['/api/v1/events/library/','/events/'],['/api/v1/mentors/','/mentors/']]){const data=JSON.parse(cache[endpoint]?.body||'null');const row=Array.isArray(data)?data[0]:data?.results?.[0];if(row)routes.push(prefix+(row.slug||row.id));}
const metrics=()=>{
 const w=innerWidth;
 const visible=e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.width>0&&r.height>0&&s.visibility!=='hidden'&&s.display!=='none'&&!e.closest('.sr-only,.honeypot-field');};
 const clipped=e=>{for(let p=e.parentElement;p&&p!==document.body;p=p.parentElement){if(['hidden','auto','scroll','clip'].includes(getComputedStyle(p).overflowX))return true;}return false;};
 const describe=e=>({tag:e.tagName,text:e.textContent.trim().slice(0,85),class:e.className,left:Math.round(e.getBoundingClientRect().left),right:Math.round(e.getBoundingClientRect().right)});
 return {overflow:document.documentElement.scrollWidth-w,outside:[...document.querySelectorAll('main *,footer *,nav *')].filter(visible).filter(e=>{const r=e.getBoundingClientRect();return (r.left< -2||r.right>w+2)&&!clipped(e);}).slice(0,12).map(describe),truncated:[...document.querySelectorAll('a.btn-primary,a.btn-secondary,.cta-button,h1,h2,input,select')].filter(visible).filter(e=>e.scrollWidth>e.clientWidth+3).map(describe),heading:document.querySelector('h1')?.textContent, height:document.documentElement.scrollHeight};
};
try{
 await cdp('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
 for(const route of routes.filter(r=>!process.env.ROUTES || process.env.ROUTES.split(',').includes(r))){
  await cdp('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});
  await cdp('Page.navigate',{url:origin+route});await waitFor('!!document.querySelector("h1")',route);await pause(180);
  await evaluate(`(async()=>{for(const e of document.querySelectorAll('main section,main>div')){e.scrollIntoView();await new Promise(r=>setTimeout(r,20));}scrollTo(0,0);})()`);await pause(100);
  for(const width of [320,390,640,768,1024,1440,1920]){
   await cdp('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<768});await evaluate(`scrollTo(0,0); document.querySelectorAll('main section,main>div').forEach(e=>e.getBoundingClientRect())`);await pause(65);
   results.push({route,width,...await evaluate('('+metrics.toString()+')()')});
  }
  console.log(route+' '+results.slice(-7).filter(r=>r.overflow>2||r.outside.length||r.truncated.length).map(r=>r.width+':'+r.overflow+'/'+r.outside.length+'/'+r.truncated.length).join(' '));
 }
 if (process.env.INTERACTIONS) {
 for (const [width,height] of [[320,568],[390,844],[768,1024],[1024,768],[1440,900],[667,375]]) {
  await cdp('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<768});
  await cdp('Page.navigate',{url:origin+'/associate-project-manager-level-4'});await waitFor('!!document.querySelector("h1")');await pause(300);
  if(width<1024){await evaluate(`document.querySelector('[aria-controls="mobile-navigation"]').click()`);await waitFor('!!document.querySelector("dialog[open]")');}
  else {await evaluate(`document.querySelector('[aria-controls="desktop-routes-menu"]').click()`);await waitFor('!!document.querySelector("#desktop-routes-menu")');}
  const menu=await evaluate(`(()=>{const e=document.querySelector('dialog[open],#desktop-routes-menu'),r=e.getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,overflow:e.scrollWidth-e.clientWidth}})()`);
  console.log('MENU',width,height,JSON.stringify(menu));
  assert.ok(menu.left>=0&&menu.right<=width&&menu.top>=0&&menu.bottom<=height&&menu.overflow<=2,'Menu fits '+width);
  let shot=await cdp('Page.captureScreenshot',{format:'png'});await writeFile(join(output,`menu-${width}.png`),Buffer.from(shot.data,'base64'));
  await cdp('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape'});
  await evaluate('scrollTo(0,1100)');await pause(650);await evaluate(`document.querySelector('.assistant-launcher').click()`);await waitFor('!!document.querySelector(".assistant-panel")');
  const chat=await evaluate(`(()=>{const e=document.querySelector('.assistant-panel'),r=e.getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,composer:document.querySelector('.assistant-composer').getBoundingClientRect().bottom,height:innerHeight}})()`);
  console.log('CHAT',width,height,JSON.stringify(chat));
  assert.ok(chat.left>=0&&chat.right<=width&&chat.top>=0&&chat.bottom<=height&&chat.composer<=chat.bottom,'Chat composer fits '+width);
  shot=await cdp('Page.captureScreenshot',{format:'png'});await writeFile(join(output,`chat-${width}.png`),Buffer.from(shot.data,'base64'));
 }
 for(const route of ['/', '/project-controls-professional/engineering-manufacturing-aerospace-route','/book-a-session']) {
  await cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});await cdp('Page.navigate',{url:origin+route});await waitFor('!!document.querySelector("h1")');
  const positions=await evaluate(`[0,...[...document.querySelectorAll('main section,footer')].map(e=>e.getBoundingClientRect().top+scrollY)].filter((p,i,a)=>a.indexOf(p)===i)`);
  for(let i=0;i<positions.length;i++){await evaluate(`scrollTo(0,${positions[i]}-112)`);await pause(250);const shot=await cdp('Page.captureScreenshot',{format:'png'});await writeFile(join(output,route.replaceAll('/','_')+'-'+i+'.png'),Buffer.from(shot.data,'base64'));}
 }
}
 await writeFile(join(output,process.env.ROUTES?'focused.json':'audit.json'),JSON.stringify(results,null,2));
 console.log('Completed '+results.length+' viewport checks');
 const failures=results.filter(r=>r.overflow>2||r.outside.length||r.truncated.length);console.log('Issues: '+failures.length);if(failures.length)process.exitCode=1;
}finally{await browser.close();server.closeAllConnections();server.close();}
