import React, { memo } from 'react';

const LuxuryVinylHeroSection = memo(({ heroImage }) => (
  <section className="relative h-150 overflow-hidden">
    <img
      src={heroImage}
      alt="Luxury vinyl sale hero"
      className="absolute inset-0 h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-[rgba(0,0,0,0.4)]" aria-hidden="true" />
    <div className="absolute inset-0 flex items-center justify-center px-4">
      <div className="flex w-full max-w-225 flex-col items-center gap-4 text-center text-white">
        <h1 className="w-full font-['Playfair_Display'] text-3xl font-semibold leading-normal lg:text-[48px]">
          Luxury Vinyl on Sale
        </h1>
        <p className="w-full text-center font-['Lato'] text-base leading-normal lg:text-[24px]">
          {`Both Luxury Vinyl Tile & Luxury Vinyl Plank will create stunning floors that are designed to look like hardwood or stone at a fraction of the price. These floors are durable, easy to maintain, waterproof and are great for any space including bathrooms and kitchens. They are simply built for the busiest lifestyles.`}
          <br />
          Professional installation is available by our knowledgeable and experienced installers.
        </p>
      </div>
    </div>
  </section>
));

LuxuryVinylHeroSection.displayName = 'LuxuryVinylHeroSection';

export default LuxuryVinylHeroSection;
