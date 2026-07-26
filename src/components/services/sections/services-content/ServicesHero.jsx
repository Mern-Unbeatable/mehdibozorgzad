import React, { memo } from 'react';

const HERO_BG = '/constHero.jpg';

const ServicesHero = memo(() => (
  <section className="relative h-72 md:h-120 lg:h-150 overflow-hidden">
    <img
      src={HERO_BG}
      alt="Services hero"
      className="absolute inset-0 w-full h-full object-cover"
    />
    {/* Left-to-right gradient overlay */}
    <div className="absolute inset-0 bg-linear-to-r from-black to-transparent" />
    <div className="relative h-full flex flex-col justify-center container mx-auto px-4">
      <div className="flex flex-col gap-4 max-w-xl lg:max-w-2xl">
        <h1 className="text-white font-['Playfair_Display'] font-semibold text-3xl md:text-5xl lg:text-[52px] leading-tight">
          Transform Your Space with Expert Craftsmanship
        </h1>
        <p className="text-white text-base leading-7">
          From flooring and cabinets to countertops and full home remodeling — we bring quality,
          style, and durability to every project.
        </p>
      </div>
    </div>
  </section>
));

ServicesHero.displayName = 'ServicesHero';

export default ServicesHero;
