import React from 'react';
import { useSEO } from '../hooks/useSEO';
import LuxuryVinylContent from '../components/promotions/LuxuryVinylContent';

export default function LuxuryVinylSale() {
  useSEO({
    title: 'Luxury Vinyl On Sale — Up To 40% Off | American Carpet & Flooring',
    description:
      'Shop luxury vinyl plank and tile on sale at American Carpet & Flooring in Torrance, CA. Waterproof, durable, and up to 40% off select styles.',
    keywords: [
      'luxury vinyl sale',
      'LVP sale',
      'LVT sale',
      'vinyl flooring torrance',
      'waterproof flooring',
    ],
  });

  return <LuxuryVinylContent />;
}
