import React, { memo } from 'react';

const LocationsHero = memo(() => (
  <section className="bg-[#fbfdff] pt-14 md:pt-16 lg:pt-20 ">
    <div className="container mx-auto px-4">
      <h1 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-2xl md:text-3xl lg:text-4xl">
        Our Locations
      </h1>
    </div>
  </section>
));

LocationsHero.displayName = 'LocationsHero';

export default LocationsHero;
