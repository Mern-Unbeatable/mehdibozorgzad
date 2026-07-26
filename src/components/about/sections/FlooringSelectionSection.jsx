import React, { memo } from 'react';

const FlooringSelectionSection = memo(({ flooringImgUrl }) => (
  <section className="py-4">
    <div className="container mx-auto px-4">
      <div className="rounded-2xl border border-[#bdbcbc] p-8 lg:p-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
          <div className="w-full lg:w-1/2">
            <img
              src={flooringImgUrl}
              alt="Flooring selection"
              className="w-full h-80 sm:h-100 lg:h-[480px] object-cover rounded-xl"
            />
          </div>
          <div className="flex flex-col justify-center gap-5 lg:w-1/2">
            <h2 className="font-['Playfair_Display'] text-[32px] font-semibold leading-tight text-[#0f172b] md:text-[40px]">
              Our Flooring Selection in Torrance
            </h2>
            <p className="text-base leading-7 text-[#314158]">
              Choosing the right flooring product for your home is more important than ever as it can affect
              the aesthetics, value, and durability of your property. Our showroom offers an extensive
              selection of options, including carpet, hardwood, laminate, luxury vinyl plank (LVP), and tile -
              ensuring you&apos;ll find the perfect style and design to match any vision for your space.
            </p>
            <p className="text-base leading-7 text-[#314158]">
              Whether you&apos;re looking for eco-friendly options like bamboo or cork, or traditional styles such
              as oak or maple, we carry brands that combine quality with affordability. Our knowledgeable
              staff will guide you through every step of the selection process to help you find the ideal
              solution for your needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
));

FlooringSelectionSection.displayName = 'FlooringSelectionSection';

export default FlooringSelectionSection;
