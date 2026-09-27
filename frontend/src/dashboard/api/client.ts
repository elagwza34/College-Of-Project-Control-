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
  if (response.status === 429) throw new Error('Too many login attempts. Please try again later.');
  if (!response.ok) throw new Error('Invalid email or password.');
  const data = (await response.json()) as { token: string };
  return data.token;
}

export async function logout(): Promise<void> {
  const token = getToken();
  if (!token) return;
  const response = await fetch(`${CMS_BASE}/auth/logout/`, {
    method: 'POST',
    signal: AbortSignal.timeout(20000),
    headers: { Authorization: `Token ${token}` },
  });
  if (!response.ok && response.status !== 401) {
    throw new Error('Could not revoke the dashboard session.');
  }
}

export async function requestPasswordReset(email: string): Promise<{ resetLink?: string }> {
  const response = await fetch(`${CMS_BASE}/auth/password-reset/`, {
    method: 'POST',
    signal: AbortSignal.timeout(20000),
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (response.status === 429) throw new Error('Too many requests. Please try again later.');
  if (!response.ok) throw new Error('We could not process your request. Please try again.');
  const data = await response.json().catch(() => ({})) as { reset_link?: string };
  return { resetLink: data.reset_link };
}

export async function confirmPasswordReset(uid: string, token: string, password: string): Promise<void> {
  const response = await fetch(`${CMS_BASE}/auth/password-reset/${encodeURIComponent(uid)}/${encodeURIComponent(token)}/`, {
    method: 'POST',
    signal: AbortSignal.timeout(20000),
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  const data = await response.json().catch(() => ({})) as { detail?: string; password?: string[] };
  if (!response.ok) throw new Error(data.password?.[0] || data.detail || 'We could not reset your password.');
}
