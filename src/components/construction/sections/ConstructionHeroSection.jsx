import React, { memo } from 'react';
import { ArrowRight } from 'lucide-react';

const ConstructionHeroSection = memo(function ConstructionHeroSection({ heroImage }) {
  return (
    <section className="relative h-150 overflow-hidden" aria-label="Hero">
      <img
        src={heroImage}
        alt="Excellence in Construction - modern building exterior"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0 bg-linear-to-r from-[rgba(0,0,0,0.55)] to-transparent"
        aria-hidden="true"
      />
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <div className="flex max-w-xl flex-col gap-4">
            <span className="inline-flex self-start rounded-full bg-[rgba(255,255,255,0.24)] px-5 py-0.5 text-sm text-[rgba(255,255,255,0.8)]">
              Excellence in Construction
            </span>
            <h1 className="font-['Playfair_Display'] text-4xl font-normal leading-tight text-white lg:text-[52px]">
              Excellence in Construction
              <br />
              Crafting Your Perfect Vision
            </h1>
            <p className="max-w-lg font-['Lato'] text-base leading-6 text-[rgba(255,255,255,0.8)]">
              From historic renovations to cutting-edge home design, we redefine what it means to
              build with passion and precision.
            </p>
            <a
              href="#services"
              className="inline-flex self-start items-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-medium uppercase tracking-widest text-[#090909] transition-colors hover:bg-gray-50"
            >
              View Our Services
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});

ConstructionHeroSection.displayName = 'ConstructionHeroSection';

export default ConstructionHeroSection;
