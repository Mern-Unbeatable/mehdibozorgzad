import { apiDelete, apiGet } from './client';

export function fetchDashboardStats() {
  return apiGet('/api/stats');
}

export function fetchDashboardLeads() {
  return apiGet('/api/enquiries');
}

export function removeDashboardEnquiry(id) {
  return apiDelete(`/api/enquiries/${id}`);
}

export function fetchEmails() {
  return apiGet('/api/emails');
}

export function fetchLeads() {
  return apiGet('/api/leads');
}

export function fetchOrders() {
  return apiGet('/api/orders');
}

export function fetchMarketplaceOrders() {
  return apiGet('/api/marketplace-orders');
}

export function fetchCaseStudies() {
  return apiGet('/api/case-studies');
}

export function fetchBlogPosts() {
  return apiGet('/api/blog');
}

export function fetchJobs() {
  return apiGet('/api/jobs');
}

export function fetchPricing() {
  return apiGet('/api/pricing');
}

/** Turn API list responses into a plain array. */
export function toList(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  return [];
}
