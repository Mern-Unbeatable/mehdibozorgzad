import React, { memo } from 'react';

const FinancingHeroSection = memo(({ heroImage }) => (
  <section className="relative h-150 overflow-hidden">
    <img
      src={heroImage}
      alt="Home Solutions Credit hero"
      className="absolute inset-0 h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-[rgba(0,0,0,0.4)]" aria-hidden="true" />
    <div className="absolute inset-0 flex items-center justify-center px-4">
      <div className="flex w-full max-w-318.25 flex-col items-center gap-4 text-center text-white">
        <h1 className="w-full font-['Playfair_Display'] text-3xl font-semibold leading-normal lg:text-[48px]">
          HOME SOLUTIONS CREDIT
        </h1>
        <p className="w-full text-center font-['Lato'] text-base leading-normal lg:text-[24px]">
          {`With an almost unlimited selection of flooring products available, it's nice to know there are financing options available to fit most budgets.  We strive to make your home transformation easy and affordable. Flexible financing allows you to select the right payment option for your new flooring purchase.`}
        </p>
      </div>
    </div>
  </section>
));

FinancingHeroSection.displayName = 'FinancingHeroSection';

export default FinancingHeroSection;
