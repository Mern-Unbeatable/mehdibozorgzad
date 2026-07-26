import React, { memo } from 'react';
import ServiceContactForm from './shared/ServiceContactForm';
import LocationCards from './shared/LocationCards';
import PhotoStrip from './shared/PhotoStrip';
import CountertopsHero from './sections/premium-countertops/CountertopsHero';
import CountertopsFeatures from './sections/premium-countertops/CountertopsFeatures';

const LOC1_IMG = '/about1.webp';
const LOC2_IMG = '/about2.webp';

const STRIP_ROW1 = [
  '/constgallery9.jpg',
  '/constgallery10.jpg',
  '/constgallery11.jpg',
  '/constgallery12.jpg',
  '/remodelingImg.jpg',
];
const STRIP_ROW2 = [
  '/constgallery1.jpg',
  '/constgallery2.jpg',
  '/constgallery3.jpg',
  '/constgallery4.jpg',
];
const BADGE_IMG = '/logo.webp';

const PremiumCountertopsContent = memo(() => (
  <div className="bg-[#fbfdff]">
    <CountertopsHero />
    <CountertopsFeatures />

    {/* Contact Form */}
    <ServiceContactForm
      title="Connect With Us For Custom Countertops!"
      desc="Have questions about our premium countertop solutions? Whether you're looking for design inspiration, material options, or installation details, we're here to help!"
    />

    {/* Location Cards */}
    <LocationCards loc1Img={LOC1_IMG} loc2Img={LOC2_IMG} />

    {/* Photo Strip */}
    <PhotoStrip row1={STRIP_ROW1} row2={STRIP_ROW2} badgeImg={BADGE_IMG} />
  </div>
));

PremiumCountertopsContent.displayName = 'PremiumCountertopsContent';
export default PremiumCountertopsContent;
