import React, { memo } from 'react';
import { useSEO } from '../hooks/useSEO';
import WaterproofFlooringContent from '../components/services/WaterproofFlooringContent';

const WaterproofFlooring = memo(() => {
  useSEO({
    title: 'Waterproof Flooring | American Carpet & Flooring',
    description:
      'The best waterproof flooring selection in Torrance, CA. Luxury vinyl, laminate, COREtec, and tile — visit our local showroom today.',
  });
  return <WaterproofFlooringContent />;
});

WaterproofFlooring.displayName = 'WaterproofFlooring';
export default WaterproofFlooring;
