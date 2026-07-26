import React, { memo } from 'react';
import { useSEO } from '../hooks/useSEO';
import ChooseAbbeyContent from '../components/why-choose-us/ChooseAbbeyContent';

const ChooseAbbey = memo(() => {
  useSEO({
    title: 'Choose Abbey | American Carpet & Flooring',
    description:
      'Discover why thousands of homeowners trust Abbey Carpet & Flooring for expert flooring solutions in Torrance, CA.',
    keywords: ['choose abbey', 'flooring', 'torrance', 'carpet'],
  });

  return <ChooseAbbeyContent />;
});

ChooseAbbey.displayName = 'ChooseAbbey';

export default ChooseAbbey;
