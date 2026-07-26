import { apiGet, apiPost, apiPut, getToken, setToken } from './client';

const USER_KEY = 'authUser';

function readStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function storeUser(user) {
  try {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  } catch {
    // ignore
  }
}

export function getStoredSession() {
  const token = getToken();
  const user = readStoredUser();
  return token && user ? user : null;
}

export async function loginUser(email, password) {
  const { data, error } = await apiPost('/api/auth/login', { email, password });

  if (error) return { success: false, error };

  const user = data?.user ?? data?.admin ?? data;
  const token = data?.token ?? data?.accessToken;

  if (!token || !user?.email) {
    return { success: false, error: 'Invalid login response from server.' };
  }

  setToken(token);
  storeUser(user);
  return { success: true, user, token };
}

export async function logoutUser() {
  await apiPost('/api/auth/logout').catch(() => {});
  setToken(null);
  storeUser(null);
}

export function updateStoredUser(updates) {
  const current = readStoredUser();
  if (!current) return null;
  const next = { ...current, ...updates };
  storeUser(next);
  return next;
}

export function fetchProfile() {
  return apiGet('/api/auth/profile');
}

export function saveProfile(payload) {
  return apiPut('/api/auth/profile', payload);
}

export function savePassword(payload) {
  return apiPost('/api/auth/change-password', payload);
}
