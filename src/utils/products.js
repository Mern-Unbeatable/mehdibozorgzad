import { displayLabel } from './display';
import { imageSrc } from './imageSrc';

const PRODUCT_TYPE_TABS = {
  FLOORS: 'floors',
  FLOOR: 'floors',
  Floors: 'floors',
  RUGS: 'rugs',
  Rugs: 'rugs',
  COUNTERTOPS: 'countertops',
  Countertops: 'countertops',
  WALLS: 'walls',
  Walls: 'walls',
};

export function slugify(value) {
  return displayLabel(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function mapProductTypeToTab(productType) {
  return PRODUCT_TYPE_TABS[productType] ?? PRODUCT_TYPE_TABS[String(productType).toUpperCase()] ?? 'floors';
}

function relationNames(items = [], key) {
  return items
    .map((item) => displayLabel(item?.[key] ?? item))
    .filter(Boolean);
}

function buildSpecRows(product, colors, shades, fibers) {
  const rows = [];
  const add = (label, value) => {
    if (value != null && value !== '') rows.push([label, value]);
  };

  add('Product Highlights', product.productHighlights);
  add('SKU', product.sku);
  add('Type', displayLabel(product.productType));
  add('Category', displayLabel(product.category));
  add('Brand', displayLabel(product.brand));
  add('Construction', product.construction);
  add('Fiber', fibers.join(', ') || null);
  add('Color Family', colors.join(', ') || null);
  add('Shade', shades.join(', ') || null);
  add('Material', product.material);
  add('Residential', product.residential);
  add('Warranty', product.warranty);
  add('Size', product.size);
  add('Collection', product.collection);
  add('Shape', product.shape);
  add('Product Look', product.productLook);
  add('Species', displayLabel(product.species));
  add('Thickness', product.thickness);
  add('Format', displayLabel(product.format));
  add('Installation Method', displayLabel(product.installationMethod));

  return rows;
}

/** Map /api/products item → shape used by flooring UI components. */
export function normalizePublicProduct(product) {
  if (!product) return product;

  const imageUrls = (product.images ?? [])
    .map((image) => imageSrc(typeof image === 'string' ? image : image?.url))
    .filter(Boolean);

  const colors = relationNames(product.colors, 'color');
  const shades = relationNames(product.shades, 'shade');
  const fibers = relationNames(product.fibers, 'fiber');

  const brand = displayLabel(product.brand);
  const category = displayLabel(product.category);
  const format = displayLabel(product.format);
  const species = displayLabel(product.species);
  const installMethod = displayLabel(product.installationMethod);

  return {
    ...product,
    tab: mapProductTypeToTab(product.productType),
    brand,
    category,
    format,
    species,
    installationMethod: installMethod,
    image: imageUrls[0] ?? '',
    images: imageUrls,
    colorCount: colors.length > 0 ? colors.length : null,
    primaryColor: colors[0] ?? '',
    colors,
    shades,
    fibers,
    description: product.description ?? '',
    filterValues: {
      brand: slugify(brand),
      color: slugify(colors[0]),
      shade: slugify(shades[0]),
      fiber: slugify(fibers[0]),
      format: slugify(format),
      species: slugify(species),
      installMethod: slugify(installMethod),
      productFamily: slugify(category),
    },
    specRows: buildSpecRows(product, colors, shades, fibers),
  };
}

export function groupProductsByTab(products = []) {
  const grouped = { floors: [], rugs: [], countertops: [], walls: [] };

  products.forEach((product) => {
    const normalized = normalizePublicProduct(product);
    const tab = normalized.tab;
    if (grouped[tab]) grouped[tab].push(normalized);
  });

  return grouped;
}
