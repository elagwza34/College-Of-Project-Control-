import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, mkdtemp, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, join, extname, sep } from 'node:path';
import { tmpdir } from 'node:os';
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';

// Read-only integration checks against the configured local API and built UI.
const output = resolve('../docs/events-validation');
await mkdir(output, { recursive: true });
const root = resolve('out');
let fixtureMode = false;
const captures = [];
const terms = [{ id: 1, name: 'Programme', slug: 'programme', kind: 'programme', is_visible: true, order: 0, remote_id: '' }];
const events = Array.from({length: 9}, (_, i) => ({ id: i + 1, slug: `test-event-${i}`, title: `Planning event ${i}`, source: 'eventbrite', source_category: null, classifications: terms, format: 'online', cadence: '', display_summary: 'Explore professional project controls with our team.', description: 'A practical masterclass for project professionals.', image_url: '/images/hero-professional.webp', image_alt: '', starts_at: '2027-05-01T10:00:00Z', ends_at: '2027-05-01T12:00:00Z', timezone: 'Europe/London', location: 'Online', organizer: 'CPCM', state: 'upcoming', sales_status: 'available', price_label: 'Free', is_featured: false, highlights_url: '', booking_url: 'https://www.eventbrite.com/e/123', booking_label: 'Register on Eventbrite', availability_stale: false, last_synced_at: '2026-09-09T12:00:00Z', summary: '', category: '', is_active: true, order: i, public_visible: true, remote_status: 'live', cta_href: 'https://www.eventbrite.com/e/123', cta_label: 'Register', source_url: 'https://www.eventbrite.com/e/123', sync_error: '' }));
const config = { token_saved: false, organization_id: '', public_base_url: '', auto_sync: true, interval_minutes: 15, show_uncategorized: true, connection_ok: false, connection_checked_at: null, last_full_sync: null, worker_online: true, webhook_url: '' };

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    if (fixtureMode && url.pathname.startsWith('/api/v1/')) {
      res.setHeader('Content-Type', 'application/json');
      const send = data => res.end(JSON.stringify(data));
      if (url.pathname === '/api/v1/cms/eventbrite/settings/') {
        if (req.method === 'PATCH') { let body=''; for await (const chunk of req) body += chunk; const payload=JSON.parse(body); captures.push(payload); const {token, clear_token, ...fields}=payload; Object.assign(config, fields); if(token) config.token_saved=true; if(clear_token) config.token_saved=false; }
        return send(config);
      }
      if(url.pathname === '/api/v1/cms/eventbrite/jobs/') return send([]);
      if(url.pathname === '/api/v1/cms/eventbrite/test/') { config.connection_ok=true; return send(config); }
      if(url.pathname === '/api/v1/cms/events/') return send(events.map(e => ({...e, classifications:[1]})));
      if(url.pathname === '/api/v1/cms/event-categories/') return send(terms);
      if(url.pathname === '/api/v1/events/options/') return send(terms);
      if(url.pathname === '/api/v1/events/library/') { const items=events.filter(e => e.slug !== url.searchParams.get('exclude') && (!url.searchParams.get('search') || e.title.includes(url.searchParams.get('search')))); return send({count:items.length,results:items.slice(0,Number(url.searchParams.get('page_size')) || 12),next:null,previous:null}); }
      if(url.pathname.startsWith('/api/v1/events/')) { const item=events.find(e => url.pathname === `/api/v1/events/${e.slug}/`); if(!item) res.statusCode=404; return send(item || {}); }
      return send([]);
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
  } catch { res.statusCode = 404; res.end('Not found'); }
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const origin = `http://127.0.0.1:${server.address().port}`;
const profile = await mkdtemp(join(tmpdir(), 'cpcm-events-test-'));
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
  const live = await (await fetch('http://127.0.0.1:8000/api/v1/events/library/')).json();
  assert.equal(typeof live.count, 'number');
  await viewport(1440); await navigate('/events');
  await eventually(() => evaluate('document.querySelector("main")?.textContent.includes("events found") || document.querySelector("main")?.textContent.includes("event found")'), 'live events API');
  await screenshot('events-live'); checks.push('Public grid loads real database events');
  fixtureMode = true;
  await navigate('/events');
  await eventually(() => evaluate('document.querySelectorAll("main article").length === 9'), 'fixture grid');
  await screenshot('events-grid');
  await evaluate(`(() => { const input=document.querySelector('input[type=search]'); Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(input,'event 8'); input.dispatchEvent(new Event('input',{bubbles:true})); })()`);
  await evaluate('document.querySelector("main form").requestSubmit()');
  await eventually(() => evaluate('document.querySelectorAll("main article").length === 1'), 'search');
  checks.push('Search and grid using isolated fixtures');
  await navigate('/events/test-event-0');
  await eventually(() => evaluate('document.title === "Planning event 0 | CPCM Events"'), 'event SEO');
  await eventually(() => evaluate(`document.querySelectorAll('[aria-label^="Event carousel"] article').length === 8`), 'carousel');
  assert.ok(await evaluate('document.querySelector("main aside").textContent.includes("11:00")'));
  assert.ok(await evaluate('JSON.parse(document.getElementById("site-route-schema").textContent)["@type"] === "Event"'));
  const geometry = await evaluate(`(() => { const t=document.querySelector('[aria-label^="Event carousel"]'); return {width:t.firstElementChild.getBoundingClientRect().width, viewport:t.clientWidth, gap:parseFloat(getComputedStyle(t).gap)}; })()`);
  assert.ok(Math.abs(geometry.width*3+geometry.gap*2-geometry.viewport)<3);
  await evaluate(`document.querySelector('[aria-label="Next event"]').click()`);
  await eventually(() => evaluate(`document.querySelector('[aria-label^="Event carousel"]').scrollLeft > 0`), 'one card scroll');
  assert.ok(Math.abs(await evaluate(`document.querySelector('[aria-label^="Event carousel"]').scrollLeft`)-geometry.width-geometry.gap)<3);
  await screenshot('event-detail'); checks.push('Detail, timezone, Event SEO, three of eight carousel and one-card step');
  for(const width of [768,375]) { await viewport(width); await pause(200); const layout=await evaluate(`(() => {const t=document.querySelector('[aria-label^="Event carousel"]');return {width:t.firstElementChild.getBoundingClientRect().width,viewport:t.clientWidth,gap:parseFloat(getComputedStyle(t).gap),body:document.documentElement.scrollWidth,screen:innerWidth};})()`); const count=width===768?2:1; assert.ok(Math.abs(layout.width*count+layout.gap*(count-1)-layout.viewport)<3); assert.ok(layout.body<=layout.screen+1); }
  await screenshot('event-mobile'); checks.push('Responsive carousel and no mobile overflow');
  await navigate('/events/missing'); await eventually(() => evaluate('document.querySelector("main h1").textContent === "Event not available"'), 'missing event');
  await evaluate(`localStorage.setItem('cms_token','isolated-browser-test')`);
  await viewport(1440); await cdp('Page.navigate',{url:origin+'/dashboard/events'});
  await eventually(() => evaluate('document.querySelectorAll("[role=tab]").length === 4'), 'dashboard');
  await evaluate(`Array.from(document.querySelectorAll('[role=tab]')).find(e=>e.textContent==='Eventbrite connection').click()`);
  await eventually(() => evaluate('document.querySelector("input[type=password]") !== null'), 'settings');
  await evaluate(`(() => { const input=document.querySelector('input[type=password]'); Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(input,'fake-browser-test-token'); input.dispatchEvent(new Event('input',{bubbles:true})); })()`);
  await evaluate('document.querySelector("form").requestSubmit()');
  await eventually(() => evaluate('document.body.textContent.includes("Settings saved")'), 'save settings');
  assert.equal(captures[0].token,'fake-browser-test-token');
  assert.equal(await evaluate('document.querySelector("input[type=password]").value'),'');
  assert.ok(await evaluate('document.querySelector("input[type=password]").placeholder.includes("Token saved")'));
  await screenshot('eventbrite-settings'); checks.push('Dashboard credentials save and clear password using isolated API, no live credentials changed');
  assert.equal(exceptions.length,0,JSON.stringify(exceptions));
  await writeFile(join(output,'results.json'),JSON.stringify({checks,exceptions},null,2)); console.log(JSON.stringify({checks,exceptions},null,2));
} finally {
  socket?.close(); browser.kill(); server.closeAllConnections(); server.close();
  assert.ok(resolve(profile).startsWith(resolve(tmpdir()) + sep + 'cpcm-events-test-'));
  await pause(500); await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 500 }).catch(() => {});
}
