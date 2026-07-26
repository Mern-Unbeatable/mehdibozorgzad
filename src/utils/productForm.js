const SCALAR_FIELDS = [
  'name',
  'description',
  'productHighlights',
  'size',
  'sku',
  'construction',
  'material',
  'residential',
  'warranty',
  'collection',
  'shape',
  'productLook',
  'thickness',
];

const ID_FIELDS = [
  'categoryId',
  'brandId',
  'formatId',
  'speciesId',
  'installationMethodId',
];

const ARRAY_ID_FIELDS = ['colorIds', 'shadeIds', 'fiberIds'];

/** Build multipart body for POST /api/products and PUT /api/products/:id */
export function buildProductFormData({ productType, fields = {}, images = [] }) {
  const formData = new FormData();

  formData.append('productType', productType);

  SCALAR_FIELDS.forEach((key) => {
    const value = fields[key];
    if (value !== undefined && value !== null && String(value).trim() !== '') {
      formData.append(key, value);
    }
  });

  ID_FIELDS.forEach((key) => {
    const value = fields[key];
    if (value) formData.append(key, value);
  });

  ARRAY_ID_FIELDS.forEach((key) => {
    const values = fields[key];
    if (!Array.isArray(values)) return;
    values.forEach((id) => {
      if (id) formData.append(key, id);
    });
  });

  images.forEach((file) => {
    if (file instanceof File) formData.append('images', file);
  });

  return formData;
}

function relationIds(items = [], idKey, nestedKey) {
  return (items ?? [])
    .map((item) => item?.[idKey] ?? item?.[nestedKey]?.id)
    .filter(Boolean);
}

/** Map GET /api/products/:id response → admin edit form state */
export function populateProductFormFromApi(product) {
  if (!product) {
    return { productType: 'FLOORS', fields: {}, existingImages: [] };
  }

  return {
    productType: product.productType || 'FLOORS',
    fields: {
      name: product.name ?? '',
      description: product.description ?? '',
      productHighlights: product.productHighlights ?? '',
      size: product.size ?? '',
      sku: product.sku ?? '',
      construction: product.construction ?? '',
      material: product.material ?? '',
      residential: product.residential ?? '',
      warranty: product.warranty ?? '',
      collection: product.collection ?? '',
      shape: product.shape ?? '',
      productLook: product.productLook ?? '',
      thickness: product.thickness ?? '',
      categoryId: product.categoryId ?? product.category?.id ?? '',
      brandId: product.brandId ?? product.brand?.id ?? '',
      formatId: product.formatId ?? product.format?.id ?? '',
      speciesId: product.speciesId ?? product.species?.id ?? '',
      installationMethodId: product.installationMethodId ?? product.installationMethod?.id ?? '',
      colorIds: relationIds(product.colors, 'colorId', 'color'),
      shadeIds: relationIds(product.shades, 'shadeId', 'shade'),
      fiberIds: relationIds(product.fibers, 'fiberId', 'fiber'),
    },
    existingImages: (product.images ?? [])
      .map((image) => {
        if (typeof image === 'string') return { id: image, url: image };
        if (!image?.url) return null;
        return { id: image.id, url: image.url };
      })
      .filter(Boolean),
  };
}
