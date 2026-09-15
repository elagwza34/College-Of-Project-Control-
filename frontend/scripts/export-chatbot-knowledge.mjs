// Export rendered public programme copy, never dashboard data, forms or visitor input.
import { writeFile } from 'node:fs/promises';
import { openBrowser, pause } from './lib/browser.mjs';

const origin = process.env.CHATBOT_SITE_ORIGIN || 'http://localhost:3000';
const routes = ['/programmes', '/associate-project-manager-level-4', '/project-controls-professional-level-6',
  '/project-controls-professional/strategic-route', '/project-controls-professional/operational-route',
  '/project-controls-professional/pmo-governance-route', '/project-controls-professional/chartered-pmo-pathway',
  '/commercial-project-controls-route', '/apprenticeship-eligibility-checker', '/employers', '/book-a-session',
  '/knowledge-hub/employer-apprenticeship-funding', '/knowledge-hub/commercial-routes-explained', '/faq'];
const browser = await openBrowser();
try {
  await browser.cdp('Network.setBlockedURLs', { urls: ['https://*'] });
  await browser.cdp('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  const sources = [];
  for (const route of routes) {
    await browser.cdp('Page.navigate', { url: origin + route });
    await browser.waitFor(`!!document.querySelector('#main-content h1')`, route);
    await pause(500);
    // Include expanded FAQ bodies and content in all topic categories.
    const count = route === '/faq' ? await browser.evaluate(`document.querySelector('#faq-category')?.options.length || 1`) : 1;
    for (let index = 0; index < count; index++) {
      if (route === '/faq') {
        await browser.evaluate(`(() => {const select=document.querySelector('#faq-category'); if(select){select.selectedIndex=${index};select.dispatchEvent(new Event('change',{bubbles:true}));}})()`);
        await pause(100);
      }
      await browser.evaluate(`document.querySelectorAll('main details').forEach(e=>e.open=true)`);
      const result = await browser.evaluate(`(() => {
        const main=document.querySelector('main') || document.querySelector('#main-content'); const clone=main.cloneNode(true);
        clone.querySelectorAll('nav,footer,form,script,style,input,textarea,select,[role="dialog"],[data-programme-sticky]').forEach(e=>e.remove());
        clone.querySelectorAll('br').forEach(e=>e.replaceWith(' '));
        clone.querySelectorAll('h1,h2,h3,h4,p,li,div,section,article,summary,a,span').forEach(e=>e.append(' '));
        return {title: main.querySelector('h1').innerText.replace(/\\s+/g,' ').trim(), content: clone.textContent.replace(/\\s+/g,' ').trim()};
      })()`);
      if (result.title.includes('Page not found') || result.content.length < 100 || result.content.length > 80000) throw new Error(`Invalid page export: ${route}`);
      const suffix = count > 1 ? ' — ' + await browser.evaluate(`document.querySelector('#faq-category').selectedOptions[0].textContent.trim()`) : '';
      sources.push({ title: result.title.slice(0, 180) + suffix, reference_path: route,
        import_key: `website:${route}${count > 1 ? ':' + index : ''}`, content: result.content });
    }
    console.log(`Exported ${route}`);
  }
  const output = '../backend/apps/chatbot/website_knowledge.json';
  await writeFile(output, JSON.stringify({ exported_at: new Date().toISOString(), sources }, null, 2) + '\n');
  console.log(`Saved ${sources.length} sources. Review the snapshot, then run import_chatbot_website.`);
} finally { await browser.close(); }
