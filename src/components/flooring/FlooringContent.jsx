import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ROUTES } from '../../config';
import FlooringCatalogSection from './sections/FlooringCatalogSection';
import FlooringProductDetailSection from './sections/FlooringProductDetailSection';

import FilterSidebar from './FilterSidebar';
import ProductSkeleton from './ProductSkeleton';
import ProductCard from './ProductCard';
import Pagination from './Pagination';

import flooringData from './data/flooringData.json';

const {
  MOCK_PRODUCTS,
  PRODUCT_ATTRIBUTES,
  TAB_FILTER_CONFIG,
  CATEGORY_TABS,
  FLOOR_SWATCHES,
  WALL_SWATCHES,
  TAB_DESCRIPTIONS,
  TAB_COLOR_LABELS,
} = flooringData;

const VALID_TABS = new Set(Object.keys(MOCK_PRODUCTS));

const getInitialFilters = (tabId) =>
  Object.fromEntries((TAB_FILTER_CONFIG[tabId] || []).map((g) => [g.id, []]));

const PAGE_SIZE = 9;

function getProductSpecs(product, tab) {
  if (tab === 'floors') {
    return [
      ['Product Highlights', 'Polyester'],
      ['SKU', 'SS' + product.id.slice(1).padStart(4, '0') + '57'],
      ['Category', 'Carpet'],
      ['Construction', 'Texture'],
      ['Fiber', '100%PET Polyester'],
      ['Color Family', 'Brown'],
      ['Shade', 'Medium'],
      ['Material', 'Broadloom'],
      ['Residential', 'Yes'],
      ['Warranty', '60 Day Warranty'],
    ];
  }
  if (tab === 'rugs') {
    return [
      ['Product Highlights', "8' x 10'"],
      ['SKU', 'DPR8460NQ0863'],
      ['Collection', 'Neutral Jute'],
      ['Category', 'Area Rugs'],
      ['Color Family', 'Beige'],
      ['Shade', 'Light'],
      ['Shape', 'Rectangle'],
    ];
  }
  if (tab === 'countertops') {
    return [
      ['SKU', 'CM08L64127MT328'],
      ['Collection', 'Panoramic Porcelain Surfaces'],
      ['Category', 'Porcelain Slab'],
      ['Product Look', 'Slab'],
      ['Species', 'Elemental Selection'],
      ['Color Family', 'White'],
      ['Shade', 'Light'],
      ['Material', 'Matte'],
      ['Shape', 'Slab'],
      ['Series', 'Elemental Selection'],
      ['Thickness', '12MM'],
    ];
  }
  return [
    ['SKU', 'HSTO304'],
    ['Category', 'Tile & Stone'],
    ['Color Family', 'Beige'],
    ['Shade', 'Light'],
    ['Material', 'Ceramic'],
    ['Residential Use', 'Yes'],
    ['Warranty', '60 Day Warranty'],
    ['Thickness', '5.0'],
  ];
}

function getProductColorValue(tab) {
  if (tab === 'rugs') return "8' x 10'";
  if (tab === 'countertops') return 'Statuario';
  if (tab === 'walls') return 'Fine China';
  return 'Pier Walk';
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

  const selectedProduct = useMemo(() => {
    if (!productId || !VALID_TABS.has(routeTab)) return null;
    return (MOCK_PRODUCTS[routeTab] || []).find((product) => product.id === productId) ?? null;
  }, [productId, routeTab]);

  useEffect(() => {
    setFilters(getInitialFilters(activeTab));
    setCurrentPage(1);
  }, [activeTab]);

  useEffect(() => {
    if (productId && routeTab && !selectedProduct) {
      navigate(`${ROUTES.FLOORING}?tab=${activeTab}`, { replace: true });
    }
  }, [activeTab, navigate, productId, routeTab, selectedProduct]);

  const handleSelectProduct = useCallback(
    (product) => {
      navigate(`/flooring/${activeTab}/${product.id}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [activeTab, navigate],
  );

  const handleBack = useCallback(() => {
    navigate(`${ROUTES.FLOORING}?tab=${activeTab}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab, navigate]);

  const loading = false;
  const allTabProducts = MOCK_PRODUCTS[activeTab] || [];
  const filterGroups = TAB_FILTER_CONFIG[activeTab] || [];

  const getBrandId = useCallback((brandName) => {
    return brandName ? brandName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '') : '';
  }, []);

  const filteredProducts = useMemo(() => {
    return allTabProducts.filter((product) => {
      for (const group of filterGroups) {
        const selectedOptions = filters[group.id] || [];
        if (selectedOptions.length === 0) continue;

        let productValue = '';
        if (group.id === 'brand') {
          productValue = getBrandId(product.brand);
        } else {
          const attrs = PRODUCT_ATTRIBUTES[product.id] || {};
          productValue = attrs[group.id] || '';
        }

        if (!selectedOptions.includes(productValue)) {
          return false;
        }
      }
      return true;
    });
  }, [allTabProducts, filterGroups, filters, getBrandId]);

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

  if (selectedProduct) {
    return (
      <FlooringProductDetailSection
        product={selectedProduct}
        tab={activeTab}
        allTabProducts={MOCK_PRODUCTS[activeTab] || []}
        onBack={handleBack}
        onSelect={handleSelectProduct}
        ProductCard={ProductCard}
        getProductSpecs={getProductSpecs}
        tabDescriptions={TAB_DESCRIPTIONS}
        tabColorLabels={TAB_COLOR_LABELS}
        getProductColorValue={getProductColorValue}
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
      loading={loading}
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
