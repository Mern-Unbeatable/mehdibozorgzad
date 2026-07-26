import React, { memo } from 'react';

const CarpetHeroSection = memo(({ heroImage }) => (
  <section className="relative h-150 overflow-hidden">
    <img src={heroImage} alt="Carpet sale hero" className="absolute inset-0 h-full w-full object-cover" />
    <div className="absolute inset-0 bg-[rgba(0,0,0,0.4)]" aria-hidden="true" />
    <div className="absolute inset-0 flex items-center justify-center px-4">
      <div className="flex w-full max-w-225 flex-col items-center gap-4 text-center text-white">
        <h1 className="w-full font-['Playfair_Display'] text-3xl font-semibold leading-normal lg:text-[48px]">
          CARPET ON SALE NOW UP TO OFF
        </h1>
        <p className="w-full text-center font-['Lato'] text-base leading-normal lg:text-[24px]">
          If you are searching for carpet that fits your lifestyle and budget, visit our showroom
          first. We carry the latest styles and designs from the top manufacturers.Our professional
          and experienced flooring experts will work with you from selection, to install. We&apos;re
          with you from concept to completion!
        </p>
      </div>
    </div>
  </section>
));

CarpetHeroSection.displayName = 'CarpetHeroSection';

export default CarpetHeroSection;
