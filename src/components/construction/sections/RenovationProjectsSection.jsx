import React, { memo } from 'react';

const RenovationProjectsSection = memo(function RenovationProjectsSection({ images }) {
  return (
    <section className="py-14 md:py-16 lg:py-20 " aria-label="Renovation Projects">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex flex-col gap-3">
          <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#1c1c1c] lg:text-4xl">
            Renovation Projects
          </h2>
          <p className="font-['Lato'] text-base md:text-lg leading-6 text-[#777]">
            Explore the transformations we&apos;ve delivered for our clients.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {images.map((src, i) => (
            <div key={i} className="h-83 overflow-hidden rounded-lg border border-black/20">
              <img
                src={src}
                alt={`Renovation project ${i + 1}`}
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

RenovationProjectsSection.displayName = 'RenovationProjectsSection';

export default RenovationProjectsSection;
