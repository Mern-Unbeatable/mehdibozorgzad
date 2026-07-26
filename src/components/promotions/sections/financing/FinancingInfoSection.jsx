import React, { memo } from 'react';

const FinancingInfoSection = memo(({ serviceFinanceLogo }) => (
  <div className="py-14 md:py-16 lg:py-20 px-4  lg:px-48">
    <div className="flex flex-col gap-6 rounded-xl border border-[rgba(0,0,0,0.3)] border-solid p-6 lg:p-8">
      <h2 className="text-center font-['Playfair_Display'] text-2xl font-semibold leading-normal text-[#0d0b0a] lg:text-4xl">
        Simple Application, Decisions in Seconds
      </h2>
      <p className="font-['Lato'] text-base leading-[29.25px] text-[#696664] lg:text-lg">
        Your flooring expert can help you decide which available financing plan fits your needs.
      </p>
      <p className="font-['Lato'] text-base leading-[29.25px] text-[#696664] lg:text-lg">
        {`It's easy to apply:`}
      </p>
      <ul className="ms-7.5 flex list-disc flex-col gap-2">
        <li className="font-['Lato'] text-sm leading-[29.25px] text-[#696664] lg:text-[20px]">
          {`Safe, secure mobile application on your flooring expert's smartphone or tablet`}
        </li>
        <li className="font-['Lato'] text-sm leading-[29.25px] text-[#696664] lg:text-[20px]">
          Log onto the secure financing application website - available 24/7/365
        </li>
        <li className="font-['Lato'] text-base leading-[29.25px] text-[#696664] lg:text-lg">
          Apply over the phone
        </li>
      </ul>
      <p className="text-center font-['Lato'] text-base leading-[29.25px] text-[#696664] lg:text-lg">
        {`Depending on which of the above you choose, you can be assured of a decision... delivered in seconds!`}
      </p>
      <p className="font-['Lato'] text-xs leading-6 text-[#696664] lg:text-[16px]">
        {`*See your participating Abbey Carpet & Floor store for details and availability`}
      </p>
    </div>

    <div className="mt-10 flex justify-center border-t border-[rgba(0,0,0,0.15)] pt-10">
      <img
        src={serviceFinanceLogo}
        alt="Service Finance Company LLC"
        className="h-12 object-contain"
      />
    </div>
  </div>
));

FinancingInfoSection.displayName = 'FinancingInfoSection';

export default FinancingInfoSection;
