import { useCallback, useMemo, useState } from 'react';
import {
  fetchProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  removeProduct,
  normalizeProductList,
} from '../api/products';
import { ProductsContext } from './ProductsContext';

export function ProductsProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await fetchProducts();
      if (!error) setProducts(normalizeProductList(data));
      return { data, error };
    } finally {
      setLoading(false);
    }
  }, []);

  const loadProduct = useCallback(async (id) => {
    setLoading(true);
    setCurrentProduct(null);
    try {
      const { data, error } = await fetchProductById(id);
      if (!error) setCurrentProduct(data);
      return { data, error };
    } finally {
      setLoading(false);
    }
  }, []);

  const addProduct = useCallback((formData, options) => createProduct(formData, options), []);

  const editProduct = useCallback(
    (id, formData, options) => updateProduct(id, formData, options),
    [],
  );

  const deleteProduct = useCallback(async (id) => {
    const result = await removeProduct(id);
    if (!result.error) await loadProducts();
    return result;
  }, [loadProducts]);

  const value = useMemo(
    () => ({
      loading,
      products,
      currentProduct,
      loadProducts,
      loadProduct,
      createProduct: addProduct,
      updateProduct: editProduct,
      deleteProduct,
    }),
    [loading, products, currentProduct, loadProducts, loadProduct, addProduct, editProduct, deleteProduct],
  );

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export default ProductsProvider;
