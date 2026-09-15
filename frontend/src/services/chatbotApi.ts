const BASE = (import.meta.env.VITE_API_BASE_URL || '/api/v1').replace(/\/$/, '');

export interface ChatSource { title: string; path: string }
export interface ChatTurn { role: 'user' | 'assistant'; content: string; sources?: ChatSource[] }
export interface ChatReply { answer: string; sources: ChatSource[]; needs_consultation: boolean }

export async function getChatStatus(signal: AbortSignal): Promise<boolean> {
  const response = await fetch(`${BASE}/chatbot/status/`, { signal });
  if (!response.ok) throw new Error('Assistant unavailable');
  const data = await response.json();
  return data.available === true;
}

export async function sendChat(message: string, history: ChatTurn[], signal: AbortSignal): Promise<ChatReply> {
  const response = await fetch(`${BASE}/chatbot/chat/`, {
    method: 'POST', signal, headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history: history.slice(-8).map(({ role, content }) => ({ role, content })) }),
  });
  if (!response.ok) {
    if (response.status === 429) throw new Error('The assistant has reached its message limit. Please try later or request a consultation.');
    throw new Error('We could not get a reply just now. Please retry or request a consultation.');
  }
  const data = await response.json();
  if (typeof data.answer !== 'string' || !Array.isArray(data.sources)) throw new Error('Please retry or request a consultation.');
  return data;
}
