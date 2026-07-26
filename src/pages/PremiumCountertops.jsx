import React, { memo } from 'react';
import { useSEO } from '../hooks/useSEO';
import PremiumCountertopsContent from '../components/services/PremiumCountertopsContent';

const PremiumCountertops = memo(() => {
  useSEO({
    title: 'Premium Countertops | American Carpet & Flooring',
    description:
      'Custom-designed premium countertops in Torrance, CA. Quartz, granite, and more — crafted and installed by expert local craftsmen.',
  });
  return <PremiumCountertopsContent />;
});

PremiumCountertops.displayName = 'PremiumCountertops';
export default PremiumCountertops;
