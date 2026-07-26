import React, { memo } from 'react';

const LocationsShowrooms = memo(({ locations }) => (
  <section className="py-6 md:py-8">
    <div className="container mx-auto px-4">
      <div className="bg-[#f8fafc] border border-[#f1f5f9] rounded-2xl px-6 py-8 md:px-10 md:py-11 shadow-xs">
        <div className="flex flex-col md:flex-row gap-8 md:gap-6 items-stretch justify-between">
          {locations.map((loc) => (
            <div key={loc.id} className="flex flex-col gap-4 w-full md:w-[calc(50%-12px)]">
              <h2 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-xl md:text-2xl lg:text-3xl leading-tight">
                {loc.label} Showroom
              </h2>
              <div className="rounded-xl overflow-hidden h-60 md:h-80 lg:h-[534px] shadow-sm relative group">
                <img
                  src={loc.photo}
                  alt={`${loc.label} showroom`}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
));

LocationsShowrooms.displayName = 'LocationsShowrooms';

export default LocationsShowrooms;
