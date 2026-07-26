import { apiDelete, apiGet, apiPost } from './client';

export function sendEnquiry(form) {
  return apiPost('/api/enquiries', form);
}

export async function fetchEnquiries(page = 1, limit = 10) {
  const { data, error } = await apiGet(`/api/enquiries?page=${page}&limit=${limit}`);

  if (error) return { data: null, error };

  return {
    data: {
      items: data?.items ?? data?.enquiries ?? (Array.isArray(data) ? data : []),
      pagination: data?.pagination ?? {
        total: data?.total ?? 0,
        page,
        limit,
        pages: data?.pages ?? 1,
      },
    },
    error: null,
  };
}

export function fetchEnquiryById(id) {
  return apiGet(`/api/enquiries/${id}`);
}

export function removeEnquiry(id) {
  return apiDelete(`/api/enquiries/${id}`);
}
