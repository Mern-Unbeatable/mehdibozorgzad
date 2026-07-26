import React, { memo } from 'react';
import { useSEO } from '../hooks/useSEO';
import LifetimeWarrantyContent from '../components/why-choose-us/LifetimeWarrantyContent';

const LifetimeWarranty = memo(() => {
  useSEO({
    title: 'Lifetime Warranty | American Carpet & Flooring',
    description:
      'Full details of the Abbey Carpet lifetime warranty covering stain, soil, and abrasive wear protection for your carpet.',
    keywords: ['lifetime warranty', 'carpet warranty', 'abbey carpet', 'stain warranty'],
  });

  return <LifetimeWarrantyContent />;
});

LifetimeWarranty.displayName = 'LifetimeWarranty';

export default LifetimeWarranty;
