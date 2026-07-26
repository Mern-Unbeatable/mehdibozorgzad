import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import PromoCardsSection from '../../PromoCardsSection';

const CarpetPromoBodySection = memo(({ cardImage1, cardImage2, browseRoute }) => (
  <div className="flex flex-col items-center gap-10 px-4 pt-14 md:pt-16 lg:pt-20   lg:gap-14 lg:px-48 ">
    <h2 className="w-full text-center font-['Playfair_Display'] text-2xl font-semibold leading-normal text-[#0d0b0a] lg:text-4xl">
      CARPET ON SALE - NOW 70% OFF RETAIL PRICE!
    </h2>
    <PromoCardsSection cardImage1={cardImage1} cardImage2={cardImage2} />

    <Link
      to={browseRoute}
      className="text-center font-['Lato'] text-base text-[#4c4946] hover:underline lg:text-[24px]"
    >
      {'Browse Our Carpet Collection >>'}
    </Link>
  </div>
));

CarpetPromoBodySection.displayName = 'CarpetPromoBodySection';

export default CarpetPromoBodySection;
