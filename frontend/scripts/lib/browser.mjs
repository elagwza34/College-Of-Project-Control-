import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, resolve, sep, basename } from 'node:path';
import { tmpdir } from 'node:os';
import { spawn } from 'node:child_process';

export const pause = ms => new Promise(resolve => setTimeout(resolve, ms));

export async function openBrowser() {
  const executable = process.env.CHROME_PATH || ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].find(existsSync);
  if (!executable) throw new Error('Install Chrome/Chromium or set CHROME_PATH.');
  const profile = await mkdtemp(join(tmpdir(), 'cpcm-browser-'));
  const child = spawn(executable, ['--headless=new', '--disable-gpu', '--no-first-run', '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank'], { windowsHide: true, stdio: 'ignore' });
  let socket;
  const close = async () => {
    socket?.close(); child.kill(); await pause(400);
    if (resolve(profile).startsWith(resolve(tmpdir()) + sep) && basename(profile).startsWith('cpcm-browser-')) {
      await rm(profile, { recursive: true, force: true, maxRetries: 3, retryDelay: 300 }).catch(() => {});
    }
  };
  try {
    let port;
    for (let i = 0; i < 80 && !port; i++) {
      try { port = (await readFile(join(profile, 'DevToolsActivePort'), 'utf8')).split('\n')[0]; } catch { await pause(100); }
    }
    if (!port) throw new Error('Browser did not start.');
    const tabs = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
    socket = new WebSocket(tabs.find(tab => tab.type === 'page').webSocketDebuggerUrl);
    await new Promise(resolve => socket.addEventListener('open', resolve, { once: true }));
    let next = 0;
    const pending = new Map();
    const events = [];
    socket.addEventListener('message', ({ data }) => {
      const value = JSON.parse(data);
      if (value.id) {
        const item = pending.get(value.id);
        if (item) { clearTimeout(item.timer); pending.delete(value.id); value.error ? item.reject(value.error) : item.resolve(value.result); }
      } else events.push(value);
    });
    const cdp = (method, params = {}) => new Promise((resolve, reject) => {
      const id = ++next;
      const timer = setTimeout(() => { pending.delete(id); reject(new Error(`CDP timeout: ${method}`)); }, 15000);
      pending.set(id, { resolve, reject, timer }); socket.send(JSON.stringify({ id, method, params }));
    });
    const evaluate = async expression => {
      const value = await cdp('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
      if (value.exceptionDetails) throw new Error(value.exceptionDetails.exception?.description || value.exceptionDetails.text);
      return value.result.value;
    };
    const waitFor = async (expression, label = expression) => {
      for (let i = 0; i < 100; i++) { if (await evaluate(expression).catch(() => false)) return; await pause(100); }
      throw new Error(`Timed out: ${label}`);
    };
    await cdp('Page.enable'); await cdp('Runtime.enable'); await cdp('Network.enable');
    return { cdp, evaluate, waitFor, close, events };
  } catch (error) { await close(); throw error; }
}
