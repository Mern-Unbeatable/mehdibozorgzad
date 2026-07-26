import React, { memo } from 'react';

const KitchenGallerySection = memo(function KitchenGallerySection({ images }) {
  return (
    <section className="pt-14 md:pt-16 lg:pt-20" aria-label="Kitchen Gallery">
      <div className="container mx-auto px-4">
        <div className="mb-11 flex flex-col gap-2">
          <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#1c1c1c] lg:text-4xl">
            Kitchen Gallery
          </h2>
          <p className="font-['Lato'] text-base md:text-lg leading-6 text-[#777]">
            Beautiful kitchen projects designed and built by our team.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-5">
          {images.map((src, i) => (
            <div key={i} className="h-82 overflow-hidden rounded-xl">
              <img src={src} alt={`Kitchen gallery ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

KitchenGallerySection.displayName = 'KitchenGallerySection';

export default KitchenGallerySection;
