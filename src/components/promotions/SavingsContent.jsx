import React, { memo } from 'react';
import PromoContactSection from './PromoContactSection';
import SavingsBodySection from './sections/savings/SavingsBodySection';
import SavingsHeroSection from './sections/savings/SavingsHeroSection';
import SavingsWarehouseSection from './sections/savings/SavingsWarehouseSection';

const HERO_IMAGE = '/carpetHero.webp';
const CARD_IMAGE_1 = '/constgallery1.jpg';
const CARD_IMAGE_2 = '/constgallery4.jpg';
const CARD_IMAGE_3 = '/flooringImg.jpg';
const CARD_IMAGE_4 = '/constgallery7.jpg';
const WAREHOUSE_IMAGE = '/about2.webp';

const SavingsContent = memo(function SavingsContent() {
  return (
    <main>
      <SavingsHeroSection heroImage={HERO_IMAGE} />
      <SavingsBodySection
        cardImage1={CARD_IMAGE_1}
        cardImage2={CARD_IMAGE_2}
        cardImage3={CARD_IMAGE_3}
        cardImage4={CARD_IMAGE_4}
      />
      <SavingsWarehouseSection warehouseImage={WAREHOUSE_IMAGE} />

      <PromoContactSection />
    </main>
  );
});

export default SavingsContent;
