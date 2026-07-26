import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { FLOORING_TYPES } from './homeData';

const FlooringSection = memo(() => (
  <section
    id="flooring"
    className="pb-14 md:pb-16 lg:pb-20 bg-white"
    aria-labelledby="flooring-heading"
  >
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <p className="text-sm uppercase tracking-[4.2px] text-[#57534d] mb-3">Collections</p>
        <h2
          id="flooring-heading"
          className="font-['Playfair_Display'] font-semibold text-[#1c1917] text-3xl lg:text-4xl"
        >
          Premium Flooring
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {FLOORING_TYPES.map(({ id, title, description, cta, image, href }) => (
          <div key={id} className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <div className="rounded-lg overflow-hidden h-70 bg-[#e9e9e9]">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <h3 className="font-['Lato'] font-medium text-[#1c1917] text-2xl leading-normal mb-2">
                  {title}
                </h3>
                <p className="font-['Lato'] text-[#404040] text-base leading-6">{description}</p>
              </div>
            </div>
            <Link
              to={href}
              className="inline-flex items-center gap-3 bg-[#2a2a2a] text-white hover:bg-[#3a3a3a] transition-colors px-5 py-2.5 rounded-lg text-base self-start"
            >
              {cta}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  </section>
));

FlooringSection.displayName = 'FlooringSection';

export default FlooringSection;
