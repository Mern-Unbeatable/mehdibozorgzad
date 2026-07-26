import React, { memo } from 'react';
import { useSEO } from '../hooks/useSEO';
import ExperienceContent from '../components/why-choose-us/ExperienceContent';

const TheExperience = memo(() => {
  useSEO({
    title: 'The Experience | American Carpet & Flooring',
    description:
      'Learn why customers enjoy shopping at American Carpet & Flooring — expert staff, exclusive brands, professional installation and more.',
    keywords: ['the experience', 'flooring', 'torrance', 'expert staff'],
  });

  return <ExperienceContent />;
});

TheExperience.displayName = 'TheExperience';

export default TheExperience;
