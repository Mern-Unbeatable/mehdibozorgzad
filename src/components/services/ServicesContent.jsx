import React, { memo } from 'react';
import ServicesHero from './sections/services-content/ServicesHero';
import CompleteSolutions from './sections/services-content/CompleteSolutions';
import PremiumFlooring from './sections/services-content/PremiumFlooring';

const ServicesContent = memo(() => (
  <div className="bg-[#fbfdff]">
    <ServicesHero />
    <CompleteSolutions />
    <PremiumFlooring />
  </div>
));

ServicesContent.displayName = 'ServicesContent';

export default ServicesContent;
