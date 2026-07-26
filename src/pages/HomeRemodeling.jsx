import React, { memo } from 'react';
import { useSEO } from '../hooks/useSEO';
import HomeRemodelingContent from '../components/services/HomeRemodelingContent';

const HomeRemodeling = memo(() => {
  useSEO({
    title: 'Home Remodeling | American Carpet & Flooring',
    description:
      'Total home remodeling in Torrance, CA — kitchen, bathroom, and complete home transformations with expert craftsmanship and personalized service.',
  });
  return <HomeRemodelingContent />;
});

HomeRemodeling.displayName = 'HomeRemodeling';
export default HomeRemodeling;
