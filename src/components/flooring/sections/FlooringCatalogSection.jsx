import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Heart, SlidersHorizontal } from 'lucide-react';
import FlooringMobileFiltersDrawer from './FlooringMobileFiltersDrawer';
import { useWishlist } from '../../../context/WishlistContext';
import { ROUTES } from '../../../config';

const FlooringCatalogSection = memo(
  ({
    filterGroups,
    filters,
    onToggle,
    hasActiveFilters,
    activeFilterCount,
    onOpenFilters,
    categoryTabs,
    activeTab,
    onTabChange,
    loading,
    products,
    pageSize,
    onSelectProduct,
    onClearFilters,
    currentPage,
    totalPages,
    onPageChange,
    filtersOpen,
    onCloseFilters,
    FilterSidebar,
    ProductSkeleton,
    ProductCard,
    Pagination,
  }) => {
    const { wishlistCount } = useWishlist();

    return (
      <div className="min-h-screen bg-[#fbfdff]">
        <div className="container mx-auto px-4 py-10 lg:py-14">
          <div className="flex items-start gap-10">
            <div className="hidden w-72 shrink-0 lg:block">
              <FilterSidebar filterGroups={filterGroups} filters={filters} onToggle={onToggle} />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-8">
              <div className="flex items-start justify-between gap-4">
                <h1 className="font-['Playfair_Display'] text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight text-[#1c1916]">
                  Browse Flooring Products
                </h1>
                <button
                  type="button"
                  onClick={onOpenFilters}
                  className="mt-2 flex shrink-0 items-center gap-2 rounded bg-[#f5f5f5] px-4 py-3 font-['Lato'] text-base text-[#1c1916] transition-colors hover:bg-gray-200 lg:hidden"
                  aria-label="Open filters"
                >
                  <SlidersHorizontal size={18} aria-hidden="true" />
                  Filters
                  {hasActiveFilters && (
                    <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#5627ff] text-xs text-white">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-3" role="tablist" aria-label="Product categories">
                  {categoryTabs.map(({ id, label }) => (
                    <button
                      key={id}
                      type="button"
                      role="tab"
                      aria-selected={activeTab === id}
                      onClick={() => onTabChange(id)}
                      className={`rounded px-4  md:px-6 py-3 font-['Lato'] text-sm md:text-base lg:text-lg font-normal transition-colors ${
                        activeTab === id
                          ? 'border border-[#1c1916] bg-[#1c1916] text-white'
                          : 'border border-black/20 text-[#696664] hover:border-black/40'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <Link
                  to={ROUTES.LOVED_PRODUCTS}
                  aria-label="View loved products"
                  className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded bg-[#f5f5f5] transition-all hover:bg-gray-200 hover:scale-105 active:scale-95"
                >
                  <Heart
                    size={24}
                    aria-hidden="true"
                    className={`transition-colors duration-300 ${
                      wishlistCount > 0 ? 'fill-red-500 text-red-500' : 'text-[#1c1916]'
                    }`}
                  />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-bold text-white shadow-sm">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3" role="tabpanel" aria-label={`${activeTab} products`}>
              {loading
                ? Array.from({ length: pageSize }).map((_, index) => <ProductSkeleton key={index} />)
                : products.map((product) => (
                    <ProductCard
                      key={product.id ?? product._id}
                      product={product}
                      tab={activeTab}
                      onSelect={onSelectProduct}
                    />
                  ))}
            </div>

            {!loading && products.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 px-8 bg-white border border-dashed border-[#e4e7e9] rounded-2xl text-center shadow-sm max-w-lg mx-auto my-8">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#f4f3ff] text-[#5627ff] mb-6">
                  <SlidersHorizontal size={28} strokeWidth={1.5} className="animate-pulse" />
                </div>
                <h3 className="font-['Playfair_Display'] text-[26px] font-semibold text-[#0d0b0a] mb-3 leading-tight">
                  No Products Match Your Filters
                </h3>
                <p className="font-['Lato'] text-base text-[#696664] max-w-xs mb-6 leading-relaxed">
                  We couldn't find any flooring options matching your selected criteria. Try removing or adjusting your filters.
                </p>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={onClearFilters}
                    className="inline-flex items-center justify-center rounded-lg bg-black px-6 py-3 font-['Lato'] text-base font-semibold text-white shadow-md shadow-[#5627ff]/10 hover:shadow-[#5627ff]/20 transition-all hover:-translate-y-0.5 duration-200 cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                )}
              </div>
            )}

            {!loading && products.length > 0 && (
              <div className="flex justify-center pt-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <FlooringMobileFiltersDrawer
        isOpen={filtersOpen}
        onClose={onCloseFilters}
        hasActiveFilters={hasActiveFilters}
        onClearAll={onClearFilters}
        filterGroups={filterGroups}
        filters={filters}
        onToggle={onToggle}
        FilterSidebar={FilterSidebar}
      />
    </div>
  );
});

FlooringCatalogSection.displayName = 'FlooringCatalogSection';

export default FlooringCatalogSection;
