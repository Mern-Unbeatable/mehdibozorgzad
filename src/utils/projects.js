import { resolveMediaUrl, resolveMediaUrls } from './media';

/** Map backend project fields to what the UI expects. */
export function getProjectCoverImage(project) {
  if (!project) return '';

  if (project.img) return resolveMediaUrl(project.img);

  const featured = project.featuredImages?.[0];
  const featuredUrl = typeof featured === 'string' ? featured : featured?.url;

  return resolveMediaUrl(
    project.featuredImageUrl ||
      featuredUrl ||
      project.thumbnailImage ||
      project.thumbnailImageUrl ||
      project.beforeImage ||
      project.beforeImageUrl ||
      project.afterImage ||
      project.afterImageUrl ||
      '',
  );
}

export function getFeaturedImageUrls(project) {
  if (!Array.isArray(project?.featuredImages)) return [];

  return resolveMediaUrls(
    project.featuredImages.map((image) => (typeof image === 'string' ? image : image?.url)),
  );
}

export function normalizeProject(project) {
  if (!project) return project;

  const city = project.city ?? '';
  const state = project.state ?? '';
  const location = [city, state].filter(Boolean).join(', ');
  const featuredImageItems = featuredImageItemsFromProject(project);
  const featuredImages = getFeaturedImageUrls(project);
  const coverImage = getProjectCoverImage(project);

  return {
    ...project,
    img: coverImage,
    subtitle: project.shortDescription ?? project.subtitle ?? '',
    description: project.shortDescription ?? project.description ?? '',
    location: project.location ?? location,
    materials: project.materialsUsed ?? project.materials ?? [],
    afterImg: resolveMediaUrl(project.afterImage ?? project.afterImageUrl ?? project.afterImg ?? ''),
    beforeImg: resolveMediaUrl(
      project.beforeImage ?? project.beforeImageUrl ?? project.beforeImg ?? '',
    ),
    thumbnailImage: resolveMediaUrl(project.thumbnailImage ?? project.thumbnailImageUrl ?? ''),
    thumbnailImageUrl: resolveMediaUrl(project.thumbnailImage ?? project.thumbnailImageUrl ?? ''),
    beforeImage: resolveMediaUrl(project.beforeImage ?? project.beforeImageUrl ?? ''),
    beforeImageUrl: resolveMediaUrl(project.beforeImage ?? project.beforeImageUrl ?? ''),
    afterImage: resolveMediaUrl(project.afterImage ?? project.afterImageUrl ?? ''),
    afterImageUrl: resolveMediaUrl(project.afterImage ?? project.afterImageUrl ?? ''),
    featuredImageItems: featuredImageItems.map((image) => ({
      ...image,
      url: resolveMediaUrl(image.url),
    })),
    featuredImages,
  };
}

export function populateProjectForm(project) {
  const normalized = normalizeProject(project);

  return {
    title: normalized.title ?? '',
    categoryId: normalized.categoryId ?? normalized.category?.id ?? '',
    shortDescription: normalized.shortDescription ?? '',
    city: normalized.city ?? '',
    state: normalized.state ?? '',
    serviceType: normalized.serviceType ?? '',
    materialsUsed: Array.isArray(normalized.materialsUsed) ? normalized.materialsUsed : [],
    existingFeaturedImages: normalized.featuredImageItems ?? [],
    newFeaturedImages: [],
    thumbnailImage: null,
    thumbnailImagePreview: normalized.thumbnailImageUrl ?? '',
    beforeImage: null,
    beforeImagePreview: normalized.beforeImageUrl ?? '',
    afterImage: null,
    afterImagePreview: normalized.afterImageUrl ?? '',
  };
}

function featuredImageItemsFromProject(project) {
  const items = project.featuredImages ?? project.featuredImageItems ?? [];

  return items
    .map((image) => {
      if (typeof image === 'string') return { id: image, url: image };
      if (image?.id && image?.url) return image;
      return null;
    })
    .filter(Boolean);
}
