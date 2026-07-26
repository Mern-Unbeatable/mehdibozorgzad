import React, { memo } from 'react';

const ConstructionGallerySection = memo(function ConstructionGallerySection({ row1Images, row2Images }) {
  return (
    <section className="pt-14 md:pt-16 lg:pt-20" aria-label="Construction Gallery">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex flex-col gap-3">
          <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#1c1c1c] lg:text-4xl">
            Construction Gallery
          </h2>
          <p className="font-['Lato'] text-base md:text-lg leading-6 text-[#777]">
            A showcase of our recent building projects.
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {row1Images.map((src, i) => (
              <div key={i} className="h-48 overflow-hidden rounded-lg border border-black/20">
                <img
                  src={src}
                  alt={`Construction project ${i + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {row2Images.map((src, i) => (
              <div key={i} className="h-48 overflow-hidden rounded-lg border border-black/20">
                <img
                  src={src}
                  alt={`Construction project ${i + 7}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

ConstructionGallerySection.displayName = 'ConstructionGallerySection';

export default ConstructionGallerySection;
