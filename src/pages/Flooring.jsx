import React from 'react';
import { useSEO } from '../hooks/useSEO';
import FlooringContent from '../components/flooring/FlooringContent';

const Flooring = () => {
  useSEO({
    title: 'Browse Flooring Products | American Carpet & Flooring',
    description:
      'Explore our wide selection of premium flooring products including carpet, hardwood, tile, luxury vinyl, and laminate. Filter by brand, color, fiber, and more.',
    keywords: [
      'flooring',
      'carpet',
      'hardwood',
      'luxury vinyl',
      'tile',
      'laminate',
      'Torrance flooring',
      'South Bay flooring',
    ],
  });

  return <FlooringContent />;
};

export default Flooring;
