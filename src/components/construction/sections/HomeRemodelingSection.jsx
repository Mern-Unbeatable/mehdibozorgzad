import React, { memo } from 'react';
import ServiceCard from './shared/ServiceCard';
import SectionHeading from './shared/SectionHeading';

const HomeRemodelingSection = memo(function HomeRemodelingSection({ beforeImage, afterImage, services }) {
  return (
    <section className="pt-14 md:pt-16 lg:pt-20" aria-label="Home Remodeling">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8">
          <SectionHeading
            title="Home Remodeling"
            desc="Breathe new life into your existing space with our comprehensive renovation and modern upgrade services."
          />

          <div className="flex w-full flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="font-['Lato'] text-2xl font-medium text-black">Before &amp; After Showcase</h3>
              <p className="font-['Lato'] text-base md:text-lg leading-6 text-[#4c4946]">
                Modern Living Room Conversion
              </p>
            </div>
            <div className="flex flex-col gap-0 overflow-hidden rounded-xl lg:flex-row">
              <div className="relative h-60 flex-1 lg:h-124">
                <img src={beforeImage} alt="Before remodeling" className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)]" aria-hidden="true" />
                <span className="absolute left-3.5 top-5 rounded-full bg-[rgba(255,255,255,0.4)] px-3 py-0.5 text-base text-white">
                  Before
                </span>
              </div>
              <div className="relative h-60 flex-1 lg:h-124">
                <img src={afterImage} alt="After remodeling" className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)]" aria-hidden="true" />
                <span className="absolute right-3.5 top-5 rounded-full bg-[rgba(255,255,255,0.4)] px-3 py-0.5 text-base text-white">
                  After
                </span>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-wrap justify-center gap-5">
            {services.map(({ icon, title, desc }) => (
              <div key={title} className="w-full sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-40px)/3)]">
                <ServiceCard icon={icon} title={title} desc={desc} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

HomeRemodelingSection.displayName = 'HomeRemodelingSection';

export default HomeRemodelingSection;
