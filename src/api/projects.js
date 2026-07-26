import { apiDelete, apiGet, apiPost, apiPut } from './client';
import { normalizeProject } from '../utils/projects';

function buildProjectFormData(payload) {
  const formData = new FormData();

  const appendIfPresent = (key, value) => {
    if (value !== undefined && value !== null && value !== '') {
      formData.append(key, value);
    }
  };

  appendIfPresent('title', payload.title);
  appendIfPresent('categoryId', payload.categoryId);
  appendIfPresent('shortDescription', payload.shortDescription);
  appendIfPresent('city', payload.city);
  appendIfPresent('state', payload.state);
  appendIfPresent('serviceType', payload.serviceType);

  (payload.materialsUsed ?? []).forEach((item, index) => {
    formData.append(`materialsUsed[${index}]`, item);
  });

  (payload.featuredImages ?? []).forEach((file) => {
    if (file) formData.append('featuredImages', file);
  });

  if (payload.thumbnailImage) formData.append('thumbnailImage', payload.thumbnailImage);
  if (payload.beforeImage) formData.append('beforeImage', payload.beforeImage);
  if (payload.afterImage) formData.append('afterImage', payload.afterImage);

  return formData;
}

export async function fetchProjects(page = 1, limit = 12) {
  const { data, error } = await apiGet(`/api/projects?page=${page}&limit=${limit}`);

  if (error) return { data: null, error };

  const items = data?.data ?? data?.items ?? data?.projects ?? (Array.isArray(data) ? data : []);
  const pagination = data?.pagination ?? {
    total: Array.isArray(items) ? items.length : 0,
    page,
    limit,
    pages: 1,
  };

  return {
    data: {
      items: Array.isArray(items) ? items.map(normalizeProject) : [],
      pagination,
    },
    error: null,
  };
}

export async function fetchProjectById(id) {
  const result = await apiGet(`/api/projects/${id}`);

  if (result.error || !result.data) return result;

  return { data: normalizeProject(result.data), error: null };
}

export function createProject(payload, options) {
  return apiPost('/api/projects', buildProjectFormData(payload), options);
}

export function updateProject(id, payload, options) {
  return apiPut(`/api/projects/${id}`, buildProjectFormData(payload), options);
}

export function removeProject(id) {
  return apiDelete(`/api/projects/${id}`);
}

export function removeFeaturedImage(projectId, imageId) {
  return apiDelete(`/api/projects/${projectId}/featured-images/${imageId}`);
}
