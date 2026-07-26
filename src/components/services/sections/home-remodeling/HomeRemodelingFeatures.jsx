import React, { memo } from 'react';

const IMG_FEAT_A = '/constgallery3.jpg';
const IMG_FEAT_B = '/constgallery7.jpg';
const IMG_FEAT_C = '/constgallery5.jpg';

const textPanelCls = 'bg-[#e9e8e8] flex flex-col justify-center p-8 lg:p-12 h-[280px] md:h-[354px]';
const imgPanelCls = 'h-[280px] md:h-[354px] overflow-hidden';

const HomeRemodelingFeatures = memo(() => (
  <section className="pt-14 md:pt-16 lg:pt-20">
    <div className="container mx-auto px-4">
      <div className="text-center mb-6 flex flex-col gap-4 items-center">
        <h2 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-2xl md:text-3xl lg:text-4xl leading-tight max-w-3xl">
          Total Home Remodeling In Torrance
        </h2>
        <p className="text-base text-[#6b6b6b] leading-7 max-w-3xl">
          Discover Expert Kitchen &amp; Bathroom Remodeling, The Best Water Proof Floors, And
          One-On-One Personalized Service
        </p>
      </div>

      {/* Row 1: text | image | text */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className={textPanelCls}>
          <div className="flex flex-col gap-4">
            <h3 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-xl lg:text-2xl leading-tight">
              Kitchen Remodeling
            </h3>
            <p className="text-base text-[#6b6b6b] leading-7">
              Transform your kitchen into the heart of your home. We handle everything from custom
              cabinetry and countertops to flooring and lighting — delivering a complete kitchen
              transformation tailored to your vision.
            </p>
          </div>
        </div>
        <div className={imgPanelCls}>
          <img src={IMG_FEAT_A} alt="Kitchen remodeling" className="w-full h-full object-cover" />
        </div>
        <div className={textPanelCls}>
          <div className="flex flex-col gap-4">
            <h3 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-xl lg:text-2xl leading-tight">
              Bathroom Remodeling
            </h3>
            <p className="text-base text-[#6b6b6b] leading-7">
              Upgrade your bathroom into a relaxing retreat. From modern tile work and vanities to
              full shower and bath installations, we deliver bathroom remodels that combine beauty
              with lasting functionality.
            </p>
          </div>
        </div>
      </div>

      {/* Row 2: image | text | image */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className={imgPanelCls}>
          <img src={IMG_FEAT_B} alt="Home remodeling" className="w-full h-full object-cover" />
        </div>
        <div className={textPanelCls}>
          <div className="flex flex-col gap-4">
            <h3 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-xl lg:text-2xl leading-tight">
              Dining Room Remodeling
            </h3>
            <p className="text-base text-[#6b6b6b] leading-7">
              Create the perfect space for gathering and entertaining. Our team will help you
              redesign your dining room with new flooring, lighting, and finishes that set the
              perfect ambiance for every occasion.
            </p>
          </div>
        </div>
        <div className={imgPanelCls}>
          <img
            src={IMG_FEAT_C}
            alt="Dining room remodeling"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </section>
));

HomeRemodelingFeatures.displayName = 'HomeRemodelingFeatures';

export default HomeRemodelingFeatures;
