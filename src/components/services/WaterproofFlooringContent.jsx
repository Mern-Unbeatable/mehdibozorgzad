import React, { memo } from 'react';
import ServiceContactForm from './shared/ServiceContactForm';
import LocationCards from './shared/LocationCards';
import PhotoStrip from './shared/PhotoStrip';
import WaterproofHero from './sections/waterproof-flooring/WaterproofHero';
import WaterproofFeatures from './sections/waterproof-flooring/WaterproofFeatures';

const LOC1_IMG = '/about1.webp';
const LOC2_IMG = '/about2.webp';

const STRIP_ROW1 = [
  '/constgallery1.jpg',
  '/constgallery2.jpg',
  '/constgallery3.jpg',
  '/constgallery4.jpg',
  '/constgallery5.jpg',
];
const STRIP_ROW2 = [
  '/constgallery7.jpg',
  '/constgallery8.jpg',
  '/constgallery9.jpg',
  '/constgallery10.jpg',
];
const BADGE_IMG = '/logo.webp';

const WaterproofFlooringContent = memo(() => (
  <div className="bg-[#fbfdff]">
    <WaterproofHero />
    <WaterproofFeatures />

    {/* Contact Form */}
    <ServiceContactForm
      title="Get in Touch with Us!"
      desc="Have questions about our waterproof flooring solutions? Whether you need advice on product selection, installation tips, or anything else, we're here to help! Fill out the form below, and our team will get back to you shortly."
    />

    {/* Location Cards */}
    <LocationCards loc1Img={LOC1_IMG} loc2Img={LOC2_IMG} />

    {/* Photo Strip */}
    <PhotoStrip row1={STRIP_ROW1} row2={STRIP_ROW2} badgeImg={BADGE_IMG} />
  </div>
));

WaterproofFlooringContent.displayName = 'WaterproofFlooringContent';

export default WaterproofFlooringContent;
