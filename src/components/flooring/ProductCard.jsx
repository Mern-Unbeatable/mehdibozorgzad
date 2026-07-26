import React, { memo, useCallback } from 'react';
import { Heart } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { displayLabel } from '../../utils/display';

const ProductCard = memo(({ product, onSelect, tab }) => {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const handleToggleWishlist = useCallback(
    (e) => {
      e.stopPropagation();
      toggleWishlist(tab ? { ...product, tab } : product);
    },
    [product, tab, toggleWishlist],
  );

  const handleSelect = useCallback(() => {
    if (onSelect) onSelect(product);
  }, [onSelect, product]);

  return (
    <article
      onClick={handleSelect}
      className="group bg-white border border-black/15 hover:border-black/30 transition-all duration-300 rounded-xl p-4 flex flex-col gap-6 cursor-pointer hover:shadow-lg"
    >
      <div className="relative h-72 overflow-hidden rounded-lg bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <button
          type="button"
          aria-label={wishlisted ? 'Remove from loved products' : 'Add to loved products'}
          onClick={handleToggleWishlist}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-md hover:bg-white transition-all duration-200 rounded-full h-11 w-11 flex items-center justify-center shadow-sm hover:scale-110 active:scale-95"
        >
          <Heart
            size={20}
            aria-hidden="true"
            className={`transition-colors duration-300 ${
              wishlisted ? 'fill-red-500 text-red-500' : 'text-[#696664] hover:text-red-500'
            }`}
          />
        </button>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <p className="font-['Lato'] font-normal text-base md:text-lg text-[#696664] leading-none">
              {displayLabel(product.brand)}
            </p>
            <p className="font-['Playfair_Display'] font-semibold text-xl md:text-2xl text-[#0d0b0a] leading-normal">
              {product.name}
            </p>
          </div>
          {product.colorCount != null && (
            <p className="font-['Lato'] font-normal text-lg md:text-xl text-[#1f1b18] leading-none">
              {product.colorCount} colors
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleSelect();
          }}
          className="w-full bg-[#0d0b0a] hover:bg-[#2c2925] transition-colors text-white text-base font-['Lato'] font-normal leading-6 px-6 py-3 rounded text-center"
        >
          See this in my room
        </button>
      </div>
    </article>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
