import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve,join,extname,sep } from 'node:path';
import { openBrowser,pause } from './lib/browser.mjs';
const root=resolve('out'),catalogue=JSON.parse(await readFile('../backend/apps/cms/page_content_catalogue.json','utf8'));
const spec=catalogue.find(s=>s.page==='operational-pcp-engineering'&&s.label==='Engineering Advanced Manufacturing'),heading=spec.fields.find(f=>f.label==='Heading');
let state={draft:{},published:{},history:[],version:0,updated_at:null,updated_by:null};
const entry={id:1,name:'Demo learner',email:'demo@example.com',phone:'0123456789',organisation:'Demo organisation',roleTitle:'Planner',enquiryType:'Consultation',message:'I would like to discuss Level 6.',sourcePath:spec.url,status:'new',created_at:new Date().toISOString(),read_at:null,internal_notes:'',assigned_to:null,assigned_name:null,follow_up_at:null};
const rows=[entry];
const server=createServer(async(req,res)=>{try{const url=new URL(req.url,'http://local');res.setHeader('Content-Type','application/json');
 if(url.pathname.startsWith('/api/')){
 let body='';for await(const chunk of req)body+=chunk;const data=body?JSON.parse(body):{};
 if(url.pathname==='/api/v1/cms/enquiries/notifications/')return res.end(JSON.stringify({unread_count:rows.filter(r=>!r.read_at).length,latest:rows.filter(r=>!r.read_at).map(r=>({...r,enquiry_type:r.enquiryType}))}));
 if(url.pathname.endsWith('/enquiries/team/'))return res.end(JSON.stringify([{id:1,username:'editor'}]));
 if(url.pathname.endsWith('/enquiries/1/read/')){entry.read_at ||= new Date().toISOString();return res.end(JSON.stringify(entry));}
 if(url.pathname.endsWith('/enquiries/1/')){Object.assign(entry,data);return res.end(JSON.stringify(entry));}
 if(url.pathname.endsWith('/enquiries/'))return res.end(JSON.stringify(rows));
 if(url.pathname==='/api/v1/cms/page-content/')return res.end(JSON.stringify(catalogue));
 if(url.pathname===`/api/v1/cms/page-content/${spec.key}/`){if(req.method==='POST'){assert.equal(data.version,state.version);if(data.action==='save')state.draft=data.values;else if(data.action==='publish')state.published=state.draft;state.version++;}return res.end(JSON.stringify(state));}
 if(url.pathname.startsWith('/api/v1/cms/page-content/'))return res.end(JSON.stringify({draft:{},published:{},history:[],version:0,updated_at:null,updated_by:null}));
 if(url.pathname==='/api/v1/page-content/')return res.end(JSON.stringify({[spec.key]:state.published}));
 return res.end('[]');
 }
 let file=resolve(root,'.'+decodeURIComponent(url.pathname));assert.ok(file.startsWith(root+sep));if(!extname(file))file=join(root,'index.html');res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.woff2':'font/woff2'})[extname(file)]||'application/octet-stream');res.end(await readFile(file));
}catch(e){res.statusCode=500;res.end(JSON.stringify({error:String(e)}));}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin=`http://127.0.0.1:${server.address().port}`,b=await openBrowser();await mkdir('.section-refactor/dashboard-workflow',{recursive:true});
const click=async text=>{await b.evaluate(`(()=>{const e=[...document.querySelectorAll('button')].find(e=>e.textContent.trim()===${JSON.stringify(text)});if(!e)throw Error('Missing button');e.click();})()`);await pause(150);};
const input=async(selector,value)=>b.evaluate(`(()=>{const e=document.querySelector(${JSON.stringify(selector)});Object.getOwnPropertyDescriptor(e.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,'value').set.call(e,${JSON.stringify(value)});e.dispatchEvent(new Event('input',{bubbles:true}));})()`);
const select=async(index,value)=>b.evaluate(`(()=>{const e=document.querySelectorAll('main select')[${index}];e.value=${JSON.stringify(value)};e.dispatchEvent(new Event('change',{bubbles:true}));})()`);
try{
 await b.cdp('Network.setBlockedURLs',{urls:['https://*']});
 await b.cdp('Page.addScriptToEvaluateOnNewDocument',{source:`localStorage.setItem('cms_token','isolated-browser-test')`});
 await b.cdp('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
 await b.cdp('Page.navigate',{url:origin+'/dashboard/enquiries'});await b.waitFor(`!!document.querySelector('[aria-label="1 unread enquiries"]')`);
 await b.evaluate(`document.querySelector('tbody button').click()`);await b.waitFor(`document.body.textContent.includes('I would like to discuss Level 6.')`);await b.waitFor(`!document.querySelector('[aria-label="1 unread enquiries"]')`);
 assert.equal(entry.status,'new');rows.push({...entry,id:2,name:'Second demo request',read_at:null});await b.evaluate(`window.dispatchEvent(new Event('focus'))`);await b.waitFor(`document.body.textContent.includes('A new enquiry has arrived.')`);await b.waitFor(`!!document.querySelector('[aria-label="1 unread enquiries"]')`);await input('textarea','Follow up tomorrow');await click('Save follow-up');assert.equal(entry.internal_notes,'Follow up tomorrow');
 let shot=await b.cdp('Page.captureScreenshot',{format:'png'});await writeFile('.section-refactor/dashboard-workflow/enquiries.png',Buffer.from(shot.data,'base64'));
 await b.cdp('Page.navigate',{url:origin+'/dashboard/pages'});await b.waitFor(`document.querySelectorAll('main select option').length>5`);await select(0,spec.page);
 await b.waitFor(`!!document.querySelector('iframe')?.contentDocument?.querySelector('h1 [data-cms-field]')`);
 assert.ok(await b.evaluate(`document.querySelector('iframe').contentDocument.querySelectorAll('section').length>5`),'Full page sections are rendered');
 await b.evaluate(`document.querySelector('iframe').contentDocument.querySelector('h1 [data-cms-field]').click()`);
 await b.waitFor(`!!document.querySelector('[data-editor-input]')`);
 assert.equal(await b.evaluate(`document.querySelector('[data-editor-input]').value`),heading.default);
 await input('[data-editor-input]','Edited engineering heading');
 await b.waitFor(`document.querySelector('iframe').contentDocument.querySelector('h1').textContent==='Edited engineering heading'`);
 assert.equal(state.published[heading.key],undefined,'Live preview does not publish');
 await b.evaluate(`document.querySelector('iframe').contentDocument.querySelector('a').click()`);await pause(100);
 assert.ok(await b.evaluate(`document.querySelector('iframe').contentWindow.location.pathname===${JSON.stringify(spec.url)}`),'Preview links do not navigate away');
 await b.evaluate(`document.querySelector('iframe').contentDocument.querySelector('a[href$="#pathways"] [data-cms-field]').click()`);
 await b.waitFor(`!!document.querySelector('[data-editor-link]')`);
 await input('[data-editor-link]','/programmes');
 await b.waitFor(`!!document.querySelector('iframe').contentDocument.querySelector('a[data-cms-field][href="/programmes"]')`);
 await click('Save section draft');assert.equal(state.draft[heading.key],'Edited engineering heading');assert.equal(state.published[heading.key],undefined);await click('Publish section');assert.equal(state.published[heading.key],'Edited engineering heading');
 await b.evaluate(`(()=>{const s=document.querySelector('[aria-label="Preview screen size"]');s.value='390px';s.dispatchEvent(new Event('change',{bubbles:true}));})()`);
 await pause(150);assert.equal(await b.evaluate(`document.querySelector('iframe').contentWindow.innerWidth`),390);
 shot=await b.cdp('Page.captureScreenshot',{format:'png'});await writeFile('.section-refactor/dashboard-workflow/content.png',Buffer.from(shot.data,'base64'));
 await b.cdp('Page.navigate',{url:origin+spec.url});await b.waitFor(`document.querySelector('h1')?.textContent==='Edited engineering heading'`);
 assert.ok(await b.evaluate(`Array.from(document.querySelectorAll('a[href="/programmes"]')).some(a=>a.textContent.includes('Compare pathways'))`),'Published button destination reaches public page');
 await b.cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});await b.cdp('Page.navigate',{url:origin+'/dashboard/enquiries?enquiry=1'});await b.waitFor(`!!document.querySelector('main textarea')`);
 assert.ok(await b.evaluate('document.documentElement.scrollWidth<=innerWidth+1'));
 shot=await b.cdp('Page.captureScreenshot',{format:'png'});await writeFile('.section-refactor/dashboard-workflow/mobile.png',Buffer.from(shot.data,'base64'));
 console.log('PASS: unread badge, read state, enquiry detail/save, content draft/publish/public rendering, mobile bounds.');
}finally{await b.close();server.closeAllConnections();server.close();}
