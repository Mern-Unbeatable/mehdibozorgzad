import React, { memo } from 'react';

const PromoCardsSection = memo(({ cardImage1, cardImage2 }) => (
  <div className="flex w-full flex-col gap-14 md:gap-16 lg:gap-20 ">
    <div className="flex flex-col gap-6 rounded-xl bg-[#e9ecf2] p-6 lg:h-140.25 lg:flex-row lg:items-center lg:gap-9.75 lg:p-8">
      <div className="w-full shrink-0 flex-col gap-3.5 lg:flex lg:w-167.5">
        <h3 className="font-['Playfair_Display']  text-xl font-medium leading-normal text-black lg:text-[40px]">
          Find the Right Carpet for Your Home in Torrance, CA
        </h3>
        <p className="font-['Lato'] text-base font-light leading-[29.25px] text-[#242424] lg:text-lg">
          Whether you need something soft and comfortable for a bedroom or durable for a busy living
          space, we&apos;ll help you find the right fit. We carry a variety of styles, colors, and
          textures to match your home.
        </p>
      </div>
      <div className="min-h-0 h-48 flex-1 overflow-hidden rounded-xl lg:h-120.25">
        <img src={cardImage1} alt="Carpet room example" className="h-full w-full object-cover" />
      </div>
    </div>

    <div className="flex flex-col gap-6 rounded-xl bg-[#171717] p-6 lg:h-140.25 lg:flex-row lg:items-center lg:gap-9 lg:p-10">
      <div className="min-h-0 h-48 flex-1 overflow-hidden rounded-xl lg:h-120.25">
        <img src={cardImage2} alt="Carpet savings" className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-1 flex-col gap-3.5">
        <h3 className="font-['Playfair_Display'] text-xl font-medium leading-normal text-white lg:text-[40px]">
          Carpet Up to 70% Off
        </h3>
        <p className="whitespace-pre-line font-['Lato'] text-base font-light leading-[29.25px] text-white lg:text-lg">
          We’re offering major savings on select carpet styles. If you’ve been thinking about new
          flooring, this is a good opportunity to get it done for less.
        </p>
        <p className="whitespace-pre-line font-['Lato'] text-base font-light leading-[29.25px] text-white lg:text-lg">
          Stop by our Torrance showroom today.
        </p>
      </div>
    </div>
  </div>
));

PromoCardsSection.displayName = 'PromoCardsSection';

export default PromoCardsSection;
