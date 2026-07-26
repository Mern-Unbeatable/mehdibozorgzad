import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const HardwoodPromoBodySection = memo(({ cardImage1, cardImage2, browseRoute }) => (
  <div className=" flex flex-col items-center gap-10 px-4 pt-14 md:pt-16 lg:pt-20  lg:px-48">
    <h2 className="w-full text-center font-['Playfair_Display'] text-2xl font-semibold leading-normal text-[#0d0b0a] lg:text-[44px]">
      Hardwood On Sale Up to 40% Off Select Styles
    </h2>

    <div className="flex w-full flex-col gap-16 ">
      <div className="flex flex-col gap-6 rounded-xl bg-[#e9ecf2] p-6 lg:h-140.25 lg:flex-row lg:items-center lg:gap-9.75 lg:p-10">
        <div className="flex w-full shrink-0 flex-col gap-3.5 lg:w-167.5">
          <h3 className="font-['Playfair_Display'] text-xl font-medium leading-normal text-black lg:text-[40px]">
            Timeless Style for Your Home
          </h3>
          <p className="whitespace-pre-line font-['Lato'] text-sm font-light leading-[29.25px] text-[#242424] lg:text-[18px]">
            {`Hardwood flooring adds warmth, character, and long lasting value to any space. Whether you prefer a classic look or something more modern, we carry a wide range of styles to fit your home and your budget.\n\nVisit our Torrance showroom to see the latest options in person and find the one that feels right for your space.`}
          </p>
        </div>
        <div className="min-h-0 h-48 flex-1 overflow-hidden rounded-xl lg:h-120.25">
          <img src={cardImage1} alt="Hardwood flooring room" className="h-full w-full object-cover" />
        </div>
      </div>

      <div className="flex flex-col gap-6 rounded-xl bg-[#171717] p-6 lg:h-140.25 lg:flex-row lg:items-center lg:gap-9 lg:p-10">
        <div className="min-h-0 h-48 flex-1 overflow-hidden rounded-xl lg:h-120.25">
          <img src={cardImage2} alt="Hardwood savings" className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-1 flex-col gap-3.5">
          <h3 className="font-['Playfair_Display'] text-xl font-medium leading-normal text-white lg:text-[40px]">
            Up to 40% Off Select Hardwood Styles
          </h3>
          <p className="whitespace-pre-line font-['Lato'] text-sm font-light leading-[29.25px] text-white lg:text-[18px]">
            {`Take advantage of current savings on select hardwood flooring while inventory lasts. If you've been thinking about making a change, this is a great opportunity to do it at a better price.\n\nHave questions or ready to get started? Visit us in Torrance, CA or reach out for a free estimate.`}
          </p>
        </div>
      </div>
    </div>

    <Link
      to={browseRoute}
      className="text-center font-['Lato'] text-base text-[#4c4946] hover:underline lg:text-[24px]"
    >
      {'Browse Our Carpet Collection >>'}
    </Link>
  </div>
));

HardwoodPromoBodySection.displayName = 'HardwoodPromoBodySection';

export default HardwoodPromoBodySection;
