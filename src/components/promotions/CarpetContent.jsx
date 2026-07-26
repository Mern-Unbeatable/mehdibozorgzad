import React, { memo } from 'react';
import { ROUTES } from '../../config';
import PromoContactSection from './PromoContactSection';
import CarpetHeroSection from './sections/carpet/CarpetHeroSection';
import CarpetPromoBodySection from './sections/carpet/CarpetPromoBodySection';

const HERO_IMAGE = '/carpetHero.webp';
const CARD_IMAGE_1 = '/carpet1.webp';
const CARD_IMAGE_2 = '/carpet2.webp';

const CarpetContent = memo(function CarpetContent() {
  return (
    <main>
      <CarpetHeroSection heroImage={HERO_IMAGE} />
      <CarpetPromoBodySection
        cardImage1={CARD_IMAGE_1}
        cardImage2={CARD_IMAGE_2}
        browseRoute={ROUTES.FLOORING}
      />

      <PromoContactSection />

    </main>
  );
});

export default CarpetContent;
