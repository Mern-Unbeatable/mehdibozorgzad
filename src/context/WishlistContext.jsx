import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const WishlistContext = createContext(null);
const STORAGE_KEY = 'lovedProducts';

const readWishlist = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeWishlist = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
};

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(readWishlist);

  const persist = useCallback((nextItems) => {
    setItems(nextItems);
    writeWishlist(nextItems);
  }, []);

  const isWishlisted = useCallback(
    (productId) => items.some((item) => item.id === productId),
    [items],
  );

  const toggleWishlist = useCallback(
    (product) => {
      setItems((current) => {
        const exists = current.some((item) => item.id === product.id);
        const next = exists
          ? current.filter((item) => item.id !== product.id)
          : [...current, product];
        writeWishlist(next);
        return next;
      });
    },
    [],
  );

  const removeFromWishlist = useCallback((productId) => {
    setItems((current) => {
      const next = current.filter((item) => item.id !== productId);
      writeWishlist(next);
      return next;
    });
  }, []);

  const clearWishlist = useCallback(() => {
    persist([]);
  }, [persist]);

  const value = useMemo(
    () => ({
      items,
      wishlistItems: items,
      wishlistCount: items.length,
      isWishlisted,
      toggleWishlist,
      removeFromWishlist,
      clearWishlist,
    }),
    [items, isWishlisted, toggleWishlist, removeFromWishlist, clearWishlist],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used inside WishlistProvider');
  }
  return context;
};

export default WishlistContext;
