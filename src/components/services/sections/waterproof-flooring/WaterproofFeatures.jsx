import React, { memo } from 'react';

const IMG_FEAT_A = '/constgallery4.jpg';
const IMG_FEAT_B = '/constgallery5.jpg';
const IMG_FEAT_C = '/constgallery7.jpg';

const textPanelCls = 'bg-[#e9e8e8] flex flex-col justify-center p-8 lg:p-12 h-[280px] md:h-[354px]';
const imgPanelCls = 'h-[280px] md:h-[354px] overflow-hidden';

const WaterproofFeatures = memo(() => (
  <section className="pt-14 md:pt-16 lg:pt-20">
    <div className="container mx-auto px-4">
      <div className="text-center mb-6 flex flex-col gap-4 items-center">
        <span className="bg-[#e9e8e8] text-[#4c4946] text-xs font-['Lato'] px-4 py-1.5 rounded-full">
          Waterproof Laminate &amp; Vinyl Flooring in Torrance California
        </span>
        <h2 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-2xl md:text-3xl lg:text-4xl leading-tight max-w-3xl">
          The Best Waterproof Flooring Selection Available
        </h2>
        <div className="flex flex-col gap-3 text-base text-[#6b6b6b] leading-7 max-w-3xl">
          <p>
            If you are looking for great-looking waterproof flooring at a great price, you have
            come to the right place! We stock a wide variety of waterproof flooring types with
            samples in our local showroom. You are sure to find what you are looking for! We have:
          </p>
          <p className="font-medium text-[#474747]">
            Waterproof Luxury Vinyl Floors • Waterproof Laminate Floors • COREtec™ Waterproof
            Floors
          </p>
          <p className="font-medium text-[#474747]">
            Waterproof Tile • Even Water-resistant Carpet!
          </p>
        </div>
      </div>

      {/* Row 1: text | image | text */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className={textPanelCls}>
          <div className="flex flex-col gap-4">
            <h3 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-xl lg:text-2xl leading-tight">
              Waterproof Flooring Installation
            </h3>
            <p className="text-base text-[#6b6b6b] leading-7">
              Installation of your new waterproof flooring is quick and easy with American Carpet
              &amp; Flooring. Let our experienced staff help you through every step in the process
              to make your experience is worth bragging about.
            </p>
          </div>
        </div>
        <div className={imgPanelCls}>
          <img
            src={IMG_FEAT_A}
            alt="Waterproof flooring installation"
            className="w-full h-full object-cover"
          />
        </div>
        <div className={textPanelCls}>
          <div className="flex flex-col gap-4">
            <h3 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-xl lg:text-2xl leading-tight">
              Local Flooring Showroom
            </h3>
            <p className="text-base text-[#6b6b6b] leading-7">
              Whether you have specific ideas in mind or need help creating a personalized
              solution that fits your style, our team is here to help with your remodel! Stop by
              our showroom today to explore our extensive selection of waterproof flooring.
            </p>
          </div>
        </div>
      </div>

      {/* Row 2: image | text | image */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className={imgPanelCls}>
          <img
            src={IMG_FEAT_B}
            alt="Waterproof flooring showroom"
            className="w-full h-full object-cover"
          />
        </div>
        <div className={textPanelCls}>
          <div className="flex flex-col gap-4">
            <h3 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-xl lg:text-2xl leading-tight">
              Visit Our Cabinetry Showroom!
            </h3>
            <p className="text-base text-[#6b6b6b] leading-7">
              Please stop by our showroom and see our extensive selection of the best kitchen
              cabinets and bathroom cabinets in South Bay! Our staff will work with you one-on-one
              so please bring us your ideas or let our staff create a unique, personalized design
              to fit your style.
            </p>
          </div>
        </div>
        <div className={imgPanelCls}>
          <img
            src={IMG_FEAT_C}
            alt="Waterproof floor style"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </section>
));

WaterproofFeatures.displayName = 'WaterproofFeatures';

export default WaterproofFeatures;
