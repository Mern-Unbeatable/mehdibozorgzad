const IS_DEV = import.meta.env.DEV;

/**
 * In development: strip full backend URL to /uploads/... so Vite's dev proxy
 * can serve it (avoids Cross-Origin-Resource-Policy blocks from the backend).
 *
 * In production: return the full absolute URL as-is — the live site and the
 * backend share the same eTLD+1 (maktechgroup.tech) so CORP same-site allows it.
 */
export function imageSrc(url) {
  if (!url || typeof url !== 'string') return url;
  if (url.startsWith('blob:') || url.startsWith('data:')) return url;

  if (IS_DEV) {
    // Strip to /uploads/... so Vite proxy handles it
    if (url.startsWith('/uploads/')) return url;
    if (url.startsWith('uploads/')) return `/${url}`;
    try {
      const { pathname } = new URL(url);
      if (pathname.startsWith('/uploads/')) return pathname;
    } catch {
      // not a full URL
    }
    return url;
  }

  // Production: return full URL directly
  return url;
}
