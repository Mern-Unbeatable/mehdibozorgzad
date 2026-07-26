import React, { memo } from 'react';
import ServiceContactForm from './shared/ServiceContactForm';
import LocationCards from './shared/LocationCards';
import HomeRemodelingHero from './sections/home-remodeling/HomeRemodelingHero';
import HomeRemodelingFeatures from './sections/home-remodeling/HomeRemodelingFeatures';
import InspirationGallery from './sections/home-remodeling/InspirationGallery';

const LOC1_IMG = '/about1.webp';
const LOC2_IMG = '/about2.webp';

const HomeRemodelingContent = memo(() => (
  <div className="bg-[#FBFDFF]">
    <HomeRemodelingHero />
    <HomeRemodelingFeatures />
    <InspirationGallery />

    {/* Contact Form */}
    <ServiceContactForm
      title="Contact Us for Your Total Home Remodeling Needs!"
      desc="Ready to transform your home in Torrance? Whether you're interested in expert kitchen and bathroom remodeling, the best waterproof floors, or a complete home makeover, our dedicated team is here to assist you!"
    />

    {/* Location Cards */}
    <LocationCards loc1Img={LOC1_IMG} loc2Img={LOC2_IMG} />
  </div>
));

HomeRemodelingContent.displayName = 'HomeRemodelingContent';
export default HomeRemodelingContent;
