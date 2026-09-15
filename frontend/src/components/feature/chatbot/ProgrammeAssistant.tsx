import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SiteLink from '@/components/base/SiteLink';
import { getChatStatus, sendChat, type ChatTurn } from '@/services/chatbotApi';
import './programme-assistant.css';
import ChatIcon from './ChatIcon';

const prompts = ['Which programme suits my role?', 'How does funding work?', 'What are the eligibility requirements?'];

export default function ProgrammeAssistant() {
  const [open, setOpen] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [messages, setMessages] = useState<ChatTurn[]>([]);
  const [draft, setDraft] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState('');
  const [bottom, setBottom] = useState(20);
  const launcher = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const request = useRef<AbortController | null>(null);
  const { pathname } = useLocation();

  useEffect(() => () => request.current?.abort(), []);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); launcher.current?.focus(); }
    };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, [open]);
  useEffect(() => {
    // Lift the assistant above the programme CTA bar instead of covering it.
    const update = () => {
      const bar = document.querySelector<HTMLElement>('[data-programme-sticky]:not([inert])');
      setBottom(bar ? bar.offsetHeight + 12 : 20);
    };
    const observer = new MutationObserver(update);
    observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['inert'], childList: true });
    window.addEventListener('resize', update);
    update();
    return () => { observer.disconnect(); window.removeEventListener('resize', update); };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    input.current?.focus();
    const controller = new AbortController();
    getChatStatus(AbortSignal.any([controller.signal, AbortSignal.timeout(10000)]))
      .then(setAvailable).catch(() => { if (!controller.signal.aborted) setAvailable(false); });
    return () => controller.abort();
  }, [open]);

  useEffect(() => {
    if (log.current) log.current.scrollTop = log.current.scrollHeight;
  }, [messages, pending, error, open]);

  function close() { setOpen(false); launcher.current?.focus(); }

  function reset() {
    request.current?.abort(); request.current = null;
    setMessages([]); setDraft(''); setPending(false); setError(''); setRetry('');
    input.current?.focus();
  }

  async function submit(text: string, isRetry = false) {
    const message = text.trim();
    if (!message || pending || !available || message.length > 1200) return;
    const history = isRetry ? messages.slice(0, -1) : messages;
    const turns: ChatTurn[] = [...history, { role: 'user', content: message }];
    const controller = new AbortController(); request.current = controller;
    setMessages(turns); setDraft(''); setPending(true); setError(''); setRetry('');
    try {
      const reply = await sendChat(message, history, AbortSignal.any([controller.signal, AbortSignal.timeout(35000)]));
      if (request.current !== controller) return;
      setMessages([...turns, { role: 'assistant', content: reply.answer, sources: reply.sources }]);
    } catch (reason) {
      if (request.current !== controller) return;
      setError(reason instanceof Error && reason.name !== 'TimeoutError' ? reason.message : 'The reply took too long. Please retry or request a consultation.');
      setRetry(message);
    } finally {
      if (request.current === controller) { setPending(false); request.current = null; }
    }
  }

  return <div className="programme-assistant" style={{ '--assistant-bottom': `${bottom}px` } as React.CSSProperties}>
    {open && <section id="programme-assistant-panel" className="assistant-panel" role="dialog" aria-label="CPCM programme assistant" onKeyDown={e => { if (e.key === 'Escape') { e.stopPropagation(); close(); } }}>
      <header className="assistant-header">
        <span className="assistant-avatar" aria-hidden="true"><ChatIcon name="sparkle" /></span>
        <div><strong>Programme assistant</strong><span>Programmes · Funding · Eligibility</span></div>
        <button type="button" onClick={close} aria-label="Close programme assistant" className="assistant-icon"><ChatIcon name="close" /></button>
      </header>
      <div className="assistant-notice">AI guidance. The College confirms funding and eligibility.</div>
      <div className="assistant-messages" ref={log} role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions">
        <div className="assistant-message assistant-reply"><p>Hello! I can help you explore our programmes, understand funding and eligibility, or find your next step.</p><p>What would you like to know?</p></div>
        {messages.length === 0 && <div className="assistant-prompts">{prompts.map(prompt => <button key={prompt} type="button" disabled={!available} onClick={() => void submit(prompt)}>{prompt}<ChatIcon name="external" /></button>)}</div>}
        {messages.map((turn, index) => <div className={`assistant-message ${turn.role === 'user' ? 'assistant-user' : 'assistant-reply'}`} key={index}>
          <span className="sr-only">{turn.role === 'user' ? 'You' : 'Assistant'}: </span><p>{turn.content}</p>
          {!!turn.sources?.length && <div className="assistant-sources"><strong>Sources</strong>{turn.sources.map((source, i) => source.path && /^\/[a-zA-Z0-9/_#-]*$/.test(source.path) && !source.path.startsWith('//') ? <SiteLink key={i} href={source.path} onClick={close}>{source.title}<ChatIcon name="external" /></SiteLink> : <span key={i}>{source.title}</span>)}</div>}
        </div>)}
        {pending && <div className="assistant-thinking" role="status">Finding information in our programme sources…</div>}
        {available === false && <p className="assistant-offline" role="status">Our assistant is currently offline. You can still request a consultation with the College team below.</p>}
        {error && <div className="assistant-error" role="alert"><p>{error}</p>{retry && <button type="button" onClick={() => void submit(retry, true)}>Retry message</button>}</div>}
      </div>
      <div className="assistant-consultation"><SiteLink href="/book-a-session" onClick={close}>Request a consultation <ChatIcon name="arrow" /></SiteLink><button type="button" onClick={reset} disabled={!messages.length && !pending}>New chat</button></div>
      <form className="assistant-composer" onSubmit={e => { e.preventDefault(); void submit(draft); }}>
        <label className="sr-only" htmlFor="assistant-question">Your question</label>
        <textarea id="assistant-question" ref={input} value={draft} onChange={e => setDraft(e.target.value)} maxLength={1200} rows={2} readOnly={pending} disabled={available === false} placeholder="Ask about a programme…" onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); void submit(draft); } }} />
        <button type="submit" aria-label="Send message" disabled={pending || !available || !draft.trim()}><ChatIcon name="send" /></button>
      </form>
      <p className="assistant-privacy">Messages are sent to our AI provider to answer your question. Please avoid sensitive information. <SiteLink href="/privacy" onClick={close}>Privacy notice</SiteLink></p>
    </section>}
    <button ref={launcher} type="button" className="assistant-launcher" aria-expanded={open} aria-controls="programme-assistant-panel" aria-label={open ? 'Close programme assistant' : 'Ask the programme assistant'} onClick={() => open ? close() : setOpen(true)}><ChatIcon name={open ? 'close' : 'chat'} /><span>Ask CPCM</span></button>
  </div>;
}
