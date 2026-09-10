const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api/v1').replace(/\/$/, '');

export interface Mentor {
  id: number;
  initials: string;
  name: string;
  role: string;
  affiliation: string;
  specialties: string[];
  body: string;
  imageUrl: string;
  linkedinUrl: string;
}

export async function fetchMentors(): Promise<Mentor[]> {
  const response = await fetch(`${API_BASE_URL}/mentors/`, { signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw new Error(`Failed to load mentors (status ${response.status})`);
  return response.json();
}

export async function fetchMentor(id: string | number): Promise<Mentor> {
  const response = await fetch(`${API_BASE_URL}/mentors/${id}/`, { signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw new Error(`Failed to load mentor (status ${response.status})`);
  return response.json();
}
