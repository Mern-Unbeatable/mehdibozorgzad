import React from 'react';
import { useSEO } from '../hooks/useSEO';
import CarpetContent from '../components/promotions/CarpetContent';

export default function CarpetSale() {
  useSEO({
    title: 'Carpet On Sale — Now Up To 70% Off | American Carpet & Flooring',
    description:
      'Shop carpet on sale at American Carpet & Flooring in Torrance, CA. Up to 70% off retail price on select styles. Visit our showroom today.',
    keywords: [
      'carpet sale',
      'carpet discount',
      'carpet torrance',
      'carpet flooring',
      'carpet 70% off',
    ],
  });

  return <CarpetContent />;
}
