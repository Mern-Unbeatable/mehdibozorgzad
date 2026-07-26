/**
 * Simple fetch helper — every call returns { data, error }.
 * No hooks, no Redux-style "execute" pattern.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const TOKEN_KEY = 'authToken';

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    // ignore
  }
}

function buildUrl(path) {
  if (path.startsWith('http')) return path;
  return `${BASE_URL.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`;
}

async function parseResponse(response) {
  const contentType = response.headers.get('content-type') ?? '';
  let body = null;

  if (contentType.includes('application/json')) {
    body = await response.json();
  } else if (response.status !== 204) {
    body = await response.text();
  }

  if (!response.ok) {
    const message =
      body?.message ||
      body?.error ||
      (typeof body === 'string' && body) ||
      `Request failed (${response.status})`;
    return { data: null, error: message };
  }

  if (
    body &&
    typeof body === 'object' &&
    !Array.isArray(body) &&
    Array.isArray(body.data) &&
    body.pagination
  ) {
    return { data: body, error: null };
  }

  return { data: body?.data ?? body, error: null };
}

async function request(method, path, body, options = {}) {
  const headers = { ...(options.headers ?? {}) };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const config = { method, headers, signal: options.signal };

  if (body instanceof FormData) {
    config.body = body;
  } else if (body !== undefined && body !== null) {
    headers['Content-Type'] = 'application/json';
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(buildUrl(path), config);
    return parseResponse(response);
  } catch (err) {
    return { data: null, error: err?.message || 'Network error. Please try again.' };
  }
}

export function apiGet(path, options) {
  return request('GET', path, undefined, options);
}

export function apiPost(path, body, options) {
  return request('POST', path, body, options);
}

export function apiPut(path, body, options) {
  return request('PUT', path, body, options);
}

export function apiDelete(path, options) {
  return request('DELETE', path, undefined, options);
}
