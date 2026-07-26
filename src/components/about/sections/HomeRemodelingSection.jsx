import React, { memo } from 'react';

const HomeRemodelingSection = memo(({ remodelingImgUrl }) => (
  <section className="py-4 pb-14 md:pb-16 lg:pb-20">
    <div className="container mx-auto px-4">
      <div className="rounded-2xl border border-[#bdbcbc] p-6 lg:p-8">
        <div className="flex flex-col gap-8 lg:flex-row-reverse lg:items-center lg:gap-16">
          <div className="w-full lg:w-1/2">
            <img
              src={remodelingImgUrl}
              alt="Remodeling project"
              className="w-full h-80 sm:h-100 lg:h-[480px] object-cover rounded-xl"
            />
          </div>
          <div className="flex flex-col justify-center gap-5 lg:w-1/2">
            <h2 className="font-['Playfair_Display'] text-[32px] font-semibold leading-tight text-[#0f172b] md:text-[40px]">
              Full-Home Remodeling
            </h2>
            <p className="text-base leading-7 text-[#314158]">
              Beyond flooring, American Carpet &amp; Flooring also specializes in comprehensive home remodeling
              projects. From kitchen and bathroom renovations to complete home makeovers, we bring the
              same level of expertise and attention to detail to every project.
            </p>
            <p className="text-base leading-7 text-[#314158]">
              Our team works closely with you to understand your vision and deliver results that exceed
              expectations. We handle everything from design consultation to final installation, ensuring a
              seamless and stress-free remodeling experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
));

HomeRemodelingSection.displayName = 'HomeRemodelingSection';

export default HomeRemodelingSection;
