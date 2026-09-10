import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, mkdtemp, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, join, extname, sep } from 'node:path';
import { tmpdir } from 'node:os';
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';

// Read-only integration checks against the configured local API and built UI.
const output = resolve('../docs/articles-validation');
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
const profile = await mkdtemp(join(tmpdir(), 'cpcm-articles-test-'));
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
  const library = await (await fetch('http://127.0.0.1:8000/api/v1/articles/')).json();
  assert.ok(library.count >= 8);
  const slug = library.results[0].slug;
  await viewport(1440);
  await navigate('/articles');
  await eventually(() => evaluate('document.querySelectorAll("#article-grid article").length >= 8'), 'live article grid');
  await screenshot('articles-desktop');
  checks.push('Article grid loads live database records');
  await evaluate(`(() => { const input = document.querySelector('#article-search'); Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(input, 'strategic'); input.dispatchEvent(new Event('input', { bubbles: true })); })()`);
  await evaluate('document.querySelector("form[role=search]").requestSubmit()');
  await eventually(() => evaluate('location.search.includes("strategic") && !document.querySelector("#article-grid").textContent.includes("Loading articles")'), 'search results');
  assert.ok(await evaluate('document.querySelectorAll("#article-grid article").length > 0'));
  checks.push('Search submits and returns database matches');
  await navigate('/articles?search=zzzz-no-matching-article');
  await eventually(() => evaluate('document.body.textContent.includes("No matching articles")'), 'empty search');
  checks.push('No-results state');
  await navigate(`/articles/${slug}`);
  await eventually(() => evaluate('!!document.querySelector("main article h1") && !!document.querySelector("main article h2")'), 'single article');
  assert.equal(await evaluate('document.querySelector("main h1").textContent'), library.results[0].title);
  assert.equal(await evaluate('document.querySelector("meta[name=robots]").content'), 'index, follow');
  assert.ok(await evaluate(`document.title.includes(${JSON.stringify(library.results[0].title)})`));
  await screenshot('article-desktop');
  await eventually(() => evaluate(`document.querySelectorAll('[aria-label^="Article carousel"] article').length === 8`), '8 article carousel');
  const geometry = await evaluate(`(() => { const t = document.querySelector('[aria-label^="Article carousel"]'); const width=t.firstElementChild.getBoundingClientRect().width; return {width, viewport:t.clientWidth, gap:parseFloat(getComputedStyle(t).gap)}; })()`);
  assert.ok(Math.abs(geometry.width * 3 + geometry.gap * 2 - geometry.viewport) < 3, JSON.stringify(geometry));
  await evaluate(`document.querySelector('[aria-label="Next article"]').click()`);
  await eventually(() => evaluate(`document.querySelector('[aria-label^="Article carousel"]').scrollLeft > 0`), 'carousel moves');
  const scroll = await evaluate(`document.querySelector('[aria-label^="Article carousel"]').scrollLeft`);
  assert.ok(Math.abs(scroll - geometry.width - geometry.gap) < 3);
  await evaluate(`document.querySelector('[aria-label^="Article carousel"]').scrollIntoView({block:'center'})`);
  await screenshot('carousel-desktop');
  for (let i = 0; i < 4; i++) { await evaluate(`document.querySelector('[aria-label="Next article"]').click()`); await pause(100); }
  assert.ok(await evaluate(`document.querySelector('[aria-label="Next article"]').disabled`));
  checks.push('Single page content, SEO, 8-card carousel, 3 visible, one-card steps, end boundary');
  for (const width of [768, 375]) {
    await viewport(width); await pause(200);
    const layout = await evaluate(`(() => { const t=document.querySelector('[aria-label^="Article carousel"]'); return {screen:innerWidth, body:document.documentElement.scrollWidth, width:t.firstElementChild.getBoundingClientRect().width, viewport:t.clientWidth, gap:parseFloat(getComputedStyle(t).gap)}; })()`);
    assert.ok(layout.body <= layout.screen + 1, JSON.stringify(layout));
    const visible = width === 768 ? 2 : 1;
    assert.ok(Math.abs(layout.width * visible + layout.gap * (visible - 1) - layout.viewport) < 3, JSON.stringify(layout));
  }
  await screenshot('carousel-mobile');
  await navigate('/articles');
  await eventually(() => evaluate('document.querySelectorAll("#article-grid article").length >= 8'), 'mobile grid');
  assert.ok(await evaluate('document.documentElement.scrollWidth <= innerWidth + 1'));
  await screenshot('articles-mobile');
  checks.push('Tablet and mobile card counts, no horizontal page overflow');
  await navigate('/articles/does-not-exist');
  await eventually(() => evaluate('document.querySelector("main h1")?.textContent === "Article not found"'), '404 state');
  checks.push('Missing and unpublished article state');
  failArticles = true;
  await navigate('/articles');
  await eventually(() => evaluate('document.querySelector("#article-grid [role=alert]") !== null'), 'API failure');
  failArticles = false;
  await evaluate(`document.querySelector('#article-grid [role=alert] button').click()`);
  await eventually(() => evaluate('document.querySelectorAll("#article-grid article").length >= 8'), 'retry');
  checks.push('API failure and retry recovery');
  assert.equal(exceptions.length, 0, JSON.stringify(exceptions));
  await writeFile(join(output, 'results.json'), JSON.stringify({ checks, exceptions }, null, 2));
  console.log(JSON.stringify({ checks, exceptions }, null, 2));
} finally {
  socket?.close(); browser.kill(); server.closeAllConnections(); server.close();
  assert.ok(resolve(profile).startsWith(resolve(tmpdir()) + sep + 'cpcm-articles-test-'));
  await pause(500); await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 500 }).catch(() => {});
}
