import React from 'react';
import { useSEO } from '../hooks/useSEO';
import HardwoodContent from '../components/promotions/HardwoodContent';

export default function HardwoodSale() {
  useSEO({
    title: 'Hardwood On Sale — Up To 40% Off | American Carpet & Flooring',
    description:
      'Save up to 40% on select hardwood flooring at American Carpet & Flooring in Torrance, CA. Visit our showroom or request a free estimate.',
    keywords: [
      'hardwood sale',
      'hardwood flooring',
      'hardwood discount',
      'hardwood torrance',
      '40% off hardwood',
    ],
  });

  return <HardwoodContent />;
}
