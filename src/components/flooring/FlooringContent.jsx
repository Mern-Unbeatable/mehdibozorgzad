import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ROUTES } from '../../config';
import { fetchAllPublicProducts, fetchProductById } from '../../api/products';
import FlooringCatalogSection from './sections/FlooringCatalogSection';
import FlooringProductDetailSection from './sections/FlooringProductDetailSection';

import FilterSidebar from './FilterSidebar';
import ProductSkeleton from './ProductSkeleton';
import ProductCard from './ProductCard';
import Pagination from './Pagination';

import flooringData from './data/flooringData.json';

const {
  TAB_FILTER_CONFIG,
  CATEGORY_TABS,
  FLOOR_SWATCHES,
  WALL_SWATCHES,
  TAB_DESCRIPTIONS,
  TAB_COLOR_LABELS,
} = flooringData;

const VALID_TABS = new Set(CATEGORY_TABS.map((tab) => tab.id));

const getInitialFilters = (tabId) =>
  Object.fromEntries((TAB_FILTER_CONFIG[tabId] || []).map((g) => [g.id, []]));

const PAGE_SIZE = 9;

function getProductSpecs(product, tab) {
  if (product?.specRows?.length) return product.specRows;

  if (tab === 'floors') {
    return [
      ['Product Highlights', 'Polyester'],
      ['SKU', '—'],
      ['Category', 'Carpet'],
    ];
  }

  return [['SKU', '—']];
}

const FlooringContent = () => {
  const navigate = useNavigate();
  const { tab: routeTab, productId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = VALID_TABS.has(routeTab)
    ? routeTab
    : VALID_TABS.has(searchParams.get('tab'))
      ? searchParams.get('tab')
      : 'floors';

  const [filters, setFilters] = useState(() => getInitialFilters(activeTab));
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [catalogProducts, setCatalogProducts] = useState([]);
  const [selectedProductDetail, setSelectedProductDetail] = useState(null);

  const productsByTab = useMemo(() => {
    const grouped = { floors: [], rugs: [], countertops: [], walls: [] };

    catalogProducts.forEach((product) => {
      if (grouped[product.tab]) grouped[product.tab].push(product);
    });

    return grouped;
  }, [catalogProducts]);

  useEffect(() => {
    let active = true;

    const loadCatalog = async () => {
      setCatalogLoading(true);
      const { data, error } = await fetchAllPublicProducts();

      if (!active) return;

      if (error) {
        setCatalogProducts([]);
      } else {
        setCatalogProducts(data);
      }

      setCatalogLoading(false);
    };

    loadCatalog();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    setFilters(getInitialFilters(activeTab));
    setCurrentPage(1);
  }, [activeTab]);

  useEffect(() => {
    if (!productId) {
      setSelectedProductDetail(null);
      setDetailLoading(false);
      return;
    }

    let active = true;

    const loadDetail = async () => {
      setDetailLoading(true);
      const { data, error } = await fetchProductById(productId);

      if (!active) return;

      if (error) {
        const fallback = catalogProducts.find((product) => product.id === productId) ?? null;
        setSelectedProductDetail(fallback);
      } else {
        setSelectedProductDetail(data);
      }

      setDetailLoading(false);
    };

    loadDetail();

    return () => {
      active = false;
    };
  }, [productId, catalogProducts]);

  const selectedProduct = selectedProductDetail;

  const handleSelectProduct = useCallback(
    (product) => {
      const tab = product.tab || activeTab;
      navigate(`/flooring/${tab}/${product.id}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [activeTab, navigate],
  );

  const handleBack = useCallback(() => {
    navigate(`${ROUTES.FLOORING}?tab=${activeTab}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab, navigate]);

  const allTabProducts = productsByTab[activeTab] || [];
  const filterGroups = TAB_FILTER_CONFIG[activeTab] || [];

  const filteredProducts = useMemo(() => {
    return allTabProducts.filter((product) => {
      for (const group of filterGroups) {
        const selectedOptions = filters[group.id] || [];
        if (selectedOptions.length === 0) continue;

        const productValue = product.filterValues?.[group.id] ?? '';
        if (!productValue || !selectedOptions.includes(productValue)) {
          return false;
        }
      }
      return true;
    });
  }, [allTabProducts, filterGroups, filters]);

  const total = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const products = filteredProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleFilterToggle = useCallback((groupId, optionId) => {
    setCurrentPage(1);
    setFilters((prev) => {
      const current = prev[groupId] || [];
      return {
        ...prev,
        [groupId]: current.includes(optionId)
          ? current.filter((id) => id !== optionId)
          : [...current, optionId],
      };
    });
  }, []);

  const handleTabChange = useCallback(
    (tabId) => {
      setSearchParams({ tab: tabId });
      setFilters(getInitialFilters(tabId));
      setCurrentPage(1);
    },
    [setSearchParams],
  );

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const hasActiveFilters = filterGroups.some(({ id }) => (filters[id] || []).length > 0);
  const activeFilterCount = filterGroups.reduce(
    (acc, { id }) => acc + (filters[id] || []).length,
    0,
  );

  if (detailLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <p className="text-center font-['Lato'] text-[#696664]">Loading product...</p>
      </div>
    );
  }

  if (productId && !selectedProduct) {
    return (
      <div className="container mx-auto px-4 py-16 text-center space-y-4">
        <p className="font-['Lato'] text-[#696664]">Product not found.</p>
        <button
          type="button"
          onClick={handleBack}
          className="font-['Lato'] text-[#0d0b0a] underline hover:no-underline cursor-pointer"
        >
          Back to products
        </button>
      </div>
    );
  }

  if (selectedProduct) {
    return (
      <FlooringProductDetailSection
        product={selectedProduct}
        tab={activeTab}
        allTabProducts={allTabProducts}
        onBack={handleBack}
        onSelect={handleSelectProduct}
        ProductCard={ProductCard}
        getProductSpecs={getProductSpecs}
        tabDescriptions={TAB_DESCRIPTIONS}
        tabColorLabels={TAB_COLOR_LABELS}
        floorSwatches={FLOOR_SWATCHES}
        wallSwatches={WALL_SWATCHES}
      />
    );
  }

  return (
    <FlooringCatalogSection
      filterGroups={filterGroups}
      filters={filters}
      onToggle={handleFilterToggle}
      hasActiveFilters={hasActiveFilters}
      activeFilterCount={activeFilterCount}
      onOpenFilters={() => setFiltersOpen(true)}
      categoryTabs={CATEGORY_TABS}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      loading={catalogLoading}
      products={products}
      pageSize={PAGE_SIZE}
      onSelectProduct={handleSelectProduct}
      onClearFilters={() => {
        setFilters(getInitialFilters(activeTab));
        setCurrentPage(1);
      }}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      filtersOpen={filtersOpen}
      onCloseFilters={() => setFiltersOpen(false)}
      FilterSidebar={FilterSidebar}
      ProductSkeleton={ProductSkeleton}
      ProductCard={ProductCard}
      Pagination={Pagination}
    />
  );
};

export default FlooringContent;
