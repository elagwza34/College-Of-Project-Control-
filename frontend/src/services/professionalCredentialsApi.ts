const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api/v1').replace(/\/$/, '');

export interface ProfessionalCredential {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
  linkUrl: string;
}

export async function fetchProfessionalCredentials(): Promise<ProfessionalCredential[]> {
  const response = await fetch(`${API_BASE_URL}/professional-credentials/`, { signal: AbortSignal.timeout(20000) });
  if (!response.ok) {
    throw new Error(`Failed to load professional credentials (status ${response.status})`);
  }
  return response.json();
}
