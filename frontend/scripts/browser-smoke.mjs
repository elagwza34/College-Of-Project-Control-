import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, mkdtemp, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, join, extname, sep } from 'node:path';
import { tmpdir } from 'node:os';
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';

// Isolated production-build browser test. All API traffic is local fixture data;
// no real enquiries, CMS records, emails or external registrations are created.
const ipcOnly = process.argv.includes('--ipc-only');
const output = resolve(ipcOnly ? '../docs/ipc-images-validation' : '../docs/frontend-improvement-work');
await mkdir(output, { recursive: true });
const root = resolve('out');
const results = { routes: [], journeys: [], exceptions: [], failures: [], externalServicesTested: false };
const fixtures = {
  mentors: [{ id: 1, name: 'Fixture Mentor', initials: 'FM', role: 'Project controls mentor', affiliation: 'Test fixture', specialties: ['Planning'], body: 'A test-only mentor profile.', imageUrl: '/images/hero-professional.webp', linkedinUrl: '' }],
  coaches: [{ id: 1, name: 'Fixture Coach', initials: 'FC', qualification: 'Test fixture', focus: 'Study support', imageUrl: '/images/hero-professional.webp' }],
  partners: [{ id: 1, name: 'Fixture partner', imageUrl: '/images/cpcm-logo-dark.webp', linkUrl: '' }],
  sectors: [{ id: 1, slug: 'construction', title: 'Construction', description: 'Test fixture', icon: 'ri-building-line', imageUrl: '/images/hero-professional.webp', linkUrl: '/project-controls-professional/construction-route' }],
  'professional-credentials': [{ id: 1, name: 'Fixture credential', role: 'Test fixture only', imageUrl: '/images/ipc-logo.webp', linkUrl: '' }],
  events: [{ id: 1, title: 'Fixture information session', category: 'Information Session', format: 'Online', cadence: 'Contact us for dates', description: 'Browser test fixture', ctaLabel: 'Register your interest', ctaHref: '/contact?context=fixture-event' }],
};
let ipcImages = [{ id: 1, image_url: '/images/hero-professional.webp', alt_text: 'Fixture IPC image', order: 0, is_active: true }];
let apiMode = 'data'; let postMode = 'success'; let posts = 0;
const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    if (url.pathname.startsWith('/api/')) {
      res.setHeader('Content-Type', 'application/json');
      if (req.method === 'POST' && url.pathname === '/api/v1/enquiries/') {
        posts++; for await (const chunk of req) { /* drain the synthetic payload */ }
        await new Promise(r => setTimeout(r, 400));
        res.statusCode = postMode === 'fail' ? 503 : 201;
        return res.end(JSON.stringify(postMode === 'malformed' ? {} : postMode === 'fail' ? { detail: 'Fixture failure' } : { id: 1234 }));
      }
      if (apiMode === 'error') { res.statusCode = 503; return res.end('{}'); }
      if (url.pathname.startsWith('/api/v1/cms/ipc-images/')) {
        const id=Number(url.pathname.split('/').filter(Boolean).at(-1));
        if(req.method==='POST' || req.method==='PATCH') {
          let body=''; for await(const chunk of req) body+=chunk;
          const payload=JSON.parse(body);
          if(req.method==='POST') { const item={...payload,id:Math.max(0,...ipcImages.map(i=>i.id))+1}; ipcImages.push(item); res.statusCode=201; return res.end(JSON.stringify(item)); }
          ipcImages=ipcImages.map(item=>item.id===id?{...item,...payload}:item); return res.end(JSON.stringify(ipcImages.find(item=>item.id===id)));
        }
        if(req.method==='DELETE') { ipcImages=ipcImages.filter(item=>item.id!==id); res.statusCode=204; return res.end(); }
        return res.end(JSON.stringify([...ipcImages].sort((a,b)=>a.order-b.order||a.id-b.id)));
      }
      if (url.pathname==='/api/v1/ipc-images/') return res.end(JSON.stringify(apiMode==='empty'?[]:ipcImages.filter(item=>item.is_active).sort((a,b)=>a.order-b.order||a.id-b.id)));
      if (url.pathname.includes('/cms/')) return res.end('[]');
      const parts = url.pathname.split('/').filter(Boolean);
      const collection = fixtures[parts[2]] || [];
      return res.end(JSON.stringify(parts.length > 3 ? collection[0] || {} : apiMode === 'empty' ? [] : collection));
    }
    const file = resolve(root, '.' + decodeURIComponent(url.pathname));
    if (file !== root && !file.startsWith(root + sep)) { res.statusCode = 403; return res.end(); }
    const target = extname(file) ? file : join(root, 'index.html');
    const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.json': 'application/json' };
    res.setHeader('Content-Type', mime[extname(target)] || 'application/octet-stream');
    res.end(await readFile(target));
  } catch { res.statusCode = 404; res.end('Not found'); }
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const origin = `http://127.0.0.1:${server.address().port}`;
const profile = await mkdtemp(join(tmpdir(), 'cpcm-browser-smoke-'));
const executable = process.env.CHROME_PATH || ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(existsSync);
assert.ok(executable, 'Chrome or Edge must be installed');
const browser = spawn(executable, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank'], { windowsHide: true, stdio: ['ignore', 'ignore', 'pipe'] });
let socket;
const pause = ms => new Promise(r => setTimeout(r, ms));
async function eventually(fn, label, timeout = 10000) {
  const deadline = Date.now() + timeout; let last;
  while (Date.now() < deadline) { try { last = await fn(); if (last) return last; } catch {} await pause(75); }
  throw new Error(`Timed out: ${label}; last=${JSON.stringify(last)}`);
}
try {
  const debugPort = await eventually(async () => (await readFile(join(profile, 'DevToolsActivePort'), 'utf8')).split('\n')[0], 'browser startup');
  const tabs = await (await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json();
  socket = new WebSocket(tabs.find(t => t.type === 'page').webSocketDebuggerUrl);
  await new Promise(r => socket.addEventListener('open', r, { once: true }));
  let counter = 0; const pending = new Map();
  socket.addEventListener('message', ({ data }) => {
    const message = JSON.parse(data);
    if (message.id) { const p = pending.get(message.id); pending.delete(message.id); if (message.error) p?.reject(message.error); else p?.resolve(message.result); }
    if (message.method === 'Runtime.exceptionThrown') results.exceptions.push(message.params.exceptionDetails);
  });
  const cdp = (method, params = {}) => new Promise((resolve, reject) => { const id = ++counter; pending.set(id, { resolve, reject }); socket.send(JSON.stringify({ id, method, params })); });
  const evaluate = async expression => {
    const data = await cdp('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (data.exceptionDetails) throw new Error(data.exceptionDetails.text + ': ' + data.exceptionDetails.exception?.description);
    return data.result.value;
  };
  await cdp('Page.enable'); await cdp('Runtime.enable'); await cdp('Network.enable');
  // External stock imagery, fonts and event services are deliberately outside
  // this deterministic smoke test. Local optimized assets render normally.
  await cdp('Network.setBlockedURLs', { urls: ['https://*', 'http://readdy.ai/*'] });
  await cdp('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  const viewport = width => cdp('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 768 });
  const navigate = async path => {
    await cdp('Page.navigate', { url: origin + path });
    await eventually(() => evaluate(`location.origin === ${JSON.stringify(origin)} && document.readyState !== 'loading' && !!document.querySelector('h1') && !document.querySelector('.page-loader')`), path);
    await pause(160);
  };
  const screenshot = async name => { const shot = await cdp('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false }); await writeFile(join(output, name + '.png'), Buffer.from(shot.data, 'base64')); };
  const inspect = () => evaluate(`(() => {
    const ids = [...document.querySelectorAll('[id]')].map(n => n.id);
    const local = [...document.querySelectorAll('a[href]')].filter(a => a.origin === location.origin && a.pathname === location.pathname && a.hash && a.hash !== '#');
    return { path: location.pathname, width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
      h1: [...document.querySelectorAll('h1')].map(n => n.textContent.trim()), titleCount: document.querySelectorAll('title').length,
      canonicalCount: document.querySelectorAll('link[rel=canonical]').length,
      duplicateIds: ids.filter((id,i) => ids.indexOf(id) !== i),
      missingAnchors: [...new Set(local.filter(a => !document.getElementById(decodeURIComponent(a.hash.slice(1)))).map(a => a.hash))],
      ids, localLinks: [...document.querySelectorAll('a[href]')].filter(a=>a.origin===location.origin).map(a=>a.pathname+a.hash),
      missingAlts: document.querySelectorAll('img:not([alt])').length,
      errorBoundary: document.body.textContent.includes('This page could not load'),
      overflow: [...document.querySelectorAll('main *,#main-content *')].filter(n => {const r=n.getBoundingClientRect();return r.width && r.right>innerWidth+2 && getComputedStyle(n).position!=='absolute';}).slice(0,8).map(n=>({tag:n.tagName,cls:n.className,text:n.textContent.slice(0,70)})) };
  })()`);
  const config = await readFile('src/router/config.tsx', 'utf8');
  const paths = ipcOnly ? ['/','/programmes'] : [...new Set([...config.matchAll(/path:\s*["']([^"']+)["']/g)].map(m => m[1]).filter(p => p !== '*').map(p => p.replace(':id', '1')))];
  for (const width of [1440, 375]) {
    await viewport(width);
    for (const path of paths) {
      try {
        await navigate(path); const check = await inspect(); check.requestedPath = path; results.routes.push(check);
        if (check.scrollWidth > width + 2 || check.errorBoundary || check.h1.length !== 1 || check.duplicateIds.length || check.missingAnchors.length || check.missingAlts || check.titleCount !== 1 || check.canonicalCount !== 1) results.failures.push({ path, width, check });
      } catch (error) { results.failures.push({ path, width, error: String(error) }); }
    }
    await navigate('/'); await screenshot(`home-${width}`);
    console.log(`Scanned ${paths.length} public routes at ${width}px`);
  }
  async function journey(name, fn) { try { await fn(); results.journeys.push({ name, passed: true }); } catch (error) { results.journeys.push({ name, passed: false, error: String(error) }); results.failures.push({ name, error: String(error) }); } }
  if (!ipcOnly) {
  await journey('Mobile menu focus, Escape and restore', async () => {
    await navigate('/'); await evaluate(`document.querySelector('[aria-controls="mobile-navigation"]').focus();document.activeElement.click()`);
    assert.equal(await evaluate(`document.querySelector('#mobile-navigation').open && document.activeElement.textContent === 'Close'`), true);
    await evaluate(`const links=[...document.querySelectorAll('#mobile-navigation a')];links.at(-1).focus()`);
    await cdp('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
    assert.equal(await evaluate(`!!document.activeElement.closest('dialog')`), true);
    await cdp('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
    await eventually(() => evaluate(`!document.querySelector('#mobile-navigation').open`), 'dialog closed');
    assert.equal(await evaluate(`document.activeElement.getAttribute('aria-controls')`), 'mobile-navigation');
  });
  await journey('Form validity, failed response, malformed response, pending guard and real receipt', async () => {
    await navigate('/book-a-session');
    const before = posts;
    await evaluate(`document.querySelector('form').requestSubmit()`); await pause(100); assert.equal(posts, before);
    await evaluate(`document.querySelector('input[name=name]').value='Browser Fixture';document.querySelector('input[name=email]').value='fixture@example.test'`);
    postMode = 'fail'; await evaluate(`document.querySelector('form').requestSubmit()`);
    await eventually(() => evaluate(`!!document.querySelector('[role=alert]')`), 'form error');
    assert.equal(await evaluate(`document.querySelector('input[name=name]').value`), 'Browser Fixture');
    assert.equal(await evaluate(`document.body.textContent.includes('Your request has been received')`), false);
    postMode = 'malformed'; await evaluate(`document.querySelector('form').requestSubmit()`); await pause(600);
    assert.equal(await evaluate(`document.body.textContent.includes('Your request has been received')`), false);
    postMode = 'success'; const count = posts;
    await evaluate(`document.querySelector('form').requestSubmit();document.querySelector('form').requestSubmit()`);
    assert.equal(await evaluate(`document.querySelector('button[type=submit]').disabled`), true);
    await eventually(() => evaluate(`document.body.textContent.includes('Reference 1234')`), 'receipt');
    assert.equal(posts, count + 1); await screenshot('consultation-received');
  });
  await journey('Direct thank-you visit is neutral', async () => {
    await navigate('/thank-you/consultation');
    assert.equal(await evaluate(`document.body.textContent.includes('Your request has been received')`), false);
    assert.equal(await evaluate(`document.body.textContent.includes('No completed request to display')`), true);
  });
  await journey('Footer update request never claims an active subscription', async () => {
    await navigate('/'); postMode='fail';
    await evaluate(`document.querySelector('#newsletter-email').value='fixture@example.test';document.querySelector('#newsletter-form').requestSubmit()`);
    await eventually(()=>evaluate(`!!document.querySelector('#newsletter-form').parentElement.querySelector('[role=alert]')`),'footer error');
    assert.equal(await evaluate(`document.querySelector('#newsletter-email').value`),'fixture@example.test');
    postMode='success'; const count=posts;
    await evaluate(`document.querySelector('#newsletter-form').requestSubmit();document.querySelector('#newsletter-form').requestSubmit()`);
    await eventually(()=>evaluate(`document.body.textContent.includes('Your update request has been received')`),'footer receipt');
    assert.equal(posts,count+1);
    assert.equal(await evaluate(`document.body.textContent.includes('Thank you for subscribing')`),false);
  });
  await journey('Client-side navigation and cross-page anchor focus', async () => {
    await navigate('/'); await viewport(1440);
    await evaluate(`window.__navigationMarker='same-document';[...document.querySelectorAll('nav a')].find(a=>a.pathname==='/programmes').click()`);
    await eventually(() => evaluate(`location.pathname==='/programmes' && document.activeElement.id==='main-content' && !document.querySelector('.page-loader')`), 'route focus');
    assert.equal(await evaluate(`window.__navigationMarker`), 'same-document');
    await navigate('/project-controls-professional-level-6#pathways');
    await eventually(() => evaluate(`document.activeElement.id==='pathways'`), 'cross-page anchor focus');
    await viewport(375);
  });
  await journey('CMS public error, retry and empty states', async () => {
    apiMode = 'error'; await navigate('/');
    await eventually(() => evaluate(`[...document.querySelectorAll('button')].some(b=>/try again/i.test(b.textContent))`), 'public error state');
    apiMode = 'empty'; await evaluate(`[...document.querySelectorAll('button')].filter(b=>/try again/i.test(b.textContent)).forEach(b=>b.click())`); await pause(300);
    assert.equal(await evaluate(`[...document.querySelectorAll('button')].some(b=>/try again/i.test(b.textContent))`), false);
    apiMode = 'data';
  });
  await journey('Eligibility validation announces and focuses missing answer', async () => {
    await navigate('/apprenticeship-eligibility-checker');
    await evaluate(`[...document.querySelectorAll('button')].find(b=>b.textContent.includes('Start Check')).click()`);
    await evaluate(`[...document.querySelectorAll('#checker button')].find(b=>/continue|next/i.test(b.textContent)).click()`);
    await eventually(() => evaluate(`document.activeElement.getAttribute('aria-invalid')==='true'`), 'invalid question focus');
  });
  await journey('Dashboard mobile navigation and API failure', async () => {
    await evaluate(`localStorage.setItem('cms_token','browser-fixture')`); await navigate('/dashboard');
    await evaluate(`[...document.querySelectorAll('button')].find(b=>b.textContent==='Dashboard menu').click()`);
    assert.equal(await evaluate(`!!document.querySelector('dialog[open]')`), true);
    await cdp('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
    apiMode = 'error'; await navigate('/dashboard/partners');
    await eventually(() => evaluate(`!!document.querySelector('[role=alert]')`), 'CMS error');
    apiMode = 'data';
  });
  await viewport(320); await navigate('/book-a-session');
  results.routes.push(await inspect()); await screenshot('consultation-320');
  for (const path of ['/programmes','/apprenticeship-eligibility-checker','/project-controls-professional/construction-route','/dashboard/media']) {
    await viewport(768); await navigate(path); const check=await inspect(); results.routes.push(check);
    if (check.scrollWidth>770 || check.errorBoundary) results.failures.push({ path, width:768, check });
  }
  }
  await journey('Trusted logos move left continuously with a seamless repeat', async () => {
    for (const width of [1440, 375]) {
      await viewport(width);
      for (const motion of ['no-preference', 'reduce']) {
        await cdp('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: motion }] });
        await navigate('/');
        await eventually(() => evaluate(`!!document.querySelector('.trusted-logos-track')`), 'trusted logos loaded');
        const measure = () => evaluate(`(() => {
          const track = document.querySelector('.trusted-logos-track');
          const groups = track.children;
          const css = getComputedStyle(track);
          return { x: new DOMMatrixReadOnly(css.transform).m41, repeat: css.animationIterationCount,
            half: groups[0].getBoundingClientRect().width, total: track.getBoundingClientRect().width,
            window: document.querySelector('.trusted-logos-window').clientWidth,
            gap: groups[1].getBoundingClientRect().left - groups[0].getBoundingClientRect().right,
            overflow: document.documentElement.scrollWidth > innerWidth };
        })()`);
        await evaluate(`document.querySelector('.trusted-logos').scrollIntoView({block:'center'})`);
        const before = await measure();
        await pause(300);
        const after = await measure();
        assert.ok(after.x < before.x - 1, `Logos must move left at ${width}px (${motion})`);
        assert.equal(after.repeat, 'infinite');
        assert.equal(after.total, after.half * 2);
        assert.ok(Math.abs(after.gap) < 0.01, 'Repeat groups must meet without a visible gap');
        assert.ok(after.half >= after.window);
        assert.equal(after.overflow, false);
      }
      await screenshot(`trusted-logos-${width}`);
    }
  });
  await journey('IPC image links: add, edit, hide, delete, empty state and continuous movement', async () => {
    await navigate('/'); await evaluate(`localStorage.setItem('cms_token','browser-fixture')`);
    await navigate('/dashboard/ipc-images');
    await eventually(()=>evaluate(`document.querySelectorAll('article').length===1`),'IPC editor list');
    await evaluate(`document.querySelector('#ipc-new-url').value=${JSON.stringify(origin+'/images/ipc-logo.webp')};document.querySelector('#ipc-new-alt').value='Added IPC fixture';document.querySelector('form[aria-label="Add IPC image"]').requestSubmit()`);
    await eventually(()=>evaluate(`document.querySelectorAll('article').length===2`),'IPC image added');
    await screenshot('ipc-dashboard');
    await navigate('/');
    assert.equal(await evaluate(`!!document.querySelector('#ipc-authority img[alt="Added IPC fixture"]')`),true);
    assert.equal(await evaluate(`[...document.querySelectorAll('#ipc-authority button')].some(b=>/play images|pause images/i.test(b.textContent))`),false);
    for (const width of [1440,375]) {
      await viewport(width);
      for (const motion of ['no-preference','reduce']) {
        await cdp('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:motion}]});
        const point=await evaluate(`(() => {const el=document.querySelector('.ipc-portrait-mask');el.scrollIntoView({block:'center'});const r=el.getBoundingClientRect();document.querySelector('.animate-ipc-portraits').getAnimations()[0].currentTime=1000;return {x:r.left+r.width/2,y:r.top+r.height/2};})()`);
        await cdp('Input.dispatchMouseEvent',{type:'mouseMoved',x:point.x,y:point.y});
        const before=await evaluate(`new DOMMatrix(getComputedStyle(document.querySelector('.animate-ipc-portraits')).transform).m41`);
        await pause(350);
        const after=await evaluate(`new DOMMatrix(getComputedStyle(document.querySelector('.animate-ipc-portraits')).transform).m41`);
        assert.ok(after<before-1,`IPC must move left while hovered at ${width}px (${motion}): ${before} -> ${after}`);
        assert.equal(await evaluate(`getComputedStyle(document.querySelector('.animate-ipc-portraits')).animationIterationCount`),'infinite');
      }
    }
    await evaluate(`document.querySelector('.ipc-portrait-mask').scrollIntoView({block:'center'})`);
    await screenshot('ipc-mobile');
    await navigate('/dashboard/ipc-images');
    await evaluate(`document.querySelector('#ipc-2-alt').value='Edited IPC fixture';document.querySelector('#ipc-2-url').closest('form').requestSubmit()`);
    await eventually(()=>ipcImages.some(i=>i.alt_text==='Edited IPC fixture'),'IPC edit stored');
    await navigate('/'); assert.equal(await evaluate(`!!document.querySelector('#ipc-authority img[alt="Edited IPC fixture"]')`),true);
    await navigate('/dashboard/ipc-images');
    await evaluate(`const f=document.querySelector('#ipc-2-url').closest('form');f.querySelector('[name=is_active]').checked=false;f.requestSubmit()`);
    await eventually(()=>ipcImages.find(i=>i.id===2)?.is_active===false,'IPC hidden');
    await navigate('/'); assert.equal(await evaluate(`!!document.querySelector('#ipc-authority img[alt="Edited IPC fixture"]')`),false);
    await navigate('/dashboard/ipc-images');
    await evaluate(`window.confirm=()=>true;[...document.querySelectorAll('article button')].find(b=>b.textContent==='Remove image').click()`);
    await eventually(()=>ipcImages.length===1,'IPC deletion');
    await eventually(()=>evaluate(`document.querySelectorAll('article').length===1`),'IPC deletion reflected');
    await evaluate(`[...document.querySelectorAll('article button')].find(b=>b.textContent==='Remove image').click()`);
    await eventually(()=>ipcImages.length===0,'all IPC images removed');
    await navigate('/'); assert.equal(await evaluate(`!!document.querySelector('.animate-ipc-portraits')`),false);
  });
  const known = new Map(results.routes.filter(r=>r.width===1440).map(r=>[r.requestedPath,r]));
  for (const route of ipcOnly ? [] : results.routes.filter(r=>r.width===1440)) {
    for (const href of new Set(route.localLinks)) {
      const [path, hash] = href.split('#');
      if (/\.[a-z0-9]+$/i.test(path) || path.startsWith('/dashboard')) continue;
      const target=known.get(path);
      if (!target || (hash && !target.ids.includes(decodeURIComponent(hash)))) results.failures.push({ from:route.path, href, reason:target?'Missing cross-page anchor':'Unknown internal route' });
    }
  }
} catch (error) { results.failures.push({ fatal: String(error) }); }
finally {
  if (socket?.readyState === WebSocket.OPEN) socket.close();
  browser.kill(); server.closeAllConnections(); server.close();
  await writeFile(join(output, 'browser-results.json'), JSON.stringify(results, null, 2));
  // Only this freshly generated profile may be removed, never an existing profile.
  assert.ok(resolve(profile).startsWith(resolve(tmpdir()) + sep + 'cpcm-browser-smoke-'));
  await pause(1000); await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 500 }).catch(() => {});
}
console.log(JSON.stringify({ routeChecks: results.routes.length, journeys: results.journeys, failures: results.failures.length, exceptions: results.exceptions.length }, null, 2));
if (results.failures.length || results.exceptions.length) process.exitCode = 1;
