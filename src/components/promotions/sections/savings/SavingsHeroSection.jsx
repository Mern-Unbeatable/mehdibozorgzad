import React, { memo } from 'react';

const SavingsHeroSection = memo(({ heroImage }) => (
  <section className="relative h-150 overflow-hidden">
    <img src={heroImage} alt="Savings hero" className="absolute inset-0 h-full w-full object-cover" />
    <div className="absolute inset-0 bg-[rgba(0,0,0,0.4)]" aria-hidden="true" />
    <div className="absolute inset-0 flex items-center justify-center px-4">
      <div className="flex w-full max-w-225 flex-col items-center gap-4 text-center text-white">
        <h1 className="w-full font-['Playfair_Display'] text-3xl font-semibold leading-normal lg:text-[48px]">
          SAVINGS UP TO 70% MANY SELECTIONS OF WATERPROOF FLOORING AND FLOOR TILE
        </h1>
        <p className="w-full text-center font-['Lato'] text-base leading-normal lg:text-[24px]">
          Over 300 Rolls Of Quality Carpet
        </p>
      </div>
    </div>
  </section>
));

SavingsHeroSection.displayName = 'SavingsHeroSection';

export default SavingsHeroSection;
