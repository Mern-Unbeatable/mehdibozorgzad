import { apiDelete, apiGet, apiPost } from './client';
import { SETTING_KEYS } from '../utils/adminSettings';

/** Backend URL slugs (camelCase keys → kebab-case where needed). */
const CATEGORY_SLUGS = {
  installationMethods: 'installation-methods',
};

function toSlug(category) {
  return CATEGORY_SLUGS[category] ?? category;
}

export function fetchAllSettings() {
  return apiGet('/api/settings');
}

export function fetchSettingsByCategory(category) {
  return apiGet(`/api/settings/${toSlug(category)}`);
}

export function addSettingItem(category, name) {
  return apiPost(`/api/settings/${toSlug(category)}`, { name });
}

export function removeSettingItem(category, id) {
  return apiDelete(`/api/settings/${toSlug(category)}/${id}`);
}

/** Load every settings section when the bulk endpoint is unavailable. */
export async function fetchAllSettingsFallback() {
  const entries = await Promise.all(
    SETTING_KEYS.map(async (key) => {
      const { data, error } = await fetchSettingsByCategory(key);
      return [key, error || !Array.isArray(data) ? [] : data];
    }),
  );

  return { data: Object.fromEntries(entries), error: null };
}
