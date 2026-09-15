import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, mkdtemp, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, join, extname, sep, basename } from 'node:path';
import { tmpdir } from 'node:os';
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';

// Compare rendered route content before and after a structural refactor.
// GET responses are frozen in the baseline so changing CMS data cannot mask a regression.
const baseline = process.argv.includes('--baseline');
const output = resolve('.section-refactor');
await mkdir(output, { recursive: true });
const root = resolve('out');
const cachePath = join(output, 'api-baseline.json');
const cache = existsSync(cachePath) ? JSON.parse(await readFile(cachePath, 'utf8')) : {};
const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    if (url.pathname.startsWith('/api/')) {
      assert.equal(req.method, 'GET', 'This check must not write to the API');
      const key = url.pathname + url.search;
      if (!cache[key] && baseline) {
        const remote = await fetch('http://127.0.0.1:8000' + key, { signal: AbortSignal.timeout(10000) });
        cache[key] = { status: remote.status, body: await remote.text() };
      }
      const value = cache[key] || { status: 503, body: '{}' };
      res.statusCode = value.status; res.setHeader('Content-Type', 'application/json'); return res.end(value.body);
    }
    let target = resolve(root, '.' + decodeURIComponent(url.pathname));
    assert.ok(target === root || target.startsWith(root + sep));
    if (!extname(target)) target = join(root, 'index.html');
    const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.woff2': 'font/woff2' };
    res.setHeader('Content-Type', mime[extname(target)] || 'application/octet-stream');
    res.end(await readFile(target));
  } catch { res.statusCode = 503; res.end('{}'); }
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const origin = `http://127.0.0.1:${server.address().port}`;
const profile = await mkdtemp(join(tmpdir(), 'cpcm-section-check-'));
const executable = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(existsSync);
assert.ok(executable, 'Browser executable must be available');
const browser = spawn(executable, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank'], { windowsHide: true, stdio: 'ignore' });
const pause = ms => new Promise(r => setTimeout(r, ms));
let socket;
try {
  let port;
  for (let i = 0; i < 100 && !port; i++) { try { port = (await readFile(join(profile, 'DevToolsActivePort'), 'utf8')).split('\n')[0]; } catch { await pause(100); } }
  assert.ok(port, 'Browser startup');
  const tabs = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  socket = new WebSocket(tabs.find(t => t.type === 'page').webSocketDebuggerUrl);
  await new Promise(r => socket.addEventListener('open', r, { once: true }));
  let sequence = 0; const pending = new Map(); const exceptions = [];
  socket.addEventListener('message', ({ data }) => {
    const message = JSON.parse(data);
    if (message.id) { const call = pending.get(message.id); pending.delete(message.id); if (message.error) call.reject(message.error); else call.resolve(message.result); }
    if (message.method === 'Runtime.exceptionThrown') exceptions.push(message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text);
  });
  const cdp = (method, params = {}) => new Promise((resolve, reject) => { const id = ++sequence; pending.set(id, { resolve, reject }); socket.send(JSON.stringify({ id, method, params })); });
  const evaluate = async expression => { const value = await cdp('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }); if (value.exceptionDetails) throw new Error(value.exceptionDetails.text); return value.result.value; };
  await cdp('Page.enable'); await cdp('Runtime.enable'); await cdp('Network.enable');
  await cdp('Network.setBlockedURLs', { urls: ['https://*'] });
  const routeSource = await readFile('src/router/config.tsx', 'utf8');
  const routes = [...new Set([...routeSource.matchAll(/path:\s*["']([^"']+)["']/g)].map(m => m[1]).filter(route => route !== '*' && !route.includes(':')))];
  routes.push('/articles/refactor-missing-article', '/events/refactor-missing-event', '/mentors/refactor-missing-mentor', '/refactor-not-found');
  for (const [endpoint, prefix] of [['/api/v1/articles/?page=1&page_size=12', '/articles/'], ['/api/v1/events/library/', '/events/'], ['/api/v1/mentors/', '/mentors/']]) {
    const data = cache[endpoint] ? JSON.parse(cache[endpoint].body) : null;
    const sample = Array.isArray(data) ? data[0] : data?.results?.[0];
    if (sample) routes.push(prefix + (sample.slug || sample.id));
  }
  const expected = baseline ? null : JSON.parse(await readFile(join(output, 'dom-baseline.json'), 'utf8'));
  const actual = {}; const failures = [];
  const signature = `(() => { const main = document.querySelector('main') || document.querySelector('#root'); if (!main || !document.querySelector('h1')) return null; const text = value => value.replace(/\\s+/g, ' ').trim(); return { headings: [...main.querySelectorAll('h1,h2,h3')].map(e => [e.tagName, text(e.textContent)]), sections: [...main.querySelectorAll('section')].map(e => e.id), links: [...main.querySelectorAll('a')].map(e => [text(e.textContent), e.getAttribute('href')]), fields: [...main.querySelectorAll('input,select,textarea')].map(e => [e.tagName, e.getAttribute('type'), e.getAttribute('name')]), buttons: [...main.querySelectorAll('button')].map(e => text(e.textContent)), text: text(main.textContent) }; })()`;
  for (const width of [1440, 390]) {
    await cdp('Emulation.setDeviceMetricsOverride', { width, height: 1000, deviceScaleFactor: 1, mobile: width < 768 });
    for (const route of routes) {
      const key = width + ' ' + route; const exceptionStart = exceptions.length;
      await cdp('Page.navigate', { url: origin + route });
      let value;
      for (let i = 0; i < 100; i++) { await pause(100); value = await evaluate(signature).catch(() => null); if (value && !/Loading (article|event|mentor)/i.test(value.text)) break; }
      await pause(300); value = await evaluate(signature).catch(() => null);
      actual[key] = value;
      if (!value) failures.push({ key, reason: 'No rendered page content', exceptions: exceptions.slice(exceptionStart) });
      if (!baseline && JSON.stringify(value) !== JSON.stringify(expected[key])) failures.push({ key, reason: 'Rendered content changed' });
      if (exceptions.length > exceptionStart) failures.push({ key, reason: 'Runtime exception', exceptions: exceptions.slice(exceptionStart) });
    }
    console.log(`Checked ${routes.length} routes at ${width}px.`);
  }
  if (!baseline) {
    const waitFor = async (expression, label) => {
      for (let i = 0; i < 100; i++) { if (await evaluate(expression).catch(() => false)) return; await pause(80); }
      throw new Error(`Interaction timed out: ${label}`);
    };
    const navigate = async (route, selector) => {
      await cdp('Page.navigate', { url: origin + route });
      await waitFor(`location.pathname === ${JSON.stringify(route)} && !!document.querySelector(${JSON.stringify(selector)})`, route);
    };
    const enterSearch = async value => {
      await evaluate(`(() => { const input = document.querySelector('main input[type="search"]'); Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(input, ${JSON.stringify(value)}); input.dispatchEvent(new Event('input', { bubbles: true })); })()`);
      await evaluate(`document.querySelector('main input[type="search"]').closest('form').requestSubmit()`);
      await waitFor(`new URLSearchParams(location.search).get('search') === ${JSON.stringify(value)}`, 'search submission');
    };
    try {
      await navigate('/faq', '#faq-category');
      const category = await evaluate(`(() => { const select = document.getElementById('faq-category'); const option = select.options[1]; select.value = option.value; select.dispatchEvent(new Event('change', { bubbles: true })); return option.textContent.trim(); })()`);
      await waitFor(`[...document.querySelectorAll('main h2')].some(h => h.textContent.trim() === ${JSON.stringify(category)})`, 'mobile FAQ category');
      await cdp('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
      await navigate('/faq', 'aside[aria-label="FAQ categories"] button');
      await evaluate(`document.querySelectorAll('aside[aria-label="FAQ categories"] button')[1].click()`);
      await waitFor(`[...document.querySelectorAll('main h2')].some(h => h.textContent.trim() === ${JSON.stringify(category)})`, 'desktop FAQ category');
      await navigate('/articles', 'main input[type="search"]');
      await enterSearch('section-refactor-check');
      await evaluate(`[...document.querySelectorAll('main button')].find(button => button.textContent.trim() === 'Clear search').click()`);
      await waitFor(`!location.search && document.querySelector('main input[type="search"]').value === ''`, 'clear article search');
      await navigate('/events', 'main input[type="search"]');
      await enterSearch('section-refactor-check');
      await evaluate(`(() => { const select = [...document.querySelectorAll('main select')].find(select => [...select.options].some(option => option.value === 'online')); select.value = 'online'; select.dispatchEvent(new Event('change', { bubbles: true })); })()`);
      await waitFor(`new URLSearchParams(location.search).get('format') === 'online'`, 'event format filter');
      await evaluate(`[...document.querySelectorAll('main button')].find(button => button.textContent.trim() === 'Clear filters').click()`);
      await waitFor(`!location.search && document.querySelector('main input[type="search"]').value === ''`, 'clear event filters');
      assert.equal(exceptions.length, 0, 'No runtime exceptions during interaction checks');
      console.log('Passed mobile/desktop FAQ selection, article search, and event search/filter/reset interactions.');
    } catch (error) { failures.push({ key: 'interactions', reason: error.message }); }
  }
  await writeFile(join(output, baseline ? 'dom-baseline.json' : 'dom-after.json'), JSON.stringify(actual, null, 2));
  if (baseline) await writeFile(cachePath, JSON.stringify(cache));
  await writeFile(join(output, baseline ? 'baseline-failures.json' : 'comparison-failures.json'), JSON.stringify(failures, null, 2));
  assert.equal(failures.length, 0, JSON.stringify(failures));
  console.log(`${baseline ? 'Captured baseline' : 'Matched baseline'}: ${Object.keys(actual).length} route/viewport checks.`);
} finally {
  socket?.close(); browser.kill(); server.close();
  const tempRoot = resolve(tmpdir());
  assert.ok(resolve(profile).startsWith(tempRoot + sep) && basename(profile).startsWith('cpcm-section-check-'), 'Only remove the temporary profile created by this check');
  await pause(400);
  await rm(profile, { recursive: true, force: true, maxRetries: 3, retryDelay: 300 }).catch(() => {});
}
