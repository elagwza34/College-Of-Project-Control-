import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, mkdtemp, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, join, extname, sep } from 'node:path';
import { tmpdir } from 'node:os';
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';

// Read-only integration checks against the configured local API and built UI.
const output = resolve('../docs/operational-validation');
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
    const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
    res.setHeader('Content-Type', mime[extname(path)] || 'application/octet-stream');
    res.end(await readFile(path));
  } catch { res.statusCode = 404; res.end('Not found'); }
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const origin = `http://127.0.0.1:${server.address().port}`;
const profile = await mkdtemp(join(tmpdir(), 'cpcm-operational-test-'));
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
  const source = JSON.parse(await readFile(resolve('../docs/operational-source-tree.json'),'utf8'));
  const normalize = value => value.replace(/\s+/g,' ').trim();
  function sourceText(node) { if(typeof node==='string') return node; if(['svg','style','script'].includes(node.tag)) return ''; return node.children.map(sourceText).join(' '); }
  const expected = source.children.filter(node=>typeof node==='object' && ['header','section'].includes(node.tag));
  await viewport(1440); await navigate('/project-controls-professional/operational-route');
  await eventually(()=>evaluate('document.querySelectorAll("main details").length === 6'),'approved operational content');
  for(const section of expected) { const actual=await evaluate(`document.getElementById(${JSON.stringify(section.attrs.id)}).textContent`); assert.equal(normalize(actual),normalize(sourceText(section)),section.attrs.id); }
  checks.push('Every approved header and section text matches the supplied content, including all credit, funding and assessment notes');
  assert.ok(await evaluate(`!document.querySelector('[class*="kbc-"]') && !document.querySelector('main [style]')`));
  assert.ok(await evaluate(`Array.from(document.querySelectorAll('main a[href^="#"]')).every(a=>document.getElementById(a.hash.slice(1)))`));
  assert.equal(await evaluate('document.querySelectorAll("h1").length'),1);
  assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth+1'));
  await screenshot('operational-desktop');
  for(const width of [768,375]) { await viewport(width); await pause(200); assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth+1')); }
  await screenshot('operational-mobile');
  checks.push('Current design system, valid section anchors, one heading and responsive layout');
  await viewport(1440);
  await evaluate(`document.querySelector('#credit-planning-control summary').click()`);
  assert.ok(await evaluate(`document.querySelector('#credit-planning-control details').open`));
  assert.ok(await evaluate(`document.querySelector('#credit-planning-control').textContent.includes('2 credits')`));
  await evaluate(`document.querySelector('#operational-modules').scrollIntoView({block:'start'})`); await pause(200); await screenshot('operational-credits');
  await evaluate(`document.querySelector('#operational-funding').scrollIntoView({block:'start'})`); await pause(200); await screenshot('operational-funding');
  assert.ok(await evaluate(`document.querySelector('aside[aria-label="Operational Pathway quick enquiry"] a[href^="/book-a-session"]') !== null`));
  const destinations=await evaluate(`Array.from(document.querySelectorAll('main a')).map(a=>a.getAttribute('href'))`);
  assert.ok(destinations.some(href=>href.startsWith('/book-a-session'))); assert.ok(destinations.includes('/apprenticeship-eligibility-checker')); assert.ok(destinations.includes('mailto:office@kentbusinesscollege.com'));
  checks.push('Expandable module outputs, two-credit Planning and Control, working local CTAs and preserved source contact details');
  await eventually(()=>evaluate('document.getElementById("testimonials") !== null'),'programme testimonials');
  await navigate('/operational-pcp'); await eventually(()=>evaluate('document.getElementById("operational-funding") !== null'),'legacy route');
  checks.push('Canonical and alias routes share approved content and retain programme testimonials');
  assert.equal(exceptions.length,0,JSON.stringify(exceptions));
  await writeFile(join(output,'results.json'),JSON.stringify({checks,exceptions},null,2));console.log(JSON.stringify({checks,exceptions},null,2));
} finally {
  socket?.close(); browser.kill(); server.closeAllConnections(); server.close();
  assert.ok(resolve(profile).startsWith(resolve(tmpdir()) + sep + 'cpcm-operational-test-'));
  await pause(500); await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 500 }).catch(() => {});
}
