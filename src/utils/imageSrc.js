/**
 * Backend returns full URLs. Strip to /uploads/... so the server can proxy them
 * (Vite in dev, nginx in production). Direct cross-origin backend URLs are blocked by CORP.
 */
export function imageSrc(url) {
  if (!url || typeof url !== 'string') return url;
  if (url.startsWith('blob:') || url.startsWith('data:')) return url;
  if (url.startsWith('/uploads/')) return url;
  if (url.startsWith('uploads/')) return `/${url}`;

  try {
    const { pathname, search, hash } = new URL(url);
    if (pathname.startsWith('/uploads/')) return `${pathname}${search}${hash}`;
  } catch {
    // not a URL
  }

  return url;
}
