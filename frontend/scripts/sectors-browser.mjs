import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, mkdtemp, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, join, extname, sep } from 'node:path';
import { tmpdir } from 'node:os';
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';

// Read-only integration checks against the configured local API and built UI.
const output = resolve('../docs/sectors-validation');
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
const profile = await mkdtemp(join(tmpdir(), 'cpcm-sectors-test-'));
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


  for(const [name,slug] of [['construction','construction-route'],['energy','energy-oil-gas-utilities-route'],['engineering','engineering-manufacturing-aerospace-route'],['public-sector','public-sector-councils-route']]) {
    await viewport(1440); await navigate('/project-controls-professional/'+slug);
    await eventually(()=>evaluate(`!!document.querySelector('main header img[src*="${name}-sector-hero"]')`),name);
    await eventually(()=>evaluate(`document.querySelector('main header img').naturalWidth>0`),'hero image');
    assert.equal(await evaluate(`document.querySelector('main header').getBoundingClientRect().height`),800);
    assert.equal(await evaluate(`document.querySelectorAll('h1').length`),1);
    assert.ok(await evaluate(`!/kent business college|kentbusinesscollege|\bKBC\b/i.test(document.querySelector('main').textContent)`));
    const missing=await evaluate(`Array.from(document.querySelectorAll('main a[href^="#"]')).filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.hash)`);
    assert.deepEqual(missing,[],name+' anchors');
    assert.ok(await evaluate(`!document.querySelector('main [style]') && !document.querySelector('main script')`));
    await screenshot(name+'-desktop');
    for(const width of [1440,768,375]) { await viewport(width); await pause(150); assert.ok(await evaluate(`document.documentElement.scrollWidth<=innerWidth+1`),name+' '+width); }
    await screenshot(name+'-mobile'); await viewport(1440);
    await evaluate(`document.querySelector('main details summary').click()`);
    assert.ok(await evaluate(`document.querySelector('main details').open`));
    if(name!=='public-sector') {
      for(let i=0;i<4;i++) {
        await evaluate(`document.querySelectorAll('#pathways button')[${i}].click()`);
        assert.equal(await evaluate(`document.querySelectorAll('#pathways button[aria-pressed="true"]').length`),1);
        assert.ok(await evaluate(`document.querySelector('#sector-pathway-detail a').getAttribute('href').startsWith('/project-controls-professional/')`));
      }
      await evaluate(`document.querySelector('#pathways').scrollIntoView()`);await pause(150);await screenshot(name+'-pathways');
    }
    const target=name==='public-sector'?'#employers':'#outputs';
    await evaluate(`document.querySelector('${target}').scrollIntoView()`);await pause(150);await screenshot(name+'-content');
    await eventually(()=>evaluate(`!!document.getElementById('testimonials')`),'approved testimonials');
    await navigate('/operational-pcp-'+name);
    await eventually(()=>evaluate(`!!document.querySelector('main header img[src*="${name}-sector-hero"]')`),'alias');
    checks.push(name+': 80vh hero, local image, desktop/tablet/mobile, FAQ, working section links, current branding, approved testimonials and canonical/alias routes');
  }
  assert.equal(exceptions.length,0,JSON.stringify(exceptions));
  await writeFile(join(output,'results.json'),JSON.stringify({checks,exceptions},null,2));console.log(JSON.stringify({checks,exceptions},null,2));
} finally {
  socket?.close(); browser.kill(); server.closeAllConnections(); server.close();
  assert.ok(resolve(profile).startsWith(resolve(tmpdir()) + sep + 'cpcm-sectors-test-'));
  await pause(500); await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 500 }).catch(() => {});
}
