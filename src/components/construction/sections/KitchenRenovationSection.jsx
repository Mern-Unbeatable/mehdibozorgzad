import React, { memo } from 'react';
import ServiceCard from './shared/ServiceCard';
import SectionHeading from './shared/SectionHeading';

const KitchenRenovationSection = memo(function KitchenRenovationSection({ services, features, featureImages }) {
  return (
    <section className=" pt-14 md:pt-16 lg:pt-20" aria-label="Kitchen Renovation">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-11">
          <SectionHeading
            title="Kitchen Renovation"
            desc="From bespoke cabinetry to smart kitchen integrations, we create the perfect heart for your home."
          />
          <div className="flex w-full flex-wrap justify-center gap-5">
            {services.map(({ icon, title, desc }) => (
              <div key={title} className="w-full sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-40px)/3)]">
                <ServiceCard icon={icon} title={title} desc={desc} />
              </div>
            ))}
          </div>
          <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-3">
            {features.map(({ title, desc }, i) => (
              <div key={title} className="flex flex-col gap-6">
                <div className="h-109 overflow-hidden rounded-xl">
                  <img src={featureImages[i]} alt={title} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-['Playfair_Display'] text-2xl font-semibold leading-normal text-[#1c1c1c]">
                    {title}
                  </h3>
                  <p className="font-['Lato'] text-base md:text-lg leading-6 text-[#777]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

KitchenRenovationSection.displayName = 'KitchenRenovationSection';

export default KitchenRenovationSection;
