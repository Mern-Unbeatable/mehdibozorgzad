import React, { memo } from 'react';

const WhoWeAreSection = memo(() => (
  <section className="pt-14 md:pt-16 lg:pt-20 mb-4">
    <div className="container mx-auto max-w-4xl px-4 text-center">
      <h2 className="mb-6 font-['Playfair_Display'] text-3xl font-semibold leading-tight text-[#0f172b] md:text-4xl">
        Who We Are
      </h2>
      <p className="text-base md:text-lg leading-7 text-[#314158]">
        American Carpet &amp; Flooring has served the South Bay since 1981, providing high quality flooring and
        remodeling services in Torrance, CA. We specialize in hardwood, carpet, and full kitchen and
        bathroom renovations for residential and commercial projects across Southern California.
      </p>
    </div>
  </section>
));

WhoWeAreSection.displayName = 'WhoWeAreSection';

export default WhoWeAreSection;
