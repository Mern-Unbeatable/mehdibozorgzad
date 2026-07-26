import { apiDelete, apiGet, apiPost } from './client';
import { normalizePublicProduct } from '../utils/products';

export async function fetchProducts(page = 1, limit = 50) {
  const { data, error } = await apiGet(`/api/products?page=${page}&limit=${limit}`);

  if (error) return { data: null, error };

  const items = data?.data ?? data?.items ?? data?.products ?? (Array.isArray(data) ? data : []);
  const pagination = data?.pagination ?? {
    total: Array.isArray(items) ? items.length : 0,
    page,
    limit,
    pages: 1,
  };

  return {
    data: {
      items: Array.isArray(items) ? items : [],
      pagination,
    },
    error: null,
  };
}

/** Load all products for the public flooring catalogue. */
export async function fetchAllPublicProducts(limit = 100) {
  const { data, error } = await fetchProducts(1, limit);

  if (error) return { data: [], error };

  const totalPages = data?.pagination?.pages ?? 1;
  let items = [...(data?.items ?? [])];

  if (totalPages > 1) {
    for (let page = 2; page <= totalPages; page += 1) {
      const next = await fetchProducts(page, limit);
      if (next.error) break;
      items = items.concat(next.data?.items ?? []);
    }
  }

  return {
    data: items.map(normalizePublicProduct),
    error: null,
  };
}

export async function fetchProductById(id) {
  const result = await apiGet(`/api/products/${id}`);

  if (result.error || !result.data) return result;

  return { data: normalizePublicProduct(result.data), error: null };
}

export function createProduct(formData, options) {
  return apiPost('/api/products', formData, options);
}

export function removeProduct(id) {
  return apiDelete(`/api/products/${id}`);
}

/** Pull a product array out of different API response shapes (admin lists). */
export function normalizeProductList(data) {
  const raw = data?.items ?? data?.data ?? data?.products ?? data;
  const items = Array.isArray(raw) ? raw : [];
  return items.map(normalizePublicProduct);
}
