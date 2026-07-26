import React, { memo } from 'react';
import { Check } from 'lucide-react';

const SpaDetailSection = memo(function SpaDetailSection({ bullets, detailImages }) {
  return (
    <section className="py-14 md:py-16 lg:py-20" aria-label="Elevating Every Detail of Your Private Oasis">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:gap-35">
          <div className="flex flex-col gap-4 lg:w-1/2">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold leading-tight text-[#1c1c1c] lg:text-4xl">
              Elevating Every Detail of Your Private Oasis
            </h2>
            <p className="font-['Lato'] text-base md:text-lg leading-6 text-[#777]">
              We focus on high-end tiles, smart lighting, and ergonomic designs that turn your
              daily routine into a spa-like experience. Our craftsmanship ensures water-tight
              perfection and aesthetic brilliance.
            </p>
            <ul className="mt-2 flex flex-col gap-3">
              {bullets.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Check size={18} className="shrink-0 text-[#1c1c1c]" aria-hidden="true" />
                  <span className="font-['Lato'] text-xl text-[#777]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative w-full h-80 sm:h-[420px] lg:h-[640px] lg:w-1/2">
            <div className="absolute left-0 top-0 w-[58%] h-[90%] overflow-hidden rounded-xl border-4 border-white shadow-lg hidden lg:block">
              <img
                src={detailImages[0]}
                alt="Luxury spa bathroom tall view"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute right-0 top-0 w-[calc(50%-6px)] lg:w-[40%] h-full lg:h-[48%] overflow-hidden rounded-xl border-4 border-white shadow-lg">
              <img
                src={detailImages[1]}
                alt="Spa bathroom detail 1"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute left-0 bottom-0 w-[calc(50%-6px)] lg:left-auto lg:right-0 lg:w-[64%] h-full lg:h-[48%] z-10 overflow-hidden rounded-xl border-4 border-white shadow-lg">
              <img
                src={detailImages[2]}
                alt="Spa bathroom detail 2"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

SpaDetailSection.displayName = 'SpaDetailSection';

export default SpaDetailSection;
