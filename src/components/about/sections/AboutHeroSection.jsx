import React, { memo } from 'react';

const AboutHeroSection = memo(({ heroUrl }) => (
  <section className="relative h-80 overflow-hidden md:h-120 lg:h-140">
    <img src={heroUrl} alt="Flooring showroom" className="absolute inset-0 h-full w-full object-cover" />
    <div className="absolute inset-0 bg-black/50" />
    <div className="relative container mx-auto flex h-full flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 font-['Playfair_Display'] text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-[52px]">
        Elevate Your Space
      </h1>
      <p className="mb-8 text-base text-white md:text-lg lg:text-xl">
        Torrance&apos;s Flooring &amp; Remodeling Experts
      </p>
      <a
        href="#contact"
        className="cursor-pointer bg-white px-8 py-3.5 font-['Lato'] text-base font-medium text-[#1c1917] transition-colors hover:bg-gray-100"
      >
        Get Started Today
      </a>
    </div>
  </section>
));

AboutHeroSection.displayName = 'AboutHeroSection';

export default AboutHeroSection;
