import React, { memo } from 'react';

const HERO_BG = '/constHero.jpg';

const ProjectGalleryHero = memo(() => (
  <section className="relative h-72 md:h-120 lg:h-150 overflow-hidden">
    <img
      src={HERO_BG}
      alt="Project Gallery"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/50" />
    <div className="relative h-full flex flex-col items-center justify-center text-center container mx-auto px-4 gap-4">
      <h1 className="text-white font-['Playfair_Display'] font-semibold text-3xl md:text-5xl lg:text-[52px] leading-tight tracking-wide">
        Project Gallery
      </h1>
      <p className="text-white text-base md:text-xl leading-7 max-w-xl">
        Gather Inspiration For Your Next Remodeling Project
      </p>
    </div>
  </section>
));

ProjectGalleryHero.displayName = 'ProjectGalleryHero';

export default ProjectGalleryHero;
