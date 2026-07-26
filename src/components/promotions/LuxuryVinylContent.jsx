import React, { memo } from 'react';
import { ROUTES } from '../../config';
import PromoContactSection from './PromoContactSection';
import LuxuryVinylHeroSection from './sections/luxury-vinyl/LuxuryVinylHeroSection';
import LuxuryVinylPromoBodySection from './sections/luxury-vinyl/LuxuryVinylPromoBodySection';

const HERO_IMAGE = '/flooringImg.jpg';
const CARD_IMAGE_1 = '/constgallery4.jpg';
const CARD_IMAGE_2 = '/constgallery5.jpg';

const LuxuryVinylContent = memo(function LuxuryVinylContent() {
  return (
    <main>
      <LuxuryVinylHeroSection heroImage={HERO_IMAGE} />
      <LuxuryVinylPromoBodySection
        cardImage1={CARD_IMAGE_1}
        cardImage2={CARD_IMAGE_2}
        browseRoute={ROUTES.FLOORING}
      />

      <PromoContactSection />
    </main>
  );
});

export default LuxuryVinylContent;
