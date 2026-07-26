import React, { memo } from 'react';
import { useSEO } from '../hooks/useSEO';
import SixtyDayGuaranteeContent from '../components/why-choose-us/SixtyDayGuaranteeContent';

const SixtyDayGuarantee = memo(() => {
  useSEO({
    title: '60-Day Satisfaction Guarantee | American Carpet & Flooring',
    description:
      'Not satisfied? Replace your carpet or hard surface flooring within 60 days — including labor, no questions asked.',
    keywords: ['60 day guarantee', 'satisfaction guarantee', 'carpet replacement', 'abbey carpet'],
  });

  return <SixtyDayGuaranteeContent />;
});

SixtyDayGuarantee.displayName = 'SixtyDayGuarantee';

export default SixtyDayGuarantee;
