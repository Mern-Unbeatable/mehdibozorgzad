const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

/**
 * Turn backend upload URLs into same-origin paths the browser can load.
 * Vite proxies /uploads → backend (needed because the API sets
 * Cross-Origin-Resource-Policy: same-origin, which blocks cross-origin images).
 */
export function resolveMediaUrl(url) {
  if (!url || typeof url !== 'string') return '';

  if (url.startsWith('blob:') || url.startsWith('data:')) {
    return url;
  }

  if (url.startsWith('/uploads/')) {
    return url;
  }

  if (url.startsWith('uploads/')) {
    return `/${url}`;
  }

  try {
    const parsed = new URL(url);

    if (parsed.pathname.startsWith('/uploads/')) {
      return `${parsed.pathname}${parsed.search}${parsed.hash}`;
    }
  } catch {
    return url;
  }

  // Relative to API base when only a filename/path fragment is stored
  if (API_BASE && url.startsWith('/')) {
    return url;
  }

  return url;
}

export function resolveMediaUrls(urls = []) {
  return urls.map((url) => resolveMediaUrl(url)).filter(Boolean);
}
