import React, { memo } from 'react';

const IMG_FEAT_A = '/constgallery11.jpg';
const IMG_FEAT_B = '/constgallery12.jpg';
const IMG_FEAT_C = '/constgallery2.jpg';

const BRAND_CAESARSTONE =
  '/logo.webp';
const BRAND_VERONA = '/logo.webp';

const textPanelCls = 'bg-[#e9e8e8] flex flex-col justify-center p-8 lg:p-12 h-[280px] md:h-[354px]';
const imgPanelCls = 'h-[280px] md:h-[354px] overflow-hidden';

const CountertopsFeatures = memo(() => (
  <section className="pt-14 md:pt-16 lg:pt-20">
    <div className="container mx-auto px-4">
      <div className="text-center mb-6 flex flex-col gap-4 items-center">
        <h2 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-2xl md:text-3xl lg:text-4xl leading-tight max-w-3xl">
          Premium Countertop Selection Available
        </h2>
        <p className="text-base text-[#6b6b6b] leading-7 max-w-3xl">
          We specialize in creating stunning kitchens and bathrooms with beautiful countertops
          tailored to your needs. With a wide selection of materials to choose from, our skilled
          installation crew ensures a seamless process from start to finish.
        </p>
      </div>

      {/* Brand logos */}
      <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-25.5 mb-6">
        <img
          src={BRAND_CAESARSTONE}
          alt="Caesarstone"
          className="h-20 lg:h-27.5 object-contain"
        />
        <img src={BRAND_VERONA} alt="Verona Quartz" className="h-20 lg:h-27.5 object-contain" />
      </div>

      {/* Row 1: text | image | text */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className={textPanelCls}>
          <div className="flex flex-col gap-4">
            <h3 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-xl lg:text-2xl leading-tight">
              Professional Countertop Installation
            </h3>
            <p className="text-base text-[#6b6b6b] leading-7">
              Our skilled team handles every aspect of countertop installation — from precise
              measurements and templating to final fitting — ensuring a flawless result that
              complements your kitchen or bathroom design.
            </p>
          </div>
        </div>
        <div className={imgPanelCls}>
          <img
            src={IMG_FEAT_A}
            alt="Countertop installation"
            className="w-full h-full object-cover"
          />
        </div>
        <div className={textPanelCls}>
          <div className="flex flex-col gap-4">
            <h3 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-xl lg:text-2xl leading-tight">
              Professional Cabinet Installation
            </h3>
            <p className="text-base text-[#6b6b6b] leading-7">
              We pair our premium countertops with expert cabinet installation services, giving
              you a fully cohesive kitchen or bathroom renovation handled by one trusted team from
              start to finish.
            </p>
          </div>
        </div>
      </div>

      {/* Row 2: image | text | image */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className={imgPanelCls}>
          <img
            src={IMG_FEAT_B}
            alt="Countertop showroom"
            className="w-full h-full object-cover"
          />
        </div>
        <div className={textPanelCls}>
          <div className="flex flex-col gap-4">
            <h3 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-xl lg:text-2xl leading-tight">
              Your Local Countertop Showroom
            </h3>
            <p className="text-base text-[#6b6b6b] leading-7">
              Visit our showroom to see and touch our full range of countertop materials,
              including quartz, granite, and more. Our design experts are ready to help you find
              the perfect surface for your home.
            </p>
          </div>
        </div>
        <div className={imgPanelCls}>
          <img
            src={IMG_FEAT_C}
            alt="Countertop material"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </section>
));

CountertopsFeatures.displayName = 'CountertopsFeatures';

export default CountertopsFeatures;
