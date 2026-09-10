const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api/v1').replace(/\/$/, '');
export interface IpcImage { id: number; image_url: string; alt_text: string; order: number; is_active: boolean; }
export async function fetchIpcImages(): Promise<IpcImage[]> {
  const response = await fetch(`${API_BASE_URL}/ipc-images/`, { signal: AbortSignal.timeout(20000), cache: 'no-store' });
  if (!response.ok) throw new Error('Could not load IPC images');
  return response.json();
}
