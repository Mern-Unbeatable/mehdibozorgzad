import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useProducts } from '../../context/ProductsContext';
import { ROUTES } from '../../config';
import { displayLabel } from '../../utils/display';

// TODO: replace with API
const _mockData = {
  product: {
    id: 1,
    brand: 'Abbey Carpet',
    name: 'Trader Bay Berber',
    color: 'Pier Walk',
    description:
      'The Simple Solution Carpet Collection features a vast array of patterns, textures, cables, shags, friezes, and velvets, with great style options without compromising their budget!',
    images: [
      'https://placehold.co/600x400/d6cfc8/4C4946?text=Product',
      'https://placehold.co/100x80/c9bfb5/4C4946?text=1',
      'https://placehold.co/100x80/b8afa8/4C4946?text=2',
      'https://placehold.co/100x80/e0d9d2/4C4946?text=3',
      'https://placehold.co/100x80/cec6bc/4C4946?text=4',
      'https://placehold.co/100x80/ddd7cf/4C4946?text=5',
      'https://placehold.co/100x80/c5bdb4/4C4946?text=6',
    ],
    colorSwatches: [
      '#8c8479',
      '#a0978d',
      '#b0a89f',
      '#c4bdb5',
      '#9e9389',
      '#b8b0a7',
      '#7a7068',
      '#6b6259',
      '#8a8078',
      '#9c9288',
      '#a8a09a',
      '#bbb5af',
      '#6e5c4a',
      '#594a38',
      '#c07828',
      '#d48b30',
    ],
    specifications: [
      { label: 'Product Highlights', value: 'Polyester' },
      { label: 'SKU', value: '550257' },
      { label: 'Type', value: 'Carpet' },
      { label: 'Category', value: 'Carpet' },
      { label: 'Construction', value: 'Texture' },
      { label: 'Fiber', value: '100% PET Polyester' },
      { label: 'Color Family', value: 'Brown' },
      { label: 'Shade', value: 'Medium' },
      { label: 'Material', value: 'Broadloom' },
      { label: 'Residential', value: 'Yes' },
      { label: 'Warranty', value: '60 Day Warranty' },
    ],
  },
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, currentProduct, loadProduct } = useProducts();
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (id) loadProduct(id);
  }, [loadProduct, id]);

  const product =
    currentProduct && Object.keys(currentProduct).length > 0
      ? currentProduct
      : _mockData.product;

  const images = product.images ?? (product.image ? [product.image] : []);
  const mainImage = images[activeImage] ?? images[0];

  const specs =
    product.specifications ??
    [
      { label: 'SKU', value: product.sku },
      { label: 'Type', value: product.productType ?? product.type },
      { label: 'Category', value: product.category },
      { label: 'Construction', value: product.construction },
      { label: 'Fiber', value: product.fiber },
      { label: 'Color Family', value: product.colorFamily },
      { label: 'Shade', value: product.shade },
      { label: 'Material', value: product.material },
      { label: 'Residential', value: product.residential },
      { label: 'Warranty', value: product.warranty },
    ].filter((s) => displayLabel(s.value));

  const colorSwatches = product.colorSwatches ?? [];

  return (
    <section className="space-y-8">
      {/* Back */}
      <button
        type="button"
        onClick={() => navigate(ROUTES.ADMIN_PRODUCTS)}
        className="inline-flex items-center gap-2 text-base font-['Lato'] text-[#696664] hover:text-[#0d0b0a] transition-colors cursor-pointer"
      >
        <ArrowLeft size={18} aria-hidden="true" />
        Back to Products
      </button>

      {loading ? (
        <div className="text-base font-['Lato'] text-[#696664]">Loading product details…</div>
      ) : (
        <>
          {/* Top: image + info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left: main image + thumbnails */}
            <div className="space-y-3">
              <div className="rounded-2xl overflow-hidden bg-[#E9E8E8] aspect-[3/2] w-full">
                {mainImage ? (
                  <img
                    src={mainImage}
                    alt={product.name || 'Product'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://placehold.co/600x400/E9E8E8/4C4946?text=No+Image';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-base font-['Lato'] text-[#696664]">No image</p>
                  </div>
                )}
              </div>

              {images.length > 1 && (
                <div className="flex gap-2">
                  {images.slice(1).map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveImage(i + 1)}
                      className={`flex-1 h-16 rounded-lg overflow-hidden border-2 transition-colors cursor-pointer min-w-0 ${
                        activeImage === i + 1
                          ? 'border-[#0d0b0a]'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <img
                        src={img}
                        alt={'Thumbnail ' + (i + 1)}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://placehold.co/64x56/E9E8E8/4C4946?text=';
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: brand, name, color, swatches */}
            <div className="space-y-4">
              {product.brand && (
                <p className="text-sm font-['Lato'] text-[#696664]">{displayLabel(product.brand)}</p>
              )}
              <h1 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-3xl leading-tight">
                {product.name || '—'}
              </h1>
              {(product.color || colorSwatches.length > 0) && (
                <div className="border border-gray-200 rounded-xl p-4 space-y-3">
                  {product.color && (
                    <p className="text-base font-['Lato'] text-[#4C4946]">
                      Color: {displayLabel(product.color)}
                    </p>
                  )}
                  {colorSwatches.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {colorSwatches.map((swatch, i) => (
                        <div
                          key={i}
                          className="w-14 h-12 rounded-md border border-gray-200 shrink-0"
                          style={{ backgroundColor: swatch }}
                          title={swatch}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {product.description && (
            <div className="space-y-2">
              <h2 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-xl">
                Product Description
              </h2>
              <p className="text-base font-['Lato'] text-[#4C4946] leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          {/* Specifications table */}
          {specs.length > 0 && (
            <div className="space-y-3">
              <h2 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-xl">
                Specifications
              </h2>
              <div className="rounded-2xl border border-gray-100 overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {specs.map((spec, i) => (
                      <tr key={i} className="border-b border-gray-100 last:border-0">
                        <td className="px-6 py-3.5 text-base font-['Lato'] text-[#4C4946] w-1/2">
                          {spec.label}
                        </td>
                        <td className="px-6 py-3.5 text-base font-['Lato'] text-[#0d0b0a] font-medium text-right">
                          {displayLabel(spec.value) || '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default ProductDetail;
