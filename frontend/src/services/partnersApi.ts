const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api/v1').replace(/\/$/, '');

export interface Partner {
  id: number;
  name: string;
  imageUrl: string;
  linkUrl: string;
}

export async function fetchPartners(): Promise<Partner[]> {
  const response = await fetch(`${API_BASE_URL}/partners/`, { signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw new Error(`Failed to load partners (status ${response.status})`);
  return response.json();
}
