const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api/v1').replace(/\/$/, '');

export interface Coach {
  id: number;
  initials: string;
  name: string;
  qualification: string;
  focus: string;
  imageUrl: string;
}

export async function fetchCoaches(): Promise<Coach[]> {
  const response = await fetch(`${API_BASE_URL}/coaches/`, { signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw new Error(`Failed to load coaches (status ${response.status})`);
  return response.json();
}
