import React, { memo } from 'react';
import FinancingHeroSection from './sections/financing/FinancingHeroSection';
import FinancingInfoSection from './sections/financing/FinancingInfoSection';

const HERO_IMAGE = '/about2.webp';
const SERVICE_FINANCE_LOGO =
  '/logo.webp';

const FinancingContent = memo(function FinancingContent() {
  return (
    <main>
      <FinancingHeroSection heroImage={HERO_IMAGE} />
      <FinancingInfoSection serviceFinanceLogo={SERVICE_FINANCE_LOGO} />
    </main>
  );
});

export default FinancingContent;
