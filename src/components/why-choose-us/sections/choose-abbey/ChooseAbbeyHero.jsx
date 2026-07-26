import React, { memo } from 'react';

const HERO_URL = '/constHero.jpg';

const ChooseAbbeyHero = memo(() => (
  <section className="relative h-80 md:h-120 lg:h-140 overflow-hidden">
    <img
      src={HERO_URL}
      alt="Why choose Abbey"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/50" />
    <div className="relative h-full flex flex-col items-start justify-center container mx-auto px-4">
      <span className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white text-sm px-4 py-1.5 rounded-full mb-5">
        Trusted by Thousands
      </span>
      <h1 className="text-white font-['Playfair_Display'] font-semibold text-4xl md:text-5xl lg:text-[52px] leading-tight max-w-2xl mb-4">
        Become Our Next Satisfied Customer
      </h1>
      <p className="text-white text-base md:text-lg lg:text-xl max-w-xl mb-8">
        Discover why thousands of homeowners in Torrance trust Abbey Carpet &amp; Flooring for
        their home improvement needs.
      </p>
      <a
        href="#contact"
        className="bg-white text-[#1c1917] font-['Lato'] font-medium text-base px-8 py-3.5 hover:bg-gray-100 transition-colors cursor-pointer"
      >
        Get Started Today
      </a>
    </div>
  </section>
));

ChooseAbbeyHero.displayName = 'ChooseAbbeyHero';

export default ChooseAbbeyHero;
