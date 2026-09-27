const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api/v1').replace(/\/$/, '');

export interface ShortCourse {
  id?: number;
  slug: string;
  title: string;
  category: string;
  duration: string;
  format: string;
  owner: string;
  audience: string;
  summary: string;
  focus: string[];
  detail?: ShortCourseDetail;
  icon: string;
  imageUrl: string;
  order?: number;
}

export interface ShortCourseDetail {
  positioning?: string;
  bestFor?: string[];
  learningBlocks?: Array<{ title: string; body: string }>;
  workplaceOutputs?: string[];
  professionalContext?: string;
}

export async function fetchShortCourses(signal?: AbortSignal): Promise<ShortCourse[]> {
  const response = await fetch(`${API_BASE_URL}/short-courses/`, {
    signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(20000)]) : AbortSignal.timeout(20000),
  });
  if (!response.ok) throw new Error(`Failed to load short courses (status ${response.status})`);
  return response.json();
}

export async function fetchShortCourse(slug: string, signal?: AbortSignal): Promise<ShortCourse> {
  const response = await fetch(`${API_BASE_URL}/short-courses/${encodeURIComponent(slug)}/`, {
    signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(20000)]) : AbortSignal.timeout(20000),
  });
  if (!response.ok) throw new Error(`Failed to load short course (status ${response.status})`);
  return response.json();
}
