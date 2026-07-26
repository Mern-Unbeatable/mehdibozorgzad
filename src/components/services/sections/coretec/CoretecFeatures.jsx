import React, { memo } from 'react';

const IMG_FEAT_A = '/constgallery4.jpg';
const IMG_FEAT_B = '/constgallery2.jpg';
const IMG_FEAT_C = '/flooringImg.jpg';

const textPanelCls = 'bg-[#e9e8e8] flex flex-col justify-center p-8 lg:p-12 h-[280px] md:h-[354px]';
const imgPanelCls = 'h-[280px] md:h-[354px] overflow-hidden';

const CoretecFeatures = memo(() => (
  <section className="pt-14 md:pt-16 lg:pt-20">
    <div className="container mx-auto px-4">
      <div className="text-center mb-6 flex flex-col gap-4 items-center">
        <h2 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-2xl md:text-3xl lg:text-4xl leading-tight max-w-3xl">
          Why Choose COREtec® Floors?
        </h2>
        <p className="text-base text-[#6b6b6b] leading-7 max-w-3xl">
          COREtec® floors offer an impressive combination of stunning wood and stone aesthetics at
          a fraction of the cost of traditional materials. With their realistic designs, these
          floors elevate the look of any room, providing a stylish and inviting atmosphere.
        </p>
      </div>

      {/* Row 1: text | image | text */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className={textPanelCls}>
          <div className="flex flex-col gap-4">
            <h3 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-xl lg:text-2xl leading-tight">
              Strength To Withstand
            </h3>
            <p className="text-base text-[#6b6b6b] leading-7">
              Durability is a hallmark of COREtec® products; they are engineered to withstand
              heavy foot traffic and resist scratches, dents, and wear. Their waterproof nature
              makes them an ideal choice for high-moisture areas such as bathrooms and kitchens.
            </p>
          </div>
        </div>
        <div className={imgPanelCls}>
          <img src={IMG_FEAT_A} alt="COREtec flooring" className="w-full h-full object-cover" />
        </div>
        <div className={textPanelCls}>
          <div className="flex flex-col gap-4">
            <h3 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-xl lg:text-2xl leading-tight">
              Easy To Keep Clean
            </h3>
            <p className="text-base text-[#6b6b6b] leading-7">
              Maintenance is a breeze with COREtec® floors — no need for special cleaners or
              extensive upkeep. Simply sweeping or mopping is often enough to keep them looking
              pristine.
            </p>
          </div>
        </div>
      </div>

      {/* Row 2: image | text | image */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className={imgPanelCls}>
          <img
            src={IMG_FEAT_B}
            alt="COREtec family flooring"
            className="w-full h-full object-cover"
          />
        </div>
        <div className={textPanelCls}>
          <div className="flex flex-col gap-4">
            <h3 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-xl lg:text-2xl leading-tight">
              Great For Family&apos;s
            </h3>
            <p className="text-base text-[#6b6b6b] leading-7">
              Designed for the demands of busy lifestyles, these floors combine practicality with
              beauty, making them suitable for families, pet owners, and anyone looking for a
              reliable flooring solution that doesn&apos;t compromise on style.
            </p>
          </div>
        </div>
        <div className={imgPanelCls}>
          <img
            src={IMG_FEAT_C}
            alt="COREtec floor style"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </section>
));

CoretecFeatures.displayName = 'CoretecFeatures';

export default CoretecFeatures;
