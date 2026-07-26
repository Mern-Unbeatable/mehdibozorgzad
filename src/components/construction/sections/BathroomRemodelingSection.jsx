import React, { memo } from 'react';
import ServiceCard from './shared/ServiceCard';
import SectionHeading from './shared/SectionHeading';

const BathroomRemodelingSection = memo(function BathroomRemodelingSection({ services }) {
  return (
    <section className="py-14 md:py-16 lg:py-20" aria-label="Bathroom Remodeling">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-11">
          <SectionHeading
            title="Bathroom Remodeling"
            desc="Transform your bathroom into a luxury retreat with spa-style features and modern design elements."
          />
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

BathroomRemodelingSection.displayName = 'BathroomRemodelingSection';

export default BathroomRemodelingSection;
