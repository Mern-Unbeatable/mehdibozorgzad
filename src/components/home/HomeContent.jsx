import React, { memo } from 'react';
import HeroSlider from './HeroSlider';
import AboutSection from './AboutSection';
import FlooringSection from './FlooringSection';
import ServicesSection from './ServicesSection';
import TestimonialsSection from './TestimonialsSection';
import ShowroomSection from './ShowroomSection';
import WarehouseSection from './WarehouseSection';

const HomeContent = memo(() => (
  <>
    <HeroSlider />
    <AboutSection />
    <FlooringSection />
    <ServicesSection />
    <TestimonialsSection />
    <ShowroomSection />
    <WarehouseSection />
  
  </>
));

HomeContent.displayName = 'HomeContent';

export default HomeContent;
