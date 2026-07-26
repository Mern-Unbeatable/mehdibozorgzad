import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Pencil } from "lucide-react";
import { useProducts } from "../../context/ProductsContext";
import { ROUTES } from "../../config";
import { displayLabel } from "../../utils/display";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, currentProduct, loadProduct } = useProducts();
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (id) loadProduct(id);
  }, [loadProduct, id]);

  useEffect(() => {
    setActiveImage(0);
  }, [id, currentProduct?.id]);

  const product = currentProduct;
  const images = product?.images?.length
    ? product.images
    : product?.image
      ? [product.image]
      : [];

  const specs = (product?.specRows ?? []).map(([label, value]) => ({
    label,
    value,
  }));

  const colorText =
    product?.colors?.length > 0
      ? product.colors.join(", ")
      : product?.primaryColor || "";

  const shadeText =
    product?.shades?.length > 0 ? product.shades.join(", ") : "";
  const fiberText =
    product?.fibers?.length > 0 ? product.fibers.join(", ") : "";

  if (loading) {
    return (
      <section className="space-y-8">
        <button
          type="button"
          onClick={() => navigate(ROUTES.ADMIN_PRODUCTS)}
          className="inline-flex items-center gap-2 text-base font-['Lato'] text-[#696664] hover:text-[#0d0b0a] transition-colors cursor-pointer"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Back to Products
        </button>
        <p className="text-base font-['Lato'] text-[#696664]">
          Loading product details…
        </p>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="space-y-8">
        <button
          type="button"
          onClick={() => navigate(ROUTES.ADMIN_PRODUCTS)}
          className="inline-flex items-center gap-2 text-base font-['Lato'] text-[#696664] hover:text-[#0d0b0a] transition-colors cursor-pointer"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Back to Products
        </button>
        <p className="text-base font-['Lato'] text-[#696664]">
          Product not found.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <button
          type="button"
          onClick={() => navigate(ROUTES.ADMIN_PRODUCTS)}
          className="inline-flex items-center gap-2 text-base font-['Lato'] text-[#696664] hover:text-[#0d0b0a] transition-colors cursor-pointer"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Back to Products
        </button>
        <button
          type="button"
          onClick={() => navigate(`/admin/products/${product.id}/edit`)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0d0b0a] hover:bg-[#1f1b18] text-white rounded-full text-base font-medium font-['Lato'] transition-colors cursor-pointer"
        >
          <Pencil size={16} aria-hidden="true" />
          Edit Product
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-3">
          <div className="rounded-2xl overflow-hidden bg-[#E9E8E8] aspect-3/2 w-full">
            {images[activeImage] ? (
              <img
                src={images[activeImage]}
                alt={product.name || "Product"}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-base font-['Lato'] text-[#696664]">
                  No image
                </p>
              </div>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {images.map((img, index) => (
                <button
                  key={`${img}-${index}`}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`h-16 w-16 rounded-lg overflow-hidden border-2 transition-colors cursor-pointer shrink-0 ${
                    activeImage === index
                      ? "border-[#0d0b0a]"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          {product.brand && (
            <p className="text-sm font-['Lato'] text-[#696664]">
              {displayLabel(product.brand)}
            </p>
          )}
          <h1 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-3xl leading-tight">
            {product.name || "—"}
          </h1>
          {product.productType && (
            <p className="text-sm font-['Lato'] text-[#696664] uppercase tracking-wide">
              {displayLabel(product.productType)}
            </p>
          )}

          {(colorText || shadeText || fiberText) && (
            <div className="border border-gray-200 rounded-xl p-4 space-y-2">
              {colorText && (
                <p className="text-base font-['Lato'] text-[#4C4946]">
                  <span className="font-medium text-[#0d0b0a]">Colors:</span>{" "}
                  {colorText}
                </p>
              )}
              {shadeText && (
                <p className="text-base font-['Lato'] text-[#4C4946]">
                  <span className="font-medium text-[#0d0b0a]">Shades:</span>{" "}
                  {shadeText}
                </p>
              )}
              {fiberText && (
                <p className="text-base font-['Lato'] text-[#4C4946]">
                  <span className="font-medium text-[#0d0b0a]">Fibers:</span>{" "}
                  {fiberText}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

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

      {product.productHighlights && (
        <div className="space-y-2">
          <h2 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-xl">
            Product Highlights
          </h2>
          <p className="text-base font-['Lato'] text-[#4C4946] leading-relaxed">
            {product.productHighlights}
          </p>
        </div>
      )}

      {specs.length > 0 && (
        <div className="space-y-3">
          <h2 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-xl">
            Specifications
          </h2>
          <div className="rounded-2xl border border-gray-100 overflow-hidden">
            <table className="w-full">
              <tbody>
                {specs.map((spec) => (
                  <tr
                    key={spec.label}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="px-6 py-3.5 text-base font-['Lato'] text-[#4C4946] w-1/2">
                      {spec.label}
                    </td>
                    <td className="px-6 py-3.5 text-base font-['Lato'] text-[#0d0b0a] font-medium text-right">
                      {displayLabel(spec.value) || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetail;
