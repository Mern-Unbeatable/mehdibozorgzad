const SETTINGS_STORAGE_KEY = 'adminCatalogSettings';

export const SETTING_KEYS = [
  'categories',
  'brands',
  'formats',
  'colors',
  'shades',
  'fibers',
  'species',
  'installationMethods',
];

const RESPONSE_KEY_ALIASES = {
  'installation-methods': 'installationMethods',
};

const toArray = (value) => (Array.isArray(value) ? value : []);

const normalizeList = (items) =>
  toArray(items).map((item) => {
    if (typeof item === 'string') {
      return { id: item, name: item };
    }
    return {
      id: item?.id ?? item?._id ?? item?.name,
      name: item?.name ?? String(item?.id ?? ''),
    };
  });

/** Makes API/local settings easy to read in admin forms. */
export const normalizeSettings = (raw = {}) => {
  const source = { ...raw };

  Object.entries(RESPONSE_KEY_ALIASES).forEach(([apiKey, localKey]) => {
    if (source[apiKey] != null && source[localKey] == null) {
      source[localKey] = source[apiKey];
    }
  });

  const normalized = {};

  SETTING_KEYS.forEach((key) => {
    normalized[key] = normalizeList(source[key]);
  });

  normalized.products = normalizeList(source.products);

  return normalized;
};

export const readStoredAdminSettings = () => {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    return raw ? normalizeSettings(JSON.parse(raw)) : normalizeSettings({});
  } catch {
    return normalizeSettings({});
  }
};

export const writeStoredAdminSettings = (settings) => {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // ignore
  }
};

/** Prefer API data, then local cache, then mock defaults. */
export const mergeSettingsSources = (fallback = {}, apiSettings = {}, storedSettings = {}) => {
  const merged = { ...fallback };

  SETTING_KEYS.forEach((key) => {
    const apiList = apiSettings[key];
    const storedList = storedSettings[key];
    merged[key] =
      toArray(apiList).length > 0
        ? apiList
        : toArray(storedList).length > 0
          ? storedList
          : fallback[key] ?? [];
  });

  merged.products =
    toArray(apiSettings.products).length > 0
      ? apiSettings.products
      : toArray(storedSettings.products).length > 0
        ? storedSettings.products
        : fallback.products ?? [];

  return merged;
};
