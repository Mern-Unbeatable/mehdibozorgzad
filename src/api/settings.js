import { apiDelete, apiGet, apiPost } from './client';
import { SETTING_KEYS } from '../utils/adminSettings';

/** Backend URL slugs (camelCase keys → kebab-case where needed). */
const CATEGORY_SLUGS = {
  installationMethods: 'installation-methods',
};

function toSlug(category) {
  return CATEGORY_SLUGS[category] ?? category;
}

function unwrapList(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  return [];
}

export function fetchAllSettings() {
  return apiGet('/api/settings');
}

export async function fetchSettingsByCategory(category) {
  const { data, error } = await apiGet(`/api/settings/${toSlug(category)}`);
  if (error) return { data: null, error };
  return { data: unwrapList(data), error: null };
}

export function addSettingItem(category, name) {
  return apiPost(`/api/settings/${toSlug(category)}`, { name });
}

export function removeSettingItem(category, id) {
  return apiDelete(`/api/settings/${toSlug(category)}/${id}`);
}

/** Load categories, brands, colors, etc. from /api/settings/{slug} */
export async function fetchSettingsCatalog() {
  const entries = await Promise.all(
    SETTING_KEYS.map(async (key) => {
      const { data, error } = await fetchSettingsByCategory(key);
      return [key, error ? [] : unwrapList(data)];
    }),
  );

  return { data: Object.fromEntries(entries), error: null };
}

/** @deprecated Use fetchSettingsCatalog */
export async function fetchAllSettingsFallback() {
  return fetchSettingsCatalog();
}
