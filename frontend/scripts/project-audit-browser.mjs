import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, mkdtemp, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, join, extname, sep } from 'node:path';
import { tmpdir } from 'node:os';
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';

// Read-only integration checks against the configured local API and built UI.
const output = resolve('../docs/project-audit/screenshots');
await mkdir(output, { recursive: true });
const root = resolve('out');
let failArticles = false;
const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/media/')) {
      assert.equal(req.method, 'GET', 'Browser validation must not modify live data');
      if (failArticles && url.pathname.startsWith('/api/v1/articles/')) { res.statusCode = 503; return res.end('{}'); }
      const remote = await fetch(`http://127.0.0.1:8000${url.pathname}${url.search}`);
      res.statusCode = remote.status;
      res.setHeader('Content-Type', remote.headers.get('content-type') || 'application/octet-stream');
      return res.end(Buffer.from(await remote.arrayBuffer()));
    }
    let path = resolve(root, '.' + decodeURIComponent(url.pathname));
    assert.ok(path === root || path.startsWith(root + sep));
    if (!extname(path)) path = join(root, 'index.html');
    const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
    res.setHeader('Content-Type', mime[extname(path)] || 'application/octet-stream');
    res.end(await readFile(path));
  } catch { res.statusCode = 404; res.end('Not found'); }
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const origin = `http://127.0.0.1:${server.address().port}`;
const profile = await mkdtemp(join(tmpdir(), 'cpcm-audit-test-'));
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
  await cdp('Network.setBlockedURLs', { urls: ['*google-analytics.com*','*googletagmanager.com*'] });
  await cdp('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  const viewport = width => cdp('Emulation.setDeviceMetricsOverride', { width, height: 1000, deviceScaleFactor: 1, mobile: width < 768 });
  const navigate = async path => { await cdp('Page.navigate', { url: origin + path }); await eventually(() => evaluate('!!document.querySelector("main h1")'), path); };
  const screenshot = async name => { const shot = await cdp('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false }); await writeFile(join(output, name + '.png'), Buffer.from(shot.data, 'base64')); };



  const paths=JSON.parse(await readFile(resolve('../docs/project-audit/routes.json'),'utf8')).filter(p=>!p.includes(':')&&p!=='*');
  for(const [api,prefix] of [['articles/','/articles/'],['events/library/','/events/'],['mentors/','/mentors/']]) {
    try { const data=await (await fetch('http://127.0.0.1:8000/api/v1/'+api)).json();const row=(Array.isArray(data)?data:data.results)?.[0];if(row)paths.push(prefix+(row.slug||row.id)); }catch{}
  }
  paths.push('/dashboard/login','/not-a-real-page-audit');
  const pages=[];
  const metrics=()=>{
    const visible=e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.width>0&&r.height>0&&s.display!=='none'&&s.visibility!=='hidden';};
    const main=document.querySelector('main')||document.body;
    const sections=[...main.querySelectorAll('section')].filter(visible).map(e=>({id:e.id,title:e.querySelector('h2,h3')?.textContent.trim().slice(0,140),height:Math.round(e.getBoundingClientRect().height),words:e.innerText.split(/\s+/).length,images:e.querySelectorAll('img').length,top:parseFloat(getComputedStyle(e).paddingTop),bottom:parseFloat(getComputedStyle(e).paddingBottom)}));
    const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);
    return {width:innerWidth,height:document.documentElement.scrollHeight,overflow:document.documentElement.scrollWidth-innerWidth,title:document.title,h1:[...document.querySelectorAll('h1')].map(e=>e.textContent.trim()),h2:[...main.querySelectorAll('h2')].map(e=>e.textContent.trim()),words:main.innerText.split(/\s+/).length,sections,images:[...document.images].map(e=>({src:e.getAttribute('src')?.slice(0,250),alt:e.getAttribute('alt'),loaded:e.complete&&e.naturalWidth>0,complete:e.complete,visible:visible(e),loading:e.loading})),duplicateIds:ids.filter((id,i)=>ids.indexOf(id)!==i),missingAnchors:[...document.querySelectorAll('a[href^="#"]')].filter(a=>a.hash&&!document.getElementById(a.hash.slice(1))).map(a=>a.hash),links:[...document.querySelectorAll('a[href]')].map(a=>({href:a.getAttribute('href'),text:a.textContent.trim().slice(0,90)})),unnamedButtons:[...document.querySelectorAll('button')].filter(visible).filter(b=>!b.textContent.trim()&&!b.getAttribute('aria-label')&&!b.getAttribute('title')).length,forms:document.querySelectorAll('form').length,smallText:[...main.querySelectorAll('p')].filter(visible).filter(e=>parseFloat(getComputedStyle(e).fontSize)<14).length,brandKent:/Kent Business College|kentbusinesscollege|\bKBC\b/i.test(main.innerText),canonical:document.querySelector('link[rel="canonical"]')?.href,description:document.querySelector('meta[name="description"]')?.content,robots:document.querySelector('meta[name="robots"]')?.content};
  };
  for(let i=0;i<paths.length;i++) {
    const path=paths[i], key=String(i+1).padStart(2,'0')+'-'+(path==='/'?'home':path.replaceAll('/','-').slice(1));
    const entry={path,key};
    try {
      await viewport(1440);await cdp('Page.navigate',{url:origin+path});
      await eventually(()=>evaluate(`location.pathname===${JSON.stringify(path)} && !!document.querySelector('h1')`),path,15000);
      await evaluate(`document.querySelectorAll('img[loading="lazy"]').forEach(i=>i.loading='eager')`);
      await pause(1000);
      entry.desktop=await evaluate('('+metrics.toString()+')()');await screenshot(key+'-desktop');
      await viewport(768);await pause(120);entry.tablet=await evaluate('('+metrics.toString()+')()');
      await viewport(375);await pause(120);entry.mobile=await evaluate('('+metrics.toString()+')()');await screenshot(key+'-mobile');
      if(['/', '/project-controls-professional/operational-route','/project-controls-professional/strategic-route','/project-controls-professional/chartered-pmo-pathway','/project-controls-professional/construction-route','/project-controls-professional/public-sector-councils-route','/commercial-project-controls-route','/project-controls-professional-level-6'].includes(path)) {
        await viewport(1440);const targets=await evaluate(`[...document.querySelectorAll('main section')].filter(s=>s.getBoundingClientRect().height>300).map(s=>s.offsetTop).filter((_,i)=>i%3===1).slice(0,6)`);
        for(let j=0;j<targets.length;j++){await evaluate(`scrollTo(0,${targets[j]}-175)`);await pause(100);await screenshot(key+'-section-'+(j+1));}
      }
    }catch(e){entry.error=String(e);}
    pages.push(entry);await writeFile(resolve('../docs/project-audit/browser-inventory.json'),JSON.stringify({pages,exceptions},null,2));
    console.log((i+1)+'/'+paths.length+' '+path+(entry.error?' ERROR':' '+entry.desktop.height+'px'));
  }
  console.log('Audit complete: '+pages.length+' routes; exceptions '+exceptions.length);
} finally {
  socket?.close(); browser.kill(); server.closeAllConnections(); server.close();
  assert.ok(resolve(profile).startsWith(resolve(tmpdir()) + sep + 'cpcm-audit-test-'));
  await pause(500); await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 500 }).catch(() => {});
}
