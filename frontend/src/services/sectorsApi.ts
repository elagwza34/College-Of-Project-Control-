const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api/v1').replace(/\/$/, '');

export interface Sector {
  id: number;
  slug: string;
  title: string;
  description: string;
  icon: string;
  imageUrl: string;
  linkUrl: string;
}

export async function fetchSectors(): Promise<Sector[]> {
  const response = await fetch(`${API_BASE_URL}/sectors/`, { signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw new Error(`Failed to load sectors (status ${response.status})`);
  return response.json();
}

export async function fetchSector(slug: string): Promise<Sector> {
  const response = await fetch(`${API_BASE_URL}/sectors/${slug}/`, { signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw new Error(`Failed to load sector (status ${response.status})`);
  return response.json();
}
