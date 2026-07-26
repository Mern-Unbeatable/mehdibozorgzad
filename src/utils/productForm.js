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

/** Build multipart body for POST /api/products */
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
