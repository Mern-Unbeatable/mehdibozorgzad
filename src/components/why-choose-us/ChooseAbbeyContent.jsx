import React, { memo } from 'react';
import ContactSection from '../common/ContactSection';
import ChooseAbbeyHero from './sections/choose-abbey/ChooseAbbeyHero';
import ChooseAbbeyStats from './sections/choose-abbey/ChooseAbbeyStats';
import ChooseAbbeyFeatures from './sections/choose-abbey/ChooseAbbeyFeatures';

const ChooseAbbeyContent = memo(() => (
  <div className="bg-white">
    <ChooseAbbeyHero />
    <ChooseAbbeyStats />
    <ChooseAbbeyFeatures />

    {/* Contact */}
    <div id="contact">
      <ContactSection />
    </div>
  </div>
));

ChooseAbbeyContent.displayName = 'ChooseAbbeyContent';

export default ChooseAbbeyContent;
