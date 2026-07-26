import React from 'react';
import { useSEO } from '../hooks/useSEO';
import LovedProductsContent from '../components/flooring/LovedProductsContent';

const LovedProducts = () => {
  useSEO({
    title: 'Loved Products | American Carpet & Flooring',
    description:
      'View your saved favorite flooring products. Build a shortlist while browsing carpet, hardwood, tile, and more.',
    keywords: ['loved products', 'wishlist', 'saved flooring', 'favorite products'],
  });

  return <LovedProductsContent />;
};

export default LovedProducts;
