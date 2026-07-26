import React, { memo } from 'react';
import ServiceCard from './shared/ServiceCard';
import SectionHeading from './shared/SectionHeading';

const ConstructionServicesSection = memo(function ConstructionServicesSection({ services }) {
  return (
    <section
      id="services"
      className="bg-[#f5f5f3] py-14 md:py-16 lg:py-20"
      aria-label="Construction Services"
    >
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col items-center gap-6">
          <SectionHeading
            title="Construction Services"
            desc="From concept to completion, we build structures that stand the test of time with uncompromising quality."
          />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon, title, desc }) => (
            <ServiceCard key={title} icon={icon} title={title} desc={desc} />
          ))}
        </div>
      </div>
    </section>
  );
});

ConstructionServicesSection.displayName = 'ConstructionServicesSection';

export default ConstructionServicesSection;
