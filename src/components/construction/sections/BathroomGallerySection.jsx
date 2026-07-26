import React, { memo } from 'react';

const BathroomGallerySection = memo(function BathroomGallerySection({ images }) {
  return (
    <section className="py-14 md:py-16 lg:py-20" aria-label="Bathroom Gallery">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex flex-col gap-2">
          <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#1c1c1c] lg:text-4xl">
            Bathroom Gallery
          </h2>
          <p className="font-['Lato'] text-base md:text-lg leading-6 text-[#777]">
            A visual journey through our finest bathroom remodeling projects.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-5">
          {images.map((src, i) => (
            <div key={i} className="h-82 overflow-hidden rounded-xl">
              <img src={src} alt={`Bathroom gallery ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

BathroomGallerySection.displayName = 'BathroomGallerySection';

export default BathroomGallerySection;
