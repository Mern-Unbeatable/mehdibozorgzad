import React, { memo } from 'react';
import { useSEO } from '../hooks/useSEO';
import ConstructionContent from '../components/construction/ConstructionContent';

const Construction = memo(() => {
  useSEO({
    title: 'Construction Services',
    description:
      'Expert construction and remodeling services — kitchens, bathrooms, flooring, and full home renovations. American Carpet & Flooring, Torrance CA.',
    keywords: [
      'construction',
      'remodeling',
      'kitchen renovation',
      'bathroom remodeling',
      'home renovation',
    ],
  });

  return <ConstructionContent />;
});

Construction.displayName = 'Construction';

export default Construction;
