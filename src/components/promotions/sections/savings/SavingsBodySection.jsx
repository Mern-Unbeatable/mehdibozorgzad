import React, { memo } from 'react';

const SavingsBodySection = memo(({ cardImage1, cardImage2, cardImage3, cardImage4 }) => (
  <div className="flex flex-col items-center gap-10 px-4 py-14 md:py-16 lg:py-20  lg:px-48">
    <div className="flex w-full flex-col items-center gap-6 text-center">
      <h2 className="font-['Playfair_Display'] text-2xl font-semibold leading-normal text-[#0d0b0a] lg:text-4xl">
        {`Visit American Carpet & Flooring's Warehouse`}
        <br />
        Your One-Stop Shop for Quality Flooring at Unbeatable Prices! Sale NOW!
      </h2>
      <p className="max-w-275 font-['Lato'] text-base font-light leading-[29.25px] text-[#696664] lg:text-lg">
        We are committed to offering you the best selection of flooring at incredible savings.
        Whether you&apos;re renovating your home, upgrading your office, or starting a new
        construction project, we have everything you need to transform your space.
      </p>
    </div>

    <div className="flex w-full flex-col gap-10 lg:gap-15">
      <div className="flex flex-col gap-6 rounded-xl bg-[#e9ecf2] p-6 lg:h-140.25 lg:flex-row lg:items-center lg:gap-9.75 lg:p-10">
        <div className="flex w-full shrink-0 flex-col gap-3.5 lg:w-167.5">
          <h3 className="font-['Playfair_Display'] text-xl font-medium leading-normal text-black lg:text-[40px]">
            Savings Up to 70% Off!
          </h3>
          <p className="font-['Lato'] text-sm font-light leading-[29.25px] text-[#242424] lg:text-[20px]">
            {`Why pay more when you can save big? At American Carpet & Flooring, we offer discounts of up to 70% off retail prices. Enjoy high-end flooring options without breaking the bank!`}
          </p>
        </div>
        <div className="min-h-0 h-48 flex-1 overflow-hidden rounded-xl lg:h-120.25">
          <img src={cardImage1} alt="Savings flooring display" className="h-full w-full object-cover" />
        </div>
      </div>

      <div className="flex flex-col gap-6 rounded-xl bg-[#171717] p-6 lg:h-140.25 lg:flex-row lg:items-center lg:gap-9 lg:p-10">
        <div className="min-h-0 h-48 flex-1 overflow-hidden rounded-xl lg:h-120.25">
          <img src={cardImage2} alt="Carpet rolls in warehouse" className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-1 flex-col gap-3.5">
          <h3 className="font-['Playfair_Display'] text-xl font-medium leading-normal text-white lg:text-[40px]">
            Over 300 Rolls of Carpet
          </h3>
          <p className="font-['Lato'] text-sm font-light leading-[29.25px] text-white lg:text-[18px]">
            {`Choose from a wide variety of premium carpets in a range of styles, colors, and textures. With over 300 rolls of carpet in stock, you're sure to find the perfect match for your needs, whether you're looking for something soft and plush, durable, or stain-resistant.`}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6 rounded-xl bg-[#e9ecf2] p-6 lg:h-140.25 lg:flex-row lg:items-center lg:gap-9.75 lg:p-10">
        <div className="flex w-full shrink-0 flex-col gap-3.5 lg:w-167.5">
          <h3 className="font-['Playfair_Display'] text-xl font-medium leading-normal text-black lg:text-[40px]">
            Wide Selection of Waterproof Flooring
          </h3>
          <p className="font-['Lato'] text-sm font-light leading-[29.25px] text-[#242424] lg:text-[20px]">
            Durability meets style with our waterproof flooring options, ideal for kitchens,
            bathrooms, basements, or any area where moisture could be a concern. From luxury vinyl
            to modern laminates, our waterproof selections combine functionality with aesthetics.
          </p>
        </div>
        <div className="min-h-0 h-48 flex-1 overflow-hidden rounded-xl lg:h-120.25">
          <img
            src={cardImage3}
            alt="Waterproof flooring display"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col gap-6 rounded-xl bg-[#171717] p-6 lg:h-140.25 lg:flex-row lg:items-center lg:gap-9 lg:p-10">
        <div className="min-h-0 h-48 flex-1 overflow-hidden rounded-xl lg:h-120.25">
          <img src={cardImage4} alt="Floor tile selection" className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-1 flex-col gap-3.5">
          <h3 className="font-['Playfair_Display'] text-xl font-medium leading-normal text-white lg:text-[40px]">
            Floor Tiles for Every Style
          </h3>
          <p className="font-['Lato'] text-sm font-light leading-[29.25px] text-white lg:text-[18px]">
            Looking for a sleek, sophisticated look? Our extensive collection of floor tiles will
            add the perfect finishing touch to any room. From classic ceramic and porcelain to
            trendy subway tiles, we have options that fit every budget and design preference.
          </p>
        </div>
      </div>
    </div>
  </div>
));

SavingsBodySection.displayName = 'SavingsBodySection';

export default SavingsBodySection;
