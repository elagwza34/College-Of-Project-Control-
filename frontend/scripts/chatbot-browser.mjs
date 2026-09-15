import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { openBrowser, pause } from './lib/browser.mjs';

const origin = process.env.CHATBOT_SITE_ORIGIN || 'http://localhost:3000';
const browser = await openBrowser();
try {
  await browser.cdp('Network.setBlockedURLs', { urls: ['https://*'] });
  await browser.cdp('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await browser.cdp('Page.addScriptToEvaluateOnNewDocument', { source: `
    window.chatTestMode='success';window.chatTestRequests=[];
    localStorage.setItem('cms_token','browser-test-only');
    window.chatTestSources=[];
    const originalFetch=window.fetch.bind(window);
    window.fetch=async (resource,options={})=>{
      const url=String(resource);
      if(url.endsWith('/cms/chatbot/status/'))return new Response(JSON.stringify({configured:false,model:'gpt-4.1-mini',active_sources:window.chatTestSources.filter(x=>x.is_active).length,daily_limit:500}),{headers:{'Content-Type':'application/json'}});
      if(url.endsWith('/cms/chatbot/sources/')){
        if(options.method==='POST'){
          const item={...JSON.parse(options.body),id:1,updated_at:new Date().toISOString()};window.chatTestSources.push(item);
          return new Response(JSON.stringify(item),{status:201,headers:{'Content-Type':'application/json'}});
        }
        return new Response(JSON.stringify(window.chatTestSources),{headers:{'Content-Type':'application/json'}});
      }
      if(url.endsWith('/chatbot/status/'))return new Response(JSON.stringify({available:window.chatTestMode!=='offline'}),{headers:{'Content-Type':'application/json'}});
      if(url.endsWith('/chatbot/chat/')){
        window.chatTestRequests.push(JSON.parse(options.body));
        if(window.chatTestMode==='error')return new Response('{}',{status:503});
        if(window.chatTestMode==='rate')return new Response('{}',{status:429});
        return new Response(JSON.stringify({answer:'Level 4 develops project coordination skills. Funding and eligibility require a College review.',sources:[{title:'Associate Project Manager Level 4',path:'/associate-project-manager-level-4'}],needs_consultation:true}),{headers:{'Content-Type':'application/json'}});
      }
      return originalFetch(resource,options);
    };
  ` });
  await browser.cdp('Page.navigate', { url: origin + '/project-controls-professional-level-6' });
  await browser.waitFor(`!!document.querySelector('.assistant-launcher')`);
  await browser.evaluate(`document.querySelector('.assistant-launcher').click()`);
  await browser.waitFor(`!!document.querySelector('.assistant-prompts button:not(:disabled)')`);
  assert.equal(await browser.evaluate(`document.activeElement.id`), 'assistant-question');
  await browser.evaluate(`document.querySelector('.assistant-prompts button').click()`);
  await browser.waitFor(`!!document.querySelector('.assistant-sources a')`);
  assert.equal(await browser.evaluate(`window.chatTestRequests.length`), 1);
  assert.equal(await browser.evaluate(`document.querySelector('.assistant-sources a').getAttribute('href')`), '/associate-project-manager-level-4');
  await browser.evaluate(`window.chatTestMode='error'; document.querySelector('.assistant-consultation button').click()`);
  await browser.waitFor(`!!document.querySelector('.assistant-prompts button')`);
  await browser.evaluate(`document.querySelector('.assistant-prompts button').click()`);
  await browser.waitFor(`!!document.querySelector('.assistant-error button')`);
  await browser.evaluate(`window.chatTestMode='success';document.querySelector('.assistant-error button').click()`);
  await browser.waitFor(`!!document.querySelector('.assistant-sources a')`);
  assert.equal(await browser.evaluate(`document.querySelectorAll('.assistant-user').length`), 1, 'Retry does not duplicate the user message');
  await browser.evaluate(`document.querySelector('.assistant-consultation button').click();window.chatTestMode='rate'`);
  await browser.waitFor(`!!document.querySelector('.assistant-prompts button')`);
  await browser.evaluate(`document.querySelector('.assistant-prompts button').click()`);
  await browser.waitFor(`document.querySelector('.assistant-error')?.textContent.includes('message limit')`);
  await browser.evaluate(`document.querySelector('.assistant-icon').click();window.chatTestMode='offline'`);
  await browser.waitFor(`!document.querySelector('.assistant-panel')`);
  await browser.evaluate(`document.querySelector('.assistant-launcher').click()`);
  await browser.waitFor(`!!document.querySelector('.assistant-offline')`);
  assert.equal(await browser.evaluate(`document.querySelector('.assistant-composer button').disabled`), true);
  await browser.evaluate(`document.querySelector('.assistant-consultation a').click()`);
  await browser.waitFor(`location.pathname==='/book-a-session' && !document.querySelector('.assistant-panel')`);
  await browser.cdp('Page.navigate', { url: origin + '/associate-project-manager-level-4' });
  await browser.waitFor(`!!document.querySelector('[data-programme-sticky]')`);
  await browser.cdp('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await browser.evaluate(`window.scrollTo(0,1000)`); await pause(700);
  await browser.waitFor(`!!document.querySelector('[data-programme-sticky]:not([inert])')`);
  const overlap = await browser.evaluate(`(()=>{const bar=document.querySelector('[data-programme-sticky]').getBoundingClientRect();const launcher=document.querySelector('.assistant-launcher').getBoundingClientRect();return launcher.bottom>bar.top;})()`);
  assert.equal(overlap, false, 'Assistant does not overlap the sticky CTA');
  await browser.evaluate(`document.querySelector('.assistant-launcher').click()`);
  await browser.waitFor(`!!document.querySelector('.assistant-prompts button:not(:disabled)')`);
  await browser.evaluate(`document.querySelector('.assistant-prompts button').click()`);
  await browser.waitFor(`!!document.querySelector('.assistant-sources a')`);
  const bounds = await browser.evaluate(`(()=>{const r=document.querySelector('.assistant-panel').getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:innerWidth,height:innerHeight};})()`);
  assert.ok(bounds.left>=0 && bounds.right<=bounds.width && bounds.top>=0 && bounds.bottom<=bounds.height, JSON.stringify(bounds));
  await mkdir('.section-refactor', { recursive: true });
  const screenshot = await browser.cdp('Page.captureScreenshot', { format: 'png' });
  await writeFile('.section-refactor/chatbot-mobile.png', Buffer.from(screenshot.data, 'base64'));
  await browser.cdp('Input.dispatchKeyEvent', { type:'keyDown', key:'Escape', code:'Escape' });
  await browser.waitFor(`!document.querySelector('.assistant-panel')`);
  assert.equal(await browser.evaluate(`document.activeElement.classList.contains('assistant-launcher')`), true);
  await browser.cdp('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await browser.evaluate(`document.querySelector('.assistant-launcher').click()`);
  await browser.waitFor(`!!document.querySelector('.assistant-panel')`);
  const desktop = await browser.cdp('Page.captureScreenshot', { format: 'png' });
  await writeFile('.section-refactor/chatbot-desktop.png', Buffer.from(desktop.data, 'base64'));
  await browser.cdp('Page.navigate', { url: origin + '/dashboard/chatbot' });
  await browser.waitFor(`document.querySelector('h1')?.textContent==='Programme assistant' && !!document.querySelector('textarea')`);
  assert.equal(await browser.evaluate(`!!document.querySelector('.assistant-launcher')`), false, 'Public chat is absent from the dashboard');
  await browser.evaluate(`(() => {
    const field=document.querySelector('form input[maxlength="200"]');
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(field,'Can I request a consultation?');field.dispatchEvent(new Event('input',{bubbles:true}));
    const content=document.querySelector('form textarea');
    Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set.call(content,'Request a consultation through the College booking form to discuss your programme.');content.dispatchEvent(new Event('input',{bubbles:true}));
  })()`);
  await pause(100);
  await browser.evaluate(`document.querySelector('form input[type="checkbox"]').click()`);
  await pause(100);
  await browser.evaluate(`document.querySelector('form button[type="submit"]').click()`);
  await browser.waitFor(`document.querySelector('[role="status"]')?.textContent.includes('Source saved')`);
  assert.equal(await browser.evaluate(`window.chatTestSources[0].is_active`), true);
  const dashboard = await browser.cdp('Page.captureScreenshot', { format: 'png' });
  await writeFile('.section-refactor/chatbot-dashboard.png', Buffer.from(dashboard.data, 'base64'));
  assert.equal(browser.events.filter(e=>e.method==='Runtime.exceptionThrown').length, 0);
  console.log('Passed: open/focus, sources, reply, retry, rate limit, offline, consultation handoff, mobile viewport, sticky CTA separation, Escape/focus return, dashboard source creation/activation. APIs mocked; no paid calls or production source writes.');
} finally { await browser.close(); }
