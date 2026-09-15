const paths = {
  chat: 'M21 11.5a8.5 8.5 0 0 1-8.5 8.5H4l-2 2v-8.5A8.5 8.5 0 0 1 10.5 5H13M7 12h9M7 16h6',
  sparkle: 'm12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z',
  close: 'm6 6 12 12M6 18 18 6',
  arrow: 'M4 12h16m-7-7 7 7-7 7',
  external: 'M7 17 17 7M7 7h10v10',
  send: 'm22 2-7 20-4-9-9-4 20-7ZM22 2 11 13',
};

export default function ChatIcon({ name }: { name: keyof typeof paths }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}
