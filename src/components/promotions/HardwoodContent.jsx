import React, { memo } from 'react';
import { ROUTES } from '../../config';
import PromoContactSection from './PromoContactSection';
import HardwoodHeroSection from './sections/hardwood/HardwoodHeroSection';
import HardwoodPromoBodySection from './sections/hardwood/HardwoodPromoBodySection';

const HERO_IMAGE = '/constgallery3.jpg';
const CARD_IMAGE_1 = '/constgallery2.jpg';
const CARD_IMAGE_2 = '/constgallery6.jpg';

const HardwoodContent = memo(function HardwoodContent() {
  return (
    <main>
      <HardwoodHeroSection heroImage={HERO_IMAGE} />
      <HardwoodPromoBodySection
        cardImage1={CARD_IMAGE_1}
        cardImage2={CARD_IMAGE_2}
        browseRoute={ROUTES.FLOORING}
      />

      <PromoContactSection />
    </main>
  );
});

export default HardwoodContent;
