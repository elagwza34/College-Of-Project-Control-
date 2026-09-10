const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api/v1').replace(/\/$/, '');
const CMS_BASE = `${API_BASE_URL}/cms`;
const TOKEN_KEY = 'cms_token';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

interface RequestOptions {
  method?: string;
  body?: string | FormData;
  headers?: Record<string, string>;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const token = getToken();
  const isFormData = options.body instanceof FormData;
  const headers: Record<string, string> = { ...options.headers };
  if (token) headers.Authorization = `Token ${token}`;
  if (!isFormData && options.body) headers['Content-Type'] = 'application/json';

  const response = await fetch(`${CMS_BASE}${path}`, { ...options, headers, signal: AbortSignal.timeout(20000) });

  if (response.status === 401) {
    clearToken();
    window.location.href = '/dashboard/login';
    throw new Error('Unauthorized');
  }
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(text || `Request failed with status ${response.status}`);
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export const cmsApi = {
  get: <T,>(path: string) => request<T>(path),
  post: <T,>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: body instanceof FormData ? body : JSON.stringify(body) }),
  patch: <T,>(path: string, body: unknown) =>
    request<T>(path, { method: 'PATCH', body: body instanceof FormData ? body : JSON.stringify(body) }),
  del: (path: string) => request<void>(path, { method: 'DELETE' }),
};

export async function login(username: string, password: string): Promise<string> {
  const response = await fetch(`${CMS_BASE}/auth/login/`, {
    method: 'POST',
    signal: AbortSignal.timeout(20000),
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) throw new Error('Invalid email or password.');
  const data = (await response.json()) as { token: string };
  return data.token;
}
