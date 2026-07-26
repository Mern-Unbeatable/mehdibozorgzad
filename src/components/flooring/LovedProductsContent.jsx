import React, { memo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Heart, ShoppingBag, Trash2, ChevronRight } from 'lucide-react';
import { ROUTES } from '../../config';
import { useWishlist } from '../../context/WishlistContext';
import { confirmDelete } from '../../utils/swal';
import { displayLabel } from '../../utils/display';

const LovedProductCard = memo(({ product, onRemove, onViewDetails }) => (
  <article className="group flex flex-col bg-white border border-black/10 hover:border-black/25 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
    <div className="relative aspect-4/3 overflow-hidden bg-gray-50">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      <button
        type="button"
        onClick={() => onRemove(product.id)}
        aria-label={`Remove ${product.name} from loved products`}
        className="absolute top-4 right-4 p-2.5 bg-white/95 hover:bg-gray-100 text-gray-400 hover:text-[#0d0b0a] rounded-full shadow-sm transition-colors"
      >
        <Trash2 size={16} />
      </button>
    </div>

    <div className="flex flex-col flex-1 p-5 gap-4">
      <div className="flex flex-col gap-1.5">
        <span className="font-['Lato'] text-xs font-medium text-[#696664] uppercase tracking-wider">
          {displayLabel(product.brand)}
        </span>
        <h2 className="font-['Playfair_Display'] text-xl font-semibold text-[#0d0b0a] line-clamp-2">
          {product.name}
        </h2>
        {product.colorCount != null && (
          <p className="font-['Lato'] text-sm text-[#696664]">
            {product.colorCount} colors available
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => onViewDetails(product)}
        className="mt-auto w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#0d0b0a] hover:bg-[#2c2925] text-white font-['Lato'] text-sm font-semibold rounded-xl transition-colors"
      >
        See Details
        <ArrowRight size={16} />
      </button>
    </div>
  </article>
));
LovedProductCard.displayName = 'LovedProductCard';

const LovedProductsContent = memo(() => {
  const navigate = useNavigate();
  const { wishlistItems, items, wishlistCount = 0, removeFromWishlist, clearWishlist } = useWishlist();
  const lovedProducts = wishlistItems || items || [];
  const count = wishlistCount ?? lovedProducts.length;

  const handleClearAll = useCallback(async () => {
    const confirmed = await confirmDelete({
      title: 'Clear all loved products?',
      text: 'This will remove every saved product from your list on this device.',
      confirmButtonText: 'Yes, clear all',
    });

    if (confirmed) clearWishlist();
  }, [clearWishlist]);

  const handleViewDetails = useCallback(
    (product) => {
      const tab = product.tab || 'floors';
      navigate(`/flooring/${tab}/${product.id}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [navigate],
  );

  return (
    <div className="min-h-screen bg-[#fbfdff]">
      <div className="border-b border-gray-100 bg-white">
        <div className="container mx-auto px-4 py-4">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 font-['Lato'] text-sm text-[#696664]"
          >
            <Link
              to={ROUTES.FLOORING}
              className="inline-flex items-center gap-1.5 hover:text-[#0d0b0a] transition-colors"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Browse Flooring
            </Link>
            <ChevronRight size={14} aria-hidden="true" className="text-[#a8a29e]" />
            <span className="text-[#0d0b0a] font-medium">Loved Products</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 lg:py-14">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-10 lg:mb-12">
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-red-50 text-red-500 shrink-0 shadow-sm">
              <Heart size={28} className="fill-red-500 text-red-500" />
            </div>
            <div>
              <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-semibold text-[#0d0b0a] leading-tight">
                Loved Products
              </h1>
              <p className="font-['Lato'] text-base text-[#696664] mt-2 max-w-xl">
                {count > 0
                  ? `${count} saved ${count === 1 ? 'item' : 'items'} on this device. Come back anytime to review your favorites.`
                  : 'Save flooring you love while browsing — your list stays on this device.'}
              </p>
            </div>
          </div>

          {count > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="inline-flex items-center justify-center gap-2 self-start px-5 py-2.5 font-['Lato'] text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
            >
              <Trash2 size={16} />
              Clear All
            </button>
          )}
        </div>

        {count === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 bg-white border border-dashed border-gray-200 rounded-3xl text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center w-24 h-24 rounded-full bg-red-50 text-red-400 mb-6">
              <Heart size={40} strokeWidth={1.5} />
            </div>
            <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl font-semibold text-[#0d0b0a] mb-3">
              No loved products yet
            </h2>
            <p className="font-['Lato'] text-base text-[#696664] max-w-md mb-8 leading-relaxed">
              Tap the heart on any product while browsing our flooring catalog to build your
              personal shortlist.
            </p>
            <Link
              to={ROUTES.FLOORING}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0d0b0a] hover:bg-[#2c2925] text-white font-['Lato'] text-sm font-semibold rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              <ShoppingBag size={18} />
              Browse Catalog
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {lovedProducts.map((product) => (
                <LovedProductCard
                  key={product.id}
                  product={product}
                  onRemove={removeFromWishlist}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-200">
              <p className="font-['Lato'] text-sm text-[#696664] text-center sm:text-left">
                Saved locally in your browser — not synced across devices.
              </p>
              <Link
                to={ROUTES.FLOORING}
                className="inline-flex items-center gap-2 font-['Lato'] text-sm font-semibold text-[#0d0b0a] hover:text-[#57534d] transition-colors"
              >
                Continue browsing
                <ArrowRight size={16} />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
});

LovedProductsContent.displayName = 'LovedProductsContent';

export default LovedProductsContent;
