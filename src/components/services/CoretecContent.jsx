import React, { memo } from 'react';
import ServiceContactForm from './shared/ServiceContactForm';
import LocationCards from './shared/LocationCards';
import PhotoStrip from './shared/PhotoStrip';
import CoretecHero from './sections/coretec/CoretecHero';
import CoretecFeatures from './sections/coretec/CoretecFeatures';

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

const CoretecContent = memo(() => (
  <div className="bg-[#fbfdff]">
    <CoretecHero />
    <CoretecFeatures />

    {/* Contact Form */}
    <ServiceContactForm
      title="Looking For COREtec® Floors?"
      desc="Send us a message or visit our showroom and we'll help you pick the best COREtec® Floors for your space!"
    />

    {/* Location Cards */}
    <LocationCards loc1Img={LOC1_IMG} loc2Img={LOC2_IMG} />

    {/* Photo Strip */}
    <PhotoStrip row1={STRIP_ROW1} row2={STRIP_ROW2} badgeImg={BADGE_IMG} />
  </div>
));

CoretecContent.displayName = 'CoretecContent';

export default CoretecContent;
