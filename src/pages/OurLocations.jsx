import React, { memo } from 'react';
import { useSEO } from '../hooks/useSEO';
import OurLocationsContent from '../components/locations/OurLocationsContent';

const OurLocations = memo(() => {
  useSEO({
    title: 'Our Locations | American Carpet & Flooring',
    description:
      'Visit American Carpet & Flooring at our Torrance and Gardena showrooms. Expert flooring and remodeling services since 1981.',
  });
  return <OurLocationsContent />;
});

OurLocations.displayName = 'OurLocations';
export default OurLocations;
