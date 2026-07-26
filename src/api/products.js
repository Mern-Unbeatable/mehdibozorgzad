import { apiDelete, apiGet, apiPost } from './client';

export function fetchProducts() {
  return apiGet('/api/products');
}

export function fetchProductById(id) {
  return apiGet(`/api/products/${id}`);
}

export function createProduct(formData, options) {
  return apiPost('/api/products', formData, options);
}

export function removeProduct(id) {
  return apiDelete(`/api/products/${id}`);
}

/** Pull a product array out of different API response shapes. */
export function normalizeProductList(data) {
  const raw = data?.data ?? data?.products ?? data?.items ?? data;
  return Array.isArray(raw) ? raw : [];
}
