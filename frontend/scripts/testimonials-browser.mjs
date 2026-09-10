import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, mkdtemp, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, join, extname, sep } from 'node:path';
import { tmpdir } from 'node:os';
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';

// Read-only integration checks against the configured local API and built UI.
const output = resolve('../docs/testimonials-validation');
await mkdir(output, { recursive: true });
const root = resolve('out');
// Submission and moderation use isolated in-memory fixtures only.
const submissions = [];
const captures = [];
let nextId = 1;
const programmes = [{slug:'pcp-level-6',name:'Project Controls Professional Level 6'},{slug:'construction',name:'PCP ? Construction Route'}];
const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    if (url.pathname.startsWith('/api/v1/testimonials/') || url.pathname.startsWith('/api/v1/cms/testimonials/')) {
      res.setHeader('Content-Type', 'application/json');
      const send = data => res.end(JSON.stringify(data));
      if (url.pathname === '/api/v1/testimonials/programmes/') return send(programmes);
      if (url.pathname === '/api/v1/testimonials/submit/' && req.method === 'POST') {
        const chunks=[]; for await(const chunk of req) chunks.push(chunk);
        const data=await new Request('http://localhost/submit',{method:'POST',headers:{'Content-Type':req.headers['content-type']},body:Buffer.concat(chunks)}).formData();
        const photo=data.get('photo'); assert.ok(photo.size > 0); captures.push({name:data.get('name'),programme:data.get('programme'),hasPhoto:true,consent:data.get('consent')});
        submissions.push({id:nextId++,name:data.get('name'),programme:data.get('programme'),programme_label:programmes.find(p=>p.slug===data.get('programme')).name,reviewer_type:data.get('reviewer_type'),review:data.get('review'),photo_url:'/images/hero-professional.webp',status:'pending',consent:data.get('consent')==='true',is_featured:false,order:0,moderation_notes:'',reviewed_at:null,created_at:new Date().toISOString()});
        res.statusCode=201; return send({detail:'Submitted for review.'});
      }
      if(url.pathname === '/api/v1/testimonials/') return send(submissions.filter(s=>s.status==='approved' && (!url.searchParams.get('programme') || s.programme===url.searchParams.get('programme'))));
      if(url.pathname === '/api/v1/cms/testimonials/') { const results=submissions.filter(s=>!url.searchParams.get('status') || s.status===url.searchParams.get('status')); return send({count:results.length,results,next:null,previous:null}); }
      const match=url.pathname.match(/^\/api\/v1\/cms\/testimonials\/(\d+)\/$/);
      if(match && req.method==='PATCH') { let body=''; for await(const chunk of req) body+=chunk; const item=submissions.find(s=>s.id===Number(match[1])); Object.assign(item,JSON.parse(body),{reviewed_at:new Date().toISOString()}); return send(item); }
      res.statusCode=404; return send({});
    }
    if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/media/')) {
      assert.equal(req.method, 'GET', 'Browser validation must not modify live data');

      const remote = await fetch(`http://127.0.0.1:8000${url.pathname}${url.search}`);
      res.statusCode = remote.status;
      res.setHeader('Content-Type', remote.headers.get('content-type') || 'application/octet-stream');
      return res.end(Buffer.from(await remote.arrayBuffer()));
    }
    let path = resolve(root, '.' + decodeURIComponent(url.pathname));
    assert.ok(path === root || path.startsWith(root + sep));
    if (!extname(path)) path = join(root, 'index.html');
    const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
    res.setHeader('Content-Type', mime[extname(path)] || 'application/octet-stream');
    res.end(await readFile(path));
  } catch (error) { if (req.url.includes('testimonials')) console.error(error); res.statusCode = 404; res.end('Not found'); }
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const origin = `http://127.0.0.1:${server.address().port}`;
const profile = await mkdtemp(join(tmpdir(), 'cpcm-testimonials-test-'));
const executable = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(existsSync);
assert.ok(executable);
const browser = spawn(executable, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank'], { windowsHide: true, stdio: ['ignore', 'ignore', 'pipe'] });
const pause = ms => new Promise(r => setTimeout(r, ms));
const checks = []; const exceptions = []; let socket;
async function eventually(fn, label, timeout = 20000) {
  const until = Date.now() + timeout;
  while (Date.now() < until) { if (await fn().catch(() => false)) return; await pause(100); }
  throw new Error(`Timed out: ${label}`);
}
try {
  let port;
  await eventually(async () => { port = (await readFile(join(profile, 'DevToolsActivePort'), 'utf8')).split('\n')[0]; return port; }, 'browser startup');
  const tabs = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  socket = new WebSocket(tabs.find(t => t.type === 'page').webSocketDebuggerUrl);
  await new Promise(r => socket.addEventListener('open', r, { once: true }));
  let sequence = 0; const pending = new Map();
  socket.addEventListener('message', ({ data }) => {
    const message = JSON.parse(data);
    if (message.id) { const call = pending.get(message.id); pending.delete(message.id); if (message.error) call.reject(message.error); else call.resolve(message.result); }
    if (message.method === 'Runtime.exceptionThrown') exceptions.push(message.params.exceptionDetails);
  });
  const cdp = (method, params = {}) => new Promise((resolve, reject) => { const id = ++sequence; pending.set(id, { resolve, reject }); socket.send(JSON.stringify({ id, method, params })); });
  const evaluate = async expression => { const data = await cdp('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }); if (data.exceptionDetails) throw new Error(data.exceptionDetails.exception?.description || data.exceptionDetails.text); return data.result.value; };
  await cdp('Page.enable'); await cdp('Runtime.enable'); await cdp('Network.enable');
  await cdp('Network.setBlockedURLs', { urls: ['https://*'] });
  await cdp('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  const viewport = width => cdp('Emulation.setDeviceMetricsOverride', { width, height: 1000, deviceScaleFactor: 1, mobile: width < 768 });
  const navigate = async path => { await cdp('Page.navigate', { url: origin + path }); await eventually(() => evaluate('!!document.querySelector("main h1")'), path); };
  const screenshot = async name => { const shot = await cdp('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false }); await writeFile(join(output, name + '.png'), Buffer.from(shot.data, 'base64')); };
  const live = await (await fetch('http://127.0.0.1:8000/api/v1/testimonials/')).json(); assert.ok(Array.isArray(live));
  checks.push('Live public testimonial API responds');
  await viewport(1440); await navigate('/contact?review=1&programme=pcp-level-6');
  await eventually(()=>evaluate('document.querySelector("dialog[open] select[name=programme]")?.options.length === 3'),'submission form');
  assert.equal(await evaluate('document.querySelector("dialog select[name=programme]").value'),'pcp-level-6');
  await screenshot('submission-form');
  await evaluate(`(() => { const set=(selector,value)=>{const input=document.querySelector(selector); Object.getOwnPropertyDescriptor(input.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,'value').set.call(input,value); input.dispatchEvent(new Event('input',{bubbles:true}));}; set('dialog input[name=name]','Browser Learner'); set('dialog textarea[name=review]','This programme improved my approach to planning and project controls.'); document.querySelector('dialog input[name=consent]').click(); })()`);
  await evaluate(`(async () => { const canvas=document.createElement('canvas'); canvas.width=50; canvas.height=50; canvas.getContext('2d').fillRect(0,0,50,50); const blob=await new Promise(r=>canvas.toBlob(r,'image/png')); const transfer=new DataTransfer(); transfer.items.add(new File([blob],'portrait.png',{type:'image/png'})); const input=document.querySelector('dialog input[type=file]'); input.files=transfer.files; input.dispatchEvent(new Event('change',{bubbles:true})); document.querySelector('dialog form').requestSubmit(); })()`);
  try { await eventually(()=>evaluate('document.querySelector("dialog[open]")?.textContent.includes("Thank you for your review")'),'submission success'); }
  catch (error) { console.log(await evaluate(`({ text:document.querySelector('dialog[open]').textContent, invalid:Array.from(document.querySelectorAll('dialog :invalid')).map(e=>({name:e.name,message:e.validationMessage})) })`)); throw error; }
  assert.equal(captures.length,1); assert.equal(submissions[0].status,'pending'); assert.equal((await (await fetch(origin+'/api/v1/testimonials/')).json()).length,0);
  checks.push('Contact dialog accepts name, programme, portrait, review and consent; submission remains pending');
  await evaluate(`localStorage.setItem('cms_token','isolated-browser-test')`);
  await cdp('Page.navigate',{url:origin+'/dashboard/testimonials'});
  await eventually(()=>evaluate('document.querySelector("main article")?.textContent.includes("Browser Learner")'),'pending dashboard review');
  await eventually(()=>evaluate('document.querySelector("main article img")?.complete'),'staff portrait');
  await screenshot('moderation-dashboard');
  await evaluate(`Array.from(document.querySelectorAll('main button')).find(b=>b.textContent==='Approve & publish').click()`);
  await eventually(()=>evaluate('document.body.textContent.includes("Review approved and published")'),'approval');
  assert.equal(submissions[0].status,'approved');
  await navigate('/');
  await eventually(()=>evaluate('document.querySelector("#testimonials")?.textContent.includes("Browser Learner")'),'home approved review');
  await evaluate(`document.querySelector('#testimonials').scrollIntoView({block:'start'})`); await screenshot('home-approved-review');
  checks.push('Dashboard approval publishes the submitted review in the home section');
  submissions.push({...submissions[0],id:nextId++,name:'Construction Learner',programme:'construction',programme_label:'PCP ? Construction Route'});
  submissions.push({...submissions[0],id:nextId++,name:'Employer Reviewer',reviewer_type:'employer'});
  await navigate('/');
  await eventually(()=>evaluate(`document.querySelector('[aria-label="Next testimonial"]') && !document.querySelector('[aria-label="Next testimonial"]').disabled`),'carousel next');
  await evaluate(`document.querySelector('[aria-label="Next testimonial"]').click()`);
  await eventually(()=>evaluate('document.querySelector("#testimonials figcaption").textContent.includes("Construction Learner")'),'next review');
  await evaluate(`Array.from(document.querySelectorAll('#testimonials button')).find(b=>b.textContent.includes('Employers')).click()`);
  await eventually(()=>evaluate('document.querySelector("#testimonials figcaption").textContent.includes("Employer Reviewer")'),'employer tab');
  await evaluate(`Array.from(document.querySelectorAll('#testimonials button')).find(b=>b.textContent.includes('Professionals')).click()`);
  await evaluate(`document.querySelectorAll('[aria-label=\"Select testimonial\"] button')[1].click()`);
  await eventually(()=>evaluate('document.querySelector("#testimonials figcaption").textContent.includes("Construction Learner")'),'thumbnail selection');
  checks.push('Testimonial navigation, thumbnail selection and employer audience tab');
  await navigate('/project-controls-professional-level-6');
  await eventually(()=>evaluate('document.querySelector("#testimonials")?.textContent.includes("Browser Learner")'),'programme section');
  assert.ok(await evaluate('!document.querySelector("#testimonials").textContent.includes("Construction Learner")'));
  await navigate('/operational-pcp-construction');
  await eventually(()=>evaluate('document.querySelector("#testimonials")?.textContent.includes("Construction Learner")'),'programme alias section');
  assert.ok(await evaluate('!document.querySelector("#testimonials").textContent.includes("Browser Learner")'));
  await viewport(375); await pause(250); await evaluate(`document.querySelector('#testimonials').scrollIntoView({block:'start'})`);
  assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth+1')); await screenshot('programme-mobile');
  checks.push('Programme-specific reviews on canonical and alias routes, responsive mobile layout');
  await viewport(1440); await cdp('Page.navigate',{url:origin+'/dashboard/testimonials'});
  await eventually(()=>evaluate('document.querySelector("main h1")?.textContent === "Testimonials & reviews"'),'moderation return');
  await evaluate(`Array.from(document.querySelectorAll('main button')).find(b=>b.textContent==='Approved').click()`);
  await eventually(()=>evaluate('document.querySelectorAll("main article").length === 3'),'approved filter');
  await evaluate(`document.querySelector('main article button:nth-of-type(2)').click()`);
  await eventually(()=>evaluate('document.body.textContent.includes("Review rejected and hidden")'),'rejection');
  assert.equal(submissions[0].status,'rejected');
  await navigate('/');
  await eventually(()=>evaluate('document.querySelector("#testimonials figcaption") !== null'),'withdrawn home');
  assert.ok(await evaluate('!document.querySelector("#testimonials").textContent.includes("Browser Learner")'));
  checks.push('Withdrawing approval removes the review from the public section');
  assert.equal(exceptions.length,0,JSON.stringify(exceptions));
  await writeFile(join(output,'results.json'),JSON.stringify({checks,exceptions},null,2)); console.log(JSON.stringify({checks,exceptions},null,2));
} finally {
  socket?.close(); browser.kill(); server.closeAllConnections(); server.close();
  assert.ok(resolve(profile).startsWith(resolve(tmpdir()) + sep + 'cpcm-testimonials-test-'));
  await pause(500); await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 500 }).catch(() => {});
}
