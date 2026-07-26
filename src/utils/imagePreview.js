const previewUrls = new Set();

export const createImagePreviewUrl = (file) => {
  const url = URL.createObjectURL(file);
  previewUrls.add(url);
  return url;
};

export const revokeImagePreviewUrl = (url) => {
  if (!url || !previewUrls.has(url)) return;
  URL.revokeObjectURL(url);
  previewUrls.delete(url);
};

/** Lets the browser paint before heavy image preview work. */
export const waitForPaint = () =>
  new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });
