import React, { memo } from 'react';
import ServiceContactForm from './shared/ServiceContactForm';
import LocationCards from './shared/LocationCards';
import PhotoStrip from './shared/PhotoStrip';
import CabinetsHero from './sections/custom-cabinets/CabinetsHero';
import CabinetsFeatures from './sections/custom-cabinets/CabinetsFeatures';

const LOC1_IMG = '/about1.webp';
const LOC2_IMG = '/about2.webp';

const STRIP_ROW1 = [
  '/constgallery6.jpg',
  '/constgallery7.jpg',
  '/constgallery8.jpg',
  '/constgallery9.jpg',
  '/constgallery10.jpg',
];
const STRIP_ROW2 = [
  '/constgallery11.jpg',
  '/constgallery12.jpg',
  '/remodelingImg.jpg',
  '/constgallery1.jpg',
];
const BADGE_IMG = '/logo.webp';

const CustomCabinetsContent = memo(() => (
  <div className="bg-[#fbfdff]">
    <CabinetsHero />
    <CabinetsFeatures />

    {/* Contact Form */}
    <ServiceContactForm
      title="Connect With Us For Custom Cabinets!"
      desc="Have questions about our custom cabinet solutions? Whether you're looking for design inspiration, material options, or installation details, we're here to help!"
    />

    {/* Location Cards */}
    <LocationCards loc1Img={LOC1_IMG} loc2Img={LOC2_IMG} />

    {/* Photo Strip */}
    <PhotoStrip row1={STRIP_ROW1} row2={STRIP_ROW2} badgeImg={BADGE_IMG} />
  </div>
));

CustomCabinetsContent.displayName = 'CustomCabinetsContent';

export default CustomCabinetsContent;
