import { createContext, useContext } from 'react';

export const ProductsContext = createContext({
  loading: false,
  products: [],
  currentProduct: null,
  loadProducts: async () => {},
  loadProduct: async () => {},
  createProduct: async () => {},
  deleteProduct: async () => {},
});

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) throw new Error('useProducts must be used inside ProductsProvider');
  return context;
}
