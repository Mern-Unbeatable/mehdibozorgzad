import React, { memo } from 'react';
import { ArrowRight } from 'lucide-react';

const ConstructionCtaSection = memo(function ConstructionCtaSection() {
  return (
    <section className="bg-[#1c1c1c] py-14 md:py-16 py-20" aria-label="Ready for your Transformation">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-['Playfair_Display'] text-3xl font-bold leading-tight text-white lg:text-4xl">
            Ready for your Transformation?
          </h2>
          <p className="max-w-xl font-['Lato'] text-base md:text-lg leading-7 text-[rgba(255,255,255,0.6)] lg:text-lg">
            Book a consultation call today and let our design experts help you visualize your dream
            bathroom renovation.
          </p>
          <a
            href="#get-started"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-[#4c4946] transition-colors hover:bg-gray-50"
          >
            Book Free Consultation
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
});

ConstructionCtaSection.displayName = 'ConstructionCtaSection';

export default ConstructionCtaSection;
