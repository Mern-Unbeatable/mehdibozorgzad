import React, { memo } from 'react';

const IMG_FEAT_A = '/constgallery6.jpg';
const IMG_FEAT_B = '/constgallery8.jpg';
const IMG_FEAT_C = '/constgallery10.jpg';

const BRAND_DECORA = '/logo.webp';
const BRAND_ARISTOKRAFT =
  '/logo.webp';
const BRAND_TCO = '/logo.webp';

const textPanelCls = 'bg-[#e9e8e8] flex flex-col justify-center p-8 lg:p-12 h-[280px] md:h-[354px]';
const imgPanelCls = 'h-[280px] md:h-[354px] overflow-hidden';

const CabinetsFeatures = memo(() => (
  <section className="pt-14 md:pt-16 lg:pt-20">
    <div className="container mx-auto px-4">
      <div className="text-center mb-6 flex flex-col gap-4 items-center">
        <h2 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-2xl md:text-3xl lg:text-4xl leading-tight max-w-3xl">
          Custom, Semi-Custom &amp; Ready To Install Cabinetry
        </h2>
        <p className="text-base text-[#6b6b6b] leading-7 max-w-2xl">
          Discover The Best Kitchen Cabinets &amp; Bathroom Cabinets in Torrance
        </p>
      </div>

      {/* Brand logos */}
      <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-10.5 mb-12">
        <img src={BRAND_DECORA} alt="Decora" className="h-16 lg:h-22.5 object-contain" />
        <img
          src={BRAND_ARISTOKRAFT}
          alt="Aristokraft"
          className="h-16 lg:h-22.5 object-contain"
        />
        <img
          src={BRAND_TCO}
          alt="TCO Modern Cabinetry"
          className="h-16 lg:h-22.5 object-contain"
        />
      </div>

      {/* Row 1: text | image | text */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className={textPanelCls}>
          <div className="flex flex-col gap-4">
            <h3 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-xl lg:text-2xl leading-tight">
              Custom Built Kitchen Cabinetry &amp; Bathroom Cabinetry
            </h3>
            <p className="text-base text-[#6b6b6b] leading-7">
              We offer fully custom built kitchen and bathroom cabinetry designed to maximize your
              space and fit your unique style. From layout to finish, every detail is crafted to
              your specifications.
            </p>
          </div>
        </div>
        <div className={imgPanelCls}>
          <img
            src={IMG_FEAT_A}
            alt="Custom kitchen cabinetry"
            className="w-full h-full object-cover"
          />
        </div>
        <div className={textPanelCls}>
          <div className="flex flex-col gap-4">
            <h3 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-xl lg:text-2xl leading-tight">
              Professional Cabinet Installation
            </h3>
            <p className="text-base text-[#6b6b6b] leading-7">
              Our expert installation team ensures every cabinet is perfectly fitted, level, and
              secured. We handle everything from delivery to final hardware installation, leaving
              your kitchen or bathroom looking flawless.
            </p>
          </div>
        </div>
      </div>

      {/* Row 2: image | text | image */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className={imgPanelCls}>
          <img src={IMG_FEAT_B} alt="Cabinet showroom" className="w-full h-full object-cover" />
        </div>
        <div className={textPanelCls}>
          <div className="flex flex-col gap-4">
            <h3 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-xl lg:text-2xl leading-tight">
              Visit Our Cabinetry Showroom!
            </h3>
            <p className="text-base text-[#6b6b6b] leading-7">
              Stop by our showroom and explore our extensive selection of kitchen and bathroom
              cabinets. Our staff will work with you one-on-one to create a unique, personalized
              design that fits your style and budget.
            </p>
          </div>
        </div>
        <div className={imgPanelCls}>
          <img src={IMG_FEAT_C} alt="Cabinet design" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  </section>
));

CabinetsFeatures.displayName = 'CabinetsFeatures';

export default CabinetsFeatures;
