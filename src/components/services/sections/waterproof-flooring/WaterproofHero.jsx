import React, { memo } from 'react';

const HERO_BG = '/flooringImg.jpg';

const WaterproofHero = memo(() => (
  <section className="relative h-72 md:h-120 lg:h-150 overflow-hidden">
    <img
      src={HERO_BG}
      alt="Waterproof Flooring"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-linear-to-r from-black to-transparent" />
    <div className="relative h-full flex flex-col justify-center container mx-auto px-4">
      <div className="flex flex-col gap-5 max-w-xl lg:max-w-2xl">
        <h1 className="text-white font-['Playfair_Display'] font-semibold text-3xl md:text-5xl lg:text-[52px] leading-tight">
          The Best Waterproof Flooring
        </h1>
        <p className="text-white text-base leading-7">
          Durable, water-resistant flooring solutions designed to protect your space from moisture
          while delivering a clean, modern, and long-lasting finish.
        </p>
      </div>
    </div>
  </section>
));

WaterproofHero.displayName = 'WaterproofHero';

export default WaterproofHero;
