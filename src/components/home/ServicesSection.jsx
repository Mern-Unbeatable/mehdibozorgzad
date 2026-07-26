import React, { memo } from 'react';
import { Palette, Hash, Home, Hammer } from 'lucide-react';

const SERVICES = [
  {
    id: 'countertops',
    title: 'Custom Countertops',
    description:
      'Transform your kitchen with stunning countertops and backsplashes tailored to your vision.',
    Icon: Palette,
  },
  {
    id: 'cabinetry',
    title: 'Custom Cabinetry',
    description: 'Precision-crafted cabinets that blend beauty with functionality for any room.',
    Icon: Hash,
  },
  {
    id: 'windows',
    title: 'Window Fashions',
    description: 'Elevate your space with elegant window treatments from Graber.',
    Icon: Home,
  },
  {
    id: 'remodeling',
    title: 'Total Remodeling',
    description: 'Complete home transformations from concept to completion.',
    Icon: Hammer,
  },
];

const ServicesSection = memo(() => (
  <section className="bg-[#1c1917] py-14 md:py-16 lg:py-20" aria-labelledby="services-heading">
    <div className="container mx-auto px-4">
      <div className="text-center mb-14">
        <p className="text-sm uppercase tracking-[4.2px] text-white mb-3">Services</p>
        <h2
          id="services-heading"
          className="font-['Playfair_Display'] font-semibold text-4xl text-white mb-5"
        >
          Full-Service Remodeling
        </h2>
        <p className="text-[#e4e4e4] text-base leading-6 max-w-xl mx-auto">
          From flooring to complete home transformations, we deliver exceptional craftsmanship every
          step of the way.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-16">
        {SERVICES.map(({ id, title, description, Icon }) => (
          <div key={id} className="flex flex-col gap-6">
            <div className="border border-[#44403b] flex items-center justify-center w-16 h-16 shrink-0">
              <Icon className="w-7 h-7 text-white" strokeWidth={1.75} aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-white text-2xl lg:text-3xl font-medium tracking-tight mb-3">
                {title}
              </h3>
              <p className="text-[#ddd] text-base leading-relaxed font-light">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
));

ServicesSection.displayName = 'ServicesSection';

export default ServicesSection;
