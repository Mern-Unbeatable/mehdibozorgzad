import React, { memo } from 'react';

const SpaBathroomConversionSection = memo(function SpaBathroomConversionSection({ images }) {
  return (
    <section className="" aria-label="Luxury Spa Bathroom Conversion">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 font-['Playfair_Display'] text-3xl font-bold text-[#1c1c1c] lg:text-4xl">
          Luxury Spa Bathroom Conversion
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {images.map((src, i) => (
            <div key={i} className="h-83 overflow-hidden rounded-lg border border-black/20">
              <img
                src={src}
                alt={`Spa bathroom conversion ${i + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

SpaBathroomConversionSection.displayName = 'SpaBathroomConversionSection';

export default SpaBathroomConversionSection;
