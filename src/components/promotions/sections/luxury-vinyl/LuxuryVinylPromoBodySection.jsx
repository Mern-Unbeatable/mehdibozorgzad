import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const LuxuryVinylPromoBodySection = memo(({ cardImage1, cardImage2, browseRoute }) => (
  <div className=" flex flex-col items-center gap-10 px-4 pt-14 md:pt-16 lg:pt-20  lg:px-48">
    <h2 className="w-full text-center font-['Playfair_Display'] text-2xl font-semibold leading-normal text-[#0d0b0a] lg:text-[44px]">
      Vinyl On Sale Up to 40% Off Select Styles
    </h2>

    <div className="flex w-full flex-col gap-16">
      <div className="flex flex-col gap-6 rounded-xl bg-[#e9ecf2] p-6 lg:h-140.25 lg:flex-row lg:items-center lg:gap-9.75 lg:p-10">
        <div className="flex w-full shrink-0 flex-col gap-3.5 lg:w-167.5">
          <h3 className="font-['Playfair_Display'] text-xl font-medium leading-normal text-black lg:text-[40px]">
            Style Meets Durability
          </h3>
          <div className="font-['Lato'] text-sm font-light leading-[29.25px] text-[#242424] lg:text-[18px]">
            <p>{`Luxury Vinyl Tile and Luxury Vinyl Plank are designed to give you the look of hardwood or stone without the higher cost or maintenance. `}</p>
            <p className="mt-2.5">{`These floors are: `}</p>
            <ul className="ms-6.75 mt-2.5 list-disc">
              <li>Waterproof</li>
              <li>Easy to clean and maintain</li>
              <li>Built to handle busy households</li>
              <li>Perfect for kitchens, bathrooms, and living areas</li>
              <li>Full line of decorative coatings to make you love your floors once more</li>
            </ul>
            <p className="mt-2.5">
              {`Visit our Torrance showroom to see different styles in person and find the right fit for your space. `}
            </p>
          </div>
        </div>
        <div className="min-h-0 h-48 flex-1 overflow-hidden rounded-xl lg:h-120.25">
          <img
            src={cardImage1}
            alt="Luxury vinyl flooring room"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col gap-6 rounded-xl bg-[#171717] p-6 lg:h-140.25 lg:flex-row lg:items-center lg:gap-9 lg:p-10">
        <div className="min-h-0 h-48 flex-1 overflow-hidden rounded-xl lg:h-120.25">
          <img src={cardImage2} alt="Luxury vinyl savings" className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-1 flex-col gap-3.5">
          <h3 className="font-['Playfair_Display'] text-xl font-medium leading-normal text-white lg:text-[40px]">
            Up to 40% Off Select Vinyl Styles
          </h3>
          <p className="whitespace-pre-line font-['Lato'] text-sm font-light leading-[29.25px] text-white lg:text-[18px]">
            {`Take advantage of current savings on luxury vinyl flooring while supplies last. It's a great time to upgrade your floors with something durable, low maintenance, and affordable. \n\nReady to get started? Visit us in Torrance, CA or reach out for a free estimate`}
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

LuxuryVinylPromoBodySection.displayName = 'LuxuryVinylPromoBodySection';

export default LuxuryVinylPromoBodySection;
