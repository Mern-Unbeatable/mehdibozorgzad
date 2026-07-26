import React, { memo } from 'react';
import { useSEO } from '../hooks/useSEO';
import CustomCabinetsContent from '../components/services/CustomCabinetsContent';

const CustomCabinets = memo(() => {
  useSEO({
    title: 'Custom Cabinets | American Carpet & Flooring',
    description:
      'Custom, semi-custom, and ready-to-install kitchen and bathroom cabinetry in Torrance, CA. Visit our showroom for the best selection.',
  });
  return <CustomCabinetsContent />;
});

CustomCabinets.displayName = 'CustomCabinets';
export default CustomCabinets;
